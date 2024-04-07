import { Link } from "react-router-dom"; 

export const SignUpPage = () => {
  return (
    <>
      <div className="flex justify-center items-center font-Poppins p-16">
        <div className="flex flex-col md:grid grid-cols-2 bg-white rounded-lg shadow-2xl overflow-hidden md:gap-3">
            <div style={{backgroundImage:"url(/background-form.png)"}} className="bg-contain">
    
            </div>
          <div className="w-full px-12 py-24">
            <div className="flex flex-col">
              <h2 className="text-3xl font-semibold mb-2">
                Crea tu cuenta  
              </h2>
              <p className="text-lg mb-8">
                ¿Ya tienes una cuenta? <span></span> 
                {/*El span es porque no se me ocurrió otra manera de poner un espacio*/}
                <Link className="text-black font-bold underline" to="#">
                   Iniciar sesión
                </Link>
              </p>
              <form className="space-y-6 md:space-y-8">
                <div>
                  <label className="text-lg font-medium" htmlFor="full-name">
                    Nombre
                  </label>
                  <input
                    id="full-name"
                    className="w-full pl-4 rounded-md outline-none border border-gray h-12 text-lg"
                    placeholder="Ingresa tu nombre"
                    type="text"
                  />
                </div>
                <div>
                  <label className="text-lg font-medium" htmlFor="email">
                    Correo
                  </label>
                  <input
                    id="email"
                    className="w-full pl-4 rounded-md outline-none border border-gray h-12 text-lg"
                    placeholder="Ingresa un correo"
                    type="email"
                  />
                </div>
                <div>
                  <label className="text-lg font-medium" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    className="w-full pl-4 rounded-md outline-none border border-gray h-12 text-lg"
                    placeholder="Ingresa una contraseña"
                    type="password"
                  />
                </div>
                <button className="w-full bg-black text-zinc-50 rounded-md text-xl h-12">Crear cuenta</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
