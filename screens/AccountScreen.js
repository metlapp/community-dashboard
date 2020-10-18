import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import { Button, Appbar, Modal, Portal, Card, Title,TextInput} from 'react-native-paper';

const user = [
    {name : "Dawson", email : "", password : ""}
]

const OpenModal = (props) =>{
    var newName= ""
    function closemodal(){
        user[0].name = newName 
        props.hidemodal 
    }
    
    return(
        <Portal>
            <Modal visible={props.visibility} onDismiss={props.hidemodal} >
                <Card>
                    <Card.Content>
                        <Title>Hello, {user[0].name}</Title>
                        <TextInput
                            label="Change Name"
                            onChangeText={text => newName = text}
                        />
                        <Button onPress={props.hidemodal}>Save</Button>
                    </Card.Content>
                </Card>
            </Modal>
        </Portal>

    )
}


const AccountScreen = () => {
    
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
  return (
    <SafeAreaView>
                <Appbar.Header>
                    <Appbar.Content title="ACCOUNT" />
                </Appbar.Header>
                {visible ? <OpenModal visibility = {visible} hidemodal={hideModal} />:null}
                <View style={styles.buttonContainer}>
                    <Button style={styles.buttonStyle} icon="email" mode="contained" onPress={() => console.log('Pressed')}>
                        Change Email address
                    </Button>
                    <Button style={styles.buttonStyle} icon="account-edit" mode="contained" onPress={showModal }>
                        Change name
                    </Button>
                    <Button style={styles.buttonStyle} icon="square-edit-outline" mode="contained" onPress={() => console.log('Pressed')}>
                        Change password
                    </Button>
                </View>
            
  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    
    textAlign: 'center',
  
  },
    buttonContainer: {
        marginTop: "50%",
        alignItems: 'center',
        justifyContent: 'center',
        

  },
  buttonStyle : {
        margin: 10,
        width: '100%',
        height: 60,
        justifyContent:'center',
        
  }
  
});

export default AccountScreen;
