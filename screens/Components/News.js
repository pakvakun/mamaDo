import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

//Icons
import IconBackWhite from '../../assets/images/icons/icons-back-white';
import LikeNoActive from '../../assets/images/icons/like-nactive';
import PhotoLike from '../../assets/images/icons/photo-like';

class News extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.backContainer} onPress={() => this.props.navigation.navigate('NoProfile')}>
                    <IconBackWhite/>
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Новости</Text>
                </View>
                <ScrollView style={styles.textContainer}>
                    <View style={styles.newsRow}>
                        <View style={styles.topNav}>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>5 лучших мест</Text>
                            </View>
                            <View>
                                <Text style={styles.city}>Екатеринбург</Text>
                            </View>
                            <View>
                                <Text style={styles.date}>20.11.19</Text>
                            </View>
                            <TouchableOpacity style={styles.like}>
                                <LikeNoActive/>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('NewsPage')} style={{marginTop: 18}}>
                            <Text style={styles.titleNews}>
                                Детский клуб Подсолнух запускает новое событие
                            </Text>
                        </TouchableOpacity>
                        <View style={{marginTop: 15}}>
                            <Text style={styles.descNews}>
                                В своем стремлении повысить качество жизни, они забывают, что синтетическое тестирование напрямую зависит от как…
                            </Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <LinearGradient colors={['#FFF', '#21232C']} style={{borderRadius: 10}}>
                                <Image style={{opacity: 0.7}} source={require('../../assets/images/images/photoNews1.png')}/>
                            </LinearGradient>
                            <TouchableOpacity style={styles.likeBlock}>
                                <PhotoLike/>
                                <Text style={styles.likeCount}>
                                    204
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.newsRow}>
                        <View style={styles.topNav}>
                            <View style={styles.badgeIntr}>
                                <Text style={styles.badgeText}>Интересное</Text>
                            </View>
                            <View>
                                <Text style={styles.city}>Екатеринбург</Text>
                            </View>
                            <View>
                                <Text style={styles.date}>20.11.19</Text>
                            </View>
                            <TouchableOpacity style={styles.like}>
                                <LikeNoActive/>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('NewsPage')} style={{marginTop: 18}}>
                            <Text style={styles.titleNews}>
                                Детский клуб Подсолнух запускает новое событие
                            </Text>
                        </TouchableOpacity>
                        <View style={{marginTop: 15}}>
                            <Text style={styles.descNews}>
                                В своем стремлении повысить качество жизни, они забывают, что синтетическое тестирование напрямую зависит от как…
                            </Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <LinearGradient colors={['#FFF', '#000']} style={{borderRadius: 10}}>
                                <Image style={{opacity: 0.7}} source={require('../../assets/images/images/photoNews2.png')}/>
                            </LinearGradient>
                            <TouchableOpacity style={styles.likeBlock}>
                                <PhotoLike/>
                                <Text style={styles.likeCount}>
                                    204
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.newsRow}>
                        <View style={styles.topNav}>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>5 лучших мест</Text>
                            </View>
                            <View>
                                <Text style={styles.city}>Екатеринбург</Text>
                            </View>
                            <View>
                                <Text style={styles.date}>20.11.19</Text>
                            </View>
                            <TouchableOpacity style={styles.like}>
                                <LikeNoActive/>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('NewsPage')} style={{marginTop: 18}}>
                            <Text style={styles.titleNews}>
                                Детский клуб Подсолнух запускает новое событие
                            </Text>
                        </TouchableOpacity>
                        <View style={{marginTop: 15}}>
                            <Text style={styles.descNews}>
                                В своем стремлении повысить качество жизни, они забывают, что синтетическое тестирование напрямую зависит от как…
                            </Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <LinearGradient colors={['#FFF', '#21232C']} style={{borderRadius: 10}}>
                                <Image style={{opacity: 0.7}} source={require('../../assets/images/images/photoNews3.png')}/>
                            </LinearGradient>
                            <TouchableOpacity style={styles.likeBlock}>
                                <PhotoLike/>
                                <Text style={styles.likeCount}>
                                    204
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.newsRow}>
                        <View style={styles.topNav}>
                            <View style={styles.badgeIntr}>
                                <Text style={styles.badgeText}>Интересное</Text>
                            </View>
                            <View>
                                <Text style={styles.city}>Екатеринбург</Text>
                            </View>
                            <View>
                                <Text style={styles.date}>20.11.19</Text>
                            </View>
                            <TouchableOpacity style={styles.like}>
                                <LikeNoActive/>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('NewsPage')} style={{marginTop: 18}}>
                            <Text style={styles.titleNews}>
                                Детский клуб Подсолнух запускает новое событие
                            </Text>
                        </TouchableOpacity>
                        <View style={{marginTop: 15}}>
                            <Text style={styles.descNews}>
                                В своем стремлении повысить качество жизни, они забывают, что синтетическое тестирование напрямую зависит от как…
                            </Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <LinearGradient colors={['#FFF', '#21232C']} style={{borderRadius: 10}}>
                                <Image style={{opacity: 0.7}} source={require('../../assets/images/images/photoNews4.png')}/>
                            </LinearGradient>
                            <TouchableOpacity style={styles.likeBlock}>
                                <PhotoLike/>
                                <Text style={styles.likeCount}>
                                    204
                                </Text>
                            </TouchableOpacity>
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
        width: '100%',
        height: '100%',
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
        paddingBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F1F3'
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
