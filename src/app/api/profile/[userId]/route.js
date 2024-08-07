import User from '@/models/userModel';
import dbConnect from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  await dbConnect();

  const { userId } = params;
  console.log('userId', userId);

  try {
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { status: 'success', data: user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error.message,
      },
      { status: 400 }
    );
  }
}
