import React, {Component} from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, WebView } from 'react-native';
import axios from 'axios';

export default class Ok extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <View style={{position: 'absolute', flex: 1, width: '100%', height: '100%', bottom: this.props.Ok ? '0%' : '-100%', paddingTop: 50, paddingBottom: 50, backgroundColor: 'rgba(0,0,0, .5)'}}>
                {/* <WebView source={{uri: 'https://connect.ok.ru/oauth/authorize?client_id=1281244416&scope=VALUABLE_ACCESS;GET_EMAIL&response_type=token&redirect_uri=https://mamado.elgrow.ru/auth&layout=m'}} />
                <View style={[styles.buttonsBlock, { justifyContent: 'center', alignItems: 'center' ,  width: '100%'}]}>
                    <TouchableOpacity onPress={()=>this.props.toggleOk()} style={[styles.buttonLogin, {position: 'absolute', bottom: 50,  width: '80%'}]}>
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