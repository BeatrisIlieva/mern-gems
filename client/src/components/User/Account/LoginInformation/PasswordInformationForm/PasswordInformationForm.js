import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../../contexts/AuthContext";
import { useService } from "../../../../../hooks/useService";
import { loginInformationServiceFactory } from "../../../../../services/loginInformationService";
import { getPasswordMismatchErrorMessage } from "../../../../../hooks/useFormValidator";
import { SUCCESS_MESSAGES } from "../../../../../constants/forms";
import { INITIAL_FORM_VALUES, FORM_KEYS } from "./initialFormValues";
import { DynamicFormAuthUser } from "../../../../DynamicForm/DynamicFormAuthUser";
import { useForm } from "../../../../../hooks/useForm";

export const PasswordInformationForm = () => {
  const { userId } = useAuthContext();
  const loginInformationService = useService(loginInformationServiceFactory);
  const [userPasswordInformation, setUserPasswordInformation] = useState([]);

  const {
    values,
    setValues,
    errorOccurred,
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
        setUserPasswordInformation(data);
        updateForm();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userPasswordInformation]);

  const onSubmit = async (e) => {
    submitHandler(e);

    const updatedValues = { ...values };

    if (
      updatedValues[FORM_KEYS.NewPassword].errorMessage === "" ||
      updatedValues[FORM_KEYS.RetypeNewPassword].errorMessage === ""
    ) {
      const passwordErrorMessage = getPasswordMismatchErrorMessage(
        values[FORM_KEYS.NewPassword].fieldValue,
        values[FORM_KEYS.RetypeNewPassword].fieldValue
      );

      updatedValues[FORM_KEYS.NewPassword].errorMessage = passwordErrorMessage;
      updatedValues[FORM_KEYS.RetypeNewPassword].errorMessage =
        passwordErrorMessage;

      if (passwordErrorMessage !== "") {
        errorOccurred = true;
      }
    }

    if (errorOccurred) {
      values[FORM_KEYS.NewPassword].successMessage = "";
      setValues(updatedValues);

      errorOccurred = false;

      return;
    } else {
      const password = values.password.fieldValue;
      const newPassword = values.newPassword.fieldValue;

      const data = { password, newPassword };
      try {
        await loginInformationService.updatePassword(userId, data);
        values[FORM_KEYS.NewPassword].successMessage =
          SUCCESS_MESSAGES.newPassword;
        setValues(updatedValues);
        updateForm();
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
    <section>
      <form method="POST" onSubmit={onSubmit}>
        <DynamicFormAuthUser
          values={values}
          FORM_KEYS={FORM_KEYS}
          clickHandler={clickHandler}
          blurHandler={blurHandler}
          changeHandler={changeHandler}
          initialFormValues={INITIAL_FORM_VALUES}
          userInformation={userPasswordInformation}
        />
      </form>
    </section>
  );
};
