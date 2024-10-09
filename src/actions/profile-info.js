'use server';

import User from '@/models/userModel';
import dbConnect from '@/utils/db';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

function convertToPlainObject(doc) {
  const plainObject = JSON.parse(JSON.stringify(doc));
  if (plainObject._id) {
    plainObject.id = plainObject._id.toString();
    delete plainObject._id;
  }
  delete plainObject.__v;
  return plainObject;
}

export async function getProfileInfo(userId) {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return {
        code: 401,
        status: 'error',
        message: 'Unauthorized',
      };
    }

    if (
      session.user.id !== userId
      //  && session.user.role !== 'admin'
    ) {
      return {
        code: 403,
        status: 'error',
        message: 'Forbidden: You can only access your own profile',
      };
    }

    const user = await User.findById(userId).select(-'password').lean();

    // console.log('user', user);

    if (!user) {
      return {
        code: 404,
        status: 'error',
        message: 'User not found',
      };
    }

    const plainUser = convertToPlainObject(user);

    return {
      code: 200,
      status: 'success',
      user: plainUser,
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      status: 500,
    };
  }
}

export async function updateProfileInfo(userId, updateData) {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return {
        code: 401,
        status: 'error',
        message: 'Unauthorized',
      };
    }

    if (session.user.id !== userId) {
      return {
        code: 403,
        status: 'error',
        message: 'Forbidden: You can only update your own profile',
      };
    }

    const allowedUpdates = ['perHour', 'firstName', 'lastName'];
    const filteredUpdateData = Object.keys(updateData)
      .filter((key) => allowedUpdates.includes(key))
      .reduce((obj, key) => {
        obj[key] = updateData[key];
        return obj;
      }, {});

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      filteredUpdateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return {
        code: 404,
        status: 'error',
        message: 'User not found',
      };
    }

    return {
      code: 200,
      status: 'success',
      user: updatedUser,
    };
  } catch (error) {
    return {
      code: 500,
      status: 'error',
      message: error.message,
    };
  }
}
