import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar} from 'react-native';
import {Header} from 'react-native-elements';

import IconBackWhite from '../../assets/images/icons/icons-back-white';
import RightArrow from '../../assets/images/icons/rightArrow';

//Point Colors
import Point from '../../assets/images/colorPoints/point';

class Information extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Header
                    centerComponent={{ text: 'Информация', style: { color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 17, fontWeight: '500' } }}
                    containerStyle={{
                        backgroundColor: '#556086',
                        borderBottomWidth: 0
                    }}
                    leftComponent={<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{left: 25}}><IconBackWhite/></TouchableOpacity>}
                />
                <ScrollView style={styles.textContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('InformationPage')} style={styles.infoRow}>
                        <View>
                            <Point fill="#E94C89"/>
                        </View>
                        <View style={{marginLeft: 15}}>
                            <Text style={styles.infoTitle}>Как пользоваться приложением?</Text>
                        </View>
                        <View style={{marginLeft: 'auto'}}>
                            <RightArrow/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('InformationPage')}  style={styles.infoRow}>
                        <View>
                            <Point fill="#707896"/>
                        </View>
                        <View style={{marginLeft: 15}}>
                            <Text style={styles.infoTitle}>Как создать компанию / событие?</Text>
                        </View>
                        <View style={{marginLeft: 'auto'}}>
                            <RightArrow/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('InformationPage')}  style={styles.infoRow}>
                        <View>
                            <Point fill="#66CBCB"/>
                        </View>
                        <View style={{marginLeft: 15}}>
                            <Text style={styles.infoTitle}>Узнайте все о бизнес профиле</Text>
                        </View>
                        <View style={{marginLeft: 'auto'}}>
                            <RightArrow/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('InformationPage')}  style={styles.infoRow}>
                        <View>
                            <Point fill="#FACD42"/>
                        </View>
                        <View style={{marginLeft: 15}}>
                            <Text style={styles.infoTitle}>Как пользоваться расписанием в календаре?</Text>
                        </View>
                        <View style={{marginLeft: 'auto'}}>
                            <RightArrow/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('InformationPage')}  style={styles.infoRow}>
                        <View>
                            <Point fill="#76AD2A"/>
                        </View>
                        <View style={{marginLeft: 15}}>
                            <Text style={styles.infoTitle}>Как создать бизнес аккаунт?</Text>
                        </View>
                        <View style={{marginLeft: 'auto'}}>
                            <RightArrow/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('InformationPage')}  style={styles.infoRow}>
                        <View>
                            <Point fill="#34A0E3"/>
                        </View>
                        <View style={{marginLeft: 15}}>
                            <Text style={styles.infoTitle}>Создание профиля ребенка</Text>
                        </View>
                        <View style={{marginLeft: 'auto'}}>
                            <RightArrow/>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

export default Information;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#556086',
        flex: 1
    },
    backContainer: {
        position: 'absolute',
        width: 24,
        marginLeft: 24,
        top: 60,
        zIndex: 1
    },
    textContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        marginTop: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    titleContainer: {
        position: 'absolute',
        marginTop: 55,
        width: '100%',
        zIndex: 0
    },
    title: {
        color: '#FFF',
        fontSize: 17,
        fontFamily: 'SF Pro Text',
        fontWeight: '500',
        textAlign: 'center'
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F1F3',
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 20,
        paddingRight: 20
    },
    infoTitle: {
        color: '#444B69',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'SF Pro Text',
        lineHeight: 24
    }
});
