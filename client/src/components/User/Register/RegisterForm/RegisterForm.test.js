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
    const title = "New Customers";

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    expect(screen.queryByText(title)).toBeInTheDocument();

    const firstNameInput = screen.getByLabelText(
      INITIAL_FORM_VALUES[FORM_KEYS.FirstName].fieldLabel
    );
    expect(firstNameInput).toBeInTheDocument();

    fireEvent.change(firstNameInput, { target: { value: "Test" } });

    const saveButton = screen.getByRole("button", { name: /save/i });

    fireEvent.click(saveButton);

    const errorMessages = screen.getByTestId(FORM_KEYS.FirstName);
    const errorMessageText = errorMessages.textContent.trim();

    expect(errorMessageText).toBe("");
  });
});

describe("RegisterFrom Component", () => {
  test("Should display an error when invalid input is entered in the form", async () => {
    const title = "New Customers";

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const firstNameInput = screen.getByLabelText(
      INITIAL_FORM_VALUES[FORM_KEYS.FirstName].fieldLabel
    );

    fireEvent.change(firstNameInput, { target: { value: "" } });

    const saveButton = screen.getByRole("button", { name: /save/i });

    fireEvent.click(saveButton);

    const errorMessages = screen.getByTestId(FORM_KEYS.FirstName);
    const errorMessageText = errorMessages.textContent.trim();

    expect(errorMessageText).toBe(ERROR_MESSAGES.firstName);
  });
});
