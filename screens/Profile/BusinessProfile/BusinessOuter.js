import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, Image, Animated} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation';
import {Grayscale} from 'react-native-color-matrix-image-filters';
import {Header} from 'react-native-elements';
import Modal from "react-native-modal";
import Swipeable from 'react-native-swipeable';
import axios from 'axios';

//Icons
import IconAddReview from "../../../assets/images/icons/icon-add-review";
import EventUser from "../../../assets/images/icons/event-user";
import EventRun from "../../../assets/images/icons/event-run";
import IconMetro from "../../../assets/images/icons/icon-metro";
import StarRating from "react-native-star-rating";
import IconCompanyCreated from '../../../assets/images/icons/icon-company-created';
import IconCompanyEdit from '../../../assets/images/icons/icon-company-edit';
import IconModalTrash from "../../../assets/images/icons/icon-modal-trash";


//Menu Icon
import IconMenu from '../../../assets/images/business/icon-menu';

//Bottom Icons
import CompanyIcon from '../../../assets/images/business/company';
import EventsIcon from '../../../assets/images/business/events';
import MessagesIcon from '../../../assets/images/business/messages';
import ResponsesIcon from '../../../assets/images/business/responses';

//Screens
import EventsScreen from './Events';
import MessgaesScreen from './Messages';
import RequestsScreen from './Requests';
import CompanyNot from './Elements/company-not';
import IconEventChat from "../../../assets/images/icons/icon-event-chat";
import NewsScreen from "../../Components/News";
import NewsPage from "../../Components/NewsPage";
import BusinessEventPage from './BusinessEventPage';
import EventPage from "../../Profile/BusinessProfile/BusinessEventPage";
//helpers
import { DeclinationFeedackString, DeclinationYearsString, searchAndFilter, Loading} from '../../../helpers/helpers';


class Company extends Component {
    constructor(props){
        super(props);
        this.swipe = null;
        this.state = {
            companyCreated: false,
            currentlyOpenSwipeable: null
        }
    }
    getT = async () => {
        try {
            let token = await AsyncStorage.getItem('token')
            if (token !== null) {
                let AuthStr = 'Bearer'.concat(JSON.parse(token))
                this.setState({token: AuthStr})
                this.getCompanies(AuthStr)
            }
        } catch (error) {
            
        }
    }
    getCompanies = (token) => {
        axios({
            method: 'GET',
            baseURL: 'http://mamado.elgrow.ru',
            url: '/api/company/address/my',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': token,
            },
            timeout: 10000, 
        }).then( (res)=> {
            alert('response here')
            this.setState({myCompaniesArr: res.data.data})
            
        }).catch( err => {
            alert(`error: ${JSON.stringify(err.response.data.error)}`);
        })
    }
    toggleModalDelete = () => {
        this.setState({modalDelete: !this.state.modalDelete})
    }
    confirmDeleteCompany = (id) => {
        this.setState({deleteId: id})
        this.toggleModalDelete()
    }
    deleteCompany = () => {
        axios({
            method: 'DELETE',
            baseURL: 'https://mamado.elgrow.ru/',
            url: `/api/address/${this.state.deleteId}`,
            headers: {
                Authorization: this.state.token,
            }
        }).then((res)=>{            
            let newCompanyRow = this.state.myCompaniesArr.filter(item => {
                if (item.id === this.state.deleteId) {
                    return false
                }else{
                    return true
                }
            })
            this.setState({myCompaniesArr: newCompanyRow})
            this.toggleModalDelete()        
        }).catch(err=>{console.log('err', err)})
    };
    companyEdit = (id) => {
        axios({
            method: 'GET',
            baseURL: 'https://mamado.elgrow.ru',
            url: `/api/company/${id}`,
            headers: {
                Authorization: this.state.token,
            }
        }).then( res => { this.props.navigation.navigate('BusinessEditCompany', { companyEdit: res.data })
        }).catch( err => console.log(err))
    }
    recenter = () => {        
        this.swipe.recenter()
    }
    rightButtons = (id) => {
        let rightButton = 
                [
                <TouchableOpacity style={{backgroundColor: '#42BCBC', flex: 1}} onPress={()=> this.confirmDeleteCompany(id)}>
                    <Text style={{textAlign: 'left', marginTop: 90, marginLeft: 35, color: '#FFF', fontSize: 16, fontFamily: 'SF Pro Text', fontWeight: '500'}}>Удалить</Text>
                </TouchableOpacity>
                ]
        return rightButton
    };
    toggleModalCompany = () => {
        this.setState({ companyCreated: !this.state.companyCreated });
    };
    
    componentDidMount(){
        this.didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.getT();
            }
          );
        
    };
    // componentDidUpdate(prevProps, prevState){
            //if (prevState && prevState.token !== this.state.token && this.state.companiesArr) {
                //this.getCompanies()
            // }
    // }
    componentWillUnmount(){
        this.didBlurSubscription.remove()
    }
    render() {        
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Header
                    centerComponent={{ text: 'Мои компании', style: { color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 17, fontWeight: '500' } }}
                    containerStyle={{
                        backgroundColor: '#556086',
                        borderBottomWidth: 0
                    }}
                    leftComponent={<TouchableOpacity onPress={() => this.props.navigation.navigate('BusinesProfile')} style={{left: 25}}><IconMenu/></TouchableOpacity>}
                />
                {this.state.myCompaniesArr && this.state.myCompaniesArr.length ? (
                    <View style={styles.textContainer}>
                        <ScrollView>
                            {this.state.myCompaniesArr.map((item,index)=>{
                                    if(!item.published){
                                        return (
                                            <Swipeable key={item.id} rightButtonWidth={140} rightButtons={this.rightButtons(item.id)}>
                                                <View style={styles.rowItem} >                        
                                                    <View style={styles.rowItemContainer}>
                                                        <View>
                                                            <EventUser/>
                                                        </View>
                                                        <Text style={styles.rowItemAge}>
                                                        {
                                                            item.model.age_min !== null && (item.model.age_min !== null || item.model.age_max !== null) ?
                                                            `от ${item.model.age_min} до ${item.model.age_max} лет`:
                                                            <DeclinationYearsString str={`${item.model.age_min}`}/>
                                                        }
                                                        </Text>
                                                        <View style={{marginLeft: 20}}>
                                                            <EventRun/>
                                                        </View>
                                                        {
                                                            item.distance && 
                                                                <Text style={styles.rowItemRun}>
                                                                        {   item.distance > 1 ?
                                                                            `${item.distance.toFixed(1)} км` :
                                                                            `${item.distance.toFixed(3) * 1000} м`
                                                                        } 
                                                                </Text>
                                                        }
                                                    </View>
                                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('MyCompany',{ idCompany: item.model.id , idAddress: item.id})}>
                                                        <Text style={styles.rowItemTitle}>{item.model.name}</Text>
                                                    </TouchableOpacity>
                                                    <View style={styles.rowItemMoreBlock}>
                                                        <View style={styles.rowItemMoreBlockFirst}>
                                                            <Image source={{ uri :item.model.avatar_download && item.model.avatar_download.url}}  style={styles.rowImage}/>
                                                        </View>
                                                        <View style={{flex: 0.76}}>
                                                            <Text style={styles.rowItemStreet}>
                                                                {item.text}
                                                            </Text>
                                                                
                                                                <Text style={{marginTop: 6}}>
                                                                {
                                                                    item.station 
                                                                    ?
                                                                    <>
                                                                    <IconMetro style={{marginTop: -2, marginRight: 7}} fill={'#' + item.station.line.hex_color}/>
                                                                    <Text style={styles.rowItemMetro}>{item.station.name}</Text>
                                                                    </>
                                                                    : <Text style={styles.rowItemMetro}></Text>
                                                                    
                                                                }
                                                                </Text>
                                                            <View style={styles.rowItemStars}>
                                                                <View>
                                                                <StarRating
                                                                    disabled={true}
                                                                    maxStars={4}
                                                                    rating={item.model.feedbacks_rating_avg.length > 0 ? +item.model.feedbacks_rating_avg[0].avg : 0}
                                                                    starSize={15}
                                                                    starStyle={{marginRight: 4}}
                                                                    fullStarColor="#FACD42"
                                                                    emptyStarColor="#E2E4E9"
                                                                />
                                                                </View>
                                                                <View style={{marginLeft: 20}}>
                                                                    <Text style={styles.rowItemReviews}>
                                                                        <DeclinationFeedackString count={item.model.feedbacks_count}/>
                                                                    </Text>
                                                                </View>
                                                                <View style={{marginLeft: 'auto'}}>
                                                                    <TouchableOpacity onPress={() => this.companyEdit(item.model.id)}>
                                                                        <IconCompanyEdit/>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </Swipeable>
                                            )}else{
                                        return (
                                            <View key={index} style={styles.rowItem}>
                                                <View style={styles.rowItemContainer}>
                                                    <View>
                                                        <EventUser/>
                                                    </View>
                                                    <Text style={styles.rowItemAgeGray}>
                                                        {
                                                            item.model.age_min !== null && (item.model.age_min !== null || item.model.age_max !== null) ?
                                                            `от ${item.model.age_min} до ${item.model.age_max} лет`:
                                                            <DeclinationYearsString str={`${item.model.age_min}`}/>
                                                        }
                                                    </Text>
                                                    <View style={{marginLeft: 20}}>
                                                        <EventRun/>
                                                    </View>
                                                        {
                                                            item.distance && 
                                                                <Text style={styles.rowItemRunGray}>
                                                                        {   item.distance > 1 ?
                                                                            `${item.distance.toFixed(1)} км` :
                                                                            `${item.distance.toFixed(3) * 1000} м`
                                                                        } 
                                                                </Text>
                                                        }
                                                </View>
                                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('MyCompany',{ company: item, refresh: this.refresh })}>
                                                    <Text style={styles.rowItemTitleGray}>{item.model.name}</Text>
                                                </TouchableOpacity>
                                                <View style={styles.rowItemMoreBlock}>
                                                    <View style={styles.rowItemMoreBlockFirst}>
                                                        <Grayscale>
                                                            <Image source={{uri :item.model.avatar_download && item.model.avatar_download.url}} style={styles.rowImageGrey}/>
                                                        </Grayscale>
                                                    </View>
                                                    <View style={{flex: 0.76}}>
                                                        <Text style={styles.rowItemStreetGray}>{item.text}</Text>
                                                        <Text style={{marginTop: 6}}>
                                                            {
                                                                item.station 
                                                                ?
                                                                <>
                                                                <IconMetro style={{marginTop: -2, marginRight: 7}} fill={'#' + item.station.line.hex_color}/>
                                                                <Text style={styles.rowItemMetro}>{item.station.name}</Text>
                                                                </>
                                                                : <Text style={styles.rowItemMetro}></Text>
                                                                
                                                            }
                                                        </Text>
                                                        <View style={styles.rowItemStars}>
                                                            <View>
                                                                <StarRating
                                                                    disabled={true}
                                                                    maxStars={4}
                                                                    rating={item.model.feedbacks_rating_avg.length > 0 ? +item.model.feedbacks_rating_avg[0].avg : 0}
                                                                    starSize={15}
                                                                    starStyle={{marginRight: 4}}
                                                                    fullStarColor="#A4AABA"
                                                                    emptyStarColor="#E2E4E9"
                                                                />
                                                            </View>
                                                            <View style={{marginLeft: 20}}>
                                                                <Text style={styles.rowItemReviewsGray}>{item.model.feedbacks_count} отзыва</Text>
                                                            </View>
                                                            <View style={{marginLeft: 'auto'}}>
                                                                <Text style={{color: '#E94C89', fontSize: 13, fontFamily: 'SF Pro Text', fontWeight: '500'}}>На модерации</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    }
                            })}
                        </ScrollView>
                    </View>
                ) : <CompanyNot/>}
                <TouchableOpacity onPress={() => this.props.navigation.navigate('BusinessCreateCompany')} style={{
                    position: 'absolute',
                    width: 52,
                    height: 52,
                    bottom: 20,
                    right: 16,
                    backgroundColor: '#E94C89',
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <IconAddReview/>
                </TouchableOpacity>
                <Modal isVisible={this.state.companyCreated} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={styles.modalMinTitleBlock}>
                            <IconCompanyCreated style={{marginRight: 10, marginTop: -10}}/>
                            <Text style={styles.modalMinTitle}>Компания успешно создана</Text>
                        </View>
                        <View style={styles.modalMinDescBlock}>
                            <Text style={styles.modalMinDesc}>
                                Активация будет произведена после модерации.
                            </Text>
                        </View>
                        <View style={styles.modalMinButtonsBlock}>
                            <TouchableOpacity onPress={this.toggleModalCompany} style={styles.modalMinConfirm}>
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
                            <TouchableOpacity onPress={this.toggleModalDelete} style={styles.modalMinCancel}>
                                <Text style={styles.modalMinCancelText}>ОТМЕНА</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> this.deleteCompany()} style={styles.modalMinConfirm}>
                                <Text style={styles.modalMinConfirmText}>УДАЛИТЬ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

// const CompanyFunc = createStackNavigator({
//     Company: Company,
//     CompanyPage: BusinessEventPage,
// }, {
//     headerMode: 'none'
// });

// const EventsFunc = createStackNavigator({
//     EventsScreen: EventsScreen,
//     Event: EventPage,
// }, {
//     headerMode: 'none'
// });

const TabNavigator = createBottomTabNavigator({
    Company: {
        screen: Company,
        navigationOptions:{
            tabBarLabel:'Компании',
            tabBarIcon: ({focused}) => (
                <CompanyIcon fill={focused ? "#E94C89" : "#868FB1"}/>
            )
        }
    },
    Events: {
        screen: EventsScreen,
        navigationOptions:{
            tabBarLabel:'События',
            tabBarIcon: ({focused}) => (
                <EventsIcon fill={focused ? "#42BCBC" : "#868FB1"}/>
            )
        }
    },
    Messages: {
        screen: MessgaesScreen,
        navigationOptions:{
            tabBarLabel:'Сообщения',
            tabBarIcon: ({focused}) => (
                <View>
                    <MessagesIcon fill={focused ? "#42BCBC" : "#868FB1"}/>
                    <View style={styles.bottomBadge}>
                        <Text style={styles.bottomText}>+10</Text>
                    </View>
                </View>
            )
        }
    },
    Responses: {
        screen: RequestsScreen,
        navigationOptions:{
            tabBarLabel:'Заявки',
            tabBarIcon: ({focused}) => (
                <View>
                    <ResponsesIcon fill={focused ? "#42BCBC" : "#868FB1"}/>
                    <View style={styles.bottomBadge}>
                        <Text style={styles.bottomText}>+2</Text>
                    </View>
                </View>
            )
        }
    }
},{
    tabBarOptions:{
        labelStyle: {
            color: '#444B69',
            fontSize: 12,
            fontFamily: 'SF Pro Text',
            lineHeight: 14,
            fontWeight: '500',
        },
        tabStyle: {
            paddingTop: 10
        },
        style:{
            shadowColor: '#455B63',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            height: 60,
            borderTopWidth: 0
        }
    }
});

export default createAppContainer(TabNavigator);

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
        overflow: 'hidden'
    },
    rowItem: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F1F3',
        tintColor: 'gray'
    },
    rowItemContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowItemAge: {
        marginLeft: 4,
        color: '#444B69',
        fontSize: 13,
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    rowItemRun: {
        marginLeft: 4,
        color: '#444B69',
        fontSize: 13,
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    rowItemAgeGray: {
        marginLeft: 4,
        color: '#A4AABA',
        fontSize: 13,
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    rowItemRunGray: {
        marginLeft: 4,
        color: '#A4AABA',
        fontSize: 13,
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    badgeSale: {
        backgroundColor: '#38AFAF',
        marginLeft: 'auto',
        borderRadius: 3,
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 3,
        paddingBottom: 3
    },
    badgeGray: {
        backgroundColor: '#F0F1F3',
        marginLeft: 'auto',
        borderRadius: 3,
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 3,
        paddingBottom: 3
    },
    badgeCoupon: {
        backgroundColor: '#F0BF37',
        marginLeft: 'auto',
        borderRadius: 3,
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 3,
        paddingBottom: 3
    },
    badgeStock: {
        backgroundColor: '#76AD2A',
        marginLeft: 'auto',
        borderRadius: 3,
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 3,
        paddingBottom: 3
    },
    badgeFree: {
        backgroundColor: '#34A0E3',
        marginLeft: 'auto',
        borderRadius: 3,
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 3,
        paddingBottom: 3
    },
    textBadge: {
        color: '#FFF',
        fontFamily: 'SF Compact Rounded',
        fontSize: 13,
        fontWeight: '500'
    },
    textBadgeGray: {
        color: '#A4AABA',
        fontFamily: 'SF Compact Rounded',
        fontSize: 13,
        fontWeight: '500'
    },
    rowItemTitle: {
        fontSize: 18,
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontWeight: '600',
        marginTop: 10
    },
    rowItemTitleGray: {
        fontSize: 18,
        color: '#A4AABA',
        fontFamily: 'SF Pro Text',
        fontWeight: '600',
        marginTop: 10
    },
    rowItemMoreBlock: {
        marginTop: 15,
        flexDirection: 'row'
    },
    rowItemMoreBlockFirst: {
        borderRadius: 10,
        flex: 0.24
    },
    eventLike: {
        width: 27,
        height: 27,
        backgroundColor: '#FFF',
        borderRadius: 100,
        position: 'absolute',
        bottom: -1,
        left: -2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowImage: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
    rowImageGrey: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
    rowItemStreet: {
        fontSize: 14,
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    rowItemStreetGray: {
        fontSize: 14,
        color: '#A4AABA',
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    rowItemMetro: {
        fontSize: 14,
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        marginTop: 6,
    },
    rowItemMetroGray: {
        fontSize: 14,
        color: '#A4AABA',
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        marginTop: 6
    },
    rowItemStars: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowItemReviews: {
        color: '#444B69',
        fontSize: 13,
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    rowItemReviewsGray: {
        color: '#A4AABA',
        fontSize: 13,
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
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
    modalMinDescBlock: {
        marginTop: 20,
        marginLeft: 30,
    },
    modalMinButtonsBlock: {
        marginTop: 35,
        marginLeft: 30,
        flexDirection: 'row'
    },
    modalMinTitle: {
        color: '#444B69',
        fontSize: 19,
        fontFamily: 'SF Pro Text',
        fontWeight: '500',
        paddingRight: 20
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
    bottomBadge: {
        backgroundColor: '#E94C89',
        borderRadius: 3,
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 2,
        paddingBottom: 2,
        position: 'absolute',
        left: 15,
        top: -4
    },
    bottomText: {
        color: '#FFF',
        fontSize: 12,
        fontFamily: 'SF Compact Rounded',
        fontWeight: '700'
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
    modalMinCancelText: {
        color: '#444B69',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '500',
        textAlign: 'center'
    },
});


{/* <Swipeable key={item.id} rightButtonWidth={140} rightButtons={this.rightButtons(item.id)}>
        <View style={styles.rowItem}>
            <View style={styles.rowItemContainer}>
                <View>
                    <EventUser/>
                </View>
                <Text style={styles.rowItemAge}>{item.age_min}{item.age_max}</Text>
                <View style={{marginLeft: 20}}>
                    <EventRun/>
                </View>
                <Text style={styles.rowItemRun}>{item.dist}</Text>
                <View style={styles.badgeSale}>
                    <Text style={styles.textBadge}>{item.badge}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('CompanyPage')}>
                <Text style={styles.rowItemTitle}>{item.name}</Text>
            </TouchableOpacity>
            <View style={styles.rowItemMoreBlock}>
                <View style={styles.rowItemMoreBlockFirst}>
                    <Image source={item.media[0]}/>
                </View>
                <View style={{flex: 0.76}}>
                    <Text style={styles.rowItemStreet}>{item.street}</Text>
                    <Text style={{marginTop: 6}}>
                        <IconMetro style={{marginTop: -2}}/>
                        <Text style={styles.rowItemMetro}> {item.metro}</Text>
                    </Text>
                    <View style={styles.rowItemStars}>
                        <View>
                            <StarRating
                                disabled={true}
                                maxStars={4}
                                rating={item.stars}
                                starSize={15}
                                starStyle={{marginRight: 4}}
                                fullStarColor="#FACD42"
                                emptyStarColor="#E2E4E9"
                            />
                        </View>
                        <View style={{marginLeft: 20}}>
                            <Text style={styles.rowItemReviews}>{item.reviews} отзыва</Text>
                        </View>
                        <View style={{marginLeft: 'auto'}}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('BusinessEditCompany', {
                                companyId: item.id,
                                inputName: item.name,
                                inputAge: item.age,
                                inputCategory: item.category,
                                inputPhone: item.phone,
                                inputEmail: item.email,
                                inputSite: item.site,
                                socialArr: item.socialLinks,
                                inputAdres: item.street,
                                inputAddAdres: item.anptherStreet,
                                inputDesc: item.desc,
                                mediaContent: item.media,
                            })}>
                                <IconCompanyEdit/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </Swipeable> */}