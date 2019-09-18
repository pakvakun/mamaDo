import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, StatusBar} from 'react-native';
import Modal from 'react-native-modal';

import IconBackWhite from '../../assets/images/icons/icons-back-white';
import CitySelect from '../../assets/images/icons/city-select-ico';
import IconList from '../../assets/images/bottomIcons/list';
import IconExit from '../../assets/images/icons/icon-exit';
import IconEditProfile from '../../assets/images/icons/icon-edit-profile';

//Profile Menu
import IconChild from '../../assets/images/profile/icon-menu-child';
import IconSchedule from '../../assets/images/profile/icon-menu-schedule';
import IconNotify from '../../assets/images/profile/icon-menu-notify';
import IconMessages from '../../assets/images/profile/icon-menu-messages';
import IconFavorite from '../../assets/images/profile/icon-menu-favorite';
import IconBuisnes from '../../assets/images/profile/icon-menu-buisnes';
import RightArrow from '../../assets/images/icons/rightArrow';

//Menu
import About from '../../assets/images/menu/about';
import Information from '../../assets/images/menu/information'
import Contact from '../../assets/images/menu/contact';
import Oferta from '../../assets/images/menu/oferta';

class NoProfile extends Component {
    state = {
        isModalVisible: false
    };

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <TouchableOpacity style={styles.iconBack} onPress={() => this.props.navigation.navigate('Login')} >
                    <IconBackWhite/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconExit}>
                    <IconExit/>
                </TouchableOpacity>
                <View style={styles.header}>
                    <View style={styles.profileInfo}>
                        <View>
                            <Image source={require('../../assets/images/images/avatars/profilePhoto.png')} />
                        </View>
                        <View style={styles.containerEnter}>
                            <Text style={styles.enterText}>Екатерина Калинина</Text>
                            <Text style={styles.notCreate}>Пользователь</Text>
                        </View>
                        <View style={{marginLeft: 'auto', marginTop: 30}}>
                            <IconEditProfile/>
                        </View>
                    </View>
                </View>
                <View style={styles.menuContainer}>
                    <ScrollView>
                        <View style={styles.citySelect}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('CitySelect')} style={styles.changeCityBlock}>
                                <View>
                                    <CitySelect/>
                                </View>
                                <View style={{marginLeft: 13}}>
                                    <Text style={styles.cityText}>Екатеринбург</Text>
                                    <Text style={styles.cityChange}>Выберите город</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{borderBottomColor: '#F0F1F3',borderBottomWidth: 1}}/>
                        <View style={styles.rowMenu}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('#')} style={styles.menuItem}>
                                <IconChild/>
                                <Text style={styles.menuText}>Дети</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('#')} style={styles.menuItem}>
                                <IconSchedule/>
                                <Text style={styles.menuText}>Мое расписание</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.toggleModal} style={styles.menuItem}>
                                <IconNotify/>
                                <Text style={styles.menuText}>Уведомления</Text>
                                <View style={{borderRadius: 5, backgroundColor: '#42BCBC', marginLeft: 'auto', paddingLeft: 13, paddingRight: 13, paddingTop: 2, paddingBottom: 2}}>
                                    <Text style={{color: '#FFF', fontSize: 13, fontFamily: 'SF Compact Rounded', fontWeight: '700'}}>9</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('#')} style={styles.menuItem}>
                                <IconMessages/>
                                <Text style={styles.menuText}>Сообщения</Text>
                                <View style={{borderRadius: 5, backgroundColor: '#42BCBC', marginLeft: 'auto', paddingLeft: 13, paddingRight: 13, paddingTop: 2, paddingBottom: 2}}>
                                    <Text style={{color: '#FFF', fontSize: 13, fontFamily: 'SF Compact Rounded', fontWeight: '700'}}>2</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('#')} style={styles.menuItem}>
                                <IconFavorite/>
                                <Text style={styles.menuText}>Избранное</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{borderBottomColor: '#F0F1F3',borderBottomWidth: 1}}/>
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
                        <View style={{borderTopWidth: 1, borderTopColor: '#F0F1F3', paddingTop: 30, paddingLeft: 26, paddingRight: 26}}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ListOuter')} style={styles.menuItem}>
                                <IconList style={{marginTop: 2}} fill="#9DA6C1"/>
                                <Text style={styles.menuText}>Перейти в список</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <View style={styles.bussinesOuter}>
                        <TouchableOpacity style={styles.bussinesButton}>
                            <View>
                                <IconBuisnes/>
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('BusinessCreateProfile')} style={{marginLeft: 15}}>
                                <Text style={{color: '#444B69', fontSize: 16, fontFamily: 'SF Pro Text', fontWeight: '500'}}>Создать бизнес профиль</Text>
                            </TouchableOpacity>
                            <View style={{marginLeft: 'auto'}}>
                                <RightArrow/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal isVisible={this.state.isModalVisible} style={styles.modal}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Поделиться с помощью</Text>
                        <View style={styles.shareBlock}>
                            <TouchableOpacity style={styles.shareRow}>
                                <Image source={require('../../assets/images/IOS/IOSPhone.png')}/>
                                <Text style={styles.shareText}>Телефон</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.shareRow}>
                                <Image source={require('../../assets/images/IOS/IOSMail.png')}/>
                                <Text style={styles.shareText}>Mail</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.shareRow}>
                                <Image source={require('../../assets/images/IOS/IOSMessage.png')}/>
                                <Text style={styles.shareText}>Сообщение</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={this.toggleModal} style={styles.modalClose}>
                            <Text style={styles.modalButtonText}>ОТМЕНА</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}

export default NoProfile;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#556086',
        height: '100%'
    },
    iconBack: {
        position: 'absolute',
        left: 24,
        top: 60,
    },
    iconExit: {
        position: 'absolute',
        right: 24,
        top: 55,
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
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerEnter: {
        marginLeft: 15
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
        flex: 1,
        marginTop: 180,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 30,
        overflow: 'hidden',
    },
    changeCityBlock: {
        flexDirection: 'row'
    },
    citySelect: {
        paddingTop: 30,
        paddingBottom: 30,
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
        fontWeight: '400',
        marginTop: 6
    },
    rowMenu: {
        marginTop: 30,
        marginLeft: 26,
        marginRight: 26,
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
    shareBlock: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'center'
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
    bussinesOuter: {
        backgroundColor: '#FFF',
        shadowColor: '#455B63',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        marginBottom: -30,
        paddingBottom: 30
    },
    bussinesButton: {
        paddingTop: 24,
        paddingLeft: 26,
        paddingRight: 26,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    }
});
