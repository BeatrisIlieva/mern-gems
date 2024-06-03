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

  const onRegisterSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/";

    try {
      const result = await authService.register({ ...data });

      const token = result["token"];

      setAuth(token);

      navigate(from, { replace: true });
    } catch (err) {
      const errorMessage = err.message;
      console.log(err.message);
      throw new Error(errorMessage);
    }
  };

  const onLoginSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/";

    try {
      const result = await authService.login({ ...data });

      const token = result["token"];

      setAuth(token);

      navigate(from, { replace: true });
    } catch (err) {
      const errorMessage = err.message;
      console.log(err.message);
      throw new Error(errorMessage);
    }
  };

  const onLogout = async () => {
    await authService.logout();

    setAuth({});

    navigate("/user/login");
  };

  const onDelete = async () => {
    await authService.delete(auth._id);

    setAuth({});
    navigate("/user/register");
  };

  const context = {
    onRegisterSubmit,
    onLoginSubmit,
    onLogout,
    onDelete,
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
