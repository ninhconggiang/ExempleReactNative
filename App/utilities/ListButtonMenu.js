import { normalize } from "react-native-elements";
import I18n from '../I18n'

export default listMenu = [
    [
    { empty: true },
    {
        empty: false, name: `${I18n.t('area')}`,
        icon: { name: 'office-building', type: 'material-community', size: normalize(32) },
        screen: 'AreaScreen'
    },
    { empty: true }
]
, [
    {
        empty: false, name: 'Điện nước',
        icon: { name: 'flash', type: 'font-awesome', size: normalize(32) },
        screen: 'ServiceEW'
    },
    {
        empty: false, name: 'Vận hành',
        icon: { name: 'toolbox-outline', type: 'material-community', size: normalize(32) },
        screen: 'Repair'
    },
    {
        empty: false, name: 'Công văn',
        icon: { name: 'account-card-details', type: 'material-community', size: normalize(32) },
        screen: 'Student'
    }
], [
    {
        empty: false, name: `${I18n.t('Setting')}`,
        icon: { name: 'gear', type: 'font-awesome', size: normalize(32) },
        screen: 'SETTING'
    },
    {
       
        empty: false, name: 'Tiền lương',
        icon: { name: 'money', type: 'font-awesome', size: normalize(32) },
        screen: 'Salary'
    },
    { empty: true },
]]