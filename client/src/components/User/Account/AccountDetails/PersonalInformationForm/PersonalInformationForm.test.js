import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { PersonalInformationForm } from "./PersonalInformationForm";
import {AccountDetails} from "../AccountDetails"
import { INITIAL_FORM_VALUES } from "./initialFormValues";
import { useForm } from "../../../../../hooks/useForm";
import { AuthContext } from "../../../../../contexts/AuthContext";

jest.mock("../../../../../hooks/useForm");

const mockAuthContextValue = {
  userId: "test-user-id",
  token: "test-token",
  onRegisterSubmit: jest.fn(),
  onLoginSubmit: jest.fn(),
  onLogout: jest.fn(),
  onDelete: jest.fn(),
  isAuthenticated: true,
};

describe("PersonalInformationForm", () => {
  let mockSubmitHandler;

  beforeEach(() => {
    mockSubmitHandler = jest.fn();
    useForm.mockReturnValue({
      values: INITIAL_FORM_VALUES,
      setValues: jest.fn(),
      updateForm: jest.fn(),
      clickHandler: jest.fn(),
      blurHandler: jest.fn(),
      changeHandler: jest.fn(),
      submitHandler: mockSubmitHandler,
    });
  });

  it("renders the form and fetches user information", () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <AccountDetails>
        <PersonalInformationForm />
        </AccountDetails>
      </AuthContext.Provider>
    );

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Birthday (DD/MM/YYYY)")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Anniversary/Wedding (DD/MM/YYYY)")
    ).toBeInTheDocument();
  });

  // it("submits the form with updated values", async () => {
  //   render(
  //     <AuthContext.Provider value={mockAuthContextValue}>
  //       <AccountDetails>
  //       <PersonalInformationForm />
  //       </AccountDetails>
  //     </AuthContext.Provider>
  //   );

  //   fireEvent.change(screen.getByTestId("firstName-input"), {
  //     target: { value: "Jane" },
  //   });
  //   fireEvent.change(screen.getByTestId("lastName-input"), {
  //     target: { value: "Smith" },
  //   });
  //   fireEvent.change(screen.getByTestId("birthday-input"), {
  //     target: { value: "15/05/1985" },
  //   });
  //   fireEvent.change(screen.getByTestId("specialDay-input"), {
  //     target: { value: "01/01/2024" },
  //   });

  //   fireEvent.click(screen.getByTestId("submit"));

  //   await waitFor(() => {
  //     expect(mockSubmitHandler).toHaveBeenCalledWith({
  //       firstName: { ...INITIAL_FORM_VALUES.firstName, fieldValue: "Jane" },
  //       lastName: { ...INITIAL_FORM_VALUES.lastName, fieldValue: "Smith" },
  //       birthday: { ...INITIAL_FORM_VALUES.birthday, fieldValue: "15/05/1985" },
  //       specialDay: {
  //         ...INITIAL_FORM_VALUES.specialDay,
  //         fieldValue: "01/01/2024",
  //       },
  //     });
  //   });
  // });

  // it("displays error messages when form validation fails", async () => {
  //   render(
  //     <AuthContext.Provider value={mockAuthContextValue}>
  //       <AccountDetails>
  //       <PersonalInformationForm />
  //       </AccountDetails>
  //     </AuthContext.Provider>
  //   );

  //   fireEvent.click(screen.getByTestId("submit"));

  //   await waitFor(() => {
  //     expect(screen.getByTestId("firstName-error")).toHaveTextContent(
  //       "* This field is required"
  //     );
  //     expect(screen.getByTestId("lastName-error")).toHaveTextContent(
  //       "* This field is required"
  //     );
  //     expect(screen.getByTestId("birthday-error")).toHaveTextContent(
  //       "* Ensure you enter a valid date"
  //     );
  //     expect(screen.getByTestId("specialDay-error")).toHaveTextContent(
  //       "* Ensure you enter a valid date"
  //     );
  //   });
  // });
});
