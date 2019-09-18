import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Header} from 'react-native-elements';
import MapView, {Marker} from 'react-native-maps';
import IconMarker from "../../assets/images/icons/icon-marker";
import Modal from "react-native-modal";

//Icons
import IconBackWhite from '../../assets/images/icons/icons-back-white';
import IconRubble from "../../assets/images/icons/icon-rubble";
import IconEventReserv from "../../assets/images/icons/icon-event-reserv";

class EventMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalReserv: false
        }
    }

    toggleModalReserv = () => {
        this.setState({ isModalReserv: !this.state.isModalReserv });
    };

    render() {
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
                    <View style={styles.mapOuter}>
                        <MapView
                            loadingEnabled={true}
                            style={{flex: 1}}
                            region={{
                                latitude: 56.839013,
                                longitude: 60.597466,
                                latitudeDelta: 0.122,
                                longitudeDelta: 0.0421,
                            }}
                            showsUserLocation={true}
                        >
                            <Marker
                                coordinate={{latitude: 56.839013, longitude: 60.597466}}
                            >
                                <IconMarker/>
                            </Marker>
                        </MapView>
                        <View style={styles.bottomBlock}>
                            <Text style={styles.bottomBlockTitle}>Гимнастика Giggle Worms</Text>
                            <Text style={styles.bottomBlockDate}>С 25 марта по 4 апреля</Text>
                            <TouchableOpacity onPress={this.toggleModalReserv} style={styles.buttonReserv}>
                                <View style={styles.firstPartReserv}>
                                    <Text style={styles.buttonReservText}>Забронировать</Text>
                                </View>
                                <View style={styles.twoPartReserv}>
                                    <Text style={styles.twoPartText}>1200 <IconRubble/></Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
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
            </View>
        )
    }
}

export default EventMap;

const styles = StyleSheet.create({
    buttonReserv: {
        marginTop: 25,
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
    mapOuter: {
        flex: 1,
        marginTop: 10,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#FFF',
        overflow: 'hidden'
    },
    bottomBlock: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        minHeight: 190,
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
        marginTop: 8,
        color: '#444B69',
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    }
});