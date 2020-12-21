import React, { useContext } from "react";
import { Title, Text, Button } from "react-native-paper";
import PropTypes from "prop-types";
import ContentCard from "./ContentCard";
import AuthContext from "../auth/Context";
import { trackClick } from "./TrackClick";

const Survey = ({data, navigation}) =>{
    const authContext = useContext(AuthContext);
    return(
        <ContentCard>
            <Title>{data.title}</Title>
            <Text>{data.description}</Text>
            <Button onPress={()=>{
                navigation.navigate('Question', {questions: data.questions}), 
                trackClick(authContext.user.id, data.id, "VIEWED", "APP");}}>Take Survey</Button>
        </ContentCard>
    )
}

export default Survey