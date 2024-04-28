export const TitleSection = ({ title, className }) => {
  return (
    <div className="space-y-[.1rem]">
      <h2 className="text-[1.7rem] font-medium">{title}</h2>
      <div className="bg-[#363636] h-1.5 w-[6rem] rounded-full"></div>
    </div>
  );
};
