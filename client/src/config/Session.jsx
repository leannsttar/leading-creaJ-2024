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
    const data = await axios.get("http://localhost:5000/api/users", configHeaders);
    return data;
  } catch (error) {
    return error;
  }
};

const SessionProvider = ({ children }) => {
  const [usuario, setUsuario] = useState({});
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null)

  const perfil = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await obtenerPerfil(token ?? "");
      setUsuario(data);
      setUserToken(token)
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
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    perfil();
  }, []);



  if (loading) return <p>Cargando...</p>;

  return (
    <SessionContext.Provider
      value={{
        usuario,
        login,
        logout,
        userToken
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };