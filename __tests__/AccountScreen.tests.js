import "react-native";
import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import AccountScreen from "../screens/AccountScreen";
import { render, fireEvent } from "@testing-library/react-native";
import AuthContext from "../auth/Context";
import { Provider as PaperProvider } from "react-native-paper";

// This test just uses Jest snapshot testing
it("renders correctly, test using Jest", () => {
  renderer.create(<AccountScreen />);
});

// Using Jest + Enzyme
describe("<AccountScreen />", () => {
  it("renders correctly, test using Jest + Enzyme", () => {
    expect(shallow(<AccountScreen />)).toMatchSnapshot();
  });
  it("matches the snapshot", () => {
    const tree = renderer.create(<AccountScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should have four buttons", () => {
    const component = shallow(<AccountScreen />);
    const wrapper = component.find(".button");
    expect(wrapper.getElements()).toHaveLength(4);
  });
  it("User can logout", () => {
    setUser = jest.fn();
    const { getByText } = render(
      <AuthContext.Provider value={{ setUser }}>
        <PaperProvider>
          <AccountScreen />
        </PaperProvider>
      </AuthContext.Provider>
    );

    fireEvent(getByText("Log Out"), "onPress");
    expect(setUser).toBeCalledWith(null);
  });

  // User can log out
});
