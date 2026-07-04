import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';

interface CheckBoxProps {
    style? : ViewStyle,
    onPress: () => void
}

const CustomCheckBox = ({style, onPress} : CheckBoxProps) : React.JSX.Element => {

    return (
        <View style ={{padding: '2%'}}>
            <TouchableOpacity
                onPress = {onPress}
                style ={StyleSheet.flatten([{
                    width: 17,
                    height: 17,
                    borderWidth: 0.9,
                    borderColor: '#40404080',
                    marginRight: '3%',
                }, style])}
            />
        </View>
    )
}

export default CustomCheckBox;