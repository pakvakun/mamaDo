import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image} from 'react-native';
import { Input } from 'react-native-elements';
import axios from 'axios';
import {replacerSpecialCharacters, Loading} from '../../helpers/helpers';

import IconsBack from '../../assets/images/icons/icons-back';

class ForgotEmail extends Component {
    state= {
        email: '',
        errEmail: '',
        loading: false,
    }
    handleInput = (value, name) =>{
        let pureValue = replacerSpecialCharacters(value);
        let oneDog = pureValue.match(/[@]/gi)||'';
        this.setState({errEmail: ''})
        if(oneDog.length <= 1){
            this.setState({[name]: pureValue})
        }
    }
    handleClickSubmitt = ({email} = this.state) =>{
        if(email !== ''){
            if(email.match(/.+@.+\..+/)){
                this.setState({errEmail: ''});
                this.requestRegister();
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
            url: '/api/auth/recovery',
            data: {
                email: this.state.email,
            }
        }).then(response=>{
            response.data.err?
                this.setState({loading: false, errEmail: response.dara.err}):
                (this.props.navigation.navigate('ForgotEmailSend', {email: this.state.email}), this.setState({loading: false}))

        })
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
                    <Text style={styles.welcome}>Восстановить пароль</Text>
                </View>
                <View style={styles.buttonsBlock}>
                <Input  placeholderTextColor="#444B69" 
                            containerStyle={styles.containerStyle} 
                            inputContainerStyle={styles.inputContainerStyle} 
                            inputStyle={styles.inputStyle}
                            placeholder="E-mail*"
                            onChangeText={ (value) => this.handleInput(value, 'email')}
                            value={this.state.email}
                            errorMessage={this.state.errEmail}
                    />
                    <TouchableOpacity onPress={() => this.handleClickSubmitt()} style={styles.buttonRegister}>
                        <Text style={styles.buttonText}>ОТПРАВИТЬ НОВЫЙ ПАРОЛЬ</Text>
                    </TouchableOpacity>
                </View>
                <ImageBackground source={require('../../assets/images/background-login-bottom.png')} style={styles.backgroundBottom} />
                <Loading isLoading={this.state.loading}/>
            </View>
        );
    }
}

export default ForgotEmail;

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
    backgroundBottom: {
        width: '100%',
        height: 270,
        position: 'absolute',
        bottom: -10
    },
    welcome: {
        fontSize: 36,
        fontWeight: 'bold',
        fontFamily: 'SF Compact Rounded',
        color: '#444B69',
        textAlign: 'left'
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
