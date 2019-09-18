import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Input } from 'react-native-elements';
import {replacerSpecialCharacters, Loading} from '../../helpers/helpers';

import IconsBack from '../../assets/images/icons/icons-back';

class EnterPhone extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            pass: '',
            loading: false,
            errEmail: '',
            errPass: '',
        }
    }
    handleInput = (value, name) =>{
        let pureValue = replacerSpecialCharacters(value);
        let oneDog = pureValue.match(/[@]/gi)||'';
        if(oneDog.length <= 1){
            this.setState({[name]: pureValue})
        }
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
            url: '/api/auth/signup',
            data: {
                email: this.state.email,
                password: this.state.pass,
            }
        }).then(response=>{
                this.props.navigation.navigate('RegisterEmailSend');
                this.setState({loading: false});
        }).catch(err => {
            this.setState({loading: false});
            this.setState({errEmail: err.response.data.error.errors.email[0]})
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
                    <Input  placeholderTextColor="#444B69" 
                            containerStyle={{paddingLeft: 0, paddingRight: 0}} 
                            inputContainerStyle={styles.inputContainer} 
                            inputStyle={styles.inputStyle}
                            placeholder="E-mail*"
                            onChangeText={ (value) => this.handleInput(value, 'email')}
                            value={this.state.email}
                            errorMessage={this.state.errEmail}
                    />
                    <Input  placeholderTextColor="#444B69" 
                            containerStyle={{paddingLeft: 0, paddingRight: 0}} 
                            inputContainerStyle={styles.inputContainer} 
                            inputStyle={styles.inputStyle} 
                            secureTextEntry = {true}
                            placeholder="Пароль*"
                            onChangeText={ value => this.handleInput(value, 'pass')}
                            value={this.state.pass}
                            errorMessage={this.state.errPass}
                    />
                    <TouchableOpacity onPress={() => this.handleClickSubmitt()} style={styles.buttonRegister}>
                        <Text style={styles.buttonText}>ЗАРЕГИСТРИРОВАТЬСЯ</Text>
                    </TouchableOpacity>
                </View>
                <Loading isLoading={this.state.loading}/>
                <TouchableOpacity style={styles.skip}>
                    <Text>
                        <Text style={styles.skipDisabled}>Регистрируясь, вы соглашаетесь{"\n"}с условиями </Text>
                        <Text style={styles.skipText}>публичной оферты</Text>
                    </Text>
                </TouchableOpacity>
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
    inputContainer: { 
        borderBottomWidth: 0, 
        width: '100%', 
        borderRadius:10 
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
    }
});
