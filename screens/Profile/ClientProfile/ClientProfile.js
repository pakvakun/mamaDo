import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import {Badge} from 'react-native-elements';
import axios from 'axios';

import IconBackWhite from '../../../assets/images/icons/icons-back-white';
import IconExit from '../../../assets/images/icons/icons-exit';
import EditProfile from '../../../assets/images/icons/icons-edit';
import CitySelect from '../../../assets/images/icons/city-select-ico';
import OpenRight from '../../../assets/images/icons/open-right';
import Suitcase from '../../../assets/images/icons/icons-suitcase';

//Client Menu
import Childrens from '../../../assets/images/menu/icon-childrens'; 
import MySchedule from '../../../assets/images/menu/icon-schedule'; 
import Notifications from '../../../assets/images/menu/icon-notifications'; 
import Messages from '../../../assets/images/menu/icon-messages'; 
import Like from '../../../assets/images/menu/icon-like'; 
//Menu
import About from '../../../assets/images/menu/about';
import Information from '../../../assets/images/menu/information'
import Contact from '../../../assets/images/menu/contact';
import Oferta from '../../../assets/images/menu/oferta';
import NoProfile from '../../NoProfile/NoProfile';
import { Loading } from '../../../helpers/helpers';

class ClientProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalVisible: false,
            isModalExitVisible: false,
            clientData: false,
            isAuth: false,
            loading: false
        };
        
    }
    
    citySelect = (city) => {
        this.setState({ citySelect: city})
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    toggleExitModal = () => {
        this.setState({ isModalExitVisible: !this.state.isModalExitVisible });
    };
    toggleExitModalRedirect = () =>{
        this.setState({ isModalExitVisible: !this.state.isModalExitVisible });
        this.setAsyncStorData(false);
        this.deleteAsyncDataObj('token')
        this.deleteAsyncDataObj('isAuth')
        
    }
    
    //Обмен данными с внутренним хранилищем
    setAsyncStorData = (data) =>{
        this.setState({isAuth: data})
    }
    getAsyncStorData = async () =>{
        try {
            let token = await AsyncStorage.getItem('token')

            if (token !== null) {
                this.getClientData(JSON.parse(token))
            }

        } catch (error) {
            console.log(error);
            
        }
    };
    getClientData = (token) => {
        const authStr = 'Bearer'.concat(token)
        axios({
            method: 'GET',
            baseURL: 'https://mamado.elgrow.ru',
            url: 'api/auth/me',
            headers: {Authorization: authStr},
            timeout: 10000,
        }).then(res => {
            this.setState({clientData: res.data, isAuth: 1})
        }).catch(err => {console.log(err)})
    }

    getCity = () => {
        return 'Город не определен'
    }
    deleteAsyncDataObj = async (obj) => {
        try {
            await AsyncStorage.removeItem(obj)
        } catch (error) {
            
        }
    }
    componentDidMount(){
        this.getAsyncStorData()
    }
    render() {
        if(this.state.clientData){
            var {name, status, isBusinesProfile, messages, notifications, city} = this.state.clientData
        }
        return (
            <>
            {this.state.isAuth && this.state.clientData?
                <View style={styles.container}>
                <TouchableOpacity style={styles.iconBack} onPress={() => this.props.navigation.goBack()}>
                    <IconBackWhite/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.IconExit} onPress={this.toggleExitModal}>
                    <IconExit/>
                </TouchableOpacity>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EditClientProfile')} style={styles.profileInfo}>
                        <View> 
                            <Image source={require('../../../assets/images/profile_photo/client_profile_avatar.png')} />
                        </View>
                        <View style={styles.containerEnter}>
                            <Text style={styles.enterText}>{name||'Имя Пользователя'}</Text>
                            <Text style={styles.notCreate}>{status||'Пользователь'}</Text>
                        </View>
                        <View style={{marginLeft: 'auto', marginTop: 30}}>
                            <EditProfile/>
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.menuContainer}>
                    <View style={styles.citySelect}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('CitySelect', {citySelect: this.citySelect})} style={styles.changeCityBlock}>
                            <View>
                                <CitySelect/>
                            </View>
                            <View style={{marginLeft: 13}}>
                                <Text style={styles.cityText}>{this.state.citySelect && this.state.citySelect.name || this.state.currentCity || 'Город не определен'}</Text>
                                <Text style={styles.cityChange}>Выберите город</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowMenu}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('#')} style={styles.menuItem}>
                            <Childrens/>
                            <Text style={styles.menuText}>Дети</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('#')} style={styles.menuItem}>
                            <MySchedule/>
                            <Text style={styles.menuText}>Мое расписание</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('#')} style={styles.menuItem}>
                            <Notifications/>
                            <Text style={styles.menuText}>Уведомления</Text>
                            {
                                notifications?
                                <Badge value={notifications} badgeStyle={styles.badge} containerStyle={styles.menuBadge}/>:null
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('#')} style={styles.menuItem}>
                            <Messages/>
                            <Text style={styles.menuText}>Сообщения</Text>
                            {
                                messages? 
                                <Badge value={messages} badgeStyle={styles.badge} containerStyle={styles.menuBadge}/>:null
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('#')} style={styles.menuItem}>
                            <Like/>
                            <Text style={styles.menuText}>Избранное</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.hr}/>
                    <View style={styles.rowMenu}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('About')} style={styles.menuItem}>
                            <About/>
                            <Text style={styles.menuText}>О сервисе</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Information')} style={styles.menuItem}>
                            <Information/>
                            <Text style={styles.menuText}>Информация</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleModal} style={styles.menuItem}>
                            <Contact/>
                            <Text style={styles.menuText}>Связаться с Mamado</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Oferta')} style={styles.menuItem}>
                            <Oferta/>
                            <Text style={styles.menuText}>Публичная оферта</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {
                    isBusinesProfile?
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('BusinessOuter')} style={styles.bottomBtn}>
                            <Suitcase/>
                            <Text style={styles.bottomBtnText}>Перейти в бизнес профиль</Text>
                            <OpenRight fill="#444B69"/>
                        </TouchableOpacity>
                    </View>:
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('BusinessCreateProfile')} style={styles.bottomBtn}>
                            <Suitcase/>
                            <Text style={styles.bottomBtnText}>Создать бизнес профиль</Text>
                            <OpenRight fill="#444B69"/>
                        </TouchableOpacity>
                    </View>
                }
                
                <Modal isVisible={this.state.isModalVisible} style={styles.modal}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Поделиться с помощью</Text>
                        <View style={styles.shareBlock}>
                            <TouchableOpacity style={styles.shareRow}>
                                <Image source={require('../../../assets/images/IOS/IOSPhone.png')}/>
                                <Text style={styles.shareText}>Телефон</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.shareRow}>
                                <Image source={require('../../../assets/images/IOS/IOSMail.png')}/>
                                <Text style={styles.shareText}>Mail</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.shareRow}>
                                <Image source={require('../../../assets/images/IOS/IOSMessage.png')}/>
                                <Text style={styles.shareText}>Сообщение</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={this.toggleModal} style={styles.modalClose}>
                            <Text style={styles.modalButtonText}>ОТМЕНА</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal style={styles.modalExit} isVisible={this.state.isModalExitVisible}>
                    <View style={styles.modalExitContent}>
                        
                        <Text style={styles.modalExitTitle}><IconExit fill={'#E94C89'} style={styles.modalExitIcon}/>Выйти?</Text>
                        <Text style={styles.modalExitText}>Вы уверены что хотите выйти?</Text>
                        <View style={styles.modalExitBtnGroup}>
                            <TouchableOpacity onPress={this.toggleExitModal} style={styles.modalExitBtnDiscard}>
                                <Text style={styles.modalButtonText}>ОТМЕНА</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.toggleExitModalRedirect} style={styles.modalExitBtnExit}>
                                <Text style={styles.modalExitBtnExitText}>ВЫЙТИ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>:
            <NoProfile {...this.props}/>
        }
            <Loading isLoading={this.state.loading} />
            </>
            
        );
    }
}

export default ClientProfile;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#556086',
        height: '100%'
    },
    iconBack: {
        position: 'absolute',
        width: 24,
        marginLeft: 24,
        top: 60
    },
    IconExit: {
        position: 'absolute',
        width: 24,
        top: 60,
        right: 24,
    },
    header: {
        width: '100%',
        height: 160,
        position: 'absolute',
        top: 80
    },
    profileInfo: {
        height: 44,
        marginTop: 20,
        marginLeft: 30,
        marginRight: 25,
        flex: 1,
        flexDirection: 'row'
    },
    containerEnter: {
      marginLeft: 23
    },
    enterText: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'SF Compact Rounded',
        fontWeight: '500'
    },
    notCreate: {
        color: '#9DA6C1',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    menuContainer: {
        backgroundColor: '#FFF',
        width: '100%',
        height: '100%',
        marginTop: 180,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    changeCityBlock: {
        flexDirection: 'row'
    },
    citySelect: {
        borderBottomColor: '#F0F1F3',
        borderBottomWidth: 1,
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 24,
        paddingRight: 24
    },
    hr: {
        borderBottomColor: '#F0F1F3',
        borderBottomWidth: 1,
        paddingLeft: 24,
        paddingRight: 24
    },
    cityText: {
        color: '#444B69',
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        fontWeight: '500'
    },
    cityChange: {
        color: '#9DA6C1',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    rowMenu: {
        marginTop: 30,
        marginLeft: 26,
        marginRight: 26
    },
    menuItem: {
        flexDirection: 'row',
        marginBottom: 30
    },
    menuText: {
        color: '#444B69',
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        fontWeight: '500',
        marginLeft: 15
    },
    menuBadge: {
        position: 'absolute',
        right: 0,
        paddingRight: 5,
        paddingLeft: 5,
    },
    badge: {
        backgroundColor: '#42BCBC',
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 5
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
    modalExit: {
        margin: 0,
        backgroundColor: 'rgba(31, 35, 52, 0.6)',
        flexDirection: 'column'
    },
    modalExitContent:{
        width: '100%',
        position: 'absolute',
        backgroundColor: '#FFF',
        borderRadius: 20,
        paddingTop: 44,
        paddingBottom: 40,
        paddingLeft: 24,
        paddingRight: 24,
        marginLeft: '5%',
        marginRight: '5%',
        width: '90%',
    },
    modalExitIcon: {
        marginLeft: 20,
        
    },
    modalExitTitle: {
        color: '#444B69',
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        textAlign: 'center'
    },
    modalExitText: {
        color: '#444B69',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        textAlign: 'center',
        paddingTop: 20
    },
    modalExitBtnGroup: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        
    },
    modalExitBtnDiscard: {
        paddingTop: 20,
        paddingBottom: 20,
        width: '40%',
        backgroundColor: '#F0F1F3',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    modalExitBtnExit: {
        paddingTop: 20,
        paddingBottom: 20,
        width: '45%',
        backgroundColor: '#42BCBC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    modalExitBtnExitText: {
        color: '#fff'
    },
    shareBlock: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        
    },
    shareRow: {
        marginLeft: 12,
        marginRight: 12,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    shareText: {
        fontSize: 12,
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 4
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
    bottomBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 90,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: '#fff',
        borderTopColor: '#444B69',
        shadowColor: '#455B63',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 12
    },
    bottomBtnText: {
        color: '#444B69'
    }
});
