import { render, screen, fireEvent } from "@testing-library/react";
import { LoginForm } from "./LoginForm";
import { AuthContext } from "../../../../contexts/AuthContext";
import { FORM_KEYS } from "./initialFormValues";
import { ERROR_MESSAGES } from "../../../../constants/forms";

const mockOnLoginSubmit = jest.fn();

const mockAuthContextValue = {
  onLoginSubmit: mockOnLoginSubmit,
};

describe("LoginFrom Component", () => {
  test("Fill Credentials with invalid email expect error", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <LoginForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    const emailInput = screen.getByTestId(`${FORM_KEYS.Email}-input`);
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: "t@l.c" } });

    const passwordInput = screen.getByTestId(`${FORM_KEYS.Email}-input`);
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: "123456Tt" } });

    fireEvent.click(button);

    const errorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.Email}-error`
    );
    const errorMessageContent = errorMessageContainer.textContent.trim();
    expect(errorMessageContent).toBe(ERROR_MESSAGES.email);
  });
});

describe("LoginFrom Component", () => {
  test("Fill Credentials with invalid password expect error", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <LoginForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    const emailInput = screen.getByTestId(`${FORM_KEYS.Email}-input`);
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: "test@email.com" } });

    const passwordInput = screen.getByTestId(`${FORM_KEYS.Email}-input`);
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    fireEvent.click(button);

    const errorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.Password}-error`
    );
    const errorMessageContent = errorMessageContainer.textContent.trim();
    expect(errorMessageContent).toBe(ERROR_MESSAGES.password);
  });
});
