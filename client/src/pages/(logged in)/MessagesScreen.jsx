import { useState, useEffect, useRef, useContext } from "react";
import io from "socket.io-client";
import { useSession } from "@/config/useSession";
import { ProyectosContext } from "@/config/ProyectosContext";
import { ReplyComponent } from "@/components/(logged in)/messages/ReplyComponent";
import { IoIosSearch } from "react-icons/io";
import { BiArrowBack } from "react-icons/bi";
import plusTasksIcon from "../../assets/plusTasksIcon.svg";
import messageIcon from "../../assets/message.svg";
import paperClip from "../../assets/paperclip.svg";
import paperPlane from "../../assets/paper-plane.svg";

import { Loader } from "@/components/Loader"; // Importa tu componente Loader

const socket = io("http://localhost:5000");

const ChatComponent = ({
  teamName,
  teamImage,
  lastMessage,
  timeAgo,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="flex px-6 justify-between py-4 hover:bg-[#f6f6fe] rounded-lg cursor-pointer"
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

export const MessagesScreen = () => {
  const { usuario } = useSession();
  const { proyectos } = useContext(ProyectosContext);

  const [chatOpened, setChatOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1080);
  const [message, setMessage] = useState("");
  const [currentProject, setCurrentProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para el loader

  const scrollRef = useRef();

  const handleSumbit = () => {
    if (currentProject && message) {
      const newMessage = {  
        content: message,
        projectId: currentProject.id,
        sender: { id: usuario.id, name: usuario.name, image: usuario.image },
        senderId: usuario.id
      };
      socket.emit("message", newMessage);
      console.log('Enviando mensaje:', newMessage);
      setMessage("");
    }
  };

  useEffect(() => {
    const handleMessage = (newMessage) => {
      if (newMessage.projectId === currentProject?.id) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [currentProject]);

  useEffect(() => {
    if (usuario?.id) {
      socket.emit("joinUserProjects", usuario.id);
    }
  }, [usuario]);

  useEffect(() => {
    if (currentProject?.id) {
      setLoading(true); // Activar el loader
      socket.emit("joinProject", currentProject.id);

      socket.on("loadMessages", (loadedMessages) => {
        setMessages(loadedMessages);
        setLoading(false); // Desactivar el loader
      });

      return () => {
        socket.off("loadMessages");
      };
    }
  }, [currentProject]);

  useEffect(() => {
    const checkResolution = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkResolution();
    window.addEventListener("resize", checkResolution);

    return () => {
      window.removeEventListener("resize", checkResolution);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
            className="overflow-auto"
            style={{ height: isMobile ? "h-full" : "calc(100vh - 10rem)" }}
          >
            {proyectos.map((project) => (
              <ChatComponent
                key={project.id}
                teamName={project.name}
                lastMessage={project.lastMessage}
                timeAgo={project.timeAgo}
                teamImage={project.imagen}
                onClick={() => {
                  setChatOpened(true);
                  setCurrentProject(project);
                  setMessages([]);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {chatOpened ? (
        <div className="w-full">
          <div className="flex gap-3 items-center border-b-[1px] py-2 pl-4 lg:pl-6 lg:py-4">
            <BiArrowBack
              size={25}
              className={`${!isMobile && "hidden"}`}
              onClick={() => setChatOpened(false)}
            />
            <img
              className="w-12 h-12 rounded-lg object-cover"
              src={currentProject?.imagen}
              alt=""
            />
            <p className="font-semibold">{currentProject?.name}</p>
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
              {loading ? (  // Mostrar el loader mientras se carga
                <div className="flex justify-center items-center h-full">
                  <Loader />
                </div>
              ) : (
                messages.map((msg, index) => (
                  <ReplyComponent
                    key={index}
                    messages={[msg.content]}
                    img={msg.sender.image}
                    me={msg.sender.id === usuario.id}
                  />
                ))
              )}
            </div>
            <div className="w-full flex gap-4 px-6">
              <img src={paperClip} alt="" />
              <div className="relative flex w-full">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSumbit();
                  }}
                  type="text"
                  placeholder="Escribe un mensaje"
                  className="w-full outline-none rounded-lg border-[1px] py-2 px-3"
                />
                <img
                  onClick={handleSumbit}
                  src={paperPlane}
                  alt="Enviar mensaje"
                  className="absolute right-4 top-2.5 cursor-pointer"
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

// import { useState, useRef, useEffect, useContext } from "react";
// import io from "socket.io-client";

// import { useSession } from "@/config/useSession";
// import { ProyectosContext } from "@/config/ProyectosContext";

// import { ReplyComponent } from "@/components/(logged in)/messages/ReplyComponent";

// import { IoIosSearch } from "react-icons/io";
// import plusTasksIcon from "../../assets/plusTasksIcon.svg";
// import messageIcon from "../../assets/message.svg";
// import paperClip from "../../assets/paperclip.svg";
// import paperPlane from "../../assets/paper-plane.svg";
// import { BiArrowBack } from "react-icons/bi";

// const socket = io("http://localhost:5000");

// const ChatComponent = ({
//   teamName,
//   teamImage,
//   lastMessage,
//   timeAgo,
//   onClick,
// }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="flex px-6 justify-between py-4 hover:bg-[#f6f6fe] rounded-lg cursor-pointer"
//     >
//       <div className="flex gap-2 items-center">
//         <img
//           src={teamImage}
//           alt=""
//           className="w-12 h-12 rounded-lg object-cover"
//         />
//         <div>
//           <p className="font-semibold">{teamName}</p>
//           <p className="text-sm font-semibold opacity-40">{lastMessage}</p>
//         </div>
//       </div>
//       <p className="text-sm opacity-35 font-bold">{timeAgo}</p>
//     </div>
//   );
// };

// export const MessagesScreen = () => {
//   const { usuario } = useSession();
//   const { proyectos } = useContext(ProyectosContext);

//   const [chatOpened, setChatOpened] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [isTablet, setIsTablet] = useState(window.innerWidth < 1080);

//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [currentProject, setCurrentProject] = useState(null);

//   const handleSumbit = () => {
//     socket.emit("message", { projectId: currentProject.id, message });
//     setMessage("");
//   };

//   useEffect(() => {
//     const handleMessage = (newMessage) => {
//       // Agrega el nuevo mensaje a la lista de mensajes
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       console.log(messages)
//     };

//     // Escucha el evento 'message' del servidor
//     socket.on('message', handleMessage);

//     // Limpia el manejador de eventos al desmontar el componente
//     return () => {
//       socket.off('message', handleMessage);
//     };
//   }, []);

//   useEffect(() => {
//     socket.on("joinProject", ({ userId, projectId }) => {
//       if (userId === usuario.id) {
//         // Asegúrate de que `myUserId` esté definido correctamente
//         socket.emit("joinUserProjects", usuario.id);
//       }
//     });

//     return () => {
//       socket.off("joinProject");
//     };
//   }, []);

//   useEffect(() => {
//     // Join all project rooms using proyectos from context
//     socket.emit("joinUserProjects", usuario.id);
//     proyectos.forEach((proyecto) => {
//       socket.emit("joinProject", {
//         userId: usuario.id,
//         projectId: proyecto.id,
//       });
//     });
//   }, [proyectos]);

//   useEffect(() => {
//     const checkResolution = () => {
//       const screenWidth = window.innerWidth;
//       setIsMobile(screenWidth < 768);
//     };

//     checkResolution();
//     window.addEventListener("resize", checkResolution);

//     return () => {
//       window.removeEventListener("resize", checkResolution);
//     };
//   }, []);

//   let messages1 = ["just ideas for next time", "I'll be there in 2 mins ⏰"];
//   let messages2 = ["woohoooo", "Haha oh man", "Haha that's terrifying 😂"];
//   let messages3 = ["aww", "omg, this is amazing", "woohoooo 🔥"];

//   const scrollRef = useRef();
//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages1, messages2, messages3]);

//   return (
//     <div className="flex w-full max-h-screen mt-[4.5rem] lg:mt-0 border-t-[1px] lg:border-[0px]">
//       <div
//         className={`w-full md:w-auto md:min-w-[23rem] border-r-[1px] h-full ${
//           chatOpened && isMobile ? "hidden" : ""
//         }`}
//       >
//         <div className="px-6 border-b-[1px]">
//           <div className="flex justify-between py-4 lg:py-6">
//             <p className="font-semibold text-xl">Messages</p>
//             <img src={plusTasksIcon} alt="" className="w-8 cursor-pointer" />
//           </div>
//         </div>
//         <div className="pt-5 space-y-3">
//           <div className="px-6 relative w-full">
//             <IoIosSearch className="absolute left-9 top-3" opacity={0.5} />
//             <input
//               type="text"
//               placeholder="Buscar chats"
//               className="bg-[#F3F3F3] w-full outline-none pl-9 py-2 rounded-lg"
//             />
//           </div>
//           <div
//             className="overflow-auto"
//             style={{
//               height: isMobile ? "h-full" : "calc(100vh - 10rem)",
//             }}
//           >
//             {proyectos.map((project) => (
//               <ChatComponent
//                 key={project.id}
//                 teamName={project.name}
//                 lastMessage={project.lastMessage}
//                 timeAgo={project.timeAgo}
//                 teamImage={project.imagen}
//                 onClick={() => {
//                   setChatOpened(true);
//                   setCurrentProject(project);
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//       {chatOpened ? (
//         <div className="w-full">
//           <div className="flex gap-3 items-center border-b-[1px] py-2 pl-4 lg:pl-6 lg:py-4">
//             <BiArrowBack
//               size={25}
//               className={`${!isMobile && "hidden"}`}
//               onClick={() => setChatOpened(false)}
//             />
//             {currentProject?.imagen ? (
//               <img
//                 className="w-12 h-12 rounded-lg object-cover"
//                 src={currentProject.imagen}
//                 alt={currentProject.name}
//               />
//             ) : (
//               <div className="w-12 h-12 rounded-lg bg-gray-300" /> // Placeholder in case image is not available
//             )}
//             <p className="font-semibold">
//               {currentProject?.name || "Project Name"}
//             </p>
//           </div>
//           <div>
//             <div
//               className="flex flex-col gap-3 px-6 pb-5 justify-start overflow-auto mt-3"
//               style={{
//                 height: isMobile
//                   ? "calc(100vh - 13rem)"
//                   : isTablet
//                   ? "calc(100vh - 12.5rem)"
//                   : "calc(100vh - 9rem)",
//               }}
//               ref={scrollRef}
//             >
//               {/* Example messages; replace with actual messages from the selected project */}
//               {messages1.map((msg, index) => (
//                 <ReplyComponent
//                   key={index}
//                   img={
//                     "https://i.pinimg.com/564x/29/2d/df/292ddf14e631b318991cf7b6908a337c.jpg" // Replace with actual sender image
//                   }
//                   messages={[msg]}
//                 />
//               ))}
//               {messages2.map((msg, index) => (
//                 <ReplyComponent
//                   key={index}
//                   img={
//                     "https://i.pinimg.com/736x/e8/7b/33/e87b335fec272ea9359703b8f98d71db.jpg" // Replace with actual sender image
//                   }
//                   messages={[msg]}
//                   me
//                 />
//               ))}
//               {messages3.map((msg, index) => (
//                 <ReplyComponent
//                   key={index}
//                   img={
//                     "https://i.pinimg.com/564x/53/09/ee/5309eed4c9ce7c7396390de9525cad29.jpg" // Replace with actual sender image
//                   }
//                   messages={[msg]}
//                 />
//               ))}
//             </div>
//             <div className="w-full flex gap-4 px-6">
//               <img src={paperClip} alt="" />
//               <div className="relative flex w-full">
//                 <input
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") handleSumbit();
//                   }}
//                   type="text"
//                   placeholder="Escribe un mensaje"
//                   className="w-full outline-none rounded-lg border-[1px] py-2 px-3"
//                 />
//                 <img
//                   onClick={handleSumbit}
//                   src={paperPlane}
//                   alt="Enviar mensaje"
//                   className="absolute right-4 top-2.5 cursor-pointer"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : !isMobile ? (
//         <div className="flex justify-center items-center w-full">
//           <div className="flex flex-col items-center">
//             <img src={messageIcon} alt="" className="w-28" />
//             <p className="text-xl font-semibold">Tus mensajes</p>
//             <p>Envía mensajes privados a un grupo</p>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };
