import { render, screen, fireEvent } from "@testing-library/react";
import { RegisterForm } from "./RegisterForm";
import { AuthContext } from "../../../../contexts/AuthContext";
import { FORM_KEYS, INITIAL_FORM_VALUES } from "./initialFormValues";
import { ERROR_MESSAGES } from "../../../../constants/forms";

const mockOnRegisterSubmit = jest.fn();

const mockAuthContextValue = {
  onRegisterSubmit: mockOnRegisterSubmit,
};

describe("RegisterFrom Component", () => {
  test("Should successfully fill the form with valid input", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    const firstNameInput = screen.getByTestId(`${FORM_KEYS.FirstName}-input`);
    expect(firstNameInput).toBeInTheDocument();

    fireEvent.change(firstNameInput, { target: { value: "Test" } });
    fireEvent.click(button);

    const errorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.FirstName}-error`
    );
    const errorMessageText = errorMessageContainer.textContent.trim();
    expect(errorMessageText).toBe("");
  });
});

describe("RegisterFrom Component", () => {
  test("Should display an error when invalid input is entered in the form", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );
    const button = screen.getByTestId("submit");

    const firstNameInput = screen.getByTestId(`${FORM_KEYS.FirstName}-input`);

    fireEvent.change(firstNameInput, { target: { value: "" } });
    fireEvent.click(button);

    const errorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.FirstName}-error`
    );
    const errorMessageText = errorMessageContainer.textContent.trim();
    expect(errorMessageText).toBe(ERROR_MESSAGES.firstName);
  });
});
