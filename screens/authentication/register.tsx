import React, {useState} from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View, TextInput, Pressable, Image, ScrollView} from 'react-native';
import AppText from '../../components/AppText';
import Error from '../../components/error';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { navigationParamList } from '../../components/type';
import baseUrl from '../../components/url';
import CustomDropdown from '../../components/dropdown';

type RegisterNavigationProp = NativeStackScreenProps<navigationParamList, 'register'>

const {height} = Dimensions.get('window');

const Register = ({navigation}: RegisterNavigationProp) : React.JSX.Element => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [hidePassword, setHiddenPassword] = useState<boolean>(true);
    const [country, setCountry] = useState<string>('');


    const handleRegister = () => {

        if(firstName == '' || lastName == '' || email == '' || password == '' || country == ''){
            setError('Fill all fields completely');
            return
        }

        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            country: country
        }

        fetch(`${baseUrl}/user/quickRegister`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if(!res.ok){
                if(res.status == 401){
                    return console.log('User already exist');
                }else if (res.status == 500){
                    return console.log('Registration failed');
                }
            }

            navigation.navigate('main');
        }).catch((error) => {
            console.log(error);
        })
    }


    return (
        <SafeAreaView style = {styles.container}>
            <ScrollView style={{paddingBottom: '5%'}}>
                <View style={styles.formHeader}>
                    <AppText style = {{fontSize: 40, fontWeight: 'bold'}}>Create An</AppText>
                    <AppText style = {{fontSize: 30, marginTop: '-4%', fontWeight: 'bold', color: '#d9a407'}}>Account</AppText>
                </View>
                <View style={[styles.formContainer, styles.center]}>
                    <View style={styles.namesField}>
                        <TextInput style={styles.nameTextInput} placeholder='first name' 
                        onChangeText={(text) => setFirstName(text.trim().toLowerCase())}/>
                        <TextInput style={styles.nameTextInput} placeholder= 'last name' 
                        onChangeText={(text) => setLastName(text.trim().toLowerCase())}/>
                    </View>
                    <View style={{width: '100%'/*alignItems: 'center'*/}}>
                        <TextInput style = {styles.txtInput} placeholder='email' 
                        onChangeText={(text) => setEmail(text.trim().toLowerCase())}/>
                    </View>
                    <View style={{width: '100%'/*alignItems: 'center'*/}}>
                        <CustomDropdown selectedCountry={country} setSelectedCountry={setCountry}/>
                    </View>
                    <View style = {{width: '100%', /*alignItems: 'center'*/}}>
                        <TextInput secureTextEntry = {hidePassword} style = {styles.txtInput} placeholder='password' 
                        onChangeText={(text) => setPassword(text.trim())}/>
                        <Pressable style={{position: 'absolute', top: '26%', right: '5%', borderRadius: 5, padding: '1.5%'}} 
                            onPress = {() => setHiddenPassword(!hidePassword)}>
                        {
                                hidePassword ? (
                                    <Image source = {require('../../assets/icons/show-password.png')} 
                                        style={{width: 25, height: 25}} />
                                    ) : (<Image source = {require('../../assets/icons/hide-password.png')} 
                                    style={{width: 25, height: 25}} />)
                            }
                        </Pressable>
                    </View>
                    {error && firstName == '' || lastName == '' || email == '' || password == '' 
                    ? (<Error message = { error } />) : null}
                </View>
                <View style={styles.altSignup}>
                    <Pressable style={styles.submit} onPress = {handleRegister}>
                        <AppText style={{fontSize: 20, fontWeight: 'bold', color: '#d9a407'}}>Submit</AppText>
                    </Pressable>
                    <View style={[{width: '100%', padding: '5%'}, styles.center]}>
                        <AppText style = {{fontSize: 17, fontWeight: 'bold', color: '#404040B1'}}>Or</AppText>
                    </View>
                    <Pressable style = {[{flexDirection: 'row', borderRadius: 10,
                        borderColor: '#40404080', paddingVertical: '3%', marginVertical: '2%'},styles.center]}>
                        <Image style = {styles.google} source = {require('../../assets/images/google.png')}/>
                        <AppText style = {{fontSize: 16}}>Continue With Google</AppText>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        backgroundColor: '#f4f4f4'
    },
    formContainer: {
        width: '100%',
        padding: '5%',
    },
    namesField: {
        width: '100%',
        flexDirection: 'row'
    },
    nameTextInput: {
        width: '47%',
        paddingVertical: '4%',
        paddingHorizontal: '3%',
        borderWidth: 0.7,
        borderColor: '#40404080',
        borderRadius: 10,
        fontSize: 17,
        marginHorizontal: '1.5%',
        marginVertical: '2%'
    },
    txtInput: {
        borderWidth: 0.7,
        borderColor: '#40404080',
        width: '96%',
        marginHorizontal: '1.5%',
        marginVertical: '3%',
        padding: '4%',
        borderRadius: 10,
        fontSize: 17
    },
    formHeader: {
        width: '100%',
        paddingHorizontal: '10%',
        paddingTop: '23%',
        paddingBottom: '7%',
    },
    altSignup: {
        width: '100%',
        paddingHorizontal: '5%',
    },
    google: {
        width: 35,
        height: 35,
        marginRight: '3%'
    },
    center : {
        alignItems: 'center',
        justifyContent: 'center'
    },

    submit: {
        width: '100%', 
        paddingHorizontal: '3%',
        paddingVertical: '5%',
        backgroundColor: '#404040', 
        alignItems: 'center', 
        borderRadius: 15
    }
});


export default Register;