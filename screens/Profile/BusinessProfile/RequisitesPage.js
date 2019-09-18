import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, Image} from 'react-native';
import {Header, Input} from 'react-native-elements';

//Menu Icon
import IconBackWhite from '../../../assets/images/icons/icons-back-white';
import InputCheck from '../../../assets/images/business/input-check';
import InputPlus from '../../../assets/images/business/input-plus';

import { Requisites } from './BusinessCreate/BusinessCreateRequisit'
class CreateCompany extends Component {
    constructor(...props){
        super(...props);
        this.state = {
            inputForm: '',
            inputMinName: '',
            inputFullName: '',
            inputOgrn: '',
            inputInn: '',
            inputUrAdres: '',
            inputLicPrice: '',
            inputCityBank: '',
            inputKpp: '',
            inputRs: '',
            inputNameBank: '',
            inputBik: '',
            inputEmail: ''
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Header
                    centerComponent={{ text: 'Реквизиты', style: { color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 17, fontWeight: '500' } }}
                    containerStyle={{
                        backgroundColor: '#556086',
                        borderBottomWidth: 0
                    }}
                    leftComponent={<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{left: 25}}><IconBackWhite/></TouchableOpacity>}
                />
                <View style={styles.textContainer}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={{marginTop: 30, borderBottomWidth: 1, borderBottomColor: '#F0F1F3', paddingLeft: 24, paddingRight: 24, paddingBottom: 25}}>
                            <Text style={{color: '#444B69', fontSize: 18, fontFamily: 'SF Pro Text', fontWeight: '500'}}>Заполните реквизиты для:</Text>
                            <Text style={{marginTop: 20, color: '#444B69', fontSize: 14, fontFamily: 'SF Pro Text', fontWeight: '400', lineHeight: 19}}>
                                Подтверждения владения компанией,{"\n"}{"\n"}
                                Выставления счетов за оплату услуг приложения,{"\n"}{"\n"}
                                Перевод платежей от клиентов.{"\n"}{"\n"}
                                Информация не подлежит разглашению и передаче третьим лицам.»
                            </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('BusinessOuter')} style={{marginTop: 25}}>
                                <Text style={{color: '#E94C89', fontSize: 16, fontFamily: 'SF Pro Text', fontWeight: '500', textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#E94C89", lineHeight: 39}}>Заполнить реквизиты позже</Text>
                            </TouchableOpacity>
                        </View>
                        <Requisites {...this.props}/>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default CreateCompany;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#556086',
        flex: 1
    },
    backContainer: {
        position: 'absolute',
        width: 24,
        marginLeft: 24,
        top: 60,
        zIndex: 1
    },
    textContainer: {
        backgroundColor: '#FFF',
        marginTop: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 50
    },
    labelActive: {
        fontSize: 16,
        color: '#444B69',
        fontWeight: '500',
        fontFamily: 'SF Pro Text'
    },
    labelNotActive: {
        fontSize: 16,
        color: '#CDD4E5',
        fontWeight: '500',
        fontFamily: 'SF Pro Text'
    },
    inputContainer: {
        borderBottomWidth: 0,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
        marginBottom: 5
    },
    inputStyle: {
        color: '#444B69',
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    inputContainerStyle: {
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: 9,
        borderWidth: 1,
        borderColor: '#DEE2EB',
        borderRadius: 10
    }
});
