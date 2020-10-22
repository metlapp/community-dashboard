import "react-native";
import React from "react";
import { mount, shallow } from "enzyme";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import RegistrationScreen from "../screens/RegistrationScreen";
import RegisterName from "../screens/RegisterName";
import { FormContext } from "../auth/context";

// Note: this is just for use with Jest snapshot testing
// and comes packaged with react-native init project.
// You do not need this if using Enzyme 'toMatchSnapshot' etc.

import renderer from "react-test-renderer";

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

it("should save email to user object", async () => {
  const formData = jest.fn();
  const setFormData = jest.fn();
  const step = jest.fn();
  const setStep = jest.fn();
  const { getByText, getByTestId, getByPlaceholderText, debug } = render(
    <FormContext.Provider value={{ formData, setFormData, step, setStep }}>
      <RegistrationScreen />
    </FormContext.Provider>
  );

  const title = getByTestId("title");
  const emailTitle = getByTestId("emailTitle");
  const emailInput = getByTestId("emailInput");
  const emailNextButton = getByText("Next");

  expect(title).toBeDefined();
  expect(emailTitle).toBeDefined();
  expect(emailInput).toBeDefined();
  expect(emailNextButton).toBeDefined();

  fireEvent(emailInput, "onChangeText", "this@email.com");

  act(() => {
    fireEvent(emailNextButton, "onPress");
  });

  console.log(debug());
});

// it("Should render finished screen after form submission", () => {
//   const formData = jest.fn();
//   const setFormData = jest.fn();
//   const step = jest.fn();
//   const setStep = jest.fn();

//   const { getByText, getByTestId } = render(
//     <FormContext.Provider value={{ formData, setFormData, step, setStep }}>
//       {setFormData({
//         email: "jerry@gmail.com",
//         password: "jerrypassword",
//         name: "Jerry",
//       })}
//       <RegisterName />
//     </FormContext.Provider>
//   );

//   fireEvent(getByTestId("input"), "onChangeText", "john");

//   //   const errorMessage = wrapper.find(".errorMessage");

//   fireEvent(getByText("Save").parent, "onPress");

//   const text = getByText("Registration Successful!");

//   expect(text).toEqual("Registration Successful!");
// });

//   it("should call handleSubmit after submit", async () => {
//     const handlePasswordChange = jest.fn();
//     const setUser = jest.fn();

//     const { getByText, getByPlaceholderText } = render(
//       <ChangePasswordScreen
//         handlePasswordChange={handlePasswordChange}
//         setUser={setUser}
//       />
//     );

//     const currentPassword = getByPlaceholderText("Current Password");
//     const newPassword = getByPlaceholderText("New Password");
//     const confirmPassword = getByPlaceholderText("Confirm Password");

//     act(() => {
//       fireEvent(currentPassword, "onChangeText", "password");
//     });
//     act(() => {
//       fireEvent(newPassword, "onChangeText", "Peyton12");
//     });
//     act(() => {
//       fireEvent(confirmPassword, "onChangeText", "Peyton12");
//     });

//     act(() => {
//       fireEvent(getByText("Save").parent, "press");
//     });

//     waitFor(() => {
//       expect(handlePasswordChange).toHaveBeenCalledTimes(1);
//     });
//     waitFor(() => {
//       expect(setUser).toHaveBeenCalledTimes(1);
//     });
//   });
// });
