import React, {useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet, View, Image, Pressable } from 'react-native';
import AppText from '../../components/AppText';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const AudioPlay = (props : any) : React.JSX.Element => {
    const [sound, setSound] = useState<Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [message] = useState(props.route.params.messageInfo);

   useEffect(() => {

    const loadAudio = () => {
        const audio = new Sound('http://192.168.109.41:3000/public/upload/message/audioMessages/Zoe_The_Life_Of_God.mp3',
            null as unknown as string, 
             (error) => {          
            if(error){
                console.log(error);
            }else{
                console.log('Audio loaded');
            }        
        })

        setSound(audio);

        return audio;
    }

    const loadedAudio = loadAudio();

    return () => {
        loadedAudio.release();
    }

   }, []);

   const playAudio = () => {
    if(sound){
        sound.play((success: boolean) => {
            if(success){
                console.log('Playback finished successfully');
            }else {
                console.log('Failed to play audio');
            }
        });

        setIsPlaying(true);
        sound.setPan(1);
    }
   }

   const pauseAudio = () => {
        if(sound){
            sound.pause();
            setIsPlaying(false);
        }     
   }

   const rewindAudio = () => {
        //I am trying to rewind the audio
        //Step 1 - get the current position or time that the audio is at
        //Step 2 - shift it by some seconds
        if(sound){
            sound.getCurrentTime((seconds, isPlaying) => {      
                sound.setCurrentTime(seconds - 15);
                if(!isPlaying){
                    sound.play();
                }
            })
        }
   }

   const fastForwardAudio = () => {
    if(sound){
        sound.getCurrentTime((seconds, isPlaying) => {      
            sound.setCurrentTime(seconds + 15);
            
            if(!isPlaying){
                sound.play();
            }
        })
    }
   }

    return (
        <SafeAreaView style = {[styles.container, styles.center]}>
            <View style ={styles.audioPlayerView}>
                <View style = {{width: '90%', height: '40%'}}>
                    <Image source={require('../../assets/messages/img/TCGB.jpeg')} style={styles.playImg}/>
                </View>
                <View style = {styles.playDesc}>
                    <AppText style={{fontWeight: 'bold', color: '#404040',fontSize: 29}}>
                        The Church God Built
                    </AppText>
                    <AppText style={{fontWeight: '500', color: '#404040',fontSize: 13, textAlign: 'center'}}>
                        On this rock I will build my church and the gate of 
                        hell shall not prevail against it
                    </AppText>
                </View>
                <View style ={styles.iconContainer}>
                    <Pressable onPress = {rewindAudio}>
                        <Image source = {require('../../assets/icons/rewind96.png')} style={styles.playIcons}/>
                    </Pressable>
                    {
                        isPlaying ? (
                            <Pressable onPress = {pauseAudio}>
                                <Image source = {require('../../assets/icons/pause90.png')} style={styles.playIcons}/>
                            </Pressable>
                        ) : (
                            <Pressable onPress = {playAudio}>
                                <Image source = {require('../../assets/icons/play96.png')} style={styles.playIcons}/>
                            </Pressable>
                        )
                    }
                    <Pressable onPress = {fastForwardAudio}>
                        <Image source = {require('../../assets/icons/skip96.png')} style={styles.playIcons}/>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        padding: 10
    },

    audioPlayerView : {
        width: '98%',
        height: '98%',
        borderRadius: 7,
        borderWidth: 0.8,
        borderColor: '#d9a407',
        backgroundColor: '#f3f3f3',
        alignItems: 'center',
        justifyContent: 'center'
    },

    playImg : {
        borderRadius: 5,
        width: '100%',
        height: '100%',
        //resizeMode: 'contain'
    },
    center : {
        justifyContent: 'center',
        alignItems: 'center'
    },
    playDesc : {
        width: '95%',
        alignItems: 'center',
        marginTop: '5%',
        padding: '5%'
    },
    playIcons : {
        width: 50,
        height: 50
    },
    iconContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        width: '95%', 
        height: '25%', 
        borderRadius: 5,
        marginTop: '18%',
        backgroundColor: '#d9a40775',
    }
});


export default AudioPlay;