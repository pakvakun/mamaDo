import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import LoginScreen from '../AuthSreens/loginScreen';
import FirstSlide from '../../assets/images/hello/1';

import ActiveDot from '../../assets/images/hello/ActiveDot';
import UnActiveDot from '../../assets/images/hello/UnActiveDot';

import LeftArrow from '../../assets/images/hello/LeftArrow';
import RightArrow from '../../assets/images/hello/RightArrow';


class Hello extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeSlide: 0,
            screenWidth: Dimensions.get('window').width,
            carouselItems: [
                {
                    title: 'Календарь',
                    description: 'Создайте календарь с расписанием ваших детей, и вы не пропустите назначенные мероприятия',
                    image: require('../../assets/images/hello/1.png')
                },
                {
                    title: 'Бронирование',
                    description: 'Бронируйте занятия и оплачивайте их в приложении Mamado',
                    image: require('../../assets/images/hello/2.png')
                },
                {
                    title: 'Занятость детей',
                    description: 'Создайте календарь с расписанием ваших детей, и вы не пропустите назначенные мероприятия',
                    image: require('../../assets/images/hello/3.png')
                }
            ],
                isFirstLaunch: true
            }
        
    }
    
    getAsyncStorData = async () =>{
        try {
            var isAuth = await AsyncStorage.getItem('isAuth');
            var isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');

            if(isFirstLaunch !== null){
                this.setState({isFirstLaunch: !!isFirstLaunch});
                if(isAuth !== null ){
                    this.props.navigation.navigate('ListOuter', isAuth)
                }else{
                    this.props.navigation.navigate('Login')
                }
            }
        } catch (error) {}
    }
    setAsyncStorData = async () => {
        var err;
        try {
            await AsyncStorage.setItem('isFirstLaunch', JSON.stringify(false))
        } catch (error) {
            err = error
        }
        if (!err) {
            this.props.navigation.navigate('Login')
        }
    }
    
    _renderItem({item, index}){
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center', paddingLeft: 40, paddingRight: 40}}>
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
    componentDidMount(){
        this.getAsyncStorData()
    }
    render() {
        
        return (
            <View style={styles.container}>
            { this.state.isFirstLaunch &&(
                <>
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
                <TouchableOpacity onPress={() => this.setAsyncStorData()} style={styles.skip}>
                    <Text style={styles.skipText}>Пропустить</Text>
                </TouchableOpacity>
                </>
            )
            }
            </View> 
        );
    }
}

export default Hello;

const styles = StyleSheet.create({
    containerCarousel: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    skip: {
        position: 'absolute',
        bottom: 55,
        width: '100%'
    },
    skipText: {
        fontSize: 15,
        color: '#444B69',
        textAlign: 'center',
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    itemTitle: {
        fontSize: 30,
        fontFamily: 'SF Compact Rounded',
        fontWeight: 'bold',
        color: '#444B69',
        marginBottom: 25
    },
    itemDescription: {
        textAlign: 'center',
        fontSize: 16,
        color: '#444B69',
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
    }
});
