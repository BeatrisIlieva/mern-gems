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

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith("user123", {
        firstName: "Test",
        lastName: "Test",
        birthday: "10/10/1990",
        specialDay: "10/10/1990",
      });
    });

    expect(screen.getByTestId("specialDay-error")).toHaveTextContent("");
  });
});
