import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { PersonalInformationForm } from "./PersonalInformationForm";
import { FORM_KEYS, INITIAL_FORM_VALUES } from "./initialFormValues";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { personalInformationServiceFactory } from "../../../../../services/personalInformationService";
import { loginInformationServiceFactory } from "../../../../../services/loginInformationService";

const mockAuthContextValue = {
  userId: "user123",
};

jest.mock("../../../../../services/loginInformationService", () => ({
  loginInformationServiceFactory: jest.fn(),
}));

const mockFindLoginInformation = jest.fn();

jest.mock("../../../../../services/personalInformationService", () => ({
  personalInformationServiceFactory: jest.fn(),
}));

const mockFind = jest.fn();
const mockUpdate = jest.fn();

describe("PersonalInformationForm", () => {
  beforeEach(() => {
    loginInformationServiceFactory.mockReturnValue({
      find: mockFindLoginInformation,
    });
    personalInformationServiceFactory.mockReturnValue({
      find: mockFind,
      update: mockUpdate,
    });
  });
  //   const mockUserInformation = {
  //     firstName: "Test",
  //     lastName: "Test",
  //   };

  //   mockFind.mockResolvedValue(mockUserInformation);

  //   render(
  //     <AuthContext.Provider value={mockAuthContextValue}>
  //       <PersonalInformationForm />
  //     </AuthContext.Provider>
  //   );

  //   expect(screen.getByLabelText("First Name")).toBeInTheDocument();
  //   expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
  //   expect(screen.getByLabelText("Birthday (DD/MM/YYYY)")).toBeInTheDocument();
  //   expect(
  //     screen.getByLabelText("Anniversary/Wedding (DD/MM/YYYY)")
  //   ).toBeInTheDocument();
  // });

  it("submits the form with updated values", async () => {
    const mockUserInformation = {
      userId: "user123",
    };

    mockFind.mockResolvedValue(mockUserInformation);

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <PersonalInformationForm />
      </AuthContext.Provider>
    );

    const inputs = {}

    Object.values(FORM_KEYS).forEach((formValue) => {
      inputs[formValue] = screen.getByTestId(`${formValue}-input`)
    });

    Object.entries(inputs).forEach(([objKey, objValue]) => {
      fireEvent.change(objValue, { target: { value: INITIAL_FORM_VALUES[objKey].validTestData } });
    });

    // const firstNameInput = screen.getByTestId("firstName-input");
    // fireEvent.change(firstNameInput, { target: { value: "Test" } });

    // const lastNameInput = screen.getByTestId("lastName-input");
    // fireEvent.change(lastNameInput, { target: { value: "Test" } });

    // const birthdayInput = screen.getByTestId("birthday-input");
    // fireEvent.change(birthdayInput, { target: { value: "10/10/1990" } });

    // const specialDayInput = screen.getByTestId("specialDay-input");
    // fireEvent.change(specialDayInput, { target: { value: "10/10/1990" } });

    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith("user123", {
        firstName: "Test",
        lastName: "Test",
        birthday: "10/10/1990",
        specialDay: "10/10/1990",
      });
    });



    expect(screen.getByTestId("specialDay-error")).toHaveTextContent("");

    // fireEvent.change(screen.getByTestId("firstName-input"), {
    //   target: { value: "Jane" },
    // });
    // fireEvent.change(screen.getByTestId("lastName-input"), {
    //   target: { value: "Smith" },
    // });
    // fireEvent.change(screen.getByTestId("birthday-input"), {
    //   target: { value: "15/05/1985" },
    // });
    // fireEvent.change(screen.getByTestId("specialDay-input"), {
    //   target: { value: "" },
    // });

    // fireEvent.click(screen.getByTestId("submit"));

    // await waitFor(() => {
    //   expect(mockUpdate).not.toHaveBeenCalledWith("user123", {
    //     firstName: "Jane",
    //     lastName: "Smith",
    //     birthday: "15/05/1985",
    //     specialDay: "",
    //   });
    // });

    // expect(screen.getByTestId("specialDay-error")).toHaveTextContent(
    //   "* Ensure you enter a valid date"
    // );
  });

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
