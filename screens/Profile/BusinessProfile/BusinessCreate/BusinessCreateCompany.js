import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, Image, CameraRoll} from 'react-native';
import {CheckBox, Header, Input, SearchBar} from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import ImagePicker from 'react-native-image-picker'
import Modal from "react-native-modal";
import axios from 'axios';

//Menu Icon
import IconBackWhite from '../../../../assets/images/icons/icons-back-white';
import InputCheck from '../../../../assets/images/business/input-check';
import InputPlus from '../../../../assets/images/business/input-plus';

//Social Icons
import IconVk from '../../../../assets/images/social/vk';
import IconFb from '../../../../assets/images/social/fb';
import IconOk from '../../../../assets/images/social/ok';
import Search from "../../../../assets/images/icons/search";
import IconInst from '../../../../assets/images/social/inst';
import IconClose from "../../../../assets/images/icons/icon-close";
import IconChecked from "../../../../assets/images/icons/icon-checked";
import IconUnchecked from "../../../../assets/images/icons/icon-unchecked";
import IconPhotoRemove from '../../../../assets/images/icons/icon-photo-remove';

//helpers
import {replacerSpecialCharacters, onlyNumbers} from '../../../../helpers/helpers';
import NothingForPrev from '../../../Components/nothingForPreview';
import CreateCompanyForm from '../Elements/CreateCompanyForm'



class CreateCompany extends Component {
    
    render() {        
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Header
                    centerComponent={{ text: 'Создать компанию', style: { color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 17, fontWeight: '500' } }}
                    containerStyle={{
                        backgroundColor: '#556086',
                        borderBottomWidth: 0
                    }}
                    leftComponent={<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{left: 25}}><IconBackWhite/></TouchableOpacity>}
                />
                <CreateCompanyForm {...this.props} />
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
        paddingLeft: 24,
        paddingRight: 24,
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
        marginBottom: 5,
        paddingRight: 10
    },
    inputStyle: {
        color: '#444B69',
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
    },
    inputContainerStyle: {
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: 9,
        borderWidth: 1,
        borderColor: '#DEE2EB',
        borderRadius: 10,
        alignItems: 'center',
        
    },
    inputStyleText: {
        fontFamily: 'SF Pro Text', 
        fontWeight: '400', 
        fontSize: 16, 
        width: '100%', 
        height: 55, 
        color: '#444B69', 
        paddingLeft: 23, 
        paddingRight: 23,
    },
    inputStyleTextText: {
        fontFamily: 'SF Pro Text', 
        fontWeight: '400', 
        fontSize: 16, 
        width: '100%', 
        height: 55, 
        color: '#444B69', 
        paddingLeft: 23, 
        paddingRight: 23,
        lineHeight: 55
    },
    filter: {
        margin: 0,
        backgroundColor: 'rgba(31, 35, 52, 0.6)'
    },
    filterContent: {
        flex: 1,
        marginTop: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#FFF'
    },
    filterTop: {
        backgroundColor: '#556086',
        height: 140,
        paddingTop: 30,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 24,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    filterListStation: {
        flex: 1
    },
    textClose: {
        color: '#FFF',
        fontFamily: 'SF Pro Text',
        fontSize: 16,
        fontWeight: '500'
    },
    inputCheck: {
        position: 'absolute',
        right: 20,
        top: 30
    },
    iconOuter: {
        width: 55,
        height: 55,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#E2E4EA',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconOuter_clicked_vk: {
       backgroundColor: '#5186BC',
       borderColor: '#5186BC'
    },
    iconOuter_clicked_fb: {
        backgroundColor: '#4167BC',
        borderColor: '#4167BC',
    },
    iconOuter_clicked_inst: {
        backgroundColor: '#E1306C',
        borderColor: '#E1306C',
    },
    iconOuter_clicked_ok: {
        backgroundColor: '#ed812b',
        borderColor: '#ed812b',
    },
    iconOuterLast: {
        width: 55,
        height: 55,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#E2E4EA',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomNext: {
        backgroundColor: '#E94C89',
        borderRadius: 10,
        paddingTop: 18,
        paddingBottom: 18
    },
    bottomNextText: {
        color: '#FFF',
        textTransform: 'uppercase',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center'
    },
    searchBarContainer: {
        height: 45,
        marginTop: 20,
        backgroundColor: '#606C93',
        borderRadius: 10,
        borderTopWidth: 0,
        borderBottomWidth: 0
    },
    SearchBarInputStyle: {
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        color: '#FFF',
        marginLeft: 10
    },
    checkBoxFirst: {
        padding: 0,
        margin: 0,
        backgroundColor:'transparent',
        marginLeft: 0,
        marginRight: 0,
        borderWidth: 0
    },
    checkBoxContainer: {
        marginTop: 24,
        padding: 0,
        margin: 0,
        backgroundColor:'transparent',
        marginLeft: 0,
        marginRight: 0,
        borderWidth: 0
    },
    buttonsBlock: {
        flexDirection: 'row',
        height: 100,
        backgroundColor: '#FFF',
        shadowColor: '#455B63',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 12
    },
    buttonCancel: {
        height: 55,
        width: 155,
        backgroundColor: '#F0F1F3',
        borderRadius: 10,
        paddingTop: 19,
        paddingBottom: 12,
        marginLeft: 24,
        marginTop: 15
    },
    buttonCancelText: {
        color: '#444B69',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '600',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    buttonChoice: {
        height: 55,
        width: 155,
        marginLeft: 'auto',
        backgroundColor: '#E94C89',
        borderRadius: 10,
        paddingTop: 19,
        paddingBottom: 12,
        marginRight: 24,
        marginTop: 15
    },
    buttonChoiceText: {
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '600',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    photoItem: {
        marginTop: 9,
        marginRight: 15
    },
    photoElem: {
        width: 83,
        height: 83,
        borderRadius: 12
    },
    photoRemove: {
        width: 28,
        height: 28,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#FFF',
        backgroundColor: '#606A8B',
        position: 'absolute',
        top: -10,
        right: -10
    },
});
