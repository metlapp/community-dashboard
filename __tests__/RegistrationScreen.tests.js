import "react-native";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import AuthContext  from "../auth/Context";
import RegistrationScreen from "../screens/RegistrationScreen";

describe("Testing Registration Page", () => {
  it("renders correctly, test using Jest", () => {
    renderer.create(<RegistrationScreen/>);
  });

  it("matches the snapshot", () => {
    const tree = renderer.create(<RegistrationScreen/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("must have all fields complete for Submit button to be enabled", async () => {
    const setUser = jest.fn();
    const {getByText, getByTestId} = render(
      <AuthContext.Provider value={{setUser}}>
        <RegistrationScreen/>
      </AuthContext.Provider>
    );

    const emailInput = getByTestId("emailInput");
    const passInput = getByTestId("pass");
    const repeatPassInput = getByTestId("confirmPass");
    const termsCheckbox = getByTestId("termsCheckbox");
    const submitButton = getByText("Register");

    expect(emailInput).toBeDefined();

    act(() => {
      fireEvent(emailInput, "onChangeText", "this@email.com");
      fireEvent(passInput, "onChangeText", "password");
      fireEvent(repeatPassInput, "onChangeText", "password");
      fireEvent(termsCheckbox, "onPress");
    });

    act(() => {
      fireEvent(submitButton, "onPress");
    });

    await waitFor(() => {
      expect(setUser).toHaveBeenCalled();
    });
  });

  it("cannot submit form if fields are blank", async () => {
    const setUser = jest.fn();
    const {getByText, getByTestId} = render(
      <AuthContext.Provider value={{setUser}}>
        <RegistrationScreen/>
      </AuthContext.Provider>
    );

    const emailInput = getByTestId("emailInput");
    const passInput = getByTestId("pass");
    const repeatPassInput = getByTestId("confirmPass");
    const termsCheckbox = getByTestId("termsCheckbox");
    const submitButton = getByText("Register");

    expect(emailInput).toBeDefined();

    act(() => {
      fireEvent(submitButton, "onPress");
    });

    await waitFor(() => {
      expect(setUser).not.toHaveBeenCalled();
    });
  });

  it("email field must be valid to submit registration", async () => {
    const setUser = jest.fn();
    const {getByText, getByTestId} = render(
      <AuthContext.Provider value={{setUser}}>
        <RegistrationScreen/>
      </AuthContext.Provider>
    );

    const emailInput = getByTestId("emailInput");
    const passInput = getByTestId("pass");
    const repeatPassInput = getByTestId("confirmPass");
    const termsCheckbox = getByTestId("termsCheckbox");
    const submitButton = getByText("Register");

    expect(emailInput).toBeDefined();

    act(() => {
      fireEvent(emailInput, "onChangeText", "email.com");  // not email format
      fireEvent(passInput, "onChangeText", "password");
      fireEvent(repeatPassInput, "onChangeText", "password");
      fireEvent(termsCheckbox, "onPress");
    });

    act(() => {
      fireEvent(submitButton, "onPress");
    });

    await waitFor(() => {
      expect(setUser).not.toHaveBeenCalled();
    });
  });

  it("password field must be valid to submit registration", async () => {
    const setUser = jest.fn();
    const {getByText, getByTestId} = render(
      <AuthContext.Provider value={{setUser}}>
        <RegistrationScreen/>
      </AuthContext.Provider>
    );

    const emailInput = getByTestId("emailInput");
    const passInput = getByTestId("pass");
    const repeatPassInput = getByTestId("confirmPass");
    const termsCheckbox = getByTestId("termsCheckbox");
    const submitButton = getByText("Register");

    expect(emailInput).toBeDefined();

    act(() => {
      fireEvent(emailInput, "onChangeText", "something@email.com");
      fireEvent(passInput, "onChangeText", "pass");  // too short
      fireEvent(repeatPassInput, "onChangeText", "pass");
      fireEvent(termsCheckbox, "onPress");
    });

    act(() => {
      fireEvent(submitButton, "onPress");
    });

    await waitFor(() => {
      expect(setUser).not.toHaveBeenCalled();
    });
  });

  it("second password field must be valid to submit registration", async () => {
    const setUser = jest.fn();
    const {getByText, getByTestId} = render(
      <AuthContext.Provider value={{setUser}}>
        <RegistrationScreen/>
      </AuthContext.Provider>
    );

    const emailInput = getByTestId("emailInput");
    const passInput = getByTestId("pass");
    const repeatPassInput = getByTestId("confirmPass");
    const termsCheckbox = getByTestId("termsCheckbox");
    const submitButton = getByText("Register");

    expect(emailInput).toBeDefined();

    act(() => {
      fireEvent(emailInput, "onChangeText", "something@email.com");
      fireEvent(passInput, "onChangeText", "password");
      fireEvent(repeatPassInput, "onChangeText", "passwordABC");  // doesn't match first password field
      fireEvent(termsCheckbox, "onPress");
    });

    act(() => {
      fireEvent(submitButton, "onPress");
    });

    await waitFor(() => {
      expect(setUser).not.toHaveBeenCalled();
    });
  });

  it("Terms checkbox must be checked to submit registration", async () => {
    const setUser = jest.fn();
    const {getByText, getByTestId} = render(
      <AuthContext.Provider value={{setUser}}>
        <RegistrationScreen/>
      </AuthContext.Provider>
    );

    const emailInput = getByTestId("emailInput");
    const passInput = getByTestId("pass");
    const repeatPassInput = getByTestId("confirmPass");
    const termsCheckbox = getByTestId("termsCheckbox");
    const submitButton = getByText("Register");

    expect(emailInput).toBeDefined();

    act(() => {
      fireEvent(emailInput, "onChangeText", "something@email.com");
      fireEvent(passInput, "onChangeText", "password");
      fireEvent(repeatPassInput, "onChangeText", "password");

      // Terms checkbox not clicked here
    });

    act(() => {
      fireEvent(submitButton, "onPress");
    });

    await waitFor(() => {
      expect(setUser).not.toHaveBeenCalled();
    });
  });


});
