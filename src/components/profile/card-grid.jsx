import Link from 'next/link';

import { Card, CardHeader, CardBody, Chip } from '@nextui-org/react';

import { getDashboardData } from '@/actions/get-prev-months';

async function CardGrid({ userId }) {
  const prevMonthsData = await getDashboardData(userId);

  // console.log('PrevData', prevMonthsData);

  if (!prevMonthsData) {
    return <h1>No data</h1>;
  }

  const renderMonths = prevMonthsData.map((data) => {
    return (
      <Link
        href={`/counter/${data.year}/${data.month}`}
        key={`${data.year}-${data.month}`}
      >
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-2">
            <small className="text-default-500">Labor Month</small>
            <Chip size="lg" color="warning" variant="bordered">
              <h4 className="font-bold text-sm text-center">{data.month}</h4>
            </Chip>
          </CardHeader>
          <CardBody className="overflow-visible p-4">
            <p className="text-tiny uppercase font-bold">
              {data.records.length !== 0
                ? `${data.records.length} Days worked`
                : 'No days worked'}
            </p>
          </CardBody>
        </Card>
      </Link>
    );
  });

  return (
    <div className="flex flex-wrap justify-center  gap-2 sm:gap-4">
      {renderMonths}
    </div>
  );
}
export default CardGrid;
