import { Toast } from "primereact";
import { createContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const toast = useRef(null);
  const [erro, setErro] = useState();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token") || "{}");
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer${token.jwt}`;

      api
        .get(`usernow`)
        .then(({ data }) => {
          setUser({ ...data, jwt: token.jwt });
        })
        .catch((e) => {
          console.log(e);
          setErro(e);
        });
      setUser(token);
    }
  }, []);

  async function handleLogin(auth) {
    await api
      .post("auth", auth)
      .then(({ data }) => {
        setUser(data);
        localStorage.setItem("token", JSON.stringify({ jwt: data.jwt }));
        api.defaults.headers.common.Authorization = `Bearer${data.jwt}`;
        navigate("/dashboard");
      })
      .catch((e) => {
        console.log(e.response.data);
        setErro(e.response.data);
        localStorage.removeItem("token");
        api.defaults.headers.common.Authorization = `Bearer`;
        navigate("/login");
      });
  }
  async function handleLogout() {
    setUser(null);
    localStorage.removeItem("token");
    api.defaults.headers.common.Authorization = `Bearer`;
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ user, erro, handleLogin, handleLogout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
