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
    <div className="w-full bg-[#151515] px-[1.25rem] py-[2rem] text-white font-anonymous space-y-[3rem]">
      <div className="flex justify-between items-start">
        <img src="./logoTemporalWhite.svg" alt="" />
        <div className="space-y-[2rem] text-right">
          <p>Email</p>
          <p>info@leading.design</p>
        </div>
      </div>
      <div className="flex w-full gap-[0.5rem]">
        {socials.map((social, index) => {
          return (
            <div key={index} className="border-dashed border-[#808080] border-[2px]">
              <img src={social.icon} alt="" className="p-[0.8rem] w-[4rem] h-[4rem]"/>
            </div>
          );
        })}
      </div>
      <div className="space-y-2 font-prompt font-md">
        <p>Inicio</p>
        <p>Sobre nosotros</p>
        <p>Características</p>
        <p>FAQs</p>
      </div>
      <div>
        <p>© Leading Design, all rights reserved.</p>
      </div>
    </div>
  );
};

