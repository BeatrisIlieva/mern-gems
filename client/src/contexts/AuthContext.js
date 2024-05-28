import { createContext, useContext } from "react";
import { authServiceFactory } from "../services/authService";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("auth", {});
  const authService = authServiceFactory(auth.accessToken);
  const navigate = useNavigate();
  const location = useLocation();

  const onRegisterSubmit = async (token) => {
    const from = location.state?.from?.pathname || "/";

    try {
      setAuth(token);

      navigate(from, { replace: true });
    } catch (err) {
      console.log(err.message);
    }
  };

  const onLoginSubmit = async (token) => {
    const from = location.state?.from?.pathname || "/";

    try {
      setAuth(token);

      navigate(from, { replace: true });
    } catch (err) {
      console.log(err.message);
    }
  };

  const onLogout = async () => {
    await authService.logout();

    setAuth({});
  };


  const context = {
    onRegisterSubmit,
    onLoginSubmit,
    onLogout,
    userId: auth._id,
    token: auth.accessToken,
    isAuthenticated: !!auth.accessToken,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context;
};
