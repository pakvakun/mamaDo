import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Header} from 'react-native-elements';
import MapView, {Marker} from 'react-native-maps';
import IconMarker from "../../assets/images/icons/icon-marker";

//Icons
import IconBackWhite from '../../assets/images/icons/icons-back-white';
import IconGeoMap from '../../assets/images/icons/icon-geo-map';
import IconMetro from '../../assets/images/icons/icon-metro';

class EventMap extends Component {
    render() {
        let {navProps} = this.props.navigation.state.params;
        console.log({navProps})
        return (
            <View style={{flex: 1}}>
                <Header
                    centerComponent={{ text: 'Карта', style: { color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 17, fontWeight: '500' } }}
                    containerStyle={{
                        backgroundColor: '#556086',
                        borderBottomWidth: 0
                    }}
                    leftComponent={<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{left: 25}}><IconBackWhite/></TouchableOpacity>}
                />
                <View style={{backgroundColor: '#556086', flex: 1}}>
                    <View style={{flex: 1, marginTop: 10, borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor: '#FFF', overflow: 'hidden'}}>
                        <MapView
                            loadingEnabled={true}
                            style={{flex: 1}}
                            region={{
                                latitude: navProps.lat,
                                longitude: navProps.long,
                                latitudeDelta: 0.122,
                                longitudeDelta: 0.0421,
                            }}
                            showsUserLocation={true}
                        >
                            <Marker
                                coordinate={{latitude: navProps.lat, longitude: navProps.long}}
                            >
                                <IconMarker/>
                            </Marker>
                        </MapView>
                        <View style={styles.bottomBlock}>
                            <Text style={styles.bottomBlockTitle}>{navProps.model && navProps.model.name || 'Загрузка...'}</Text>
                            <View style={styles.bottomDateBlock}>
                                <View>
                                    <IconGeoMap/>
                                </View>
                                <View style={{marginLeft: 10}}>
                                    <Text style={styles.bottomBlockDate}>
                                        {navProps.text || 'Загрузка...'}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.bottomBlockMetro}>
                                <View>
                                    <IconMetro/>
                                </View>
                                <View style={{marginLeft: 5}}>
                                    <Text style={styles.bottomBlockDate}>
                                        {navProps.station || 'Загрузка...'}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default EventMap;

const styles = StyleSheet.create({
    bottomBlock: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        minHeight: 175,
        backgroundColor: '#FFF',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 24
    },
    bottomBlockTitle: {
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24
    },
    bottomBlockDate: {
        color: '#444B69',
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    bottomDateBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    bottomBlockMetro: {
        flexDirection: 'row',
        marginTop: 5,
        marginLeft: 25,
        alignItems: 'center'
    }
});