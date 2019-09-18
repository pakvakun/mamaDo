import React, {Component} from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, WebView, AsyncStorage} from 'react-native';
// import VKLogin from 'react-native-vkontakte-login';
import axios from 'axios';


export default class Vk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vk: false
        }
    }
    
    componentDidMount() {
        
        // VKLogin.initialize(5514471)
      }
      
    render(){
        return(
            <View style={{position: 'absolute', flex: 1, width: '100%', height: '100%', bottom: this.props.Vk ? '0%' : '-100%', paddingTop: 50, paddingBottom: 50, backgroundColor: 'rgba(0,0,0, .5)'}}>
                {/* <WebView source={{html: this.props.Vk}} /> */}
                {/* <WebView source={{uri: `https://oauth.vk.com/authorize?client_id=7108667&display=mobile&redirect_uri=https://api.vk.com/method/users.getFollowers&response_type=token&v=5.101&state=123456`}} /> */}
                {/* <View style={[styles.buttonsBlock, { justifyContent: 'center', alignItems: 'center' ,  width: '100%'}]}>
                    <TouchableOpacity onPress={()=>this.props.toggleVk()} style={[styles.buttonLogin, {position: 'absolute', bottom: 50,  width: '80%'}]}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    buttonsBlock: {
        marginTop: 50,
    },
    buttonLogin: {
        backgroundColor: '#E94C89',
        padding: 20,
        borderRadius: 10,
        marginBottom: 15
    },
    buttonText: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'SF Pro Text',
        fontSize: 14,
        fontWeight: '600',
    },
})