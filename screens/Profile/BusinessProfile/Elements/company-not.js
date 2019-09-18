import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import ImageHome from "../../../../assets/images/business/image-home";
import IconAddReview from "../../../../assets/images/icons/icon-add-review";

class CompanyNot extends Component {
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
                        В списке компаний ничего нет.{"\n"}
                        Вы можете создать компанию,{"\n"}
                        нажав на «+»
                    </Text>
                </View>
            </View>
        )
    }
}

export default CompanyNot;

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