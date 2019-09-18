import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Header} from 'react-native-elements';
import {Grayscale} from "react-native-color-matrix-image-filters";
import Modal from "react-native-modal";


//Menu Icon
import IconMenu from '../../../assets/images/business/icon-menu';

//Images
import ImageHome from '../../../assets/images/business/image-home';
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import EventUser from "../../../assets/images/icons/event-user";
import EventRun from "../../../assets/images/icons/event-run";
import IconMetro from "../../../assets/images/icons/icon-metro";
import StarRating from "react-native-star-rating";
import IconCompanyEdit from "../../../assets/images/icons/icon-company-edit";
import IconAddReview from "../../../assets/images/icons/icon-add-review";
import IconPlus from "../../../assets/images/icons/icon-plus-public";
import IconModalTrash from "../../../assets/images/icons/icon-modal-trash";
import IconInfo from "../../../assets/images/icons/icon-info";
import axios from 'axios';

import { DeclinationFeedackString, DeclinationYearsString, searchAndFilter, Loading} from '../../../helpers/helpers';
import NothingForPreview from '../../Components/nothingForPreview';


class Active extends Component {
    render(){
        return(
            <View style={styles.textContainerTab}>{
                this.props.activeEventsArr && this.props.activeEventsArr.length > 0
                ? (<ScrollView>
                    { this.props.activeEventsArr.map((item,index)=>{
                        return (
                            <View key={index} style={styles.rowItem}>
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
                                    <View style={styles.blockPrice}>
                                        <View style={{marginRight: 15}}>
                                            <Text style={styles.textPrice}>{item.model.price} ₽</Text>
                                        </View>
                                        <View style={styles[item.model.offer_type.key]}>
                                            <Text style={styles.textBadge}>{item.model.offer_type.name}</Text>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('BusinessEventPage', {isActiveEvent: true, idEvent: item.id})}>
                                    <Text style={styles.rowItemTitle}>{item.model.name}</Text>
                                </TouchableOpacity>
                                <View style={styles.rowItemMoreBlock}>
                                    <View style={styles.rowItemMoreBlockFirst}>
                                        <Image source={{ uri :item.model.avatar_download && item.model.avatar_download.url}} style={styles.rowImage}/>
                                    </View>
                                    <View style={{flex: 0.76}}>
                                        <Text style={styles.rowItemStreet}>{item.text}</Text>
                                        <Text style={{marginTop: 6}}>
                                            <IconMetro style={{marginTop: -2}}/>
                                            <Text style={styles.rowItemMetro}> {item.station}</Text>
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
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('BusinessEditEvent', {idEvent: item.model_id})}>
                                                    <IconCompanyEdit/>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>)
                : <NothingForPreview tabName={'Актвных Событий'}/>
                }
                <TouchableOpacity onPress={() => this.props.navigation.navigate('BusinessCreateEvent')} style={{
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
            </View>
        )
    }
    
};

class NotActive extends Component{
    state = {
        isModalPublic: false,
    }

    togglePublic = () => {
        this.setState({ isModalPublic: !this.state.isModalPublic });
    };
    
    render(){        
        return (
            <View style={styles.textContainerTab}> 
                {
                    this.props.disableEventsArr && this.props.disableEventsArr.length > 0
                    ? (<ScrollView>
                        {this.props.disableEventsArr && this.props.disableEventsArr.map((item,index)=>{
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
                                        <View style={styles.blockPrice}>
                                            <View style={{marginRight: 15}}>
                                                <Text style={styles.textPriceGray}>{item.model.price} ₽</Text>
                                            </View>
                                            <View style={styles.badgeGray}>
                                                <View style={styles[`${item.model.offer_type.key}Grey`]}>
                                                    <Text style={styles.textBadge}>{item.model.offer_type.name}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('BusinessEventPage', {isActiveEvent: false, idEvent: item.id})} >
                                        <Text style={styles.rowItemTitleGray}>{item.model.name}</Text>
                                    </TouchableOpacity>
                                    <View style={styles.rowItemMoreBlock}>
                                        <View style={styles.rowItemMoreBlockFirst}>
                                            <Grayscale>
                                                <Image source={{ uri :item.model.avatar_download && item.model.avatar_download.url}} style={styles.rowImage}/>
                                            </Grayscale>
                                        </View>
                                        <View style={{flex: 0.76}}>
                                            <Text style={styles.rowItemStreetGray}>{item.text}</Text>
                                            <Text style={{marginTop: 6}}>
                                                <IconMetro fill="#A4AABA" style={{marginTop: -2}}/>
                                                <Text style={styles.rowItemMetroGray}> {item.station}</Text>
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
                                                    <Text style={styles.rowItemReviewsGray}>
                                                        <DeclinationFeedackString count={item.model.feedbacks_count}/>
                                                    </Text>
                                                </View>
                                                <TouchableOpacity onPress={()=> this.props.isPublicNow(item.id)} style={{marginLeft: 'auto'}}>
                                                    <IconPlus/>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>)
                    : <NothingForPreview tabName={'Неактивных событий'}/>
                }
                    <Modal isVisible={this.state.isModalPublic} style={styles.modal}>
                        <View style={styles.modalMinContentNew}>
                            <View style={styles.modalMinTitleBlock}>
                                <IconInfo style={{marginRight: 10, marginTop: -15}}/>
                                <Text style={styles.modalMinTitle}>Опубликовать событие сейчас?</Text>
                            </View>
                            <View style={styles.modalMinButtonsBlock}>
                                <TouchableOpacity onPress={this.togglePublic} style={styles.modalMinCancel}>
                                    <Text style={styles.modalMinCancelText}>ОТМЕНА</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> this.props.confirmEventPublic()} style={styles.modalMinConfirm}>
                                    <Text style={styles.modalMinConfirmText}>ДА</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
            </View>
        )
    }
};
class Events extends Component {
    constructor(props){
        super(props);
        this.state = {
            index: 0,
            routes: [
                {key: 'Active', title: 'АКТИВНЫЕ'},
                {key: 'NotActive', title: 'НЕ АКТИВНЫЕ'},
            ],
        }
    }
    isPublicNow = (id) => {
        let disableEventForConfirm = this.state.disableEventsArr.filter( item => {
            return item.id == id
        })
        let newDisableEvents = this.state.disableEventsArr.filter( item => {
            return item.id !== id
        })
        disableEventForConfirm[0].active = true;
        this.setState({disableEventForConfirm: disableEventForConfirm, newDisableEvents: newDisableEvents})
    }
    getT = async () => {
        try {
            let token = await AsyncStorage.getItem('token');
            let AuthStr = 'Bearer'.concat(JSON.parse(token))
            this.setState({token: AuthStr})
            this.getEventsCompany()
        } catch (error) {
            
        }
    }
    confirmEventPublic = () => {
        let temp = this.state.activeEventsArr;
        temp.push(this.state.disableEventForConfirm)
        this.setState({activeEventsArr: temp, disableEventsArr: this.state.newDisableEvents})
    }
    getEventsCompany = (userId) => {
        axios({
            method: 'GET',
            baseURL: 'http://mamado.elgrow.ru',
            url: '/api/event/address/my',
            headers: {
                Authorization: this.state.token,
            }
        }).then( (res) => {            
            let EventArr = res.data.data;
            if (EventArr) {
                let activeEventsArr = EventArr.filter(item => {
                    return item.model.published
                })
                let disableEventsArr = EventArr.filter(item => {
                    return !item.model.published
                })
                this.setState({activeEventsArr: activeEventsArr, disableEventsArr: disableEventsArr})
            }
        }).catch(err => {console.log({err})})
    }
    _renderHeader = props => <TabBar {...props}
         indicatorStyle={{ backgroundColor: 'white' }}
         style={{ backgroundColor: 'pink' }}
    />;
    componentDidMount(){
        const didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.getEventsCompany()
            }
          );
        this.getT()
    }
    // componentWillUnmount(){
    //     didBlurSubscription.remove()
    // }
    render() {
        
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Header
                    centerComponent={{ text: 'Мои события', style: { color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 17, fontWeight: '500' } }}
                    containerStyle={{
                        backgroundColor: '#556086',
                        borderBottomWidth: 0
                    }}
                    leftComponent={<TouchableOpacity onPress={() => this.props.navigation.navigate('BusinesProfile')} style={{left: 25}}><IconMenu/></TouchableOpacity>}
                />
                {this.state.activeEventsArr || this.state.disableEventsArr ? (
                    <TabView
                        navigationState={this.state}
                        renderHeader={this._renderHeader}
                        onIndexChange={index => this.setState({ index })}
                        renderScene={SceneMap({
                            Active: ()=><Active {...this.state} {...this.props}/>,
                            NotActive: ()=><NotActive {...this.state} {...this.props} isPublicNow={this.isPublicNow} confirmEventPublic={this.confirmEventPublic}/>,
                        })}
                        renderTabBar={props =>
                            <TabBar
                                {...props}
                                indicatorStyle={styles.tabBarIndicator}
                                style={{ backgroundColor: '#556086', color: '#FFF' }}
                                activeColor="#FFFFFF"
                                inactiveColor="#9DA6C1"
                                labelStyle={{fontFamily: 'SF Compact Rounded', fontSize: 16, fontWeight: '500'}}
                                contentContainerStyle={{ marginTop: 7, paddingLeft: 5, paddingRight: 5 }}
                            />
                        }
                    />
                ) : (
                    <View style={styles.textContainer}>
                        <View style={{alignItems: 'center'}}>
                            <ImageHome/>
                            <Text style={styles.textCreate}>
                                Что бы создать событие,{"\n"}
                                сначала создайте компанию
                            </Text>
                        </View>
                        <View style={styles.blockButton}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('BusinessCreateCompany')} style={styles.businessButton}>
                                <Text style={styles.businessButtonText}>Создать компанию</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        );
    }
}

export default Events;

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
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContainerTab: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
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
    rowImage: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
    sale: {
        backgroundColor: '#38AFAF',
        marginLeft: 'auto',
        borderRadius: 3,
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 3,
        paddingBottom: 3
    },
    coupon: {
        backgroundColor: '#F0BF37',
        marginLeft: 'auto',
        borderRadius: 3,
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 3,
        paddingBottom: 3
    },
    stock: {
        backgroundColor: '#76AD2A',
        marginLeft: 'auto',
        borderRadius: 3,
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 3,
        paddingBottom: 3
    },
    free: {
        backgroundColor: '#34A0E3',
        marginLeft: 'auto',
        borderRadius: 3,
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 3,
        paddingBottom: 3
    },
    saleGrey: {
        backgroundColor: '#A4AABA',
        marginLeft: 'auto',
        borderRadius: 3,
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 3,
        paddingBottom: 3
    },
    couponGrey: {
        backgroundColor: '#A4AABA',
        marginLeft: 'auto',
        borderRadius: 3,
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 3,
        paddingBottom: 3
    },
    stockGrey: {
        backgroundColor: '#A4AABA',
        marginLeft: 'auto',
        borderRadius: 3,
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 3,
        paddingBottom: 3
    },
    freeGrey: {
        backgroundColor: '#A4AABA',
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
        marginTop: 6
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
    textPrice: {
        color: '#444B69',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '600'
    },
    textPriceGray: {
        color: '#A4AABA',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '600'
    },
    blockPrice: {
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center'
    },
    modalMinContent: {
        marginLeft: 24,
        marginRight: 24,
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 24,
    },
    modalMinContentNew: {
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
        paddingRight: 20,
        lineHeight: 26
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
    modalMinCancel: {
        backgroundColor: '#F0F1F3',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 10,
        width: 118,
        marginLeft: 'auto'
    },
    tabBarIndicator: {
        width: 40,
        backgroundColor: '#66CBCB',
        height: 4,
        borderRadius: 10,
        left: '20%'
    },
    textCreate: {
        fontFamily: 'SF Pro Text',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 40,
        color: '#444B69',
        lineHeight: 24
    },
    businessButton: {
        marginTop: 35,
        backgroundColor: '#E94C89',
        borderRadius: 10,
        width: '100%',
        paddingTop: 18,
        paddingBottom: 18
    },
    businessButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '600',
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    blockButton: {
        width: '100%',
        paddingLeft: 24,
        paddingRight: 24
    }
});
