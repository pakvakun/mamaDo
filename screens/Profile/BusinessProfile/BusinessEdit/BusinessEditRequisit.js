import React, {Component} from 'react';
import {StyleSheet, View, Image, ScrollView, Text, TouchableOpacity, StatusBar} from 'react-native';
import {Header, Input} from "react-native-elements";
import Modal from "react-native-modal";

//Icons
import IconBackWhite from "../../../../assets/images/icons/icons-back-white";
import InputCheck from "../../../../assets/images/business/input-check";
import IconOpenMore from '../../../../assets/images/icons/icon-open-more';
import InputPlus from "../../../../assets/images/business/input-plus";
import IconCompanyCreated from "../../../../assets/images/icons/icon-company-created";
import IconTrashCompany from "../../../../assets/images/icons/icon-trash-companyPage";
import IconModalTrash from "../../../../assets/images/icons/icon-modal-trash";

class BusinessRequisitEdit extends Component {
    constructor(props){
        super(props);

        this.state = {
            modalAdded: false,
            modalRemove: false,
            inputForm: '',
            inputName: '',
            inputFullName: '',
            inputOgrn: '',
            inputInn: '',
            inputUrAdress: '',
            inputNumLic: '',
            inputCityBank: '',
            inputKpp: '',
            inputRs: '',
            inputNameBank: '',
            inputBik: '',
            inputEmail: ''
        }
    }

    toggleAdded = () => {
        this.setState({ modalAdded: !this.state.modalAdded });
    };

    toggleRemove = () => {
        this.setState({ modalRemove: !this.state.modalRemove });
    };

    render(){
        return(
            <View style={{flex: 1, backgroundColor: '#556086'}}>
                <StatusBar barStyle="light-content" />
                <Header
                    centerComponent={{ text: 'Реквизиты', style: { color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 17, fontWeight: '500' } }}
                    containerStyle={{
                        backgroundColor: '#556086',
                        borderBottomWidth: 0
                    }}
                    leftComponent={<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{left: 25}}><IconBackWhite/></TouchableOpacity>}
                    rightComponent={<TouchableOpacity onPress={this.toggleRemove} style={{right: 25}}><IconTrashCompany/></TouchableOpacity>}
                />
                <View style={styles.textContainer}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>Форма собственности</Text>
                            <View>
                                <Input placeholderTextColor="#99A2B4" onChangeText={ (text) => this.setState({ inputForm: text }) }  placeholder="Не выбрано" inputContainerStyle={styles.inputContainer} inputStyle={styles.inputStyle} containerStyle={styles.inputContainerStyle}/>
                                {this.state.inputForm.length > 5 ? <InputCheck style={styles.inputCheck}/> : <TouchableOpacity style={{position: 'absolute', right: 20, top: 32}}><IconOpenMore/></TouchableOpacity>}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>Краткое название организации</Text>
                            <View>
                                <Input placeholderTextColor="#99A2B4" onChangeText={ (text) => this.setState({ inputName: text }) }  placeholder="Не указано" inputContainerStyle={styles.inputContainer} inputStyle={styles.inputStyle} containerStyle={styles.inputContainerStyle}/>
                                {this.state.inputName.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>Полное название организации</Text>
                            <View>
                                <Input placeholderTextColor="#99A2B4" onChangeText={ (text) => this.setState({ inputFullName: text }) }  placeholder="Не указано" inputContainerStyle={styles.inputContainer} inputStyle={styles.inputStyle} containerStyle={styles.inputContainerStyle}/>
                                {this.state.inputFullName.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>ОГРН</Text>
                            <View>
                                <Input placeholderTextColor="#99A2B4" onChangeText={ (text) => this.setState({ inputOgrn: text }) }  placeholder="Не указано" inputContainerStyle={styles.inputContainer} inputStyle={styles.inputStyle} containerStyle={styles.inputContainerStyle}/>
                                {this.state.inputOgrn.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>ИНН</Text>
                            <View>
                                <Input placeholderTextColor="#99A2B4" onChangeText={ (text) => this.setState({ inputInn: text }) }  placeholder="Не указано" inputContainerStyle={styles.inputContainer} inputStyle={styles.inputStyle} containerStyle={styles.inputContainerStyle}/>
                                {this.state.inputInn.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>Юридический адрес</Text>
                            <View>
                                <Input placeholderTextColor="#99A2B4" onChangeText={ (text) => this.setState({ inputUrAdress: text }) }  placeholder="Не указано" inputContainerStyle={styles.inputContainer} inputStyle={styles.inputStyle} containerStyle={styles.inputContainerStyle}/>
                                {this.state.inputUrAdress.length > 5 ? <InputCheck style={styles.inputCheck}/> : <TouchableOpacity onPress={() => this.props.navigation.navigate('BusinessCreateCompanyMap')} style={{position: 'absolute', right: 20, top: 27}}><InputPlus/></TouchableOpacity>}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>Номер лицевого счета</Text>
                            <View>
                                <Input placeholderTextColor="#99A2B4" onChangeText={ (text) => this.setState({ inputNumLic: text }) }  placeholder="Не указано" inputContainerStyle={styles.inputContainer} inputStyle={styles.inputStyle} containerStyle={styles.inputContainerStyle}/>
                                {this.state.inputNumLic.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>Город банка</Text>
                            <View>
                                <Input placeholderTextColor="#99A2B4" onChangeText={ (text) => this.setState({ inputCityBank: text }) }  placeholder="Не указано" inputContainerStyle={styles.inputContainer} inputStyle={styles.inputStyle} containerStyle={styles.inputContainerStyle}/>
                                {this.state.inputCityBank.length > 5 ? <InputCheck style={styles.inputCheck}/> : <TouchableOpacity onPress={() => this.props.navigation.navigate('BusinessCreateCompanyMap')} style={{position: 'absolute', right: 20, top: 27}}><InputPlus/></TouchableOpacity>}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>КПП</Text>
                            <View>
                                <Input placeholderTextColor="#99A2B4" onChangeText={ (text) => this.setState({ inputKpp: text }) }  placeholder="Не указано" inputContainerStyle={styles.inputContainer} inputStyle={styles.inputStyle} containerStyle={styles.inputContainerStyle}/>
                                {this.state.inputKpp.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>Р/С</Text>
                            <View>
                                <Input placeholderTextColor="#99A2B4" onChangeText={ (text) => this.setState({ inputRs: text }) }  placeholder="Не указано" inputContainerStyle={styles.inputContainer} inputStyle={styles.inputStyle} containerStyle={styles.inputContainerStyle}/>
                                {this.state.inputRs.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>Наименование банка</Text>
                            <View>
                                <Input placeholderTextColor="#99A2B4" onChangeText={ (text) => this.setState({ inputNameBank: text }) }  placeholder="Не указано" inputContainerStyle={styles.inputContainer} inputStyle={styles.inputStyle} containerStyle={styles.inputContainerStyle}/>
                                {this.state.inputNameBank.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>БИК</Text>
                            <View>
                                <Input placeholderTextColor="#99A2B4" onChangeText={ (text) => this.setState({ inputBik: text }) }  placeholder="Не указано" inputContainerStyle={styles.inputContainer} inputStyle={styles.inputStyle} containerStyle={styles.inputContainerStyle}/>
                                {this.state.inputBik.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>E-mail</Text>
                            <View>
                                <Input placeholderTextColor="#99A2B4" onChangeText={ (text) => this.setState({ inputEmail: text }) }  placeholder="Не указано" inputContainerStyle={styles.inputContainer} inputStyle={styles.inputStyle} containerStyle={styles.inputContainerStyle}/>
                                {this.state.inputEmail.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <TouchableOpacity onPress={this.toggleAdded} style={styles.buttonBlockRefresh}>
                                <Text style={styles.buttonBlockRefreshText}>Обновить</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop: 10}}>
                            <TouchableOpacity onPress={this.toggleRemove} style={styles.buttonBlockDelete}>
                                <Text style={styles.buttonBlockDeleteText}>Удалить организацию</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                <Modal isVisible={this.state.modalAdded} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={styles.modalMinTitleBlock}>
                            <IconCompanyCreated style={{marginRight: 10, marginTop: -15}}/>
                            <Text style={styles.modalMinTitle}>Готово</Text>
                        </View>
                        <View style={styles.modalMinDescBlock}>
                            <Text style={styles.modalMinDesc}>
                                Вы обновили реквизиты
                            </Text>
                        </View>
                        <View style={styles.modalMinButtonsBlock}>
                            <TouchableOpacity onPress={this.toggleAdded} style={styles.modalMinConfirmUpdate}>
                                <Text style={styles.modalMinConfirmText}>ОК</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.modalRemove} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={styles.modalMinTitleBlock}>
                            <IconModalTrash style={{marginRight: 10}}/>
                            <Text style={styles.modalMinTitle}>Удалить</Text>
                        </View>
                        <View style={styles.modalMinDescBlock}>
                            <Text style={styles.modalMinDesc}>
                                Хотите удалить организацию{'\n'}и ее реквизиты?
                            </Text>
                        </View>
                        <View style={styles.modalMinButtonsBlock}>
                            <TouchableOpacity onPress={this.toggleRemove} style={styles.modalMinCancel}>
                                <Text style={styles.modalMinCancelText}>ОТМЕНА</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.toggleRemove} style={styles.modalMinConfirmUpdate}>
                                <Text style={styles.modalMinConfirmText}>УДАЛИТЬ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

export default BusinessRequisitEdit;

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        marginTop: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
    },
    modal: {
        margin: 0,
        backgroundColor: 'rgba(31, 35, 52, 0.6)'
    },
    modalContent:{
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 44,
        paddingBottom: 40,
        paddingLeft: 24,
        paddingRight: 24
    },
    modalTitle: {
        color: '#444B69',
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        textAlign: 'center'
    },
    modalClose: {
        backgroundColor: '#F0F1F3',
        borderRadius: 10,
        paddingTop: 19,
        paddingBottom: 19,
        marginTop: 40
    },
    modalButtonText: {
        color: '#444B69',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '500',
        textAlign: 'center'
    },
    modalMinContent: {
        marginLeft: 24,
        marginRight: 24,
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 24,
    },
    modalMinTitleBlock: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    modalMinDescBlock: {
        marginTop: 20,
        marginLeft: 30,
    },
    modalMinButtonsBlock: {
        marginTop: 35,
        marginLeft: 30,
        flexDirection: 'row'
    },
    modalMinCancel: {
        backgroundColor: '#F0F1F3',
        paddingLeft: 28,
        paddingRight: 28,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 10,
        marginRight: 12,
        width: 118
    },
    modalMinConfirm: {
        backgroundColor: '#42BCBC',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 10,
        width: 118
    },
    modalMinConfirmUpdate: {
        backgroundColor: '#42BCBC',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 10,
        width: 118,
        marginLeft: 'auto'
    },
    modalMinTitle: {
        color: '#444B69',
        fontSize: 19,
        fontFamily: 'SF Pro Text',
        fontWeight: '500'
    },
    modalMinDesc: {
        fontSize: 16,
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        lineHeight: 24
    },
    modalMinCancelText: {
        color: '#444B69',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '500',
        textAlign: 'center'
    },
    modalMinConfirmText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '500',
        textAlign: 'center'
    },
    inputCheck: {
        position: 'absolute',
        right: 20,
        top: 30
    },
    buttonBlockRefresh: {
        backgroundColor: '#E94C89',
        borderRadius: 10,
        paddingTop: 17,
        paddingBottom: 17
    },
    buttonBlockRefreshText: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    buttonBlockDelete: {
        backgroundColor: '#F0F1F3',
        borderRadius: 10,
        paddingTop: 17,
        paddingBottom: 17
    },
    buttonBlockDeleteText: {
        textAlign: 'center',
        color: '#444B69',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '600',
        textTransform: 'uppercase'
    }
});