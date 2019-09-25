import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { SearchBar } from 'react-native-elements';
import axios from 'axios';

import IconBackWhite from '../../assets/images/icons/icons-back-white';
import GeoCurrent from '../../assets/images/icons/geo-current';

class CitySelect extends Component {
    state = {
        search: '',
        cityList: [
            // {id: 1, name: 'Екатеринбург', region: 'Свердловская область'},
            // {id: 1, name: 'Москва', region: ''},
            // {id: 1, name: 'Санкт-Петербург', region: ''},
            // {id: 1, name: 'Новосибирск', region: ''},
            // {id: 1, name: 'Волгоград', region: ''},
            // {id: 1, name: 'Воронеж', region: ''},
            // {id: 1, name: 'Казань', region: 'Республика Татарстан'},
            // {id: 1, name: 'Красноярск', region: ''},
            // {id: 1, name: 'Нижний Новгород', region: ''},
            // {id: 1, name: 'Нижний Тагил', region: ''},
            // {id: 1, name: 'Омск', region: ''},
            // {id: 1, name: 'Первоуральск', region: ''},
            // {id: 1, name: 'Пермь', region: ''},
            // {id: 1, name: 'Ростов-на-Дону', region: ''},
            // {id: 1, name: 'Рязань', region: ''},
            // {id: 1, name: 'Челябинск', region: ''},
        ],
    };

    updateSearch = search => {
        // search = search.toLowerCase();
        // let searchCityList =  this.state.cityList.filter(item => {
        //     let name = item.name.toLowerCase()
        //     if (name.includes(search)) {
        //         return item
        //     }
        // })
        this.setState({ search });
        this.getCityList()
    };
    selectedCity = (city) => {
        axios({
            method: 'POST',
            url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Token 23cd3016c5a4229e48764f2dcef89935a7a756c3',
            },
            data: {
                query: city.name,
                count: 1,
                from_bound: {
                    value: 'city',
                },
                locations: {
                    city_type_full: 'город'
                },
                to_bound: {
                    value: 'city'
                },
                restrict_value: false,
            }
        }).then(res=>{ 
            this.props.navigation.state.params.citySelect({name: res.data.suggestions[0].data.city, region: `${res.data.suggestions[0].data.region} ${res.data.suggestions[0].data.region_type_full}`, lat: res.data.suggestions[0].data.geo_lat, long: res.data.suggestions[0].data.geo_lon})
            this.props.navigation.goBack()
            
        }).catch(err=>{console.log({err})})
    }
    getCityList = () => {
        axios({
            method: 'POST',
            url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Token 23cd3016c5a4229e48764f2dcef89935a7a756c3',
                // 'X-Secret': '7420ce8f1e43fff856c570524fac56898971cf82',
            },
            data: {
                query: this.state.search.length ? this.state.search : 'а',
                count: 20,
                from_bound: {
                    value: 'city',
                },
                locations: {
                    city_type_full: 'город'
                },
                to_bound: {
                    value: 'city'
                },
                restrict_value: false,
            }
        }).then(res=>{ 
            let cityList = [];

            res.data.suggestions.map(item => {
                cityList.push({name: item.data.city, region: `${item.data.region} ${item.data.region_type_full}`, lat: item.geo_lat, long: item.geo_lon })
            })
            // console.log(res);
            
            this.setState({cityList: cityList})
        }).catch(err=>{console.log({err})})
    }
    getCurrentPlace = async () => {
        try {
            let currentPos = await AsyncStorage.getItem('currentPosition')
            if (currentPos !== null) {
                currentPos = JSON.parse(currentPos)
                this.setState({currentPlace: currentPos.place, currentArea: currentPos.area, currentLat: currentPos.lat, currentLong: currentPos.long})
            }
        } catch (error) {
            console.log(error);
        }
    }
    componentDidMount(){
        this.getCurrentPlace()
        this.getCityList()
    }
    componentDidUpdate(prevState){
        // if (prevState && prevState.search !== this.state.search) {
        //     this.getCityList()
        // }
    }
    render() {
        console.log(this.state)
        const { search } = this.state;
        let { params } = this.props.navigation
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.backContainer} onPress={() => this.props.navigation.goBack()}>
                    <IconBackWhite/>
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <SearchBar
                        placeholder="Поиск города"
                        onChangeText={this.updateSearch}
                        value={search}
                        containerStyle={{height: 45, paddingLeft: 45, marginTop: -10, backgroundColor: '#606C93', borderRadius: 10, borderTopWidth: 0, borderBottomWidth: 0, marginLeft: 20, marginRight: 20}}
                        inputContainerStyle={{backgroundColor: '#606C93', marginTop: -5}}
                        placeholderTextColor="#FFF"
                        searchIcon={false}
                        inputStyle={{fontSize: 16, fontFamily: 'SF Pro Text', fontWeight: '400', color: '#FFF'}}
                    />
                </View>
                <View style={styles.textContainer}>
                    <ScrollView contentContainerStyle={styles.scrollBlock}>
                        <TouchableOpacity style={styles.cityRow} onPress={()=>this.selectedCity()}>
                            <View>
                                <Text style={styles.city}>{this.state.currentPlace || 'Загрузка...'}</Text>
                                <Text style={styles.region}>{this.state.currentArea || 'Загрузка...'}</Text>
                            </View>
                            <View style={{marginLeft: 'auto'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <GeoCurrent/>
                                    <Text style={{color: '#E94C89', fontSize: 14, fontFamily: 'SF Pro Text', fontWeight: '500', marginLeft: 4}}>Вы здесь</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {
                            this.state.cityList &&
                            this.state.cityList.map((city, index) => (
                            <TouchableOpacity style={styles.cityRow} key={index} onPress={()=>this.selectedCity(city)}>
                                <View>
                                    <Text style={styles.city}>{city.name}</Text>
                                    <Text style={styles.region}>{city.region}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default CitySelect;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#556086',
        flex: 1
    },
    backContainer: {
        position: 'absolute',
        width: 24,
        marginLeft: 40,
        top: 60,
        zIndex: 1
    },
    textContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        marginTop: 100,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    titleContainer: {
        position: 'absolute',
        marginTop: 55,
        width: '100%',
        zIndex: 0
    },
    cityRow: {
        marginBottom: 25,
        flexDirection: 'row'
    },
    city: {
        fontSize: 16,
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontWeight: '500'
    },
    region: {
        fontSize: 14,
        color: '#9DA6C1',
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    scrollBlock: {
        paddingTop: 30,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 10
    }
});
