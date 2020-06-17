import {normalize} from 'react-native-elements'
import I18n from '../I18n'
export default listSetting =[[
    // { empty: true },
    {
        empty: false, name: `${I18n.t("logOut")}` ,
        icon: { name: 'logout', type: 'material-community', size: normalize(32) },
        screen: 'LOGIN'
    },
    // { empty: true },
    {
        empty: false, name: `${I18n.t("changeThePassword")}`,
        icon: { name: 'key-change', type: 'material-community', size: normalize(32) },
        screen: 'CHANGEPASS'
    },
    // { empty: true }
],
[
    {
        empty: false, name: 'Điện nước',
        icon: { name: 'flash', type: 'font-awesome', size: normalize(32) },
        screen: 'ServiceEW'
    },
    
    // {
    //     empty: false, name: 'Vận hành',
    //     icon: { name: 'toolbox-outline', type: 'material-community', size: normalize(32) },
    //     screen: 'Repair'
    // },
    {
        empty: false, name: `${I18n.t("profile")}`,
        icon: { name: 'file-text-o', type: 'font-awesome', size: normalize(32) },
        screen: 'PROFILE'
    }
], 
[
    // {
    //     empty: false, name: 'Cài đặt',
    //     icon: { name: 'gear', type: 'font-awesome', size: normalize(32) },
    //     screen: 'SETTING'
    // },
    // {
       
    //     empty: false, name: 'Tiền lương',
    //     icon: { name: 'money', type: 'font-awesome', size: normalize(32) },
    //     screen: 'Salary'
    // },
    // { empty: true },
]
]