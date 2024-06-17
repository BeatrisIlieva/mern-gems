import { DynamicFormAuthUser } from "../DynamicForm/DynamicFormAuthUser";
import { useService } from "../../hooks/useService";
import { addressInformationServiceFactory } from "../../services/addressInformationService";
import { useAuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";
import { useState, useEffect } from "react";
import { hasFormErrorOccurred } from "../../utils/hasFormErrorOccurred";
import {
  INITIAL_FORM_VALUES,
  FORM_KEYS,
} from "../User/Account/AccountDetails/AddressInformationFormPopup/initialFormValues";
import styles from "./CompleteOrder.module.css";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBagContext } from "../../contexts/BagContext";
import { BagList } from "../Bag/BagList/BagList";
import { authServiceFactory } from "../../services/authService";

export const CompleteOrder = () => {
  const { bagItems, totalPrice, totalQuantity } = useBagContext();
  const authService = useService(authServiceFactory);
  const { userId } = useAuthContext();
  const [user, setUser] = useState([]);
  const addressInformationService = useService(
    addressInformationServiceFactory
  );
  const [userInformation, setUserInformation] = useState([]);

  useEffect(() => {
    authService
      .find(userId)
      .then((dataFromServer) => {
        setUser(dataFromServer);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });

  const {
    values,
    updateForm,
    clickHandler,
    blurHandler,
    changeHandler,
    submitHandler,
  } = useForm(INITIAL_FORM_VALUES);

  useEffect(() => {
    addressInformationService
      .find(userId)
      .then((data) => {
        setUserInformation(data);
        updateForm();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userInformation]);

  const onSubmit = async (e) => {
    submitHandler(e);

    const errorOccurred = hasFormErrorOccurred(values);

    if (!errorOccurred) {
      const phoneNumber = values.phoneNumber.fieldValue;
      const country = values.country.fieldValue;
      const city = values.city.fieldValue;
      const street = values.street.fieldValue;
      const apartment = values.apartment.fieldValue;
      const zipCode = values.zipCode.fieldValue;

      const data = {
        phoneNumber,
        country,
        city,
        street,
        apartment,
        zipCode,
      };

      try {
        await addressInformationService.update(userId, data);
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  return (
    <section className={styles["complete-order-box"]}>
      <div>
        <div className={styles["title-container"]}>
          <h2 className={styles["title"]}>Checkout</h2>
          <div className={styles["title-sub-container"]}>
            <h4 className={styles["main-sub-title"]}>Shipping</h4>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={styles["arrow"]}
            />
            <h4 className={styles["sub-title"]}>Payment</h4>
          </div>
        </div>
        <div className={styles["complete-order-container"]}>
          <div className={styles["complete-order-left-container"]}>
            <div className={styles["left-top-container"]}>
              <h4 className={styles["left-top-container-title"]}>
                Shipping Information
              </h4>
              <h4 className={styles["left-top-container-email"]}>
                {user.email}
              </h4>
            </div>
            <form
              method="POST"
              onSubmit={onSubmit}
              className={styles["form-container"]}
            >
              <DynamicFormAuthUser
                values={values}
                formKeys={FORM_KEYS}
                clickHandler={clickHandler}
                blurHandler={blurHandler}
                changeHandler={changeHandler}
                initialFormValues={INITIAL_FORM_VALUES}
                userInformation={userInformation}
              />
            </form>
          </div>
          <div className={styles["complete-order-right-container"]}>
            <div className={styles["bag-right-container-sticky"]}>
              <ul className={styles["complete-order-left-sub-container"]}>
                {bagItems.map((item) => (
                  <li
                    key={item._id}
                    className={styles["bag-left-sub-left-container"]}
                  >
                    <BagList {...item} />
                  </li>
                ))}
              </ul>
              <div className={styles["bag-right-sub-container"]}>
                <div className={styles["bag-right-sub-right-container"]}>
                  <p className={styles["bag-right-sub-container-bold"]}>
                    Subtotal
                  </p>
                  <p
                    className={`${styles["bag-right-sub-container-absolute"]} ${styles["bag-right-sub-container-bold"]}`}
                  >
                    ${totalPrice}
                  </p>
                </div>
                <div className={styles["bag-right-sub-right-container"]}>
                  <p>Shipping</p>
                  <p
                    className={`${styles["bag-right-sub-container-absolute"]} ${styles["bag-right-sub-container-not-bold"]}`}
                  >
                    Complimentary
                  </p>
                </div>
                <div className={styles["flex-container-line"]}>
                  <hr className={styles["hr-line"]} />
                  <img
                    className={styles["line-img"]}
                    src="https://res.cloudinary.com/deztgvefu/image/upload/v1707499296/template_images/giphy_s_b3cfly_1_b0dwbo.gif"
                    alt=""
                  />
                  <hr className={styles["hr-line"]} />
                </div>
                <div className={styles["bag-right-sub-right-container"]}>
                  <p className={styles["bag-right-sub-container-bold"]}>
                    Total
                  </p>
                  <p
                    className={`${styles["bag-right-sub-container-absolute"]} ${styles["bag-right-sub-container-bold"]}`}
                  >
                    ${totalPrice}
                  </p>
                </div>
                <div className={styles["continue-checkout-button-container"]}>
                  <button className={styles["continue-checkout-button"]}>
                    Continue Checkout
                  </button>
                  {/* <Link to={`/complete-order/${user}`}>
                <input
                  className={`${styles["button"]} ${styles["pink"]} ${styles["hover"]} ${styles["continue-checkout-button"]}`}
                  type="submit"
                  value="Continue Checkout"
                />
              </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
