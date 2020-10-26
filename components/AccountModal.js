import React from "react";
import { Modal, Portal, Card } from "react-native-paper";
import ChangeName from "../components/ChangeName";
import ChangeEmail from "../components/ChangeEmail";
import ChangePassword from "../components/ChangePassword";
import { ProgressBarAndroidComponent } from "react-native";
//OpenModal opens the modal and takes in the visibility which either show the modal or hides it
//It also takes in the state which the button passes to it and will render the correct component

const AccountModal = (props) => {
  return (
    <Portal>
      <Modal visible={props.visibility} onDismiss={props.hidemodal}>
        <Card>
          <Card.Content>
            {(() => {
              switch (props.form) {
                case "Email":
                  return <ChangeEmail />;
                case "Name":
                  return <ChangeName hidemodal={props.hidemodal} />;
                case "Password":
                  return <ChangePassword hidemodal={props.hidemodal} />;
              }
            })()}
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
};

export default AccountModal;
