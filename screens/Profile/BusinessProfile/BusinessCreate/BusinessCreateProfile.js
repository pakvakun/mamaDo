import React, {Component} from 'react';
import {StyleSheet, View, Image, SafeAreaView, Dimensions, ScrollView, Text, TouchableOpacity, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Header, Input} from "react-native-elements";
import { TextInputMask } from 'react-native-masked-text';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Modal from "react-native-modal";
import { Loading, replacerSpecialCharacters } from '../../../../helpers/helpers';


//Icons
import IconBackWhite from "../../../../assets/images/icons/icons-back-white";
import ActiveDot from "../../../../assets/images/hello/ActiveDot";
import UnActiveDot from "../../../../assets/images/hello/UnActiveDot";
import LeftArrow from "../../../../assets/images/hello/LeftArrow";
import RightArrow from "../../../../assets/images/hello/RightArrow";
import IconCompanyCreated from "../../../../assets/images/icons/icon-company-created";
import Axios from 'axios';


class BusinessCreateProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeSlide: 0,
            isModalCreate: false,
            screenWidth: Dimensions.get('window').width,
            carouselItems: [
                {
                    title: 'Обучение',
                    description: 'Текст обучения для пользователей в разделе бизнес профиля. Возможно так же описание преимуществ.',
                    image: require('../../../../assets/images/images/image-create-profile.png')
                },
                {
                    title: 'Преимущества',
                    description: 'Текст обучения для пользователей в разделе бизнес профиля. Возможно так же описание преимуществ.',
                    image: require('../../../../assets/images/images/image-create-profile.png')
                },
                {
                    title: 'Преимущества',
                    description: 'Текст обучения для пользователей в разделе бизнес профиля. Возможно так же описание преимуществ.',
                    image: require('../../../../assets/images/images/image-create-profile.png')
                }
            ],
            loading: false,
            phone: '',
            errPhone: ''
        }
    }

    _renderItem({item, index}){
        return (
            <View key={index} style={{flex:1,justifyContent:'center',alignItems:'center', paddingLeft: 40, paddingRight: 40}}>
                <Image style={{marginBottom: 30}} source={item.image} />
                <Text style={styles.itemTitle} >{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
        )
    }

    profileCreated = () => {
        this.setState({ isModalCreate: !this.state.isModalCreate });
    };

    navigateToOuter = () => {
        this.props.navigation.navigate('BusinessOuter');
        this.setState({ isModalCreate: !this.state.isModalCreate });
    };

    get pagination() {
        return (
            <Pagination
                dotsLength={this.state.carouselItems.length}
                activeDotIndex={this.state.activeSlide}
                containerStyle={{ position: 'absolute', bottom: 0 }}
                dotElement={<View style={{marginRight: 5, marginLeft: 5}}><ActiveDot/></View>}
                inactiveDotElement={<View style={{marginRight: 5, marginLeft: 5}}><UnActiveDot/></View>}
                inactiveDotOpacity={1}
                inactiveDotScale={1}
            />
        );
    }
    handleChange = (value, name) =>{
        this.setState({[name]: value, errPhone: '', errPass: ''})
    }
    handleClickSubmit = (phone) =>{
        if(phone.length < 11){
            phone.length === 0 ?
            this.setState({errPhone: 'введите номер телефона'}):
            this.setState({errPhone: 'введите номер телефона полностью'})
        }else{
            this.sendReqForCreateProfile()
        }
        
    }
    setStorData = async (data, setVal) => {
        let JSONData = JSON.stringify(data);
        let err;
        try {
            await AsyncStorage.setItem('isAuthBusiness', JSON.stringify(setVal))
            await AsyncStorage.setItem('BusinesData', JSONData)
        
        } catch (error) {
            err = error
        }
        if (!err) {
            this.profileCreated()
            this.props.navigation.navigate('BusinessOuter', JSONData)
        }
    }
    sendReqForCreateProfile = () => {
        this.setState({loading: true})
        Axios({
            method: 'POST',
            baseURL: 'https://mamado.elgrow.ru',
            url: 'api/auth/login',
            data: {
                // phone: this.state.phone,
                email: 'qwe@qwe.qwe',
                password: 'qwe',
            },
        }).then(res => {
            if(res.data.errPhone){
                this.setState({errPhone: 'Ошибка! \n Попробуйте снова!', loading: false})
            }else{
                this.setStorData(res.data, true)
            }            
        }).catch(err => {
            this.setState({ errPhone: 'Что-то пошло не так :(', loading: false })
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Header
                    centerComponent={{ text: 'Создать бизнес профиль', style: { color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 16, fontWeight: '500' } }}
                    containerStyle={{
                        backgroundColor: '#556086',
                        borderBottomWidth: 0,
                    }}
                    leftComponent={<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{left: 25}}><IconBackWhite/></TouchableOpacity>}
                />
                <View style={styles.textContainer}>
                    <SafeAreaView style={styles.containerCarousel}>
                        <Carousel
                            data={this.state.carouselItems}
                            sliderWidth={this.state.screenWidth}
                            itemWidth={this.state.screenWidth}
                            renderItem={this._renderItem}
                            onSnapToItem={(index) => this.setState({activeSlide: index})}
                        />
                        {this.pagination}
                        <LeftArrow style={styles.leftArrow}/>
                        <RightArrow style={styles.rightArrow}/>
                    </SafeAreaView>
                    <View style={styles.bottomBlock}>
                        <Text style={styles.phoneText}>Номер телефона</Text>
                        <TextInputMask  
                            placeholderTextColor="#DEE2EB" 
                            style={[styles.inputStyle, styles.inputContainerStyle, styles.inputStyleText]}
                            placeholder="Введите номер"
                            type={'cel-phone'}
                            value={this.state.phone}
                            onChangeText={(value)=>this.handleChange(value, 'phone')}
                            options={{
                                withDDD: true, 
                                dddMask: '+7(999)999-99-99'
                            }}
                            maxLength={16}
                        />
                        <View>
                            {
                                (this.state.errPhone.length > 0) && 
                                <Text style={styles.errMessage}>{this.state.errPhone}</Text>
                            }
                        </View>
                        <TouchableOpacity onPress={()=>this.handleClickSubmit(this.state.phone)} style={styles.buttonCreateBlock}>
                            <Text style={styles.buttonCreateText}>Создать бизнес профиль</Text>
                        </TouchableOpacity>
                    </View>
                    <Loading isLoading={this.state.loading}/>
                </View>
                <Modal isVisible={this.state.isModalCreate} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={styles.modalMinTitleBlock}>
                            <Text>
                                <IconCompanyCreated style={{marginRight: 14}}/>
                                <Text style={styles.modalMinTitle}>Бизнес профиль создан</Text>
                            </Text>
                        </View>
                        <View style={styles.modalMinButtonsBlock}>
                            <TouchableOpacity onPress={this.navigateToOuter} style={styles.modalMinConfirm}>
                                <Text style={styles.modalMinConfirmText}>ОК</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

export default BusinessCreateProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#556086'
    },
    textContainer: {
        flex: 1,
        marginTop: 10,
        backgroundColor: '#48547B',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bottomBlock: {
        backgroundColor: '#FFF',
        position: 'absolute',
        bottom: 0,
        height: 220,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 30,
        paddingLeft: 24,
        paddingRight: 24
    },
    containerCarousel: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 220
    },
    leftArrow: {
        position: 'absolute',
        left: '30%',
        bottom: '6%'
    },
    rightArrow: {
        position: 'absolute',
        right: '30%',
        bottom: '6%'
    },
    itemTitle: {
        color: '#FFF',
        fontSize: 30,
        fontFamily: 'SF Compact Rounded',
        fontWeight: '700'
    },
    itemDescription: {
        lineHeight: 24,
        color: '#FFF',
        fontFamily: 'SF Pro Text',
        fontSize: 16,
        fontWeight: '400',
        marginTop: 25,
        textAlign: 'center'
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
        fontWeight: '400',
    },
    inputContainerStyle: {
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#DEE2EB',
        borderRadius: 10
        
    },
    inputStyleText: {
        fontFamily: 'SF Pro Text', 
        fontWeight: '400', 
        fontSize: 16, 
        width: '100%', 
        height: 55, 
        color: '#444B69', 
        paddingLeft: 23, 
        paddingRight: 23
    },
    modal: {
        margin: 0,
        backgroundColor: 'rgba(31, 35, 52, 0.6)'
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
    modalMinTitle: {
        color: '#444B69',
        fontSize: 19,
        fontFamily: 'SF Pro Text',
        fontWeight: '500'
    },
    modalMinButtonsBlock: {
        marginTop: 35,
        marginLeft: 30,
        flexDirection: 'row'
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
    modalMinConfirmText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '500',
        textAlign: 'center'
    },
    buttonCreateBlock: {
        backgroundColor: '#E94C89',
        borderRadius: 10,
        paddingTop: 17,
        paddingBottom: 17,
        marginTop: 20
    },
    phoneText: {
        color: '#444B69',
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        fontWeight: '500'
    },
    buttonCreateText: {
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'SF Pro Text',
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    errMessage: {
        position:'absolute',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        color: 'red',
    }
});