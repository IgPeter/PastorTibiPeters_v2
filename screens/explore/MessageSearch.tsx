import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, 
    TextInput, TouchableWithoutFeedback, Image} from 'react-native';

import AppText from '../../components/AppText';

interface messageData {
    _id : {$oid : string},
    title: string,
    description : string,
    contentType: string,
    image : string,
    message : string,
    category : {$oid : string },
    isFeatured : boolean,
    dateCreated : {date : {numberLong : string }},
    _v : {numberInt : string}
}

const imageMap : {[key : string] : any} = {
    '../../assets/messages/img/OWFG.jpg' : require('../../assets/messages/img/OWFG.jpg'),
    '../../assets/messages/img/TOC.jpg' : require('../../assets/messages/img/TOC.jpg'),
    '../../assets/messages/img/FUF.jpeg' : require('../../assets/messages/img/FUF.jpeg'),
    '../../assets/messages/img/TM&M.jpeg' : require('../../assets/messages/img/TM&M.jpeg'),
    '../../assets/messages/img/TCGB.jpeg' : require('../../assets/messages/img/TCGB.jpeg'),
    '../../assets/messages/img/LS.jpeg' : require('../../assets/messages/img/LS.jpeg')
}

type message = Array<messageData>

const MessageSearch = (props : any) : React.JSX.Element => {

    const {messages} = props;

    const [focus, setFocus] = useState<boolean | undefined | null>(false);
    const [searchedMessage, setSearchedMessage] = useState<message>([]);

    const handleSearch = (text : string) => {
        setSearchedMessage(messages.filter((message : messageData) => message.title.
        toLowerCase().includes(text.toLowerCase())));
    }

    const openDropdown = () => {
        setFocus(true);
    }

    const closeDropdown = () => {
        setFocus(false);
        setSearchedMessage([])
    }
    
    return (
            focus == true ? (
                <SafeAreaView style = {[{flex: 1, padding: 10}, styles.fullscreen]}>
                    <View style = {styles.searchContainer}>
                        <TextInput style = {styles.focusedSearch} onChangeText={(text) => handleSearch(text)} onBlur = {closeDropdown}/>
                        <TouchableWithoutFeedback onPress = {closeDropdown}>
                            <Image style = {styles.searchArrow} source = {require('../../assets/icons/icon-close.png')}/>
                        </TouchableWithoutFeedback>
                    </View>
                    {searchedMessage.length > 0 ? (<View style = {styles.searchResultView}>
                             <View style = {{flex: 1}}>
                                <Image source = {imageMap[searchedMessage[0].image]} 
                                style = {{width: 60, height: 60, resizeMode: 'contain'}}/>
                            </View>
                            <View style = {{flex: 3, padding: 5}}>
                                <AppText style={{fontSize : 18, fontWeight: 'bold'}}>{searchedMessage[0].title}</AppText>
                                <AppText style={{fontSize : 12}}>{searchedMessage[0].description}</AppText>
                            </View>
                    </View>) : (
                        <View style = {styles.recentSearch}>
                            <AppText style = {{fontSize: 14, margin: 20}}>Found nothing, search again...</AppText>
                            <AppText style ={{fontSize: 22, fontWeight: 'bold'}}>Recent Searches</AppText>
                        </View>
                    )}
                </SafeAreaView>
            ) : (
            <View>
                <View style = {styles.headerText}>
                        <AppText style = {{fontFamily: 'Satoshi-Bold'}} fontSize={40}>Explore</AppText>
                        <AppText style = {{marginTop: '-2%'}} fontSize={12}>Browse All Messages</AppText>
                </View>
                <View style = {styles.space}>
                    <TextInput style={styles.search}
                        placeholder='What would you like to see' onFocus = {openDropdown}/>
                    <Image style={styles.searchIcon} source = {require('../../assets/icons/vector_search.png')} />
                </View>
            </View>
            )
    )
}

const styles = StyleSheet.create({
    
    headerText : {
        padding: '5%',
        backgroundColor: '#f6f6f6',
        borderWidth: 1,
        borderColor: '#f2f2f2'
    },
    searchContainer : {
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchArrow : {
        width: 35, 
        height: 35, 
        tintColor: '#d9a407',
        marginLeft: '-12%'
    },
    space : {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '3%'
    },
    search : {
        flex: 1,
        height: 50,
        paddingLeft: '5%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 2,
        paddingHorizontal: 10
    },
    searchIcon : {
        width: 24, // Adjust icon size as needed
        height: 24,
        tintColor: '#d9a407',
        position: 'absolute',
        right: '5%'
    },
    recentSearch : {
        padding: 10
    },
    searchResultView : {
        width: '100%',
        flexDirection: 'row',
        padding: 15
    },
    fullscreen : {
        position : 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex : 10,
        backgroundColor: '#fff'
    },
    focusedSearch : {
        width: '100%', 
        height: 50, 
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 3
    }
})

export default MessageSearch;