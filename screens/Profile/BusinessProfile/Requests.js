import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar} from 'react-native';
import {Header} from 'react-native-elements';

//Menu Icon
import IconMenu from '../../../assets/images/business/icon-menu';

//Images
import ImageHome from '../../../assets/images/business/image-home';
import IconAddReview from "../../../assets/images/icons/icon-add-review";

class Requests extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Header
                    centerComponent={{ text: 'Мои компании', style: { color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 17, fontWeight: '500' } }}
                    containerStyle={{
                        backgroundColor: '#556086',
                        borderBottomWidth: 0
                    }}
                    leftComponent={<TouchableOpacity onPress={() => this.props.navigation.navigate('BusinesProfile')} style={{left: 25}}><IconMenu/></TouchableOpacity>}
                />
                <View style={styles.textContainer}>
                    <View style={{alignItems: 'center'}}>
                        <ImageHome/>
                        <Text style={{fontFamily: 'SF Pro Text', fontSize: 15, textAlign: 'center', marginTop: 40, color: '#444B69', lineHeight: 24}}>
                            В списке компаний ничего нет.{"\n"}
                            Вы можете создать компанию,{"\n"}
                            нажав на «+»
                        </Text>
                    </View>
                    <TouchableOpacity style={{position: 'absolute', width: 52, height: 52, bottom: 20, right: 16, backgroundColor: '#E94C89', borderRadius: 12, justifyContent: 'center', alignItems: 'center'}}>
                        <IconAddReview/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Requests;

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
        marginTop: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});