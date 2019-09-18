import React, {Component} from 'react';
import {View, Modal, TouchableOpacity, Text, Alert} from 'react-native';

class Test extends Component {
    constructor(props){
        super(props);
    }

    state = {
        modal: false
    };

    toggleModal = () => {
        this.setState({ modal: !this.state.modal });
    };

    render(){
        return (
            <View>
                <TouchableOpacity onPress={this.toggleModal}>
                    <Text style={{color: '#000'}}>Открыть окно</Text>
                </TouchableOpacity>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modal}
                    >
                    <View style={{backgroundColor: 'rgba(31,35,52,0.6)', flex: 1}}>
                        <View style={{position: 'absolute', bottom: 0, height: 220, backgroundColor: '#000', width: '100%'}}>
                            <Text style={{color: '#FFF'}}>Hello World!</Text>

                            <TouchableOpacity
                                onPress={this.toggleModal}>
                                <Text style={{color: '#FFF'}}>Закрыть modal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

export default Test;