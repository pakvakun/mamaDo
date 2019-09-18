import React, {Component} from 'react';
import {StyleSheet, View, Image, SafeAreaView, Dimensions, ScrollView, Text, TouchableOpacity, StatusBar, Linking } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LinearGradient from "react-native-linear-gradient";
import StarRating from "react-native-star-rating";
import Modal from "react-native-modal";
import axios from 'axios';
import moment from 'moment';

//Icons
import IconBackWhite from "../../assets/images/icons/icons-back-white";
import IconLikePage from "../../assets/images/icons/icon-like-page";
import IconShare from "../../assets/images/icons/icon-white-share";
import GeoLink from "../../assets/images/icons/icon-geo-link";
import IconStatAge from "../../assets/images/icons/icon-stat-age";
import IconStatRaiting from "../../assets/images/icons/icon-stat-raiting";
import IconStatComments from "../../assets/images/icons/icon-stat-comments";
import IconStatViews from "../../assets/images/icons/icon-stat-views";
import EventRun from "../../assets/images/icons/event-run";
import IconButtonPhone from "../../assets/images/icons/icon-button-phone";
import IconButtonMessage from "../../assets/images/icons/icon-button-message";
import IconEventHome from "../../assets/images/icons/icon-event-home";
import IconEventArrow from "../../assets/images/icons/icon-event-arrow";
import IconEventGeo from "../../assets/images/icons/icon-event-geo";
import IconMetro from "../../assets/images/icons/icon-metro";
import IconPlay from "../../assets/images/icons/icon-video-play";
import IconEventLike from "../../assets/images/icons/icon-event-like";
import IconEventReserv from "../../assets/images/icons/icon-event-reserv";
import IconEventChat from "../../assets/images/icons/icon-event-chat";
import IconCompanyRec from "../../assets/images/icons/icon-company-rec";
import IconPhoto from "../../assets/images/icons/icon-photo";
import EventUser from '../../assets/images/icons/event-user';
import Like from "../../assets/images/icons/like-nactive";
import IconNotFound from "../../assets/images/icons/icon-not-found";
import IconCheckMamado from "../../assets/images/icons/icon-checked-mamdo";
import IconCheckMark from "../../assets/images/icons/icon-check-mark";

//helpers 
import {DeclinationYearsString} from '../../helpers/helpers';
import Events from '../Components/events';
import NothingForPrev from '../Components/nothingForPreview';

class Company extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeSlide: 0,
            isModalShare: false,
            isModalCall: false,
            isModalFavorite: false,
            isModalReserv: false,
            isModalChat: false,
            isModalChecked: false,
            screenWidth: Dimensions.get('window').width,
            carouselItems: [],
            watchesCount: 0,
            period: false,
            companyName: false,
            about: false,
            isVisibleAboutFull: false,
            idCompany: this.props.navigation.state.params.id,
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

    toggleModalChecked = () => {
        this.setState({ isModalChecked: !this.state.isModalChecked });
    };
    toggleAboutFull = () => {
        this.setState({ isVisibleAboutFull: !this.state.isVisibleAboutFull})
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

    get pagination() {
        return (
            <Pagination
                dotsLength={this.state.company && this.state.company.model && this.state.company.model.gallery_items.length ? this.state.company.model.gallery_items.length : 0}
                activeDotIndex={this.state.activeSlide}
                containerStyle={{top: -105}}
                dotColor='#FFF'
                inactiveDotColor='#FFF'
                inactiveDotOpacity={0.3}
                inactiveDotScale={1}
            />
        );
    }
    getInfoAboutCompany = id => {
        axios({
            method: 'GET',
            baseURL: 'https://mamado.elgrow.ru',
            url: `/api/company/address/${id}`
        }).then( res => {
            this.setState({company: res.data})
        })
    }
    connect = (type, data) => {
        let url = `${type}://${data}`
        console.log(typeof url);
        
        Linking.openURL(url)
    }
    componentDidMount(){
        this.getInfoAboutCompany(this.props.navigation.state.params.idCompany)
    }
    render() {             
        const{ company } = this.state;
        
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <TouchableOpacity style={styles.backContainer} onPress={() => this.props.navigation.goBack()}>
                    <IconBackWhite/>
                </TouchableOpacity>
                <View style={styles.navHead}>
                    <TouchableOpacity onPress={this.toggleModalFavorite} style={{marginRight: 25}}>
                        <IconLikePage/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.toggleModalShare}>
                        <IconShare/>
                    </TouchableOpacity>
                </View>
                <SafeAreaView style={styles.containerCarousel}>
                    <Carousel
                        data={company ? company.model.gallery_items: []}
                        sliderWidth={this.state.screenWidth}
                        itemWidth={this.state.screenWidth}
                        renderItem={this._renderItem}
                        onSnapToItem={(index) => this.setState({activeSlide: index}) }
                    />
                    {this.pagination}
                    <TouchableOpacity onPress={this.toggleModalChecked} style={styles.badge}>
                        <View>
                            <IconCompanyRec style={{marginRight: 7}}/>
                        </View>
                        <View>
                            <Text style={styles.badgeText}>Проверено{"\n"}MamaDo</Text>
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('CompanyMap', {navProps: company})} style={styles.geoLink}>
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
                                        company 
                                        ?   company.model &&
                                                company.model.age_min !== null && (company.model.age_min !== null || company.model.age_max !== null) ?
                                                `от ${company.model.age_min} до ${company.model.age_max} лет`:
                                                <DeclinationYearsString str={company.model.age_min}/>
                                        : null
                                    }
                                    </Text>
                                </View>
                                <View style={{marginLeft: 15, flexDirection: 'row'}}>
                                <IconStatRaiting style={{marginRight: 5}}/>
                                <Text style={styles.topStatText}>
                                    {
                                        company
                                            ?   company.model.feedbacks_raiting_avg || 0
                                            :   null
                                    }
                                </Text>
                                </View>
                                <View style={{marginLeft: 15, flexDirection: 'row'}}>
                                    <IconStatComments style={{marginRight: 5, marginTop: 2}}/>
                                    <Text style={styles.topStatText}>
                                        {
                                            company
                                                ?   company.model.feedbacks_count || 0
                                                :   null
                                        }
                                    </Text>
                                </View>
                                <View style={{marginLeft: 15, flexDirection: 'row'}}>
                                    <IconStatViews style={{marginRight: 5, marginTop: 2}}/>
                                    <Text style={styles.topStatText}>
                                        {
                                            company
                                                ?   company.model.views || 0
                                                :   null
                                        
                                        }
                                    </Text>
                                </View>
                                <View style={{marginLeft: 15, flexDirection: 'row'}}>
                                    <EventRun style={{marginRight: 8}}/>
                                    <Text style={{color: '#444B69', fontFamily: 'SF Pro Text', fontSize: 13, fontWeight: '400'}}>
                                        {   company
                                            ?   company.distance > 1 ?
                                                `${company.distance.toFixed(1)} км` :
                                                `${company.distance.toFixed(3) * 1000} м`
                                            :   null
                                        }
                                    </Text>
                                </View>
                            </View>
                            <View style={{marginTop: 20}}>
                                <Text style={styles.titleEvent}>
                                    {
                                        company
                                        ?   company.model.name || ''
                                        :   null
                                    }
                                </Text>
                            </View>
                            <View style={styles.buttonsGroup}>
                                <TouchableOpacity onPress={this.toggleModalChat} style={styles.writeButton}>
                                    <IconButtonMessage style={{marginRight: 10}}/>
                                    <Text style={styles.buttonText}>Написать</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.toggleModalCall} style={styles.callButton}>
                                    <IconButtonPhone style={{marginRight: 10}}/>
                                    <Text style={styles.buttonText}>Позвонить</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginTop: 30}}>
                                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{width: 27, alignItems: 'center'}}>
                                        <IconEventHome style={{marginRight: 6}}/>
                                    </View>
                                    <Text style={styles.companyName}>
                                        {
                                            company
                                            ?   company.model.name || 'Loading...'
                                            :   null
                                        }
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('CompanyMap', {navProps: company})} style={{marginTop: 18}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={{width: 27, alignItems: 'center'}}>
                                            <IconEventGeo style={{marginRight: 6}}/>
                                        </View>
                                        <Text style={styles.adress}>
                                            {
                                                company
                                                ?   company.text
                                                :   null
                                            }
                                        </Text>
                                        <IconEventArrow style={{marginLeft: 8}}/>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5, marginLeft: 27}}>
                                            {
                                                company &&
                                                company.station
                                                ?   <>
                                                    <IconMetro style={{marginRight: 5}}/>
                                                    <Text style={styles.textMetro}>
                                                        {company.station || 'Loading...'}
                                                    </Text>
                                                    </>
                                                :   null
                                            }
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.hr}></View>
                        <View style={styles.descBlock}>
                            <Text style={styles.descTitle}>Описание</Text>
                            <Text style={styles.descText} numberOfLines={this.state.isVisibleAboutFull?0:4}>
                                { 
                                    company
                                    ?   company.model.about || 'Загрузка...' 
                                    :   null
                                }
                            </Text>
                            <TouchableOpacity style={{marginTop: 12}} onPress={()=>this.toggleAboutFull()}>
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
                        <View styles={{marginRight: 20, marginTop:20}}>
                            <View style={{flexDirection: 'row', marginTop: 30, paddingLeft: 20, paddingRight:20}}>
                                <Text style={styles.reviewTitle}>События компании</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('CompanyAllEvents', {companyEvents: company && company.model && company.model.event_addresses && company.model.event_addresses.length > 0 ? company.model.event_addresses : [] })}  style={{marginLeft: 'auto'}}><Text style={styles.openAll}>Все</Text></TouchableOpacity>
                            </View>
                            <View style={{flex: 1}}>
                                {                                    
                                    company && 
                                    company.model && 
                                    company.model.event_addresses &&
                                    company.model.event_addresses.length > 0 
                                    ?   <Events {...this.props} newPropsEvents={this.props.navigation} EventsArrLength={4} companyEvents={company.model.event_addresses || []} />
                                    :   <NothingForPrev tabName={'Событий'}/>
                                }
                            </View>
                        </View>
                        <View style={{backgroundColor: '#F0F1F3', height: 1,}}></View>
                        <View style={{ flexDirection: 'column'}}>
                        {
                            company && company.model && company.model.feedbacks && company.model.feedbacks.length > 0 
                                ?   <>
                                        <View style={{ marginTop: 30}}>
                                            <View style={styles.reviewBlock}>
                                                <Text style={styles.reviewTitle}>Отзывы</Text>
                                                <TouchableOpacity style={{marginLeft: 'auto'}}>
                                                    <Text style={styles.openAll}>Все</Text>
                                                </TouchableOpacity>
                                            </View>
                                            {
                                                company && company.model && company.model.feedbacks.map( (item, index) => (
                                                    <View style={{paddingLeft: 20, paddingRight: 20}} key={index}>
                                                        <View style={{marginTop: 30, flexDirection: 'row'}}>
                                                            <View>
                                                                <Image source={require('../../assets/images/images/photoReview.png')} />
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
                    
                        </View>
                        <View style={styles.hr}></View>
                        <View style={styles.NFBlock}>
                                <IconNotFound/>
                                <Text style={styles.NFTitle}>Не нашли нужное занятие?</Text>
                                <Text style={styles.NFText}>Оставьте заявку и закажите мероприятие по вашим требованиям</Text>
                        </View>
                        <TouchableOpacity style={styles.NFButton}>
                            <Text style={styles.NFButtonText}>Оставить заявку</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <Modal isVisible={this.state.isModalShare} style={styles.modal}>
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
                        <TouchableOpacity onPress={this.toggleModalShare} style={styles.modalClose}>
                            <Text style={styles.modalButtonText}>ОТМЕНА</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isModalCall} style={styles.modal}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Позвонить с помощью</Text>
                        <View style={styles.shareBlock}>
                            <TouchableOpacity style={styles.shareRow} onPress={()=> this.connect('tel', `+${company.model.phone}`)}>
                                <Image source={require('../../assets/images/IOS/IOSPhone.png')}/>
                                <Text style={styles.shareText}>Телефон</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.shareRow} onPress={()=> this.connect('email', company.model.email)}>
                                <Image source={require('../../assets/images/IOS/IOSMail.png')}/>
                                <Text style={styles.shareText}>Mail</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.shareRow} onPress={()=> this.connect('tel', `+${company.model.phone}`)}>
                                <Image source={require('../../assets/images/IOS/IOSMessage.png')}/>
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
                                <IconEventLike style={{marginRight: 14}}/>
                                <Text style={styles.modalMinTitle}>Избранное</Text>
                            </Text>
                        </View>
                        <View style={styles.modalMinDescBlock}>
                            <Text style={styles.modalMinDesc}>
                                Чтобы добавить в Избранное <Text style={{fontWeight: '500'}}>Войдите в профиль</Text>
                            </Text>
                        </View>
                        <View style={styles.modalMinButtonsBlock}>
                            <TouchableOpacity onPress={this.toggleModalFavorite} style={styles.modalMinCancel}>
                                <Text style={styles.modalMinCancelText}>ОТМЕНА</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalMinConfirm}>
                                <Text style={styles.modalMinConfirmText}>ВОЙТИ</Text>
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
                <Modal isVisible={this.state.isModalChecked} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={styles.modalMinTitleBlock}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.modalMinTitle}>Проверено Mamado</Text>
                                <IconCheckMamado style={{marginLeft: 18}}/>
                            </View>
                        </View>
                        <View style={{marginTop: 25}}>
                            <View style={styles.checkItem}>
                                <IconCheckMark/>
                                <Text style={styles.checkText}>Качество услуги</Text>
                            </View>
                            <View style={styles.checkItem}>
                                <IconCheckMark/>
                                <Text style={styles.checkText}>Квалификация персонала</Text>
                            </View>
                            <View style={styles.checkItem}>
                                <IconCheckMark/>
                                <Text style={styles.checkText}>Опрятность помещения</Text>
                            </View>
                            <View style={styles.checkItem}>
                                <IconCheckMark/>
                                <Text style={styles.checkText}>Удобство расположения</Text>
                            </View>
                        </View>
                        <View style={{marginLeft: 'auto', marginTop: 15}}>
                            <TouchableOpacity onPress={this.toggleModalChecked} style={styles.modalMinConfirm}>
                                <Text style={styles.modalMinConfirmText}>ПОНЯТНО</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

export default Company;

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
        zIndex: 1,
        position: 'absolute',
        top: 300,
        left: 20,
        flexDirection: 'row'
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
        alignItems: 'center',
        paddingRight: 10,

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
    descBlock: {
        marginTop: 30,
        paddingLeft: 20,
        paddingRight: 20
    },
    eventAge: {
        marginLeft: 4,
        fontSize: 13,
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    eventMetr: {
        marginLeft: 4,
        fontSize: 13,
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    eventBadge: {
        marginLeft: 'auto',
        borderRadius: 3,
        backgroundColor: '#38AFAF',
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 2,
        paddingBottom: 2
    },
    eventBadgeFree: {
        marginLeft: 'auto',
        borderRadius: 3,
        backgroundColor: '#34A0E3',
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 2,
        paddingBottom: 2
    },
    eventBadgeText: {
        color: '#FFF',
        fontSize: 13,
        fontFamily: 'SF Compact Rounded',
        fontWeight: '500'
    },
    eventTitle: {
        marginTop: 11,
        color: '#444B69',
        fontSize: 18,
        fontFamily: 'SF Pro Text',
        fontWeight: '600'
    },
    eventStreet: {
        color: '#444B69',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    eventMetroText: {
        color: '#444B69',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    eventReviewText: {
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        fontSize: 13
    },
    reviewBlock: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 30
    },
    reviewTextNone: {
        color: '#A4AABA',
        fontSize: 15,
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        marginTop: 20
    },
    NFBlock: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    NFTitle: {
        marginTop: 20,
        color: '#444B69',
        fontSize: 19,
        fontFamily: 'SF Pro Text',
        fontWeight: '600'
    },
    NFText: {
        textAlign: 'center',
        marginTop: 18,
        fontSize: 15,
        fontFamily: 'SF Pro Text',
        lineHeight: 24,
        fontWeight: '400',
        color: '#444B69'
    },
    NFButton: {
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        backgroundColor: '#E94C89',
        paddingTop: 18,
        paddingBottom: 18,
        marginBottom: 20
    },
    NFButtonText: {
        textAlign: 'center',
        color: '#FFF',
        textTransform: 'uppercase',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '600'
    },
    checkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    checkText: {
        marginLeft: 10,
        color: '#444B69',
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    }
});
