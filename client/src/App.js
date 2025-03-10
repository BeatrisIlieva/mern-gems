import styles from "./App.module.css";
import "normalize.css";
import { Routes, Route } from "react-router-dom";
import { RouteGuard } from "./components/RouteGuard/RouteGuard";
import { UserUUIDProvider } from "./contexts/UserUUIDContext";
import { AuthProvider } from "./contexts/AuthContext";
import { WishlistProvider } from "./contexts/WishListContext";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { JewelryList } from "./components/JewelryList/JewelryList";
import { Wishlist } from "./components/Wishlist/Wishlist";
import { JewelryItem } from "./components/JewelryItem/JewelryItem";
import { Login } from "./components/User/Login/Login";
import { Register } from "./components/User/Register/Register";
import { Account } from "./components/User/Account/Account";
import { Footer } from "./components/Footer/Footer";
import { CATEGORIES_BY_ID_AND_TITLE } from "./constants/categories";
import { COLLECTIONS_BY_ID_AND_TITLE } from "./constants/collections";
import { jewelryCollectionServiceFactory } from "./services/jewelryCollectionService";
import { jewelryServiceFactory } from "./services/jewelryService";
import { wishlistServiceFactory } from "./services/wishListService";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { Bag } from "./components/Bag/Bag";
import { BagProvider } from "./contexts/BagContext";
import { Checkout } from "./components/Checkout/Checkout";
import { Payment } from "./components/Payment/Payment";
import { OrderConfirmation } from "./components/OrderConfirmation/OrderConfirmation";

function App() {
  return (
    <UserUUIDProvider>
      <AuthProvider>
        <WishlistProvider>
          <BagProvider>
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
                        entityId={
                          COLLECTIONS_BY_ID_AND_TITLE["Forget-Me-Not"][0]
                        }
                        entityTitle={
                          COLLECTIONS_BY_ID_AND_TITLE["Forget-Me-Not"][1]
                        }
                        serviceFactory={jewelryCollectionServiceFactory}
                      />
                    }
                  />
                  <Route
                    path="/diamond-loop"
                    element={
                      <JewelryList
                        entityId={
                          COLLECTIONS_BY_ID_AND_TITLE["Diamond Loop"][0]
                        }
                        entityTitle={
                          COLLECTIONS_BY_ID_AND_TITLE["Diamond Loop"][1]
                        }
                        serviceFactory={jewelryCollectionServiceFactory}
                      />
                    }
                  />
                  <Route
                    path="/sunflower"
                    element={
                      <JewelryList
                        entityId={COLLECTIONS_BY_ID_AND_TITLE["Sunflower"][0]}
                        entityTitle={
                          COLLECTIONS_BY_ID_AND_TITLE["Sunflower"][1]
                        }
                        serviceFactory={jewelryCollectionServiceFactory}
                      />
                    }
                  />
                  <Route
                    path="/sparkling-cluster"
                    element={
                      <JewelryList
                        entityId={
                          COLLECTIONS_BY_ID_AND_TITLE["Sparkling Cluster"][0]
                        }
                        entityTitle={
                          COLLECTIONS_BY_ID_AND_TITLE["Sparkling Cluster"][1]
                        }
                        serviceFactory={jewelryCollectionServiceFactory}
                      />
                    }
                  />
                  <Route
                    path="/bracelets"
                    element={
                      <JewelryList
                        entityId={CATEGORIES_BY_ID_AND_TITLE["Bracelets"][0]}
                        entityTitle={CATEGORIES_BY_ID_AND_TITLE["Bracelets"][1]}
                        serviceFactory={jewelryServiceFactory}
                      />
                    }
                  />
                  <Route
                    path="/earrings"
                    element={
                      <JewelryList
                        entityId={CATEGORIES_BY_ID_AND_TITLE["Earrings"][0]}
                        entityTitle={CATEGORIES_BY_ID_AND_TITLE["Earrings"][1]}
                        serviceFactory={jewelryServiceFactory}
                      />
                    }
                  />
                  <Route
                    path="/necklaces"
                    element={
                      <JewelryList
                        entityId={CATEGORIES_BY_ID_AND_TITLE["Necklaces"][0]}
                        entityTitle={CATEGORIES_BY_ID_AND_TITLE["Necklaces"][1]}
                        serviceFactory={jewelryServiceFactory}
                      />
                    }
                  />
                  <Route
                    path="/rings"
                    element={
                      <JewelryList
                        entityId={CATEGORIES_BY_ID_AND_TITLE["Rings"][0]}
                        entityTitle={CATEGORIES_BY_ID_AND_TITLE["Rings"][1]}
                        serviceFactory={jewelryServiceFactory}
                      />
                    }
                  />
                  <Route
                    path="/:slugifiedCategoryTitle/:slugifiedJewelryTitle/:_id"
                    element={<JewelryItem />}
                  />
                  <Route path="/user/register" element={<Register />} />
                  <Route path="/user/login" element={<Login />} />
                  <Route path="/user/shopping-bag" element={<Bag />} />
                  <Route
                    path="/user/wishlist"
                    element={
                      <Wishlist serviceFactory={wishlistServiceFactory} />
                    }
                  />
                  <Route element={<RouteGuard />}>
                    <Route
                      path="/user/account"
                      element={
                        <RouteGuard>
                          <Account />
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/user/checkout"
                      element={
                        <RouteGuard>
                          <Checkout />
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/user/payment"
                      element={
                        <RouteGuard>
                          <Payment />
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/user/order-confirmation"
                      element={
                        <RouteGuard>
                          <OrderConfirmation />
                        </RouteGuard>
                      }
                    />
                  </Route>
                </Routes>
              </main>
              <Footer />
            </div>
          </BagProvider>
        </WishlistProvider>
      </AuthProvider>
    </UserUUIDProvider>
  );
}

export default App;
