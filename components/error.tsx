import React from 'react';
import {View, TextStyle, StyleSheet} from 'react-native';
import AppText from './AppText';

interface errorProp {
    message: string,
    style?: TextStyle
}

const Error = ({message, style}:errorProp) => {
    return (
        <View style = {styles.container}>
            <AppText style={style}>{message}</AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: '3%',
        margin: '3%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default Error;