import "react-native";
import React from "react";
import { act, fireEvent, render } from "@testing-library/react-native";
import axios from "../__mocks__/axios";
import Survey from "../components/Survey";
import AuthContext from "../auth/Context";
import Question from "../components/Question";
jest.mock("axios");

axios.get.mockImplementationOnce(() => {
    return Promise.resolve({
        data: {
            id: 3,
            title: "Test Question",
            organization: 1,
            question_type: "SCALE",
            number_of_lines: 3,
        },
    });
});

describe("<Survey />", () => {
    it("Survey renders correctly", ()=>{
       const data = {
           title: "Survey",
           description: "Survey 1 description",
           questions:[
               1,
               2,
               3
           ]
       } 
       const navigation = {
           navigate: jest.fn()
       }
       
       const user = { id: 3 };
        const {getByText} = render(  
            <AuthContext.Provider value={{ user }}>
                <Survey data={data} navigation={navigation} />
            </AuthContext.Provider >)
        fireEvent(getByText("Take Survey"),"onPress")
        expect(navigation.navigate).toHaveBeenCalled()
    })
    it("Survey shows the first question", ()=>{
       const data = {
           title: "Survey",
           description: "Survey 1 description",
           questions:[
               1,
               2,
               3
           ]
       } 
       const navigation = {
           navigate: jest.fn()
       }
       
       const user = { id: 3 };
        const {getByText} = render(  
            <AuthContext.Provider value={{ user }}>
                <Survey data={data} navigation={navigation} />
            </AuthContext.Provider >)
        fireEvent(getByText("Take Survey"),"onPress")
        expect(Question).toBeTruthy()
        
    })
})