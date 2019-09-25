import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, Image} from 'react-native';
import {SearchBar} from 'react-native-elements';
import axios from 'axios';

//Icons
import MapView, {Marker} from "react-native-maps";
import IconBackWhite from "../../../../assets/images/icons/icons-back-white";
import IconMarker from "../../../../assets/images/icons/icon-marker";
import IconGeoMap from '../../../../assets/images/icons/icon-geo-map';


class CreateCompanyMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            coordinate: false,
            street: '',
            handleReg: {
                latitude: 56.838011,
                longitude: 60.597465,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }
    }
    // getInitialState(){
    //     return {
    //       initialPosition: 'Can\'t find',
    //       lastPosition: 'Can\'t find',
    //     };
    //   }
    getMarker = (e) => {
        this.setState({coordinate: e.nativeEvent.coordinate});
        axios({
            method: 'GET',
            baseURL: 'https://geocode-maps.yandex.ru',
            url: '/1.x/',
            params: {
                apikey: '34e503cc-e09e-4a0e-a961-e00d51138468',
                geocode: `${e.nativeEvent.coordinate.longitude},${e.nativeEvent.coordinate.latitude}`,
                kind: 'house',
                format: 'json'
            }
        }).then( (response) =>{
                const street = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.name;                
                this.setState({
                    addresses: 
                        {
                            text: street,
                            lat: this.state.coordinate.latitude,
                            long: this.state.coordinate.longitude,
                        },
                    street: street
                });
            });
    };
    submitAddres = () => {
        let newRoute = this.props.navigation.state.params.prevRoute;
        let addresses = this.props.navigation.state.params.address;
        let index = this.props.navigation.state.params.index;
            if (addresses) {
                if (index || index === 0) {
                    addresses[index].lat = this.state.addresses.lat
                    addresses[index].long = this.state.addresses.long
                    addresses[index].text = this.state.addresses.text
                    // addresses.splice(index, 1, this.state.addresses);
                }else{
                    addresses.splice(addresses.length, 0, this.state.addresses)
                }
                addresses = addresses.filter(item => {
                    if (item.text) {
                        return item                            
                    }
                })
                this.props.navigation.navigate(newRoute, {address: addresses })
            }else{
                this.props.navigation.navigate(newRoute, {address: this.state.addresses })
            }
    }
    componentDidMount(){
        
      }
    render(){   
        console.log(this.props);
                  
        return(
            <View style={{flex: 1, backgroundColor: '#556086'}}>
                <StatusBar barStyle="light-content" />
                <View style={{marginTop: 45}}>
                    <SearchBar
                        placeholder="Введите адрес"
                        searchIcon={false}
                        containerStyle={styles.searchBar}
                        inputContainerStyle={{backgroundColor: '#606C93', marginTop: -5}}
                        placeholderTextColor="#FFF"
                        inputStyle={styles.inputStyle}
                    />
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{position: 'absolute', top: 16, left: 35}}>
                        <IconBackWhite/>
                    </TouchableOpacity>
                </View>
                <View style={styles.mapBlock}>
                    <MapView
                        style={{flex: 1}}
                        region={this.state.handleReg}
                        onPress={(e) => this.getMarker(e)}
                        showsUserLocation={false}
                        onRegionChange={(e) => this.setState({handleReg: e})}
                    >
                    {this.state.coordinate ? (
                        <Marker
                            coordinate={this.state.coordinate}
                            // title={this.state.street}
                        >
                            <IconMarker/>
                        </Marker>
                    ) : null}
                    </MapView>
                    {this.state.coordinate ? (
                        <View style={{height: 120}}>
                            <View style={styles.mapAddress}>
                                <View>
                                    <IconGeoMap/>
                                </View>
                                <View style={{marginLeft: 10}}>
                                    <Text style={styles.mapAddressText}>
                                        {this.state.street || 'Загрузка...'}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.addressButton} onPress={()=>this.submitAddres(this.props.navigation.state.params.typeAdres)}>
                                <Text style={styles.buttonText}>Указать этот адрес</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}
                </View>
            </View>
        )
    }
}

export default CreateCompanyMap;

const styles = StyleSheet.create({
    searchBar: {
        marginLeft: 20,
        marginRight: 20,
        height: 45,
        marginTop: 0,
        backgroundColor: '#606C93',
        borderRadius: 10,
        borderTopWidth: 0,
        borderBottomWidth: 0
    },
    inputStyle: {
        paddingLeft: 25,
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        color: '#FFF',
        marginLeft: 10
    },
    addressButton: {
        backgroundColor: '#E94C89',
        borderRadius: 10,
        paddingTop: 17,
        paddingBottom: 17,
        marginLeft: 24,
        marginRight: 24
    },
    buttonText: {
        color: '#FFF',
        textTransform: 'uppercase',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center'
    },
    mapBlock: {
        marginTop: 13,
        backgroundColor: '#FFF',
        flex: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        overflow: 'hidden'
    },
    mapAddress: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 24,
        paddingBottom: 10,
        paddingTop: 10,
    },
    mapAddressText: {
        color: '#444B69',
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
});