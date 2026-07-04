import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Pressable} from 'react-native';
import AppText from '../../components/AppText';
import RenderItem from './RenderItem';
import MessageSearch from './MessageSearch';
import { messageData, categoryData, navigationParamList} from '../../components/type';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import baseUrl from '../../components/url';

//const messages = require('../../assets/messages/messages.json');
//const category = require('../../assets/messages/categories.json');
//const {width, height} = Dimensions.get('window');

type message = Array<messageData>
type category = Array<categoryData>

type ExploreNavigationProp = NativeStackScreenProps<navigationParamList, 'allMessages'>

const MessageView = ({navigation, route} : ExploreNavigationProp) : React.JSX.Element => {
    const [selectedCategory, setSelectedCategory] = useState <string | {$oid : string} | null>('All');
    const [messages, setMessages] = useState<message>([]);
    const [category, setCategory] = useState<category>([]);

    useEffect(() => {
        
        //Get all messages
        fetch(`${baseUrl}/message`, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        }).then((res) => res.json()).then((data) => {
            setMessages(data.message);
        }).catch((error) => {
            console.log(error);
        })

        //Get the category data on the database
        fetch(`${baseUrl}/category`, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        }).then((res) => res.json())
        .then((data) => {
            setCategory(data.category)
        })
        .catch((error) => console.log(error));

    }, [])
    
    const filteredMessages : message = selectedCategory == 'All' ? messages : 
        messages.filter((message : messageData) => message.category._id === selectedCategory)

    //function to handle the press
    function handlePress (item : messageData){
        item.contentType.toLowerCase() == 'audio' ? navigation.navigate('audioSingle', {messageInfo : item}) :
        item.contentType.toLowerCase() == 'video' ? navigation.navigate('videoSingle', {messageInfo : item}) :
        item.contentType.toLowerCase() == 'book' ? navigation.navigate('bookSingle', {messageInfo: item}) : null
    }
    
    return (
            <SafeAreaView style={styles.container}>
                    <MessageSearch messages = {messages} />
                    <View style = {styles.messageCategory}>
                        <Pressable key = {1} style = {[styles.categoryItem, selectedCategory=='All' && styles.active]} 
                        onPressIn = {() => {setSelectedCategory('All')}}>
                            {selectedCategory == 'All' ? (<AppText style = {styles.textActive}>All</AppText>
                        ): (<AppText style = {styles.categoryText}>All</AppText>)}
                        </Pressable>
                        {category.map((category : categoryData) => (
                            <Pressable key = {category._id} 
                            style = {[styles.categoryItem, selectedCategory == category._id && styles.active]} 
                            onPressIn ={() => setSelectedCategory(category._id)}>
                                {selectedCategory == category._id ? (<AppText style = {styles.textActive}>{category.name}</AppText>
                        ): (<AppText style = {styles.categoryText}>{category.name}</AppText>)}
                            </Pressable>
                        ))}                                
                </View>
                <View>
                    <FlatList 
                        data = {filteredMessages}
                        keyExtractor={(item) => item._id}
                        renderItem={({item}) => <RenderItem item={item} onPress={() => handlePress(item)}/> }
                        numColumns={3}
                        contentContainerStyle = {{paddingBottom: 250}}
                    />
                </View>
                </SafeAreaView>
    )
}


const styles =  StyleSheet.create ({
    container : {
        flex: 1,
        padding : 10,
        backgroundColor: '#fff',
    },
    messageCategory : {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical: '6%',
    },
    categoryItem: {
        padding: '3%',
        marginHorizontal: '2%',
        borderColor: '#d9a407',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#f9f9f9'
    },
    categoryText : {
        fontSize: 13,
    },
    active : {
        backgroundColor: '#d9a407'
    },
    textActive : {
        color: '#f9f9f9',
        fontSize: 13
    }
})

export default MessageView;