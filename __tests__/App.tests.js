import "react-native";
import React from "react";
import { shallow } from "enzyme";
import App from "../App";
import renderer from "react-test-renderer";
import AccountScreen from "../screens/AccountScreen";
import AsyncStorage from "@react-native-community/async-storage";
import { render, waitFor } from "@testing-library/react-native";

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

  it("renders the Login component if user is null", async () => {
    const { getByPlaceholderText} = render(<App />)
    await waitFor(() => {
      expect(getByPlaceholderText('Email').props.value).toEqual('')
    })
  })


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
