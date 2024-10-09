import CardGrid from './card-grid';

function LastMonths({ userId, cardClass }) {
  return (
    <div className={`flex flex-col gap-6 justify-between w-full ${cardClass}`}>
      <div className="flex flex-col gap-2">
        <h4 className="text-sm">Last 6 months</h4>
        <CardGrid userId={userId} />
      </div>
    </div>
  );
}
export default LastMonths;
