import "react-native";
import React from "react";
import AuthContext from "../auth/Context";
import { mount } from "enzyme";
import AppNavigator from "../navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
jest.mock("axios");

describe("useNotifications Hook", () => {
  it("Should set the users notification token", async () => {
    const user = {
      id: 9,
      name: "Bob",
      email: "bob@bobmail.com",
      organization_data: {
        name: 'Org'
      }
    };
    const setUser = jest.fn();

    mount(
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          <AppNavigator testToken="newtestToken" />
        </NavigationContainer>
      </AuthContext.Provider>
    );

    expect(setUser).toHaveBeenCalled();
  });
});
