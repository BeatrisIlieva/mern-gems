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
import { CATEGORIES_BY_NAMES } from "./constants/categories";
import { COLLECTIONS_BY_NAMES } from "./constants/collections";

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
                  element={
                    <JewelryCollectionList
                      collectionId={COLLECTIONS_BY_NAMES["forget-me-not"]}
                    />
                  }
                />
                <Route
                  path="/classics"
                  element={
                    <JewelryCollectionList
                      collectionId={COLLECTIONS_BY_NAMES["classics"]}
                    />
                  }
                />
                <Route
                  path="/pirouette"
                  element={
                    <JewelryCollectionList
                      collectionId={COLLECTIONS_BY_NAMES["pirouette"]}
                    />
                  }
                />
                <Route
                  path="/diamond-loop"
                  element={
                    <JewelryCollectionList
                      collectionId={COLLECTIONS_BY_NAMES["diamond-loop"]}
                    />
                  }
                />
                <Route
                  path="/sunflower"
                  element={
                    <JewelryCollectionList
                      collectionId={COLLECTIONS_BY_NAMES["sunflower"]}
                    />
                  }
                />
                <Route
                  path="/sparkling-cluster"
                  element={
                    <JewelryCollectionList
                      collectionId={COLLECTIONS_BY_NAMES["sparkling-cluster"]}
                    />
                  }
                />
                <Route
                  path="/bracelets"
                  element={
                    <JewelryList
                      categoryId={CATEGORIES_BY_NAMES["bracelets"]}
                    />
                  }
                />
                <Route
                  path="/earrings"
                  element={
                    <JewelryList categoryId={CATEGORIES_BY_NAMES["earrings"]} />
                  }
                />
                <Route
                  path="/necklaces"
                  element={
                    <JewelryList
                      categoryId={CATEGORIES_BY_NAMES["necklaces"]}
                    />
                  }
                />
                <Route
                  path="/rings"
                  element={
                    <JewelryList categoryId={CATEGORIES_BY_NAMES["rings"]} />
                  }
                />
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
