import React, {useRef, useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, View, Dimensions } from 'react-native';
import Video, { VideoRef } from 'react-native-video';

//const {width, height} = Dimensions.get('window');

const VideoPlay = () : React.JSX.Element => {
    const videoRef = useRef<VideoRef>(null);
    const videoSource = require('../../assets/videos/test-video.mp4');
    const [width] = useState(Dimensions.get('window').width);
    const [height] = useState(Dimensions.get('window').height);
    const [orientation] = useState(getOrientation());

    function getOrientation() {
        return height > width ? 'POTRAIT' : 'LANDSCAPE';
    }

    const isPotrait = orientation === 'POTRAIT';

    const videoWidth = width;
    const videoHeight = isPotrait ? (width * 3)/3.5 : height;

    console.log(orientation)

    return (
        <SafeAreaView style = {styles.container}>
            <View style = {styles.videoPlayer}>
                <Video style={{height: videoHeight, width: videoWidth, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
                    source = {videoSource}
                    ref = {videoRef}
                    resizeMode='cover'
                    controls = {true}
                    onError= {(error) => console.log(error)}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    videoPlayer : {
        flex: 1,
        backgroundColor: '#202020',
        borderWidth: 2
    }
});


export default VideoPlay;