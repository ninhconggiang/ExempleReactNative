import { StyleSheet, Dimensions } from 'react-native'
import { normalize } from 'react-native-elements'
const { height, width } = Dimensions.get('screen')

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },

    touchStyle: {
        backgroundColor: '#ffff',
        width: normalize(width / 4.5),
        height: normalize(width / 4.5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalize(20),
        margin: normalize(10),

        //Shadown Platfrom
        //shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,

        //BOLD SHADOW
        shadowColor: "#273069",
        shadowOffset: { width: 0, height: 6, }, shadowOpacity: 0.37, shadowRadius: 7.49, elevation: 12,
    },

    textStyle: {
        color: '#273069',
        fontSize: normalize(14),
    },

    empty: {
        width: normalize(width / 4.5),
        height: normalize(width / 4.5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: normalize(10),
    },

    logoStyle: {
        marginTop: normalize(50),
        width: normalize(100),
        height: normalize(100)
    },

    fotterLogo: {
        width: '100%',
        height: normalize(100),
    }

})