import { LiaCommentSolid } from "react-icons/lia";
import { CiCirclePlus } from "react-icons/ci";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiCalendarDate } from "react-icons/ci";

const TaskCard = ({ title, subtitle, imageSrc, date, team, comments }) => {
  return (
    <div className="bg-white shadow-lg m-8 p-4 max-h-[55vh]">
      <div className="flex justify-between items-center mb-6">
        <p className="text-xl font-bold">{title}</p>
        <div className="flex gap-2">
          <CiCirclePlus size={24} />
          <HiDotsHorizontal size={24} />
        </div>
      </div>
      <div className="flex flex-row gap-2 mb-4">
        <p className="bg-[#EBFAE2] text-[#4F9C20] rounded p-1 font-semibold">
          Feedback
        </p>
        <p className="bg-[#FDF2F2] text-[#EC5962] rounded p-1 font-semibold">
          Bug
        </p>
      </div>
      <div className="mb-4">
        <p className="font-bold text-lg">{subtitle}</p>
      </div>
      <div className="mb-4 flex justify-center">
        <img src={imageSrc} className="w-full max-w-xs md:max-w-full h-auto" alt="" />
      </div>
      <div className="mb-4 flex justify-between">
        <div className="flex items-center">
          <CiCalendarDate size={24} />
          <p className="ml-2">{date}</p>
        </div>
        <p className="text-right font-medium">{team}</p>
      </div>
      <div className="flex items-center">
        <img src="../../../public/test-boy.png" className="w-8 h-8 mr-2" alt="" />
        <div className="flex items-center">
          <LiaCommentSolid size={24} />
          <p className="ml-1">
            <span>{comments} </span>Comentarios
          </p>
        </div>
      </div>
      <div className="w-full overflow-auto" style={{ height: "calc(100% - 10rem)" }}></div>
    </div>
  );
};

export default TaskCard;
