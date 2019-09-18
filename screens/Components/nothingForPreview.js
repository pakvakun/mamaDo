import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import ImageHome from "../../assets/images/business/image-home";

class NothingForPrev extends Component {
    render() {
        return (
            <View style={styles.textContainer}>
                <View style={{alignItems: 'center'}}>
                    <ImageHome/>
                    <Text style={{
                        fontFamily: 'SF Pro Text',
                        fontSize: 15,
                        textAlign: 'center',
                        marginTop: 40,
                        color: '#444B69',
                        lineHeight: 24
                    }}>
                        В списке {this.props.tabName} ничего нет.{"\n"}
                    </Text>
                </View>
            </View>
        )
    }
}

export default NothingForPrev;

const styles = StyleSheet.create({
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