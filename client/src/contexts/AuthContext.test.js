// import React from "react";
// import { render, screen, waitFor, fireEvent } from "@testing-library/react";
// import { AuthContext } from "./AuthContext";
// import { BrowserRouter as Router } from "react-router-dom";
// import { authServiceFactory } from "../services/authService";
// import { useLocalStorage } from "../hooks/useLocalStorage";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { LoginForm } from "../components/User/Login/LoginForm/LoginForm";
// import {
//   FORM_KEYS,
//   INITIAL_FORM_VALUES,
// } from "../components/User/Login/LoginForm/initialFormValues";

// jest.mock("../services/authService", () => ({
//   authServiceFactory: jest.fn(),
// }));

// jest.mock("../services/authService");
// jest.mock("../hooks/useLocalStorage");
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: jest.fn(),
//   useLocation: jest.fn(),
// }));

// const userId = "user-id";
// const token = "user-token";

// const mockOnRegisterSubmit = jest.fn();
// const mockOnLoginSubmit = jest.fn();
// const mockOnLogout = jest.fn();
// const mockOnDelete = jest.fn();
// const mockSetAuth = jest.fn();

// const mockAuthContextValue = {
//   onRegisterSubmit: mockOnRegisterSubmit,
//   onLoginSubmit: mockOnLoginSubmit,
//   onLogout: mockOnLogout,
//   onDelete: mockOnDelete,
//   setAuth: mockSetAuth,
//   userId,
// };

// describe("AuthContext", () => {
//   beforeEach(() => {
//     authServiceFactory.mockReturnValue({
//       register: mockOnRegisterSubmit,
//       login: mockOnLoginSubmit,
//       logout: mockOnLogout,
//       delete: mockOnDelete,
//     });
//     useLocalStorage.mockReturnValue([{}, mockSetAuth]);
//     useNavigate.mockReturnValue(mockNavigate);
//     useLocation.mockReturnValue({ state: { from: { pathname: "/home" } } });
//   });

//   const mockNavigate = jest.fn();

//   test("should handle login submission", async () => {
//     render(
//       <Router>
//         <AuthContext.Provider value={mockAuthContextValue}>
//           <LoginForm />
//         </AuthContext.Provider>
//       </Router>
//     );

//     const mockUserInformation = {
//       token,
//     };

//     mockSetAuth.mockResolvedValue(mockUserInformation);

//     const inputs = {};

//     Object.values(FORM_KEYS).forEach((value) => {
//       inputs[value] = screen.getByTestId(`${value}-input`);
//     });

//     Object.entries(inputs).forEach(([inputKey, inputValue]) => {
//       fireEvent.change(inputValue, {
//         target: { value: INITIAL_FORM_VALUES[inputKey].validTestData },
//       });
//     });

//     const submitButton = screen.getByTestId("submit");
//     fireEvent.click(submitButton);

//     const submitData = {};

//     Object.entries(INITIAL_FORM_VALUES).forEach(([key, value]) => {
//       submitData[key] = value.validTestData;
//     });

//     await waitFor(() => {
//       expect(mockOnLoginSubmit).toHaveBeenCalledWith(submitData);
//     });

//     // useLocalStorage.mockReturnValue([{}, jest.fn()]);
//     useLocalStorage.mockReturnValue([
//       { _id: userId, accessToken: token },
//       jest.fn(),
//     ]);

//     await waitFor(() => {
//       expect(mockNavigate).toHaveBeenCalledWith("/home", { replace: true });
//     });
//   });
// });

import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { AuthProvider } from "./AuthContext"; // Use AuthProvider instead of AuthContext
import { BrowserRouter as Router } from "react-router-dom";
import { authServiceFactory } from "../services/authService";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LoginForm } from "../components/User/Login/LoginForm/LoginForm";
import {
  FORM_KEYS,
  INITIAL_FORM_VALUES,
} from "../components/User/Login/LoginForm/initialFormValues";

jest.mock("../services/authService", () => ({
  authServiceFactory: jest.fn(),
}));

jest.mock("../hooks/useLocalStorage");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

const userId = "user-id";
const token = "user-token";

const mockOnRegisterSubmit = jest.fn();
const mockOnLoginSubmit = jest.fn();
const mockOnLogout = jest.fn();
const mockOnDelete = jest.fn();
const mockSetAuth = jest.fn();

const mockNavigate = jest.fn();

const mockAuthContextValue = {
  onRegisterSubmit: mockOnRegisterSubmit,
  onLoginSubmit: mockOnLoginSubmit,
  onLogout: mockOnLogout,
  onDelete: mockOnDelete,
  setAuth: mockSetAuth,
  userId,
};

describe("AuthContext", () => {
  beforeEach(() => {
    authServiceFactory.mockReturnValue({
      register: mockOnRegisterSubmit,
      login: mockOnLoginSubmit,
      logout: mockOnLogout,
      delete: mockOnDelete,
    });

    useLocalStorage.mockReturnValue([{}, mockSetAuth]);
    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue({ state: { from: { pathname: "/" } } });
  });

  test("should handle login submission", async () => {
    render(
      <Router>
        <AuthProvider value={mockAuthContextValue}>
          <LoginForm />
        </AuthProvider>
      </Router>
    );




    const mockUserInformation = {
      _id: userId,
      accessToken: token,
    };

    mockOnLoginSubmit.mockResolvedValue({ token: mockUserInformation });


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
      expect(mockOnLoginSubmit).toHaveBeenCalledWith(submitData);
    });

    await waitFor(() => {
      expect(mockSetAuth).toHaveBeenCalledWith(mockUserInformation);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
    });

    const authSetArgument = mockSetAuth.mock.calls[0][0];
    expect(authSetArgument._id).toBe(userId);
    expect(authSetArgument.accessToken).toBe(token);
  });
});
