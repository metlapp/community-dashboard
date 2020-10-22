import "react-native";
import React from "react";
import { shallow } from "enzyme";
import App from "../App";
import renderer from "react-test-renderer";
import LoginScreen from "../screens/LoginScreen";
import AccountScreen from "../screens/AccountScreen";
import AuthContext from "../auth/Context";
import AsyncStorage from "@react-native-community/async-storage";
import authStorage from "../auth/Storage";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

beforeEach(async () => {
  await AsyncStorage.clear();
});
// This test just uses Jest snapshot testing
it("renders correctly, test using Jest", () => {
  renderer.create(<App />);
});

// Using Jest + Enzyme
describe("<App />", () => {
  it("renders correctly, test using Jest + Enzyme", () => {
    expect(shallow(<App />)).toMatchSnapshot();
  });
  it("matches the snapshot", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders the Login component if user is null", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<LoginScreen />)).toEqual(true);
  });

  it("renders the Account component if user is set", async () => {
    const setUser = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation((user) => [
      (user = { name: "dawson" }),
      setUser,
    ]);
    const wrapper = shallow(<App />);
    await waitFor(() =>
      expect(wrapper.containsMatchingElement(<AccountScreen />)).toEqual(true)
    );
  });
});
