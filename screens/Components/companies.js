import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Image, StatusBar, Linking, RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import StarRating from "react-native-star-rating";
import 'moment/locale/ru'
import axios from 'axios';



//Icons
import EventRun from '../../assets/images/icons/event-run';
import EventUser from '../../assets/images/icons/event-user';
import EventLike from '../../assets/images/icons/event-like';
import IconMetro from '../../assets/images/icons/icon-metro';
import Like from '../../assets/images/icons/like-nactive';


//helpers
import { DeclinationFeedackString, DeclinationYearsString, searchAndFilter, Loading} from '../../helpers/helpers';
import  NothingForPrev  from './nothingForPreview';

//modals
import { ComingErrModal } from '../Components/modals'

class Company extends Component{
    constructor(props){
        super(props);
        this.state = {
            CompanyArr: false,
            loading: true,
            searchStr: '',
            favoriteArr: false,
            isAuth: false,
            isModalFavoriteErr: false,
            refreshing: false
        }
    }
    
    getCompany = (idCompany=false, arrForSearch) => {
        if (this.props.companiesArr) {
            this.setState({CompanyArr: this.props.companiesArr, loading: false, searchStr: this.props.search})
        }else{
            axios({
                method: 'GET',
                baseURL: 'https://mamado.elgrow.ru',
                url: '/api/company/address',
                // params: {
                //     distance: 500,
                //     location: '56.838011,60.597465'
                // },
            }).then( response => {
                this.setState({CompanyArr: response.data.data, loading: false, searchStr: this.props.search})
            }).catch(err => {console.log('error',err)})
        }
    }

    getAsyncData = async () => {
        let isAuth = await AsyncStorage.getItem('isAuth');
        if (isAuth !== null) {
            this.setState({isAuth: isAuth})
        }
        
        // AsyncStorage.getAllKeys((err, data) => {            
        //     AsyncStorage.multiGet(data, (err, res) => {
        //         for (let i = 0; i < res.length; i++) {
        //             if(res[i][0] == 'isAuth'){
        //                 this.setState({isAuth: +res[i][1]})
        //             }                          
        //         }
        //     })
        // })
        
    }
    setAsyncData = (data, field) =>{
        // AsyncStorage.getItem(field, (err, res) => {
        //     let temp = JSON.parse(res);
        //     if(res !== null && Object.keys(temp).length !== 0){
        //         if(temp[`${data[1]}`]){   
        //             if(!temp[`${data[1]}`].includes(data[0])){
        //                 temp[`${data[1]}`].push(data[0])
        //             }
        //         }else{            
        //             temp[`${data[1]}`] = [data[0]];
        //         }
        //         AsyncStorage.setItem(field, JSON.stringify(temp), ()=> this.setStateFromAsyncData(field))
        //     }else if(res !== null){
        //         temp[`${data[1]}`] = [data[0]]
        //         AsyncStorage.setItem(field, JSON.stringify(temp), ()=> this.setStateFromAsyncData(field))
        //     }else{
        //         AsyncStorage.setItem(field, JSON.stringify({[data[1]]: [data[0]]}), ()=> this.setStateFromAsyncData(field))
        //     }        
        // })    
    }

    delAsyncData = (data, field) =>{
        // AsyncStorage.getItem(field, (err, res) => {
        //     let temp = JSON.parse(res);
        //     res !== null && Object.keys(temp).length !== 0 ?(
        //         temp[`${data[1]}`] = JSON.parse(res)[`${data[1]}`].filter(item => {
        //                 return !(item === data[0])
        //             }),            
        //     AsyncStorage.setItem(field, JSON.stringify(temp), ()=> this.setStateFromAsyncData(field))
        //     ):
        //     (AsyncStorage.setItem(field, JSON.stringify({}), ()=> this.setStateFromAsyncData(field)))
        // })
    }
    setStateFromAsyncData = (field) => {
        // AsyncStorage.getItem(field, (err, res)=>{
        //     res !== null?
        //     this.setState({favoriteArr: JSON.parse(res)}):
        //     this.setState({favoriteArr: {}})
        // })
    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        
        // fetchData().then(() => {
        //   this.setState({refreshing: false});
        // });
      }
    toFavorite = (id, companyId) => {
        let favoriteData = [id, companyId]
        // this.state.isAuth?
        //     this.setAsyncData(favoriteData, 'favoriteCompanies'):
        //     this.setState({isModalFavoriteErr: true})
            
        
    }
    fromFavorite = (id, companyId) => {
        let favoriteData = [id, companyId]
        this.state.isAuth?
            this.delAsyncData(favoriteData, 'favoriteCompanies'):
            this.setState({isModalFavoriteErr: true})
    }
    toggleModalFavoriteErr = () => {
        this.setState({ isModalFavoriteErr: !this.state.isModalFavoriteErr });
    }
    componentDidMount(){
        this.didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.getCompany()
            }
          );
        this.getAsyncData();
        this.setStateFromAsyncData('favoriteCompanies');
    }
    componentDidUpdate(prevProps){
        if(prevProps !== this.props){            
            // this.getCompany(this.props.idCompany);
            // this.getCompanySearchList()
            this.getAsyncData()     
        }
        if (prevProps.arrForSearch !== this.props.arrForSearch) {
            this.props.trottler()
            this.getCompany()

        }
    }
    componentWillUnmount(){
        this.didBlurSubscription.remove()
    }
    render(){        
        return(
            <>
            {this.state.CompanyArr&&this.state.CompanyArr.length!==0?
                <ScrollView style={styles.textContainer}
                    refreshControl={
                        <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                        />
                    }
                >
                {
                    // this.props.arrForSearch?
                    //     searchAndFilter(this.props.arrForSearch, this.state.CompanyArr):
                        this.state.CompanyArr.map((item, index) => (

                    <View style={styles.rowItem} key={index}>                        
                        <View style={styles.rowItemContainer}>
                            <View>
                                <EventUser/>
                            </View>
                            <Text style={styles.rowItemAge}>
                            {
                                item.model &&
                                    item.model.age_min !== null && (item.model.age_min !== null || item.model.age_max !== null) ?
                                    `от ${item.model.age_min} до ${item.model.age_max} лет`:
                                    <DeclinationYearsString str={item.model.age_min}/>
                            }
                             </Text>
                             <View style={{marginLeft: 20}}>
                                 <EventRun/>
                             </View>
                             <Text style={styles.rowItemRun}>
                                    {   item.distance > 1 ?
                                        `${item.distance.toFixed(1)} км` :
                                        `${item.distance.toFixed(3) * 1000} м`
                                    } 
                             </Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Company',
                            {
                                idCompany: item.id,
                            }
                        )}>
                            <Text style={styles.rowItemTitle}>{item.model.name}</Text>
                        </TouchableOpacity>
                        <View style={styles.rowItemMoreBlock}>
                            <View style={styles.rowItemMoreBlockFirst}>
                                <Image source={{uri : item.model.avatar_download && item.model.avatar_download.url ? item.model.avatar_download.url : '/'}}  style={styles.rowImage}/>
                                <View style={styles.eventLike}>
                                    <EventLike/>
                                </View>
                            </View>
                            <View style={{flex: 0.76}}>
                                <Text style={styles.rowItemStreet}>
                                    {item.text}
                                </Text>
                                <Text style={{marginTop: 6}}>
                                    {
                                        item &&
                                        item.station
                                            ?   <>
                                                <IconMetro style={{marginTop: -2, marginRight: 7}} fill={'#' + item.station.line.hex_color}/>
                                                <Text style={styles.rowItemMetro}>{item.station.name}</Text>
                                                </>
                                            :   null
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
                                    {                                        
                                        this.state.favoriteArr[item.companyId] && this.state.favoriteArr[item.companyId].includes(item.id)?
                                            <TouchableOpacity onPress={()=>this.fromFavorite(item.id, item.companyId)}>
                                                {/* <Like/> */}
                                            </TouchableOpacity>:
                                            <TouchableOpacity onPress={()=>this.toFavorite(item.id, item.companyId)} activeOpacity={0}>
                                                {/* <Like fill={'#E94C89'} /> */}
                                            </TouchableOpacity>
                                    }
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                ))
                }
            </ScrollView>:
            <NothingForPrev tabName='КОМПАНИИ'/>
            }
            <Loading isLoading={this.state.loading}/>
            <ComingErrModal isModalFavoriteErr={this.state.isModalFavoriteErr} toggleModalFavoriteErr={this.toggleModalFavoriteErr} nav={this.props.newPropsCompany} path={'Enter'}/>

            </>
            
        )
    }
    
};
export default Company;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#556086',
        flex: 1
    },
    textContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    titleContainer: {
        position: 'absolute',
        marginTop: 55,
        width: '100%',
        zIndex: 0
    },
    tabBar: {
        flexDirection: 'row',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    rowItem: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F1F3'
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
    rowItemPrice: {
        marginLeft: 4,
        color: '#444B69',
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
    rowItemTitle: {
        fontSize: 18,
        color: '#444B69',
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
    rowItemMetro: {
        fontSize: 14,
        color: '#444B69',
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
    rowImage: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
    modal: {
        margin: 0,
        backgroundColor: 'rgba(31, 35, 52, 0.6)'
    },
    modalContent: {
        marginLeft: 24,
        marginRight: 24,
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 24,
    },
    modalTitleBlock: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    modalDescBlock: {
        marginTop: 20,
        marginLeft: 30,
    },
    modalButtonsBlock: {
        marginTop: 35,
        marginLeft: 30,
        flexDirection: 'row'
    },
    modalCancel: {
        backgroundColor: '#F0F1F3',
        paddingLeft: 28,
        paddingRight: 28,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 10,
        marginRight: 12
    },
    modalConfirm: {
        backgroundColor: '#42BCBC',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 10
    },
    modalTitle: {
        color: '#444B69',
        fontSize: 19,
        fontFamily: 'SF Pro Text',
        fontWeight: '500'
    },
    modalDesc: {
        fontSize: 16,
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        lineHeight: 24
    },
    modalCancelText: {
        color: '#444B69',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '500'
    },
    modalConfirmText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '500'
    },
    filter: {
        margin: 0,
        backgroundColor: 'rgba(31, 35, 52, 0.6)'
    },
    filterContent: {
        marginTop: 170,
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#FFF'
    },
    filterCalendarContent: {
        position: 'absolute',
        bottom: 0,
        minHeight: 500,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#FFF'
    },
    filterTop: {
        backgroundColor: '#556086',
        height: 140,
        paddingTop: 30,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 24,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    filterList: {
        padding: 24,
        marginBottom: 170
    },
    filterListStation: {
        padding: 24
    },
    filterRow: {
        backgroundColor: '#E2E5EB',
        borderRadius: 10,
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 24,
        marginBottom: 10
    },
    filterRowNR: {
        backgroundColor: '#E2E5EB',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 24
    },
    filterName: {
        color: '#444B69',
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E2E5EB',
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 17,
        paddingBottom: 17
    },
    filterButtonText: {
        color: '#444B69',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '500'
    },
    textSlider: {
        color: '#444B69',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '500'
    },
    filterContainer: {
        backgroundColor: '#F0F1F3',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginBottom: 10,
        padding: 24
    },
    textClose: {
        color: '#FFF',
        fontFamily: 'SF Pro Text',
        fontSize: 16,
        fontWeight: '500'
    },
    tabActive: {
        marginRight: 30,
        borderBottomWidth: 3,
        borderBottomColor: '#38AFAF'
    },
    tabDisabled: {
        marginRight: 30
    }
});
