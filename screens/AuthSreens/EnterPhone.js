import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Input } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import axios from 'axios';
import { Loading, replacerSpecialCharacters } from '../../helpers/helpers';

import IconsBack from '../../assets/images/icons/icons-back';

class EnterPhone extends Component {
    state = {
        phone: '',
        pass: '',
        errPhone: '',
        errPass: '',
        loading: false,
    }
    handleChange = (value, name) =>{
        this.setState({[name]: value, errPhone: '', errPass: ''})
    }
    handleClickSubmitt = ({phone, pass} = this.state) =>{
        if(phone.length < 10){
            phone.length === 0 ?
            this.setState({errPhone: 'введите номер телефона'}):
            this.setState({errPhone: 'введите номер телефона полностью'})
        }else{
            if(pass.length === 0){
                this.setState({errPass: 'Введите пароль!'})
            }else{
                this.phoneRequest()
            }
        }
        
    }
    
    phoneRequest = () => {
        this.setState({loading: true})
        axios({
            method: 'POST',
            baseURL: 'https://mamado.elgrow.ru',
            url: '/api/auth/login',
            data: {
                phone: this.state.phone,
                password: this.state.pass,
            }
        }).then(response=>{
            this.setStorData(response.data, true)
            this.setState({loading: false})

        }).catch(err => {
            if (err.response.status == 403) {
                this.setState({loading: false, errPass: `Введен неверный телефон или пароль!`})
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
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/background-login.png')} style={styles.background}>
                    <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                        <IconsBack/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topSkip} onPress={() => this.props.navigation.navigate('ListOuter')}>
                        <Text style={styles.topSkipText}>Пропустить</Text>
                    </TouchableOpacity>
                </ImageBackground>
                <View style={styles.additionalPad}>
                    <Text style={styles.welcome}>Войти</Text>
                    <View style={styles.listBlock}>
                        <Text style={styles.listText}>
                            Войдите, чтобы использовать все возможности Mamado
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonsBlock}>
                <TextInputMask  
                        placeholderTextColor="#444B69" 
                        containerStyle={styles.containerStyle} 
                        inputContainerStyle={styles.inputContainerStyle} 
                        inputStyle={styles.inputStyle} 
                        style={styles.inputStyle}
                        placeholder="Номер телефона*"
                        type={'cel-phone'}
                        value={this.state.phone}
                        onChangeText={(value)=>this.handleChange(value, 'phone')}
                        options={{
                            withDDD: true, 
                            dddMask: '+7(999)999-99-99'
                        }}
                        maxLength={16}
                    />
                    <View>
                        {
                            (this.state.errPhone.length > 0) && 
                            <Text style={styles.errMessage}>{this.state.errPhone}</Text>
                        }
                    </View>
                    <Input 
                        placeholderTextColor="#444B69" 
                        containerStyle={styles.containerStyle} 
                        inputContainerStyle={styles.inputContainerStyle} 
                        inputStyle={styles.inputStyle} 
                        placeholder="Пароль*"
                        secureTextEntry={true}
                        value={this.state.pass}
                        onChangeText={(value) => this.handleChange(value, 'pass')}
                        errorMessage={this.state.errPass}
                    />
                    <TouchableOpacity onPress={() => this.handleClickSubmitt()} style={styles.buttonLogin}>
                        <Text style={styles.buttonText}>ВОЙТИ В ПРИЛОЖЕНИЕ</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.forgot}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPhone')}>
                        <Text style={styles.forgotText}>Забыл пароль :(</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.skip}>
                    <Text>
                        <Text style={styles.skipDisabled}>Нажимая «Войти» вы соглашаетесь{"\n"}с условиями </Text>
                        <Text style={styles.skipText}>публичной оферты</Text>
                    </Text>
                </TouchableOpacity>
                <Loading isLoading={this.state.loading}/>
            </View>
        );
    }
}

export default EnterPhone;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    additionalPad: {
        paddingLeft: 35,
        paddingRight: 35
    },
    background: {
        width: '100%',
        height: 160,
        position: 'absolute',
        top: 80
    },
    back: {
        width: 24, 
        marginLeft: 24, 
        marginTop: -20
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
        width: 90, 
        position: 'absolute', 
        right: 24, 
        top: -20
    },
    topSkipText: {
        fontSize: 15,
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        color: '#444B69'
    },
    containerStyle:{
        paddingLeft: 0, 
        paddingRight: 0}
    ,
    inputContainerStyle:{ 
        borderBottomWidth: 0, 
        width: '100%', 
        borderRadius:10 
    },
    inputStyle:{
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
