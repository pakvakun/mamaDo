import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image} from 'react-native';
import { Input } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import axios from 'axios';
import IconsBack from '../../assets/images/icons/icons-back';
import { Loading } from '../../helpers/helpers';


class EnterPhone extends Component {
    state = {
        phoneNumber: '',
        errPhone: '',
        loading: false,
    }

    handleChange = (value) => {
        this.setState({phoneNumber: value, errPhone: ''})

    }

    handleClick = (phone) => {
                
        if(phone.length < 11){
            phone.length === 0 ?
            this.setState({errPhone: 'введите номер телефона'}):
            this.setState({errPhone: 'введите номер телефона полностью'})
        }else{
            // let number = phone.match(/\d/g).join('');
            // number[0] = '8';
            this.phoneRequest(phone)
        }
    }

    phoneRequest = (phone) => {
        this.setState({loading: true})
        axios({
            method: 'POST',
            baseURL: 'https://mamado.elgrow.ru',
            url: '/api/auth/signup',
            data: {
                phone: phone,
            }
        }).then(response => {
            this.setState({loading: false})                
            this.props.navigation.navigate('ForgotPhoneSend', {phone: this.state.phoneNumber});
        }).catch( err => {
            this.setState({loading: false})
            if (err.response.data.error.status_code == 500) {
                this.setState({errPhone: 'Неверный номер! попробуйте снова'})
            }else{
                this.setState({errPhone: err.response.data.error.errors.phone[0]})
            }
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
                    <Text style={styles.welcome}>Регистрация</Text>
                    <View style={styles.listBlock}>
                        <Text style={styles.listText}>
                            Зарегистрируйтесь, чтобы использовать все возможности Mamado
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonsBlock}>
                    <TextInputMask  placeholderTextColor="#444B69" 
                                    containerStyle={{paddingLeft: 0, paddingRight: 0}} 
                                    inputContainerStyle={styles.inputContainerStyle} 
                                    inputStyle={styles.inputStyle} 
                                    style={styles.inputStyle}
                                    placeholder="Номер телефона*"
                                    type={'cel-phone'}
                                    value={this.state.phoneNumber}
                                    onChangeText={(value)=>this.handleChange(value)}
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
                    <TouchableOpacity onPress={() => this.handleClick(this.state.phoneNumber||'')}  style={styles.buttonLogin}>
                        <Text style={styles.buttonText}>ЗАРЕГИСТРИРОВАТЬСЯ</Text>
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
    inputContainerStyle: { 
        borderBottomWidth: 0, 
        width: '100%', 
        borderRadius:10 
    },
    errMessage: {
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        color: 'red',
        paddingLeft: 20,
        paddingBottom: 20,
        height: 'auto'
    }
});
