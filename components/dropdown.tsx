import React, {useState} from 'react';
import {Pressable, View, Image, StyleSheet, FlatList, Modal} from 'react-native';
import AppText from './AppText';

const countries = [
    'Nigeria', 'United States', 'United Kingdom', 'Australia', 'Germany',
    'Argentina', 'Brazil', 'Canada'
]

type dropdownProps = {
    selectedCountry: string;
    setSelectedCountry: (item: string) => void
}

const CustomDropdown = ({selectedCountry, setSelectedCountry}: dropdownProps) : React.JSX.Element => {
    const [listModal, setListModal] = useState<boolean>(false)

    return (
        <Pressable style = {styles.dropdownInput}>
            <View style ={{flexDirection: 'row'}}>
                <View style={[{width: '80%'}, styles.center]}>
                    <AppText fontSize = {16} style={{fontWeight: 'bold'}}>{selectedCountry ? selectedCountry : 'Select Country'}</AppText>
                </View>            
                <Pressable style={{width: '20%', alignItems: 'flex-end', justifyContent: 'center'}} onPress = {() => setListModal(!listModal)}>
                    <Image source = {require('../assets/icons/icons8-dropdown.png')} style = {styles.dropdownIcon} />
                </Pressable>
            </View>          
            {
                listModal && (
                <View style={{flexDirection: 'row', padding: '4%', marginVertical: '4%'}}>
                    <View style={{width: '80%'}}>
                        <FlatList 
                            data = {countries}
                            keyExtractor={(item) => item}
                            scrollEnabled={false}
                            renderItem={({item}) => (
                                <Pressable onPress = {() => {
                                    setSelectedCountry(item);
                                    setListModal(false);
                                }}>
                                    <AppText fontSize = {16} style={{padding: '1.3%'}}>{item}</AppText>
                                </Pressable>
                            )}
                        />
                    </View>               
                </View>
                )
            }         
        </Pressable>
    )
}

const styles = StyleSheet.create({
    dropdownIcon : {
        width: 30,
        height: 30,
        color: '#000'
    },
    dropdownInput : {
        borderWidth: 0.7,
         borderColor: '#40404080',
        padding: '4%',
        width: '96%',
        marginHorizontal: '1.5%',
        marginVertical: '3%',
        borderRadius: 10
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CustomDropdown;