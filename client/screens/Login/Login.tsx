import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';

const Login = props => {
    return (
        <View>
            <Image
            style={styles.logo}
            source={require('C:\Users\User-PC\Desktop\stedy\FamilyMeeting\client\assets\family_logo.png')}
            />
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} />
                <TextInput style={styles.input} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 170,
        height: 70,
        resizeMode: 'stretch',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    inputContainer: {

    }
})

export default Login;