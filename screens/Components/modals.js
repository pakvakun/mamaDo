import React, {Component} from 'react';
import {StyleSheet, View, Image, SafeAreaView, Dimensions, ScrollView, Text, TouchableOpacity, StatusBar} from 'react-native';
import Modal from "react-native-modal";

//icons
import IconEventLike from "../../assets/images/icons/icon-event-like";

export class ComingErrModal extends Component{
    render(){
        return(
            <Modal isVisible={this.props.isModalFavoriteErr} style={styles.modal}>
                <View style={styles.modalMinContent}>
                    <View style={styles.modalMinTitleBlock}>
                        <Text>
                            <IconEventLike style={{marginRight: 14}}/>
                            <Text style={styles.modalMinTitle}>Избранное</Text>
                        </Text>
                    </View>
                    <View style={styles.modalMinDescBlock}>
                        <Text style={styles.modalMinDesc}>
                            Чтобы добавить в Избранное <Text style={{fontWeight: '500'}}>Войдите в профиль</Text>
                        </Text>
                    </View>
                    <View style={styles.modalMinButtonsBlock}>
                        <TouchableOpacity onPress={()=>this.props.toggleModalFavoriteErr()} style={styles.modalMinCancel}>
                            <Text style={styles.modalMinCancelText}>ОТМЕНА</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalMinConfirm} onPress={()=>(this.props.nav.navigate(this.props.path), this.props.toggleModalFavoriteErr())}>
                            <Text style={styles.modalMinConfirmText}>ВОЙТИ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
        )
    }
}
const styles = StyleSheet.create({
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
}
});