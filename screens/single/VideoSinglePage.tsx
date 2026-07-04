import React from 'react';
import { SafeAreaView, StyleSheet, View, Image, Dimensions, Pressable} from 'react-native';
import AppText from '../../components/AppText';
import { messageData, navigationParamList } from '../../components/type';
import { NativeStackScreenProps} from '@react-navigation/native-stack';

const {height} = Dimensions.get('window');

type SinglePageNavigationProp = NativeStackScreenProps<navigationParamList, 'videoSingle'>;


const VideoSinglePage = ({navigation, route} : SinglePageNavigationProp) : React.JSX.Element => {

    const message : messageData = {...route.params.messageInfo};

    return (
        <SafeAreaView style = {[styles.container, styles.center]}>
            <View style={[{width: '95%', height: '45%', paddingHorizontal: '5%', paddingVertical: '2%'}, styles.center]}>
                <Image source = {{uri: message.image}} style={{width: '95%', height: '100%',  borderRadius: 5}}/> 
            </View>
             {/*Begining of title and description box*/}
            <View style = {styles.mainContentView}>
                    <AppText style = {styles.messageTitle}>{message.title}</AppText>
                    <AppText style = {{fontSize: 16, fontWeight: 'normal'}}>
                        {message.description.length > 150 ? message.description.substring(0,149)
                        + '...' : message.description}</AppText>
            </View>
            {/*End of title and description box*/}
            <View style={[styles.finalView, styles.center]}>
                <Pressable style = {[{width: '80%', borderRadius: 3, 
                    backgroundColor: '#d9a407', padding: '4%'}, styles.center]} onPress={() => navigation.navigate('videoPlay', {messageInfo: message})}>
                    <AppText style = {{fontWeight: 'bold', fontSize: 18}}>Watch Now!</AppText>
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
        paddingTop: '3%',
        marginBottom: '0.5%'
    },
    finalView: {
        width: '100%',
        height: '15%',
        marginTop: '7.5%'
    }
});


export default VideoSinglePage;