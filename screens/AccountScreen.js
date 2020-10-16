import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import { Button, Appbar, Modal, Portal, Card, Title, Paragraph,} from 'react-native-paper';


const user = [
    {name : "Dawson", email : "", password : ""}
]

const openModel = (props) =>{
    console.log(props.visible)
    return(
        <Portal>
            <Modal visible={true}>
                <Card>
                    <Card.Title title="Card Title" subtitle="Card Subtitle"/>
                    <Card.Content>
                        <Title>Card title</Title>
                        <Paragraph>Card content</Paragraph>
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
                <View style={styles.buttonContainer}>
                    
                    <Button style={styles.buttonStyle} icon="email" mode="contained" onPress={() => console.log('Pressed')}>
                        Change Email address
                    </Button>
                    <Button style={styles.buttonStyle}  icon="account-edit" mode="contained" onPress={()=>{
                        showModal;
                        openModel({visible})
                    }}>
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
