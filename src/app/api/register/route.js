import { NextResponse } from 'next/server';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import dbConnect from '@/utils/db';

export async function POST(req) {
  await dbConnect();
  const { firstName, lastName, email, password, passwordConfirm, perHour } =
    await req.json();

  console.log(firstName, lastName, email, password, passwordConfirm, perHour);

  if (password !== passwordConfirm) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Passwords do not match',
      },
      { status: 400 }
    );
  }

  const hashedPass = await bcrypt.hash(password, 12);

  try {
    const existing = await User.findOne({ email });

    if (existing) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'This email is already in use',
        },
        { status: 400 }
      );
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPass,
      perHour,
    });

    return NextResponse.json(
      {
        status: 'success',
        data: user,
      },
      { status: 201 }
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
