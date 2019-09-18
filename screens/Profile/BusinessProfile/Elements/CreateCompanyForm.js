import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
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
import IconInst from '../../../../assets/images/social/inst';
import IconOk from '../../../../assets/images/social/ok';
import IconClose from "../../../../assets/images/icons/icon-close";
import Search from "../../../../assets/images/icons/search";
import IconChecked from "../../../../assets/images/icons/icon-checked";
import IconUnchecked from "../../../../assets/images/icons/icon-unchecked";
import IconPhotoRemove from '../../../../assets/images/icons/icon-photo-remove';

//helpers
import {replacerSpecialCharacters, onlyNumbers} from '../../../../helpers/helpers';
import NothingForPrev from '../../../Components/nothingForPreview'

export default class CreateCompanyForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalCategory: false,
            inputName: '',
            inputAge: '',
            ageMin: '',
            ageMax: '',
            inputCategory: '',
            inputPhone: '',
            inputEmail: false,
            inputSite: '',
            inputDesc: '',
            socialArr: [],
            mediaContent: [],
            temp: '',
            photos: [],
            newArr: [],
            addresses: [{}],
        }
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
            
        }).then((res) => {
            let temp = res.data;  
            let { params } = this.props.navigation.state;          
            temp.map(item => {
                item.checked = false;                
            })
            this.setState({categoryArr: temp})

            this.getCategories(params.companyEdit.company.categories)

        }).catch(err =>{console.log(err)})
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
        let temp = this.state.arrForSearch.map(item => {
            return item.name
        })
        let idArrForSearch = this.state.arrForSearch.map(item => {
            return item.id
        })
        this.setState({ inputCategory: temp.join(', '), idArrForSearch: idArrForSearch});
        this.toggleCategory()
    }
    handleChangeAge = (text) => {
        let temp = onlyNumbers(text);
        let pureVal = temp ? ( temp.length < 2 ? `${temp[0]||''}${temp[1]||''}` : `${temp[0]||''}${temp[1]||''}/${temp[3]||''}${temp[4]||''}`):''
        this.setState({ inputAge: pureVal, ageMin: temp[0]+temp[1], ageMax: temp[3]+temp[4]})
        
    }
    handleChangeInput = (value, name) =>{
        let pureValue = replacerSpecialCharacters(value);
        this.setState({[name]: pureValue, errPhone: ''})
    }
    handleChangeEmail = (text) => {
        let pureValue = replacerSpecialCharacters(text);
        this.setState({ inputEmail: pureValue })
    }
    handleChangeSite = (text) => {
        let pureValue = replacerSpecialCharacters(text);
        this.setState({ inputSite: pureValue })
    }
    handleClickSocial = (item, itemUrl) => {
        let temp = this.state.socialArr;
        if(temp){
            temp.push(item)            
        }else{
            temp = [item]
        }
        
        this.setState({ socialArr: temp})
    }
    handleChangeSocial = (text, index) => {
        let temp = this.state.socialArr;
        // console.log(text.length);
        
        text.match(/https:\/\//gi)?
        temp[index].link = text:
        temp[index].link = `https://${text}`

        this.setState({socialArr: temp})        
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
        
        // CameraRoll.getPhotos({
        //     first: 20,
        //     assetType: 'All'
        //   })
        //   .then(r => { 
        //     this.setState({ photos: r.edges })
        //    })
    }
    submitCompanyInform = (save) => {
        if (save) {
            let {
                inputName, 
                inputPhone, 
                inputEmail, 
                inputSite, 
                inputDesc,
                mediaContent, 
                arrForSearch, 
                addresses, 
                ageMin,
                ageMax,
                socialArr,
                gallery_items } = this.state;
                console.log('state=--',this.state);
                
                const data = new FormData();
               
                mediaContent.length && mediaContent.forEach( (image, index) => {
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
                    ):null;
                        
                    element.id && 
                        data.append(`addresses[${index}][id]`, element.id)
                })
                socialArr && socialArr.forEach((element, index) => {
                    data.append(`soc[${index}][url]`, element.link);
                    data.append(`soc[${index}][key]`, element.name);
    
                })
                gallery_items && gallery_items.forEach((old_image, index) => {
                    let old_img = {
                        id: old_image.id,
                    }
                    console.log('old_image',old_image)
                    
                    data.append(`gallery_items[${index}][id]`, old_img.id)
                    
                })
                if (gallery_items.length === 0) {
                    data.append(`gallery_items`, new Array())
                }
                data.append('name', inputName);
                data.append('age_min', +ageMin);
                data.append('age_max', +ageMax);
                data.append('phone', inputPhone);
                data.append('email', inputEmail);
                data.append('site', inputSite);
                data.append('about', inputDesc);
                data.append('_method', 'PUT')
            axios({
                method: 'POST',
                baseURL: `https://mamado.elgrow.ru`,
                url: `/api/company/${this.props.navigation.state.params.companyEdit.company.id}`,
                data: data,
                headers: {
                    Authorization: this.state.token,
                    'content-type': 'multipart/form-data',
                    'accept': "application/json",
                }
            }).then(res => {
                this.props.navigation.goBack();
            })
            .catch(err=>{ console.log(err, data) })
        } else {
            let {
                inputName, 
                inputPhone, 
                inputEmail, 
                inputSite, 
                inputDesc,
                mediaContent, 
                arrForSearch, 
                addresses, 
                ageMin,
                ageMax,
                socialArr } = this.state;
    
                const data = new FormData();
               
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
                data.append('name', inputName);
                data.append('age_min', +ageMin);
                data.append('age_max', +ageMax);
                data.append('phone', inputPhone);
                data.append('email', inputEmail);
                data.append('site', inputSite);
                data.append('about', inputDesc);
                
                
    
            axios({
                method: 'POST',
                baseURL: `https://mamado.elgrow.ru`,
                url: '/api/company',
                data: data,
                headers: {
                    Authorization: this.state.token,
                    'accept': "application/json",
                    'content-type': 'multipart/form-data',
                }
            }).then(res => {
                this.props.navigation.navigate('RequisitesPage', {prevRoute: 'BusinessOuter', companyCreated: true, companyId: res.data.company.id});
            })
            .catch(err=>{ console.log(err, data) })
        }
        
    }
    //this is trouble!!!!
    removeMedia = (index) => {
        let mediaArr = this.state.mediaContent;
        let oldMedia = this.state.gallery_items
        mediaArr.splice(index,1);
        oldMedia.splice(index,1);
        this.setState({mediaContent: mediaArr, gallery_items: oldMedia})
    }
    getCategories = categories => {
        if(categories.length !== 0){
            checkedCategoeies = this.state.categoryArr && this.state.categoryArr.map(item => {
                categories.forEach(elem => {
                    if(elem.id === item.id){
                        item.checked = !item.checked
                    }
                })
                return item
            })
            let newCategoryCheckedArr = checkedCategoeies.filter( item=> { return item.checked}).map(item=>{return {id: item.id, name: item.name} })
            let inputCategories = newCategoryCheckedArr.map(item=>{
                return item.name
            })        
            this.setState({categoryArr: checkedCategoeies, arrForSearch: newCategoryCheckedArr, inputCategory: inputCategories.join(' ,')})
        }
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
                // address.splice(address.length, 0, {});

                this.setState({addresses: address})
            }
        }        
    }
    componentDidMount(){
        this.getCategory();
        this.getT()
        let { params } = this.props.navigation.state         
        if (params && params.address) {
            this.setState({addresses: params.address})
        }
        if(params && params.companyEdit){
            let company = params.companyEdit;
            console.log(company);
            
            this.setState({
                inputName:  company.company.name,
                inputAge:   `${company.company.age_min}/${company.company.age_max}`,
                inputPhone: company.company.phone,
                inputEmail: company.company.email,
                inputSite:  company.company.site,
                inputDesc:  params.companyDesc || company.company.about,
                socialArr:  company.company.soc || [],
                gallery_items:   company.company.gallery_items,
                addresses: params.address || company.company.addresses
            })
        }
    }
    render(){
        console.log('stateCCF', this.state);
        console.log('propsCCF', this.props);
        
        return(
            <>
            <View style={styles.textContainer}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>Название компании</Text>
                            <View>
                                <Input  placeholderTextColor="#99A2B4"
                                        value={this.state.inputName}
                                        onChangeText={ (text) => this.handleChangeInput(text, 'inputName') } 
                                        placeholder="Не указано" 
                                        inputContainerStyle={styles.inputContainer} 
                                        inputStyle={styles.inputStyle} 
                                        containerStyle={styles.inputContainerStyle}
                                        />
                                        {this.state.inputName.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
                                        
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={this.state.inputName.length > 5 ? styles.labelActive : styles.labelNotActive}>Возраст детей</Text>
                            <View>
                                <Input  placeholderTextColor="#99A2B4" 
                                        editable={this.state.inputName.length > 4 ? true : false} 
                                        value={this.state.inputAge} 
                                        onChangeText={ (text) => this.handleChangeAge(text) }  
                                        placeholder="от / до" 
                                        inputContainerStyle={styles.inputContainer} 
                                        inputStyle={styles.inputStyle} 
                                        containerStyle={styles.inputContainerStyle}
                                />
                                {
                                    this.state.inputAge.length > 4 ? 
                                        <InputCheck style={styles.inputCheck}/> : 
                                        null
                                }
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={this.state.inputAge.length > 4 ? styles.labelActive : styles.labelNotActive}>Категория</Text>
                            <TouchableOpacity onPress={ this.state.inputAge.length > 4 ? this.toggleCategory : null }>
                            <View>
                                <TouchableOpacity   style={[styles.inputStyle, styles.inputContainerStyle]}
                                                    onPress={ this.state.inputAge.length > 4 ? this.toggleCategory : null } >
                                    <Text style={[styles.inputStyleTextText, {color: this.state.inputCategory.length ?  '#444B69' : '#99A2B4', paddingRight: 25}]} numberOfLines={1}>
                                        { this.state.inputCategory || 'Выберите категорию'}
                                    </Text>
                                    {this.state.inputCategory.length > 0 ? 
                                    <InputCheck style={{position: 'absolute', top: 23, right: 20}}/> : 
                                    <InputPlus style={{position: 'absolute', top: 19, right: 20}}/>
                                    }
                                </TouchableOpacity>
                            </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={this.state.inputCategory.length > 1 ? styles.labelActive : styles.labelNotActive}>Телефон компании</Text>
                            <View>
                                <TextInputMask  
                                    placeholderTextColor="#99A2B4" 
                                    editable={this.state.inputCategory.length > 5 ? true : false}
                                    style={[styles.inputStyle, styles.inputContainerStyle, styles.inputStyleText]}
                                    placeholder="Не указано"
                                    type={'cel-phone'}
                                    value={this.state.inputPhone}
                                    onChangeText={(value)=>this.handleChangeInput(value, 'inputPhone')}
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
                            <Text style={this.state.inputPhone.length > 5 ? styles.labelActive : styles.labelNotActive}>E-mail</Text>
                            <View>
                                <Input  placeholderTextColor="#99A2B4" 
                                        editable={this.state.inputPhone.length > 5 ? true : false} 
                                        onChangeText={ (text) => this.handleChangeInput(text, 'inputEmail') }  
                                        placeholder="Не указано" 
                                        inputContainerStyle={styles.inputContainer} 
                                        inputStyle={styles.inputStyle} 
                                        containerStyle={styles.inputContainerStyle}
                                        value={this.state.inputEmail}
                                        />
                                        {this.state.inputEmail.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={this.state.inputEmail.length > 5 ? styles.labelActive : styles.labelNotActive}>Сайт</Text>
                            <View>
                                <Input  placeholderTextColor="#99A2B4" 
                                        editable={this.state.inputEmail.length > 5 ? true : false} 
                                        onChangeText={ (text) => this.handleChangeInput(text, 'inputSite')} 
                                        placeholder="Не указано" 
                                        inputContainerStyle={styles.inputContainer} 
                                        inputStyle={styles.inputStyle} 
                                        containerStyle={styles.inputContainerStyle}
                                        value={this.state.inputSite}
                                        />
                                {this.state.inputSite.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={this.state.inputSite.length > 5 ? styles.labelActive : styles.labelNotActive}>Социальные сети</Text>
                            <View style={{flexDirection: 'row', marginTop: 15}}>
                                <TouchableOpacity   style={this.state.vk?[styles.iconOuter, styles.iconOuter_clicked_vk]:styles.iconOuter} 
                                                    onPress={()=>{this.state.inputSite.length > 3 ? (this.handleClickSocial({name: 'vk', link:''}), this.setState({vk: true})):'' }}>
                                    {
                                        this.state.vk ? 
                                            <IconVk style={{opacity: 1}} fill={'#fff'}/>:
                                            <IconVk style={{opacity: 0.6}}/>
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity   style={this.state.fb?[styles.iconOuter, styles.iconOuter_clicked_fb]:styles.iconOuter} 
                                                    onPress={()=>this.state.inputSite.length > 3 ? (this.handleClickSocial({name: 'Fb', link:''}), this.setState({fb: true})):'' }>
                                    {
                                        this.state.fb?
                                            <IconFb style={{opacity: 1}} fill={'#fff'}/>:
                                            <IconFb style={{opacity: 0.6}}/>
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity   style={this.state.inst?[styles.iconOuter, styles.iconOuter_clicked_inst]:styles.iconOuter} 
                                                    onPress={()=>this.state.inputSite.length > 3 ? (this.handleClickSocial({name: 'Inst', link:''}), this.setState({inst: true})):'' }>
                                    {
                                        this.state.inst?
                                        <IconInst style={{opacity: 1}} fill={'#fff'}/>:
                                        <IconInst style={{opacity: 0.6}}/>
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity   style={this.state.ok?[styles.iconOuterLast, styles.iconOuter_clicked_ok]:styles.iconOuterLast} 
                                                    onPress={()=>this.state.inputSite.length > 3 ? (this.handleClickSocial({name: 'Ok', link:''}), this.setState({ok: true})):'' }>
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
                                            value = {item.link || item.url}
                                    />                                    
                                ))
                            }
                            
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
                            <Text style={this.state.inputEmail.length > 5 ? styles.labelActive : styles.labelNotActive}>Описание</Text>
                            <View>
                                <Input  placeholderTextColor="#99A2B4" 
                                        editable={this.state.inputEmail.length > 5 ? true : false} 
                                        onChangeText={ (text) => this.handleChangeInput(text, 'inputDesc') }  
                                        placeholder="Не указано" 
                                        inputContainerStyle={styles.inputContainer} 
                                        inputStyle={styles.inputStyle} 
                                        containerStyle={styles.inputContainerStyle}
                                        value={this.state.inputDesc}
                                        />
                                        <TouchableOpacity style={{position: 'absolute', right: 20, top: 27}} onPress={() => this.props.navigation.navigate('BusinessCreateCompanyDesc', {companyDesc: this.state.inputDesc, prevRoute: this.props.navigation.state.routeName})}>
                                            {this.state.inputDesc && this.state.inputDesc.length > 5 ? <InputCheck/> : <InputPlus/>}
                                        </TouchableOpacity>
                            </View>
                        </View> */}
                        <View style={{marginTop: 30}}>
                            <Text style={styles.labelActive}>Описание</Text>
                            <TouchableOpacity   style={[styles.inputStyle, styles.inputContainerStyle]}
                                                onPress={() => this.state.inputPhone.length > 0 ? this.props.navigation.navigate('BusinessCreateCompanyDesc', {companyDesc: this.state.inputDesc, prevRoute: this.props.navigation.state.routeName}) : null } >
                                <Text style={[styles.inputStyleTextText, {color: this.state.inputDesc && this.state.inputDesc.length ?  '#444B69' : '#99A2B4'}]}>
                                    { this.state.inputDesc || 'О вашем событии'}
                                </Text>
                                { this.state.inputDesc ? 
                                <InputCheck style={{position: 'absolute', top: 23, right: 20}}/> : 
                                <InputPlus style={{position: 'absolute', top: 19, right: 20}}/>
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={this.state.inputDesc && this.state.inputDesc.length > 5 ? styles.labelActive : styles.labelNotActive}>Фото и видео</Text>
                            <ScrollView horizontal>
                                <View style={styles.photoItem}>
                                    <TouchableOpacity onPress={ ()=>this.galleryMaker() }>
                                            <Image source={require('../../../../assets/images/business/image-upload.png')} style={styles.photoElem}/>
                                    </TouchableOpacity>
                                </View>
                                {   this.state.mediaContent &&
                                    this.state.mediaContent.map((item, index) => (
                                        <View style={styles.photoItem} key={index}>
                                            <TouchableOpacity onPress={()=>this.galleryMaker()}>
                                                <Image source={{uri: item.uri || item.download.url}} style={styles.photoElem}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=>this.removeMedia(index)} style={styles.photoRemove}><IconPhotoRemove/></TouchableOpacity>
                                        </View>
                                    ))
                                }
                                {   this.state.gallery_items &&
                                    this.state.gallery_items.map((item, index) => (
                                        <View style={styles.photoItem} key={index}>
                                            <TouchableOpacity onPress={()=>this.galleryMaker()}>
                                                <Image source={{uri: item.download.url || item.download.url}} style={styles.photoElem}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=>this.removeMedia(index)} style={styles.photoRemove}><IconPhotoRemove/></TouchableOpacity>
                                        </View>
                                    ))
                                }
                            </ScrollView>
                        </View>
                        <View style={{marginTop: 30}}>
                            {
                                this.props.navigation.state.params &&
                                this.props.navigation.state.params.companyEdit
                                ?   <TouchableOpacity onPress={() => this.submitCompanyInform(true)} style={styles.bottomNext}>
                                        <Text style={styles.bottomNextText}>Сохранить</Text>
                                    </TouchableOpacity>
                                :   <TouchableOpacity onPress={() => this.submitCompanyInform()} style={styles.bottomNext}>
                                        <Text style={styles.bottomNextText}>Далее</Text>
                                    </TouchableOpacity>

                            }
                        </View>
                    </ScrollView>
                </View>
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
            </>
        )
    }
}
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
