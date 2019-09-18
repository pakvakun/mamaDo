import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image} from 'react-native';

import IconsBack from '../../assets/images/icons/icons-back';

class EnterPhone extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/background-login.png')} style={styles.background}>
                    <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                        <IconsBack/>
                    </TouchableOpacity>
                </ImageBackground>
                <View style={styles.additionalPad}>
                    <Text style={styles.welcome}>Вы успешно зарегистрированы</Text>
                </View>
                <View style={styles.buttonsBlock}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EnterEmail')} style={styles.buttonRegister}>
                        <Text style={styles.buttonText}>ВОЙТИ В ПРИЛОЖЕНИЕ</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.skip}>
                    <Text>
                        <Text style={styles.skipDisabled}>Нажимая «Войти» вы соглашаетесь{"\n"}с условиями </Text>
                        <Text style={styles.skipText}>публичной оферты</Text>
                    </Text>
                </TouchableOpacity>
                <ImageBackground source={require('../../assets/images/background-login-bottom.png')} style={styles.backgroundBottom} />
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
        paddingRight: 35,
        flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center'
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
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'SF Compact Rounded',
        color: '#444B69',
        textAlign: 'center'
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
