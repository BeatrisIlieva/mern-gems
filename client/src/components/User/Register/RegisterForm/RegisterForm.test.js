// import { render, screen, fireEvent } from "@testing-library/react";
// import { RegisterForm } from "./RegisterForm";
// import { AuthContext } from "../../../../contexts/AuthContext";
// import { FORM_KEYS } from "./initialFormValues";
// import { ERROR_MESSAGES } from "../../../../constants/forms";
// import { BrowserRouter } from "react-router-dom";

// const mockOnRegisterSubmit = jest.fn();

// const mockAuthContextValue = {
//   onRegisterSubmit: mockOnRegisterSubmit,
// };

// describe("RegisterFrom Component", () => {
//   test("Fill First Name with valid data expect success", async () => {
//     render(
//       <AuthContext.Provider value={mockAuthContextValue}>
//         <RegisterForm />
//       </AuthContext.Provider>
//     );

//     const button = screen.getByTestId("submit");
//     expect(button).toBeInTheDocument();

//     const input = screen.getByTestId(`${FORM_KEYS.FirstName}-input`);
//     expect(input).toBeInTheDocument();

//     fireEvent.change(input, { target: { value: "Test" } });
//     fireEvent.click(button);

//     const errorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.FirstName}-error`
//     );
//     const errorMessageContent = errorMessageContainer.textContent.trim();
//     expect(errorMessageContent).toBe("");
//   });
// });

// describe("RegisterFrom Component", () => {
//   test("Fill First Name with empty string expect error", async () => {
//     render(
//       <AuthContext.Provider value={mockAuthContextValue}>
//         <RegisterForm />
//       </AuthContext.Provider>
//     );

//     const button = screen.getByTestId("submit");
//     expect(button).toBeInTheDocument();

//     const input = screen.getByTestId(`${FORM_KEYS.FirstName}-input`);

//     fireEvent.change(input, { target: { value: "" } });
//     fireEvent.click(button);

//     const errorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.FirstName}-error`
//     );
//     const errorMessageContent = errorMessageContainer.textContent.trim();
//     expect(errorMessageContent).toBe(ERROR_MESSAGES.firstName);
//   });
// });

// describe("RegisterFrom Component", () => {
//   test("Fill First Name with a single letter expect error", async () => {
//     render(
//       <AuthContext.Provider value={mockAuthContextValue}>
//         <RegisterForm />
//       </AuthContext.Provider>
//     );

//     const button = screen.getByTestId("submit");
//     expect(button).toBeInTheDocument();

//     const input = screen.getByTestId(`${FORM_KEYS.FirstName}-input`);

//     fireEvent.change(input, { target: { value: "T" } });
//     fireEvent.click(button);

//     const errorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.FirstName}-error`
//     );
//     const errorMessageContent = errorMessageContainer.textContent.trim();
//     expect(errorMessageContent).toBe(ERROR_MESSAGES.firstName);
//   });
// });

// describe("RegisterFrom Component", () => {
//   test("Fill First Name including digit expect error", async () => {
//     render(
//       <AuthContext.Provider value={mockAuthContextValue}>
//         <RegisterForm />
//       </AuthContext.Provider>
//     );

//     const button = screen.getByTestId("submit");
//     expect(button).toBeInTheDocument();

//     const input = screen.getByTestId(`${FORM_KEYS.FirstName}-input`);

//     fireEvent.change(input, { target: { value: "T1" } });
//     fireEvent.click(button);

//     const errorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.FirstName}-error`
//     );
//     const errorMessageContent = errorMessageContainer.textContent.trim();
//     expect(errorMessageContent).toBe(ERROR_MESSAGES.firstName);
//   });
// });

// describe("RegisterFrom Component", () => {
//   test("Fill Last Name with valid data expect success", async () => {
//     render(
//       <AuthContext.Provider value={mockAuthContextValue}>
//         <RegisterForm />
//       </AuthContext.Provider>
//     );

//     const button = screen.getByTestId("submit");
//     expect(button).toBeInTheDocument();

//     const input = screen.getByTestId(`${FORM_KEYS.LastName}-input`);
//     expect(input).toBeInTheDocument();

//     fireEvent.change(input, { target: { value: "Test" } });
//     fireEvent.click(button);

//     const errorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.LastName}-error`
//     );
//     const errorMessageContent = errorMessageContainer.textContent.trim();
//     expect(errorMessageContent).toBe("");
//   });
// });

// describe("RegisterFrom Component", () => {
//   test("Fill Last Name with empty string expect error", async () => {
//     render(
//       <AuthContext.Provider value={mockAuthContextValue}>
//         <RegisterForm />
//       </AuthContext.Provider>
//     );

//     const button = screen.getByTestId("submit");
//     expect(button).toBeInTheDocument();

//     const input = screen.getByTestId(`${FORM_KEYS.LastName}-input`);

//     fireEvent.change(input, { target: { value: "" } });
//     fireEvent.click(button);

//     const errorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.LastName}-error`
//     );
//     const errorMessageContent = errorMessageContainer.textContent.trim();
//     expect(errorMessageContent).toBe(ERROR_MESSAGES.lastName);
//   });
// });

// describe("RegisterFrom Component", () => {
//   test("Fill Last Name with a single letter expect error", async () => {
//     render(
//       <AuthContext.Provider value={mockAuthContextValue}>
//         <RegisterForm />
//       </AuthContext.Provider>
//     );

//     const button = screen.getByTestId("submit");
//     expect(button).toBeInTheDocument();

//     const input = screen.getByTestId(`${FORM_KEYS.LastName}-input`);

//     fireEvent.change(input, { target: { value: "T" } });
//     fireEvent.click(button);

//     const errorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.LastName}-error`
//     );
//     const errorMessageContent = errorMessageContainer.textContent.trim();
//     expect(errorMessageContent).toBe(ERROR_MESSAGES.lastName);
//   });
// });

// describe("RegisterFrom Component", () => {
//   test("Fill Last Name including digit expect error", async () => {
//     render(
//       <AuthContext.Provider value={mockAuthContextValue}>
//         <RegisterForm />
//       </AuthContext.Provider>
//     );

//     const button = screen.getByTestId("submit");
//     expect(button).toBeInTheDocument();

//     const input = screen.getByTestId(`${FORM_KEYS.LastName}-input`);

//     fireEvent.change(input, { target: { value: "T1" } });
//     fireEvent.click(button);

//     const errorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.LastName}-error`
//     );
//     const errorMessageContent = errorMessageContainer.textContent.trim();
//     expect(errorMessageContent).toBe(ERROR_MESSAGES.lastName);
//   });
// });

// describe("RegisterFrom Component", () => {
//   test("Fill Email and Retype Email with valid data expect success", async () => {
//     render(
//       <AuthContext.Provider value={mockAuthContextValue}>
//         <RegisterForm />
//       </AuthContext.Provider>
//     );

//     const button = screen.getByTestId("submit");
//     expect(button).toBeInTheDocument();

//     const input = screen.getByTestId(`${FORM_KEYS.Email}-input`);
//     expect(input).toBeInTheDocument();

//     const retypeInput = screen.getByTestId(`${FORM_KEYS.RetypeEmail}-input`);
//     expect(retypeInput).toBeInTheDocument();

//     fireEvent.change(input, { target: { value: "test@email.com" } });
//     fireEvent.change(retypeInput, { target: { value: "test@email.com" } });
//     fireEvent.click(button);

//     const errorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.Email}-error`
//     );
//     const errorMessageContent = errorMessageContainer.textContent.trim();
//     expect(errorMessageContent).toBe("");

//     const retypeErrorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.Email}-error`
//     );
//     const retypeErrorMessageContent =
//       retypeErrorMessageContainer.textContent.trim();
//     expect(retypeErrorMessageContent).toBe("");
//   });
// });

// describe("RegisterFrom Component", () => {
//   test("Fill Email with empty string, fill Retype Email with valid data expect error", async () => {
//     render(
//       <AuthContext.Provider value={mockAuthContextValue}>
//         <RegisterForm />
//       </AuthContext.Provider>
//     );

//     const button = screen.getByTestId("submit");
//     expect(button).toBeInTheDocument();

//     const input = screen.getByTestId(`${FORM_KEYS.Email}-input`);
//     expect(input).toBeInTheDocument();

//     const retypeInput = screen.getByTestId(`${FORM_KEYS.RetypeEmail}-input`);
//     expect(retypeInput).toBeInTheDocument();

//     fireEvent.change(input, { target: { value: "" } });
//     fireEvent.change(retypeInput, { target: { value: "test@email.com" } });
//     fireEvent.click(button);

//     const errorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.Email}-error`
//     );
//     const errorMessageContent = errorMessageContainer.textContent.trim();
//     expect(errorMessageContent).toBe(ERROR_MESSAGES.emailMismatch);

//     const retypeErrorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.Email}-error`
//     );
//     const retypeErrorMessageContent =
//       retypeErrorMessageContainer.textContent.trim();
//     expect(retypeErrorMessageContent).toBe(ERROR_MESSAGES.emailMismatch);
//   });
// });

// describe("RegisterFrom Component", () => {
//   test("Fill Email with valid data, fill Retype Email with empty string expect error", async () => {
//     render(
//       <AuthContext.Provider value={mockAuthContextValue}>
//         <RegisterForm />
//       </AuthContext.Provider>
//     );

//     const button = screen.getByTestId("submit");
//     expect(button).toBeInTheDocument();

//     const input = screen.getByTestId(`${FORM_KEYS.Email}-input`);
//     expect(input).toBeInTheDocument();

//     const retypeInput = screen.getByTestId(`${FORM_KEYS.RetypeEmail}-input`);
//     expect(retypeInput).toBeInTheDocument();

//     fireEvent.change(input, { target: { value: "test@email.com" } });
//     fireEvent.change(retypeInput, { target: { value: "" } });
//     fireEvent.click(button);

//     const errorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.Email}-error`
//     );
//     const errorMessageContent = errorMessageContainer.textContent.trim();
//     expect(errorMessageContent).toBe(ERROR_MESSAGES.emailMismatch);

//     const retypeErrorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.Email}-error`
//     );
//     const retypeErrorMessageContent =
//       retypeErrorMessageContainer.textContent.trim();
//     expect(retypeErrorMessageContent).toBe(ERROR_MESSAGES.emailMismatch);
//   });
// });

// describe("RegisterFrom Component", () => {
//   test("Fill Email with invalid data, fill Retype Email with invalid data expect error", async () => {
//     render(
//       <AuthContext.Provider value={mockAuthContextValue}>
//         <RegisterForm />
//       </AuthContext.Provider>
//     );

//     const button = screen.getByTestId("submit");
//     expect(button).toBeInTheDocument();

//     const input = screen.getByTestId(`${FORM_KEYS.Email}-input`);
//     expect(input).toBeInTheDocument();

//     const retypeInput = screen.getByTestId(`${FORM_KEYS.RetypeEmail}-input`);
//     expect(retypeInput).toBeInTheDocument();

//     fireEvent.change(input, { target: { value: "t@e.c" } });
//     fireEvent.change(retypeInput, { target: { value: "t@e.c" } });
//     fireEvent.click(button);

//     const errorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.Email}-error`
//     );
//     const errorMessageContent = errorMessageContainer.textContent.trim();
//     expect(errorMessageContent).toBe(ERROR_MESSAGES.email);

//     const retypeErrorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.Email}-error`
//     );
//     const retypeErrorMessageContent =
//       retypeErrorMessageContainer.textContent.trim();
//     expect(retypeErrorMessageContent).toBe(ERROR_MESSAGES.email);
//   });
// });

// describe("RegisterFrom Component", () => {
//   test("Fill Password and Retype Password with valid data expect success", async () => {
//     render(
//       <AuthContext.Provider value={mockAuthContextValue}>
//         <RegisterForm />
//       </AuthContext.Provider>
//     );

//     const button = screen.getByTestId("submit");
//     expect(button).toBeInTheDocument();

//     const input = screen.getByTestId(`${FORM_KEYS.Password}-input`);
//     expect(input).toBeInTheDocument();

//     const retypeInput = screen.getByTestId(`${FORM_KEYS.RetypePassword}-input`);
//     expect(retypeInput).toBeInTheDocument();

//     fireEvent.change(input, { target: { value: "123456Tt" } });
//     fireEvent.change(retypeInput, { target: { value: "123456Tt" } });
//     fireEvent.click(button);

//     const errorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.Password}-error`
//     );
//     const errorMessageContent = errorMessageContainer.textContent.trim();
//     expect(errorMessageContent).toBe("");

//     const retypeErrorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.RetypePassword}-error`
//     );
//     const retypeErrorMessageContent =
//       retypeErrorMessageContainer.textContent.trim();
//     expect(retypeErrorMessageContent).toBe("");
//   });
// });

// describe("RegisterFrom Component", () => {
//   test("Fill Password with empty string, fill Retype Password with valid data expect error", async () => {
//     render(
//       <AuthContext.Provider value={mockAuthContextValue}>
//         <RegisterForm />
//       </AuthContext.Provider>
//     );

//     const button = screen.getByTestId("submit");
//     expect(button).toBeInTheDocument();

//     const input = screen.getByTestId(`${FORM_KEYS.Password}-input`);
//     expect(input).toBeInTheDocument();

//     const retypeInput = screen.getByTestId(`${FORM_KEYS.RetypePassword}-input`);
//     expect(retypeInput).toBeInTheDocument();

//     fireEvent.change(input, { target: { value: "" } });
//     fireEvent.change(retypeInput, { target: { value: "123456Tt" } });
//     fireEvent.click(button);

//     const errorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.Password}-error`
//     );
//     const errorMessageContent = errorMessageContainer.textContent.trim();
//     expect(errorMessageContent).toBe(ERROR_MESSAGES.passwordMismatch);

//     const retypeErrorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.Password}-error`
//     );
//     const retypeErrorMessageContent =
//       retypeErrorMessageContainer.textContent.trim();
//     expect(retypeErrorMessageContent).toBe(ERROR_MESSAGES.passwordMismatch);
//   });
// });

// describe("RegisterFrom Component", () => {
//   test("Fill Password with valid data, fill Retype Password with empty string expect error", async () => {
//     render(
//       <AuthContext.Provider value={mockAuthContextValue}>
//         <RegisterForm />
//       </AuthContext.Provider>
//     );

//     const button = screen.getByTestId("submit");
//     expect(button).toBeInTheDocument();

//     const input = screen.getByTestId(`${FORM_KEYS.Password}-input`);
//     expect(input).toBeInTheDocument();

//     const retypeInput = screen.getByTestId(`${FORM_KEYS.RetypePassword}-input`);
//     expect(retypeInput).toBeInTheDocument();

//     fireEvent.change(input, { target: { value: "123456Tt" } });
//     fireEvent.change(retypeInput, { target: { value: "" } });
//     fireEvent.click(button);

//     const errorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.Password}-error`
//     );
//     const errorMessageContent = errorMessageContainer.textContent.trim();
//     expect(errorMessageContent).toBe(ERROR_MESSAGES.passwordMismatch);

//     const retypeErrorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.Password}-error`
//     );
//     const retypeErrorMessageContent =
//       retypeErrorMessageContainer.textContent.trim();
//     expect(retypeErrorMessageContent).toBe(ERROR_MESSAGES.passwordMismatch);
//   });
// });

// describe("RegisterFrom Component", () => {
//   test("Fill Password with invalid data, fill Retype Password with invalid data expect error", async () => {
//     render(
//       <AuthContext.Provider value={mockAuthContextValue}>
//         <BrowserRouter>
//           <RegisterForm />
//         </BrowserRouter>
//       </AuthContext.Provider>
//     );

//     const button = screen.getByTestId("submit");
//     expect(button).toBeInTheDocument();

//     const input = screen.getByTestId(`${FORM_KEYS.Password}-input`);
//     expect(input).toBeInTheDocument();

//     const retypeInput = screen.getByTestId(`${FORM_KEYS.RetypePassword}-input`);
//     expect(retypeInput).toBeInTheDocument();

//     fireEvent.change(input, { target: { value: "1t" } });
//     fireEvent.change(retypeInput, { target: { value: "1t" } });
//     fireEvent.click(button);

//     const errorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.Password}-error`
//     );
//     const errorMessageContent = errorMessageContainer.textContent.trim();
//     expect(errorMessageContent).toBe(ERROR_MESSAGES.password);

//     const retypeErrorMessageContainer = screen.getByTestId(
//       `${FORM_KEYS.Password}-error`
//     );
//     const retypeErrorMessageContent =
//       retypeErrorMessageContainer.textContent.trim();
//     expect(retypeErrorMessageContent).toBe(ERROR_MESSAGES.password);
//   });
// });

// // describe("RegisterFrom Component", () => {
// //   test("Fill entire form with valid data, expect redirect to home page", async () => {
// //     render(
// //       <AuthContext.Provider value={mockAuthContextValue}>
// //         <RegisterForm />
// //         {/* <Home /> */}
// //       </AuthContext.Provider>
// //     );

// //     const button = screen.getByTestId("submit");
// //     expect(button).toBeInTheDocument();

// //     const firstNameInput = screen.getByTestId(`${FORM_KEYS.FirstName}-input`);
// //     expect(firstNameInput).toBeInTheDocument();
// //     fireEvent.change(firstNameInput, { target: { value: "Test" } });

// //     const lastNameInput = screen.getByTestId(`${FORM_KEYS.LastName}-input`);
// //     expect(lastNameInput).toBeInTheDocument();
// //     fireEvent.change(lastNameInput, { target: { value: "Test" } });

// //     const emailInput = screen.getByTestId(`${FORM_KEYS.Email}-input`);
// //     expect(emailInput).toBeInTheDocument();
// //     fireEvent.change(emailInput, { target: { value: "test@email.com" } });

// //     const retypeEmailInput = screen.getByTestId(
// //       `${FORM_KEYS.RetypeEmail}-input`
// //     );
// //     expect(retypeEmailInput).toBeInTheDocument();
// //     fireEvent.change(retypeEmailInput, { target: { value: "test@email.com" } });

// //     const passwordInput = screen.getByTestId(`${FORM_KEYS.Password}-input`);
// //     expect(passwordInput).toBeInTheDocument();
// //     fireEvent.change(passwordInput, { target: { value: "123456Tt" } });

// //     const retypePasswordInput = screen.getByTestId(
// //       `${FORM_KEYS.RetypePassword}-input`
// //     );
// //     expect(retypePasswordInput).toBeInTheDocument();
// //     fireEvent.change(retypePasswordInput, { target: { value: "123456Tt" } });

// //     fireEvent.click(button);
// //     const heroSection = screen.getByTestId("hero-section");
// //     expect(heroSection).toBeInTheDocument;
// //   });
// // });

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RegisterForm } from "./RegisterForm";
import { AuthContext } from "../../../../contexts/AuthContext";
import { ERROR_MESSAGES } from "../../../../constants/forms";
import { FORM_KEYS, INITIAL_FORM_VALUES } from "./initialFormValues";

const mockOnRegisterSubmit = jest.fn();

const mockAuthContextValue = {
  onRegisterSubmit: mockOnRegisterSubmit,
};

describe("RegisterForm Component", () => {
  test("Submits the form with valid values; Expect update function to be called", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const inputs = {};

    Object.values(FORM_KEYS).forEach((value) => {
      inputs[value] = screen.getByTestId(`${value}-input`);
    });

    Object.entries(inputs).forEach(([inputKey, inputValue]) => {
      fireEvent.change(inputValue, {
        target: { value: INITIAL_FORM_VALUES[inputKey].validTestData },
      });
    });

    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    const submitData = {};

    Object.entries(INITIAL_FORM_VALUES).forEach(([key, value]) => {
      submitData[key] = value.validTestData;
    });
    const { firstName, lastName, email, password } = submitData;
    await waitFor(() => {
      expect(mockOnRegisterSubmit).toHaveBeenCalledWith({
        firstName,
        lastName,
        email,
        password,
      });
    });

    Object.keys(INITIAL_FORM_VALUES).forEach((key) => {
      const errorMessageContainer = screen.getByTestId(`${key}-error`);
      expect(errorMessageContainer).toHaveTextContent("");
    });
  });

  test("Submits the form with invalid values; Expect update function not to be called", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const inputs = {};

    Object.values(FORM_KEYS).forEach((value) => {
      inputs[value] = screen.getByTestId(`${value}-input`);
    });

    Object.entries(inputs).forEach(([inputKey, inputValue]) => {
      fireEvent.change(inputValue, {
        target: { value: INITIAL_FORM_VALUES[inputKey].invalidTestData },
      });
    });

    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    const submitData = {};

    Object.entries(INITIAL_FORM_VALUES).forEach(([key, value]) => {
      submitData[key] = value.invalidTestData;
    });

    await waitFor(() => {
      expect(mockOnRegisterSubmit).not.toHaveBeenCalled();
    });

    Object.keys(INITIAL_FORM_VALUES).forEach((key) => {
      const errorMessageContainer = screen.getByTestId(`${key}-error`);
      expect(errorMessageContainer).toHaveTextContent(ERROR_MESSAGES[key]);
    });
  });

  test("Submits the form with empty values; Expect update function not to be called", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const inputs = {};

    Object.values(FORM_KEYS).forEach((value) => {
      inputs[value] = screen.getByTestId(`${value}-input`);
    });

    Object.entries(inputs).forEach(([inputKey, inputValue]) => {
      fireEvent.change(inputValue, {
        target: { value: INITIAL_FORM_VALUES[inputKey].emptyTestData },
      });
    });

    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    const submitData = {};

    Object.entries(INITIAL_FORM_VALUES).forEach(([key, value]) => {
      submitData[key] = value.emptyTestData;
    });

    await waitFor(() => {
      expect(mockOnRegisterSubmit).not.toHaveBeenCalled();
    });

    Object.keys(INITIAL_FORM_VALUES).forEach((key) => {
      const errorMessageContainer = screen.getByTestId(`${key}-error`);
      expect(errorMessageContainer).toHaveTextContent(ERROR_MESSAGES[key]);
    });
  });
});
