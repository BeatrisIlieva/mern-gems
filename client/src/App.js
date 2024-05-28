import styles from "./App.module.css";
import "normalize.css";
import { Routes, Route } from "react-router-dom";
import { RouteGuard } from "./components/RouteGuard/RouteGuard";
import { UserUUIDProvider } from "./contexts/UserUUIDContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Register } from "./components/User/Register/Register";

function App() {
  return (
    <UserUUIDProvider>
      <AuthProvider>
        <div className={styles["app"]}>
          <Routes>
            <Route path="/user/register" element={<Register />} />
          </Routes>
        </div>
      </AuthProvider>
    </UserUUIDProvider>
  );
}

export default App;
