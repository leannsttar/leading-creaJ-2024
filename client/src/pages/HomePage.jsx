import { BlackButton } from "../components/ui/BlackButton";

export const HomePage = () => {
  return (
    // <div className="mx-4">
    //   <div className="p-2 flex flex-col items-center h-[90vh] justify-between">
    //     <p className="max-w-fit px-3 py-1 bg-[#d5e0ff] rounded-full text-[1em] font-prompt font-[500]">
    //       Bienvenido a TeamSync
    //     </p>
    //     <div className="w-full mt-2 bg-[url('./hiFiveHomeMobile.svg')] bg-no-repeat bg-contain bg-[center_bottom_2rem] bg-opacity-50">
    //       <h1 className="text-[4em] text-center font-md font-prompt">
    //         Eficiencia Con Una Gestión De Equipo Sencilla
    //       </h1>
    //     </div>
    //     <div className="mt-8 flex flex-col items-center gap-4 mb-10">
    //       <p className="font-semibold text-[1.2em] tracking-tight text-center">
    //         Transforma la colaboración de tu equipo con nuestra plataforma
    //         innovadora.
    //       </p>
    //       <img src="./playIcon.svg" alt="" className="w-[2em]"/>
    //       <BlackButton text={"Empieza ya"}/>
    //     </div>
    //   </div>
    // </div>
    <div className="mx-4">
      <div className="p-2 flex flex-col items-center h-[90vh] justify-between">
        <p className="max-w-fit px-3 py-1 bg-[#d5e0ff] rounded-full text-[1em] font-prompt font-[500]">
          Bienvenido a TeamSync
        </p>
        <div className="w-full mt-2 flex flex-col items-center gap-5">
          <h1 className="text-[2.6em] text-center font-md font-prompt w-min leading-[2.6rem]">
            Productividad Con Una Gestión De Equipo Sencilla
          </h1>
          <img src="./hiFiveHomeBlack.svg" alt="" className="w-[15.7em]"/>
        </div>
        <div className="mt-8 flex flex-col items-center gap-4 mb-10">
          <p className="font-semibold text-[1.2em] tracking-tight text-center">
            Transforma la colaboración de tu equipo con nuestra plataforma
            innovadora.
          </p>
          <img src="./playIcon.svg" alt="" className="w-[2em]"/>
          <BlackButton text={"Empieza ya"}/>
        </div>
      </div>
    </div>
  );
};
