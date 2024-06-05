import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { PersonalInformationForm } from "./PersonalInformationForm";
import { FORM_KEYS, INITIAL_FORM_VALUES } from "./initialFormValues";
import { ERROR_MESSAGES } from "../../../../../constants/forms";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { personalInformationServiceFactory } from "../../../../../services/personalInformationService";
import { loginInformationServiceFactory } from "../../../../../services/loginInformationService";

const mockAuthContextValue = {
  userId: "user-id",
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

  test("submits the form with valid values", async () => {
    const mockUserInformation = {
      userId: "user-id",
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

    const submitData = {};

    Object.entries(INITIAL_FORM_VALUES).forEach(([key, value]) => {
      submitData[key] = value.validTestData;
    });

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith("user-id", submitData);
    });

    expect(screen.getByTestId("specialDay-error")).toHaveTextContent("");
  });

  test("submits the form with invalid values", async () => {
    const mockUserInformation = {
      userId: "user-id",
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
      expect(mockUpdate).not.toHaveBeenCalledWith("user-id", submitData);
    });


    Object.keys(INITIAL_FORM_VALUES).forEach(key => {
      const errorMessageContainer = screen.getByTestId(`${key}-error`)
      expect(errorMessageContainer).toHaveTextContent(ERROR_MESSAGES[key])
    });
  });
});
