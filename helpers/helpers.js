import React, {Component} from 'react';
import { View } from 'react-native-animatable';
import axios from 'axios';

// правильное склонение возраста
export class DeclinationYearsString extends Component {
    declinationYears = str => {
        if (!!str) {
            if(str.match(/\d/g) == 1 && str.match(/\d/g).length == 1 && str.search(/c/) === -1){
                return `${str} год`;
            }else if(((str == 2 || str == 3 || str == 4) && str.match(/\d/g).length == 1) || str.match(/\d/g) == 1 && str.match(/\d/g).length === 1 && str.search(/c/) !== -1){
                return `${str} года`;
            }else{
                return `${str} лет`;
            }
        }else {
            return 'без ограничений'
        }
        
    }
    render(){
        return(
            this.declinationYears(this.props.str)
        )
    }
}
//Правильное склонение отзывов
export class DeclinationFeedackString extends Component{
    declinationFeedbackString = count => {
        if(count){
            const countArray = count.toString().split('');
            const LastItem = countArray[countArray.length - 1];
            if(LastItem === 1){
                return `${count} отзыв`
            }else if(LastItem >= 2 && LastItem <=4){
                return `${count} отзыва`
            }else{
                return `${count} отзывов`
            }
        } else {
            return 'нет отзывов'
        }
    }
    render(){
        return(
            this.declinationFeedbackString(this.props.count)
        )
    }
}
//Loading
export class Loading extends Component{
    render(){
        return(
            <>
            {
                this.props.isLoading?(
                    <View style={{position: 'absolute', flex: 1, backgroundColor: 'rgba(255,255,255,.8)', height: '100%', width: '100%', overflow: 'hidden',}} />
                ):null
            }
            </>
            
        )
    }
}
export function replacerSpecialCharacters(value) {
    let pureVal = value.replace(/[\!\#\$\%\^\&\*\+\=\,\:\;\|\[\{\}\]\`\~\§\±]/gi, '');    
    return pureVal
}
export function onlyNumbers(value){
    let pureVal = replacerSpecialCharacters(value);
    let temp =  pureVal.replace(/[^/\d]/gi,(val)=>{
        if (val === '/') {
            return '/'
        } else {
            return ''
        }
        
    })
        
    return temp
}

export function filterAge(minAge, maxAge, arr, subItem){
    var temp = arr.filter(item =>{

        let ageArr = item[subItem].match(/\d/gi);
        if(ageArr.length = 1){
            return Number(ageArr[0]) >= minAge && Number(ageArr[0]) <= maxAge;
        }else{
            let max = Math.max.apply(null, ageArr);
            let min = Math.min.apply(null, ageArr);
            return Number(min) >= minAge && Number(max) <= maxAge;
        }
    })
    return temp
}

// export function getDataByClientId(id){
// }
