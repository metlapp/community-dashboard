import "react-native";
import * as React from "react";
import { shallow } from "enzyme";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import AuthContext, { FormContext } from "../auth/Context";
import RegistrationScreen from "../screens/RegistrationScreen";
import RegisterEmail from "../screens/RegisterEmail";
import RegisterPassword from "../screens/RegisterPassword";
import RegisterName from "../screens/RegisterName";

describe("Testing Registraion Page", () => {
  it("renders correctly, test using Jest", () => {
    renderer.create(<RegistrationScreen />);
  });

  it("matches the snapshot", () => {
    const tree = renderer.create(<RegistrationScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("text on change password screen", () => {
    const wrapper = shallow(<RegistrationScreen />);
    const text = wrapper.find("Text").first().render().text();
    expect(text).toEqual("Registration Page");
  });
});

describe("Test register email component", () => {
  it("should save email to formData object", async () => {
    const setFormData = jest.fn();
    const setStep = jest.fn();
    const { getByText, getByTestId } = render(
      <FormContext.Provider value={{ setFormData, setStep }}>
        <RegisterEmail />
      </FormContext.Provider>
    );

    const emailInput = getByTestId("emailInput");
    const emailNextButton = getByText("Next");

    expect(emailInput).toBeDefined();

    act(() => {
      fireEvent(emailInput, "onChangeText", "this@email.com");
    });

    act(() => {
      fireEvent(emailNextButton, "onPress");
    });

    await waitFor(() => {
      expect(setFormData).toHaveBeenCalled();
    });
  });
});

describe("should save password to formdata object", () => {
  it("should save password to formData object", async () => {
    const setFormData = jest.fn();
    const setStep = jest.fn();

    const { getByText, getByTestId } = render(
      <FormContext.Provider value={{ setFormData, setStep }}>
        <RegisterPassword />
      </FormContext.Provider>
    );

    const passInput = getByTestId("pass");
    const confirmPassInput = getByTestId("confirmPass");
    const passwordNextButton = getByText("Next");

    expect(passInput).toBeDefined();
    expect(confirmPassInput).toBeDefined();
    expect(passwordNextButton).toBeDefined();

    act(() => {
      fireEvent(passInput, "onChangeText", "password");
    });
    act(() => {
      fireEvent(confirmPassInput, "onChangeText", "password");
    });

    act(() => {
      fireEvent(passwordNextButton, "onPress");
    });

    await waitFor(() => {
      expect(setFormData).toHaveBeenCalledTimes(1);
    });
  });
});
describe("should save name to formdata object", () => {
  it("should save name to formData object", async () => {
    const setFormData = jest.fn();
    const { getByText, getByTestId } = render(
      <FormContext.Provider value={{ setFormData }}>
        <RegisterName />
      </FormContext.Provider>
    );

    const name = getByTestId("input");
    const nameSave = getByText("Save");

    expect(name).toBeDefined();
    expect(nameSave).toBeDefined();

    act(() => {
      fireEvent(name, "onChangeText", "Jaycob");
    });

    act(() => {
      fireEvent(nameSave, "onPress");
    });

    await waitFor(() => {
      expect(setFormData).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Test API", () => {
  it("Calls the Api to post the new User", async () => {
    const setUser = jest.fn();
    render(
      <AuthContext.Provider value={{ setUser }}>
        <RegistrationScreen test={true} />
      </AuthContext.Provider>
    );
    await waitFor(() => {
      expect(setUser).toHaveBeenCalled();
    });
  });
});
