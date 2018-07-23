import React, {PureComponent} from 'react'
import {
    StyleSheet,
    View,
    Image,
    TouchableHighlight
}
    from 'react-native'
export default class CheckBox extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: this.props.isChecked || false
        };
    }
 
    getChecked() {
        return this.state.isChecked;
    }
 
    setChecked(isChecked) {
        this.setState({
            isChecked: isChecked
        });
    }
 
    checkClick() {
        this.setState({
            isChecked: !this.state.isChecked
        });
    }
 
    render() {
        return (
            <TouchableHighlight underlayColor={'transparent'} onPress={() => this.checkClick()}>
                <Image source={this.state.isChecked?checkedImage:checkImage} style={styles.checkImage}/>
            </TouchableHighlight>
        );
    }
}
const styles = StyleSheet.create({
    checkImage: {
        marginLeft: 5,
        height: 15,
        width: 15
    }
});
