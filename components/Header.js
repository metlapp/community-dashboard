import React, {useContext} from "react";
import PropTypes from "prop-types";
import AuthContext from "../auth/Context";
import {headerBackgroundColor, headerTextColor, headerBackColor} from "../config/defaultStyles";
import {IconButton, Appbar} from "react-native-paper";

export const screenOptions = {
  header: Header,
  headerMode: 'screen',
}

export default function Header({scene, previous, navigation}) {
  /*
  Use react-navigation properties to build react-native-paper Appbar replacement header.
   */

  const authContext = useContext(AuthContext);

  const {options} = scene.descriptor;

  // build title from various react-navigation title props
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  // if nav stack has a previous screen, show back button
  const hasBackButton = previous ? true : false;

  // if this is the profile page, show the Profile icon
  const hasProfileIcon = scene.route.name == 'Profile' ? true : false;

  return (
    <Appbar.Header style={{backgroundColor: headerBackgroundColor}}>
      {hasBackButton && <Appbar.BackAction onPress={navigation.goBack} color={headerBackColor}/>}
      {hasProfileIcon &&
      <Appbar.Action
        icon="account-circle"
        size={40}
        color={headerTextColor}
        onPress={() => null}
      />}
      <Appbar.Content title={title} titleStyle={{color: headerTextColor}}/>
    </Appbar.Header>
  );
}
