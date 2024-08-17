import React, { useState, useEffect, memo } from "react";
import { Button, Drawer, Radio, Space } from "antd";

import { FiLink } from "react-icons/fi";

import threeDots from "../../../assets/threeDotsSmaller.svg";
import flagTaskIcon from "../../../assets/flagTaskIcon.svg";
import linesTaskIcon from "../../../assets/LinesTaskIcon.svg";
import fileTaskIcon from "../../../assets/fileTaskIcon.svg";
import commentTaskIcon from "../../../assets/commentTaskIcon.svg";

export const TaskCardProject = ({ taskData, mobile, index, onClick }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    if (taskData) {
      setData(taskData);
      setLoading(false);
    }
  }, [taskData]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <div
        onClick={onClick}
        key={index}
        className={`cursor-pointer bg-[#f7f7f7] py-3 px-4 rounded-2xl  ${
          mobile ? "min-w-[16rem] lg:w-[80%] space-y-2" : "w-full space-y-4 "
        }`}
      >
        <div className="flex justify-between">
          <div className="flex gap-2">
            {data.tags.map((tag, index) => {
              return (
                <p
                  key={index}
                  className="bg-white text-[#959595] px-2 py-1 rounded-2xl"
                >
                  {tag}
                </p>
              );
            })}
          </div>
          <img src={threeDots} alt="" />
        </div>
        <p className="text-[1.3rem]">{data.title}</p>
        <div className="flex justify-between text-[#959595]">
          <div className="flex items-center gap-3">
            <img src={flagTaskIcon} alt="Icon" className="w-7" />
            <p>{data.date}</p>
          </div>
          <div className="flex items-center gap-4">
            <img src={linesTaskIcon} alt="Icon" className="w-6" />
            <p>
              {data.progressList}/{data.subTasks.length}
            </p>
          </div>
        </div>
        <div className="flex justify-between pt-6 text-[#959595]">
          <div className="flex">
            {data.members.map((member, index) => {
              return (
                <img
                  key={index}
                  src={member.image}
                  className={` ${
                    index === 1 ? " right-2" : index === 2 ? "right-4" : ""
                  } relative rounded-full min-w-[2rem] min-h-[2rem] max-w-[2rem] max-h-[2rem]`}
                />
              );
            })}
          </div>
          <div className="flex gap-5">
            <div className="flex items-center gap-2">
              <FiLink />
              <p>{data.links.length}</p>
            </div>
            <div className="flex items-center gap-2">
              <img src={fileTaskIcon} alt="Icon" />
              <p>{data.files.length}</p>
            </div>
            <div className="flex items-center gap-2">
              <img src={commentTaskIcon} alt="Icon" />
              <p>{data.comments.length}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
