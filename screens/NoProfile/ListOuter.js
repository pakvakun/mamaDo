import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator, BottomTabBar } from 'react-navigation';

import IconBackWhite from '../../assets/images/icons/icons-back-white';

//Bottom Icons
import List from '../../assets/images/bottomIcons/list';
import Map from '../../assets/images/bottomIcons/map';
import News from '../../assets/images/bottomIcons/news';
import Profile from '../../assets/images/bottomIcons/profile';

import RightArrow from '../../assets/images/icons/rightArrow';

//Screens
import NewsScreen from '../../screens/Components/News';
import ListScreen from '../../screens/Components/List';
import MapScreen from '../../screens/Components/Map';
import NewsPage from '../../screens/Components/NewsPage';
import ClientProfile from '../Profile/ClientProfile/ClientProfile';
import NoProfile from '../../screens/NoProfile/NoProfile';


//Point Colors
import Point from '../../assets/images/colorPoints/point';

const NewsNav = createStackNavigator({
    News: NewsScreen,
    NewsPage: NewsPage,
}, {
    headerMode: 'none'
});
const TabNavigator = createBottomTabNavigator({
    
    List: {
        screen: ListScreen,
        navigationOptions:{
            tabBarLabel:'Список',
            tabBarIcon: ({focused}) => (
                <List fill={focused ? "#E94C89" : "#868FB1"}/>
            ),
        }
    },
    Map: {
        screen: MapScreen,
        navigationOptions:{
            tabBarLabel:'Карта',
            tabBarIcon: ({focused}) => (
                <Map fill={focused ? "#FACD42" : "#868FB1"}/>
            ),

        }
    },
    News: {
        screen: NewsNav,
        navigationOptions:{
            tabBarLabel:'Новости',
            tabBarIcon: ({focused}) => (
                <News fill={focused ? "#42BCBC" : "#868FB1"}/>
            ),

        }
    },
    Profile: {
        screen: ClientProfile,
        navigationOptions:{
            tabBarLabel:'Профиль',
            tabBarIcon: ({focused}) => (
                <Profile />
            ),
            tabBarVisible: false

        }
    }
},{
    tabBarOptions:{
        labelStyle: {
            color: '#444B69',
            fontSize: 12,
            fontFamily: 'SF Pro Text',
            lineHeight: 14,
            fontWeight: '500',
        },
        tabStyle: {
            paddingTop: 10
        },
        style:{
            shadowColor: '#455B63',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            height: 60,
        }
    },
});

export default createAppContainer(TabNavigator);