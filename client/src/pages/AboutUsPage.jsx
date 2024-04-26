export const AboutUsPage = () => {
  return (
    <div className="mx-[1.25rem] mb-[4rem] md:flex md:flex-col md:items-center">
      <div className="w-full font-prompt flex flex-col sm:h-[90vh] justify-between pb-[8rem] md:pb-[7rem] md:items-center" style={{minHeight: '-webkit-fill-available'}}>
        <h1 className="text-[2rem] text-center md:text-[1.2rem]">
          Sobre nosotros
        </h1>
        <h2 className="text-[3rem] text-center font-semibold font-anonymous tracking-[.1rem] leading-[3.4rem] md:text-[4rem] md:w-[70%] lg:w-[50%] md:leading-[5rem] md:tracking-tighter mx-3 ">
          <span className="text-[#7889E1]">Eres increíble,</span> tus proyectos
          también debería serlo
        </h2>
        <div className="flex justify-center gap-[.4rem]">
          <div className="hidden md:block">
            <img
              src="/doodleChilling.svg"
              alt=""
              className="w-[13.5rem] relative top-[3rem] md:static"
            />
          </div>
          <div className="">
            <img
              src="/doodleSwinging.svg"
              alt=""
              className="w-[7rem] md:w-[13.2rem] relative md:bottom-[3rem]"
            />
          </div>
          <div className="">
            <img
              src="/doodleProgramming.svg"
              alt=""
              className="w-[7rem] md:w-[14rem] relative top-[3rem] md:static"
            />
          </div>
          <div>
            <img
              src="/doodleWondering.svg"
              alt=""
              className="w-[8rem] md:w-[14rem] relative md:bottom-[3rem]"
            />
          </div>
          <div className="hidden md:block">
            <img
              src="/doodleFlying.svg"
              alt=""
              className="w-[10.5rem] relative top-[3rem] md:static"
            />
          </div>
        </div>
      </div>
      <div className="mx-[1rem] md:flex md:w-[80%] lg:w-[50%] justify-center md:gap-[1rem]">
        <div className="md:w-[50%] md:flex md:flex-col">
          <p className="font-anonymous text-center text-[2.4rem] md:flex md:flex-col md:text-left md:leading-[2.2rem]">
            Quiénes{" "}
            <span className="text-[#E7B943] md:text-[2rem] md:ml-20">
              somos
            </span>
          </p>
          <div className="hidden md:flex md:place-content-start">
            <img
              src="/puzzleTeam.svg"
              alt=""
              className="w-[15rem] md:w-[20rem]"
            />
          </div>
        </div>
        <div className="space-y-[2rem] font-light mt-[1rem] md:w-[50%] md:text-[1.2rem]">
          <p>
            Descubre <span className="font-bold">Leading</span>, el espacio
            donde la colaboración se une a la eficiencia para potenciar tu
            trabajo en equipo.
          </p>
          <p>
            En Leading, creamos una plataforma integral que te permite organizar
            proyectos, asignar tareas, seguir el progreso y programar reuniones
            de manera fluida. Facilitamos la gestión de equipos, la comunicación
            efectiva y la toma de decisiones colaborativa. Únete a nosotros para
            transformar ideas en logros y llevar tu trabajo en equipo al
            siguiente nivel.
          </p>
        </div>
        <div className="flex justify-center md:hidden">
          <img src="/puzzleTeam.svg" alt="" className="w-[15rem]" />
        </div>
      </div>
      <div className="bg-[#FFF7DC] p-[3rem] mt-[3rem] md:w-[80%] md:flex md:gap-[3rem] lg:w-[60%]">
        <div className="md:border-r-[1px] md:pr-[3rem] border-[#878787] md:flex md:flex-col md:justify-between">
          <p className="font-anonymous leading-[3rem] text-[2.2rem] pb-[.6rem] mb-[3rem] border-b-[1px] border-[#878787] md:border-b-0 md:mb-0">
            Propósito y perspectiva
          </p>
          <p className="hidden text-sm md:block">PRODUCTIVIDAD ESTELAR</p>
        </div>
        <div>
          <div className="mb-8">
            <p className="font-anonymous text-[6rem] leading-[1rem] md:mt-[2rem]">“</p>
            <p className="font-light text-[1rem] md:text-[1.2rem]">
            "¡Estoy absolutamente impresionado con la plataforma Leading! Como gerente de proyectos, siempre he buscado una herramienta que me permita organizar mis proyectos de manera eficiente y colaborativa, ¡y Leading lo hace todo y más! La interfaz es increíblemente intuitiva, lo que facilita la navegación y la gestión de tareas. Además, la integración con GitHub y Figma ha sido una verdadera bendición, permitiéndome colaborar con mi equipo de manera más efectiva. ¡Definitivamente recomendaría Leading a cualquier persona que busque una solución completa para la gestión de proyectos!"
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex gap-[.7rem]">
              <img src="/checkIcon.svg" alt="" className="w-[2rem]" />
              <p className="text-[1.2rem]">Nacely Orellana, Leading</p>
            </div>
            <p className="text-sm md:hidden">PRODUCTIVIDAD ESTELAR</p>
          </div>
        </div>
      </div>
    </div>
  );
};
