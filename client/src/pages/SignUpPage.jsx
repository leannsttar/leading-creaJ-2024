import { Link } from "react-router-dom"; 

export const SignUpPage = () => {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center p-4 font-Poppins">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="hidden md:block md:w-1/2 bg-black p-4">
            <img
              alt="Space illustration"
              className="object-cover object-center h-full w-full"
              height="400"
              src="/placeholder.svg"
              style={{
                aspectRatio: "400/400",
                objectFit: "cover",
              }}
              width="400"
            />
          </div>
          <div className="w-full md:w-1/2 p-6 sm:p-12">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold mb-2">
                Crea tu cuenta 
              </h2>
              <p className="text-sm mb-8">
                ¿Ya tienes una cuenta?
                <Link className="text-blue-600" href="#">
                  Iniciar sesión
                </Link>
              </p>
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium" htmlFor="full-name">
                    Nombre
                  </label>
                  <input
                    id="full-name"
                    placeholder="Ingresa tu nombre"
                    type="text"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="email">
                    Correo
                  </label>
                  <input
                    id="email"
                    placeholder="Ingresa un correo"
                    type="email"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    placeholder="Ingresa una contraseña"
                    type="password"
                  />
                </div>
                <button className="w-full bg-black text-zinc-50">Crear cuenta</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
