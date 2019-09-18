import React, {Component} from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';
import Vk from '../../helpers/social/vk'
import Ok from '../../helpers/social/ok'

import ListMark from '../../assets/images/icons/list-mark';

import Vkontakte from '../../assets/images/social/vk';
import Facebook from '../../assets/images/social/fb';
import Instagram from '../../assets/images/social/inst';
import Odnoklassniki from '../../assets/images/social/ok';


class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            vk: false,
            ok: false,
        }
    }    
    toggleVk = () => {
        this.setState({vk: !this.state.vk})
    }
    toggleOk = () => {
        this.setState({ok: !this.state.ok})
    }
    // handleSocialClick = () => {
    //     axios({
    //         url: 'https://oauth.vk.com/authorize?client_id=7108667&display=mobile&redirect_uri=https://mamado.elgrow.ru/api/auth/login/vkontakte',
    //     }).then(res => 
    //     { 
    //         console.log(res)
    //         if(res.data.status == 'ok'){
    //             // this.props.toggleVk()
    //             this.setStorData(res.data, 1)
    //         }else{
    //             this.toggleVk()
    //         }
    //         this.setState({vk:  res.data, status: res.data.status})  
    //     }
    //     )
    // }
    // setStorData = (data, setVal) => {
    //     // AsyncStorage.setItem('isAuth', setVal, ()=>{
    //     //         AsyncStorage.setItem('token', JSON.stringify(data.token), ()=>{
    //                 this.props.navigation.navigate('ListOuter');
    //                 this.setState({loading: false})
    //     //         })
    //     // })
    // }
    render() {        
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/background-login.png')} style={styles.background}/>
                <View style={styles.additionalPad}>
                    <Text style={styles.welcome}>Будь с MamaDo</Text>
                    <View style={styles.listBlock}>
                        <Text style={styles.listRow}>
                            <ListMark style={{marginTop: 2}}/>
                            <Text style={styles.listText}>  Составляй расписание для детей</Text>
                        </Text>
                        <Text style={styles.listRow}>
                            <ListMark style={{marginTop: 2}}/>
                            <Text style={styles.listText}>  Бронируй и покупай в один клик</Text>
                        </Text>
                        <Text style={styles.listRow}>
                            <ListMark style={{marginTop: 2}}/>
                            <Text style={styles.listText}>  Экономь свое время и деньги</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonsBlock}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Enter')} style={styles.buttonLogin}>
                        <Text style={styles.buttonText}>ВОЙТИ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={styles.buttonRegister}>
                        <Text style={styles.buttonText}>РЕГИСТРАЦИЯ</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.socialLogin}>
                    <Text style={styles.socialTitle}>ИЛИ ВОЙДИТЕ ЧЕРЕЗ СОЦ.СЕТИ</Text>
                    <View style={styles.socialContainer}>
                        <TouchableOpacity style={styles.socialRow}>
                            <Vkontakte/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialRow} >
                            <Facebook/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialRow}>
                            <Instagram/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialRow} onPress={()=>this.toggleOk()}>
                            <Odnoklassniki/>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.skip} onPress={() => {this.props.navigation.navigate('ListOuter')
                                                                        try {
                                                                            AsyncStorage.clear()
                                                                        } catch (error) {}
                                                                        }}>
                                                                    
                    <Text style={styles.skipText}>Пропустить этот шаг</Text>
                </TouchableOpacity>
                <Vk Vk={this.state.vk} toggleVk={this.toggleVk} {...this.props}/>
                <Ok Ok={this.state.ok} toggleOk={this.toggleOk}/>
            </View>
        );
    }
}

export default LoginScreen;

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
        fontWeight: '400'
    }
});
