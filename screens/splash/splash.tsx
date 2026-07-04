import React, {useEffect, useState} from 'react';
import { Image, SafeAreaView, StyleSheet, View, ActivityIndicator} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { navigationParamList } from '../../components/type';

type splashNavigation = NativeStackScreenProps<navigationParamList, 'splash'>


const Splash = ({navigation}: splashNavigation) => {       
    const [isLoading, setIsLoading] = useState<boolean>(false);
        
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate('onboard');
        }, 10000)
    }, [])
    
    return (
        <SafeAreaView style = {[{flex: 1, padding: 10 }, styles.center]}>
                <View style = {styles.logoView}>
                    <Image source = {require('../../assets/images/logo.png')} 
                    style = {{width: 120, height: 120}} />
                </View>
                {isLoading && (<View style = {{marginTop: '20%'}}>
                    <ActivityIndicator color = '#d9a407' size = 'large'/>
                </View>)}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    center : {
        justifyContent: 'center',
        alignItems: 'center'
    },

    logoView: {

    }
});


export default Splash;