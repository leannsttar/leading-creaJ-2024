export const AboutUsPage = () => {
  return (
    <div className="mx-[1.25rem] mb-[4rem]">
      <div className="w-full font-prompt flex flex-col h-[90vh] justify-between pb-[5rem]">
        <h1 className="text-[2rem] text-center">Sobre Nosotros</h1>
        <h2 className="text-[3rem] text-center font-semibold font-anonymous tracking-[.1rem] leading-[3.4rem]">
          <span className="text-[#7889E1]">Eres increíble,</span> tus proyectos
          también debería serlo
        </h2>
        <div className="flex justify-center gap-[.4rem]">
          <div className="">
            <img src="/doodleSwinging.svg" alt="" className="w-[7rem]" />
          </div>
          <div className="">
            <img
              src="/doodleProgramming.svg"
              alt=""
              className="mt-[3rem] w-[7rem]"
            />
          </div>
          <div>
            <img src="/doodleWondering.svg" alt="" className="w-[8rem]" />
          </div>
        </div>
      </div>
      <div className="mx-[1rem]">
        <p className="font-anonymous text-center text-[2.4rem]">
          Quiénes <span className="text-[#E7B943]">somos</span>
        </p>
        <div className="space-y-[2rem] font-light mt-[1rem]">
          <p>
            Descubre <span className="font-bold">Leading</span>, el espacio
            donde la colaboración se une a la eficiencia para potenciar tu
            trabajo en equipo.
          </p>
          <p>
            En Leading, creamos una plataforma integral que te permite
            organizar proyectos, asignar tareas, seguir el progreso y programar
            reuniones de manera fluida. Facilitamos la gestión de equipos, la
            comunicación efectiva y la toma de decisiones colaborativa. Únete a
            nosotros para transformar ideas en logros y llevar tu trabajo en
            equipo al siguiente nivel.
          </p>
        </div>
        <div className="flex justify-center">
          <img src="/puzzleTeam.svg" alt="" className="w-[15rem]" />
        </div>
      </div>
      <div className="bg-[#FFF7DC] m p-[3rem] mt-[3rem]">
        <p className="font-anonymous leading-[3rem] text-[2.2rem] pb-[.6rem] mb-[3rem] border-b-[1px] border-[#878787]">
          Propósito y perspectiva
        </p>
        <div className="mb-8">
          <p className="font-anonymous text-[6rem] leading-[1rem]">“</p>
          <p className="font-light text-[1rem]">
            I have tried deep breathing and meditating in the past with no luck,
            so I figured I'd give this little tool a try! Initially, I didn't
            like it, because it didn't feel like it did anything. Then I tried
            it a few more times and started to get the feel for it. The Shift
            really helps me to focus on my breathing, and counting as I inhale
            and exhale. I've noticed a significant change in my general mood in
            the short time I've had mine. I find myself often reaching for it
            just to hold, because even the reminder that it's there is soothing.
            I highly recommend The Shift to anyone who struggles with their
            mental health. Also, their customer service is amazing!
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex gap-[.7rem]">
            <img src="/checkIcon.svg" alt="" className="w-[2rem]" />
            <p className="text-[1.2rem]">JuanCharlie, Leading</p>
          </div>
          <p className="text-sm">PRODUCTIVIDAD ESTELAR</p>
        </div>
      </div>
    </div>
  );
};
