import React, {Component} from 'react';
import {StyleSheet, View, Image, SafeAreaView, Dimensions, ScrollView, Text, TouchableOpacity, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";
import axios from 'axios'
import moment from 'moment'
import {Grayscale} from "react-native-color-matrix-image-filters";


//Icons
import IconStars from "../../../assets/images/icons/icons-stars";
import IconTrash from "../../../assets/images/icons/icon-trash";
import IconBackWhite from "../../../assets/images/icons/icons-back-white";
import IconLikePage from "../../../assets/images/icons/icon-like-page";
import IconShare from "../../../assets/images/icons/icon-white-share";
import GeoLink from "../../../assets/images/icons/icon-geo-link";
import IconStatAge from "../../../assets/images/icons/icon-stat-age";
import IconStatRaiting from "../../../assets/images/icons/icon-stat-raiting";
import IconStatComments from "../../../assets/images/icons/icon-stat-comments";
import IconStatViews from "../../../assets/images/icons/icon-stat-views";
import IconCalendar from "../../../assets/images/icons/icon-event-calendar";
import EventRun from "../../../assets/images/icons/event-run";
import IconButtonPhone from "../../../assets/images/icons/icon-button-phone";
import IconButtonMessage from "../../../assets/images/icons/icon-button-message";
import IconEventHome from "../../../assets/images/icons/icon-event-home";
import IconEventArrow from "../../../assets/images/icons/icon-event-arrow";
import IconEventGeo from "../../../assets/images/icons/icon-event-geo";
import IconMetro from "../../../assets/images/icons/icon-metro";
import IconRubble from "../../../assets/images/icons/icon-rubble";
import IconPhoto from "../../../assets/images/icons/icon-photo";
import IconPlay from "../../../assets/images/icons/icon-video-play";
import IconEventLike from "../../../assets/images/icons/icon-event-like";
import IconEventReserv from "../../../assets/images/icons/icon-event-reserv";
import IconEventChat from "../../../assets/images/icons/icon-event-chat";
import StarRating from "react-native-star-rating";
import IconEdit from "../../../assets/images/icons/icon-edit-profile";
import IconPublic from "../../../assets/images/icons/icon-public";
import IconModalArchive from '../../../assets/images/icons/icon-modal-archive';

// let isActiveEvent = false

class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeSlide: 0,
            isModalShare: false,
            isModalCall: false,
            isModalFavorite: false,
            isModalReserv: false,
            isModalChat: false,
            screenWidth: Dimensions.get('window').width,
            carouselItems: [],
            isActiveEvent: this.props.navigation.state.params.isActiveEvent || false, //GetIsActiveEvent
        }
    }


    toggleModalShare = () => {
        this.setState({ isModalShare: !this.state.isModalShare });
    };

    toggleModalCall = () => {
        this.setState({ isModalCall: !this.state.isModalCall });
    };

    toggleModalFavorite = () => {
        this.setState({ isModalFavorite: !this.state.isModalFavorite });
    };

    toggleModalReserv = () => {
        this.setState({ isModalReserv: !this.state.isModalReserv });
    };

    toggleModalChat = () => {
        this.setState({ isModalChat: !this.state.isModalChat });
    };
    
    toggleModalDelete = () => {
        this.setState({ isModalDelete: !this.state.isModalDelete });
    };

    toggleModalDeleteSuccess = () => {
        this.setState({ isModalDeleteSuccess: !this.state.isModalDeleteSuccess });
    };

    _renderItem({item, index}){
        return (
            <View style={styles.itemOuter}>
                <LinearGradient colors={['#2D2D2D', '#21232C']} style={{borderRadius: 10}}>
                    <Image style={{opacity: 0.7, minWidth: '100%', width: '100%', height: '100%', resizeMode: 'cover'}} source={{ uri: item.download.url }}/>
                </LinearGradient>
                {item && item.video ? (
                    <TouchableOpacity style={styles.videoOuter}>
                        <IconPlay/>
                        <Text style={styles.videoText}>Смотреть видео</Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        )
    }
    _renderItemArchive({item, index}){
        return (
            <View style={styles.itemOuter}>
                <LinearGradient colors={['#2D2D2D', '#21232C']} style={{borderRadius: 10}}>
                    <Grayscale>
                        <Image style={{opacity: 0.7, minWidth: '100%', width: '100%', height: '100%', resizeMode: 'cover'}} source={{ uri: item.download.url }}/>
                    </Grayscale>
                </LinearGradient>
                <View style={{width: 212, backgroundColor: '#FFF', opacity: 0.9, borderRadius: 10, height: 40, position: 'absolute', top: '42%', alignItems: 'center', justifyContent: 'center', zIndex: 10}}>
                    <Text style={{color: '#444B69', fontFamily: 'SF Pro Text', fontSize: 14, fontWeight: '500', textAlign: 'center'}}>Событие не активно</Text>
                </View>
            </View>
        )
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

    getInfoAboutEvent = (id) => {
        axios({
            method: 'GET',
            baseURL: 'https://mamado.elgrow.ru',
            url: `/api/event/address/${id}`
        }).then(res => {
            this.setState({event: res.data})
        }).catch(err=>{console.log(err)})
    }

    deleteEvent = id => {
        axios({
            method: 'DELETE',
            baseURL: 'https://mamado.elgrow.ru',
            url: `/api/address/${id}`,
            headers: {
                Authorization: this.state.token,
            }
        }).then((res)=>{
            this.toggleModalDelete()
            setTimeout(()=>this.toggleModalDeleteSuccess(), 400)
        }).catch(err=>{
            console.log('err', err);
        })
    }
    get pagination() {
        return (
            <Pagination
                dotsLength={this.state.event && this.state.event.model.gallery_items && this.state.event.model.gallery_items.length}
                activeDotIndex={this.state.activeSlide}
                containerStyle={{top: -105}}
                dotColor='#FFF'
                inactiveDotColor='#FFF'
                inactiveDotOpacity={0.3}
                inactiveDotScale={1}
            />
        );
    }
    componentDidMount(){
        this.getInfoAboutEvent(this.props.navigation.state.params.idEvent)
        this.getT()
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                this.getInfoAboutEvent(this.props.navigation.state.params.idEvent)
            }
        );
    }
    componentWillUnmount(){
        this.willFocusSubscription.remove()
    }
    render() {
        var {event} = this.state
        console.log(event)
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <TouchableOpacity style={styles.backContainer} onPress={() => this.props.navigation.goBack(null)}>
                    <IconBackWhite/>
                </TouchableOpacity>
                <View style={styles.navHead}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('BusinessEditEvent', {idEvent: this.state.event.model_id})} style={{marginRight: 25}}>
                        <IconEdit/>
                    </TouchableOpacity>
                    {
                        this.state.isActiveEvent
                            ?<TouchableOpacity onPress={this.toggleModalFavorite}>
                                <IconPublic/>
                            </TouchableOpacity>
                            :<TouchableOpacity onPress={()=> this.toggleModalDelete()} style={{marginLeft: 'auto'}}>
                                <IconTrash/>
                            </TouchableOpacity>
                    }
                    
                    
                </View>
                <SafeAreaView style={styles.containerCarousel}>
                    <Carousel
                        data={(event && event.model && event.model.gallery_items)}
                        sliderWidth={this.state.screenWidth}
                        itemWidth={this.state.screenWidth}
                        renderItem={this.state.isActiveEvent ? this._renderItem : this._renderItemArchive}
                        onSnapToItem={(index) => this.setState({activeSlide: index}) }
                    />
                    {this.pagination}
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>Скидка</Text>
                    </View>
                </SafeAreaView>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('EventMap')} style={styles.geoLink}>
                    <GeoLink/>
                </TouchableOpacity>
                <View style={{flex: 1}}>
                    <ScrollView contentContainerStyle={{paddingBottom: 60}} style={styles.textBlock}>
                        <View style={{paddingLeft: 20, paddingRight: 20}}>
                            <View style={styles.topStat}>
                                <View style={{flexDirection: 'row'}}>
                                    <IconStatAge style={{marginRight: 5}}/>
                                    <Text style={styles.topStatText}>
                                    {
                                            event 
                                            ?   event.model &&
                                                event.model.age_min !== null && (event.model.age_min !== null || event.model.age_max !== null) ?
                                                    `от ${event.model.age_min} до ${event.model.age_max} лет`:
                                                    <DeclinationYearsString str={event.model.age_min}/>
                                            :   null
                                    }
                                    </Text>
                                </View>
                                <View style={{marginLeft: 20, flexDirection: 'row'}}>
                                    <IconStatRaiting style={{marginRight: 5}}/>
                                    <Text style={styles.topStatText}>
                                        {
                                            event 
                                                ?   event.model && 
                                                    event.model.feedbacks_rating_avg && 
                                                    event.model.feedbacks_rating_avg.length > 0 && 
                                                        (+event.model.feedbacks_rating_avg[0].avg).toFixed(1) || 0
                                                :   null
                                        }
                                    </Text>
                                </View>
                                <View style={{marginLeft: 20, flexDirection: 'row'}}>
                                    <IconStatComments style={{marginRight: 5, marginTop: 2}}/>
                                    <Text style={styles.topStatText}>
                                        {
                                            event
                                            ?   event.model && 
                                                event.model.feedbacks_count || 0
                                            : null
                                        }   
                                    </Text>
                                </View>
                                <View style={{marginLeft: 20, flexDirection: 'row'}}>
                                    <IconStatViews style={{marginRight: 5, marginTop: 2}}/>
                                    <Text style={styles.topStatText}>
                                        {
                                            event
                                            ?   event.model && 
                                                event.model.views || 0
                                            : null
                                        }   
                                    </Text>
                                </View>
                            </View>
                            <View style={{marginTop: 20}}>
                                <Text style={styles.titleEvent}>
                                    {
                                        event 
                                        ?   event.model && 
                                            event.model.name || ''
                                        :   null    
                                    }
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 20}}>
                                <View style={{flexDirection: 'row'}}>
                                    <IconCalendar style={{marginRight: 8}}/>
                                    <View style={{width: '100%', height: '100%'}}>
                                    {
                                        event 
                                        ?   event.model && event.model.type == 'TIME'
                                                ?    event.model.event_time && event.model.event_time.date 
                                                    ?   (<Text style={styles.textPeriod}>
                                                            { `${ moment(event.model.event_time.date).format('D MMMM')}` }
                                                        </Text>)
                                                    :   <Text style={styles.textPeriod}>Не определено</Text>
                                                :   null
                                        :   null
                                    }
                                    {
                                        event 
                                        ?   event.model && event.model.type == 'SCHEDULE' 
                                                ?  
                                                    event.model.event_schedules && event.model.event_schedules.length>0 
                                                    ?   (<Text style={styles.textPeriod} >
                                                            { `До ${ moment(event.model.event_schedules[event.model.event_schedules.length - 1].date).format('D MMMM')}` }
                                                        </Text>)
                                                    :   <Text style={styles.textPeriod}>Не определено</Text>
                                                :   null
                                        :   null
                                    }
                                    {
                                        event 
                                        ?   event.model && event.model.type == 'PERIOD'
                                                ?   event.model.event_period && event.model.event_period.start && event.model.event_period.end
                                                    ?   (<Text style={styles.textPeriod}>
                                                            {
                                                                event.model.event_period
                                                                    ?  `С ${ moment(event.model.event_period.start).format('D MMMM')} по ${moment(event.model.event_period.end).format('D MMMM')}`
                                                                    : null
                                                            }
                                                        </Text>)
                                                    :   <Text style={styles.textPeriod}>Не определено</Text>
                                                : null
                                        :   null
                                    }
                                </View>
                                </View>
                                <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
                                    <EventRun style={{marginRight: 8}}/>
                                    <Text style={{color: '#444B69', fontFamily: 'SF Pro Text', fontSize: 13, fontWeight: '400'}}>
                                        {   event 
                                            ?   event.distance > 1 ?
                                                `${event.distance.toFixed(1)} км` :
                                                `${event.distance.toFixed(3) * 1000} м`
                                            :   null
                                        } 
                                    </Text>
                                </View>
                            </View>
                            <View style={{marginTop: 30}}>
                                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{width: 27, alignItems: 'center'}}>
                                        <IconEventHome style={{marginRight: 6}}/>
                                    </View>
                                    <Text style={styles.companyName}>
                                        {
                                            event 
                                            ?   event.model 
                                                ?   event.model.company
                                                    ?   event.model.company.name
                                                    :   'Загрузка...'
                                                :   null
                                            :   null
                                        }
                                    </Text>
                                    <IconEventArrow style={{marginLeft: 8}}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('EventMap')} style={{marginTop: 18}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={{width: 27, alignItems: 'center'}}>
                                            <IconEventGeo style={{marginRight: 6}}/>
                                        </View>
                                        <Text style={styles.adress}>
                                            {event && event.text||'Загрузка...'}
                                        </Text>
                                        <IconEventArrow style={{marginLeft: 8}}/>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5, marginLeft: 27}}>
                                        <IconMetro style={{marginRight: 5}}/>
                                        <Text style={styles.textMetro}>
                                            {event && event.station ||'Загрузка...'}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.hr}></View>
                            <View style={{marginTop: 40, paddingLeft: 20, paddingRight: 20}}>
                                <Text style={styles.descTitle}>Описание</Text>
                                <Text style={styles.descText}>
                                    {
                                        event && event.model && event.model.about?
                                            event.model.about:
                                            'Загрузка...'
                                    }
                                </Text>
                                <TouchableOpacity style={{marginTop: 12}} onPress={this.toggleAboutFull}>
                                    <Text style={styles.showAll}>
                                        {
                                            this.state.isVisibleAboutFull?
                                            'Скрыть':
                                            'Показать все'
                                        }
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        <View style={styles.hr}></View>
                        <View style={{paddingRight: 20, paddingLeft: 20, flexDirection: 'column'}}>
                        
                            {
                                event && event.model && event.model.feedbacks && event.model.feedbacks.length > 0 
                                    ?   <>
                                            <View style={{ marginTop: 30}}>
                                                <View style={{flexDirection: 'row'}}>
                                                    <Text style={styles.reviewTitle}>Отзывы</Text>
                                                    <TouchableOpacity style={{marginLeft: 'auto'}}>
                                                        <Text style={styles.openAll}>Все</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                {
                                                    event && event.model && event.model.feedbacks.map( (item, index) => (
                                                        <View key={index}>
                                                            <View style={{marginTop: 30, flexDirection: 'row'}}>
                                                                <View>
                                                                    <Image source={require('../../../assets/images/images/photoReview.png')} />
                                                                </View>
                                                                <View style={{marginLeft: 12}}>
                                                                    <View style={{width: 40}}>
                                                                        <StarRating
                                                                            disabled={true}
                                                                            maxStars={4}
                                                                            rating={item.rating}
                                                                            starSize={15}
                                                                            starStyle={{marginRight: 4}}
                                                                            fullStarColor="#FACD42"
                                                                            emptyStarColor="#E2E4E9"
                                                                        />
                                                                    </View>
                                                                    <Text style={styles.reviewName}>{item.name || 'No Name'}</Text>
                                                                    <Text style={styles.reviewDate}>{item.created_at && moment(item.created_at).format('DD.MM.YY')}</Text>
                                                                </View>
                                                            </View>
                                                            <View style={{marginTop: 20}}>
                                                                <Text style={styles.reviewText}>
                                                                    {item.text}
                                                                </Text>
                                                            </View>
                                                            <TouchableOpacity style={{marginTop: 18}}>
                                                                <Text style={{alignItems: 'center'}}>
                                                                    <IconPhoto style={{marginRight: 6, marginTop: -2}}/>
                                                                    <Text style={styles.photos}>
                                                                        {   item.gallery_items.length > 0
                                                                                ?   this.getFeedbacksPhotos(item)
                                                                                :   0
                                                                            
                                                                        } Фото
                                                                    </Text>
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>))
                                                }
                                            </View>
                                        </>
                                    :   <View style={styles.reviewBlock}>
                                            <Text style={styles.reviewTitle}>Отзывы</Text>
                                            <Text style={styles.reviewTextNone}>Отзывов пока нет</Text>
                                        </View>
                            }
                            <View style={{marginTop: 60}}>
                                <TouchableOpacity style={{borderRadius: 10, backgroundColor: '#E94C89', paddingTop: 18, paddingBottom: 18}}>
                                    <Text style={{fontWeight: '600', textAlign: 'center', color: '#FFF', textTransform: 'uppercase', fontSize: 14, fontFamily: 'SF Pro Text'}}>Редактировать</Text>
                                </TouchableOpacity>
                                {
                                    this.state.isActiveEvent
                                        ?   <TouchableOpacity style={{marginTop: 10, borderRadius: 10, backgroundColor: '#F0F1F3', paddingTop: 18, paddingBottom: 18}}>
                                                <Text style={{fontWeight: '600', textAlign: 'center', color: '#444B69', textTransform: 'uppercase', fontSize: 14, fontFamily: 'SF Pro Text'}}>Добавить событие в архив</Text>
                                            </TouchableOpacity>
                                        :   <TouchableOpacity style={{marginTop: 10, borderRadius: 10, backgroundColor: '#F0F1F3', paddingTop: 18, paddingBottom: 18}}>
                                                <Text style={{fontWeight: '600', textAlign: 'center', color: '#444B69', textTransform: 'uppercase', fontSize: 14, fontFamily: 'SF Pro Text'}}>Опубликовать событие</Text>
                                            </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <Modal isVisible={this.state.isModalShare} style={styles.modal}>
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
                        <TouchableOpacity onPress={this.toggleModalShare} style={styles.modalClose}>
                            <Text style={styles.modalButtonText}>ОТМЕНА</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isModalCall} style={styles.modal}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Позвонить с помощью</Text>
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
                        <TouchableOpacity onPress={this.toggleModalCall} style={styles.modalClose}>
                            <Text style={styles.modalButtonText}>ОТМЕНА</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isModalFavorite} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={styles.modalMinTitleBlock}>
                            <Text>
                                <IconModalArchive style={{marginRight: 14}}/>
                                <Text style={styles.modalMinTitle}>Снять с публикации?</Text>
                            </Text>
                        </View>
                        <View style={styles.modalMinDescBlock}>
                            <Text style={styles.modalMinDesc}>
                                Событие будет снято с публикации и перемещено в архив
                            </Text>
                        </View>
                        <View style={styles.modalMinButtonsBlock}>
                            <TouchableOpacity onPress={this.toggleModalFavorite} style={styles.modalMinCancel}>
                                <Text style={styles.modalMinCancelText}>ОТМЕНА</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalMinConfirm}>
                                <Text style={styles.modalMinConfirmText}>ДА</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isModalDelete} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={styles.modalMinTitleBlock}>
                            <Text>
                                <IconModalArchive style={{marginRight: 14}}/>
                                <Text style={styles.modalMinTitle}>Удалить событие?</Text>
                            </Text>
                        </View>
                        <View style={styles.modalMinDescBlock}>
                            <Text style={styles.modalMinDesc}>
                                Вы уверены, что хотите удалить событие?
                            </Text>
                        </View>
                        <View style={styles.modalMinButtonsBlock}>
                            <TouchableOpacity onPress={()=>this.toggleModalDelete()} style={styles.modalMinCancel}>
                                <Text style={styles.modalMinCancelText}>ОТМЕНА</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalMinConfirm} onPress={()=>this.deleteEvent(event.id)}>
                                <Text style={styles.modalMinConfirmText}>ДА</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isModalDeleteSuccess} style={styles.modal} onDismiss={() => this.props.navigation.navigate('BusinessOuter')}>
                    <View style={styles.modalMinContent}>
                        <View style={styles.modalMinTitleBlock}>
                            <Text>
                                <IconStars style={{marginRight: 14}}/>
                                <Text style={styles.modalMinTitle}>Удалено</Text>
                            </Text>
                        </View>
                        <View style={styles.modalMinDescBlock}>
                            <Text style={styles.modalMinDesc}>
                                Ваше событие удалено!
                            </Text>
                        </View>
                        <View style={styles.modalMinButtonsBlockRight}>
                            <TouchableOpacity onPress={()=>{this.toggleModalDeleteSuccess(); this.props.navigation.goBack()}} style={styles.modalMinConfirmRight}>
                                <Text style={styles.modalMinConfirmText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isModalReserv} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={styles.modalMinTitleBlock}>
                            <Text>
                                <IconEventReserv style={{marginRight: 14}}/>
                                <Text style={styles.modalMinTitle}>Забронировать</Text>
                            </Text>
                        </View>
                        <View style={styles.modalMinDescBlock}>
                            <Text style={styles.modalMinDesc}>
                                Чтобы забронировать событие <Text style={{fontWeight: '500'}}>Войдите в профиль</Text>
                            </Text>
                        </View>
                        <View style={styles.modalMinButtonsBlock}>
                            <TouchableOpacity onPress={this.toggleModalReserv} style={styles.modalMinCancel}>
                                <Text style={styles.modalMinCancelText}>ОТМЕНА</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalMinConfirm}>
                                <Text style={styles.modalMinConfirmText}>ВОЙТИ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isModalChat} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={styles.modalMinTitleBlock}>
                            <Text>
                                <IconEventChat style={{marginRight: 14}}/>
                                <Text style={styles.modalMinTitle}>Начать чат</Text>
                            </Text>
                        </View>
                        <View style={styles.modalMinDescBlock}>
                            <Text style={styles.modalMinDesc}>
                                Чтобы начать чат с компанией <Text style={{fontWeight: '500'}}>Войдите в профиль</Text>
                            </Text>
                        </View>
                        <View style={styles.modalMinButtonsBlock}>
                            <TouchableOpacity onPress={this.toggleModalChat} style={styles.modalMinCancel}>
                                <Text style={styles.modalMinCancelText}>ОТМЕНА</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalMinConfirm}>
                                <Text style={styles.modalMinConfirmText}>ВОЙТИ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

export default LoginScreen;

const styles = StyleSheet.create({
    containerCarousel: {
        height: 450
    },
    container: {
        marginTop: -50,
        flex: 1
    },
    textBlock: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -110,
        paddingTop: 30
    },
    backContainer: {
        position: 'absolute',
        width: 24,
        marginLeft: 30,
        top: 110,
        zIndex: 1
    },
    navHead: {
        position: 'absolute',
        top: 110,
        right: 30,
        zIndex: 1,
        flexDirection: 'row'
    },
    badge: {
        backgroundColor: '#38AFAF',
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 3,
        zIndex: 1,
        position: 'absolute',
        top: 300,
        left: 20
    },
    badgeText: {
        color: '#FFF',
        fontFamily: 'SF Compact Rounded',
        fontSize: 13,
        fontWeight: '500'
    },
    geoLink: {
        width: 54,
        height: 54,
        borderRadius: 100,
        backgroundColor: '#FFF',
        position: 'absolute',
        top: 310,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.16,
        shadowRadius: 5,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    topStat: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    topStatText: {
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontSize: 13,
        fontWeight: '400'
    },
    titleEvent: {
        color: '#444B69',
        fontSize: 20,
        fontFamily: 'SF Pro Text',
        lineHeight: 26,
        fontWeight: '600'
    },
    buttonsGroup: {
        flexDirection: 'row',
        marginTop: 30
    },
    itemOuter: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    videoOuter: {
        position: 'absolute',
        zIndex: 3,
        marginTop: -100,
        alignItems: 'center'
    },
    videoText: {
        marginTop: 15,
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '600'
    },
    writeButton: {
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 29,
        width: 160,
        backgroundColor: '#F0F1F3',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    callButton: {
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 29,
        width: 160,
        backgroundColor: '#F0F1F3',
        marginLeft: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    buttonPublicBlock : {
        marginTop: 10, 
        borderRadius: 10, 
        backgroundColor: '#F0F1F3', 
        paddingTop: 18, 
        paddingBottom: 18
    },
    buttonPublicText : {
        fontWeight: '600', 
        textAlign: 'center', 
        color: '#444B69', 
        textTransform: 'uppercase', 
        fontSize: 14, 
        fontFamily: 'SF Pro Text'
    },
    buttonText: {
        fontWeight: '600',
        color: '#444B69',
        fontSize: 13,
        fontFamily: 'SF Pro Text',
        textTransform: 'uppercase'
    },
    textPeriod: {
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontSize: 16,
        fontWeight: '400'
    },
    companyName: {
        lineHeight: 24,
        fontSize: 16,
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    adress: {
        lineHeight: 24,
        fontSize: 16,
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    textMetro: {
        color: '#444B69',
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    buttonReserv: {
        marginTop: 30,
        height: 55,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    firstPartReserv: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: '#E94C89',
        flex: 0.6,
        paddingTop: 19,
        paddingBottom: 17,
        height: 55
    },
    buttonReservText: {
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    twoPartReserv: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#E03C7C',
        flex: 0.4,
        paddingTop: 17,
        paddingBottom: 17,
        height: 55
    },
    twoPartText: {
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        fontWeight: '600',
        textAlign: 'center',
        color: '#FFF',
        textTransform: 'uppercase'
    },
    descTitle: {
        color: '#444B69',
        fontSize: 19,
        fontFamily: 'SF Pro Text',
        fontWeight: '600'
    },
    descText: {
        marginTop: 18,
        lineHeight: 24,
        fontSize: 15,
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        color: '#444B69'
    },
    showAll: {
        fontSize: 15,
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontWeight: '500'
    },
    reviewTitle: {
        fontSize: 19,
        fontFamily: 'SF Pro Text',
        fontWeight: '600',
        color: '#444B69'
    },
    openAll: {
        color: '#E94C89',
        fontSize: 15,
        fontFamily: 'SF Pro Text',
        fontWeight: '500'
    },
    reviewName: {
        lineHeight: 24,
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        color: '#444B69',
        fontWeight: '500'
    },
    reviewDate: {
        lineHeight: 24,
        fontSize: 13,
        color: '#9DA6C1',
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    reviewText: {
        fontSize: 15,
        color: '#444B69',
        fontWeight: '400',
        lineHeight: 24
    },
    reviewTextNone: {
        color: '#A4AABA',
        fontSize: 15,
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        marginTop: 20
    },
    photos: {
        fontSize: 13,
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    hr: {
        backgroundColor: '#F0F1F3',
        height: 1,
        marginTop: 30
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
    modalMinConfirm: {
        backgroundColor: '#42BCBC',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 10,
        width: 118
    },
    modalMinTitle: {
        color: '#444B69',
        fontSize: 19,
        fontFamily: 'SF Pro Text',
        fontWeight: '500'
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
    modalMinButtonsBlockRight: {
        marginTop: 35,
        marginLeft: 30,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    modalMinConfirmRight: {
        backgroundColor: '#42BCBC',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 10,
        width: 118,
        alignSelf: 'flex-end'
    },
});
