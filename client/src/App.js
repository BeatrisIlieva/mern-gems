import styles from "./App.module.css";
import "normalize.css";
import { Routes, Route } from "react-router-dom";
import { RouteGuard } from "./components/RouteGuard/RouteGuard";
import { UserUUIDProvider } from "./contexts/UserUUIDContext";
import { AuthProvider } from "./contexts/AuthContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { JewelryList } from "./components/JewelryList/JewelryList";
import { Wishlist } from "./components/Wishlist/Wishlist";
import { JewelryItem } from "./components/JewelryItem/JewelryItem";
import { Login } from "./components/User/Login/Login";
import { Register } from "./components/User/Register/Register";
import { Account } from "./components/User/Account/Account";
import { Footer } from "./components/Footer/Footer";
import { CATEGORIES_BY_NAMES } from "./constants/categories";
import { COLLECTIONS_BY_NAMES } from "./constants/collections";
import { jewelryCollectionServiceFactory } from "./services/jewelryCollectionService";
import { jewelryServiceFactory } from "./services/jewelryService";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <UserUUIDProvider>
      <AuthProvider>
        <WishlistProvider>
          <ScrollToTop />
          <div className={styles["app"]}>
            <Header />
            <main className={styles["main"]}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/forget-me-not"
                  element={
                    <JewelryList
                      entityId={COLLECTIONS_BY_NAMES["forget-me-not"]}
                      serviceFactory={jewelryCollectionServiceFactory}
                    />
                  }
                />
                <Route
                  path="/classics"
                  element={
                    <JewelryList
                      entityId={COLLECTIONS_BY_NAMES["classics"]}
                      serviceFactory={jewelryCollectionServiceFactory}
                    />
                  }
                />
                <Route
                  path="/pirouette"
                  element={
                    <JewelryList
                      entityId={COLLECTIONS_BY_NAMES["pirouette"]}
                      serviceFactory={jewelryCollectionServiceFactory}
                    />
                  }
                />
                <Route
                  path="/diamond-loop"
                  element={
                    <JewelryList
                      entityId={COLLECTIONS_BY_NAMES["diamond-loop"]}
                      serviceFactory={jewelryCollectionServiceFactory}
                    />
                  }
                />
                <Route
                  path="/sunflower"
                  element={
                    <JewelryList
                      entityId={COLLECTIONS_BY_NAMES["sunflower"]}
                      serviceFactory={jewelryCollectionServiceFactory}
                    />
                  }
                />
                <Route
                  path="/sparkling-cluster"
                  element={
                    <JewelryList
                      entityId={COLLECTIONS_BY_NAMES["sparkling-cluster"]}
                      serviceFactory={jewelryCollectionServiceFactory}
                    />
                  }
                />
                <Route
                  path="/bracelets"
                  element={
                    <JewelryList
                      entityId={CATEGORIES_BY_NAMES["bracelets"]}
                      serviceFactory={jewelryServiceFactory}
                    />
                  }
                />
                <Route
                  path="/earrings"
                  element={
                    <JewelryList
                      entityId={CATEGORIES_BY_NAMES["earrings"]}
                      serviceFactory={jewelryServiceFactory}
                    />
                  }
                />
                <Route
                  path="/necklaces"
                  element={
                    <JewelryList
                      entityId={CATEGORIES_BY_NAMES["necklaces"]}
                      serviceFactory={jewelryServiceFactory}
                    />
                  }
                />
                <Route
                  path="/rings"
                  element={
                    <JewelryList
                      entityId={CATEGORIES_BY_NAMES["rings"]}
                      serviceFactory={jewelryServiceFactory}
                    />
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
            <Footer />
          </div>
        </WishlistProvider>
      </AuthProvider>
    </UserUUIDProvider>
  );
}

export default App;
