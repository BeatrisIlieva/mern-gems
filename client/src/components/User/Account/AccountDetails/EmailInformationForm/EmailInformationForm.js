import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../../contexts/AuthContext";
import { useService } from "../../../../../hooks/useService";
import { loginInformationServiceFactory } from "../../../../../services/loginInformationService";
import { INITIAL_FORM_VALUES, FORM_KEYS } from "./initialFormValues";
import { useForm } from "../../../../../hooks/useForm";
import { DynamicFormAuthUser } from "../../../../DynamicForm/DynamicFormAuthUser";
import { hasFormErrorOccurred } from "../../../../../utils/hasFormErrorOccurred";
import styles from "../AccountDetails.module.css";

export const EmailInformationForm = () => {
  const { userId } = useAuthContext();
  const loginInformationService = useService(loginInformationServiceFactory);
  const [userInformation, setUserInformation] = useState([]);

  const {
    values,
    setValues,
    updateForm,
    clickHandler,
    blurHandler,
    changeHandler,
    submitHandler,
  } = useForm(INITIAL_FORM_VALUES);

  useEffect(() => {
    loginInformationService
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
      const email = values.email.fieldValue;
      const password = values.password.fieldValue;

      const data = { email, password };
      try {
        await loginInformationService.updateEmail(userId, data);
      } catch (err) {
        console.log(err.message);
        values[FORM_KEYS.Password].errorMessage = err.message;
        const updatedValues = { ...values };
        setValues(updatedValues);
        updateForm();
      }
    }
  };

  return (
    <section className={styles["slideIn"]}>
      <form method="POST" onSubmit={onSubmit}>
        <DynamicFormAuthUser
          values={values}
          FORM_KEYS={FORM_KEYS}
          clickHandler={clickHandler}
          blurHandler={blurHandler}
          changeHandler={changeHandler}
          initialFormValues={INITIAL_FORM_VALUES}
          userInformation={userInformation}
        />
      </form>
    </section>
  );
};
