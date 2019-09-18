import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Input } from 'react-native-elements';
import axios from 'axios';
import {replacerSpecialCharacters, Loading} from '../../helpers/helpers';

import IconsBack from '../../assets/images/icons/icons-back';

class EnterPhone extends Component {
    state = {
        newPass: '',
        errNewPass: '',
        loading: false,
    }
    handleChange = val => {
        this.setState({newPass: val, errNewPass: ''})
    }
    handleClick = () => {
        this.state.newPass.length === 0 ?
        this.setState({errNewPass: 'Введите пароль из E-mail!'}):
        this.requestForgotEmail();
        // this.props.navigation.navigate('ListOuter')
    }
    // requestForgotEmail = () => {
    //     this.setState({loading: true})
    //     axios({
    //         method: 'POST',
    //         url: 'https://jsonplaceholder.typicode.com/posts',
    //         data: {
    //             newPass: this.state.newPass,
    //             successCompare: true
    //         }
    //     }).then(response=>{
    //         response.data.successCompare ?
    //             (this.props.navigation.navigate('EnterEmail'), this.setState({loading: false})):
    //             this.setState({loading: false, errNewPass: 'Введите корректный пароль из E-mail!'});

    //     })
    // }
    requestForgotEmail = () => {
        this.setState({loading: true})
        axios({
            method: 'POST',
            baseURL: 'https://mamado.elgrow.ru',
            url: 'api/auth/login',
            data: {
                email: this.props.navigation.state.params.email,
                password: this.state.newPass,
            },
            timeout: 10000,
            
        }).then(response=>{
            console.log(response, this.props);
            
            if(response.data.status == 'ok'){
                this.setStorData(response.data, true)
            }else{
                this.setState({loading: false, errNewPass: `Ошибка, попробуйте снова!`})
            }

        }).catch(err => {
            console.log(err)
            this.setState({loading: false, errNewPass: 'Что-то пошло не так :( \n Попытайтесь позже!'})            
        })
    }
    setStorData = async (data, setVal) => {
        let err;
        try {
            await AsyncStorage.setItem('isAuth', JSON.stringify(setVal))
            await AsyncStorage.setItem('token', JSON.stringify(data.token))
        } catch (error) {
            err = error;
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
                    <Text style={styles.welcome}>Ваш пароль отправлен на почту!</Text>
                </View>
                <View style={styles.buttonsBlock}>
                    <Input 
                        placeholderTextColor="#444B69" 
                        containerStyle={styles.containerStyle} 
                        inputContainerStyle={styles.inputContainerStyle} 
                        inputStyle={styles.inputStyle} 
                        placeholder="Ваш пароль"
                        value={this.state.newPass}
                        onChangeText={(value)=>this.handleChange(value)}
                        errorMessage={this.state.errNewPass}
                        secureTextEntry = {true}
                    />
                    <TouchableOpacity style={styles.buttonRegister} onPress={()=> this.handleClick()}>
                        <Text style={styles.buttonText}>ВОЙТИ В ПРИЛОЖЕНИЕ</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.skip}>
                    <Text>
                        <Text style={styles.skipDisabled}>Регистрируясь, вы соглашаетесь{"\n"}с условиями </Text>
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
        textAlign: 'center',
        fontFamily: 'SF Pro Text',
        fontWeight: '500'
    },
    skipDisabled: {
        fontSize: 15,
        color: '#A2A6B5',
        textAlign: 'center',
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    back: {
        width: 24, 
        marginLeft: 24, 
        marginTop: -20
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
