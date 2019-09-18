import axios from 'axios';
import React, {Component} from 'react';
import Modal from "react-native-modal";
import DatePicker from 'react-native-datepicker';
import { TextInputMask } from 'react-native-masked-text';
import {CheckBox, Header, Input, SearchBar} from "react-native-elements";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, Image, Picker, CameraRoll} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from "react-native-simple-radio-button";
import moment from 'moment';

//Icons
import IconVk from "../../../../assets/images/social/ok";
import IconFb from "../../../../assets/images/social/fb";
import IconOk from "../../../../assets/images/social/ok";
import Search from "../../../../assets/images/icons/search";
import IconInst from "../../../../assets/images/social/inst";
import IconClose from '../../../../assets/images/icons/icon-close';
import InputPlus from "../../../../assets/images/business/input-plus";
import IconChecked from "../../../../assets/images/icons/icon-checked";
import InputCheck from "../../../../assets/images/business/input-check";
import IconFilterClose from "../../../../assets/images/icons/icon-close";
import IconCopyTime from "../../../../assets/images/icons/icon-copy-time";
import IconUnchecked from "../../../../assets/images/icons/icon-unchecked";
import IconHelpInput from "../../../../assets/images/icons/icon-help-input";
import IconTimeEnter from "../../../../assets/images/icons/icon-time-enter";
import IconEventChat from "../../../../assets/images/icons/icon-event-chat";
import IconBackWhite from "../../../../assets/images/icons/icons-back-white";
import IconTimeDelete from "../../../../assets/images/icons/icon-time-delete";
import IconPhotoRemove from "../../../../assets/images/icons/icon-photo-remove";
import IconInputCalendar from "../../../../assets/images/icons/icon-input-calendar";
import IconCalendarTrash from "../../../../assets/images/icons/icon-calendar-trash";
import IconArrowBottom from "../../../../assets/images/icons/icon-input-arrow-bottom";
import IconCalendarActive from "../../../../assets/images/icons/icon-calendar-active";
import IconCompanyCreated from "../../../../assets/images/icons/icon-company-created";
import IconModalTrash from "../../../../assets/images/icons/icon-modal-trash";

//helpers
import NothingForPrev from '../../../Components/nothingForPreview';
import {replacerSpecialCharacters, onlyNumbers} from '../../../../helpers/helpers';

const radio_type_event = [
    {label: 'Разовое', value: 0, send:  'TIME'},
    {label: 'Расписание', value: 1, send:  'SCHEDULE'},
    {label: 'Период времени', value: 2, send:  'PERIOD'}
];
const radio_type = [
    {label: 'Бронирование', value: 0, send: 'BOOKING' },
    {label: 'Оплата', value: 1, send: 'PAYMENT' },
];
const event_type = [
    {label: 'Групповое', value: 0, send: 'GROUP' },
    {label: 'Индивидуальное', value: 1, send: 'INDIVIDUAL' },
];

class CreateEvent extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalType: false,
            isModalTypeEvent: false,
            isModalEventType: false,
            isModalTime: false,
            isModalSheduleTime: false,
            isModalSchedule: false,
            isModalCopyTimeState: false,
            isModalPeriod: false,
            isModalCategory: false,
            isModalCreated: false,
            inputVidArr: [
                {id: 1, name: 'item1'},
                {id: 1, name: 'item2'},
                {id: 1, name: 'item3'},
                {id: 1, name: 'item4'},
                {id: 1, name: 'item5'},
                {id: 1, name: 'item6'},
            ],
            socialArr: [],
            mediaContent: [],
            inputCompanyName: '',
            inputCompanyNameArr: [
                {id: 1, name:'item1'},
                {id: 1, name:'item2'},
                {id: 1, name:'item3'},
                {id: 1, name:'item4'},
                {id: 1, name:'item5'},
                {id: 1, name:'item6'}
            ],
            inputName: '',
            inputVid: '',
            inputType: '',
            inputEventType: '',
            inputShedule: '',
            inputAge: '',
            inputCategory: '',
            addresses: [],
            inputMetro: '',
            inputPrice: '',
            inputLowPrice: '',
            inputPhone: '',
            inputSite: '',
            inputDesc: '',
            inputOrderType: '',
            inputDateStart: '',
            checkTransfer: false,
            checkStart: false,
            valueType: '',
            valueTypeEvent: false,

            time: '',
            timeStart: '',
            timeEnd: '',
            periodStart: '',
            periodEnd: '',
            sheduleArr: [],
            sheduleArrForSend: [],
            addresses: [{}]
        }
        this.getCategory();
        this.getT();
        this.getOfferType();
    }
    getOfferType = () => {
        axios({
            method: 'GET',
            baseURL: 'http://mamado.elgrow.ru',
            url: '/api/offer-type',

        }).then( res => {
            this.setState({inputVidArr: res.data})
        }).catch(err=>console.log(err))
    }
    toggleModalTypeEvent = () => {
        this.setState({ isModalTypeEvent: !this.state.isModalTypeEvent });
    };
    toggleModalType = () => {
        this.setState({ isModalType: !this.state.isModalType });
    };
    toggleModalEventType = () => {
        this.setState({ isModalEventType: !this.state.isModalEventType})
    }
    toggleModalTime = () => {
        this.setState({ isModalTime: !this.state.isModalTime });
    };

    toggleModalSheduleTime = () => {
        this.setState({ isModalSheduleTime: !this.state.isModalSheduleTime  })
    };

    toggleModalSchedule = () => {
        this.setState({ isModalSchedule: !this.state.isModalSchedule });
    };

    toggleModalDeleteTime = () => {
        this.setState({ isModalDeleteTime: !this.state.isModalDeleteTime })
    }

    toggleModalCopyTime = () => {
        this.setState({ isModalCopyTimeState: !this.state.isModalCopyTimeState });
    };

    toggleModalPeriod = () => {
        this.setState({ isModalPeriod: !this.state.isModalPeriod });
    };

    toggleModalCategory = () => {
        this.setState({ isModalCategory: !this.state.isModalCategory });
    };

    toggleModalCreated = () => {
        this.setState({ isModalCreated: !this.state.isModalCreated });
    };
    toggleModalDateStart = () => {
        this.setState({ isModalDateStart: !this.state.isModalDateStart });
    };
    handleChangeInput = (value, name) =>{
        let pureValue = replacerSpecialCharacters(value);
        this.setState({[name]: pureValue, errPhone: ''})
    }
    handleChangeAge = (text) => {
        let temp = onlyNumbers(text);
        let pureVal = temp ? ( temp.length < 2 ? `${temp[0]||''}${temp[1]||''}` : `${temp[0]||''}${temp[1]||''}/${temp[3]||''}${temp[4]||''}`):''
        this.setState({ inputAge: pureVal, ageMin: temp[0]+temp[1], ageMax: temp[3]+temp[4]})
        
    }
    handleClickSocial = (item, itemUrl) => {
        let temp = this.state.socialArr;
        if(temp){
            temp.push(item)            
        }else{
            temp = [item]
        }
        console.log(temp);
        
        this.setState({ socialArr: temp})
    }
    handleChangeSocial = (text, index) => {
        let temp = this.state.socialArr;
        text.match(/https:\/\//gi)?
        temp[index].link = text:
        temp[index].link = `https://${text}`
        this.setState({socialArr: temp})        
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
    getCategory = (id) => {
        axios({
            method: 'GET',
            baseURL: 'https://mamado.elgrow.ru',
            url: '/api/category',
        }).then((res, err) => {
            let temp = res.data;            
            temp.map(item => {
                item.checked = false;                
            })
            this.setState({categoryArr: temp})
        })
    }
    getMyCompanies = () => {
        axios({
            method: 'GET',
            baseURL: 'https://mamado.elgrow.ru',
            url: '/api/company/address/my',
            headers: {
                Authorization: this.state.token,
            }
        }).then((res) => {
            console.log(res)
            let temp = res.data.data;
            this.setState({inputCompanyNameArr: temp})
        }).catch( err => console.log(err))
    }
    toggleCategory = () => {
        this.setState({ isModalCategory: !this.state.isModalCategory });
    };
    toogleCheckedCategory = (index, item,) => {
        let temp = this.state.categoryArr;
        temp[index].checked = !temp[index].checked
        let newCategoryCheckedArr = temp.filter( item=> { return item.checked}).map(item=>{return {id: item.id, name: item.name} })
        this.setState({
            categoryArr: temp, 
            arrForSearch: newCategoryCheckedArr,

        })
        
    };
    submitCheckedCategory = () => {
        let temp = this.state.arrForSearch.map(item=>{
            return item.name
        })        
        this.setState({ inputCategory: temp.join(' ,')});
        this.toggleCategory()
    }
    confirmPeriod = () => {
        let {periodStart, periodEnd} = this.state
        if (periodStart && periodEnd) {
            this.setState({period: `${periodStart} / ${periodEnd}`})
            this.toggleModalPeriod()
        }else if(!periodStart){
            this.setState({errInputPeriod: '1'})
        }
        else if(!periodEnd){
            this.setState({errInputPeriod: '2'})
        }
    }
    confirmDateStart = () => {
        if (this.state.inputDateStart) {
            this.toggleModalDateStart()
        }else{

        }
    }
    confirmTypeEvent = () => {
        this.toggleModalTypeEvent()
    }
    confirmType = () => {
        this.toggleModalType()
    }
    confirmEventType = () => {
        this.toggleModalEventType()
    }
    confirmSheduleDate = (date, fullDate) => {
        let {sheduleArr, sheduleArrForSend} = this.state;
        sheduleArr.push({date: date, time:[] })
        sheduleArrForSend.push({date: fullDate, time:[] })
        this.setState({sheduleArr: sheduleArr, sheduleArrForSend: sheduleArrForSend})
    }
    deleteSheduleDate = (index) => {
        let sheduleArray = this.state.sheduleArr;
        sheduleArray.splice(index, 1);
        this.setState({sheduleArr: sheduleArray})
    }

    setSheduleTime = () => {
        let {sheduleArr, sheduleArrForSend} = this.state;
        let temp = sheduleArr;
        let tempSend = sheduleArrForSend;
        let index = this.state.currentSheduleIndex;
        temp[index].time = [...temp[index].time, `${this.state.timeSheduleStart} - ${this.state.timeSheduleEnd}`]

        tempSend[index].time = [...tempSend[index].time, {start: this.state.fullTimeSheduleStart, end: this.state.fullTimeSheduleEnd}]

        this.setState({sheduleArr: temp, sheduleArrForSend: tempSend,  timeSheduleStart: '', timeSheduleEnd: ''})
    }
    
    deleteSheduleTime = (index, i) => {
        this.setState({currentSheduleIndexForDel: index, currentSheduleTimeIndexForDel: i})
        this.toggleModalSchedule()
        setTimeout(()=>this.toggleModalDeleteTime(), 400)
    }
    confirmDeleteSheduleTime = () => {
        let {sheduleArr, currentSheduleIndexForDel, currentSheduleTimeIndexForDel} = this.state;
        let temp = sheduleArr[currentSheduleIndexForDel].time;
        temp.splice(currentSheduleTimeIndexForDel, 1);        
        this.setState({...sheduleArr, time: temp})
        this.toggleModalDeleteTime()
        setTimeout(()=>this.toggleModalSchedule(), 400)
    }
    galleryMaker = () => {
        const options = {
            title: 'Select Photo',
            customButtons: [{ name: 'photo', title: 'Choose Photo' }],
            storageOptions: {
              skipBackup: true,
            },
            quality: 0
          };
          ImagePicker.launchImageLibrary(options, (response) => {
            
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri, name: response.fileName, type: response.type };
                this.setState({
                mediaContent: [...this.state.mediaContent, source],
                photos: [...this.state.photos, response]
                });
            }
          })
        
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'All'
          })
          .then(r => { 
            this.setState({ photos: r.edges })
           })
    }
    getIdByCompanyName = (name, index, a) => {
        //Еще один костыль на Picker (забрать вместо значения объект)
        console.log(index, a );
        
        let inputCompanyNameId = this.state.inputCompanyNameArr.filter( (item, index) => {
            return index == index
        })        
        this.setState({inputCompanyNameId: inputCompanyNameId[0].model.id, inputCompanyName: name, toggleCompanyName: !this.state.toggleCompanyName})
    }
    getIdByVidName = (name) => {
        //Еще один костыль на Picker (забрать вместо значения объект)
        let inputVidId = this.state.inputVidArr.filter( item => {
            return item.name == name
        })
        console.log(inputVidId);
        this.setState({inputVidId: inputVidId[0].id, inputVid: name, toggleFormsProp: !this.state.toggleFormsProp})
    }
    submitEventInform = () => {
        let {
            inputName,
            inputPrice,
            inputLowPrice,
            inputPhone,
            inputSite,
            inputDesc,
            inputDateStart,
            checkTransfer,
            notFormattedDateStart,
            notFormattedDateEnd,
            sheduleArr,
            mediaContent,
            arrForSearch,
            addresses,
            socialArr,
            inputCompanyNameId,
            inputVidId,
            inputTypeEvent,
            ageMax,
            ageMin,
            inputTypeSend,
            inputTypeEventSend,
            inputEventTypeSend,
            timeStart,
            timeEnd,
            date,
            sheduleArrForSend,
            submitDate,
        } = this.state;

            const data = new FormData();
            console.log('inputTypeEvent', inputTypeEvent);
            
            mediaContent.forEach( (image, index) => {
                let img = {
                    uri: image.uri,
                    type: image.type,
                    name: image.name,
                }
                data.append(`media[${index}]`, img);
                index === 0 ? 
                data.append('avatar',img):
                null
            });
            arrForSearch && arrForSearch.forEach((element, index) => {
                data.append(`categories[${index}][id]`, element.id);
            });
            addresses && addresses.forEach((element, index) => {
                element.lat && element.long && element.text ? (
                data.append(`addresses[${index}][lat]`, element.lat),
                data.append(`addresses[${index}][long]`, element.long),
                data.append(`addresses[${index}][text]`, element.text)
                ):null
            })
            socialArr && socialArr.forEach((element, index) => {
                data.append(`soc[${index}][url]`, element.link);
                data.append(`soc[${index}][key]`, element.name);

            })
            data.append('phone', inputPhone);
            data.append('site', inputSite);
            data.append('about', inputDesc);
            
            data.append('company_id', inputCompanyNameId);
            data.append('offer_type_id', inputVidId);
            
            data.append('type', inputTypeEventSend);

            if(notFormattedDateStart  && notFormattedDateEnd ){
                let start = moment(notFormattedDateStart).format('YYYY-MM-DD HH:mm:ss'),
                    end   = moment(notFormattedDateEnd).format('YYYY-MM-DD HH:mm:ss');
                data.append('period_start', start);
                data.append('period_end', end);
            }

            if(submitDate && timeStart && timeStart.length > 0 && timeEnd && timeEnd.length > 0){
                let formDate = moment(submitDate).format('YYYY-MM-DD HH:mm:ss')
                let timeS = moment(timeStart, 'h:mm').format('HH:mm:ss')
                let timeE = moment(timeEnd, 'h:mm').format('HH:mm:ss')
                data.append('time_date', `${formDate}`);
                data.append('time_start', `${timeS}`);
                data.append('time_end', `${timeE}`);
            }

            sheduleArrForSend.forEach( (element, index) => {
                let formDate = moment(element.date).format('YYYY-MM-DD HH:mm:ss')
                data.append(`schedule[${index}][date]`, formDate);
                
                element.time.forEach( (item, i) => {
                    let timeStart = moment(item.start, 'h:mm').format('HH:mm:ss')
                    let timeEnd = moment(item.end, 'h:mm').format('HH:mm:ss')
                    data.append( `schedule[${index}][times][${i}][start]`, timeStart)
                    data.append( `schedule[${index}][times][${i}][end]`, timeEnd)
                })
                
            });

            data.append( 'order_type',  inputTypeSend);
            data.append( 'types',  inputEventTypeSend);
            data.append( 'name',  inputName);

            data.append( 'age_min',  +ageMax);
            data.append( 'age_max',  +ageMin);
            data.append( 'price',  +inputPrice);
            data.append( 'discount',  +inputLowPrice);

            inputDateStart 
            ? data.append( 'start',  +inputDateStart)
            : null;
            
            data.append( 'transfer',  +checkTransfer);
            console.log(data)
        axios({
            method: 'POST',
            baseURL: `https://mamado.elgrow.ru`,
            url: '/api/event',
            data: data,
            headers: {
                Authorization: this.state.token,
                'accept': "application/json",
                'content-type': 'multipart/form-data',
            }
        }).then(res => {
            console.log(res);
            
            this.props.navigation.navigate('BusinessOuter');
        }).catch(err=>{ console.log(err, data) })
    }
    removeMedia = (index) => {
        let mediaArr = this.state.mediaContent;
        mediaArr.splice(index,1);
        this.setState({mediaContent: mediaArr})
    }
    componentDidUpdate(prevProps, prevState){
        let { params } = this.props.navigation.state;

        if(prevProps.navigation.state.params !== params){
            if(params && params.companyDesc){
                this.setState({inputDesc: params.companyDesc})
            }
            if (params && params.address) {
                let address = params.address
                address && 
                address[address.length - 1].text &&

                this.setState({addresses: address})
            }
        }
    }
    componentDidMount(){
        let { params } = this.props.navigation.state         
        if(params && params.companyDesc && params.companyDesc.length === 0){
            this.setState({inputDesc: ''})
        }        
        if (params && params.address) {
            this.setState({addresses: params.address})
        }
    }
    func = e => {
        console.log(e)
    }
    render(){
        console.log(this.state);
             
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Header
                    centerComponent={{ text: 'Создать событие', style: { color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 17, fontWeight: '500' } }}
                    containerStyle={{
                        backgroundColor: '#556086',
                        borderBottomWidth: 0
                    }}
                    leftComponent={<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{left: 25}}><IconBackWhite/></TouchableOpacity>}
                />
                <View style={styles.textContainer}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={{marginTop: 30}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={styles.labelActive}>Название компании</Text>
                                <View style={{marginLeft: 'auto'}}>
                                    <IconHelpInput/>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.buttonEnter} onPress={()=>this.setState({toggleCompanyName: !this.state.toggleCompanyName})}>
                                    <Text style={[styles.buttonEnterText, {color: this.state.inputCompanyName ? '#444B69':'#99A2B4'}]}>{this.state.inputCompanyName || 'Выберите Название компании'}</Text>
                                </TouchableOpacity>
                                {
                                    this.state.toggleCompanyName?
                                        <Picker selectedValue={this.state.inputCompanyName}
                                                onValueChange={(itemValue, itemIndex, a) => {this.getIdByCompanyName(itemValue, itemIndex, a)}}
                                                >
                                                <Picker.Item label={'Не выбрано'} value={'Не выбрано'}/>
                                                {this.state.inputCompanyNameArr &&
                                                    this.state.inputCompanyNameArr.map((item, index)=>{
                                                        return <Picker.Item label={item.model && item.model.name} value={item.model && item.model.name} key={index}/>
                                                    })
                                                }
                                        </Picker>:
                                        null
                                }
                                {this.state.inputVid.length > 5 ? <InputCheck style={styles.inputCheck}/> : <IconArrowBottom style={{position: 'absolute', right: 20, top: 32}}/>}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>Название события</Text>
                            <View>
                                <Input  placeholderTextColor="#99A2B4" 
                                        onChangeText={ (text) => this.handleChangeInput(text, 'inputName') } 
                                        placeholder="Не указано" 
                                        inputContainerStyle={styles.inputContainer} 
                                        inputStyle={styles.inputStyle}
                                        containerStyle={styles.inputContainerStyle}
                                        value={this.state.inputName}/>
                                {this.state.inputName.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={this.state.inputCompanyName.length > 0  ? styles.labelActive : styles.labelNotActive}>Вид предложения</Text>
                                <View style={{marginLeft: 'auto'}}>
                                    <IconHelpInput/>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.buttonEnter} onPress={()=>this.state.inputCompanyName.length > 0  ? this.setState({toggleFormsProp: !this.state.toggleFormsProp}) : null}>
                                    <Text style={[styles.buttonEnterText, {color: this.state.inputVid ? '#444B69':'#99A2B4'}]}>{this.state.inputVid || 'Выберите вид предложения'}</Text>
                                </TouchableOpacity>
                                {
                                    this.state.toggleFormsProp?
                                        <Picker selectedValue={this.state.inputVid}
                                                onValueChange={(itemValue, itemIndex) => this.getIdByVidName(itemValue)}>
                                                {this.state.inputVidArr &&
                                                    this.state.inputVidArr.map((item, index)=>{
                                                        return <Picker.Item label={item.name} value={item.name} key={index} clickable={true}/>
                                                    })
                                                }
                                        </Picker>:
                                        null
                                }
                                {this.state.inputVid.length > 5 ? <InputCheck style={styles.inputCheck}/> : <IconArrowBottom style={{position: 'absolute', right: 20, top: 32}}/>}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={this.state.inputVid.length > 0  ? styles.labelActive : styles.labelNotActive}>Расписание мероприятия</Text>
                                <View style={{marginLeft: 'auto'}}>
                                    <IconHelpInput/>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity onPress={this.state.inputVid.length > 0  ? this.toggleModalTypeEvent : null} style={styles.startEndBlock}>
                                    <Text style={{color: this.state.inputTypeEvent && this.state.inputTypeEvent.length ? '#444B69':'#99A2B4', fontSize: 16, fontFamily: 'SF Pro Text', marginTop: 15, marginLeft: 20}}>{this.state.inputTypeEvent || 'Тип мероприятия'}</Text>
                                    {this.state.inputTypeEvent && this.state.inputTypeEvent.length > 5 ? <InputCheck style={[styles.inputCheck,{ top: 20}]}/> : <InputPlus style={{position: 'absolute', right: 20, bottom: 18}}/>}
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.inputTypeEvent?
                        <>
                            {this.state.valueTypeEvent === 0 ?
                                <>
                                    <View style={{marginTop: 30}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={styles.labelActive}>Дата проведения</Text>
                                        </View>
                                        <View>
                                            <DatePicker
                                                style={{width: '100%', marginTop: 15}}
                                                date={ this.state.date }
                                                mode="date"
                                                placeholder="Выберите дату"
                                                format="LL"
                                                locale={'ru'}
                                                confirmBtnText="Принять"
                                                cancelBtnText="Закрыть"
                                                showIcon={false}
                                                customStyles={{
                                                    dateInput: {
                                                        borderRadius: 10,
                                                        borderWidth: 1,
                                                        borderColor: '#DEE2EB',
                                                        height: 53,
                                                        textAlign: 'left',
                                                        width: '100%',
                                                        alignItems: 'flex-start',
                                                        justifyContent: 'flex-start',
                                                        paddingTop: 14,
                                                        paddingLeft: 20
                                                    },
                                                    placeholderText: {
                                                        color: '#99A2B4',
                                                        fontFamily: 'SF Pro Text',
                                                        fontSize: 16,
                                                        fontWeight: '400',
                                                    },
                                                    dateText:{
                                                        color: '#444B69',
                                                        fontFamily: 'SF Pro Text',
                                                        fontSize: 16,
                                                        fontWeight: '400',
                                                    },
                                                    btnTextConfirm: {
                                                        color: '#E94C89',
                                                        fontSize: 16,
                                                        fontFamily: 'SF Pro Text',
                                                        fontWeight: '600'
                                                    },
                                                    btnTextCancel: {
                                                        color: '#444B69',
                                                        fontSize: 16,
                                                        fontFamily: 'SF Pro Text',
                                                        fontWeight: '600'
                                                    }
                                                }}
                                                onDateChange ={(date, notFormattedDate) =>{ this.setState({date: date ,submitDate: notFormattedDate})} }
                                            />
                                            {this.state.date && this.state.date.length > 5 ? <IconCalendarActive style={{position: 'absolute', right: 20, top: 27}}/> : <IconInputCalendar style={{position: 'absolute', right: 20, top: 27}}/>}
                                        </View>
                                    </View>
                                    <View style={{marginTop: 30}}>
                                        <Text style={styles.labelActive}>Время</Text>
                                        <View>
                                            <TouchableOpacity onPress={this.toggleModalTime} style={styles.timeBlock}>
                                                <Text style={this.state.timeStart !== '' && this.state.timeEnd !== '' ? styles.timeInputActive : styles.timeInput}>{this.state.timeStart !== '' && this.state.timeEnd !== '' ? this.state.timeStart + ' - ' + this.state.timeEnd : 'Выберите время проведения'}</Text>
                                            </TouchableOpacity>
                                            {this.state.inputAge.length > 5 ? <InputCheck style={styles.inputCheck}/> : <InputPlus style={{position: 'absolute', right: 20, top: 27}}/>}
                                        </View>
                                    </View>
                                </>:null
                            }
                            {this.state.valueTypeEvent === 1 ?
                                <>
                                    <View style={{marginTop: 30}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={styles.labelActive}>Расписание</Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity onPress={this.toggleModalSchedule} style={styles.startEndBlock}>
                                                <Text style={{color: this.state.inputType.length ? '#444B69':'#99A2B4', fontSize: 16, fontFamily: 'SF Pro Text', marginTop: 15, marginLeft: 20, paddingRight: 25}} numberOfLines={1}>
                                                    {
                                                        this.state.sheduleArr && this.state.sheduleArr.length 
                                                            ?  this.state.sheduleArr.map( item => {
                                                                    return `${item.date} / `
                                                                })
                                                            :  'Создайте расписание'
                                                    }
                                                </Text>
                                                {this.state.sheduleArr.length > 1 ? <InputCheck style={[styles.inputCheck, {top: 20}]}/> : <InputPlus style={{position: 'absolute', right: 20, top: 20}}/>}
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </> : null
                            }
                            {this.state.valueTypeEvent === 2 ?
                                <>
                                    <View style={{marginTop: 30}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={styles.labelActive}>Период проведения</Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity onPress={this.toggleModalPeriod} style={styles.startEndBlock}>
                                                <Text style={{color: '#99A2B4', fontSize: 16, fontFamily: 'SF Pro Text', marginTop: 15, marginLeft: 20, maxWidth: '80%'}} numberOfLines={1} >{this.state.period ? (`${this.state.period}`) : 'Начало и конец'}</Text>
                                            </TouchableOpacity>
                                            {this.state.period ? <IconCalendarActive style={{position: 'absolute', right: 20, top: 27}}/> : <IconInputCalendar style={{position: 'absolute', right: 20, top: 27}}/>}
                                        </View>
                                    </View>
                                </>:null
                            }
                        </>:
                        null
                        }
                        <View style={{marginTop: 30}}>
                            <Text style={this.state.period || this.state.timeStart.length || this.state.inputShedule.length  ? styles.labelActive : styles.labelNotActive}>Возраст детей</Text>
                            <View>
                                <Input  placeholderTextColor="#99A2B4" 
                                        onChangeText={ (text) => this.state.period || this.state.timeStart.length || this.state.sheduleArr.length  ? this.handleChangeAge(text) : null} 
                                        placeholder="Возраст детей" 
                                        inputContainerStyle={styles.inputContainer} 
                                        inputStyle={styles.inputStyle} 
                                        containerStyle={styles.inputContainerStyle}
                                        value={this.state.inputAge}/>

                                {this.state.inputAge.length >= 5 ? 
                                    <TouchableOpacity style={{position: 'absolute', right: 20, top: 27}} onPress={()=>this.setState({inputAge: ''})}>
                                        <InputCheck /> 
                                    </TouchableOpacity> : 
                                    this.state.inputAge.length > 1 ? 
                                        <TouchableOpacity style={{position: 'absolute', right: 20, top: 27}} onPress={()=>this.setState({inputAge: ''})}>
                                            <InputPlus style={{transform: [{rotate: '45deg'}]}} />
                                        </TouchableOpacity> : 
                                        null
                                }
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={this.state.inputAge.length > 0 ? styles.labelActive : styles.labelNotActive}>Категория</Text>
                            <View>
                                {/* <TouchableOpacity onPress={this.state.inputAge.length > 0 ? this.toggleModalCategory : null} style={styles.timeBlock}> */}
                                <TouchableOpacity onPress={this.toggleModalCategory } style={styles.timeBlock}>
                                    <Text style={this.state.inputCategory && this.state.inputCategory.length !== 0? [styles.timeInputActive, {maxWidth: '80%'}] : styles.timeInput} numberOfLines={1}>{this.state.inputCategory || 'Выберите категорию'}</Text>
                                    {this.state.inputCategory.length > 5 ? <InputCheck style={{position: 'absolute', right: 20, top: 20}}/> : <InputPlus style={{position: 'absolute', right: 20, bottom: 18}}/>}
                                </TouchableOpacity>
                            </View>
                        </View>
                        { 
                            this.state.addresses.map( (item, index) => (
                                <View style={{marginTop: 30}} key={index}>
                                    <Text style={styles.labelActive}>Адрес</Text>
                                    <TouchableOpacity   style={[styles.inputStyle, styles.inputContainerStyle]}
                                                        onPress={() => this.props.navigation.navigate('BusinessCreateCompanyMap', {prevRoute: this.props.navigation.state.routeName, address: this.props.navigation.state.params && this.props.navigation.state.params.companyEdit ? this.props.navigation.state.params.companyEdit.company.addresses : this.state.addresses, index: item.text ? index : false})} >
                                        <Text style={[styles.inputStyleTextText, {color: item && item.text ?  '#444B69' : '#99A2B4'}]}>
                                            { item && item.text || 'Укажите адрес на карте'}
                                        </Text>
                                        { item.length ? 
                                        <InputCheck style={{position: 'absolute', top: 23, right: 20}}/> : 
                                        <InputPlus style={{position: 'absolute', top: 19, right: 20}}/>
                                        }
                                    </TouchableOpacity>
                                </View>
                                ))
                        }
                        {   this.state.addresses &&
                            this.state.addresses.length >= 1
                            ?   <View style={{marginTop: 30}}>
                                    <Text style={styles.labelActive}>Есть еще адрес?</Text>
                                    <TouchableOpacity   style={[styles.inputStyle, styles.inputContainerStyle]}
                                                        onPress={() => this.props.navigation.navigate('BusinessCreateCompanyMap', {prevRoute: this.props.navigation.state.routeName, address: this.props.navigation.state.params && this.props.navigation.state.params.companyEdit ? this.props.navigation.state.params.companyEdit.company.addresses : this.state.addresses})} >
                                        <Text style={[styles.inputStyleTextText, {color: '#99A2B4'}]}>
                                            { 'Укажите адрес на карте'}
                                        </Text>
                                        <InputPlus style={{position: 'absolute', top: 19, right: 20}}/>
                                    </TouchableOpacity>
                                </View>
                            :   null
                        }
                        {/* <View style={{marginTop: 30}}>
                            <Text style={this.state.addresses.length > 0 ? styles.labelActive : styles.labelNotActive}>Ближайшее метро</Text>
                            <View>
                                <Input placeholderTextColor="#99A2B4" onChangeText={ (text) => this.state.addresses.length > 0 ? this.setState({ inputMetro: text }) : null } placeholder="Не указано" inputContainerStyle={styles.inputContainer} inputStyle={styles.inputStyle} containerStyle={styles.inputContainerStyle} value={this.state.inputMetro}/>
                                {this.state.inputMetro.length > 5 ? <InputCheck style={styles.inputCheck}/> : <InputPlus style={{position: 'absolute', right: 20, top: 27}}/>}
                            </View>
                        </View> */}
                        <View style={{marginTop: 30, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{width: 150}}>
                                <Text style={this.state.addresses.length > 0 ? styles.labelActive : styles.labelNotActive}>Цена</Text>
                                <View>
                                    <Input  placeholderTextColor="#99A2B4" 
                                            onChangeText={ (text) => this.state.addresses.length > 0 ? this.handleChangeInput(text, 'inputPrice') : null } 
                                            placeholder="Не указано" 
                                            inputContainerStyle={styles.inputContainer} 
                                            inputStyle={styles.inputStyle} 
                                            containerStyle={styles.inputContainerStyle}
                                            value={this.state.inputPrice}/>
                                </View>
                            </View>
                            <View style={{width: 150}}>
                                <Text style={this.state.inputPrice.length > 0 ? styles.labelActive : styles.labelNotActive}>Цена со скидкой</Text>
                                <View>
                                    <Input  placeholderTextColor="#99A2B4" 
                                            onChangeText={ (text) => this.state.inputPrice.length > 0 ? this.handleChangeInput(text, 'inputLowPrice') : null } 
                                            placeholder="Не указано" 
                                            inputContainerStyle={styles.inputContainer} 
                                            inputStyle={styles.inputStyle} 
                                            containerStyle={styles.inputContainerStyle}
                                            value={this.state.inputLowPrice}/>
                                </View>
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={this.state.inputPrice.length > 0 ? styles.labelActive : styles.labelNotActive}>Телефон</Text>
                            <View>
                                <TextInputMask  
                                    placeholderTextColor="#99A2B4" 
                                    style={[styles.inputStyle, styles.inputContainerStyle, styles.inputStyleText, styles.startEndBlock, { paddingLeft: 20}]}
                                    placeholder="Не указано"
                                    type={'cel-phone'}
                                    value={this.state.inputPhone}
                                    onChangeText={(value)=>this.state.inputPrice.length > 0 ? this.handleChangeInput(value, 'inputPhone') : null }
                                    options={{
                                        withDDD: true, 
                                        dddMask: '+7(999)999-99-99'
                                    }}
                                    maxLength={16}
                                />
                                {this.state.inputPhone.length > 16 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={this.state.inputPhone.length > 0 ? styles.labelActive : styles.labelNotActive}>Сайт</Text>
                            <View>
                                <Input  placeholderTextColor="#99A2B4" 
                                        onChangeText={ (text) => this.state.inputPhone.length > 0 ? this.handleChangeInput(text, 'inputSite') : null } 
                                        placeholder="Не указано" 
                                        inputContainerStyle={styles.inputContainer} 
                                        inputStyle={styles.inputStyle} 
                                        containerStyle={styles.inputContainerStyle}
                                        value={this.state.inputSite}/>
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={this.state.inputPhone.length > 0 ? styles.labelActive : styles.labelNotActive}>Социальные сети</Text>
                            <View style={{flexDirection: 'row', marginTop: 15}}>
                                <TouchableOpacity   style={this.state.vk ? [styles.iconOuter, styles.iconOuter_clicked_vk]:styles.iconOuter} 
                                                    onPress={()=>{this.state.inputPhone.length > 3 ? (this.handleClickSocial({name: 'vk', link:''}), this.setState({vk: true})):'' }}>
                                    {
                                        this.state.vk ? 
                                            <IconVk style={{opacity: 1}} fill={'#fff'}/>:
                                            <IconVk style={{opacity: 0.6}}/>
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity   style={this.state.fb?[styles.iconOuter, styles.iconOuter_clicked_fb]:styles.iconOuter} 
                                                    onPress={()=>this.state.inputPhone.length > 3 ? (this.handleClickSocial({name: 'Fb', link:''}), this.setState({fb: true})):'' }>
                                    {
                                        this.state.fb?
                                            <IconFb style={{opacity: 1}} fill={'#fff'}/>:
                                            <IconFb style={{opacity: 0.6}}/>
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity   style={this.state.inst?[styles.iconOuter, styles.iconOuter_clicked_inst]:styles.iconOuter} 
                                                    onPress={()=>this.state.inputPhone.length > 3 ? (this.handleClickSocial({name: 'Inst', link:''}), this.setState({inst: true})):'' }>
                                    {
                                        this.state.inst?
                                        <IconInst style={{opacity: 1}} fill={'#fff'}/>:
                                        <IconInst style={{opacity: 0.6}}/>
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity   style={this.state.ok?[styles.iconOuterLast, styles.iconOuter_clicked_ok]:styles.iconOuterLast} 
                                                    onPress={()=>this.state.inputPhone.length > 3 ? (this.handleClickSocial({name: 'Ok', link:''}), this.setState({ok: true})):'' }>
                                    {
                                        this.state.ok?
                                        <IconOk style={{opacity: 1}} fill={'#fff'}/>:
                                        <IconOk style={{opacity: 0.6}}/>
                                    }
                                </TouchableOpacity>
                            </View>
                            {this.state.socialArr &&
                                this.state.socialArr.map((item, index)=>(
                                    <Input  key={index}
                                            placeholderTextColor="#99A2B4" 
                                            onChangeText={ (text) => this.handleChangeSocial(text, index) }  
                                            placeholder={`Укажите ссылку ${item.name}`} 
                                            inputContainerStyle={styles.inputContainer} 
                                            inputStyle={styles.inputStyle} 
                                            containerStyle={styles.inputContainerStyle}
                                            value={item.link}
                                    />                                    
                                ))
                            }
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={this.state.inputDesc && this.state.inputDesc.length > 5 ? styles.labelActive : styles.labelNotActive}>Фото и видео</Text>
                            <ScrollView horizontal>
                                <View style={styles.photoItem}>
                                    <TouchableOpacity onPress={ ()=>this.galleryMaker() }>
                                            <Image source={require('../../../../assets/images/business/image-upload.png')} style={styles.photoElem}/>
                                    </TouchableOpacity>
                                </View>
                                {
                                    this.state.mediaContent.map((item, index) => (
                                        <View style={styles.photoItem} key={index}>
                                            <TouchableOpacity onPress={()=>this.galleryMaker()}>
                                                <Image source={{uri: item.uri}} style={styles.photoElem}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=>this.removeMedia(index)} style={styles.photoRemove}><IconPhotoRemove/></TouchableOpacity>
                                        </View>
                                    ))
                                }
                            </ScrollView>
                        </View>
                        {/* <View style={{marginTop: 30}}>
                            <Text style={this.state.inputPhone.length > 0 ? styles.labelActive : styles.labelNotActive}>Описание</Text>
                            <View>
                                <Input  placeholderTextColor="#99A2B4" 
                                        editable={this.state.inputSite.length > 5 ? true : false} 
                                        onChangeText={ (text) => this.state.inputPhone.length > 0 ? this.handleChangeInput(text, 'inputDesc') : null }  
                                        placeholder="О вашем событии" 
                                        inputContainerStyle={styles.inputContainer} 
                                        inputStyle={styles.inputStyle} 
                                        containerStyle={styles.inputContainerStyle}
                                        value={this.state.inputDesc}
                                        />
                                        <TouchableOpacity style={{position: 'absolute', right: 20, top: 27}} onPress={() => this.state.inputPhone.length > 0 ? this.props.navigation.navigate('BusinessCreateCompanyDesc', {companyDesc: this.state.inputDesc, prevRoute: this.props.navigation.state.routeName}) : null }>
                                            {this.state.inputDesc && this.state.inputDesc.length > 5 ? <InputCheck/> : <InputPlus/>}
                                        </TouchableOpacity>
                            </View>
                        </View> */}
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>Описание</Text>
                            <TouchableOpacity   style={[styles.inputStyle, styles.inputContainerStyle]}
                                                onPress={() => this.state.inputPhone.length > 0 ? this.props.navigation.navigate('BusinessCreateCompanyDesc', {companyDesc: this.state.inputDesc, prevRoute: this.props.navigation.state.routeName}) : null } >
                                <Text style={[styles.inputStyleTextText, {color: this.state.inputDesc ?  '#444B69' : '#99A2B4'}]}>
                                    { this.state.inputDesc || 'О вашем событии'}
                                </Text>
                                { this.state.inputDesc ? 
                                <InputCheck style={{position: 'absolute', top: 23, right: 20}}/> : 
                                <InputPlus style={{position: 'absolute', top: 19, right: 20}}/>
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={this.state.inputPhone.length > 0 ? styles.labelActive : styles.labelNotActive}>Тип заказа события</Text>
                            <View>
                                <TouchableOpacity onPress={this.state.inputPhone.length > 0 ? this.toggleModalType : null } style={styles.startEndBlock}>
                                    <Text   style={this.state.inputType !== '' ? styles.timeInputActive : styles.timeInput}>
                                        {this.state.inputType || 'Бронирование или оплата?'}
                                    </Text>
                                    {this.state.inputType.length > 5 ? <InputCheck style={{position: 'absolute', right: 20, top: 19}}/> : <InputPlus style={{position: 'absolute', right: 20, top: 19}}/>}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={this.state.inputType.length > 0 ? styles.labelActive : styles.labelNotActive}>Тип мероприятия</Text>
                            <View>
                                <TouchableOpacity onPress={this.state.inputType.length > 0 ? this.toggleModalEventType : null } style={styles.startEndBlock}>
                                    <Text   style={this.state.inputEventType !== '' ? styles.timeInputActive : styles.timeInput}>
                                        {this.state.inputEventType || 'Групповое или индивидуальное?'}
                                    </Text>
                                    {this.state.inputEventType.length ? <InputCheck style={{position: 'absolute', right: 20, top: 19}}/> : <InputPlus style={{position: 'absolute', right: 20, top: 19}}/>}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <CheckBox
                                title='Возможность переноса события'
                                checkedIcon={<IconChecked/>}
                                uncheckedIcon={<IconUnchecked/>}
                                checked={this.state.inputType.length > 0 ? this.state.checkTransfer : null}
                                onPress={() => this.state.inputType.length > 0 ? this.setState({checkTransfer: !this.state.checkTransfer}) : null}
                                containerStyle={{padding: 0, margin: 0, backgroundColor:'transparent', marginLeft: 0, marginRight: 0, borderWidth: 0}}
                                textStyle={{color: this.state.inputType.length > 0 ? '#444B69' : '#CDD4E5', fontSize: 16, fontFamily: 'SF Pro Text', fontWeight: '400'}}
                            />
                            <View>
                                <CheckBox
                                    title='Отложенный старт продаж'
                                    checkedIcon={<IconChecked/>}
                                    uncheckedIcon={<IconUnchecked/>}
                                    checked={this.state.inputType.length > 0 ? this.state.checkStart : null}
                                    onPress={() => this.state.inputType.length > 0 ? this.setState({checkStart: !this.state.checkStart}) : null}
                                    containerStyle={{marginTop: 24, padding: 0, margin: 0, backgroundColor:'transparent', marginLeft: 0, marginRight: 0, borderWidth: 0}}
                                    textStyle={{color: this.state.inputType.length > 0 ? '#444B69' : '#CDD4E5', fontSize: 16, fontFamily: 'SF Pro Text', fontWeight: '400'}}
                                />
                                <View style={{marginLeft: 'auto', top: -23}}>
                                    <IconHelpInput/>
                                </View>
                            </View>
                        </View>
                        {this.state.checkStart ? (<View style={{marginTop: 20}}>
                            <Text style={styles.labelActive}>Дата начала проведения</Text>
                            <View>
                                <TouchableOpacity onPress={this.toggleModalDateStart} style={styles.startEndBlock}>
                                    <Text   style={this.state.inputDateStart !== '' ? styles.timeInputActive : styles.timeInput}>
                                        {this.state.inputDateStart || "Не указано"}
                                    </Text>
                                {this.state.inputDateStart.length > 5 ? <InputCheck style={{position: 'absolute', right: 20, top: 19}}/> : <IconInputCalendar style={{position: 'absolute', right: 20, top: 19}}/>}
                                </TouchableOpacity>
                            </View>
                        </View>) : null}
                        <Text style={styles.soonBlock}>
                            У пользователей данное событие будет отображено с пометкой <Text style={{color: '#E94C89', fontWeight: '500'}}>«Скоро открытие»</Text>
                        </Text>
                        <TouchableOpacity onPress={()=>this.submitEventInform()} style={styles.createBlock}>
                            <Text style={styles.createBlockText}>Создать событие</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <Modal isVisible={this.state.isModalTypeEvent} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={{height: 75, backgroundColor: '#556086', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 16, fontWeight: '500', marginLeft: 25}}>Выберите тип мероприятия</Text>
                            <TouchableOpacity onPress={this.toggleModalTypeEvent} style={{marginLeft: 'auto', marginRight: 24}}><IconFilterClose/></TouchableOpacity>
                        </View>
                        <View style={{backgroundColor: '#FFF', paddingTop: 40, paddingLeft: 24, paddingRight: 24, paddingBottom: 40}}>
                            <RadioForm
                                formHorizontal={false}
                                animation={true}
                            >
                                {radio_type_event.map((obj, i) => {
                                    return (
                                        <RadioButton style={i === 0 || i === 1 ? {marginBottom: 24} : null} labelHorizontal={true} key={i} >
                                            <RadioButtonInput
                                                obj={obj}
                                                index={i}
                                                isSelected={this.state.valueTypeEvent === i}
                                                borderWidth={1}
                                                buttonInnerColor={'#38AFAF'}
                                                buttonOuterColor={'#D8DBE3'}
                                                buttonSize={12}
                                                buttonOuterSize={27}
                                                onPress={()=>this.setState({
                                                    valueTypeEvent: i, 
                                                    inputTypeEvent: obj.label, 
                                                    inputTypeEventSend: obj.send,
                                                    date: '',
                                                    submitDate: '',
                                                    timeStart: '',
                                                    timeEnd: '',
                                                    period: '',
                                                    periodStart: '',
                                                    periodEnd: '',
                                                })}
                                                buttonStyle={{backgroundColor: '#FFF'}}
                                            />
                                            <RadioButtonLabel
                                                obj={obj}
                                                index={i}
                                                labelHorizontal={true}
                                                onPress={()=>this.setState({
                                                    valueTypeEvent: i, 
                                                    inputTypeEvent: obj.label, 
                                                    inputTypeEventSend: obj.send,
                                                    date: '',
                                                    submitDate: '',
                                                    timeStart: '',
                                                    timeEnd: '',
                                                    period: '',
                                                    periodStart: '',
                                                    periodEnd: '',
                                                })}
                                                labelStyle={{fontSize:16, fontFamily: 'SF Pro Text', fontWeight: '400', color: '#444B69'}}
                                            />
                                        </RadioButton>
                                    )
                                })}
                            </RadioForm>
                            <TouchableOpacity onPress={()=>this.confirmTypeEvent()} style={styles.radioButtonBlock}>
                                <Text style={{fontSize: 14, fontFamily: 'SF Pro Text', fontWeight: '600', textAlign: 'center', color: '#FFF'}}>ВЫБРАТЬ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isModalType} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={{height: 75, backgroundColor: '#556086', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 16, fontWeight: '500', marginLeft: 25}}>Выберите тип мероприятия</Text>
                            <TouchableOpacity onPress={this.toggleModalType} style={{marginLeft: 'auto', marginRight: 24}}><IconFilterClose/></TouchableOpacity>
                        </View>
                        <View style={{backgroundColor: '#FFF', paddingTop: 40, paddingLeft: 24, paddingRight: 24, paddingBottom: 40}}>
                            <RadioForm
                                formHorizontal={false}
                                animation={true}
                            >
                                {radio_type.map((obj, i) => {
                                    return (
                                        <RadioButton style={i === 0 || i === 1 ? {marginBottom: 24} : null} labelHorizontal={true} key={i} >
                                            <RadioButtonInput
                                                obj={obj}
                                                index={i}
                                                isSelected={this.state.valueType === i}
                                                borderWidth={1}
                                                buttonInnerColor={'#38AFAF'}
                                                buttonOuterColor={'#D8DBE3'}
                                                buttonSize={12}
                                                buttonOuterSize={27}
                                                onPress={()=>this.setState({valueType: i, inputType: obj.label, inputTypeSend: obj.send})}
                                                buttonStyle={{backgroundColor: '#FFF'}}
                                            />
                                            <RadioButtonLabel
                                                obj={obj}
                                                index={i}
                                                labelHorizontal={true}
                                                onPress={()=>this.setState({valueType: i, inputType: obj.label, inputTypeSend: obj.send})}
                                                labelStyle={{fontSize:16, fontFamily: 'SF Pro Text', fontWeight: '400', color: '#444B69'}}
                                            />
                                        </RadioButton>
                                    )
                                })}
                            </RadioForm>
                            <TouchableOpacity onPress={()=>this.confirmType()} style={styles.radioButtonBlock}>
                                <Text style={{fontSize: 14, fontFamily: 'SF Pro Text', fontWeight: '600', textAlign: 'center', color: '#FFF'}}>ВЫБРАТЬ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isModalEventType} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={{height: 75, backgroundColor: '#556086', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 16, fontWeight: '500', marginLeft: 25}}>Выберите тип мероприятия</Text>
                            <TouchableOpacity onPress={()=>this.toggleModalEventType()} style={{marginLeft: 'auto', marginRight: 24}}><IconFilterClose/></TouchableOpacity>
                        </View>
                        <View style={{backgroundColor: '#FFF', paddingTop: 40, paddingLeft: 24, paddingRight: 24, paddingBottom: 40}}>
                            <RadioForm
                                formHorizontal={false}
                                animation={true}
                            >
                                {event_type.map((obj, i) => {
                                    return (
                                        <RadioButton style={i === 0 || i === 1 ? {marginBottom: 24} : null} labelHorizontal={true} key={i} >
                                            <RadioButtonInput
                                                obj={obj}
                                                index={i}
                                                isSelected={this.state.valueEventType === i}
                                                borderWidth={1}
                                                buttonInnerColor={'#38AFAF'}
                                                buttonOuterColor={'#D8DBE3'}
                                                buttonSize={12}
                                                buttonOuterSize={27}
                                                onPress={()=>this.setState({valueEventType: i, inputEventType: obj.label, inputEventTypeSend: obj.send})}
                                                buttonStyle={{backgroundColor: '#FFF'}}
                                            />
                                            <RadioButtonLabel
                                                obj={obj}
                                                index={i}
                                                labelHorizontal={true}
                                                onPress={()=>this.setState({valueEventType: i, inputEventType: obj.label, inputEventTypeSend: obj.send})}
                                                labelStyle={{fontSize:16, fontFamily: 'SF Pro Text', fontWeight: '400', color: '#444B69'}}
                                            />
                                        </RadioButton>
                                    )
                                })}
                            </RadioForm>
                            <TouchableOpacity onPress={()=>this.confirmEventType()} style={styles.radioButtonBlock}>
                                <Text style={{fontSize: 14, fontFamily: 'SF Pro Text', fontWeight: '600', textAlign: 'center', color: '#FFF'}}>ВЫБРАТЬ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isModalSchedule} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={{height: 75, backgroundColor: '#556086', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 16, fontWeight: '500', marginLeft: 25}}>Создайте расписание</Text>
                            <TouchableOpacity onPress={this.toggleModalSchedule} style={{marginLeft: 'auto', marginRight: 24}}><IconFilterClose/></TouchableOpacity>
                        </View>
                        <View style={{backgroundColor: '#FFF'}}>
                            {
                                this.state.sheduleArr.map((item, index) => (
                                    <View key={index}>
                                        <View style={{flexDirection: 'row', backgroundColor: '#F0F1F3', height: 60, paddingLeft: 24, paddingRight: 24, alignItems: 'center', marginTop: index !==0 ? 35 : 0}}>
                                            <Text style={{color: '#444B69', fontSize: 16, fontFamily: 'SF Pro Text', fontWeight: '500'}}>{item.date}</Text>
                                            <TouchableOpacity style={{marginLeft: 'auto'}} onPress={()=>this.deleteSheduleDate(index)}>
                                                <IconCalendarTrash/>
                                            </TouchableOpacity>
                                        </View>
                                        {item.time &&
                                            item.time.map((elem, i) => (
                                                <View key={i} style={{marginLeft: 20, marginTop: 25}}>
                                                    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5}}>
                                                        <TouchableOpacity onPress={()=>this.deleteSheduleTime(index, i)} style={{flexDirection: 'row', alignItems: 'center'}}>
                                                            <IconTimeDelete/>
                                                            <Text style={{color: '#99A2B4', fontSize: 16, fontWeight: '400', fontFamily: 'SF Pro Text', marginLeft: 10}}>{elem}</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={this.toggleModalCopyTime} style={{marginLeft: 'auto', marginRight: 24}}>
                                                            <IconCopyTime/>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            ))
                                        }
                                        <View style={{marginLeft: 20, marginTop: 25}}>
                                            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5}}>
                                                <TouchableOpacity onPress={()=>{this.toggleModalSchedule(); setTimeout(()=>this.toggleModalSheduleTime(),400); this.setState({currentSheduleIndex: index})} } style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <IconTimeEnter/>
                                                    <Text style={{color: '#99A2B4', fontSize: 16, fontWeight: '400', fontFamily: 'SF Pro Text', marginLeft: 10}}>Выберите время</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={()=>this.toggleModalCopyTime()} style={{marginLeft: 'auto', marginRight: 24}}>
                                                    <IconCopyTime/>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                ))
                            }
                           
                            <View style={{borderTopWidth: 1, borderTopColor: '#F0F1F3', marginTop: this.state.sheduleArr.length !== 0 ? 50 : 0}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 30, marginLeft: 24, marginRight: 24}}>
                                    <Text style={styles.labelActive}>Еще дата мероприятия</Text>
                                </View>
                                <View style={{marginLeft: 24, marginRight: 24}}>
                                    <DatePicker
                                        style={{width: '100%', marginTop: 15}}
                                        date={this.state.date}
                                        mode="date"
                                        placeholder="Выберите дату"
                                        format="LL, dddd"
                                        locale={'ru'}
                                        confirmBtnText="Принять"
                                        cancelBtnText="Закрыть"
                                        showIcon={false}
                                        customStyles={{
                                            dateInput: {
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                borderColor: '#DEE2EB',
                                                height: 53,
                                                textAlign: 'left',
                                                width: '100%',
                                                alignItems: 'flex-start',
                                                justifyContent: 'flex-start',
                                                paddingTop: 14,
                                                paddingLeft: 20
                                            },
                                            placeholderText: {
                                                color: '#99A2B4',
                                                fontFamily: 'SF Pro Text',
                                                fontSize: 16,
                                                fontWeight: '400',
                                            },
                                            dateText:{
                                                color: '#444B69',
                                                fontFamily: 'SF Pro Text',
                                                fontSize: 16,
                                                fontWeight: '400',
                                            },
                                            btnTextConfirm: {
                                                color: '#E94C89',
                                                fontSize: 16,
                                                fontFamily: 'SF Pro Text',
                                                fontWeight: '600'
                                            },
                                            btnTextCancel: {
                                                color: '#444B69',
                                                fontSize: 16,
                                                fontFamily: 'SF Pro Text',
                                                fontWeight: '600'
                                            }
                                        }}
                                        onDateChange={(date, fullDate) => {this.confirmSheduleDate(date, fullDate)}}
                                    />
                                    {this.state.date && this.state.date.length > 5 ? <IconCalendarActive style={{position: 'absolute', right: 20, top: 27}}/> : <IconInputCalendar style={{position: 'absolute', right: 20, top: 27}}/>}
                                </View>
                            </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 35}}>
                            <View>
                                <TouchableOpacity onPress={this.toggleModalSchedule} style={styles.modalButtonCancel}>
                                    <Text style={styles.modalButtonCancelText}>ОТМЕНА</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={this.toggleModalSchedule} style={styles.saveBlock}>
                                    <Text style={{fontSize: 14, fontFamily: 'SF Pro Text', fontWeight: '600', textAlign: 'center', color: '#FFF'}}>СОХРАНИТЬ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isModalTime} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={{height: 75, backgroundColor: '#556086', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 16, fontWeight: '500', marginLeft: 25}}>Время мероприятия</Text>
                            <TouchableOpacity onPress={this.toggleModalTime} style={{marginLeft: 'auto', marginRight: 24}}><IconFilterClose/></TouchableOpacity>
                        </View>
                        <View style={{backgroundColor: '#FFF', paddingTop: 0, paddingLeft: 24, paddingRight: 24, paddingBottom: 40}}>
                            <View style={{marginTop: 40, marginLeft: 24, marginRight: 24, flexDirection: 'row', justifyContent: 'space-around'}}>
                                <View style={{justifyContent: 'center',paddingRight: 30}}>
                                    <Text style={{fontFamily: 'SF Pro Text', color: '#444B69', fontSize: 16, fontWeight: '500', width: 140, textAlign: 'center'}}>Начало</Text>
                                    <DatePicker
                                        style={{width: '100%', marginTop: 15}}
                                        date={this.state.timeStart}
                                        mode="time"
                                        locale={'ru'}
                                        placeholder="00 : 00"
                                        confirmBtnText="Принять"
                                        cancelBtnText="Закрыть"
                                        showIcon={false}
                                        customStyles={{
                                            dateInput: {
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                borderColor: '#DEE2EB',
                                                height: 53,
                                                textAlign: 'left',
                                                width: '100%',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            },
                                            placeholderText: {
                                                color: '#99A2B4',
                                                fontFamily: 'SF Pro Text',
                                                fontSize: 16,
                                                fontWeight: '400',
                                            },
                                            dateText:{
                                                color: '#444B69',
                                                fontFamily: 'SF Pro Text',
                                                fontSize: 16,
                                                fontWeight: '400',
                                            },
                                            btnTextConfirm: {
                                                color: '#E94C89',
                                                fontSize: 16,
                                                fontFamily: 'SF Pro Text',
                                                fontWeight: '600'
                                            },
                                            btnTextCancel: {
                                                color: '#444B69',
                                                fontSize: 16,
                                                fontFamily: 'SF Pro Text',
                                                fontWeight: '600'
                                            }
                                        }}
                                        onDateChange={(timeStart) => {this.setState({timeStart: timeStart})}}
                                    />
                                </View>
                                <View>
                                    <View style={{backgroundColor: '#DEE2EB', height: 1, width: 17, top: 51, marginLeft: 20, marginRight: 20}}/>
                                </View>
                                <View style={{justifyContent: 'center', paddingLeft: 30}}>
                                    <Text style={{fontFamily: 'SF Pro Text', color: '#444B69', fontSize: 16, fontWeight: '500', width: 140, textAlign: 'center'}}>Конец</Text>
                                    <DatePicker
                                        style={{width: '100%', marginTop: 15}}
                                        date={this.state.timeEnd}
                                        mode="time"
                                        locale={'ru'}
                                        placeholder="00 : 00"
                                        confirmBtnText="Принять"
                                        cancelBtnText="Закрыть"
                                        showIcon={false}
                                        customStyles={{
                                            dateInput: {
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                borderColor: '#DEE2EB',
                                                height: 53,
                                                textAlign: 'left',
                                                width: '100%',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            },
                                            placeholderText: {
                                                color: '#99A2B4',
                                                fontFamily: 'SF Pro Text',
                                                fontSize: 16,
                                                fontWeight: '400',
                                            },
                                            dateText:{
                                                color: '#444B69',
                                                fontFamily: 'SF Pro Text',
                                                fontSize: 16,
                                                fontWeight: '400',
                                            },
                                            btnTextConfirm: {
                                                color: '#E94C89',
                                                fontSize: 16,
                                                fontFamily: 'SF Pro Text',
                                                fontWeight: '600'
                                            },
                                            btnTextCancel: {
                                                color: '#444B69',
                                                fontSize: 16,
                                                fontFamily: 'SF Pro Text',
                                                fontWeight: '600'
                                            }
                                        }}
                                        onDateChange={(timeEnd) => {this.setState({timeEnd: timeEnd})}}
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                <TouchableOpacity onPress={()=>{ this.setState({timeStart: '', timeEnd: ''}); this.toggleModalTime(); } } style={styles.outerButton}>
                                    <Text style={styles.textButtonCancel}>ОТМЕНА</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.state.timeStart && this.state.timeEnd ? this.toggleModalTime : null} style={this.state.timeStart && this.state.timeEnd ? styles.saveBlock : styles.outerButton}>
                                    <Text style={{fontSize: 14, fontFamily: 'SF Pro Text', fontWeight: '600', textAlign: 'center', color: '#FFF'}}>ВЫБРАТЬ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isModalCopyTimeState} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={styles.modalMinTitleBlock}>
                            <Text>
                                <IconEventChat style={{marginRight: 14}}/>
                                <Text style={styles.modalMinTitle}>Дублировать время?</Text>
                            </Text>
                        </View>
                        <View style={styles.modalMinDescBlock}>
                            <Text style={styles.modalMinDesc}>
                                Продублировать время, которое указывали для предыдущей даты?
                            </Text>
                        </View>
                        <View style={styles.modalMinButtonsBlock}>
                            <TouchableOpacity onPress={this.toggleModalCopyTime} style={styles.modalMinCancel}>
                                <Text style={styles.modalMinCancelText}>ОТМЕНА</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.toggleModalCopyTime} style={styles.modalMinConfirm}>
                                <Text style={styles.modalMinConfirmText}>ДА</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isModalDeleteTime} style={styles.modalDelete}>
                    <View style={styles.modalDeleteMinContent}>
                        <View style={styles.modalMinTitleBlock}>
                            <IconModalTrash style={{marginRight: 10}}/>
                            <Text style={styles.modalDeleteMinTitle}>Удалить?</Text>
                        </View>
                        <View style={styles.modalDeleteMinDescBlock}>
                            <Text style={styles.modalDeleteMinDesc}>
                                Удалить время ?
                            </Text>
                        </View>
                        <View style={styles.modalDeleteMinButtonsBlock}>
                            <TouchableOpacity onPress={()=>this.toggleModalDeleteTime()} style={styles.modalMinCancel}>
                                <Text style={styles.modalDeleteMinCancelText}>ОТМЕНА</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.confirmDeleteSheduleTime()} style={styles.modalMinConfirm}>
                                <Text style={styles.modalDeleteMinConfirmText}>УДАЛИТЬ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isModalPeriod} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={{height: 75, backgroundColor: '#556086', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 16, fontWeight: '500', marginLeft: 25}}>Укажите период проведения</Text>
                            <TouchableOpacity onPress={this.toggleModalPeriod} style={{marginLeft: 'auto', marginRight: 24}}><IconFilterClose/></TouchableOpacity>
                        </View>
                        <View style={{backgroundColor: '#FFF', paddingTop: 0, paddingLeft: 24, paddingRight: 24, paddingBottom: 40}}>
                            <View style={{marginTop: 40}}>
                                <View>
                                    <Text style={{color: '#444B69', fontSize: 16, fontWeight: '500', fontFamily: 'SF Pro Text'}}>Дата начала</Text>
                                    <DatePicker
                                        style={{width: '100%', marginTop: 15}}
                                        date={this.state.periodStart}
                                        mode="date"
                                        placeholder="Начало мероприятия"
                                        locale={'ru'}
                                        format="LL, dddd"
                                        confirmBtnText="Принять"
                                        cancelBtnText="Закрыть"
                                        showIcon={false}
                                        customStyles={{
                                            dateInput: {
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                borderColor: this.state.errInputPeriod == '1' ? 'red':'#DEE2EB',
                                                height: 53,
                                                textAlign: 'left',
                                                width: '100%',
                                                alignItems: 'flex-start',
                                                justifyContent: 'flex-start',
                                                paddingTop: 14,
                                                paddingLeft: 20
                                            },
                                            placeholderText: {
                                                color: '#99A2B4',
                                                fontFamily: 'SF Pro Text',
                                                fontSize: 16,
                                                fontWeight: '400',
                                            },
                                            dateText:{
                                                color: '#444B69',
                                                fontFamily: 'SF Pro Text',
                                                fontSize: 16,
                                                fontWeight: '400',
                                            },
                                            btnTextConfirm: {
                                                color: '#E94C89',
                                                fontSize: 16,
                                                fontFamily: 'SF Pro Text',
                                                fontWeight: '600'
                                            },
                                            btnTextCancel: {
                                                color: '#444B69',
                                                fontSize: 16,
                                                fontFamily: 'SF Pro Text',
                                                fontWeight: '600'
                                            }
                                        }}
                                        onDateChange={(date, notFormattedDateStart) => {this.setState({periodStart: date, errInputPeriod: '', notFormattedDateStart: notFormattedDateStart})}}
                                    />
                                    {this.state.periodStart.length > 5 ? <IconCalendarActive style={{position: 'absolute', right: 20, top: 45}}/> : <IconInputCalendar style={{position: 'absolute', right: 20, top: 45}}/>}
                                </View>
                            </View>
                            <View style={{marginTop: 40}}>
                                <View>
                                    <Text style={{color: '#444B69', fontSize: 16, fontWeight: '500', fontFamily: 'SF Pro Text'}}>Дата конца</Text>
                                    <DatePicker
                                        style={{width: '100%', marginTop: 15}}
                                        date={this.state.periodEnd}
                                        mode="date"
                                        placeholder="Конец мероприятия"
                                        locale={'ru'}
                                        format="LL, dddd"
                                        confirmBtnText="Принять"
                                        cancelBtnText="Закрыть"
                                        showIcon={false}
                                        customStyles={{
                                            dateInput: {
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                borderColor: this.state.errInputPeriod == '2' ? 'red' : '#DEE2EB',
                                                height: 53,
                                                textAlign: 'left',
                                                width: '100%',
                                                alignItems: 'flex-start',
                                                justifyContent: 'flex-start',
                                                paddingTop: 14,
                                                paddingLeft: 20
                                            },
                                            placeholderText: {
                                                color: '#99A2B4',
                                                fontFamily: 'SF Pro Text',
                                                fontSize: 16,
                                                fontWeight: '400',
                                            },
                                            dateText:{
                                                color: '#444B69',
                                                fontFamily: 'SF Pro Text',
                                                fontSize: 16,
                                                fontWeight: '400',
                                            },
                                            btnTextConfirm: {
                                                color: '#E94C89',
                                                fontSize: 16,
                                                fontFamily: 'SF Pro Text',
                                                fontWeight: '600'
                                            },
                                            btnTextCancel: {
                                                color: '#444B69',
                                                fontSize: 16,
                                                fontFamily: 'SF Pro Text',
                                                fontWeight: '600'
                                            }
                                        }}
                                        onDateChange={(date, notFormattedDateEnd) => {this.setState({periodEnd: date, errInputPeriod: '', notFormattedDateEnd: notFormattedDateEnd})}}
                                    />
                                    {this.state.periodEnd.length > 5 ? <IconCalendarActive style={{position: 'absolute', right: 20, top: 45}}/> : <IconInputCalendar style={{position: 'absolute', right: 20, top: 45}}/>}
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                <TouchableOpacity onPress={this.toggleModalPeriod} style={{width: 155, borderRadius: 10, backgroundColor: '#F0F1F3', paddingTop: 18, paddingBottom: 18, marginTop: 50}}>
                                    <Text style={{fontSize: 14, fontFamily: 'SF Pro Text', fontWeight: '600', textAlign: 'center', color: '#444B69'}}>ОТМЕНА</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.confirmPeriod()} style={{width: 155, borderRadius: 10, backgroundColor: '#E94C89', paddingTop: 18, paddingBottom: 18, marginTop: 50}}>
                                    <Text style={{fontSize: 14, fontFamily: 'SF Pro Text', fontWeight: '600', textAlign: 'center', color: '#FFF'}}>ВЫБРАТЬ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isModalDateStart} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={{height: 75, backgroundColor: '#556086', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 16, fontWeight: '500', marginLeft: 25}}>Укажите период проведения</Text>
                            <TouchableOpacity onPress={this.toggleModalDateStart} style={{marginLeft: 'auto', marginRight: 24}}><IconFilterClose/></TouchableOpacity>
                        </View>
                        <View style={{backgroundColor: '#FFF', paddingTop: 0, paddingLeft: 24, paddingRight: 24, paddingBottom: 40}}>
                            <View style={{marginTop: 40}}>
                                <View>
                                    <Text style={{color: '#444B69', fontSize: 16, fontWeight: '500', fontFamily: 'SF Pro Text'}}>Дата начала</Text>
                                    <DatePicker
                                        style={{width: '100%', marginTop: 15}}
                                        date={this.state.inputDateStart}
                                        mode="date"
                                        placeholder="Начало мероприятия"
                                        locale={'ru'}
                                        format="LL, dddd"
                                        confirmBtnText="Принять"
                                        cancelBtnText="Закрыть"
                                        showIcon={false}
                                        customStyles={{
                                            dateInput: {
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                borderColor: this.state.errInputPeriod == '1' ? 'red':'#DEE2EB',
                                                height: 53,
                                                textAlign: 'left',
                                                width: '100%',
                                                alignItems: 'flex-start',
                                                justifyContent: 'flex-start',
                                                paddingTop: 14,
                                                paddingLeft: 20
                                            },
                                            placeholderText: {
                                                color: '#99A2B4',
                                                fontFamily: 'SF Pro Text',
                                                fontSize: 16,
                                                fontWeight: '400',
                                            },
                                            dateText:{
                                                color: '#444B69',
                                                fontFamily: 'SF Pro Text',
                                                fontSize: 16,
                                                fontWeight: '400',
                                            },
                                            btnTextConfirm: {
                                                color: '#E94C89',
                                                fontSize: 16,
                                                fontFamily: 'SF Pro Text',
                                                fontWeight: '600'
                                            },
                                            btnTextCancel: {
                                                color: '#444B69',
                                                fontSize: 16,
                                                fontFamily: 'SF Pro Text',
                                                fontWeight: '600'
                                            }
                                        }}
                                        onDateChange={(date) => {this.setState({inputDateStart: date})}}
                                    />
                                    {this.state.periodStart.length > 5 ? <IconCalendarActive style={{position: 'absolute', right: 20, top: 45}}/> : <IconInputCalendar style={{position: 'absolute', right: 20, top: 45}}/>}
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                <TouchableOpacity onPress={this.toggleModalDateStart} style={{width: 155, borderRadius: 10, backgroundColor: '#F0F1F3', paddingTop: 18, paddingBottom: 18, marginTop: 50}}>
                                    <Text style={{fontSize: 14, fontFamily: 'SF Pro Text', fontWeight: '600', textAlign: 'center', color: '#444B69'}}>ОТМЕНА</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.confirmDateStart()} style={{width: 155, borderRadius: 10, backgroundColor: '#E94C89', paddingTop: 18, paddingBottom: 18, marginTop: 50}}>
                                    <Text style={{fontSize: 14, fontFamily: 'SF Pro Text', fontWeight: '600', textAlign: 'center', color: '#FFF'}}>ВЫБРАТЬ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isModalCategory} style={styles.filter}>
                    <View style={styles.filterContent}>
                        <View style={styles.filterTop}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.textClose}>Выберите категории</Text>
                                <TouchableOpacity style={{marginLeft: 'auto'}} onPress={this.toggleCategory}>
                                    <IconClose/>
                                </TouchableOpacity>
                            </View>
                            <SearchBar
                                placeholder="Поиск по категориям"
                                onChangeText={this.updateSearch}
                                searchIcon={Search}
                                containerStyle={styles.searchBarContainer}
                                inputContainerStyle={{backgroundColor: '#606C93', marginTop: -5}}
                                placeholderTextColor="#FFF"
                                inputStyle={styles.SearchBarInputStyle}
                            />
                        </View>
                        <View style={styles.filterListStation}>
                            <ScrollView style={{paddingLeft: 24, paddingRight: 24}} contentContainerStyle={{ paddingTop: 30, paddingBottom: 30}}>
                            {
                                this.state.categoryArr ?
                                    this.state.categoryArr.map((item, index)=>(
                                        <CheckBox
                                            title={item.name}
                                            checkedIcon={<IconChecked/>}
                                            uncheckedIcon={<IconUnchecked/>}
                                            checked={item.checked}
                                            onPress={() => this.toogleCheckedCategory(index, item)}
                                            containerStyle={{padding: 0, margin: 0, backgroundColor:'transparent', marginLeft: 0, marginRight: 0, borderWidth: 0, marginTop: 5, marginBottom: 5}}
                                            textStyle={{color: '#444B69', fontSize: 16, fontFamily: 'SF Pro Text', fontWeight: '400'}}
                                            key={index}
                                        />
                                    )):
                                    <NothingForPrev tabName={'категории'} />
                            }
                            </ScrollView>
                        </View>
                        <View style={styles.buttonsBlock}>
                            <TouchableOpacity onPress={this.toggleCategory} style={styles.buttonCancel}>
                                <Text style={styles.buttonCancelText}>Отмена</Text>
                            </TouchableOpacity>
                            <TouchableOpacity   style={styles.buttonChoice} 
                                                onPress={()=>this.submitCheckedCategory()}>
                                <Text style={styles.buttonChoiceText}>Выбрать</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isModalCreated} style={styles.modal}>
                    <View style={styles.modalMinContentNew}>
                        <View style={styles.modalMinTitleBlock}>
                            <View style={{flexDirection: 'row'}}>
                                <IconCompanyCreated style={{marginRight: 14}}/>
                                <View>
                                    <Text style={styles.modalMinTitle}>Событие успешно{'\n'}создано</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.modalMinDescBlock}>
                            <Text style={styles.modalMinDesc}>
                                Активация будет произведена после модерации.
                            </Text>
                        </View>
                        <View style={styles.modalMinButtonsBlock}>
                            <TouchableOpacity onPress={this.toggleModalCreated} style={styles.modalMinConfirm}>
                                <Text style={styles.modalMinConfirmText}>ОК</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isModalSheduleTime} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={{height: 75, backgroundColor: '#556086', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 16, fontWeight: '500', marginLeft: 25}}>Время мероприятия</Text>
                            <TouchableOpacity onPress={this.toggleModalSheduleTime} style={{marginLeft: 'auto', marginRight: 24}}><IconFilterClose/></TouchableOpacity>
                        </View>
                        <View style={{backgroundColor: '#FFF', paddingTop: 0, paddingLeft: 24, paddingRight: 24, paddingBottom: 40}}>
                            <View style={{marginTop: 40, marginLeft: 24, marginRight: 24, flexDirection: 'row', justifyContent: 'space-around'}}>
                                <View style={{justifyContent: 'center',paddingRight: 30}}>
                                    <Text style={{fontFamily: 'SF Pro Text', color: '#444B69', fontSize: 16, fontWeight: '500', width: 140, textAlign: 'center'}}>Начало</Text>
                                    <DatePicker
                                        style={{width: '100%', marginTop: 15}}
                                        date={this.state.timeSheduleStart}
                                        mode="time"
                                        locale={'ru'}
                                        placeholder="00 : 00"
                                        confirmBtnText="Принять"
                                        cancelBtnText="Закрыть"
                                        showIcon={false}
                                        customStyles={{
                                            dateInput: {
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                borderColor: '#DEE2EB',
                                                height: 53,
                                                textAlign: 'left',
                                                width: '100%',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            },
                                            placeholderText: {
                                                color: '#99A2B4',
                                                fontFamily: 'SF Pro Text',
                                                fontSize: 16,
                                                fontWeight: '400',
                                            },
                                            dateText:{
                                                color: '#444B69',
                                                fontFamily: 'SF Pro Text',
                                                fontSize: 16,
                                                fontWeight: '400',
                                            },
                                            btnTextConfirm: {
                                                color: '#E94C89',
                                                fontSize: 16,
                                                fontFamily: 'SF Pro Text',
                                                fontWeight: '600'
                                            },
                                            btnTextCancel: {
                                                color: '#444B69',
                                                fontSize: 16,
                                                fontFamily: 'SF Pro Text',
                                                fontWeight: '600'
                                            }
                                        }}
                                        onDateChange={(timeSheduleStart, fullTimeSheduleStart) => {this.setState({timeSheduleStart: timeSheduleStart, fullTimeSheduleStart: fullTimeSheduleStart})}}
                                    />
                                </View>
                                <View>
                                    <View style={{backgroundColor: '#DEE2EB', height: 1, width: 17, top: 51, marginLeft: 20, marginRight: 20}}/>
                                </View>
                                <View style={{justifyContent: 'center', paddingLeft: 30}}>
                                    <Text style={{fontFamily: 'SF Pro Text', color: '#444B69', fontSize: 16, fontWeight: '500', width: 140, textAlign: 'center'}}>Конец</Text>
                                    <DatePicker
                                        style={{width: '100%', marginTop: 15}}
                                        date={this.state.timeSheduleEnd}
                                        mode="time"
                                        locale={'ru'}
                                        placeholder="00 : 00"
                                        confirmBtnText="Принять"
                                        cancelBtnText="Закрыть"
                                        showIcon={false}
                                        customStyles={{
                                            dateInput: {
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                borderColor: '#DEE2EB',
                                                height: 53,
                                                textAlign: 'left',
                                                width: '100%',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            },
                                            placeholderText: {
                                                color: '#99A2B4',
                                                fontFamily: 'SF Pro Text',
                                                fontSize: 16,
                                                fontWeight: '400',
                                            },
                                            dateText:{
                                                color: '#444B69',
                                                fontFamily: 'SF Pro Text',
                                                fontSize: 16,
                                                fontWeight: '400',
                                            },
                                            btnTextConfirm: {
                                                color: '#E94C89',
                                                fontSize: 16,
                                                fontFamily: 'SF Pro Text',
                                                fontWeight: '600'
                                            },
                                            btnTextCancel: {
                                                color: '#444B69',
                                                fontSize: 16,
                                                fontFamily: 'SF Pro Text',
                                                fontWeight: '600'
                                            }
                                        }}
                                        onDateChange={(timeSheduleEnd, fullTimeSheduleEnd) => {this.setState({timeSheduleEnd: timeSheduleEnd, fullTimeSheduleEnd: fullTimeSheduleEnd})}}
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                <TouchableOpacity onPress={()=>{ this.setState({timeSheduleStart: '', timeSheduleEnd: ''}); ()=>this.toggleModalSheduleTime(); } } style={styles.outerButton}>
                                    <Text style={styles.textButtonCancel}>ОТМЕНА</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.state.timeSheduleStart && this.state.timeSheduleEnd ? ()=>{this.toggleModalSheduleTime(); setTimeout(()=>this.toggleModalSchedule(), 400); this.setSheduleTime() } : null} style={this.state.timeSheduleStart && this.state.timeSheduleEnd ? styles.saveBlock : styles.outerButton}>
                                    <Text style={{fontSize: 14, fontFamily: 'SF Pro Text', fontWeight: '600', textAlign: 'center', color: '#FFF'}}>ВЫБРАТЬ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

export default CreateEvent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#556086'
    },
    textContainer: {
        marginTop: 10,
        backgroundColor: '#FFF',
        flex: 1,
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
    },
    photoItem: {
        marginTop: 9,
        marginRight: 15
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
    modal: {
        margin: 0,
        backgroundColor: 'rgba(31, 35, 52, 0.6)'
    },
    modalMinContent: {
        backgroundColor: '#FFF',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden'
    },
    modalMinContentNew: {
        marginLeft: 24,
        marginRight: 24,
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 24,
    },
    modalDelete: {
        margin: 0,
        backgroundColor: 'rgba(31, 35, 52, 0.6)'
    },
    modalDeleteMinContent: {
        marginLeft: 24,
        marginRight: 24,
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 24,
    },
    modalDeleteMinTitleBlock: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    modalDeleteMinDescBlock: {
        marginTop: 20,
        marginLeft: 30,
    },
    modalDeleteMinButtonsBlock: {
        marginTop: 35,
        marginLeft: 30,
        flexDirection: 'row'
    },
    modalDeleteMinTitle: {
        color: '#444B69',
        fontSize: 19,
        fontFamily: 'SF Pro Text',
        fontWeight: '500',
        paddingRight: 20
    },
    modalDeleteMinDesc: {
        fontSize: 16,
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        lineHeight: 24
    },
    modalDeleteMinCancelText: {
        color: '#444B69',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '500',
        textAlign: 'center'
    },
    modalDeleteMinConfirmText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '500',
        textAlign: 'center'
    },
    modalDeleteMinConfirm: {
        backgroundColor: '#42BCBC',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 10,
        width: 118,
        marginLeft: 'auto'
    },
    timeInput: {
        color: '#99A2B4',
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        marginTop: 15,
        marginLeft: 20
    },
    timeInputActive: {
        color: '#444B69',
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        marginTop: 15,
        marginLeft: 20
    },
    filterCalendarContent: {
        position: 'absolute',
        bottom: 0,
        minHeight: 500,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#FFF'
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
    filterRow: {
        backgroundColor: '#E2E5EB',
        borderRadius: 10,
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 24,
        marginBottom: 10
    },
    filterRowNR: {
        backgroundColor: '#E2E5EB',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 24
    },
    filterName: {
        color: '#444B69',
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E2E5EB',
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 17,
        paddingBottom: 17
    },
    filterButtonText: {
        color: '#444B69',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '500'
    },
    filterContainer: {
        backgroundColor: '#F0F1F3',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 24
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
    textSlider: {
        color: '#444B69',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '500'
    },
    textClose: {
        color: '#FFF',
        fontFamily: 'SF Pro Text',
        fontSize: 16,
        fontWeight: '500'
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
    buttonEnter: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DEE2EB',
        height: 53,
        marginTop: 10
    },
    timeBlock: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DEE2EB',
        height: 53,
        marginTop: 10
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
    outerButton: {
        width: 155,
        borderRadius: 10,
        backgroundColor: '#F0F1F3',
        paddingTop: 18,
        paddingBottom: 18,
        marginTop: 50
    },
    textButtonCancel: {
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '600',
        textAlign: 'center',
        color: '#444B69'
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
    buttonEnterText: {
        color: '#99A2B4',
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        marginTop: 15,
        marginLeft: 20
    },
    inputCheck: {
        position: 'absolute',
        right: 20,
        top: 30
    },
    startEndBlock: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DEE2EB',
        height: 53,
        marginTop: 10
    },
    soonBlock: {
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        marginTop: 10,
        fontSize: 13
    },
    createBlock: {
        marginTop: 50,
        borderRadius: 10,
        backgroundColor: '#E94C89',
        paddingTop: 17,
        paddingBottom: 17
    },
    modalButtonCancel: {
        width: 155,
        borderRadius: 10,
        backgroundColor: '#F0F1F3',
        paddingTop: 18,
        paddingBottom: 18,
        marginTop: 50
    },
    modalButtonCancelText: {
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '600',
        textAlign: 'center',
        color: '#444B69'
    },
    createBlockText: {
        color: '#FFF',
        textTransform: 'uppercase',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '600',
        textAlign: 'center'
    },
    radioButtonBlock: {
        borderRadius: 10,
        backgroundColor: '#E94C89',
        paddingTop: 18,
        paddingBottom: 18,
        marginTop: 50
    },
    saveBlock: {
        width: 155,
        borderRadius: 10,
        backgroundColor: '#E94C89',
        paddingTop: 18,
        paddingBottom: 18,
        marginTop: 50
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
    photoItem: {
        marginTop: 9,
        marginRight: 15
    },
    photoElem: {
        width: 83,
        height: 83,
        borderRadius: 12
    },
});