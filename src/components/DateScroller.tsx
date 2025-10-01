export default function DateScroller() {
  const dates = [
    "Mon 27",
    "Tue 28",
    "Wed 29",
    "Thu 30",
    "Fri 31",
    "Sat 1",
    "Sun 2",
  ];

  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-4 p-2">
        {dates.map((date) => (
          <button
            key={date}
            className="flex-shrink-0 rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            {date}
          </button>
        ))}
      </div>
    </div>
  );
}
