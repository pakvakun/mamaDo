import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Dimensions, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import {Header} from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import ActiveDot from '../../../../assets/images/hello/ActiveDot';
import UnActiveDot from '../../../../assets/images/hello/UnActiveDot';

import LeftArrow from '../../../../assets/images/hello/LeftArrow';
import RightArrow from '../../../../assets/images/hello/RightArrow';
import IconBack from '../../../../assets/images/icons/icons-back';
import Stars from '../../../../assets/images/icons/icons-stars';

class CreateBusinesProfile extends Component{
    state = {
        succesfullCreateProfileModal: false,
        activeSlide: 0,
            screenWidth: Dimensions.get('window').width,
            carouselItems: [
                {
                    title: 'Обучение',
                    description: 'Текст обучения для пользователей в разделе бизнес профиля. Возможно так же описание преимуществ.',
                    image: require('../../../../assets/images/images/businesProfileCarouselIcon.png')
                },
                {
                    title: 'Преимущества',
                    description: 'Текст обучения для пользователей в разделе бизнес профиля. Возможно так же описание преимуществ.',
                    image: require('../../../../assets/images/images/businesProfileCarouselIcon.png')
                },
            ],
            text: 'Введите номер телефона'
    }
    toggleSuccesfullCreateProfileModal = () => {
        this.setState({ succesfullCreateProfileModal: !this.state.succesfullCreateProfileModal });
    };
    BtnClickRedirect = () => {
        this.setState({ succesfullCreateProfileModal: !this.state.succesfullCreateProfileModal });
        this.props.navigation.navigate('BusinesProfile');
    }
    _renderItem({item, index}){
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center', paddingLeft: 40, paddingRight: 40,borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
                <Image style={{marginBottom: 65}} source={item.image} />
                <Text style={styles.itemTitle} >{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
        )
    }

    get pagination() {
        return (
            <Pagination
                dotsLength={this.state.carouselItems.length}
                activeDotIndex={this.state.activeSlide}
                containerStyle={{ position: 'absolute', bottom: '15%' }}
                dotElement={<View style={{marginRight: 5, marginLeft: 5}}><ActiveDot/></View>}
                inactiveDotElement={<View style={{marginRight: 5, marginLeft: 5}}><UnActiveDot/></View>}
                inactiveDotOpacity={1}
                inactiveDotScale={1}
            />
        );
    }

    render(){
        return(
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: 'Создать бизнес профиль', style: { color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 17, fontWeight: '400' } }}
                    containerStyle={{
                        backgroundColor: '#556086',
                        borderBottomWidth: 0
                    }}
                    leftComponent={<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{left: 25}}><IconBack fill='#fff'/></TouchableOpacity>}
                />
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
                <View style={styles.submitPhone}>
                    <Text style={styles.submitPhoneText}>Номер телефона</Text>
                    <TextInput
                    style={styles.submitPhoneInput}
                    placeholder={this.state.text}
                    onChangeText={(text) => this.setState({text})}
                    />
                    <TouchableOpacity style={styles.submitPhoneBtn} onPress={this.toggleSuccesfullCreateProfileModal}>
                        <Text style={{color: '#fff', fontFamily: 'SF Pro Text', fontSize: 17, fontWeight: '400' }}>Создать бизнес профиль</Text>
                    </TouchableOpacity>
                </View>
                <Modal style={styles.modalSuccess} isVisible={this.state.succesfullCreateProfileModal}>
                    <View style={styles.modalSuccessContent}>
                        <View style={styles.modalSuccessHeader}>
                            <Stars style={styles.modalSuccessIcon}/>
                            <Text style={styles.modalSuccessText}>Бизнес профиль создан</Text>
                        </View>
                        <TouchableOpacity style={styles.modalSuccessBtn} onPress={this.BtnClickRedirect} >
                            <Text style={styles.modalSuccessBtnText}>Ок</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
            
        )
    }
}

export default CreateBusinesProfile;

const styles = StyleSheet.create({
    containerCarousel: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        
        backgroundColor: '#48547B',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#556086',
        borderTopLeftRadius: 20,
        
    },
    header:{
        flexDirection: 'row',
        width: '100%',
        top: 0,
        flex: 0.4,
        alignItems: 'flex-end',
        justifyContent: 'center',
       
        paddingBottom: 10,
        
    },
    headerText: {
        fontSize: 18,
        color: '#fff'
    },
    itemTitle: {
        fontSize: 30,
        fontFamily: 'SF Compact Rounded',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 25
    },
    itemDescription: {
        textAlign: 'center',
        fontSize: 16,
        color: '#fff',
        lineHeight: 24,
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        marginBottom: 100
    },
    leftArrow: {
        position: 'absolute',
        left: '30%',
        bottom: '19%'
    },
    rightArrow: {
        position: 'absolute',
        right: '30%',
        bottom: '19%'
    },
    submitPhone: {
        backgroundColor: '#fff' ,
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        
    },
    iconBack: {
        position: 'absolute',
        left: 20,
        bottom: 10
    },
    submitPhoneText: {
        color: '#444B69',
        fontSize: 17,
        fontFamily: 'SF Pro Text',

    },
    submitPhoneInput:{
        borderColor: '#DEE2EB',
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        marginBottom: 10,
        marginTop: 10,
        width: '100%',
        flex: 0.5,
        paddingLeft: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    submitPhoneBtn:{
        backgroundColor: '#E94C89',
        marginBottom: 10,
        marginTop: 10,
        width: '100%',
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    modalSuccess: {
        margin: 0,
        backgroundColor: 'rgba(31, 35, 52, 0.6)',
        flexDirection: 'column'
    },
    modalSuccessContent: {
        width: '100%',
        position: 'absolute',
        backgroundColor: '#FFF',
        borderRadius: 20,
        paddingTop: 20,
        paddingBottom: 40,
        paddingLeft: 24,
        paddingRight: 24,
        marginLeft: '5%',
        marginRight: '5%',
        width: '90%',
    },
    modalSuccessHeader: {
        flexDirection: 'row'
    },
    modalSuccessText: {
        color: '#444B69',
        fontSize: 19,
        fontFamily: 'SF Pro Text',
    },
    modalSuccessIcon: {
        marginLeft: 10,
        marginRight: 10
    },
    modalSuccessBtn: {
        alignSelf: 'flex-end',
        backgroundColor: '#42BCBC',
        height: 44,
        minWidth: 118,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 30,
        
        marginRight: 24
    },
    modalSuccessBtnText: {
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
    }
});
