import styles from "./App.module.css";
import "normalize.css";
import { Routes, Route } from "react-router-dom";
import { RouteGuard } from "./components/RouteGuard/RouteGuard";
import { UserUUIDProvider } from "./contexts/UserUUIDContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { JewelryList } from "./components/JewelryList/JewelryList";
import { JewelryWishlist } from "./components/JewelryWishlist/JewelryWishlist";
import {JewelryItem} from "./components/JewelryItem/JewelryItem";
import { Login } from "./components/User/Login/Login";
import { Register } from "./components/User/Register/Register";
import { Account } from "./components/User/Account/Account";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <UserUUIDProvider>
      <AuthProvider>
        <div className={styles["app"]}>
          <Header />
          <main className={styles["main"]}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rings" element={<JewelryList />} />
              <Route path="/wishlist" element={<JewelryWishlist />} />
              <Route path="/by-jewelry/:jewelryId" element={<JewelryItem />} />
              <Route path="/user/login" element={<Login />} />
              <Route path="/user/register" element={<Register />} />
              <Route path="/user/account" element={<Account />} />
            </Routes>
          </main>
          <footer className={styles["footer"]}>
            <Footer />
          </footer>
        </div>
      </AuthProvider>
    </UserUUIDProvider>
  );
}

export default App;
