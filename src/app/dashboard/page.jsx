import CardGrid from '@/components/dashbord/card-grid';

function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 justify-between w-full rounded-xl my-6 backdrop-blur-md bg-gray-200/50 border-slate-300 py-14 px-2 md:px-10">
      <h1 className="text-md font-bold">Welcome to dashboard </h1>
      <div className="flex flex-col gap-2">
        <h4 className="text-sm">Last 6 months</h4>
        <CardGrid />
      </div>
    </div>
  );
}

export default DashboardPage;
