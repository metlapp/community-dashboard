import React, { useContext, useEffect } from "react";
import AccountModal from "../components/AccountModal";
import { Appbar, Button } from "react-native-paper";
import AuthContext from "../auth/Context";
import authStorage from "../auth/Storage";
import { SafeAreaView, StyleSheet, View } from "react-native";
import ListItemWithHeader from "../components/ListItemWithHeader";

const PersonalInfoScreen = () => {
  //determines what component the modal will render when a button is clicked

  const [form, setForm] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    //Both sets the user to null and removes the user from async storage
    authContext.setUser(null);
    authStorage.removeUser();
  };
  return (
    <SafeAreaView>
      {/* Opens model and takes in the visible state with what component to render */}
      {/* When ListItem is clicked it changes the state of the visibility and tells the modal what component to render
      inside the modal */}
      <AccountModal visibility={visible} hidemodal={hideModal} form={form} />

        <ListItemWithHeader header="Name" content={authContext.user.first_name}
                  onPress={() => {
                    setForm("Name");
                    showModal();
                  }}/>
        <ListItemWithHeader header="Email" content={authContext.user.email}
                  onPress={() => {
                    setForm("Email");
                    showModal();
                  }}/>
    </SafeAreaView>
  );
};

export default PersonalInfoScreen;
