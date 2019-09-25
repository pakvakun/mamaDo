import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, StatusBar} from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';


import IconBackWhite from '../../assets/images/icons/icons-back-white';
import NoAvatar from '../../assets/images/icons/no-avatar';
import OpenRight from '../../assets/images/icons/open-right';
import CitySelect from '../../assets/images/icons/city-select-ico';
import IconList from '../../assets/images/bottomIcons/list';

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
    citySelect = (city) => {
        console.log(city)
        this.setState({ citySelect: city})
    }
    // getCurrentCity = async () => {
    //     try {
    //         let currentPosition = await AsyncStorage.getItem('currentPosition')
    //         alert('getCurrentCity')
    //         if (currentPosition !== null) {
    //             currentPosition = JSON.parse(currentPosition)
    //             this.setState({ currentPlace: currentPosition.place })
    //         }
    //     } catch (error) {
            
    //     }
    // }
    componentDidMount() {
        // this.getCurrentCity()
    }
    render() {   
             
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <TouchableOpacity style={styles.iconBack} onPress={() => this.props.navigation.navigate('Login')} >
                    <IconBackWhite/>
                </TouchableOpacity>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.profileInfo}>
                        <View>
                            <NoAvatar/>
                        </View>
                        <View style={styles.containerEnter}>
                            <Text style={styles.enterText}>Войдите в профиль</Text>
                            <Text style={styles.notCreate}>Профиль не создан</Text>
                        </View>
                        <View style={{marginLeft: 'auto', marginTop: 15}}>
                            <OpenRight/>
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
                                <Text style={styles.cityText}>{this.state.citySelect && this.state.citySelect.name || this.props.currentPlace || 'Загрузка...'}</Text>
                                <Text style={styles.cityChange}>Выберите город</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
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
                    {/* <View style={styles.goToListBlock}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ListOuter')} style={styles.menuItem}>
                            <IconList style={{marginTop: 2}} fill="#9DA6C1"/>
                            <Text style={styles.menuText}>Перейти в список</Text>
                        </TouchableOpacity>
                    </View> */}
                </ScrollView>
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
        width: 24,
        marginLeft: 24,
        top: 60
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
    goToListBlock: {
        borderTopWidth: 1,
        borderTopColor: '#F0F1F3',
        paddingTop: 30,
        paddingLeft: 26,
        paddingRight: 26
    }
});
