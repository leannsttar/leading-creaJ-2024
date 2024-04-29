import TaskCard from "../TaskCard";
import React from "react";

export const TasksBoardTab = () => {
  return (
    <div
      className="w-full overflow-auto pt-[6rem] md:pt-[3rem] lg:pt-0 pb-[2rem] "
      style={{ height: "calc(100% - 10rem)" }}>
      <div className="w-full min-h-full overflow-y-scroll bg-[#f7f7f7] grid grid-cols-1 md:grid-cols-3 font-Poppins">
        <TaskCard
          title="Por hacer"
          subtitle="Improve cards readability"
          imageSrc="../../../public/test-task.png"
          date="Date 12/12/12"
          team="Team C"
          comments={12}
        />
        {/* Para las otras col aquí irán */}
      </div>
    </div>
  );
};
