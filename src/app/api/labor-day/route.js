import { NextResponse } from 'next/server';

import Labor from '@/models/laborModel';

import dbConnect from '@/utils/db';
import calculateTotals from '@/utils/calculateTotals';
import { monthParser } from '@/utils/monthParser';

export async function POST(req) {
  await dbConnect();

  const { day, from, to, isHoliday, note, month, year, userId, perHour } =
    await req.json();

  // console.log(day, from, to, isHoliday, note, month, year, userId);

  if (!day || !from || !to) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Please fill the required fields',
      },
      { status: 400 }
    );
  }

  const { totalTime, totalSalary } = calculateTotals(
    from,
    to,
    isHoliday,
    perHour
  );

  try {
    const labor = await Labor.create({
      day,
      from,
      to,
      isHoliday,
      note,
      month,
      year,
      userId,
      totalTime,
      totalSalary,
    });

    return NextResponse.json(
      {
        status: 'success',
        message: 'Labor day added successfully',
        data: labor,
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

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  let month = searchParams.get('month');
  const year = searchParams.get('year');
  const userId = searchParams.get('userId');

  if (!month || !year || !userId) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Query failed, Please provide the required fields',
      },
      { status: 400 }
    );
  }

  try {
    const laborDays = await Labor.find({ userId, month, year })
      .sort({ day: 1 })
      .lean();

    if (!laborDays) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'No labor days found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { status: 'success', data: laborDays },
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

export async function PUT(req) {
  await dbConnect();

  const { _id, day, from, to, isHoliday, note, userId, perHour } =
    await req.json();

  if (!_id || !day || !from || !to) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Please fill the required fields',
      },
      { status: 400 }
    );
  }

  try {
    const { totalTime, totalSalary } = calculateTotals(
      from,
      to,
      isHoliday,
      perHour
    );

    const labor = await Labor.findByIdAndUpdate(
      _id,
      {
        day,
        from,
        to,
        isHoliday,
        note,
        userId,
        totalTime,
        totalSalary,
      },
      { new: true }
    );

    return NextResponse.json(
      {
        status: 'success',
        message: 'Labor day updated successfully',
        data: labor,
      },
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

export async function DELETE(req) {
  await dbConnect();

  const { _id } = await req.json();

  if (!_id) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Please provide the required fields',
      },
      { status: 400 }
    );
  }

  try {
    await Labor.findByIdAndDelete(_id);

    return NextResponse.json(
      {
        status: 'success',
        message: 'Labor day deleted successfully',
      },
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
