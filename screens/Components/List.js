import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Image, StatusBar, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {CheckBox, SearchBar} from 'react-native-elements';
import Modal from 'react-native-modal';
import StarRating from "react-native-star-rating";
import {Calendar, LocaleConfig} from 'react-native-calendars';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from "react-native-simple-radio-button";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import moment from 'moment';
import 'moment/locale/ru'
import axios from 'axios';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import Search from '../../assets/images/icons/search';

//Icons
import EventRun from '../../assets/images/icons/event-run';
import EventUser from '../../assets/images/icons/event-user';
import EventLike from '../../assets/images/icons/event-like';
import IconMetro from '../../assets/images/icons/icon-metro';
import Like from '../../assets/images/icons/like-nactive';
import IconFilter from '../../assets/images/icons/icon-filter';
import IconRubble from "../../assets/images/icons/icon-rubble";
import GeoAccess from '../../assets/images/icons/geo-access';
import IconClose from "../../assets/images/icons/icon-close";
import FilterClose from "../../assets/images/icons/icon-filter-close";
import FilterOpen from "../../assets/images/icons/icon-filter-open";
import RightArrow from "../../assets/images/icons/rightArrow";
import CalendarIcon from "../../assets/images/icons/icon-calendar";
import IconChecked from "../../assets/images/icons/icon-checked";
import IconUnchecked from "../../assets/images/icons/icon-unchecked";
import CalendarLeft from "../../assets/images/icons/icon-calendar-left";
import CalendarRight from "../../assets/images/icons/icon-calendar-right";

//helpers
import Company from '../Components/companies';
import Events from '../Components/events';
import NothingForPrev from './nothingForPreview';

//Calendar
LocaleConfig.locales['ru'] = {
    monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    monthNamesShort: ['Янв.','Фев.','Март','Апрель','Май','Июнь','Июль.','Август','Сент.','Окт.','Ноя.','Дек.'],
    dayNames: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
    dayNamesShort: ['ВС','ПН','ВТ','СР','ЧТ','ПТ','СБ'],
    today: 'Сегодня'
};
LocaleConfig.defaultLocale = 'ru';

const _format = 'YYYY-MM-DD';
const _today = moment().format(_format);

class ListScreen extends Component {
    constructor(props){
        super(props);
        this.initialState = {
            [_today]: {disabled: false}
        };
    
        this.state = {
            isModalVisible: false,
            search: '',
            index: 0,
            isFilterVisible: false,
            isFilterStation: false,
            isFilterCalendar: false,
            isFilterCategory: false,
            filterAge: false,
            filterPlace: false,
            filterDate: false,
            filterTime: false,
            filterType: false,
            filterSentence: false,
            placeToggle: false,
            dateMorning: false,
            dateSun: false,
            dateEvening: false,
            currentFilterDate: 'Выбрать дату',
            ageMin: 0,
            ageMax: 0,
            rangeRun: 0,
            valueDate: null,
            valueType: null,
            _markedDates: this.initialState,
            routes: [
                {key: 'events', title: 'СОБЫТИЯ', index: 0},
                {key: 'company', title: 'КОМПАНИИ', index: 1},
            ],
            eventTime: [
                {value: 'Утром до 12', checked: false, id: 0, time_min: moment('00:00', 'HH:mm').format('HH:mm:ss'), time_max: moment('11:59', 'HH:mm').format('HH:mm:ss')},
                {value: 'Днем с 12 до 16', checked: false, id: 1, time_min: moment('12:00', 'HH:mm').format('HH:mm:ss'), time_max: moment('15:59', 'HH:mm').format('HH:mm:ss')},
                {value: 'Вечером после 16', checked: false, id: 2, time_min: moment('16:00', 'HH:mm').format('HH:mm:ss'), time_max: moment('23:59', 'HH:mm').format('HH:mm:ss')},
            ],
            badges: [],
            filterEventsCount: 0,
            metroStationArr: '',
            metroStationIsCheck: [],
            categoryArr: '',
            hold: false
        };
        this.getMetroStation();
        this.getCategory();
        this.getBages();
    }
getAsyncData = async () => {
    try {
        let isAuth = await AsyncStorage.getItem('isAuth');
        if (isAuth !== null) {
            this.setState({isAuth: isAuth})
        }
    } catch (error) {
        
    }
}

    
    getMetroStation = () => {
        axios({
            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/posts',
            data: {
                metroStation: [
                    {id: 1, value: 'Авиамоторная',},
                    {id: 2, value: 'Академическая',},
                    {id: 3, value: 'Алексеевская',},
                    {id: 4, value: 'Алтуфьево',},
                    {id: 5, value: 'Баррикадная',},
                    {id: 6, value: 'Бауманская',},
                    {id: 7, value: 'Беговая',},
                    {id: 8, value: 'Белокаменая',},
                    {id: 9, value: 'Беляево',},
                    {id: 10, value: 'Бибирево',}
                ]
            }
        }).then((res, err) => {
            let temp = res.data.metroStation;
            temp.map(elem => {
                elem.checked = false;
            })       
            this.setState({metroStationArr: temp})
        })
    }
    getCategory = () => {
        axios({
            method: 'GET',
            baseURL: 'https://mamado.elgrow.ru',
            url: '/api/category'
        }).then((res, err) => {
            let temp = res.data;
            temp.map(item => {
                item.checked = false;                
            })
            this.setState({categoryArr: temp})
        })
    }
    getBages = () => {
        axios({
            method: 'GET',
            baseURL: 'https://mamado.elgrow.ru',
            url: '/api/offer-type'
        }).then((res) => {
            let temp = res.data;
            temp.map(item => {
                item.checked = false;                
            })
            this.setState({badges: temp})
        })
    }
    updateSearch = search => {
        // let temp = this.state.arrForSearch;
        // temp.stringForSearch = search;
        // temp.activeTabIndex = this.state.index;
        if (search.length > 3) {
            this.setState({search, arrForSearch: {...this.state.arrForSearch, stringForSearch: search, activeTabIndex: this.state.index }})
        }else{
            this.setState({search})
        }
    };

    _renderHeader = props => <TabBar {...props}
         indicatorStyle={{ backgroundColor: 'white' }}
         style={{ backgroundColor: 'pink' }}
    />;

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    toggleFilter = () => {
        this.setState({ isFilterVisible: !this.state.isFilterVisible });
    };


    toggleCategoryClose = () => {
        this.setState({ isFilterCategory: !this.state.isFilterCategory });
        setTimeout(()=> this.toggleFilter(), 600);
    }

    

    toggleCalendar = () => {
        this.toggleFilter();
        setTimeout(()=> this.setState({ isFilterCalendar: !this.state.isFilterCalendar }), 600);
    };

    toggleCalendarClose = () => {
        this.setState({ isFilterCalendar: !this.state.isFilterCalendar });
        setTimeout(()=> this.toggleFilter(), 600);
    };

    toggleFilterAge = () => {
        this.setState({ filterAge: !this.state.filterAge });
    };

    toggleFilterPlace = () => {
        this.setState({ filterPlace: !this.state.filterPlace });
    };

    toggleFilterDate = () => {
        this.setState({ filterDate: !this.state.filterDate });
    };

    toggleFilterTime = () => {
        this.setState({ filterTime: !this.state.filterTime });
    };

    toggleFilterType = () => {
        this.setState({ filterType: !this.state.filterType });
    };
    //Badges
    toggleFilterSentence = () => {
        this.setState({ filterSentence: !this.state.filterSentence });
    };

    
    //Date
    changeFilterDate = () => {
        this.state.currentFilterDate = this.state._markedDates.date;
        let searchDates = Object.keys(this.state._markedDates);
        let start_date = this.state._markedDates[searchDates[0]]
        let end_date = this.state._markedDates[searchDates[searchDates.length - 1]]
        for (var date in this.state._markedDates) {
            this.state.currentFilterDate = moment(date, 'YYYY-MM-DD').locale('ru').format('DD MMM., YYYY');
            // this.state.arrForSearch.date = moment(date, 'YYYY-MM-DD').locale('ru').format('DD MM YYYY');
        }
        this.setState({arrForSearch: {...this.state.arrForSearch, date_min: start_date.date, date_max: end_date.date}, currentFilterDate: `${moment(start_date.date, 'YYYY-MM-DD').locale('ru').format('DD MMM., YYYY')} - ${moment(end_date.date, 'YYYY-MM-DD').locale('ru').format('DD MMM., YYYY')}`})
        this.toggleCalendarClose();
    };

    onDaySelect = (day) => {
        for (let key in this.state._markedDates) {
            if(this.state._markedDates[key].hasOwnProperty('disabled')){
                this.state._markedDates = ''
            }
        }
        const _selectedDay = moment(day.dateString).format(_format);
        let updatedMarkedDates = {...this.state._markedDates, ...{ [_selectedDay]: { selected: true, date: _selectedDay, color: '#38AFAF', textColor: '#fff', startingDay: true, endingDay: true} } }
        let datesName = Object.getOwnPropertyNames(updatedMarkedDates)
        
        if (datesName.length == 2) {
            moment(datesName[0]).format() <= moment(datesName[1]).format()
            ?   (
                Object.defineProperty(updatedMarkedDates[datesName[0]], 'endingDay', {value: false}),
                Object.defineProperty(updatedMarkedDates[datesName[1]], 'startingDay', {value: false}),
                this.fillDatesRange(updatedMarkedDates[datesName[0]], updatedMarkedDates[datesName[1]], updatedMarkedDates)
                )
            :   (
                    Object.defineProperty(updatedMarkedDates[datesName[1]], 'endingDay', {value: false}),
                    Object.defineProperty(updatedMarkedDates[datesName[0]], 'startingDay', {value: false}),
                    this.fillDatesRange(updatedMarkedDates[datesName[1]], updatedMarkedDates[datesName[0]], updatedMarkedDates)
                )
        }else if (datesName.length >= 3){
            updatedMarkedDates = { [_selectedDay]: { selected: true, date: _selectedDay, color: '#38AFAF', textColor: '#fff', startingDay: true, endingDay: true } }
            this.setState({ _markedDates: updatedMarkedDates });
        }else{
            this.setState({ _markedDates: updatedMarkedDates });
        }
    };
    fillDatesRange = (rangeStart, rangeEnd, dates) => {
        var   datesObj    = dates;
        var   start       = rangeStart.date;
        const end         = rangeEnd.date;
        while(moment(start).format() < moment(end).format()) {
            start = moment(start).add(1, 'days').format('YYYY-MM-DD');
            datesObj[start] = {selected: true, date: start, color: '#38AFAF', textColor: '#fff',}
        }
            datesObj[end] = rangeEnd
        
        this.setState({_markedDates: datesObj})
    }
    setThisWeek = () => {
        let thisWeekStart = moment().startOf('week').locale('ru').format('YYYY-DD-MM H:m:s')
        let thisWeekEnd = moment().endOf('week').locale('ru').format('YYYY-DD-MM H:m:s')
        this.setState({arrForSearch: {...this.state.arrForSearch, date_min: thisWeekStart, date_max: thisWeekEnd}})        
    }
    setNextWeek = () => {
        let nextWeekStart = moment().add('1', 'weeks').startOf('week').format('YYYY-DD-MM H:m:s')
        let nextWeekEnd = moment().add('1', 'weeks').endOf('week').format('YYYY-DD-MM H:m:s')
        this.setState({arrForSearch: {...this.state.arrForSearch, date_min: nextWeekStart, date_max: nextWeekEnd}})        
    }
    //metro station
    toggleStation = () => {
        this.toggleFilter();
        setTimeout(()=> this.setState({ isFilterStation: !this.state.isFilterStation }), 600);
    };
    toggleStationClose = () => {
        this.setState({ isFilterStation: !this.state.isFilterStation });
        setTimeout(()=> this.toggleFilter(), 600);
    };

    toogleCheckedStation = (index) => {
        let checkedTemp = this.state.metroStationArr;
            checkedTemp[index].checked = !checkedTemp[index].checked;
        let temp = this.state.arrForSearch;

            temp = checkedTemp.filter(item => {
                return item.checked
            }).map(item => {
                return item.id
            })
            this.setState({ arrForSearch: {...this.state.arrForSearch, metroStat: {...this.state.arrForSearch.metroStat, besideMetro: temp}} })
    };

    metroStationChange = (data) => {
        if(this.state.arrForSearch && this.state.arrForSearch.metroStat){
            typeof data[0] == 'number'?
                this.setState({ rangeRun: data[0], arrForSearch: {...this.state.arrForSearch, metroStat: {...this.state.arrForSearch.metroStat, besideMe: data[0] }} }) :
                data()
        }else{
            this.setState({rangeRun: data[0], arrForSearch: {...this.state.arrForSearch, metroStat: { besideMe: data[0] }}})
        }
    }
    placeToggleTrue = () => {
        this.setState({ placeToggle: true });
    };

    placeToggleFalse = () => {
        this.setState({ placeToggle: false });
    };

    //Categories
    toggleCategory = () => {
        this.toggleFilter();
        setTimeout(()=> this.setState({ isFilterCategory: !this.state.isFilterCategory }), 600);
    };

    toogleCheckedCategory = (index, item) => {
        let temp = this.state.categoryArr;
        temp[index].checked = !temp[index].checked
        
        this.setState({categoryArr: temp, arrForSearch: {...this.state.arrForSearch, categories: temp.filter(item=> { return item.checked}).map(item=>{ return item.id})}})
    };
    
    //Ages
    agesFilterChange = (data) => {
        this.setState({ ageMin: data[0], ageMax: data[1], arrForSearch: {...this.state.arrForSearch, age_min: data[0], age_max: data[1]} })
    }
    eventTimeChange = (index) => {
        let temp = this.state.eventTime;
        temp[index].checked = !this.state.eventTime[index].checked
        temp = temp.filter(item => {
            return item.checked
        }).map(item=>{
            return {time_min: item.time_min, time_max: item.time_max}
        })
        let times_min = temp.map(item => {
            return moment(item.time_min, 'HH:mm:ss').format()
        })
        let times_max = temp.map(item => {
            return moment(item.time_max, 'HH:mm:ss').format()
        })
        time_min = moment(times_min.reduce((a,b) => {
            return a < b ? a : b;
        })).format('HH:mm:ss')
        time_max = moment(times_max.reduce((a,b) => {
            return a > b ? a : b;
        })).format('HH:mm:ss')
        // console.log(time_min, time_max)
        
        this.setState({arrForSearch: {...this.state.arrForSearch, time_min: time_min, time_max: time_max}})
    }
    badgesChanged = (index) => {
        let temp = this.state.badges;
        temp[index].checked = !this.state.badges[index].checked
        temp = temp.filter(item => {
            return item.checked
        }).map(item=>{
            return item.id
        })
        this.setState({arrForSearch: {...this.state.arrForSearch, badge: temp}})
    }
    trottler = (func, delay) =>{
        let holder = false,
            savedArgs,
            savedThis

        return function returner(){
            if(holder) {
                savedArgs = arguments;
                savedThis = this;
                return
            }
            func.apply(this, arguments);
            holder = true;
            setTimeout(()=>{
                holder = false
                if (savedArgs) {
                    returner.apply(savedThis, savedArgs);
                    savedArgs = savedThis = null;
                }
            }, delay)
        }
    }
    fetchFilterInfo = (reset) => {
        let {arrForSearch} = this.state;
        if (reset) {
            let resetBadges = this.state.badges.map(item => {
                item.checked = false;
                return item
            })
            let resetCategory = this.state.categoryArr.map(item => {
                item.checked = false
                return item
            })
            let resetEventTime = this.state.eventTime.map(item => {
                item.checked = false;
                return item
            })
            this.setState({
                arrForSearch: {},
                search: '',
                dateMorning: false,
                dateSun: false,
                dateEvening: false,
                currentFilterDate: 'Выбрать дату',
                ageMin: 0,
                ageMax: 0,
                rangeRun: 0,
                valueDate: null,
                valueType: null,
                _markedDates: this.initialState,
                metroStationIsCheck: [],
                badges: resetBadges,
                categoryArr: resetCategory,
                eventTime: resetEventTime,
            })
        }
        axios({
            method: 'GET',
            baseURL: 'https://mamado.elgrow.ru',
            url: this.state.index ? '/api/company/address' : '/api/event/address',
            params: {
                search: arrForSearch &&  arrForSearch.stringForSearch,
                age_min: arrForSearch &&  arrForSearch.age_min,
                age_max: arrForSearch &&  arrForSearch.age_max,
                ages: arrForSearch &&  arrForSearch.ages,
                distance: arrForSearch &&  arrForSearch.metroStat && arrForSearch.metroStat.besideMe/1000,
                metro_IDs: arrForSearch &&  arrForSearch.metroStat && arrForSearch.metroStat.besideMetro,
                date_min: arrForSearch &&  arrForSearch.date_min,
                date_max: arrForSearch &&  arrForSearch.date_max,
                time_min: arrForSearch &&  arrForSearch.time_min,
                time_max: arrForSearch &&  arrForSearch.time_max,
                categories: arrForSearch &&  arrForSearch.categories,
                form: arrForSearch &&  arrForSearch.type,
                offer_types: arrForSearch &&  arrForSearch.badge
            }
        }).then( res => {
            this.state.index 
                ?   this.setState({companiesArr: res.data.data, count: res.data.count || 0, FilterEventsCount: res.data.FilterEventsCount || 0})
                :   this.setState({companyEvents: res.data.data, count: res.data.count || 0, FilterEventsCount: res.data.FilterEventsCount || 0})
        }).catch( err => console.log(err, res))
    }
    componentDidMount(){
        this.setState({ defaultMarkedDay: this.state._markedDates, clickDateCounter: 0, trottler: this.trottler(this.fetchFilterInfo, 2000)})
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            this.getAsyncData()
        }
    }
    render() {
        const { search } = this.state;
        const showAge = this.state.filterAge;
        const showPlace = this.state.filterPlace;
        const showDate = this.state.filterDate;
        const showTime = this.state.filterTime;
        const showType = this.state.filterType;
        const showSentence = this.state.filterSentence;

        const radio_props = [
            {label: 'Эта неделя', value: 0 },
            {label: 'Следующая неделя', value: 1 }
        ];

        const radio_type = [
            {label: 'Групповое', value: 0, send: 'GROUP' },
            {label: 'Индивидуальное', value: 1, send: 'INDIVIDUAL' }
        ];        
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <StatusBar
                        backgroundColor="blue"
                        barStyle="light-content"
                    />
                    <SearchBar
                        placeholder="MamaDo"
                        onChangeText={this.updateSearch}
                        value={search}
                        searchIcon={Search}
                        containerStyle={{paddingRight: 35, height: 45, marginTop: -10, backgroundColor: '#606C93', borderRadius: 10, borderTopWidth: 0, borderBottomWidth: 0, marginLeft: 20, marginRight: 20}}
                        inputContainerStyle={{backgroundColor: '#606C93', marginTop: -5}}
                        placeholderTextColor="#FFF"
                        inputStyle={{fontSize: 16, fontFamily: 'SF Pro Text', fontWeight: '400', color: '#FFF', marginLeft: 10}}
                    />
                    <TouchableOpacity onPress={this.toggleFilter} style={{position: 'absolute', right: 35, top: 6}}>
                        <IconFilter/>
                    </TouchableOpacity>
                    <TabView
                        navigationState={this.state}
                        renderHeader={this._renderHeader}
                        onIndexChange={index => this.setState({ index , search: ''})}
                        renderScene = {
                            ({route}) => {
                                switch (route.key) {
                                    case 'company':
                                        var company = route.index===1? <Company  {...this.state} {...this.props}/>:<Company newPropsCompany={this.props.navigation}/>;
                                        return company
                                    case 'events':
                                        var events = route.index===0?<Events {...this.state } {...this.props}/>: <Events newPropsEvents={this.props.navigation}/>;
                                        return events
                                }
                            }
                        }
                        // initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                        sceneContainerStyle={{height: Dimensions.get('window').height}}
                        // sceneContainerStyle={{flex: 1}}
                        renderTabBar={(props) =>
                            <TabBar
                                {...props}
                                indicatorStyle={{ width: 40, backgroundColor: '#66CBCB', height: 4, borderRadius: 10, left: '20%'}}
                                style={{ backgroundColor: '#556086', color: '#FFF' }}
                                activeColor="#FFFFFF"
                                inactiveColor="#9DA6C1"
                                labelStyle={{fontFamily: 'SF Compact Rounded', fontSize: 16, fontWeight: '500'}}
                                contentContainerStyle={{ marginTop: 7, paddingLeft: 5, paddingRight: 5 }}
                            />
                        }
                    />
                </View>
                <Modal isVisible={this.state.isModalVisible} style={styles.modal}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalTitleBlock}>
                            <Text>
                                <GeoAccess style={{marginRight: 14}}/>
                                <Text style={styles.modalTitle}>Разрешить доступ?</Text>
                            </Text>
                        </View>
                        <View style={styles.modalDescBlock}>
                            <Text style={styles.modalDesc}>
                                Разрешить приложению <Text style={{fontWeight: '500'}}>Mamado</Text> доступ к данным о местоположении устройства?
                            </Text>
                        </View>
                        <View style={styles.modalButtonsBlock}>
                            <TouchableOpacity onPress={this.toggleModal} style={styles.modalCancel}>
                                <Text style={styles.modalCancelText}>ОТМЕНА</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalConfirm}>
                                <Text style={styles.modalConfirmText}>РАЗРЕШИТЬ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isFilterVisible} style={styles.filter}>
                    <View style={styles.filterContent}>
                        <View style={styles.filterTop}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={()=>this.fetchFilterInfo(reset = true)}>
                                        <Text style={styles.textClose}>Очистить фильтр</Text>
                                    </TouchableOpacity>
                                    <View style={{marginLeft: 7, backgroundColor: '#E94C89', borderRadius: 5, paddingLeft: 10, paddingRight: 10, paddingTop: 4, paddingBottom: 4}}>
                                        <Text style={{fontSize: 14, fontFamily: 'SF Compact Rounded', fontWeight: '700', color: '#FFF'}}>
                                            {
                                                `+${this.state.count || 0}`
                                            }
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={{marginLeft: 'auto'}} onPress={this.toggleFilter}>
                                    <IconClose/>
                                </TouchableOpacity>
                            </View>
                            <SearchBar
                                placeholder="Поиск города"
                                onChangeText={this.updateSearch}
                                value={search}
                                searchIcon={Search}
                                containerStyle={{height: 45, marginTop: 20, backgroundColor: '#606C93', borderRadius: 10, borderTopWidth: 0, borderBottomWidth: 0}}
                                inputContainerStyle={{backgroundColor: '#606C93', marginTop: -5}}
                                placeholderTextColor="#FFF"
                                inputStyle={{fontSize: 16, fontFamily: 'SF Pro Text', fontWeight: '400', color: '#FFF', marginLeft: 10}}
                            />
                        </View>
                        <ScrollView style={styles.filterList}>
                            <TouchableOpacity onPress={this.toggleFilterAge} style={this.state.filterAge ? styles.filterRowNR : styles.filterRow}>
                                <Text style={styles.filterName}>Возраст</Text>
                                <View style={{marginLeft: 'auto'}}>
                                    {showAge ? <FilterClose style={{marginRight: -4}}/> : <FilterOpen/>}
                                </View>
                            </TouchableOpacity>
                            {this.state.filterAge ? (
                                <View style={styles.filterContainer}>
                                    <MultiSlider
                                        min={0}
                                        max={16}
                                        values={[this.state.ageMin, this.state.ageMax]}
                                        trackStyle={{
                                            height:3,
                                            backgroundColor: '#D9DEE8'
                                        }}
                                        selectedStyle={{
                                            height: 3,
                                            backgroundColor: '#606A8B'
                                        }}
                                        markerStyle={{
                                            backgroundColor: '#FFFFFF',
                                            borderWidth: 4,
                                            borderColor: '#606A8B',
                                            width: 26,
                                            height: 26,
                                            shadowRadius: 0,
                                            shadowOpacity: 0
                                        }}
                                        onValuesChange={ (data)=>{ this.agesFilterChange(data) } }
                                        onValuesChangeStart={this.disableScroll}
                                        onValuesChangeFinish={this.enableScroll}
                                    />
                                    <View style={{marginTop: 28, flexDirection: 'row'}}>
                                        <View>
                                            <Text style={styles.textSlider}>от {this.state.ageMin} лет</Text>
                                        </View>
                                        <View style={{marginLeft: 'auto'}}>
                                            <Text style={styles.textSlider}>до {this.state.ageMax} лет</Text>
                                        </View>
                                    </View>
                                </View>
                            ) : null}
                            <TouchableOpacity onPress={this.toggleFilterPlace} style={this.state.filterPlace ? styles.filterRowNR : styles.filterRow}>
                                <Text style={styles.filterName}>Место</Text>
                                <View style={{marginLeft: 'auto'}}>
                                    {showPlace ? <FilterClose style={{marginRight: -4}}/> : <FilterOpen/>}
                                </View>
                            </TouchableOpacity>
                            {this.state.filterPlace ? (
                                <View style={styles.filterContainer}>
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity onPress={this.placeToggleFalse} style={this.state.placeToggle ? styles.tabDisabled : styles.tabActive}>
                                            <Text style={{fontSize: 14, fontFamily: 'SF Pro Text', color: '#444B69', fontWeight: '500', marginBottom: 5}}>Рядом с метро</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={this.placeToggleTrue} style={this.state.placeToggle ? styles.tabActive : styles.tabDisabled}>
                                            <Text style={{fontSize: 14, fontFamily: 'SF Pro Text', color: '#444B69', fontWeight: '500'}}>Рядом со мной</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {this.state.placeToggle ? (
                                        <View style={{marginTop: 28}}>
                                            <MultiSlider
                                                min={0}
                                                max={10000}
                                                values={[this.state.rangeRun]}
                                                trackStyle={{
                                                    height:3,
                                                    backgroundColor: '#D9DEE8'
                                                }}
                                                selectedStyle={{
                                                    height: 3,
                                                    backgroundColor: '#606A8B'
                                                }}
                                                markerStyle={{
                                                    backgroundColor: '#FFFFFF',
                                                    borderWidth: 4,
                                                    borderColor: '#606A8B',
                                                    width: 22,
                                                    height: 22,
                                                    shadowRadius: 0,
                                                    shadowOpacity: 0
                                                }}
                                                onValuesChange={ (data)=>{ this.metroStationChange(data) } }
                                                onValuesChangeStart={this.disableScroll}
                                                onValuesChangeFinish={this.enableScroll}
                                            />
                                            <Text style={{marginTop: 28, alignItems: 'center'}}>
                                                <EventRun/>
                                                <Text style={{fontSize: 14, color: '#444B69', fontFamily: 'SF Pro Text', fontWeight: '500'}}> {this.state.rangeRun} м</Text>
                                            </Text>
                                        </View>
                                    ) : (
                                        <View style={{marginTop: 28}}>
                                            <TouchableOpacity onPress={()=>this.metroStationChange(this.toggleStation)} style={styles.filterButton}>
                                                <View>
                                                    <Text style={styles.filterButtonText}>Станции метро</Text>
                                                </View>
                                                <View style={{marginLeft: 'auto'}}>
                                                    <RightArrow/>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            ) : null}
                            <TouchableOpacity onPress={this.toggleFilterDate} style={this.state.filterDate ? styles.filterRowNR : styles.filterRow}>
                                <Text style={styles.filterName}>Дата</Text>
                                <View style={{marginLeft: 'auto'}}>
                                    {showDate ? <FilterClose style={{marginRight: -4}}/> : <FilterOpen/>}
                                </View>
                            </TouchableOpacity>
                            {this.state.filterDate ? (
                                <View style={styles.filterContainer}>
                                    <RadioForm
                                        formHorizontal={false}
                                        animation={true}
                                    >
                                        {radio_props.map((obj, i) => {
                                            return (
                                                <RadioButton labelHorizontal={true} key={i} >
                                                    <RadioButtonInput
                                                        obj={obj}
                                                        index={i}
                                                        isSelected={this.state.valueDate === i}
                                                        borderWidth={1}
                                                        buttonInnerColor={'#38AFAF'}
                                                        buttonOuterColor={'#D8DBE3'}
                                                        buttonSize={12}
                                                        buttonOuterSize={27}
                                                        onPress={()=>{this.setState({valueDate: i, arrForSearch: {...this.state.arrForSearch, date: obj.label}}); i === 0 ? this.setThisWeek() : this.setNextWeek()}}
                                                        buttonStyle={{backgroundColor: '#FFF', marginBottom: 24}}
                                                    />
                                                    <RadioButtonLabel
                                                        obj={obj}
                                                        index={i}
                                                        labelHorizontal={true}
                                                        onPress={()=>this.setState({valueDate: i})}
                                                        labelStyle={{fontSize:16, fontFamily: 'SF Pro Text', fontWeight: '400', color: '#444B69', marginBottom: 24}}
                                                    />
                                                </RadioButton>
                                            )
                                        })}

                                    </RadioForm>
                                    <TouchableOpacity onPress={this.toggleCalendar} style={{flexDirection: 'row', alignItems: 'center', marginTop: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 17, paddingBottom: 17, backgroundColor: '#E2E5EB', borderRadius: 10}}>
                                        <View>
                                            <CalendarIcon/>
                                        </View>
                                        <View style={{marginLeft: 12}}>
                                            <Text style={{color: '#444B69', fontSize: 14, fontFamily: 'SF Pro Text', fontWeight: '500', paddingRight: 25}} numberOfLines={1}>{this.state.currentFilterDate}</Text>
                                        </View>
                                        <View style={{marginLeft: 'auto'}}>
                                            <RightArrow/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ) : null}
                            <TouchableOpacity onPress={this.toggleFilterTime} style={this.state.filterTime ? styles.filterRowNR : styles.filterRow}>
                                <Text style={styles.filterName}>Время</Text>
                                <View style={{marginLeft: 'auto'}}>
                                    {showTime ? <FilterClose style={{marginRight: -4}}/> : <FilterOpen/>}
                                </View>
                            </TouchableOpacity>
                            {this.state.filterTime ? (
                                <View style={styles.filterContainer}>
                                    {   this.state.eventTime?
                                        this.state.eventTime.map((item, index)=>(                                       
                                            <CheckBox
                                                key={index}
                                                title={item.value}
                                                checkedIcon={<IconChecked/>}
                                                uncheckedIcon={<IconUnchecked/>}
                                                checked={item.checked}
                                                onPress={() => this.eventTimeChange(index)}
                                                containerStyle={{padding: 0, margin: 0, backgroundColor:'transparent', marginLeft: 0, marginRight: 0, borderWidth: 0}}
                                                textStyle={{color: '#444B69', fontSize: 16, fontFamily: 'SF Pro Text', fontWeight: '400'}}
                                            />
                                        )):<Text>{this.state.eventTime}</Text>
                                    }
                                </View>
                            ) : null}
                            <TouchableOpacity onPress={this.toggleCategory} style={styles.filterRow}>
                                <Text style={styles.filterName}>Категории</Text>
                                <View style={{marginLeft: 'auto'}}>
                                    <FilterOpen/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.toggleFilterType} style={this.state.filterType ? styles.filterRowNR : styles.filterRow}>
                                <Text style={styles.filterName}>Тип</Text>
                                <View style={{marginLeft: 'auto'}}>
                                    {showType ? <FilterClose style={{marginRight: -4}}/> : <FilterOpen/>}
                                </View>
                            </TouchableOpacity>
                            {this.state.filterType ? (
                                <View style={styles.filterContainer}>
                                    <RadioForm
                                        formHorizontal={false}
                                        animation={true}
                                    >
                                        {radio_type.map((obj, i) => {
                                            return (
                                                <RadioButton style={i === 0 ? {marginBottom: 24} : null} labelHorizontal={true} key={i} >
                                                    <RadioButtonInput
                                                        obj={obj}
                                                        index={i}
                                                        isSelected={this.state.valueType === i}
                                                        borderWidth={1}
                                                        buttonInnerColor={'#38AFAF'}
                                                        buttonOuterColor={'#D8DBE3'}
                                                        buttonSize={12}
                                                        buttonOuterSize={27}
                                                        onPress={()=>this.setState({valueType: i, arrForSearch: {...this.state.arrForSearch, type: obj.send}})}
                                                        buttonStyle={{backgroundColor: '#FFF'}}
                                                    />
                                                    <RadioButtonLabel
                                                        obj={obj}
                                                        index={i}
                                                        labelHorizontal={true}
                                                        onPress={()=>this.setState({valueType: i, arrForSearch: {...this.state.arrForSearch, type: obj.send}})}
                                                        labelStyle={{fontSize:16, fontFamily: 'SF Pro Text', fontWeight: '400', color: '#444B69'}}
                                                    />
                                                </RadioButton>
                                            )
                                        })}

                                    </RadioForm>
                                </View>
                            ) : null}
                            <TouchableOpacity onPress={this.toggleFilterSentence} style={this.state.filterSentence ? styles.filterRowNR : styles.filterRow}>
                                <Text style={styles.filterName}>Предложение</Text>
                                <View style={{marginLeft: 'auto'}}>
                                    {showSentence ? <FilterClose style={{marginRight: -4}}/> : <FilterOpen/>}
                                </View>
                            </TouchableOpacity>
                            {this.state.filterSentence ? (
                                <View style={styles.filterContainer}>
                                    {
                                        this.state.badges.map((item, index) => (
                                        <CheckBox
                                            key={index}
                                            title={item.name}
                                            checkedIcon={<IconChecked/>}
                                            uncheckedIcon={<IconUnchecked/>}
                                            checked={item.checked}
                                            onPress={() => this.badgesChanged(index)}
                                            containerStyle={{padding: 0, margin: 0, backgroundColor:'transparent', marginLeft: 0, marginRight: 0, borderWidth: 0}}
                                            textStyle={{color: '#444B69', fontSize: 16, fontFamily: 'SF Pro Text', fontWeight: '400'}}
                                        />
                                        ))
                                    }
                                    
                                </View>) : null}
                            <View style={{height: 50}} />
                        </ScrollView>
                    </View>
                    <View style={{position: 'absolute', bottom: 0, width: '100%', height: 100, backgroundColor: '#FFF', paddingTop: 15, paddingLeft: 24, paddingRight: 24, shadowColor: '#455B63', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.1, shadowRadius: 12}}>
                        <TouchableOpacity style={{backgroundColor: '#E94C89', borderRadius: 10, paddingTop: 17, paddingBottom: 17}} onPress={this.toggleFilter}>
                            <Text style={{textAlign: 'center', textTransform: 'uppercase', fontSize: 14, fontFamily: 'SF Pro Text', fontWeight: '600', color: '#FFF'}}>Показать {this.state.FilterEventsCount} занятий</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isFilterStation} style={styles.filter}>
                    <View style={styles.filterContent}>
                        <View style={styles.filterTop}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.textClose}>Выберите станции метро</Text>
                                <TouchableOpacity style={{marginLeft: 'auto'}} onPress={this.toggleStationClose}>
                                    <IconClose/>
                                </TouchableOpacity>
                            </View>
                            <SearchBar
                                placeholder="Поиск станции"
                                onChangeText={this.updateSearch}
                                value={search}
                                searchIcon={Search}
                                containerStyle={{height: 45, marginTop: 20, backgroundColor: '#606C93', borderRadius: 10, borderTopWidth: 0, borderBottomWidth: 0}}
                                inputContainerStyle={{backgroundColor: '#606C93', marginTop: -5}}
                                placeholderTextColor="#FFF"
                                inputStyle={{fontSize: 16, fontFamily: 'SF Pro Text', fontWeight: '400', color: '#FFF', marginLeft: 10}}
                            />
                        </View>
                        <ScrollView style={styles.filterListStation}>
                            {                                
                                this.state.metroStationArr ?
                                    this.state.metroStationArr.map((item, index) => (

                                            <CheckBox
                                            title={item.value}
                                            checkedIcon={<IconChecked/>}
                                            uncheckedIcon={<IconUnchecked/>}
                                            checked={item.checked}
                                            onPress={() => this.toogleCheckedStation(index)}
                                            containerStyle={{padding: 0, margin: 0, backgroundColor:'transparent', marginLeft: 0, marginRight: 0, borderWidth: 0, marginTop: 5, marginBottom: 5}}
                                            textStyle={{color: '#444B69', fontSize: 16, fontFamily: 'SF Pro Text', fontWeight: '400'}}
                                            key={index}
                                            />

                                    )):
                                    <NothingForPrev tabName={'Станций метро'}/>
                            }
                            
                        </ScrollView>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isFilterCalendar} style={styles.filter}>
                    <View style={styles.filterCalendarContent}>
                        <View style={styles.filterListStation}>
                            <Calendar
                                onDayPress={(day) => this.onDaySelect(day)}
                                markedDates={this.state._markedDates}
                                monthFormat={'MMMM yyyy'}
                                markingType={'period'}
                                onMonthChange={(month) => {console.log('month changed', month)}}
                                hideArrows={false}
                                renderArrow={(direction) => (direction === 'left' ? <CalendarLeft/> : <CalendarRight/> )}
                                hideExtraDays={false}
                                disableMonthChange={false}
                                firstDay={1}
                                hideDayNames={false}
                                showWeekNumbers={false}
                                onPressArrowLeft={substractMonth => substractMonth()}
                                onPressArrowRight={addMonth => addMonth()}
                                theme={{
                                    backgroundColor: '#ffffff',
                                    calendarBackground: '#ffffff',
                                    textSectionTitleColor: '#9FA5B9',
                                    selectedDayBackgroundColor: '#38AFAF',
                                    selectedDayTextColor: '#ffffff',
                                    todayTextColor: '#38AFAF',
                                    dayTextColor: '#444B69',
                                    textDisabledColor: '#444B69',
                                    selectedDotColor: '#ffffff',
                                    monthTextColor: '#444B69',
                                    indicatorColor: 'blue',
                                    textDayFontFamily: 'SF Pro Text',
                                    textMonthFontFamily: 'SF Pro Text',
                                    textDayHeaderFontFamily: 'SF Pro Text',
                                    textDayFontWeight: '400',
                                    textMonthFontWeight: '500',
                                    textDayHeaderFontWeight: '400',
                                    textDayFontSize: 16,
                                    textMonthFontSize: 18,
                                    textDayHeaderFontSize: 16,
                                    'stylesheet.calendar.header': {
                                        arrow: {
                                            padding: 0
                                        },
                                        header: {
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            marginTop: 6,
                                            alignItems: 'center',
                                            marginBottom: 10
                                        },
                                        week: {
                                            marginTop: 7,
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                            marginBottom: 10,
                                        },
                                    }
                                }}
                            />
                            <View style={{marginTop: 50, flexDirection: 'row'}}>
                                <TouchableOpacity onPress={this.toggleCalendarClose} style={{backgroundColor: '#F0F1F3', borderRadius: 10, paddingTop: 20, paddingBottom: 17, paddingLeft: 45, paddingRight: 45}}>
                                    <Text style={{color: '#444B69', fontSize: 14, fontFamily: 'SF Pro Text', fontWeight: '600'}}>ОТМЕНА</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.changeFilterDate} style={{backgroundColor: '#E94C89', borderRadius: 10, marginLeft: 'auto', paddingTop: 20, paddingBottom: 17, paddingLeft: 45, paddingRight: 45}}>
                                    <Text style={{color: '#FFF', fontSize: 14, fontFamily: 'SF Pro Text', fontWeight: '600'}}>ВЫБРАТЬ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isFilterCategory} style={styles.filter}>
                    <View style={styles.filterContent}>
                        <View style={styles.filterTop}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.textClose}>Выберите категории</Text>
                                <TouchableOpacity style={{marginLeft: 'auto'}} onPress={this.toggleCategoryClose}>
                                    <IconClose/>
                                </TouchableOpacity>
                            </View>
                            <SearchBar
                                placeholder="Поиск по категориям"
                                onChangeText={this.updateSearch}
                                value={search}
                                searchIcon={Search}
                                containerStyle={{height: 45, marginTop: 20, backgroundColor: '#606C93', borderRadius: 10, borderTopWidth: 0, borderBottomWidth: 0}}
                                inputContainerStyle={{backgroundColor: '#606C93', marginTop: -5}}
                                placeholderTextColor="#FFF"
                                inputStyle={{fontSize: 16, fontFamily: 'SF Pro Text', fontWeight: '400', color: '#FFF', marginLeft: 10}}
                            />
                        </View>
                        <ScrollView style={styles.filterListStation}>
                            {
                                this.state.categoryArr ?
                                    this.state.categoryArr.map((item, index)=>(
                                        <CheckBox
                                            title={item.name}
                                            checkedIcon={<IconChecked/>}
                                            uncheckedIcon={<IconUnchecked/>}
                                            checked={item.checked}
                                            onPress={() => this.toogleCheckedCategory(index, item)}
                                            containerStyle={{padding: 0, margin: 0, backgroundColor:'transparent', marginLeft: 0, marginRight: 0, borderWidth: 0, marginTop: 5, marginBottom: 5}}
                                            textStyle={{color: '#444B69', fontSize: 16, fontFamily: 'SF Pro Text', fontWeight: '400'}}
                                            key={index}
                                        />
                                    )):
                                    <NothingForPrev tabName={'категории'} />
                            }
                            
                        </ScrollView>
                    </View>
                </Modal>
            
            </View>
        );
    }
}

export default ListScreen

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
