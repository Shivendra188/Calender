import { useState, useEffect } from "react";
import dayjs from "dayjs";

export default function Calendar() {
  const [current, setCurrent] = useState(dayjs());

  const [range, setRange] = useState({ start: null, end: null });
  const [dragging, setDragging] = useState(false);

  const [notes, setNotes] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  // Load notes
  useEffect(() => {
    const saved = localStorage.getItem("calendar-notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("calendar-notes", JSON.stringify(notes));
  }, [notes]);

  const startOfMonth = current.startOf("month");
  const endOfMonth = current.endOf("month");

  const days = [];
  const startDay = (startOfMonth.day() + 6) % 7;

  const prevMonth = current.subtract(1, "month");
  const prevMonthDays = prevMonth.daysInMonth();

  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      date: prevMonth.date(prevMonthDays - i),
      currentMonth: false,
    });
  }

  for (let d = 1; d <= endOfMonth.date(); d++) {
    days.push({
      date: startOfMonth.date(d),
      currentMonth: true,
    });
  }

  const nextMonth = current.add(1, "month");
  let nextDay = 1;

  while (days.length < 42) {
    days.push({
      date: nextMonth.date(nextDay++),
      currentMonth: false,
    });
  }

  const isInRange = (date) => {
    if (!range.start || !range.end) return false;
    return date.isAfter(range.start) && date.isBefore(range.end);
  };

  const handleMouseDown = (date) => {
    setRange({ start: date, end: null });
    setDragging(true);
  };

  const handleMouseEnter = (date) => {
    if (dragging) {
      setRange((prev) => ({ ...prev, end: date }));
    }
  };

  const handleMouseUp = () => setDragging(false);

  const getKey = (date) => date.format("YYYY-MM-DD");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">

      <div className="w-[360px] md:w-[520px] bg-white paper rounded-sm overflow-hidden">

        {/* 🔥 Binding (same as before) */}
        <div className="flex justify-center bg-gray-200 py-3 relative">
          <svg width="100%" height="80" viewBox="0 0 520 80">
            <defs>
              <linearGradient id="metal" x1="0" x2="1">
                <stop offset="0%" stopColor="#555" />
                <stop offset="50%" stopColor="#ddd" />
                <stop offset="100%" stopColor="#444" />
              </linearGradient>

              <filter id="shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3"/>
              </filter>
            </defs>

            <line x1="260" y1="0" x2="260" y2="20" stroke="#444" strokeWidth="2" />
            <circle cx="260" cy="0" r="3" fill="#222" />

            <path
              d="M 240 20 C 240 20, 260 50, 280 20"
              stroke="url(#metal)"
              strokeWidth="3"
              fill="none"
            />

            {Array.from({ length: 22 }).map((_, i) => {
              const x = 20 + i * 22;
              return (
                <path
                  key={i}
                  d={`M ${x} 50 c -6 -12, -6 -26, 0 -30 c 8 -6, 8 8, 0 12`}
                  stroke="url(#metal)"
                  strokeWidth="2.5"
                  fill="none"
                />
              );
            })}
          </svg>
        </div>

        {/* IMAGE */}
        <div className="relative h-[220px]">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
            className="w-full h-full object-cover"
          />

          <div className="blue-shape"></div>
          <div className="white-shape"></div>

          <div className="absolute bottom-10 right-6 text-white text-lg font-semibold">
            {current.format("YYYY")}
            <div className="text-2xl font-bold">
              {current.format("MMMM")}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex p-5 gap-6">

          {/* NOTES */}
          <div className="w-1/2">
            <h3 className="text-[11px] text-gray-500 mb-2">Notes</h3>

            {selectedDate && (
             <textarea
  className="w-full h-40 p-2 text-sm resize-none outline-none leading-6
  bg-[linear-gradient(to_bottom,transparent_95%,#d1d5db_95%)]
  bg-[length:100%_24px]
  border border-gray-300 rounded-sm
  focus:ring-2 focus:ring-blue-300"
  placeholder="Write note..."
  value={notes[getKey(selectedDate)] || ""}
  onChange={(e) =>
    setNotes({
      ...notes,
      [getKey(selectedDate)]: e.target.value,
    })
  }
/>
            )}
          </div>

          {/* CALENDAR */}
          <div
            className="w-1/2"
            onMouseLeave={handleMouseUp}
          >
            {/* DAYS */}
            <div className="grid grid-cols-7 text-[11px] mb-3 font-medium">
              {["MON","TUE","WED","THU","FRI","SAT","SUN"].map((d, i) => (
                <div
                  key={d}
                  className={`text-center ${
                    i >= 5 ? "text-[#2ea3d6]" : "text-gray-500"
                  }`}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* DATES */}
            <div className="grid grid-cols-7 gap-y-3 text-[13px] font-medium">
              {days.map((item, i) => {
                const isWeekend = i % 7 >= 5;
                const isStart = range.start?.isSame(item.date, "day");
                const isEnd = range.end?.isSame(item.date, "day");

                return (
                  <div
                    key={i}
                    onMouseDown={() => handleMouseDown(item.date)}
                    onMouseEnter={() => handleMouseEnter(item.date)}
                    onMouseUp={handleMouseUp}
                    onClick={() => setSelectedDate(item.date)}
                    className={`text-center cursor-pointer rounded transition ${
                      !item.currentMonth
                        ? "text-gray-300"
                        : isWeekend
                        ? "text-[#2ea3d6]"
                        : "text-gray-900"
                    }
                    ${isStart ? "bg-blue-500 text-white" : ""}
                    ${isEnd ? "bg-red-500 text-white" : ""}
                    ${isInRange(item.date) ? "bg-blue-200" : ""}
                    `}
                  >
                    {item.date.date()}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* NAV */}
        <div className="flex justify-between px-5 pb-5 text-sm">
          <button onClick={() => setCurrent(current.subtract(1, "month"))}>
            ⬅ Prev
          </button>
          <button onClick={() => setCurrent(current.add(1, "month"))}>
            Next ➡
          </button>
        </div>

      </div>
    </div>
  );
}