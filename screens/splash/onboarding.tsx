import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import AppText from '../../components/AppText';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { navigationParamList } from '../../components/type';


type onboardNavigation = NativeStackScreenProps<navigationParamList, 'onboard'>



const Onboarding = ({navigation}: onboardNavigation): React.JSX.Element => {
    return (
        <SafeAreaView style = {styles.container}>
            <View style = {{width: '100%', marginBottom: '5%', paddingHorizontal: '10%'}}>
                <AppText fontSize = {30} style = {{fontWeight: 'bold', textAlign: 'center', margin: '2%'}}>Welcome To Pastor Tibi Peters Online</AppText>
                <AppText fontSize = {15} style = {{color: '#d9a407', textAlign: 'center'}}>Home for inspiring contents. These messages will take you from where you are to where you ought to be</AppText>
            </View>
            <View style = {[{marginBottom: '35%', marginTop: '10%'}, styles.center]}>
                <Pressable onPress = {() => navigation.navigate('main')} style = {[{backgroundColor: '#404040' , borderRadius: 10, width: 200, height: 60, }, styles.center]}>
                    <AppText fontSize = {23} style = {{color: '#d9a407', fontWeight: 'bold'}}>Get Started</AppText>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-end',
        backgroundColor: '#f4f4f4'
    },

    center : {
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default Onboarding;