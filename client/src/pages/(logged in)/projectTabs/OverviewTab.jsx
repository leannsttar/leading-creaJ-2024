import { useState } from "react";

import { TaskCardProject } from "../../../components/(logged in)/TaskCardProject.jsx";

import projectImage from "../../../assets/projectImage.jpg";

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

const MessageComponent = ({ message, me, index }) => {
  return (
    <div
      key={index}
      className={`${
        me ? "bg-black text-white" : "bg-[#F1F1F1]"
      }  rounded-xl px-3 py-2 w-fit text-[.9rem]`}
    >
      <p>{message}</p>
    </div>
  );
};

const UserPictureMessage = ({ href }) => {
  return (
    <img
      src={href}
      className="min-h-[2.5rem] min-w-[2.5rem] max-h-[2.5rem] max-w-[2.5rem] rounded-xl object-cover"
    />
  );
};

const ReplyComponent = ({ img, messages, me }) => {
  return (
    <div className={`flex gap-2 ${me ? "flex-row-reverse" : ""}`}>
      <UserPictureMessage href={img} />
      <div className={`flex flex-col gap-1 ${me ? "items-end" : ""}`}>
        {messages.map((message, index) => {
          return (
            <MessageComponent
              key={index}
              message={message}
              index={index}
              me={me}
            />
          );
        })}
      </div>
    </div>
  );
};

export const OverviewTab = () => {
  let messages1 = ["just ideas for next time", "I'll be there in 2 mins ⏰"];
  let messages2 = ["woohoooo", "Haha oh man", "Haha that's terrifying 😂"];
  let messages3 = ["aww", "omg, this is amazing", "woohoooo 🔥"];

  const [data, setData] = useState([
    {
      title: "Payment method via e-commerce",
      tags: ["Research", "UX"],
      description:
        "On the main page there are several banners displayed. The latest main products are displayed at the top. The need for a call to action must also be considered when it is on the top web banner. Don't forget to enter the categories too",
      subTasks: [2, 10],
      date: "Nov 16, 2022",
      files: 3,
      members: [
        "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
        "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
        "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
      ],
      comments: 0,
      status: "inProgress",
    },
    {
      title: "Payment method via e-commerce",
      tags: ["Research", "UX"],
      description:
        "On the main page there are several banners displayed. The latest main products are displayed at the top. The need for a call to action must also be considered when it is on the top web banner. Don't forget to enter the categories too",
      subTasks: [
        "Medium button",
        "Small button",
        "Hover button",
        "Ghost button",
      ],
      date: "Nov 18",
      files: 3,
      members: [
        "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
        "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
        "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
      ],
      comments: 0,
      status: "done",
    },
    {
      title: "Paayment method via e-commerce",
      tags: ["Research", "UX"],
      description:
        "On the main page there are several banners displayed. The latest main products are displayed at the top. The need for a call to action must also be considered when it is on the top web banner. Don't forget to enter the categories too",
      subTasks: [
        "Medium button",
        "Small button",
        "Hover button",
        "Ghost button",
      ],
      date: "Nov 17",
      files: 3,
      members: [
        "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
        "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
        "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
      ],
      comments: 0,
      status: "upcoming",
    },
    {
      title: "Paayment method via e-commerce",
      tags: ["Research", "UX"],
      description:
        "On the main page there are several banners displayed. The latest main products are displayed at the top. The need for a call to action must also be considered when it is on the top web banner. Don't forget to enter the categories too",
      subTasks: [
        "Medium button",
        "Small button",
        "Hover button",
        "Ghost button",
      ],
      date: "Nov 17",
      files: 3,
      members: [
        "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
        "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
        "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
      ],
      comments: 0,
      status: "upcoming",
    },
  ]);

  return (
    <div className="m-5 lg:flex lg:gap-8">
      <div className="space-y-5 lg:w-[65%] 2xl:w-[70%]">
        <div className="bg-[#f7f7f7] px-4 py-3 rounded-xl flex items-start lg:items-center">
          <div className="space-y-3">
            <div className="">
              <img
                src={projectImage}
                alt="Imagen proyecto"
                className="rounded-xl object-cover w-[8rem] h-[8rem] float-left mr-3 flex-shrink-0"
              />
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-semibold">SAO web project</p>
                  <p className="text-3xl text-[#A692DF] font-normal">84%</p>
                </div>
                <p className="text-justify">
                  El proyecto <span className="font-bold">"SAO web"</span> es
                  una plataforma en línea que combina tecnología de realidad
                  virtual y experiencias inmersivas, ofreciendo una fusión única
                  de juegos de rol, narrativa y socialización en un entorno
                  virtual colaborativo. Su objetivo es proporcionar a los
                  usuarios una experiencia envolvente y emocionante en mundos
                  digitales interactivos.
                </p>
              </div>
            </div>
            {/* <p className="font-semibold">
              Completitud: <span className="text-[#A692DF]">84%</span>
            </p> */}
          </div>
        </div>
        <div className="bg-[#f7f7f7] p-5 rounded-xl space-y-2 lg:hidden">
          <div className="flex justify-between items-center">
            <p className="font-bold">Actividad</p>
            <p className="text-[#1D7D81] font-bold">Ver todo</p>
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
        <div className="space-y-4 lg:pt-5">
          <div>
            <p className="text-[1.5rem] font-semibold">Tareas más próximas</p>
            <div className="bg-[#5B5B5B] w-[6rem] h-[5px] rounded-full" />
          </div>
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 2xl:grid-cols-3">
            {data.map((task, index) => (
              <TaskCardProject
                index={index}
                taskData={task}
                onClick={() => showDrawer(task)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="lg:w-[35%] 2xl:w-[30%] space-y-5">
        <div className="bg-[#f7f7f7] p-5 rounded-xl space-y-2 hidden lg:block">
          <div className="flex justify-between">
            <p className="font-bold">Actividad</p>
            <p className="text-[#1D7D81] font-bold">Ver todo</p>
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
        <div className="bg-[#F7F7F7] px-3 py-5 rounded-xl space-y-1 hidden lg:block">
          <ReplyComponent
            img={
              "https://i.pinimg.com/564x/29/2d/df/292ddf14e631b318991cf7b6908a337c.jpg"
            }
            messages={messages1}
          />
          <ReplyComponent
            img={
              "https://i.pinimg.com/736x/e8/7b/33/e87b335fec272ea9359703b8f98d71db.jpg"
            }
            messages={messages2}
            me
          />
          <ReplyComponent
            img={
              "https://i.pinimg.com/564x/53/09/ee/5309eed4c9ce7c7396390de9525cad29.jpg"
            }
            messages={messages3}
          />
        </div>
      </div>
    </div>
  );
};
