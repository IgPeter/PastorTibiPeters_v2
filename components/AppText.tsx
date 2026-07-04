import React from 'react';
import {StyleSheet, Text, TextStyle, useWindowDimensions} from 'react-native';

interface AppTextProps {
    children : React.ReactNode,
    fontSize? : number,
    style? : TextStyle 
}

const AppText = ({children, fontSize=13, style}: AppTextProps) : React.JSX.Element => {

    const {fontScale} = useWindowDimensions();

    const defaultStyle :  TextStyle = {
        fontFamily: 'Satoshi-Medium',
        fontSize: fontSize/fontScale,
        color: '#404040'
    }

    return (
        <Text style = {StyleSheet.flatten([defaultStyle, style])}>
            {children}
        </Text>
    )
}


export default AppText;