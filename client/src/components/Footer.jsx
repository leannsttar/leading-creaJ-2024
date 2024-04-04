import { Link } from "react-router-dom";
const socials = [
  {
    icon: "/facebookIcon.svg",
  },
  {
    icon: "/twitterIcon.svg",
  },
  {
    icon: "/googleIcon.svg",
  },
  {
    icon: "/linkedInIcon.svg",
  },
  {
    icon: "/ytIcon.svg",
  },
];

export const Footer = () => {
  return (
    <div className="w-full bg-[#151515] px-[1.25rem] py-[2rem] text-white font-anonymous space-y-[3rem] md:px-[5rem]">
      <div className="flex justify-between items-start">
        <img src="./logoTemporalWhite.svg" alt="" />
        <div className="md:flex md:gap-[10rem]">
          <div className="space-y-[1rem] text-right md:text-left">
            <p className="font-semibold font-prompt">Email</p>
            <p>info@leading.design</p>
          </div>
          <div className="hidden md:flex space-y-2 font-anonymous font-md md:flex-col">
            <Link to={"/"}>Inicio</Link>
            <Link to={"/about"}>Sobre nosotros</Link>
            <Link to={"/features"}>Características</Link>
            <Link to={"/faqs"}>Preguntas frecuentes</Link>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-[0.5rem]">
        {socials.map((social, index) => {
          return (
            <div
              key={index}
              className="border-dashed border-[#808080] border-[2px]"
            >
              <img
                src={social.icon}
                alt=""
                className="p-[0.8rem] w-[4rem] h-[4rem]"
              />
            </div>
          );
        })}
      </div>
      <div className="space-y-2 font-prompt font-md md:hidden flex flex-col">
        <Link to={"/"}>Inicio</Link>
        <Link to={"/about"}>Sobre nosotros</Link>
        <Link to={"/features"}>Características</Link>
        <Link to={"/faqs"}>FAQs</Link>
      </div>
      <div>
        <p>© Leading Design, all rights reserved.</p>
      </div>
    </div>
  );
};
