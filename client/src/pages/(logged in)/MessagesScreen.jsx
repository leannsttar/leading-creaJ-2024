import { useState, useRef, useEffect } from "react";

import { ReplyComponent } from "@/components/(logged in)/messages/ReplyComponent";

import { IoIosSearch } from "react-icons/io";

import plusTasksIcon from "../../assets/plusTasksIcon.svg";
import messageIcon from "../../assets/message.svg";
import paperClip from "../../assets/paperclip.svg";
import paperPlane from "../../assets/paper-plane.svg";
import { BiArrowBack } from "react-icons/bi";

const ChatComponent = ({
  teamName,
  teamImage,
  lastMessage,
  timeAgo,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex px-6 justify-between p-2 hover:bg-[#f6f6fe] rounded-lg cursor-pointer"
    >
      <div className="flex gap-2 items-center">
        <img
          src={teamImage}
          alt=""
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div>
          <p className="font-semibold">{teamName}</p>
          <p className="text-sm font-semibold opacity-40">{lastMessage}</p>
        </div>
      </div>
      <p className="text-sm opacity-35 font-bold">{timeAgo}</p>
    </div>
  );
};

export const MessagesScreen = () => {
  const [chatOpened, setChatOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1080);

  useEffect(() => {
    const checkResolution = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth < 768);
    };

    checkResolution();
    window.addEventListener("resize", checkResolution);

    return () => {
      window.removeEventListener("resize", checkResolution);
    };
  }, []);

  let messages1 = ["just ideas for next time", "I'll be there in 2 mins ⏰"];
  let messages2 = ["woohoooo", "Haha oh man", "Haha that's terrifying 😂"];
  let messages3 = ["aww", "omg, this is amazing", "woohoooo 🔥"];

  const scrollRef = useRef();
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages1, messages2, messages3]);



  return (
    <div className="flex w-full max-h-screen mt-[4.5rem] lg:mt-0 border-t-[1px] lg:border-[0px]">
      <div
        className={`w-full md:w-auto md:min-w-[23rem] border-r-[1px] h-full ${
          chatOpened && isMobile ? "hidden" : ""
        }`}
      >
        <div className="px-6 border-b-[1px]">
          <div className="flex justify-between py-4 lg:py-6">
            <p className="font-semibold text-xl">Messages</p>
            <img src={plusTasksIcon} alt="" className="w-8 cursor-pointer" />
          </div>
        </div>
        <div className="pt-5 space-y-3">
          <div className="px-6 relative w-full">
            <IoIosSearch className="absolute left-9 top-3" opacity={0.5} />
            <input
              type="text"
              placeholder="Buscar chats"
              className="bg-[#F3F3F3] w-full outline-none pl-9 py-2 rounded-lg"
            />
          </div>
          <div
            className="space-y-3 overflow-auto"
            style={{
              height: isMobile ? "h-full" : "calc(100vh - 10rem)",
            }}
          >
            <ChatComponent
              teamName={"Team A"}
              lastMessage={"wooo hooo"}
              timeAgo={"12min"}
              teamImage={
                "https://i.pinimg.com/564x/df/c3/5e/dfc35ee8418ee22427b3f2213e998bd3.jpg"
              }
              onClick={() => setChatOpened(true)}
            />
            <ChatComponent
              teamName={"Team B"}
              lastMessage={"wooo hooo"}
              timeAgo={"12min"}
              teamImage={
                "https://i.pinimg.com/564x/0e/9a/82/0e9a82187b9f1ec691d7026e624bf815.jpg"
              }
              onClick={() => setChatOpened(true)}
            />
            <ChatComponent
              teamName={"Team C"}
              lastMessage={"wooo hooo"}
              timeAgo={"12min"}
              teamImage={
                "https://i.pinimg.com/564x/28/f8/ed/28f8ed534ef1a06d9d05ec2eea593c30.jpg"
              }
              onClick={() => setChatOpened(true)}
            />
            <ChatComponent
              teamName={"Team D"}
              lastMessage={"wooo hooo"}
              timeAgo={"12min"}
              teamImage={
                "https://i.pinimg.com/564x/7b/e3/bf/7be3bf4217907d905aee815a1b856933.jpg"
              }
              onClick={() => setChatOpened(true)}
            />
            <ChatComponent
              teamName={"Team E"}
              lastMessage={"wooo hooo"}
              timeAgo={"12min"}
              teamImage={
                "https://i.pinimg.com/564x/38/14/e9/3814e933596ac934af705d466b189e45.jpg"
              }
              onClick={() => setChatOpened(true)}
            />
            <ChatComponent
              teamName={"Team A"}
              lastMessage={"wooo hooo"}
              timeAgo={"12min"}
              teamImage={
                "https://i.pinimg.com/564x/df/c3/5e/dfc35ee8418ee22427b3f2213e998bd3.jpg"
              }
              onClick={() => setChatOpened(true)}
            />
            <ChatComponent
              teamName={"Team B"}
              lastMessage={"wooo hooo"}
              timeAgo={"12min"}
              teamImage={
                "https://i.pinimg.com/564x/0e/9a/82/0e9a82187b9f1ec691d7026e624bf815.jpg"
              }
              onClick={() => setChatOpened(true)}
            />
            <ChatComponent
              teamName={"Team C"}
              lastMessage={"wooo hooo"}
              timeAgo={"12min"}
              teamImage={
                "https://i.pinimg.com/564x/28/f8/ed/28f8ed534ef1a06d9d05ec2eea593c30.jpg"
              }
            />
            <ChatComponent
              teamName={"Team D"}
              lastMessage={"wooo hooo"}
              timeAgo={"12min"}
              teamImage={
                "https://i.pinimg.com/564x/7b/e3/bf/7be3bf4217907d905aee815a1b856933.jpg"
              }
              onClick={() => setChatOpened(true)}
            />
            <ChatComponent
              teamName={"Team E"}
              lastMessage={"wooo hooo"}
              timeAgo={"12min"}
              teamImage={
                "https://i.pinimg.com/564x/38/14/e9/3814e933596ac934af705d466b189e45.jpg"
              }
              onClick={() => setChatOpened(true)}
            />
            <ChatComponent
              teamName={"Team A"}
              lastMessage={"wooo hooo"}
              timeAgo={"12min"}
              teamImage={
                "https://i.pinimg.com/564x/df/c3/5e/dfc35ee8418ee22427b3f2213e998bd3.jpg"
              }
              onClick={() => setChatOpened(true)}
            />
            <ChatComponent
              teamName={"Team B"}
              lastMessage={"wooo hooo"}
              timeAgo={"12min"}
              teamImage={
                "https://i.pinimg.com/564x/0e/9a/82/0e9a82187b9f1ec691d7026e624bf815.jpg"
              }
              onClick={() => setChatOpened(true)}
            />
            <ChatComponent
              teamName={"Team C"}
              lastMessage={"wooo hooo"}
              timeAgo={"12min"}
              teamImage={
                "https://i.pinimg.com/564x/28/f8/ed/28f8ed534ef1a06d9d05ec2eea593c30.jpg"
              }
              onClick={() => setChatOpened(true)}
            />
            <ChatComponent
              teamName={"Team D"}
              lastMessage={"wooo hooo"}
              timeAgo={"12min"}
              teamImage={
                "https://i.pinimg.com/564x/7b/e3/bf/7be3bf4217907d905aee815a1b856933.jpg"
              }
              onClick={() => setChatOpened(true)}
            />
            <ChatComponent
              teamName={"Team E"}
              lastMessage={"wooo hooo"}
              timeAgo={"12min"}
              teamImage={
                "https://i.pinimg.com/564x/38/14/e9/3814e933596ac934af705d466b189e45.jpg"
              }
              onClick={() => setChatOpened(true)}
            />
          </div>
        </div>
      </div>
      {chatOpened ? (
        <div className="w-full ">
          <div className="flex gap-3 items-center border-b-[1px] py-2 pl-4 lg:pl-6 lg:py-4">
            <BiArrowBack
              size={25}
              className={`${!isMobile && "hidden"}`}
              onClick={() => setChatOpened(false)}
            />
            <img
              className="w-12 h-12 rounded-lg object-cover"
              src="https://i.pinimg.com/564x/38/14/e9/3814e933596ac934af705d466b189e45.jpg"
              alt=""
            />
            <p className="font-semibold">Team A</p>
          </div>
          <div>
            <div
              className="flex flex-col gap-3 px-6 pb-5 justify-start overflow-auto"
              style={{
                height: isMobile
                  ? "calc(100vh - 13rem)"
                  : isTablet
                  ? "calc(100vh - 12.5rem)"
                  : "calc(100vh - 9rem)",
              }}
              ref={scrollRef}
            >
              <div className=""></div>
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
            <div className="w-full flex gap-4 px-6">
              <img src={paperClip} alt="" />
              <div className="relative flex w-full">
                <input
                  type="text"
                  placeholder="Escribe un mensaje"
                  className="w-full outline-none rounded-lg border-[1px] py-2 px-3"
                />
                <img
                  src={paperPlane}
                  alt=""
                  className="absolute right-4 top-2.5"
                />
              </div>
            </div>
          </div>
        </div>
      ) : !isMobile ? (
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col items-center">
            <img src={messageIcon} alt="" className="w-28" />
            <p className="text-xl font-semibold">Tus mensajes</p>
            <p>Envía mensajes privados a un grupo</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
