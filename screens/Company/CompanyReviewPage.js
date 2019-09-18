import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import {Header} from 'react-native-elements';
import Modal from "react-native-modal";
import StarRating from 'react-native-star-rating';

//Icons
import IconBackWhite from "../../assets/images/icons/icons-back-white";
import IconPhoto from "../../assets/images/icons/icon-photo";
import IconAddReview from "../../assets/images/icons/icon-add-review";
import IconModalReview from "../../assets/images/icons/icon-modal-review";

class CompanyAllEvents extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalResponse: false,
            starCount: 3
        }
    }

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
                    centerComponent={{ text: 'Отзыв', style: { color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 17, fontWeight: '500' } }}
                    containerStyle={{
                        backgroundColor: '#556086',
                        borderBottomWidth: 0
                    }}
                    leftComponent={<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{left: 25}}><IconBackWhite/></TouchableOpacity>}
                />
                <View style={{backgroundColor: '#556086', flex: 1}}>
                    <ScrollView style={styles.scrollBlock}>
                        <View style={styles.rowItem}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{marginRight: 12}}>
                                    <Image source={require('../../assets/images/images/avatars/Avatar1.png')} />
                                </View>
                                <View>
                                    <View style={{width: 50}}>
                                        <StarRating
                                            disabled={true}
                                            maxStars={4}
                                            rating={this.state.starCount}
                                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                                            starSize={15}
                                            starStyle={{marginRight: 4}}
                                            fullStarColor="#FACD42"
                                            emptyStarColor="#E2E4E9"
                                        />
                                    </View>
                                    <View style={{marginTop: 7}}>
                                        <Text style={styles.reviewName}>Татьяна Назарова</Text>
                                    </View>
                                    <View style={{marginTop: 5}}>
                                        <Text style={styles.reviewDate}>08.12.19</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{marginTop: 20}}>
                                <Text style={styles.reviewText}>
                                    Мы ходили сюда 3 года и ходили бы до самой школы, если бы была группа для совсем взрослых детей. Ребёнку очень нравилось там.
                                    {"\n"}{"\n"}
                                    Воспитатель Катя была с ними все 3 года. Она очень любит всех детей, всегда о них заботится, всегда обнимимет и успокоит. Хозяин садика Алексей вечно увешан детьми, они его обожают. Стабильно покупает детям то игрушки, то новую посуду, то постельное белье красивое, то гирлянды, то дискошар, что бы вечером танцевать под музыку из мультиков.
                                    {"\n"}{"\n"}
                                    На все праздники приглашают аниматоров, устраивают настоящие праздники, всегда их фотографируют и снимают видео и при этом не на что не собирает денег. Кормят вкусно, дети всё время просят добавку.
                                    {"\n"}{"\n"}
                                    Мы любим это место и рекомендуем!
                                </Text>
                            </View>
                        </View>
                        <ScrollView
                            horizontal
                            contentContainerStyle={{paddingLeft: 20, paddingRight: 5}}
                            style={{marginBottom: 50}}
                        >
                            <View style={{marginRight: 15}}>
                                <Image source={require('../../assets/images/images/reviewPhoto1.png')}/>
                            </View>
                            <View style={{marginRight: 15}}>
                                <Image source={require('../../assets/images/images/reviewPhoto2.png')}/>
                            </View>
                        </ScrollView>
                    </ScrollView>
                </View>
                <Modal isVisible={this.state.isModalResponse} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={styles.modalMinTitleBlock}>
                            <Text>
                                <IconModalReview style={{marginRight: 14}}/>
                                <Text style={styles.modalMinTitle}>Написать отзыв</Text>
                            </Text>
                        </View>
                        <View style={styles.modalMinDescBlock}>
                            <Text style={styles.modalMinDesc}>
                                Чтобы написать отзыв  <Text style={{fontWeight: '500'}}>Войдите в профиль</Text>
                            </Text>
                        </View>
                        <View style={styles.modalMinButtonsBlock}>
                            <TouchableOpacity onPress={this.toggleModalResponse} style={styles.modalMinCancel}>
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
    reviewName: {
        color: '#444B69',
        fontSize: 16,
        fontFamily: 'SF Pro Text',
        fontWeight: '500'
    },
    reviewDate: {
        color: '#9DA6C1',
        fontSize: 13,
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    reviewText: {
        color: '#444B69',
        fontSize: 15,
        fontFamily: 'SF Pro Text',
        lineHeight: 24,
        fontWeight: '400'
    },
    textPhoto: {
        fontFamily: 'SF Pro Text',
        color: '#444B69',
        fontSize: 13,
        fontWeight: '400'
    }
});