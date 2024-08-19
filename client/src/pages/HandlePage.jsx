import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      <div className="bg-white shadow-xl rounded-lg p-10 text-center max-w-lg w-full border border-gray-300">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center justify-center w-32 h-32 bg-yellow-400 rounded-full text-white shadow-md">
            <svg
              className="w-20 h-20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 6v6m0 4h.01M21 12c0 4.97-4.03 9-9 9-4.97 0-9-4.03-9-9 0-4.97 4.03-9 9-9 4.97 0 9 4.03 9 9z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          404 - Página no encontrada
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          La página que estás buscando no existe o ha sido eliminada.
        </p>
        <Link
          to="/"
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 transition duration-300"
        >
          Regresar a la página principal
        </Link>
        <div className="mt-8">
          <p className="text-gray-500 text-sm">¿Necesitas ayuda?</p>
          <a
            href="mailto:support@example.com"
            className="text-blue-500 hover:underline"
          >
            Contacta con soporte
          </a>
        </div>
      </div>
    </div>
  );
};
