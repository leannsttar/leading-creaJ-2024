import axios from "axios";
import { createContext, useEffect, useState } from "react";
const SessionContext = createContext();

const obtenerPerfil = async (token) => {
  try {
    const configHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.get("https://leading-crea-j-2024-server.vercel.app/api/users", configHeaders);
    return data;
  } catch (error) {
    return error;
  }
};

const SessionProvider = ({ children }) => {
  const [usuario, setUsuario] = useState({});
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [imagen, setImagen] = useState(null);

  const perfil = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await obtenerPerfil(token?? "");
      setUsuario(data);
      setImagen(data.imagen); 
      setUserToken(token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const login = async (usuario) => {
    localStorage.setItem("token", usuario.token);
    await perfil();
  };

  const logout = () => {
    setUsuario({});
    setImagen(null);
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    perfil();
  }, []);

  const updateUserInfo = async (newUserInfo, newImage) => {
    setUsuario(newUserInfo);
    setImagen(newImage);
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <SessionContext.Provider
      value={{
        usuario,
        imagen,
        login,
        logout,
        userToken,
        updateUserInfo
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };