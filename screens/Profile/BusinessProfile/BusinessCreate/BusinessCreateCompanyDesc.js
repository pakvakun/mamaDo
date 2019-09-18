import React, {Component} from 'react';
import {StatusBar, StyleSheet, TextInput, TouchableOpacity, View, Text} from 'react-native';
import {Header} from 'react-native-elements';
import Modal from "react-native-modal";

//Icons
import IconBackWhite from "../../../../assets/images/icons/icons-back-white";
import IconTrash from "../../../../assets/images/icons/icon-trash";
import IconModalTrash from "../../../../assets/images/icons/icon-modal-trash";

class BusinessCreateCompanyDesc extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalDelete: false,
            companyDesc: '',
        }
    }

    toggleDelete = () => {
        this.setState({ modalDelete: !this.state.modalDelete });
    };
    confirmDeleteDesc = () => {
        this.toggleDelete()
        this.setState({companyDesc: ''})
        this.props.navigation.setParams({companyDesc: ''})        
    }
    componentDidMount(){
        let { params } = this.props.navigation.state
        if(params && params.companyDesc && params.companyDesc.length !== 0){
            this.setState({companyDesc: params.companyDesc})
        }
    }
    render() {        
        return (
            <View style={{flex: 1, backgroundColor: '#556086'}}>
                <StatusBar barStyle="light-content" />
                <Header
                    centerComponent={{ text: 'Описание компании', style: { color: '#FFF', fontFamily: 'SF Pro Text', fontSize: 17, fontWeight: '500' } }}
                    containerStyle={{
                        backgroundColor: '#556086',
                        borderBottomWidth: 0
                    }}
                    leftComponent={<TouchableOpacity onPress={()=>this.props.navigation.navigate(this.props.navigation.state.params.prevRoute , {companyDesc: this.state.companyDesc})} style={{left: 25}}><IconBackWhite/></TouchableOpacity>}
                    rightComponent={<TouchableOpacity onPress={this.toggleDelete} style={{right: 25}}><IconTrash/></TouchableOpacity>}
                />
                <View style={styles.inputBlock}>
                    <TextInput
                        multiline={true}
                        // numberOfLines={4}
                        placeholder="Добавьте описание (минимум 200 символов)"
                        style={styles.styleInput}
                        value={this.state.companyDesc}
                        onChangeText={text => this.setState({companyDesc: text})}
                    />
                </View>
                <View style={styles.buttonBlock}>
                    <TouchableOpacity style={styles.buttonOuter} onPress={()=>this.props.navigation.navigate(this.props.navigation.state.params.prevRoute, {companyDesc: this.state.companyDesc})}>
                        <Text style={styles.buttonText}>Добавить описание</Text>
                    </TouchableOpacity>
                </View>
                <Modal isVisible={this.state.modalDelete} style={styles.modal}>
                    <View style={styles.modalMinContent}>
                        <View style={styles.modalMinTitleBlock}>
                            <IconModalTrash style={{marginRight: 10}}/>
                            <Text style={styles.modalMinTitle}>Стереть описание?</Text>
                        </View>
                        <View style={styles.modalMinButtonsBlock}>
                            <TouchableOpacity onPress={this.toggleDelete} style={styles.modalMinCancel}>
                                <Text style={styles.modalMinCancelText}>ОТМЕНА</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.confirmDeleteDesc()} style={styles.modalMinConfirm}>
                                <Text style={styles.modalMinConfirmText}>СТЕРЕТЬ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

export default BusinessCreateCompanyDesc;

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
        flexDirection: 'row',
    },
    modalMinDescBlock: {
        marginTop: 20,
        marginLeft: 30,
    },
    modalMinButtonsBlock: {
        marginTop: 35,
        marginLeft: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    modalMinTitle: {
        color: '#444B69',
        fontSize: 19,
        fontFamily: 'SF Pro Text',
        fontWeight: '500',
        paddingRight: 20
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
    modalMinConfirm: {
        backgroundColor: '#42BCBC',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 10,
        width: 118,
        marginLeft: 'auto'
    },
    modalMinCancel: {
        backgroundColor: '#F0F1F3',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 10,
        width: 118
    },
    inputBlock: {
        marginTop: 10,
        backgroundColor: '#FFF',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 30,
        paddingLeft: 24,
        paddingRight: 24
    },
    styleInput: {
        fontFamily: 'SF Pro Text',
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 24,
        color: '#444B69'
    },
    buttonBlock: {
        paddingLeft: 24,
        paddingRight: 24,
        height: 85,
        backgroundColor: '#FFF'
    },
    buttonOuter: {
        backgroundColor: '#E94C89',
        borderRadius: 10,
        paddingTop: 17,
        paddingBottom: 17
    },
    buttonText: {
        color: '#FFF',
        textTransform: 'uppercase',
        fontSize: 14,
        fontFamily: 'SF Pro Text',
        fontWeight: '600',
        textAlign: 'center'
    }
});
