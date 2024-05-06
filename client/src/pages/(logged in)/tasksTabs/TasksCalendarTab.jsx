import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export const TasksCalendarTab = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div
      className="w-full h-full overflow-auto pt-[6rem] md:pt-[3rem] lg:pt-0 pb-[4rem] "
      
    >
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  );
};
