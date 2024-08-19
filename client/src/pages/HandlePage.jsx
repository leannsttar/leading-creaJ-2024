import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 bg-white w-full pb-16">
      <div className="text-center space-y-8 max-w-md mx-auto">
        <div className="inline-flex rounded-full bg-[#ECECEC] p-4">
          <div className="rounded-full bg-black p-4">
            <svg
              className="w-16 h-16 text-white"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 9.33337V14M14 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl lg:text-5xl font-bold text-slate-800">
          404 - Página no encontrada
        </h1>
        <p className="text-slate-600 mt-5 lg:text-lg text-base pb-12">
          La página que estás buscando no existe
          <br /> o ha sido removida.
        </p>
        <Link
          to="/"
          className="inline-block text-black hover:text-white border border-black hover:bg-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-250"
        >
          Regresar a la página principal
        </Link>
      </div>
    </div>
  );
};
