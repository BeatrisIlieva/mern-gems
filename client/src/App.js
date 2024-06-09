import styles from "./App.module.css";
import "normalize.css";
import { Routes, Route } from "react-router-dom";
import { RouteGuard } from "./components/RouteGuard/RouteGuard";
import { UserUUIDProvider } from "./contexts/UserUUIDContext";
import { AuthProvider } from "./contexts/AuthContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { JewelryCollectionList } from "./components/JewelryCollectionList/JewelryCollectionList";
import { JewelryList } from "./components/JewelryList/JewelryList";
import { Wishlist } from "./components/Wishlist/Wishlist";
import { JewelryItem } from "./components/JewelryItem/JewelryItem";
import { Login } from "./components/User/Login/Login";
import { Register } from "./components/User/Register/Register";
import { Account } from "./components/User/Account/Account";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <UserUUIDProvider>
      <AuthProvider>
        <WishlistProvider>
          <div className={styles["app"]}>
            <Header />
            <main className={styles["main"]}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/forget-me-not"
                  element={<JewelryCollectionList />}
                />
                <Route path="/classics" element={<JewelryCollectionList />} />
                <Route path="/pirouette" element={<JewelryCollectionList />} />
                <Route
                  path="/diamond-loop"
                  element={<JewelryCollectionList />}
                />
                <Route path="/sunflower" element={<JewelryCollectionList />} />
                <Route
                  path="/sparkling-cluster"
                  element={<JewelryCollectionList />}
                />
                <Route path="/bracelets" element={<JewelryList />} />
                <Route path="/earrings" element={<JewelryList />} />
                <Route path="/necklaces" element={<JewelryList />} />
                <Route path="/rings" element={<JewelryList />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route
                  path="/:slugifiedCategoryTitle/:slugifiedJewelryTitle"
                  element={<JewelryItem />}
                />
                <Route path="/user/login" element={<Login />} />
                <Route path="/user/register" element={<Register />} />
                <Route path="/user/account" element={<Account />} />
              </Routes>
            </main>
            <footer className={styles["footer"]}>
              <Footer />
            </footer>
          </div>
        </WishlistProvider>
      </AuthProvider>
    </UserUUIDProvider>
  );
}

export default App;
