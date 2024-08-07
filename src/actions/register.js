import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import dbConnect from '@/utils/db';

export async function createUser(data) {
  console.log('User:::: ', User);

  await dbConnect();

  const { firstName, lastName, email, password, passwordConfirm } = data;

  if (password !== passwordConfirm) {
    return {
      status: 'error',
      message: 'Passwords do not match',
    };
  }

  const hashedPass = await bcrypt.hash(password, 12);

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPass,
    });

    return {
      status: 'success',
      data: user,
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
    };
  }
}
