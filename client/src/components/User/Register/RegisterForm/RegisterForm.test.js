import { render, screen, fireEvent } from "@testing-library/react";
import { RegisterForm } from "./RegisterForm";
import { AuthContext } from "../../../../contexts/AuthContext";
import { FORM_KEYS } from "./initialFormValues";
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

    const firstNameErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.FirstName}-error`
    );
    const firstNamErrorMessageContent =
      firstNameErrorMessageContainer.textContent.trim();
    expect(firstNamErrorMessageContent).toBe("");

    const lastNameInput = screen.getByTestId(`${FORM_KEYS.LastName}-input`);
    expect(lastNameInput).toBeInTheDocument();

    fireEvent.change(lastNameInput, { target: { value: "Test" } });
    fireEvent.click(button);

    const lastNameErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.LastName}-error`
    );
    const lastNameErrorMessageContent =
      lastNameErrorMessageContainer.textContent.trim();
    expect(lastNameErrorMessageContent).toBe("");
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
    expect(firstNameInput).toBeInTheDocument();

    fireEvent.change(firstNameInput, { target: { value: "" } });
    fireEvent.click(button);

    const firstNameErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.FirstName}-error`
    );
    const firstNamErrorMessageContent =
      firstNameErrorMessageContainer.textContent.trim();
    expect(firstNamErrorMessageContent).toBe(ERROR_MESSAGES.firstName);

    const lastNameInput = screen.getByTestId(`${FORM_KEYS.LastName}-input`);
    expect(lastNameInput).toBeInTheDocument();

    fireEvent.change(lastNameInput, { target: { value: "" } });
    fireEvent.click(button);

    const lastNameErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.LastName}-error`
    );
    const lastNameErrorMessageContent =
      lastNameErrorMessageContainer.textContent.trim();
    expect(lastNameErrorMessageContent).toBe(ERROR_MESSAGES.lastName);
  });
});
