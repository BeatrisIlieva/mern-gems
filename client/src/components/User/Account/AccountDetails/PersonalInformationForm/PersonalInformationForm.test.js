import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { PersonalInformationForm } from "./PersonalInformationForm";
import { FORM_KEYS } from "./initialFormValues";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { personalInformationServiceFactory } from "../../../../../services/personalInformationService";




const mockAuthContextValue = {
  userId: "user123",
};



jest.mock("../../../../../services/personalInformationService", () => ({
  personalInformationServiceFactory: jest.fn(),
}));

const mockFind = jest.fn();
const mockUpdate = jest.fn();

describe("PersonalInformationForm", () => {
  beforeEach(() => {

    personalInformationServiceFactory.mockReturnValue({
      find: mockFind,
      update: mockUpdate
    });
  });

  it("renders the form and fetches user information", () => {
    const mockUserInformation = {
      userId: "user-id",
    };

    mockFind.mockResolvedValue(mockUserInformation);

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <PersonalInformationForm />
      </AuthContext.Provider>
    );

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Birthday (DD/MM/YYYY)")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Anniversary/Wedding (DD/MM/YYYY)")
    ).toBeInTheDocument();
  });

  it("submits the form with updated values", async () => {

    const mockUserInformation = {
      userId: "user-id",
    };

    mockFind.mockResolvedValue(mockUserInformation);

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <PersonalInformationForm />
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByTestId("firstName-input"), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByTestId("lastName-input"), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.getByTestId("birthday-input"), {
      target: { value: "15/05/1985" },
    });
    fireEvent.change(screen.getByTestId("specialDay-input"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByTestId("submit"));

    await waitFor(() => {
      expect(mockUpdate).not.toHaveBeenCalledWith("user123",{
        firstName: "Jane" ,
        lastName: "Smith",
        birthday:  "15/05/1985" ,
        specialDay:  "",
        },
      );
    });

    expect(screen.getByTestId("specialDay-error")).toHaveTextContent(
            "* Ensure you enter a valid date"
          );
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
