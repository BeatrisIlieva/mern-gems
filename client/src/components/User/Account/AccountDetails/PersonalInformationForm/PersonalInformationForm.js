import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../../contexts/AuthContext";
import { useService } from "../../../../../hooks/useService";
import { personalInformationServiceFactory } from "../../../../../services/personalInformationService";
import { INITIAL_FORM_VALUES, FORM_KEYS } from "./initialFormValues";
import { useForm } from "../../../../../hooks/useForm";
import { DynamicFormAuthUser } from "../../../../DynamicForm/DynamicFormAuthUser";

export const PersonalInformationForm = () => {
  const { userId } = useAuthContext();
  const personalInformationService = useService(
    personalInformationServiceFactory
  );
  const [userPersonalInformation, setUserPersonalInformation] = useState([]);

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
    personalInformationService
      .find(userId)
      .then((data) => {
        setUserPersonalInformation(data);
        updateForm();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userPersonalInformation]);

  const onSubmit = async (e) => {
    submitHandler(e);

    const updatedValues = { ...values };

    if (errorOccurred) {
      setValues(updatedValues);

      errorOccurred = false;

      return;
    } else {
      const firstName = values.firstName.fieldValue;
      const lastName = values.lastName.fieldValue;
      const birthday = values.birthday.fieldValue;
      const specialDay = values.specialDay.fieldValue;

      const data = { firstName, lastName, birthday, specialDay };
      try {
        await personalInformationService.update(userId, data);
      } catch (err) {
        console.log(err.message);
        const updatedValues = { ...values };
        setValues(updatedValues);
        updateForm();
      }
    }
  };

  return (
    <section>
      <form
        method="POST"
        onSubmit={onSubmit}
      >
        <DynamicFormAuthUser
          values={values}
          FORM_KEYS={FORM_KEYS}
          clickHandler={clickHandler}
          blurHandler={blurHandler}
          changeHandler={changeHandler}
          initialFormValues={INITIAL_FORM_VALUES}
          userInformation={userPersonalInformation}
        />
      </form>
    </section>
  );
};
