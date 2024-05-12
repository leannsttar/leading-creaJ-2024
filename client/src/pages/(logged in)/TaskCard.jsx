import React from "react";
import { LiaCommentSolid } from "react-icons/lia";
import { CiCirclePlus } from "react-icons/ci";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiCalendarDate } from "react-icons/ci";

const TaskCard = ({ title, subtitle, imageSrc, date, team, comments }) => {
  return (
    <div className="bg-white shadow-lg m-4 p-4 max-w-md rounded-lg overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-bold">{title}</p>
        <div className="flex gap-2">
          <CiCirclePlus size={24} className="cursor-pointer" />
          <HiDotsHorizontal size={24} className="cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <p className="bg-[#EBFAE2] text-[#4F9C20] rounded p-1 font-semibold">
          Feedback
        </p>
        <p className="bg-[#FDF2F2] text-[#EC5962] rounded p-1 font-semibold">
          Bug
        </p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">{subtitle}</p>
      </div>
      <div className="mb-4">
        <img src={imageSrc} className="w-full h-auto" alt="" />
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <CiCalendarDate size={24} className="cursor-pointer" />
          <p>{date}</p>
        </div>
        <p className="font-medium whitespace-nowrap">{team}</p>
      </div>
      <div className="flex items-center">
        <img src="/test-boy.png" className="w-8 h-8 mr-2 flex-shrink-0" alt="" />
        <div className="flex items-center">
          <LiaCommentSolid size={24} className="cursor-pointer" />
          <p className="ml-1">{comments} Comentarios</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
