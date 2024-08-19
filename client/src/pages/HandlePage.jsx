import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-lg w-full">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center justify-center w-24 h-24 bg-blue-500 rounded-full text-white">
            <svg
              className="w-16 h-16"
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
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">404 - Página no encontrada</h1>
        <p className="text-gray-600 mb-6">
          La página que estás buscando no existe o ha sido eliminada.
        </p>
        <Link
          to="/"
          className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-150"
        >
          Regresar a la página principal
        </Link>
      </div>
    </div>
  );
};
