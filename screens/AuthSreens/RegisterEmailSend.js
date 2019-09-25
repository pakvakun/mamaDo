import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image} from 'react-native';

import IconsBack from '../../assets/images/icons/icons-back';
import EmailSend from '../../assets/images/icons/email-send';

class EnterPhone extends Component {
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
                    <EmailSend style={{marginBottom: 35}} />
                    <Text style={styles.welcome}>Проверьте почту, мы отправили вам письмо!</Text>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterEmailSendFinish')} style={{marginTop: 35}}>
                    <Text style={{textAlign: 'center'}}>(Подтверждение по почте)</Text>
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
