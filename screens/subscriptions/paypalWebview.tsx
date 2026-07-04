import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { navigationParamList } from '../../components/type';

type PaypalWebviewNav = NativeStackScreenProps<navigationParamList, 'paypalWebview'>

const PaypalWebview = ({route} : PaypalWebviewNav) => {

    const webviewUrl = route.params.link;

    return (
        <SafeAreaView>
            <WebView 
                source = {{uri: webviewUrl}}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
});


export default PaypalWebview;