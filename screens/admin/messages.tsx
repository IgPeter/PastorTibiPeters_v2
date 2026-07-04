import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator, Dimensions} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import baseUrl from '../../components/url';
import ListItem from './ListItem';

var {width, height} = Dimensions.get('window');

const ListHeader = () =>{
    return(
        <View style = {styles.listHeader}>
            <View style = {[styles.headerItem, {flex:1}]}></View>
            <View style = {[styles.headerItem, {flex:1}]}>
                <Text style={{fontWeight: 'bold', fontFamily: 'WorkSans', fontSize: 13}}>Title</Text>
            </View>
            <View style = {[styles.headerItem, {flex:2}]}>
                <Text style={{fontWeight: 'bold', fontFamily: 'WorkSans', fontSize: 13}}>Content Type</Text>
            </View>
            <View style = {[styles.headerItem, {flex:1}]}>
                <Text style={{fontWeight: 'bold', fontFamily: 'WorkSans', fontSize: 13}}>Category</Text>
            </View>
        </View>
    )
} 

const Messages = (props : any) => {
    const [messageList, setMessageList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [messageFiltered, setMessageFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();


        const deleteMessage  = (id: string) => {
            fetch(`${baseUrl}message/${id}`, {
                headers: {Authorization: `Bearer ${token}`}
            }).then(res=> {
                const messages = messageFiltered.filter((item : any) => item._id !== id)
                setMessageFiltered(messages);
            }).catch((error) => console.log(error))
        }

    return (
        <View style = {styles.container}>
            <View style = {styles.buttonContainer}>
                <Pressable onPress={()=>props.navigation.navigate('Categories')}>
                    <Text style={styles.buttonText}>Categories</Text>
                </Pressable>
                <Pressable onPress={()=>props.navigation.navigate('Message Form')}>
                    <Text style={styles.buttonText}>Create Message</Text>
                </Pressable>
            </View>
            <View style={{ width: '100%'}}>
                {loading == true ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="gold" />
                </View>
                ):(
                    <FlatList 
                        style={{marginTop: 40}}
                        data={messageFiltered}
                        ListHeaderComponent={ListHeader}
                        renderItem={({item, index}: any) => (
                            <ListItem
                                key = {item.id}
                                {...item}
                                token={token}
                                navigation = {props.navigation}
                                index={index}
                                delete={deleteMessage}
                            />
                        )}
                        keyExtractor={(item : any) => item.id}
                    />
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        backgroundColor: 'gainsboro',
        elevation: 1
    },
    headerItem: {
        margin: 3,
        width: width/8
    },
    spinner: {
        height: height/2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        marginBottom: 160,
        alignItems: 'center',
        height: height,
        backgroundColor: 'white'
    },
    buttonContainer: {
        padding: 20,
        marginTop: 30,
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        color: '#f2f2f2',
        fontFamily: 'WorkSans',
        fontWeight: 600,
        textAlign: 'center' 
    }
})

export default Messages