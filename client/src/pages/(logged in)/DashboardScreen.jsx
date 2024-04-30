import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

import avatar from "../../assets/Avatar.jpg";
import mailIcon from "../../assets/mailIcon.svg";
import threeDotsIcon from "../../assets/threeDotsSmaller.svg";
import threeDotsProfile from "../../assets/threeDotsProfile.svg"
import { TitleSection } from "../../components/ui/TitleSection";

const MessageComponent = ({ img, name, message }) => {
  return (
    <div className="flex items-center gap-2 truncate">
      <img src={img} alt="" className="rounded-full min-w-12 min-h-12 max-w-12 max-h-12 object-cover" />
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-[#797979] ">{message}</p>
      </div>
    </div>
  );
};

const array = ["bg-[#FEE4CB]", "bg-[#FFD3E2]", "bg-[#E9E7FD]", "bg-[#C8F7DC]"];

const randomBackground = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const item = arr[randomIndex];

  return item;
};

const membersImages = [
  "https://i.pinimg.com/564x/92/65/92/926592d27ecc6abc27d73a7dde4f1130.jpg",
  "https://i.pinimg.com/564x/b0/4d/ce/b04dce32900438388f8828766ad91d9c.jpg",
  "https://i.pinimg.com/564x/65/61/5e/65615e8b17ba19d86b5b7220f7341911.jpg",
];

const ProjectCard = ({ title, date, members, category, progress }) => {

  const background = randomBackground(array);

  return (
    <div className={`${background} px-6 py-4 rounded-3xl space-y-1 lg:w-full xl:w-[45%]`}>
      <div className="flex justify-between items-center">
        <p className="text-gray-500">{date}</p>
        <img src={threeDotsIcon} alt="" className="rotate-90" />
      </div>
      <div className="flex flex-col justify-center items-center w-full text-center pt-1 lg:gap-4">
        <div>
          <p className="text-2xl font-bold">{title}</p>
          <p className="text-lg text-gray-500">{category}</p>
        </div>
        <div className="w-full">
          <p className="text-left font-bold">Progress</p>
          <progress
            className={`progress w-full bg-white ${background === "bg-[#FEE4CB]"
              ? "progress-warning"
              : background === "bg-[#FFD3E2]"
                ? "progress-secondary"
                : background === "bg-[#E9E7FD]"
                  ? "progress-primary"
                  : background === "bg-[#C8F7DC]"
                    ? "progress-accent"
                    : ""
              }`}
            value={progress}
            max="100"
          ></progress>
          <p className="text-right font-bold">{progress} %</p>
        </div>
      </div>
      <div>
        <div className="flex">
          {members.map((image, index) => {
            return (
              <img
                key={index}
                src={image}
                className="rounded-full object-cover w-9 h-9"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const DashboardScreen = () => {
  return (
    <div
      //Acá usualmente sería 5 rem de pt, por los 5 rem de h del header, pero pongo 6 para que no quede justo
      className="w-full overflow-hidden pt-[6rem] md:pt-[3rem] lg:pt-0 pb-[4rem] flex justify-center"
      style={{ height: "calc(100% - 10rem)" }}
    >
      <div className="flex flex-col w-[90%] lg:w-full lg:flex-row-reverse">
        <div className="flex flex-col items-center w-full lg:w-[30rem] lg:bg-[#F7F7F7] lg:h-screen lg:overflow-auto" >
          <h1 className="text-[1.8rem] font-semibold text-center font-prompt lg:hidden">
            Bienvenido Edward
          </h1>
          <div className="flex w-full justify-between px-5 pt-3">
            <TitleSection title={"Mi perfil"} className={'hidden lg:block '} />
            <img src={threeDotsProfile} alt="" className="hidden lg:block w-7"/>
          </div>
          <div className="rounded-full shadow-xl w-[13rem] h-[13rem]">
            <img
              src={avatar}
              alt=""
              className="rounded-full w-full h-full object-cover p-3"
            />
          </div>
          <div className="mt-4 text-center text-[1.2rem]">
            <p className="font-inter font-semibold ">Edward Elric</p>
            <p className="font-inter">Backend Developer</p>
          </div>
          <div className="bg-[#F7F7F7] rounded-xl w-full py-3 px-4 font-inter mt-4 lg:px-6">
            <div className="flex justify-between">
              <p className="font-semibold">Mensajes</p>
              <div className="flex items-center gap-1">
                <p>Ver más </p>
                <MdKeyboardArrowDown />
              </div>
            </div>
            <div className="mt-3 space-y-3">
              <MessageComponent
                name={"Florencio Dorrance"}
                message={"How is the project going?"}
                img={
                  "https://i.pinimg.com/564x/64/8e/cc/648ecc03733843da141ab9d3400808e5.jpg"
                }
              />
              <MessageComponent
                name={"Jamel Eusebio"}
                message={"The fugging design is done"}
                img={
                  "https://i.pinimg.com/564x/31/a6/26/31a6267a098dc64421d445ec8d91696a.jpg"
                }
              />
              <MessageComponent
                name={"Benny Spanbauer"}
                message={"get the job done man cmon"}
                img={
                  "https://i.pinimg.com/564x/fd/90/23/fd902362a39ef9b403f6f766f50ef5c5.jpg"
                }
              />
            </div>
          </div>
          <div className="bg-[#F7F7F7] rounded-xl w-full px-3 pt-3 pb-4 font-inter mt-4 lg:px-6">
            <div className="flex justify-between">
              <p className="font-semibold">Invitaciones</p>
              <div className="flex items-center gap-1">
                <p>Ver más </p>
                <MdKeyboardArrowDown />
              </div>
            </div>
            <div className="mt-3 space-y-5">
              <p>
                Tienes <span className="font-semibold">6 invitaciones</span> a
                proyectos
              </p>
              <div className="flex items-center gap-3 bg-white pl-2 py-1">
                <div className="bg-black min-h-10 min-w-10 rounded-full grid place-content-center">
                  <img src={mailIcon} alt="" className="w-5 h-5" />
                </div>
                <div className="flex justify-between w-full items-center">
                  <div>
                    <p className="font-medium">Alphonse Elric</p>
                    <p className="text-[.85rem]">Alphonse te ha invitado</p>
                  </div>
                  <MdKeyboardArrowRight size={35} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[4rem] lg:mt-[2.2rem] lg:w-[90%] lg:ml-12 lg:mr-12 xl:ml-14 xl:mr-0 lg:overflow-auto lg:h-screen lg:pb-[15rem] " style={{scrollbarColor: 'transparent transparent'}}>
          <div className="space-y-6">
            <TitleSection title={"Projectos recientes"} />
            <div className="flex flex-col gap-3 mt-7 md:mt-0 lg:gap-5 lg:w-full lg:flex-row lg:flex-wrap ">
              <ProjectCard
                title={"Web Designing"}
                date={"December 20, 2021"}
                category={"Prototyping"}
                members={membersImages}
                progress={70}
              />
              <ProjectCard
                title={"Testing"}
                date={"December 20, 2021"}
                category={"Prototyping"}
                members={membersImages}
                progress={60}
              />
              <ProjectCard
                title={"UI Development"}
                date={"December 20, 2021"}
                category={"Prototyping"}
                members={membersImages}
                progress={50}
              />
              <ProjectCard
                title={"Data Analysis"}
                date={"December 20, 2021"}
                category={"Prototyping"}
                members={membersImages}
                progress={60}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
