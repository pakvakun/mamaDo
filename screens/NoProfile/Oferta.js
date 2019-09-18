import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar} from 'react-native';
import {Header} from 'react-native-elements';

//Icons
import IconBackWhite from '../../assets/images/icons/icons-back-white';

class Oferta extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Header
                    centerComponent={{ text: 'Публичная оферта', style: { color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 17, fontWeight: '500' } }}
                    containerStyle={{
                        backgroundColor: '#556086',
                        borderBottomWidth: 0
                    }}
                    leftComponent={<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{left: 25}}><IconBackWhite/></TouchableOpacity>}
                />
                <View style={styles.textContainer}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <Text style={styles.textTitle}>Это важно</Text>
                        <Text style={styles.textP}>
                            Как уже неоднократно упомянуто, элементы политического процесса будут в равной степени предоставлены сами себе.
                            {'\n'}
                            {'\n'}
                            Приятно, граждане, наблюдать, как интерактивные прототипы лишь добавляют фракционных разногласий и преданы социально-демократической анафеме. В своем стремлении улучшить пользовательский опыт мы упускаем, что сделанные на базе интернет-аналитики выводы представлены в исключительно положительном свете.
                            {'\n'}
                            {'\n'}
                            Противоположная точка зрения подразумевает, что тщательные исследования конкурентов призывают нас к новым свершениям, которые, в свою очередь, должны быть своевременно верифицированы.
                        </Text>
                        <Text style={styles.textTitle}>Информация</Text>
                        <Text style={styles.textP}>
                            В своем стремлении улучшить пользовательский опыт мы упускаем, что сделанные на базе интернет-аналитики выводы представлены в исключительно положительном свете.
                            {'\n'}
                            {'\n'}
                            В своем стремлении улучшить пользовательский опыт мы упускаем, что сделанные на базе интернет-аналитики выводы представлены в исключительно положительном свете.
                        </Text>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default Oferta;

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
    textTitle: {
        color: '#444B69',
        fontSize: 18,
        fontFamily: 'SF Pro Text',
        fontWeight: '600',
        marginBottom: 20,
    },
    textP: {
        lineHeight: 23,
        fontSize: 15,
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        marginBottom: 35,
        color: '#444B69'
    },
    scrollContainer: {
        paddingTop: 30,
        paddingLeft: 24,
        paddingRight: 24
    }
});
