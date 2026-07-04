import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, TextInput, Image, View, Dimensions} from 'react-native';
import AppText from '../../components/AppText';
import CheckBox from '../../components/customCheckBox';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { navigationParamList} from '../../components/type';
import baseUrl from '../../components/url';
import Error from '../../components/error';

type LoginNavigationProp = NativeStackScreenProps<navigationParamList, 'main'>

const width = Dimensions.get('window').width;

const Login = ({navigation} : LoginNavigationProp) : React.JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [hidePassword, setHiddenPassword] = useState<boolean>(true);
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const handleLogin = () => {

            if(email == '' || password == ''){
                setError('Fill in the form completely');
                return
            }

            const user = {
                email: email,
                password: password
            }

            fetch(`${baseUrl}/user/login`, 
                {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            ).then((res) => res.json())
            .then((data) => {
                navigation.navigate('subscription', {user: data});
            })
    }

    return (
        <SafeAreaView style= {[styles.container, styles.center]}>
            <View style={[styles.formHeader, styles.center]}>
                <AppText style = {{fontSize: 35, fontWeight: 'bold'}}>Welcome Back</AppText>
                <AppText style = {{color: '#d9a407', fontSize: 15, fontWeight: 'bold'}}>
                    Login to your account
                </AppText>
            </View>
            <View style = {[styles.textInputView, {alignItems: 'center'}]}>
                <TextInput placeholder = 'email' onChangeText={(email) => setEmail(email.trim().toLowerCase()) }
                style = {[styles.textInput, {marginBottom: '3%'}]}/>
                    <TextInput placeholder = 'password' secureTextEntry = {hidePassword} 
                    onChangeText = {(password) => setPassword(password.trim())}
                    style = {[styles.textInput, {marginBottom: '-0.5%'}]}/>
                    <Pressable style={{position: 'absolute', top: '41%', right: '11%', borderRadius: 5, padding: '1.5%'}} 
                    onPress = {() => setHiddenPassword(!hidePassword)}>
                        {
                            hidePassword ? (
                                <Image source = {require('../../assets/icons/show-password.png')} 
                                style={{width: 25, height: 25}} />
                            ) : (<Image source = {require('../../assets/icons/hide-password.png')} 
                            style={{width: 25, height: 25}} />)
                        }
                    </Pressable>
                <View style = {styles.smallTextView}>
                    <Pressable style = {{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <AppText style={styles.textInputSmallText}>Remember me</AppText>
                        <CheckBox style={{ width: 13, height: 13, borderRadius: 3 }} 
                        onPress={() => setIsChecked(!isChecked)}/>
                    </Pressable>
                    <Pressable>
                        <AppText style={styles.textInputSmallText}>Forgot Password ?</AppText>
                    </Pressable>
                </View>
                {error && email == '' || password == '' ? 
                (<Error message = {error} style={{color: 'red'}}/>) : null}
            </View>
            <View style = {[{width: '100%', padding: '4%'}, styles.center]}>
                <Pressable onPress = {handleLogin} style = {[styles.btn, styles.center]}>
                    <AppText style = {{fontSize: 20, color: '#d9a407', fontWeight: 'bold'}}>
                        LOGIN
                    </AppText>
                </Pressable>
            </View>
            <Pressable onPress = {() => navigation.navigate('register')}>
                <AppText>Don't have an account ? Register</AppText>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f4f4f4'
    },
    formHeader: {
        width: '100%',
        height: width/2
    },
    center : {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        padding: '4.5%',
        borderWidth: 0.9,
        width: '90%',
        fontSize: 17,
        borderColor: '#40404080',
        borderRadius: 10
    },
    textInputView: {
        width: '100%', 
        padding: '3%', 
        height: width/1.5
    },
    smallTextView: {
        flexDirection: 'row', 
        width: '90%', 
        marginTop: '2%', 
        justifyContent: 'space-between'
    },
    textInputSmallText : {
        fontSize: 13, 
        color: '#d9a407B1', 
        fontWeight: 'bold',

    },
    btn: {
        width: '90%',
        padding: '4%',
        backgroundColor: '#404040',
        borderRadius: 15,
        borderWidth: 0.4,
        marginTop: '15%'
    }
})



export default Login;