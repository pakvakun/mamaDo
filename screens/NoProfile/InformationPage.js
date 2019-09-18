import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Header} from 'react-native-elements';

//Icons
import IconBackWhite from '../../assets/images/icons/icons-back-white';
import LikeNoActive from '../../assets/images/icons/like-nactive';
import PhotoLike from '../../assets/images/icons/photo-like';
import IconNewsNext from '../../assets/images/icons/icon-news-next';
import IconNewsPrev from '../../assets/images/icons/icon-news-prev';

class News extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Header
                    centerComponent={{ text: 'Как пользоваться приложением', style: { color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 17, fontWeight: '500' } }}
                    containerStyle={{
                        backgroundColor: '#556086',
                        borderBottomWidth: 0
                    }}
                    leftComponent={<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{left: 25}}><IconBackWhite/></TouchableOpacity>}
                />
                <ScrollView style={styles.textContainer}>
                    <View style={styles.newsRow}>
                        <TouchableOpacity>
                            <Text style={styles.titleNews}>
                                Mamado - это просто!
                            </Text>
                        </TouchableOpacity>
                        <View style={{marginTop: 15}}>
                            <Text style={styles.descNews}>
                                В своем стремлении повысить качество жизни, они забывают, что синтетическое тестирование напрямую зависит от как…
                            </Text>
                        </View>
                        <View style={{marginTop: 15}}>
                            <Text style={styles.descNews}>
                                Приятно, граждане, наблюдать, как интерактивные прототипы лишь добавляют фракционных разногласий и преданы социально-демократической анафеме. В своем стремлении улучшить пользовательский опыт мы упускаем, что сделанные на базе интернет-аналитики выводы представлены в исключительно положительном свете.
                                {"\n"}{"\n"}
                                В своем стремлении улучшить пользовательский опыт мы упускаем, что сделанные на базе интернет-аналитики выводы представлены в исключительно положительном свете.
                                {"\n"}{"\n"}
                                В своем стремлении улучшить пользовательский опыт мы упускаем, что сделанные на базе интернет-аналитики выводы представлены в исключительно положительном свете.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default News;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#556086',
        height: '100%'
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
    newsRow: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 30,
        paddingBottom: 30
    },
    topNav: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    badge: {
        backgroundColor: '#38AFAF',
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 3
    },
    badgeText: {
        color: '#FFF',
        fontSize: 13,
        fontFamily: 'SF Compact Rounded',
        fontWeight: '500',
        lineHeight: 24
    },
    badgeIntr:{
        backgroundColor: '#76AD2A',
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 3
    },
    city: {
        color: '#444B69',
        fontSize: 13,
        fontFamily: 'SF Pro Text',
        lineHeight: 24,
        fontWeight: '400',
        marginLeft: 12
    },
    date: {
        color: '#9DA6C1',
        fontSize: 13,
        lineHeight: 24,
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        marginLeft: 12
    },
    like: {
        marginLeft: 'auto'
    },
    titleNews: {
        color: '#444B69',
        fontSize: 18,
        lineHeight: 24,
        fontFamily: 'SF Pro Text',
        fontWeight: '600'
    },
    descNews: {
        lineHeight: 23,
        color: '#444B69',
        fontSize: 15,
        fontFamily: 'SF Pro Text',
        fontWeight: '400'
    },
    imageContainer: {
        borderRadius: 10,
        marginTop: 20,
        height: 220
    },
    likeBlock: {
        position: 'absolute',
        bottom: 12,
        left: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    likeCount: {
        color: '#FFF',
        fontFamily: 'SF Pro Text',
        fontSize: 13,
        lineHeight: 24,
        fontWeight: '600',
        marginLeft: 6
    }
});
