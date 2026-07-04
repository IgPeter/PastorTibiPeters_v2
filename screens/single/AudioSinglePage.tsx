import React from 'react';
import { SafeAreaView, StyleSheet, View, Image, Dimensions, Pressable} from 'react-native';
import AppText from '../../components/AppText';
import { navigationParamList, messageData } from '../../components/type';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const messages = require('../../assets/messages/messages.json');
const {height} = Dimensions.get('window');

type AudioSingleNavigation = NativeStackScreenProps<navigationParamList, 'audioSingle'>;

const imageMap : {[ key : string ] : any} = {
    '../../assets/messages/img/OWFG.jpg' : require('../../assets/messages/img/OWFG.jpg'),
    '../../assets/messages/img/TOC.jpg' : require('../../assets/messages/img/TOC.jpg'),
    '../../assets/messages/img/FUF.jpeg' : require('../../assets/messages/img/FUF.jpeg'),
    '../../assets/messages/img/TM&M.jpeg' : require('../../assets/messages/img/TM&M.jpeg'),
    '../../assets/messages/img/TCGB.jpeg' : require('../../assets/messages/img/TCGB.jpeg'),
    '../../assets/messages/img/LS.jpeg' : require('../../assets/messages/img/LS.jpeg')
}

const AudioSinglePage = ({navigation, route} : AudioSingleNavigation) : React.JSX.Element => {

    const message : messageData = route.params.messageInfo;

    return (
        <SafeAreaView style = {[styles.container, styles.center]}>
            <View style={[{width: '95%', height: '45%', paddingHorizontal: '5%', paddingVertical: '2%'}, styles.center]}>
                <Image source = {imageMap[messages[5].image]} style={{width: '95%', height: '100%'}}/> 
            </View>
             {/*Begining of title and description box*/}
            <View style = {styles.mainContentView}>
                    <AppText style = {styles.messageTitle}>{messages[5].title}</AppText>
                    <AppText style = {{fontSize: 16, fontWeight: 'normal'}}>
                        {messages[5].description.length > 150 ? messages[5].description.substring(0,149) 
                        + '...' : messages[5].description}</AppText>
            </View>
            {/*End of title and description box*/}
            <View style={[styles.finalView, styles.center]}>
                <Pressable style = {[{width: '80%', borderRadius: 3, 
                    backgroundColor: '#d9a407', padding: '4%'}, styles.center]} onPress={() => navigation.navigate('audioPlay', {messageInfo: message})}>
                    <AppText style = {{fontWeight: 'bold', fontSize: 18}}>Listen Now!</AppText>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        height: height,
        backgroundColor: '#f4f4f4'
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    mainContentView: {
        width: '95%',
        height: '30%',
        padding: '4%'
    },

    //Text styles
    messageTitle : {
        fontWeight: 'bold',
        fontSize: 27,
        paddingTop: '3%'
    },
    play : {
        width: '80%',
        padding: '6%',
        marginLeft: '10%',
        marginTop: '15%',
        borderRadius: 3,
        backgroundColor: '#d9a407'
    },
    finalView: {
        width: '100%',
        height: '15%',
        marginTop: '7.5%'
    }
});


export default AudioSinglePage;