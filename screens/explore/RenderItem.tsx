import React from 'react';
import {StyleSheet, View, Image, Dimensions, Pressable} from 'react-native';
import AppText from '../../components/AppText';
import {messageData} from '../../components/type';


const {width} = Dimensions.get('window');

interface itemProps {
    item : messageData,
    onPress : () => void;
}


const RenderItem = ({item, onPress} : itemProps) : React.JSX.Element => {

    const {image, contentType, title} = item;
    
    return (
        <Pressable style = {styles.container} onPress = {onPress}>
            <View>
                <Image source = {{uri: image}} style = {styles.renderImage}/>
            </View>
            <View style={styles.contentTypeContainer}>
                <AppText style={styles.contentTypeText}>
                    {contentType}
                </AppText>
                {contentType === 'video' ? (
                    <View>
                        <Image style = {styles.icon} source = {require('../../assets/icons/vector_video.png')}/>
                    </View>
                ) : contentType === 'audio' ? (
                    <View>
                        <Image style = {styles.icon} source = {require('../../assets/icons/vector_audio.png')}/>
                    </View>
                ) : contentType === 'book' ? (
                    <View>
                        <Image style = {styles.icon} source = {require('../../assets/icons/vector_book.png')}/>
                    </View>
                ): null}
            </View>
            <View style = {{width: width/3.3}}>
                <AppText style = {styles.title}>
                    {title.length > 10 ? title.substring(0, 15) + '...' : title}
                </AppText>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container : {
        //flex: 1
        width: width/3.2,
        marginBottom: '7%'
    },
    renderImage: {
        width: width/3.3,
        height: width/3.2
    },
    title : {
        marginTop: '1%',
        fontFamily: 'Satoshi-Bold',
        fontSize: 11.2,
        textAlign: 'center',
        color: '#000'
    },
    contentTypeContainer: {
        width: width/3.3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contentTypeText : {
        fontSize: 10,
        fontFamily: 'Satoshi-Bold',
        marginLeft: '2.5%',
    },
    icon: {
        width: 10,
        height: 10,
        resizeMode: 'contain',
        marginRight: '3%'
    }
});

export default RenderItem;