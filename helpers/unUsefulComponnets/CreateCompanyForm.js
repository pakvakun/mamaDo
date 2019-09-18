// export  class CreateCompanyForm extends Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             isModalCategory: false,
//             inputName: '',
//             inputAge: '',
//             ageMin: '',
//             ageMax: '',
//             inputCategory: '',
//             inputPhone: '',
//             inputEmail: false,
//             inputSite: '',
//             inputDesc: '',
//             socialArr: [],
//             mediaContent: [],
//             temp: '',
//             photos: [],
//             newArr: [],
//         }
//         this.getCategory();
//         this.getT()
//     }
//     getT = () => {
//         AsyncStorage.getItem('token', (err, res)=>{
//             let temp = JSON.parse(res)
//             let AuthStr = 'Bearer'.concat(temp)
//             this.setState({token: AuthStr})
//         })
//     }
//     getCategory = (id) => {
//         axios({
//             method: 'GET',
//             baseURL: 'https://mamado.elgrow.ru',
//             url: '/api/category',
//         }).then((res, err) => {
//             let temp = res;
//             temp.map(item => {
//                 item.checked = false;                
//             })
//             this.setState({categoryArr: temp})
//         })
//     }
//     toggleCategory = () => {
//         this.setState({ isModalCategory: !this.state.isModalCategory });
//     };
//     toogleCheckedCategory = (index, item,) => {
//         let temp = this.state.categoryArr;
//         temp[index].checked = !temp[index].checked
//         let newCategoryCheckedArr = temp.filter( item=> { return item.checked}).map(item=>{return {id: item.id, name: item.name} })
//         this.setState({
//             categoryArr: temp, 
//             arrForSearch: newCategoryCheckedArr,

//         })
        
//     };
//     submitCheckedCategory = () => {
//         let temp = this.state.arrForSearch.map(item => {
//             return item.value
//         })
//         let idArrForSearch = this.state.arrForSearch.map(item => {
//             return item.id
//         })
//         this.setState({ inputCategory: temp.join(', '), idArrForSearch: idArrForSearch});
//         this.toggleCategory()
//     }
//     handleChangeAge = (text) => {
//         let temp = onlyNumbers(text);
//         let pureVal = temp ? ( temp.length < 2 ? `${temp[0]||''}${temp[1]||''}` : `${temp[0]||''}${temp[1]||''}/${temp[3]||''}${temp[4]||''}`):''
//         this.setState({ inputAge: pureVal, ageMin: temp[0]+temp[1], ageMax: temp[3]+temp[4]})
        
//     }
//     handleChangeInput = (value, name) =>{
//         let pureValue = replacerSpecialCharacters(value);
//         this.setState({[name]: pureValue, errPhone: ''})
//     }
//     handleChangeEmail = (text) => {
//         let pureValue = replacerSpecialCharacters(text);
//         this.setState({ inputEmail: pureValue })
//     }
//     handleChangeSite = (text) => {
//         let pureValue = replacerSpecialCharacters(text);
//         this.setState({ inputSite: pureValue })
//     }
//     handleClickSocial = (item, itemUrl) => {
//         let temp = this.state.socialArr;
//         if(temp){
//             temp.push(item)            
//         }else{
//             temp = [item]
//         }
        
//         this.setState({ socialArr: temp})
//     }
//     handleChangeSocial = (text, index) => {
//         let temp = this.state.socialArr;
        
//         text.match(/https:\/\//gi)?
//         temp[index].link = text:
//         temp[index].link = `https://${text}`

//         this.setState({socialArr: temp})        
//     }
//     galleryMaker = () => {
//         const options = {
//             title: 'Select Photo',
//             customButtons: [{ name: 'photo', title: 'Choose Photo' }],
//             storageOptions: {
//               skipBackup: true,
//             },
//             quality: 0
//           };
//           ImagePicker.launchImageLibrary(options, (response) => {
            
//             if (response.didCancel) {
//             } else if (response.error) {
//             } else if (response.customButton) {
//             } else {
//                 const source = { uri: response.uri, name: response.fileName, type: response.type };
//                 this.setState({
//                 mediaContent: [...this.state.mediaContent, source],
//                 photos: [...this.state.photos, response]
//                 });
//             }
//           })
        
//         CameraRoll.getPhotos({
//             first: 20,
//             assetType: 'All'
//           })
//           .then(r => { 
//             this.setState({ photos: r.edges })
//            })
//     }
//     submitCompanyInform = () => {
//         let {
//             inputName, 
//             inputPhone, 
//             inputEmail, 
//             inputSite, 
//             inputDesc,
//             mediaContent, 
//             arrForSearch, 
//             addresses, 
//             ageMin,
//             ageMax,
//             socialArr } = this.state;

//             const data = new FormData();
           
//             mediaContent.forEach( (image, index) => {              
//                 let img = {
//                     uri: image.uri,
//                     type: image.type,
//                     name: image.name,
//                 }
//                 data.append(`media[${index}]`, img);
//                 index === 0 ? 
//                 data.append('avatar',img):
//                 null
//             });
//             arrForSearch && arrForSearch.forEach((element, index) => {
//                 data.append(`categories[${index}][id]`, element.id);
//                 data.append(`categories[${index}][value]`, element.value);
//             });
//             addresses && addresses.forEach((element, index) => {
//                 element.lat && element.long && element.text ? (
//                 data.append(`addresses[${index}][lat]`, element.lat),
//                 data.append(`addresses[${index}][long]`, element.long),
//                 data.append(`addresses[${index}][text]`, element.text)
//                 ):null
//             })
//             socialArr && socialArr.forEach((element, index) => {
//                 data.append(`soc[${index}][url]`, element.link);
//                 data.append(`soc[${index}][key]`, element.name);

//             })
//             data.append('name', inputName);
//             data.append('age_min', +ageMin);
//             data.append('age_max', +ageMax);
//             data.append('phone', inputPhone);
//             data.append('email', inputEmail);
//             data.append('site', inputSite);
//             data.append('about', inputDesc);
            
            

//         axios({
//             method: 'POST',
//             baseURL: `https://mamado.elgrow.ru`,
//             url: '/api/company',
//             data: data,
//             headers: {
//                 Authorization: this.state.token,
//                 'accept': "application/json",
//                 'content-type': 'multipart/form-data',
//             }
//         }).then(res => {
//             this.props.navigation.navigate('RequisitesPage', {prevRoute: 'BusinessOuter', companyCreated: true});
//         }).catch(err=>{ console.log(err, data) })
//     }
//     removeMedia = (index) => {
//         let mediaArr = this.state.mediaContent;
//         mediaArr.splice(index,1);
//         this.setState({mediaContent: mediaArr})
//     }
//     componentDidUpdate(prevProps, prevState){
//         let { params } = this.props.navigation.state;

//         if(prevProps.navigation.state.params !== params){
//             if(params && params.companyDesc){
//                 this.setState({inputDesc: params.companyDesc})
//             }
//             if(params && params.mainAdres && params.mainAdres.lat !== null){
//                 this.state.addresses ?
//                 this.setState({addresses: [params.mainAdres,  ...this.state.addresses ]}):
//                 this.setState({addresses: [params.mainAdres, {}] })
//             }
//             if(params && params.anotherAdres && params.anotherAdres.lat !==null){
//                 let temp = this.state.addresses;
//                 temp.splice(temp.length-1, 0, params.anotherAdres)
//                 this.setState({addresses: temp})                
//             }
//         }
//     }
//     componentDidMount(){
//         let { params } = this.props.navigation.state
             
//         if(params && params.companyDesc && params.companyDesc.length === 0){
//             this.setState({inputDesc: ''})
//         }
//     }
//     render(){
//         return(
//             <>
//             <View style={styles.textContainer}>
//                     <ScrollView contentContainerStyle={styles.scrollContainer}>
//                         <View style={{marginTop: 30}}>
//                             <Text style={styles.labelActive}>Название компании</Text>
//                             <View>
//                                 <Input  placeholderTextColor="#99A2B4"
//                                         value={this.state.inputName}
//                                         onChangeText={ (text) => this.handleChangeInput(text, 'inputName') } 
//                                         placeholder="Не указано" 
//                                         inputContainerStyle={styles.inputContainer} 
//                                         inputStyle={styles.inputStyle} 
//                                         containerStyle={styles.inputContainerStyle}
//                                         />
//                                         {this.state.inputName.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
                                        
//                             </View>
//                         </View>
//                         <View style={{marginTop: 30}}>
//                             <Text style={this.state.inputName.length > 5 ? styles.labelActive : styles.labelNotActive}>Возраст детей</Text>
//                             <View>
//                                 <Input  placeholderTextColor="#99A2B4" 
//                                         editable={this.state.inputName.length > 4 ? true : false} 
//                                         value={this.state.inputAge} 
//                                         onChangeText={ (text) => this.handleChangeAge(text) }  
//                                         placeholder="от / до" 
//                                         inputContainerStyle={styles.inputContainer} 
//                                         inputStyle={styles.inputStyle} 
//                                         containerStyle={styles.inputContainerStyle}
//                                 />
//                                 {
//                                     this.state.inputAge.length > 4 ? 
//                                         <InputCheck style={styles.inputCheck}/> : 
//                                         null
//                                 }
//                             </View>
//                         </View>
//                         <View style={{marginTop: 30}}>
//                             <Text style={this.state.inputAge.length > 4 ? styles.labelActive : styles.labelNotActive}>Категория</Text>
//                             <TouchableOpacity onPress={ this.state.inputAge.length > 4 ? this.toggleCategory : null }>
//                             <View>
//                                 <TouchableOpacity   style={[styles.inputStyle, styles.inputContainerStyle]}
//                                                     onPress={ this.state.inputAge.length > 4 ? this.toggleCategory : null } >
//                                     <Text style={[styles.inputStyleTextText, {color: this.state.inputCategory.length ?  '#444B69' : '#99A2B4'}]}>
//                                         { this.state.inputCategory || 'Выберите категорию'}
//                                     </Text>
//                                     {this.state.inputCategory.length > 0 ? 
//                                     <InputCheck style={{position: 'absolute', top: 23, right: 20}}/> : 
//                                     <InputPlus style={{position: 'absolute', top: 19, right: 20}}/>
//                                     }
//                                 </TouchableOpacity>
//                             </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{marginTop: 30}}>
//                             <Text style={this.state.inputCategory.length > 1 ? styles.labelActive : styles.labelNotActive}>Телефон компании</Text>
//                             <View>
//                                 <TextInputMask  
//                                     placeholderTextColor="#99A2B4" 
//                                     editable={this.state.inputCategory.length > 5 ? true : false}
//                                     style={[styles.inputStyle, styles.inputContainerStyle, styles.inputStyleText]}
//                                     placeholder="Не указано"
//                                     type={'cel-phone'}
//                                     value={this.state.inputPhone}
//                                     onChangeText={(value)=>this.handleChangeInput(value, 'inputPhone')}
//                                     options={{
//                                         withDDD: true, 
//                                         dddMask: '+7(999)999-99-99'
//                                     }}
//                                     maxLength={16}
//                                 />
//                                 {this.state.inputPhone.length > 16 ? <InputCheck style={styles.inputCheck}/> : null}
//                             </View>
//                         </View>
//                         <View style={{marginTop: 30}}>
//                             <Text style={this.state.inputPhone.length > 5 ? styles.labelActive : styles.labelNotActive}>E-mail</Text>
//                             <View>
//                                 <Input  placeholderTextColor="#99A2B4" 
//                                         editable={this.state.inputPhone.length > 5 ? true : false} 
//                                         onChangeText={ (text) => this.handleChangeInput(text, 'inputEmail') }  
//                                         placeholder="Не указано" 
//                                         inputContainerStyle={styles.inputContainer} 
//                                         inputStyle={styles.inputStyle} 
//                                         containerStyle={styles.inputContainerStyle}
//                                         value={this.state.inputEmail}
//                                         />
//                                         {this.state.inputEmail.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
//                             </View>
//                         </View>
//                         <View style={{marginTop: 30}}>
//                             <Text style={this.state.inputEmail.length > 5 ? styles.labelActive : styles.labelNotActive}>Сайт</Text>
//                             <View>
//                                 <Input  placeholderTextColor="#99A2B4" 
//                                         editable={this.state.inputEmail.length > 5 ? true : false} 
//                                         onChangeText={ (text) => this.handleChangeInput(text, 'inputSite')} 
//                                         placeholder="Не указано" 
//                                         inputContainerStyle={styles.inputContainer} 
//                                         inputStyle={styles.inputStyle} 
//                                         containerStyle={styles.inputContainerStyle}
//                                         value={this.state.inputSite}
//                                         />
//                                 {this.state.inputSite.length > 5 ? <InputCheck style={styles.inputCheck}/> : null}
//                             </View>
//                         </View>
//                         <View style={{marginTop: 30}}>
//                             <Text style={this.state.inputSite.length > 5 ? styles.labelActive : styles.labelNotActive}>Социальные сети</Text>
//                             <View style={{flexDirection: 'row', marginTop: 15}}>
//                                 <TouchableOpacity   style={this.state.vk?[styles.iconOuter, styles.iconOuter_clicked_vk]:styles.iconOuter} 
//                                                     onPress={()=>{this.state.inputSite.length > 3 ? (this.handleClickSocial({name: 'vk', link:''}), this.setState({vk: true})):'' }}>
//                                     {
//                                         this.state.vk ? 
//                                             <IconVk style={{opacity: 1}} fill={'#fff'}/>:
//                                             <IconVk style={{opacity: 0.6}}/>
//                                     }
//                                 </TouchableOpacity>
//                                 <TouchableOpacity   style={this.state.fb?[styles.iconOuter, styles.iconOuter_clicked_fb]:styles.iconOuter} 
//                                                     onPress={()=>this.state.inputSite.length > 3 ? (this.handleClickSocial({name: 'Fb', link:''}), this.setState({fb: true})):'' }>
//                                     {
//                                         this.state.fb?
//                                             <IconFb style={{opacity: 1}} fill={'#fff'}/>:
//                                             <IconFb style={{opacity: 0.6}}/>
//                                     }
//                                 </TouchableOpacity>
//                                 <TouchableOpacity   style={this.state.inst?[styles.iconOuter, styles.iconOuter_clicked_inst]:styles.iconOuter} 
//                                                     onPress={()=>this.state.inputSite.length > 3 ? (this.handleClickSocial({name: 'Inst', link:''}), this.setState({inst: true})):'' }>
//                                     {
//                                         this.state.inst?
//                                         <IconInst style={{opacity: 1}} fill={'#fff'}/>:
//                                         <IconInst style={{opacity: 0.6}}/>
//                                     }
//                                 </TouchableOpacity>
//                                 <TouchableOpacity   style={this.state.ok?[styles.iconOuterLast, styles.iconOuter_clicked_ok]:styles.iconOuterLast} 
//                                                     onPress={()=>this.state.inputSite.length > 3 ? (this.handleClickSocial({name: 'Ok', link:''}), this.setState({ok: true})):'' }>
//                                     {
//                                         this.state.ok?
//                                         <IconOk style={{opacity: 1}} fill={'#fff'}/>:
//                                         <IconOk style={{opacity: 0.6}}/>
//                                     }
//                                 </TouchableOpacity>
//                             </View>
//                             {this.state.socialArr &&
//                                 this.state.socialArr.map((item, index)=>(
//                                     <Input  key={index}
//                                             placeholderTextColor="#99A2B4" 
//                                             onChangeText={ (text) => this.handleChangeSocial(text, index) }  
//                                             placeholder={`Укажите ссылку ${item.name}`} 
//                                             inputContainerStyle={styles.inputContainer} 
//                                             inputStyle={styles.inputStyle} 
//                                             containerStyle={styles.inputContainerStyle}
//                                             value = {item.link}
//                                     />                                    
//                                 ))
//                             }
                            
//                         </View>
//                         <View style={{marginTop: 30}}>
//                             <Text style={this.state.inputEmail.length > 5 ? styles.labelActive : styles.labelNotActive}>Адрес</Text>
//                             <View>
//                                 <TouchableOpacity style={[styles.inputStyle, styles.inputContainerStyle]}
//                                                   onPress={() => this.state.inputEmail ? this.props.navigation.navigate('BusinessCreateCompanyMap',{prevRoute: this.props.navigation.state.routeName, typeAdres:'main'}):null}>
//                                     <Text style={[styles.inputStyleTextText, {color: this.state.addresses && this.state.addresses[0] && this.state.addresses[0].text ?  '#444B69' : '#99A2B4'}]}>
//                                         { this.state.addresses && this.state.addresses[0] && this.state.addresses[0].text || 'Укажите адрес на карте'}
//                                     </Text>
//                                     {this.state.addresses && this.state.addresses[0] && this.state.addresses[0].text ? 
//                                     <InputCheck style={{position: 'absolute', top: 23, right: 20}}/> : 
//                                     <InputPlus style={{position: 'absolute', top: 19, right: 20}}/>
//                                     }
//                                 </TouchableOpacity>
                               
//                             </View>
//                         </View>
//                         {this.state.addresses && this.state.addresses.length >= 1 &&
//                             this.state.addresses.map( (item, index) => (
//                                 index !== 0 ?
//                                 <View style={{marginTop: 30}} key={index}>
//                                     <Text style={styles.labelActive}>Есть еще адрес?</Text>
//                                     <TouchableOpacity   style={[styles.inputStyle, styles.inputContainerStyle]}
//                                                         onPress={() => this.props.navigation.navigate('BusinessCreateCompanyMap', {prevRoute: this.props.navigation.state.routeName})} >
//                                         <Text style={[styles.inputStyleTextText, {color: this.state.addresses&& this.state.addresses[index] && this.state.addresses[index].text ?  '#444B69' : '#99A2B4'}]}>
//                                             { this.state.addresses && this.state.addresses[index].text || 'Укажите адрес на карте'}
//                                         </Text>
//                                         {this.state.addresses && this.state.addresses[0] && this.state.addresses[index].text ? 
//                                         <InputCheck style={{position: 'absolute', top: 23, right: 20}}/> : 
//                                         <InputPlus style={{position: 'absolute', top: 19, right: 20}}/>
//                                         }
//                                     </TouchableOpacity>
//                                 </View>: 
//                                 null
//                             ))
//                         }
                        
//                         <View style={{marginTop: 30}}>
//                             <Text style={this.state.inputEmail.length > 5 ? styles.labelActive : styles.labelNotActive}>Описание</Text>
//                             <View>
//                                 <Input  placeholderTextColor="#99A2B4" 
//                                         editable={this.state.inputEmail.length > 5 ? true : false} 
//                                         onChangeText={ (text) => this.handleChangeInput(text, 'inputDesc') }  
//                                         placeholder="Не указано" 
//                                         inputContainerStyle={styles.inputContainer} 
//                                         inputStyle={styles.inputStyle} 
//                                         containerStyle={styles.inputContainerStyle}
//                                         value={this.state.inputDesc}
//                                         />
//                                         <TouchableOpacity style={{position: 'absolute', right: 20, top: 27}} onPress={() => this.props.navigation.navigate('BusinessCreateCompanyDesc', {companyDesc: this.state.inputDesc, prevRoute: this.props.navigation.state.routeName})}>
//                                             {this.state.inputDesc && this.state.inputDesc.length > 5 ? <InputCheck/> : <InputPlus/>}
//                                         </TouchableOpacity>
//                             </View>
//                         </View>
//                         <View style={{marginTop: 30}}>
//                             <Text style={this.state.inputDesc && this.state.inputDesc.length > 5 ? styles.labelActive : styles.labelNotActive}>Фото и видео</Text>
//                             <ScrollView horizontal>
//                                 <View style={styles.photoItem}>
//                                     <TouchableOpacity onPress={ ()=>this.galleryMaker() }>
//                                             <Image source={require('../../../assets/images/business/image-upload.png')} style={styles.photoElem}/>
//                                     </TouchableOpacity>
//                                 </View>
//                                 {
//                                     this.state.mediaContent.map((item, index) => (
//                                         <View style={styles.photoItem} key={index}>
//                                             <TouchableOpacity onPress={()=>this.galleryMaker()}>
//                                                 <Image source={{uri: item.uri}} style={styles.photoElem}/>
//                                             </TouchableOpacity>
//                                             <TouchableOpacity onPress={()=>this.removeMedia(index)} style={styles.photoRemove}><IconPhotoRemove/></TouchableOpacity>
//                                         </View>
//                                     ))
//                                 }
//                             </ScrollView>
//                         </View>
//                         <View style={{marginTop: 30}}>
//                             <TouchableOpacity onPress={() => this.submitCompanyInform()} style={styles.bottomNext}>
//                                 <Text style={styles.bottomNextText}>Далее</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </ScrollView>
//                 </View>
//                 <Modal isVisible={this.state.isModalCategory} style={styles.filter}>
//                     <View style={styles.filterContent}>
//                         <View style={styles.filterTop}>
//                             <View style={{flexDirection: 'row'}}>
//                                 <Text style={styles.textClose}>Выберите категории</Text>
//                                 <TouchableOpacity style={{marginLeft: 'auto'}} onPress={this.toggleCategory}>
//                                     <IconClose/>
//                                 </TouchableOpacity>
//                             </View>
//                             <SearchBar
//                                 placeholder="Поиск по категориям"
//                                 onChangeText={this.updateSearch}
//                                 searchIcon={Search}
//                                 containerStyle={styles.searchBarContainer}
//                                 inputContainerStyle={{backgroundColor: '#606C93', marginTop: -5}}
//                                 placeholderTextColor="#FFF"
//                                 inputStyle={styles.SearchBarInputStyle}
//                             />
//                         </View>
//                         <View style={styles.filterListStation}>
//                             <ScrollView style={{paddingLeft: 24, paddingRight: 24}} contentContainerStyle={{ paddingTop: 30, paddingBottom: 30}}>
//                             {
//                                 this.state.categoryArr ?
//                                     this.state.categoryArr.map((item, index)=>(
//                                         <CheckBox
//                                             title={item.name}
//                                             checkedIcon={<IconChecked/>}
//                                             uncheckedIcon={<IconUnchecked/>}
//                                             checked={item.checked}
//                                             onPress={() => this.toogleCheckedCategory(index, item)}
//                                             containerStyle={{padding: 0, margin: 0, backgroundColor:'transparent', marginLeft: 0, marginRight: 0, borderWidth: 0, marginTop: 5, marginBottom: 5}}
//                                             textStyle={{color: '#444B69', fontSize: 16, fontFamily: 'SF Pro Text', fontWeight: '400'}}
//                                             key={index}
//                                         />
//                                     )):
//                                     <NothingForPrev tabName={'категории'} />
//                             }
//                             </ScrollView>
//                         </View>
//                         <View style={styles.buttonsBlock}>
//                             <TouchableOpacity onPress={this.toggleCategory} style={styles.buttonCancel}>
//                                 <Text style={styles.buttonCancelText}>Отмена</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity   style={styles.buttonChoice} 
//                                                 onPress={()=>this.submitCheckedCategory()}>
//                                 <Text style={styles.buttonChoiceText}>Выбрать</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </Modal>
//             </>
//         )
//     }
// }