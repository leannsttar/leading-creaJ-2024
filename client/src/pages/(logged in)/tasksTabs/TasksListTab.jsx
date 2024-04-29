import { HiDotsHorizontal } from "react-icons/hi";
import { CiCirclePlus } from "react-icons/ci";


export const TasksListTab = () => {
  return (
    <div className="w-full overflow-auto pt-[6rem] md:pt-[3rem] lg:pt-0 pb-[4rem] bg-[#F7F7F7] font-Poppins"
      style={{ height: "calc(100% - 10rem)" }}>
      <div className="p-8">
      <div className="w-1/3">
          <div className="flex w-full justify-between mb-5 mt-5">
            <p className="font-bold text-neutral-700 pl-3">Por hacer</p>
            <div className="flex gap-3">
            <CiCirclePlus size={24} />
            <HiDotsHorizontal size={24} />
            </div>
          </div>
      </div>

      <div className="flex flex-row bg-[#FFFFFF] items-center justify-between w-1/3 h-12 border-none rounded-md p-3">
        <div className="flex flex-row items-center justify-between w-full">
        <p className="font-semibold">Update tokens</p>
            <div className="flex gap-4">
            <p className="bg-[#EBFAE2] text-[#4F9C20] rounded p-1 font-semibold">
              Feedback
            </p>
            <p className="bg-[#FDF2F2] text-[#EC5962] rounded p-1 font-semibold">
              Bug
            </p>
            </div>
            </div>
        </div>
      </div>
    </div>
    
  );
};






