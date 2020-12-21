import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default function LoadingScreen() {
    return (
        <View style={styles.container}>
           <Image width={375} height={150} source={require('../assets/metl.png')} /> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        justifyContent:"center",
        alignItems:"center"
    },
})
