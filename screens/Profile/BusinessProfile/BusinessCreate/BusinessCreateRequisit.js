import React, {Component} from 'react';
import {StyleSheet, View, Image, ScrollView, Text, TouchableOpacity, StatusBar, Picker} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Header, Input} from "react-native-elements";
import Modal from "react-native-modal";
import axios from 'axios';

//Icons
import IconBackWhite from "../../../../assets/images/icons/icons-back-white";
import InputCheck from "../../../../assets/images/business/input-check";
import IconOpenMore from '../../../../assets/images/icons/icon-open-more';
import InputPlus from "../../../../assets/images/business/input-plus";
import IconCompanyCreated from "../../../../assets/images/icons/icon-company-created";
import IconTrash from "../../../../assets/images/icons/icon-trash";
import IconModalTrash from "../../../../assets/images/icons/icon-modal-trash";


//helpers

import {replacerSpecialCharacters, onlyNumbers} from '../../../../helpers/helpers';

export class Requisites extends Component{
    constructor(props){
        super(props);

        this.state = {
            modalAdded: false,
            toggleFormsProp: false,
            submitBtnIsClicked: false,
            isModalDeleteSuccess: false,
            inputForm: '',
            inputName: '',
            inputFullName: '',
            inputOgrn: '',
            inputInn: '',
            inputUrAdress: '',
            inputCityBank: '',
            inputKpp: '',
            inputRs: '',
            inputNameBank: '',
            inputBik: '',
            inputEmail: '',
        }
        this.loadFormProp();
        this.getT();
    }
    updateForm = (item) => {
        // //Костыль - разобраться как работает Picker///////////////////////////
        let formItem = this.state.formsProp.filter(element => {
            return element.name === item
        })        
        this.setState({
            inputForm: item,
            inputFormId: formItem[0].id
        })
    }
    toggleAdded = () => {
        this.setState({ modalAdded: !this.state.modalAdded });
    };
    toggleModalDelete = () => {
        this.setState({modalDelete: !this.state.modalDelete})
    }
    toggleModalDeleteSuccess = () =>{
        this.setState({ isModalDeleteSuccess: !this.state.isModalDeleteSuccess });
    }
    inputValidationText = (text, item) => {
        let pureVal = replacerSpecialCharacters(text);
        this.setState({[item]: pureVal})
    }
    inputValidationNumber = (text, item) => {
        let pureVal = onlyNumbers(text);
        this.setState({[item]: pureVal})
    }
    getT = async () => {
        try {
            let token = await AsyncStorage.getItem('token')
            if (token !== null) {
                let AuthStr = 'Bearer'.concat(JSON.parse(token))
                this.setState({token: AuthStr})
            }
        } catch (error) {
            
        }
    }
    loadFormProp = () => {
        axios({
            method: 'GET',
            baseURL: `http://mamado.elgrow.ru`,
            url: '/api/ownership',
        }).then( (res) => {
            let formsProp = res.data
            this.setState({formsProp: formsProp})
            if(this.props.navigation.state.params && this.props.navigation.state.params.requisitItem){
                this.updateForm(this.props.navigation.state.params.requisitItem.ownership.name)
            }
        }).catch(err => {console.log(err)})
    }
    addRequisites = () => {
        let {inputForm, inputFormId, inputName, inputFullName, inputOgrn, inputInn, inputUrAdress, inputCityBank, inputKpp, inputRs, inputNameBank, inputBik, inputEmail} = this.state;
        if (inputForm && inputName && inputOgrn && inputOgrn.length >= 13 && inputInn && inputInn.length >= 10 && inputUrAdress  && inputCityBank && inputKpp && inputKpp.length >= 9 && inputRs && inputRs.length >=20 && inputNameBank && inputBik && inputBik.length >=9 && inputEmail) {
            let companyId = this.props.navigation.state.params && this.props.navigation.state.params.companyId ? this.props.navigation.state.params.companyId : null;
            axios({
                method: 'POST',
                baseURL: `http://mamado.elgrow.ru`,
                url: '/api/business',
                data: {
                    company_id: companyId,
                    ownership_id: inputFormId,
                    short_name: inputName,
                    name: `${inputForm}, ${inputName}`,
                    ogrn: inputOgrn,
                    inn: inputInn,
                    uraddress: inputUrAdress.text,
                    kpp: inputKpp,
                    rs: inputRs,
                    bank_name: inputNameBank,
                    bik: inputBik,
                    email: inputEmail,
                    bank_city: inputCityBank,
                },
                headers: {
                    Authorization: this.state.token,
                }
            }).then( res => {
                this.setState({modalAdded: !this.state.modalAdded})
            })
        }else{                      
            this.setState({modalAlert: !this.state.modalAlert, submitBtnIsClicked: true})
        }
    }
    updateRequisites =() => {
        let {inputForm, inputFormId, inputName, inputFullName, inputOgrn, inputInn, inputUrAdress, inputCityBank, inputKpp, inputRs, inputNameBank, inputBik, inputEmail} = this.state;
        if (inputForm && inputName && inputOgrn && inputOgrn.length >= 13 && inputInn && inputInn.length >= 10 && inputUrAdress && inputCityBank && inputKpp && inputKpp.length >= 9 && inputRs && inputRs.length >=20 && inputNameBank && inputBik && inputBik.length >=9 && inputEmail) {
            let companyId = this.props.navigation.state.params && this.props.navigation.state.params.requisitItem ? this.props.navigation.state.params.requisitItem.id : null;
            axios({
                method: 'PUT',
                baseURL: `http://mamado.elgrow.ru`,
                url: `/api/business/${companyId}`,
                data: {
                    ownership_id: inputFormId,
                    short_name: inputName,
                    name: `${inputForm}, ${inputName}`,
                    ogrn: inputOgrn,
                    inn: inputInn,
                    uraddress: inputUrAdress || inputUrAdress.text,
                    kpp: inputKpp,
                    rs: inputRs,
                    bank_name: inputNameBank,
                    bik: inputBik,
                    email: inputEmail,
                    bank_city: inputCityBank,
                },
                headers: {
                    Authorization: this.state.token,
                }
            }).then( res => {
                this.setState({modalAdded: !this.state.modalAdded})
            }).catch(err => console.log(data))
        }else{
            this.setState({modalAlert: !this.state.modalAlert, submitBtnIsClicked: true})
        }
    }
    
    deleteCompany = (id) => {
        axios({
            method: 'DELETE',
            baseURL: 'https://mamado.elgrow.ru/',
            url: `/api/company/${id}`,
            headers: {
                Authorization: this.state.token,
            }
        }).then((res)=>{
            this.toggleModalDelete()
            setTimeout(()=>this.toggleModalDeleteSuccess(), 400)
        }).catch(err=>{console.log('err', err)})
    }
    confirmAddRequisites = () => {
        this.setState({modalAdded: !this.state.modalAdded})
        if(this.props.navigation.state.params && this.props.navigation.state.params.prevRoute){
            this.props.navigation.navigate(this.props.navigation.state.params.prevRoute)
        }else{
            this.props.navigation.navigate('BusinessEditCompany')
        }
    }
    confirmUpdateRequisites = () => {
        this.setState({modalAdded: !this.state.modalAdded})
        this.props.navigation.navigate('BusinessEditCompany')
    }
    confirmDelete = () => {
        this.setState({modalDelete: !this.state.modalDelete})
    }
    componentDidMount(){
        if (this.props.navigation.state.params && this.props.navigation.state.params.requisitItem) {
            var {ownership, short_name, name, ogrn, inn, uraddress, NumLic, bank_city, kpp, rs, bank_name, bik, email} = this.props.navigation.state.params.requisitItem;
            this.setState({
                inputForm: ownership.name,
                inputName: short_name,
                inputFullName: name,
                inputOgrn: `${ogrn}`,
                inputInn: `${inn}`,
                inputUrAdress: uraddress,
                inputCityBank: bank_city,
                inputKpp: `${kpp}`,
                inputRs: `${rs}`,
                inputNameBank: bank_name,
                inputBik: `${bik}`,
                inputEmail: email,
            })
            if(this.props.navigation.state.params.requisitItem.idCompany){
                this.setState({idCompany :this.props.navigation.state.params.requisitItem.idCompany})
            }
            
        }
    }
    componentDidUpdate(prevProps){
        if (this.props.navigation.state.params !== prevProps.navigation.state.params && this.props.navigation.state.params.address) {
            this.setState({inputUrAdress: this.props.navigation.state.params.address})
        }
    }
    render(){    
        console.log(this.state);
        
        return(
            <>
                <View style={styles.textContainer}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>Форма собственности</Text>
                            <View>
                                <View>
                                    <Input  placeholderTextColor="#99A2B4" 
                                            placeholder="Не выбрано" 
                                            inputContainerStyle={styles.inputContainer} 
                                            inputStyle={styles.inputStyle} 
                                            containerStyle={this.state.submitBtnIsClicked && this.state.inputForm.length === 0 ? [styles.inputContainerStyle, styles.inputContainerStyle_err]:styles.inputContainerStyle}
                                            value={this.state.inputForm}/>
                                    <TouchableOpacity style={{position: 'absolute', width: '100%', height: '100%'}}  onPress={()=>this.setState({toggleFormsProp: !this.state.toggleFormsProp})}></TouchableOpacity>
                                    {this.state.inputForm.length > 5 ? <InputCheck style={styles.inputCheck}/> : <IconOpenMore style={{position: 'absolute', right: 20, top: 32}}/>}
                                </View>
                                {
                                    this.state.toggleFormsProp?
                                        <Picker selectedValue={this.state.inputForm}
                                                onValueChange={(itemValue, itemIndex) => this.updateForm(itemValue)} 
                                                onChange={()=>this.setState({toggleFormsProp: !this.state.toggleFormsProp})}>
                                                {this.state.formsProp &&
                                                    this.state.formsProp.map((item, index)=>{
                                                        return <Picker.Item label={item.name || ''} value={item.name} key={index} />
                                                    })
                                                }
                                        </Picker>:
                                        null
                                }
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>Краткое название организации</Text>
                            <View>
                                <Input  placeholderTextColor="#99A2B4" 
                                        onChangeText={ (text) => this.inputValidationText(text, 'inputName') }  
                                        placeholder="Не указано" 
                                        inputContainerStyle={styles.inputContainer} 
                                        inputStyle={styles.inputStyle} 
                                        containerStyle={this.state.submitBtnIsClicked && this.state.inputName.length === 0 ? [styles.inputContainerStyle, styles.inputContainerStyle_err]:styles.inputContainerStyle}
                                        value={this.state.inputName}/>
                                {this.state.inputName.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>Полное название организации</Text>
                            <View>
                                <Input  placeholderTextColor="#99A2B4" 
                                        onChangeText={ (text) => this.inputValidationText(text, 'inputFullName') }  
                                        placeholder="Не указано" 
                                        inputContainerStyle={styles.inputContainer} 
                                        inputStyle={styles.inputStyle} 
                                        containerStyle={this.state.submitBtnIsClicked && this.state.inputForm.length === 0 ? [styles.inputContainerStyle, styles.inputContainerStyle_err]:styles.inputContainerStyle}
                                        value={this.state.inputForm ? `${this.state.inputForm}, ${this.state.inputName}`:''}/>
                                {this.state.inputFullName.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>ОГРН</Text>
                            <View>
                                <Input  placeholderTextColor="#99A2B4" 
                                        onChangeText={ (text) => this.inputValidationNumber(text, 'inputOgrn') }  
                                        placeholder="Не указано" 
                                        inputContainerStyle={styles.inputContainer} 
                                        inputStyle={styles.inputStyle} 
                                        containerStyle={this.state.submitBtnIsClicked && this.state.inputOgrn.length === 0 ? [styles.inputContainerStyle, styles.inputContainerStyle_err]:styles.inputContainerStyle}
                                        value={this.state.inputOgrn}
                                        maxLength={13}/>
                                {this.state.inputOgrn.length >= 13 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>ИНН</Text>
                            <View>
                                <Input  placeholderTextColor="#99A2B4" 
                                        onChangeText={ (text) => this.inputValidationNumber(text, 'inputInn') }  
                                        placeholder="Не указано" 
                                        inputContainerStyle={styles.inputContainer} 
                                        inputStyle={styles.inputStyle} 
                                        containerStyle={this.state.submitBtnIsClicked && this.state.inputInn.length === 0 ? [styles.inputContainerStyle, styles.inputContainerStyle_err]:styles.inputContainerStyle}
                                        value={this.state.inputInn}
                                        maxLength={10}/>
                                {this.state.inputInn.length >= 10 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        {/* <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>Юридический адрес</Text>
                            <View>
                                <Input  placeholderTextColor="#99A2B4" 
                                        onChangeText={ (text) => this.inputValidationText(text, 'inputUrAdress') }  
                                        placeholder="Не указано" 
                                        inputContainerStyle={styles.inputContainer} 
                                        inputStyle={styles.inputStyle} 
                                        containerStyle={this.state.submitBtnIsClicked && this.state.inputUrAdress.length === 0 ? [styles.inputContainerStyle, styles.inputContainerStyle_err]:styles.inputContainerStyle}
                                        value={this.state.inputUrAdress.text || this.state.inputUrAdress}/>
                                <TouchableOpacity style={{position: 'absolute', height: '100%', width: '20%', right: 0}} onPress={() => this.props.navigation.navigate('BusinessCreateCompanyMap', {prevRoute: this.props.navigation.state.routeName})} ></TouchableOpacity>
                                    {this.state.inputUrAdress.length > 5 ? <InputCheck style={styles.inputCheck}/> : <InputPlus style={{position: 'absolute', right: 20, bottom: 18}}/>}
                                
                            </View>
                        </View> */}
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>Юридический адрес</Text>
                            <TouchableOpacity   style={this.state.submitBtnIsClicked && this.state.inputUrAdress.length === 0 ?[styles.inputStyle, styles.inputContainerStyle, styles.inputContainerStyle_err] : [styles.inputStyle, styles.inputContainerStyle]}
                                                onPress={() => this.state.inputInn.length ? this.props.navigation.navigate('BusinessCreateCompanyMap', {prevRoute: this.props.navigation.state.routeName}) : null } >
                                <Text style={[styles.inputStyleTextText, {color: this.state.inputUrAdress && this.state.inputUrAdress.length ?  '#444B69' : '#99A2B4'}]}>
                                    { this.state.inputUrAdress.text || this.state.inputUrAdress || 'Не указано'}
                                </Text>
                                { this.state.inputUrAdress.length ? 
                                <InputCheck style={{position: 'absolute', top: 23, right: 20}}/> : 
                                <InputPlus style={{position: 'absolute', top: 19, right: 20}}/>
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>Город банка</Text>
                            <View>
                                <Input  placeholderTextColor="#99A2B4" 
                                        onChangeText={ (text) => this.inputValidationText(text, 'inputCityBank') }  
                                        placeholder="Не указано" 
                                        inputContainerStyle={styles.inputContainer} 
                                        inputStyle={styles.inputStyle} 
                                        containerStyle={this.state.submitBtnIsClicked && this.state.inputCityBank.length === 0 ? [styles.inputContainerStyle, styles.inputContainerStyle_err]:styles.inputContainerStyle}
                                        value={this.state.inputCityBank}/>
                                {this.state.inputCityBank.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>КПП</Text>
                            <View>
                                <Input  placeholderTextColor="#99A2B4" 
                                        onChangeText={ (text) => this.inputValidationNumber(text, 'inputKpp') }  
                                        placeholder="Не указано" 
                                        inputContainerStyle={styles.inputContainer} 
                                        inputStyle={styles.inputStyle} 
                                        containerStyle={this.state.submitBtnIsClicked && this.state.inputKpp.length === 0 ? [styles.inputContainerStyle, styles.inputContainerStyle_err]:styles.inputContainerStyle}
                                        value={this.state.inputKpp}
                                        maxLength={9}/>
                                {this.state.inputKpp.length >= 9 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>Р/С</Text>
                            <View>
                                <Input  placeholderTextColor="#99A2B4" 
                                        onChangeText={ (text) => this.inputValidationNumber(text, 'inputRs') }  
                                        placeholder="Не указано" 
                                        inputContainerStyle={styles.inputContainer} 
                                        inputStyle={styles.inputStyle} 
                                        containerStyle={this.state.submitBtnIsClicked && this.state.inputRs.length === 0 ? [styles.inputContainerStyle, styles.inputContainerStyle_err]:styles.inputContainerStyle}
                                        value={this.state.inputRs}
                                        maxLength={20}/>
                                {this.state.inputRs.length >= 20 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>Наименование банка</Text>
                            <View>
                                <Input  placeholderTextColor="#99A2B4" 
                                        onChangeText={ (text) => this.inputValidationText(text, 'inputNameBank') }  
                                        placeholder="Не указано" 
                                        inputContainerStyle={styles.inputContainer} 
                                        inputStyle={styles.inputStyle} 
                                        containerStyle={this.state.submitBtnIsClicked && this.state.inputNameBank.length === 0 ? [styles.inputContainerStyle, styles.inputContainerStyle_err]:styles.inputContainerStyle}
                                        value={this.state.inputNameBank}/>
                                {this.state.inputNameBank.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>БИК</Text>
                            <View>
                                <Input  placeholderTextColor="#99A2B4" 
                                        onChangeText={ (text) => this.inputValidationNumber(text, 'inputBik') }  
                                        placeholder="Не указано" 
                                        inputContainerStyle={styles.inputContainer} 
                                        inputStyle={styles.inputStyle} 
                                        containerStyle={this.state.submitBtnIsClicked && this.state.inputBik.length === 0 ? [styles.inputContainerStyle, styles.inputContainerStyle_err]:styles.inputContainerStyle}
                                        value={this.state.inputBik}
                                        maxLength={9}/>
                                {this.state.inputBik.length >= 9 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>E-mail</Text>
                            <View>
                                <Input  placeholderTextColor="#99A2B4" 
                                        onChangeText={ (text) => this.inputValidationText(text, 'inputEmail') }  
                                        placeholder="Не указано" 
                                        inputContainerStyle={styles.inputContainer} 
                                        inputStyle={styles.inputStyle}
                                        containerStyle={this.state.submitBtnIsClicked && this.state.inputEmail.length === 0 ? [styles.inputContainerStyle, styles.inputContainerStyle_err]:styles.inputContainerStyle}
                                        value={this.state.inputEmail}/>
                                {this.state.inputEmail.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>                        
                        <View style={{marginTop: 30}}>
                            {
                                this.props.navigation.state.params && this.props.navigation.state.params.requisitItem ?
                                <>
                                <View style={{marginTop: 30}}>
                                    <TouchableOpacity onPress={()=> this.updateRequisites()} style={styles.buttonUpdate}>
                                        <Text style={styles.textButtonUpdate}>Обновить</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{marginTop: 10}}>
                                    <TouchableOpacity onPress={()=> this.confirmDelete()} style={styles.buttonDelete}>
                                        <Text style={styles.textButtonDelete}>Удалить компанию</Text>
                                    </TouchableOpacity>
                                </View>
                                </>
                                :
                                <TouchableOpacity onPress={()=> this.addRequisites()} style={styles.addReqButton}>
                                    <Text style={styles.addReqButtonText}>Добавить реквизиты</Text>
                                </TouchableOpacity>
                            }
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
                                Вы добавили реквизиты
                            </Text>
                        </View>
                        <View style={styles.modalMinButtonsBlock}>
                            <TouchableOpacity onPress={()=>this.confirmAddRequisites()} style={styles.modalMinConfirmUpdate}>
                                <Text style={styles.modalMinConfirmText}>ОК</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.modalUpdate} style={styles.modal}>
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
                            <TouchableOpacity onPress={()=>this.confirmUpdateRequisites()} style={styles.modalMinConfirmUpdate}>
                                <Text style={styles.modalMinConfirmText}>ОК</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.modalDelete} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={styles.modalMinTitleBlock}>
                            <IconModalTrash style={{marginRight: 10}}/>
                            <Text style={styles.modalMinTitle}>Удалить?</Text>
                        </View>
                        <View style={styles.modalMinDescBlock}>
                            <Text style={styles.modalMinDesc}>
                                Удалить компанию <Text style={{fontWeight: '500'}}>{this.state.inputName}</Text>
                            </Text>
                        </View>
                        <View style={styles.modalMinButtonsBlock}>
                            <TouchableOpacity onPress={()=>this.setState({modalDelete: !this.state.modalDelete})} style={styles.modalMinCancel}>
                                <Text style={styles.modalMinCancelText}>ОТМЕНА</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> this.deleteCompany(this.props.navigation.state.params.companyId)} style={styles.modalMinConfirm}>
                                <Text style={styles.modalMinConfirmText}>УДАЛИТЬ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isModalDeleteSuccess} style={styles.modal} onDismiss={() => this.props.navigation.navigate('BusinessOuter')}>
                    <View style={styles.modalMinContent}>
                        <View style={styles.modalMinTitleBlock}>
                            <Text>
                                <IconModalTrash style={{marginRight: 14}}/>
                                <Text style={styles.modalMinTitle}>Удалено</Text>
                            </Text>
                        </View>
                        <View style={styles.modalMinDescBlock}>
                            <Text style={styles.modalMinDesc}>
                                Ваша компания удалена
                            </Text>
                        </View>
                        <View style={styles.modalMinButtonsBlockRight}>
                            <TouchableOpacity onPress={()=>{this.toggleModalDeleteSuccess(); this.props.navigation.goBack()}} style={styles.modalMinConfirmRight}>
                                <Text style={styles.modalMinConfirmText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.modalAlert} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={styles.modalMinTitleBlock}>
                            <Text style={styles.modalMinTitle}>Внимание!</Text>
                        </View>
                        <View style={styles.modalMinDescBlock}>
                            <Text style={styles.modalMinDesc}>
                                Нужно заполнить все поля!
                            </Text>
                        </View>
                        <View style={styles.modalMinButtonsBlock}>
                            <TouchableOpacity onPress={()=>this.setState({modalAlert: !this.state.modalAlert})} style={styles.modalMinConfirmUpdate}>
                                <Text style={styles.modalMinConfirmText}>ОК</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </>
        )
    }
}
class BusinessCreateRequisit extends Component {
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
                />
                <Requisites {...this.props}/>
            </View>
        )
    }
}

export default BusinessCreateRequisit;

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
    inputContainerStyle_err: {
        borderColor: 'red'
    },
    textButtonUpdate: {
        color: '#FFF',
        textTransform: 'uppercase',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center'
    },
    textButtonDelete: {
        color: '#444B69',
        textTransform: 'uppercase',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center'
    },
    buttonUpdate: {
        backgroundColor: '#E94C89',
        borderRadius: 10,
        paddingTop: 18,
        paddingBottom: 18
    },
    buttonDelete: {
        backgroundColor: '#F0F1F3',
        borderRadius: 10,
        paddingTop: 18,
        paddingBottom: 18
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
        bottom: 18,
    },
    addReqButton: {
        backgroundColor: '#E94C89',
        borderRadius: 10,
        paddingTop: 17,
        paddingBottom: 17
    },
    addReqButtonText: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    modalMinButtonsBlockRight: {
        marginTop: 35,
        marginLeft: 30,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    modalMinConfirmRight: {
            backgroundColor: '#42BCBC',
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 14,
            paddingBottom: 14,
            borderRadius: 10,
            width: 118,
            alignSelf: 'flex-end'
        },
    modalMinConfirmText: {
            color: '#FFFFFF',
            fontSize: 14,
            fontFamily: 'SF Pro Text',
            fontWeight: '500',
            textAlign: 'center'
        },
});