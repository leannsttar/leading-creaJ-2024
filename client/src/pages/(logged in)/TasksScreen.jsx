import TaskCard from "./TaskCard";

export const TasksScreen = () => {
  return (
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
  );
};
