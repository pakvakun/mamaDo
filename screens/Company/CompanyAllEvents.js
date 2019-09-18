import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import {Header} from 'react-native-elements';
import Modal from "react-native-modal";
import StarRating from 'react-native-star-rating';

//Icons
import IconBackWhite from "../../assets/images/icons/icons-back-white";
import EventRun from "../../assets/images/icons/event-run";
import EventUser from '../../assets/images/icons/event-user';
import EventLike from "../../assets/images/icons/event-like";
import IconMetro from "../../assets/images/icons/icon-metro";
import Like from "../../assets/images/icons/like-nactive";
import IconNotFound from "../../assets/images/icons/icon-not-found";
import IconEventLike from "../../assets/images/icons/icon-event-like";
import IconSendResposne from "../../assets/images/icons/icon-send-response";

import Events from '../Components/events';

class CompanyAllEvents extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalFavorite: false,
            isModalResponse: false,
            starCount: 3
        }
    }

    toggleModalFavorite = () => {
        this.setState({ isModalFavorite: !this.state.isModalFavorite });
    };

    toggleModalResponse = () => {
        this.setState({ isModalResponse: !this.state.isModalResponse });
    };

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    render(){
        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle="light-content" />
                <Header
                    centerComponent={{ text: 'События компании', style: { color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 17, fontWeight: '500' } }}
                    containerStyle={{
                        backgroundColor: '#556086',
                        borderBottomWidth: 0
                    }}
                    leftComponent={<TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={{left: 25}}><IconBackWhite/></TouchableOpacity>}
                />
                <View style={{backgroundColor: '#556086', flex: 1}}>
                    <Events {...this.props} companyEvents={this.props.navigation.state.params.companyEvents} isBusiness={true}/>
                </View>
            </View>
        )
    }
}

export default CompanyAllEvents;

const styles = StyleSheet.create({
    scrollBlock: {
        backgroundColor: '#FFF',
        marginTop: 10,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    rowItem: {
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 28,
        paddingBottom: 28,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F1F3'
    },
    textAge: {
        marginLeft: 4,
        marginRight: 20,
        lineHeight: 24,
        fontSize: 13,
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    textDist: {
        marginLeft: 4,
        lineHeight: 24,
        fontSize: 13,
        color: '#444B69',
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    textPrice: {
        color: '#444B69',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '600'
    },
    blockPrice: {
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center'
    },
    badgeDisc: {
        backgroundColor: '#38AFAF',
        borderRadius: 3,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 7,
        paddingRight: 7
    },
    badgeCoupon: {
        backgroundColor: '#F0BF37',
        borderRadius: 3,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 7,
        paddingRight: 7
    },
    badgeStock: {
        backgroundColor: '#F486B1',
        borderRadius: 3,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 7,
        paddingRight: 7
    },
    badgeFree: {
        backgroundColor: '#6978AC',
        borderRadius: 3,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 7,
        paddingRight: 7
    },
    badgeText: {
        color: '#FFF',
        fontFamily: 'SF Compact Rounded',
        fontSize: 13,
        fontWeight: '500'
    },
    titleText: {
        color: '#444B69',
        fontSize: 18,
        fontFamily: 'SF Pro Text',
        fontWeight: '600'
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
    NFBlock: {
        marginTop: 40,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    NFTitle: {
        marginTop: 20,
        color: '#444B69',
        fontSize: 19,
        fontFamily: 'SF Pro Text',
        fontWeight: '600'
    },
    NFDesc: {
        marginTop: 18,
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'SF Pro Text',
        lineHeight: 24,
        color: '#444B69',
        fontWeight: '400'
    },
    NFButtonOuter: {
        marginTop: 30,
        marginBottom: 50,
        width: '100%',
        backgroundColor: '#E94C89',
        borderRadius: 10,
        paddingTop: 18,
        paddingBottom: 18
    },
    NFButtonText: {
        color: '#FFF',
        fontSize: 14,
        textTransform: 'uppercase',
        fontWeight: '600',
        textAlign: 'center'
    }
});