import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
    item: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderColor: '#ececec',
        borderWidth: 0.5,
        borderRadius: 16,
        marginRight: 8
    },
    selectedItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderColor: '#ececec',
        borderWidth: 0.5,
        borderRadius: 16,
        marginRight: 8,
        backgroundColor: '#474747'
    },
    txt: {
        color: '#000000'
    },
    selectedTxt: {
        color: '#ffffff'
    }
});