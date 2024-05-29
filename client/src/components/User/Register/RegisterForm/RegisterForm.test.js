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
  test("Fill First Name with valid data expect success", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    const input = screen.getByTestId(`${FORM_KEYS.FirstName}-input`);
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Test" } });
    fireEvent.click(button);

    const errorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.FirstName}-error`
    );
    const errorMessageContent = errorMessageContainer.textContent.trim();
    expect(errorMessageContent).toBe("");
  });
});

describe("RegisterFrom Component", () => {
  test("Fill First Name with empty string expect error", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    const firstNameInput = screen.getByTestId(`${FORM_KEYS.FirstName}-input`);

    fireEvent.change(firstNameInput, { target: { value: "" } });
    fireEvent.click(button);

    const firstNameErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.FirstName}-error`
    );
    const firstNamErrorMessageContent =
      firstNameErrorMessageContainer.textContent.trim();
    expect(firstNamErrorMessageContent).toBe(ERROR_MESSAGES.firstName);
  });
});

describe("RegisterFrom Component", () => {
  test("Fill First Name with a single letter expect error", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    const firstNameInput = screen.getByTestId(`${FORM_KEYS.FirstName}-input`);

    fireEvent.change(firstNameInput, { target: { value: "T" } });
    fireEvent.click(button);

    const firstNameErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.FirstName}-error`
    );
    const firstNamErrorMessageContent =
      firstNameErrorMessageContainer.textContent.trim();
    expect(firstNamErrorMessageContent).toBe(ERROR_MESSAGES.firstName);
  });
});

describe("RegisterFrom Component", () => {
  test("Fill First Name including digit expect error", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    const firstNameInput = screen.getByTestId(`${FORM_KEYS.FirstName}-input`);

    fireEvent.change(firstNameInput, { target: { value: "T1" } });
    fireEvent.click(button);

    const firstNameErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.FirstName}-error`
    );
    const firstNamErrorMessageContent =
      firstNameErrorMessageContainer.textContent.trim();
    expect(firstNamErrorMessageContent).toBe(ERROR_MESSAGES.firstName);
  });
});

describe("RegisterFrom Component", () => {
  test("Fill Last Name with valid data expect success", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

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
  test("Fill Last Name with empty string expect error", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    const lastNameInput = screen.getByTestId(`${FORM_KEYS.LastName}-input`);

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

describe("RegisterFrom Component", () => {
  test("Fill Last Name with a single letter expect error", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    const firstNameInput = screen.getByTestId(`${FORM_KEYS.FirstName}-input`);

    fireEvent.change(firstNameInput, { target: { value: "T" } });
    fireEvent.click(button);

    const firstNameErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.FirstName}-error`
    );
    const firstNamErrorMessageContent =
      firstNameErrorMessageContainer.textContent.trim();
    expect(firstNamErrorMessageContent).toBe(ERROR_MESSAGES.firstName);
  });
});

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

    const emailInput = screen.getByTestId(`${FORM_KEYS.Email}-input`);
    expect(emailInput).toBeInTheDocument();

    const retypeEmailInput = screen.getByTestId(
      `${FORM_KEYS.RetypeEmail}-input`
    );
    expect(retypeEmailInput).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    fireEvent.change(retypeEmailInput, { target: { value: "test@email.com" } });
    fireEvent.click(button);

    const emailErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.Email}-error`
    );
    const emailErrorMessageContent =
      emailErrorMessageContainer.textContent.trim();
    expect(emailErrorMessageContent).toBe("");

    const retypeEmailErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.RetypeEmail}-error`
    );
    const retypeEmailErrorMessageContent =
      retypeEmailErrorMessageContainer.textContent.trim();
    expect(retypeEmailErrorMessageContent).toBe("");
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

    const firstNameErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.FirstName}-error`
    );
    const firstNamErrorMessageContent =
      firstNameErrorMessageContainer.textContent.trim();
    expect(firstNamErrorMessageContent).toBe(ERROR_MESSAGES.firstName);

    const lastNameInput = screen.getByTestId(`${FORM_KEYS.LastName}-input`);

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
