import { useEffect } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useContext } from "react";
import { INVALID_CREDENTIALS_ERROR_MESSAGE } from "../../../../constants/forms";
import { INITIAL_FORM_VALUES, FORM_KEYS } from "./initialFormValues";
import { useForm } from "../../../../hooks/useForm";
import { DynamicFormNotAuthUser } from "../../../DynamicForm/DynamicFormNotAuthUser";

export const LoginForm = () => {
  const { onLoginSubmit } = useContext(AuthContext);

  let {
    values,
    setValues,
    updateForm,
    clickHandler,
    blurHandler,
    changeHandler,
    submitHandler,
    errorOccurred,
  } = useForm(INITIAL_FORM_VALUES);

  useEffect(() => {
    updateForm();
  }, []);

  const onSubmit = async (e) => {
    submitHandler(e);

    const updatedValues = { ...values };

    if (errorOccurred) {
      errorOccurred = false;
      setValues(updatedValues);

      return;
    } else {
      const email = values.email.fieldValue;
      const password = values.password.fieldValue;

      const data = { email, password };
      try {
        await onLoginSubmit(data);
      } catch (err) {
        if (err.message === INVALID_CREDENTIALS_ERROR_MESSAGE) {
          values[FORM_KEYS.Email].errorMessage = err.message;
          const updatedValues = { ...values };
          setValues(updatedValues);
          updateForm();
        }
      }
    }
  };

  const buttonValue = "Sign In";

  return (
    <section>
      <form
        method="POST"
        onSubmit={onSubmit}
      >
        <DynamicFormNotAuthUser
          values={values}
          FORM_KEYS={FORM_KEYS}
          clickHandler={clickHandler}
          blurHandler={blurHandler}
          changeHandler={changeHandler}
          initialFormValues={INITIAL_FORM_VALUES}
          buttonValue={buttonValue}
        />
      </form>
    </section>
  );
};
