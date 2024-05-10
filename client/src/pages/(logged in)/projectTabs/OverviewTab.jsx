import projectImage from "../../../assets/projectImage.jpg";
import threeDots from "../../../assets/threeDotsSmaller.svg";
import flagTaskIcon from "../../../assets/flagTaskIcon.svg";
import linesTaskIcon from "../../../assets/LinesTaskIcon.svg";
import fileTaskIcon from "../../../assets/fileTaskIcon.svg";
import commentTaskIcon from "../../../assets/commentTaskIcon.svg";

const ActivityRecord = ({ img, message, date }) => {
  return (
    <div className="bg-white p-3 rounded-xl flex items-center gap-2">
      <img
        src={img}
        alt=""
        className="min-w-[3rem] min-h-[3rem] max-h-[3rem] max-w-[3rem] object-cover rounded-full"
      />
      <div>
        <p className="font-semibold">{message}</p>
        <p className="text-[#707070] font-light">{date}</p>
      </div>
    </div>
  );
};

const TaskCard = ({
  tags,
  title,
  files,
  date,
  subTasks,
  members,
  comments,
}) => {
  return (
    <div className="bg-[#F7F7F7] py-3 px-4 rounded-2xl space-y-4">
      <div className="flex justify-between">
        <div className="flex gap-2">
          {tags.map((tag, index) => {
            return (
              <p key={index} className="bg-white px-2 py-1 rounded-2xl">
                {tag}
              </p>
            );
          })}
        </div>
        <img src={threeDots} alt="" />
      </div>
      <p className="text-2xl">{title}</p>
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
            return(
              <img key={index} src={member} className={` ${index === 1 ? ' right-2' : index === 2 ? 'right-4' : ''} relative rounded-full min-w-[2rem] min-h-[2rem] max-w-[2rem] max-h-[2rem]`}/>
            )
          })}
        </div>
        <div className="flex gap-10">
          <div className="flex items-center gap-2">
            <img src={fileTaskIcon} alt="Icon" />
            <p>{files}</p>
          </div>
          <div className="flex items-center gap-2">
            <img src={fileTaskIcon} alt="Icon" />
            <p>{comments}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OverviewTab = () => {
  return (
    <div className="p-5 space-y-5">
      <div className="bg-[#f7f7f7] p-5 rounded-xl">
        <div className="space-y-3">
          <img
            src={projectImage}
            alt="Imagen proyecto"
            className="rounded-xl object-cover"
          />
          <p>
            El proyecto <span className="font-bold">"SAO web"</span> es una
            plataforma en línea que combina tecnología de realidad virtual y
            experiencias inmersivas, ofreciendo una fusión única de juegos de
            rol, narrativa y socialización en un entorno virtual colaborativo.
            Su objetivo es proporcionar a los usuarios una experiencia
            envolvente y emocionante en mundos digitales interactivos.
          </p>
          <p className="font-semibold">
            Completitud: <span className="text-[#A692DF]">84%</span>
          </p>
        </div>
      </div>
      <div className="bg-[#f7f7f7] p-5 rounded-xl space-y-2">
        <div className="flex justify-between">
          <p className="font-bold">Actividad</p>
          <p className="text-[#1D7D81]">Ver todo</p>
        </div>
        <div className="space-y-2">
          <ActivityRecord
            img={
              "https://i.pinimg.com/564x/9b/62/2b/9b622b762d0a8f52349ccd76072ebb0c.jpg"
            }
            message={"Ellie joined team developers"}
            date={"04 April, 2021"}
          />
          <ActivityRecord
            img={
              "https://i.pinimg.com/564x/9b/62/2b/9b622b762d0a8f52349ccd76072ebb0c.jpg"
            }
            message={"Ellie joined team developers"}
            date={"04 April, 2021"}
          />
          <ActivityRecord
            img={
              "https://i.pinimg.com/564x/9b/62/2b/9b622b762d0a8f52349ccd76072ebb0c.jpg"
            }
            message={"Ellie joined team developers"}
            date={"04 April, 2021"}
          />
          <ActivityRecord
            img={
              "https://i.pinimg.com/564x/9b/62/2b/9b622b762d0a8f52349ccd76072ebb0c.jpg"
            }
            message={"Ellie joined team developers"}
            date={"04 April, 2021"}
          />
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-[1.5rem] font-semibold">Tareas más próximas</p>
          <div className="bg-[#5B5B5B] w-[6rem] h-[5px] rounded-full" />
        </div>
        <div className="space-y-3">
          <TaskCard
            title={"Payment method via e-commerce"}
            tags={["Research", "UX"]}
            subTasks={[2, 10]}
            date={"Nov 16"}
            files={3}
            members={[
              "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
              "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
              "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
            ]}
            comments={0}
          />
          <TaskCard
            title={"Payment method via e-commerce"}
            tags={["Research", "UX"]}
            subTasks={[2, 10]}
            date={"Nov 16"}
            files={3}
            members={[
              "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
              "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
              "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
            ]}
            comments={0}
          />
          <TaskCard
            title={"Payment method via e-commerce"}
            tags={["Research", "UX"]}
            subTasks={[2, 10]}
            date={"Nov 16"}
            files={3}
            members={[
              "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
              "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
              "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
            ]}
            comments={0}
          />
        </div>
      </div>
    </div>
  );
};
