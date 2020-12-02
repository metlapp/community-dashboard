import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import PersonalInfoScreen from "../screens/PersonalInfoScreen";
import {render} from "@testing-library/react-native";
import AuthContext from "../auth/Context";
import {Provider as PaperProvider} from "react-native-paper";

// This test just uses Jest snapshot testing
it("renders correctly, test using Jest", () => {
    const user = {email: "email@email.com"};
    const setUser = jest.fn();
    renderer.create(
        <AuthContext.Provider value={{user, setUser}}>
            <PaperProvider>
                <PersonalInfoScreen/>
            </PaperProvider>
        </AuthContext.Provider>
    );
});

// Using Jest + Enzyme
describe("<PersonalInfoScreen />", () => {
    it("matches the snapshot", () => {
        const user = {email: "email@email.com"};
        const setUser = jest.fn();
        const tree = renderer.create(
            <AuthContext.Provider value={{user, setUser}}>
                <PaperProvider>
                    <PersonalInfoScreen/>
                </PaperProvider>
            </AuthContext.Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Should have correct menu items", () => {
        const user = {email: "email@email.com"};
        const setUser = jest.fn();
        const {getByText} = render(
            <AuthContext.Provider value={{user, setUser}}>
                <PaperProvider>
                    <PersonalInfoScreen/>
                </PaperProvider>
            </AuthContext.Provider>
        );
        expect(getByText('Name')).toBeTruthy();
        expect(getByText('Email')).toBeTruthy();
    });
});
