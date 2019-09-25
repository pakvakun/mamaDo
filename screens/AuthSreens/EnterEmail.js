import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions, KeyboardAvoidingView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from '../../node_modules/react-native-linear-gradient';
import { Input } from 'react-native-elements';
import {replacerSpecialCharacters, Loading} from '../../helpers/helpers';
import axios from 'axios';

import IconsBack from '../../assets/images/icons/icons-back';

class EnterPhone extends Component {
    state = {
        email: '',
        pass: '',
        errEmail: '',
        errPass: '',
        loading: false,
    }
    handleChangeText = (value, name) =>{
        let pureValue = replacerSpecialCharacters(value);
        let oneDog = pureValue.match(/[@]/gi)||'';
        if(oneDog.length <= 1){
            this.setState({[name]: pureValue})
        }
        this.setState({errEmail: '', errPass: ''})
    }
    handleClickSubmitt = ({email, pass} = this.state) =>{
        if(email !== ''){
            if(email.match(/.+@.+\..+/)){
                this.setState({errEmail: ''});
                if(pass !==  ''){
                    this.setState({errPass: ''});
                    this.requestRegister();
                }else{
                    this.setState({errPass: 'Поле обязательно к заполнению'})
                }
            }else{
                this.setState({errEmail: 'E-mail некорректен'})
            }
        }else{
            this.setState({errEmail: 'Поле обязательно к заполнению'});
        }
        
    }
    
    requestRegister = () => {
        this.setState({loading: true})
        axios({
            method: 'POST',
            baseURL: 'https://mamado.elgrow.ru',
            url: 'api/auth/login',
            data: {
                email: this.state.email,
                password: this.state.pass,
            },
            timeout: 10000,
            
        }).then(response=>{            
            if(response.data.status == 'ok'){
                this.setStorData(response.data, true)
            }else{
                
            }

        }).catch(err => {
            if (err.response.status == 403) {
                this.setState({loading: false, errPass: `Неверный логин или пароль, попробуйте снова!`})
            }else{
                this.setState({loading: false, errPass: `Что-то пошло не так :( \n Попытайтесь позже! \n${err}`})
            }
        })
    }
    setStorData = async (data, setVal) => {
        let err;
        try {
            await AsyncStorage.setItem('isAuth', JSON.stringify(setVal))
            await AsyncStorage.setItem('token', JSON.stringify(data.token))
        } catch (error) {
            err = error
        }
        if (!err) {
            this.props.navigation.navigate('ListOuter');
            this.setState({loading: false})
        }
        
    }
    componentDidMount = () => {
        Dimensions.addEventListener('change', e => {
            console.log(e);
            
        })
        // Dimensions.get('window').height
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
                <ImageBackground source={require('../../assets/images/background-login.png')} style={styles.background} />
                    <LinearGradient colors={[ '#FFFFFF', '#FFFFFF','#FFFFFF', '#FFFFFF', '#FFFFFF00']} style={styles.topButtons}>
                        <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                            <IconsBack/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.topSkip} onPress={() => this.props.navigation.navigate('ListOuter')}>
                            <Text style={styles.topSkipText}>Пропустить</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                <View style={styles.additionalPad}>
                    <Text style={styles.welcome}>Войти</Text>
                    <View style={styles.listBlock}>
                        <Text style={styles.listText}>
                            Войдите, чтобы использовать все возможности Mamado
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonsBlock}>
                    <Input 
                        placeholderTextColor="#444B69" 
                        containerStyle={styles.containerStyle} 
                        inputContainerStyle={styles.inputContainerStyle} 
                        inputStyle={styles.inputStyle} 
                        placeholder="E-mail*"
                        onChangeText={(value)=>this.handleChangeText(value, 'email')}
                        value={this.state.email}
                        errorMessage={this.state.errEmail}
                    />
                    <Input 
                        placeholderTextColor="#444B69" 
                        containerStyle={styles.containerStyle} 
                        inputContainerStyle={styles.inputContainerStyle} 
                        inputStyle={styles.inputStyle} 
                        placeholder="Пароль*"
                        onChangeText={(value)=>this.handleChangeText(value, 'pass')}
                        value={this.state.pass}
                        secureTextEntry = {true}
                        errorMessage={this.state.errPass}
                    />
                    <TouchableOpacity onPress={() => this.handleClickSubmitt()} style={styles.buttonRegister}>
                        <Text style={styles.buttonText}>ВОЙТИ В ПРИЛОЖЕНИЕ</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.forgot}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotEmail')}>
                        <Text style={styles.forgotText}>Забыл пароль :(</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.skip}>
                    <Text>
                        <Text style={styles.skipDisabled}>Нажимая «Войти» вы соглашаетесь{"\n"}с условиями   </Text>
                        <Text style={styles.skipText}>публичной оферты</Text>
                    </Text>
                </TouchableOpacity>
                <Loading isLoading={this.state.loading}/>
            </KeyboardAvoidingView>
        );
    }
}

export default EnterPhone;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    additionalPad: {
        paddingLeft: 35,
        paddingRight: 35
    },
    background: {
        width: '100%',
        height: 160,
        position: 'absolute',
        top: 80,
        zIndex: 1000
    },
    back: {
        width: 24, 
    },
    welcome: {
        fontSize: 36,
        fontWeight: 'bold',
        fontFamily: 'SF Compact Rounded',
        color: '#444B69',
        textAlign: 'left'
    },
    listBlock: {
        marginTop: 30
    },
    listRow: {
        marginBottom: 7
    },
    listText: {
        fontSize: 16,
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    topButtons: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        height: 120 , 
        zIndex: 999, 
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        paddingTop: 60, 
        paddingLeft: 24, 
        paddingRight: 24
    },
    buttonsBlock: {
        marginTop: 50,
        paddingLeft: 24,
        paddingRight: 24
    },
    buttonLogin: {
        backgroundColor: '#E94C89',
        padding: 20,
        borderRadius: 10,
        marginBottom: 15
    },
    buttonRegister: {
        backgroundColor: '#42BCBC',
        padding: 20,
        borderRadius: 10
    },
    buttonText: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'SF Pro Text',
        fontSize: 14,
        fontWeight: '600',
    },
    skip: {
        position: 'absolute',
        bottom: 55,
        width: '100%'
    },
    skipText: {
        fontSize: 15,
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontWeight: '500',
        textAlign: 'center'
    },
    skipDisabled: {
        fontSize: 15,
        color: '#A2A6B5',
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        textAlign: 'center'
    },
    forgot: {
        marginTop: 38
    },
    forgotText:{
        color: '#444B69',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'SF Pro Text',
        fontWeight: '500'
    },
    topSkip: {
        // width: 90, 
        // position: 'absolute', 
        // right: 24, 
        // top: 60
    },
    topSkipText: {
        fontSize: 15,
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        color: '#444B69'
    },
    containerStyle: {
        paddingLeft: 0, 
        paddingRight: 0
    },
    inputContainerStyle: {
        borderBottomWidth: 0, 
        width: '100%', 
        borderRadius:10 
    },
    inputStyle: {
        fontFamily: 'SF Pro Text', 
        fontWeight: '400', 
        fontSize: 16, 
        borderRadius: 10, 
        marginBottom: 15, 
        width: '100%', 
        height: 55, 
        backgroundColor: '#F0F1F3', 
        color: '#444B69', 
        paddingLeft: 23, 
        paddingRight: 23
    },
    errMessage: {
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        color: 'red',
        paddingLeft: 20,
        paddingBottom: 20
    }
});
