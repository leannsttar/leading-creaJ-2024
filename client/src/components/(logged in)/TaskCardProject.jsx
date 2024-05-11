import threeDots from "../../assets/threeDotsSmaller.svg";
import flagTaskIcon from "../../assets/flagTaskIcon.svg";
import linesTaskIcon from "../../assets/LinesTaskIcon.svg";
import fileTaskIcon from "../../assets/fileTaskIcon.svg";
import commentTaskIcon from "../../assets/commentTaskIcon.svg";

export const TaskCardProject = ({
    tags,
    title,
    files,
    date,
    subTasks,
    members,
    comments,
    mobile
  }) => {
    return (
      <div className={`bg-[#F7F7F7] py-3 px-4 rounded-2xl  ${mobile ? 'min-w-[16rem] space-y-2' : 'w-full space-y-4 '}`}>
        <div className="flex justify-between">
          <div className="flex gap-2">
            {tags.map((tag, index) => {
              return (
                <p key={index} className="bg-white text-[#959595] px-2 py-1 rounded-2xl">
                  {tag}
                </p>
              );
            })}
          </div>
          <img src={threeDots} alt="" />
        </div>
        <p className="text-[1.3rem]">{title}</p>
        <div className="flex justify-between text-[#959595]">
          <div className="flex items-center gap-3">
            <img src={flagTaskIcon} alt="Icon" className="w-7" />
            <p>{date}</p>
          </div>
          <div className="flex items-center gap-4">
            <img src={linesTaskIcon} alt="Icon" className="w-6" />
            <p>
              {subTasks[0]}/{subTasks[1]}
            </p>
          </div>
        </div>
        <div className="flex justify-between pt-6 text-[#959595]">
          <div className="flex">
            {members.map((member, index) => {
              return (
                <img
                  key={index}
                  src={member}
                  className={` ${
                    index === 1 ? " right-2" : index === 2 ? "right-4" : ""
                  } relative rounded-full min-w-[2rem] min-h-[2rem] max-w-[2rem] max-h-[2rem]`}
                />
              );
            })}
          </div>
          <div className="flex gap-10">
            <div className="flex items-center gap-2">
              <img src={fileTaskIcon} alt="Icon" />
              <p>{files}</p>
            </div>
            <div className="flex items-center gap-2">
              <img src={commentTaskIcon} alt="Icon" />
              <p>{comments}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };