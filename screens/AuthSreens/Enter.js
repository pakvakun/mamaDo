import React, {Component} from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, WebView } from 'react-native';
import axios from 'axios';
import Vk from '../../helpers/social/vk'
import Ok from '../../helpers/social/ok'
import Insta from '../../helpers/social/instagram'
import FB from '../../helpers/social/facebook'

import IconsBack from '../../assets/images/icons/icons-back';

import Facebook from '../../assets/images/social/fb';
import Instagram from '../../assets/images/social/inst';
import Odnoklassniki from '../../assets/images/social/ok';
import Vkontakte from '../../assets/images/social/vk';

class Enter extends Component {
    constructor(props){
        super(props);
        this.state = {
            vk: false
        }
    }    
    toggleVk = () => {
        this.setState({vk: !this.state.vk})
    }
    toggleOk = () => {
        this.setState({ok: !this.state.ok})
    }
    toggleInstagram = () => {
        this.setState({instagram: !this.state.instagram})
    }
    toggleFacebook = () => {
        this.setState({facebook: !this.state.facebook})
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EnterPhone')} style={styles.buttonLogin}>
                        <Text style={styles.buttonText}>ПО НОМЕРУ ТЕЛЕФОНА</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EnterEmail')} style={styles.buttonRegister}>
                        <Text style={styles.buttonText}>ПО E-MAIL</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.socialLogin}>
                    <Text style={styles.socialTitle}>ИЛИ ВОЙДИТЕ ЧЕРЕЗ СОЦ.СЕТИ</Text>
                    <View style={styles.socialContainer}>
                        <TouchableOpacity style={styles.socialRow} onPress={()=>this.toggleVk()}>
                            <Vkontakte/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialRow} onPress={()=>this.toggleFacebook()}>
                            <Facebook/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialRow} onPress={()=>this.toggleInstagram()}>
                            <Instagram/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialRow} onPress={()=>this.toggleOk()} >
                            <Odnoklassniki/>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={styles.skip}>
                    <Text>
                        <Text style={styles.skipDisabled}>Нет аккаунта?   </Text>
                        <Text style={styles.skipText}>Зарегистрироваться</Text>
                    </Text>
                </TouchableOpacity>
                <Vk Vk={this.state.vk} toggleVk={this.toggleVk}/>
                <Ok Ok={this.state.Ok} toggleOk={this.toggleOk}/>
                <Insta Instagram={this.state.Instagram} toggleInstagram={this.toggleInstagram}/>
                <FB Facebook={this.state.Facebook} toggleFacebook={this.toggleFacebook}/>
            </View>
        );
    }
}

export default Enter;

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
    socialLogin: {
        marginTop: 65
    },
    socialTitle: {
        fontSize: 14,
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontWeight: '500',
        textAlign: 'center'
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 20
    },
    socialRow: {
        width: 55,
        height: 55,
        borderRadius: 100,
        borderColor: '#E2E4EA',
        borderWidth: 1,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center'
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
