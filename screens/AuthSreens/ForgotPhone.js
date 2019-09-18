import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image} from 'react-native';
import { Input } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import axios from 'axios';
import { Loading, replacerSpecialCharacters } from '../../helpers/helpers';

import IconsBack from '../../assets/images/icons/icons-back';

class EnterPhone extends Component {
    state = {
        phone: '',
        errPhone: '',
        loading: false,
    }

    handleChange = (value, name) =>{
        let pureValue = replacerSpecialCharacters(value);
        this.setState({[name]: pureValue, errPhone: '', errPass: ''})
    }
    handleClickSubmitt = ({phone} = this.state) =>{
        if(phone.length < 11){
            phone.length === 0 ?
            this.setState({errPhone: 'введите номер телефона'}):
            this.setState({errPhone: 'введите номер телефона полностью'})
        }else{
            this.phoneRequest()
        }
        
    }
    phoneRequest = () => {
        this.setState({loading: true})
        axios({
            method: 'POST',
            baseURL: 'https://mamado.elgrow.ru',
            url: '/api/auth/recovery',
            data: {
                phone: this.state.phone,
            }
        }).then(response=>{
            console.log('res',response)
            this.props.navigation.navigate('ForgotPhoneSend', {phone: this.state.phone}), this.setState({loading: false})
        }).catch(err => {
            console.log(err)
            
                this.setState({loading: false, errPhone: `Пользователь с таким номером телефона не зарегистрирован!`})
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
                <TouchableOpacity onPress={() => this.handleClickSubmitt()} style={styles.buttonLogin}>
                    <Text style={styles.buttonText}>ОТПРАВИТЬ НОВЫЙ ПАРОЛЬ</Text>
                </TouchableOpacity>
                </View>
                <ImageBackground source={require('../../assets/images/background-login-bottom.png')} style={styles.backgroundBottom} />
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
