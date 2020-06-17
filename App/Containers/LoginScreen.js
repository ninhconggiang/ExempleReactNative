import React, { Component } from 'react'
import { Image, Dimensions, ScrollView, Text, KeyboardAvoidingView, View, TouchableWithoutFeedback, StatusBar, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Icon, normalize } from 'react-native-elements'
import * as yup from 'yup';
// import Images from '../Images'
// Styles
import styles from './Styles/LoginScreenStyle'
import Container from '../Components/Container'
import Content from '../Components/Content'
import Input from '../Components/Input'
import { Formik } from 'formik';
import Col from '../Components/Col'
import Checkbox from '../Components/Checkbox'
import Row from '../Components/Row'
import Button from '../Components/Button'
import ErrorMessage from '../Components/ErrorMessage';
import { Images, Metrics } from '../Themes'
import AppStyles from '../Themes/ApplicationStyles'
import I18n from '../I18n'
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);

class LoginScreen extends Component {
    render() {
        const { navigation } = this.props
        return (
            <Container statusBarColor={'blue'}>
                <Content>
                    <Formik
                        initialValues={{ username: '', password: '', remember: false }}
                        onSubmit={values => {
                            navigation.navigate("HOME")
                            // alert(JSON.stringify(values))
                        }}
                        validationSchema={yup.object().shape({
                            username: yup.string()
                                .label('username')
                                .required('Vui lòng nhập username'),
                            password: yup.string()
                                .label('password')
                                .required('Vui lòng nhập mật khẩu')
                                .min(4, 'Mật khẩu phải có it nhất 4 ký tự'),
                            remember: yup.boolean()
                                .label('remember')
                        })}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors }) => (
                            <Col fillParent centerHorizontal>
                                <Image resizeMode='stretch' source={Images.logo} style={{ width: normalize(100), height: normalize(100), marginTop: normalize(60), marginBottom: normalize(40) }} />
                                <Col style={{ marginBottom: 6 }}>
                                    <Text style={AppStyles.text}>{I18n.t('username')}</Text>
                                    <Input
                                        placeholder={I18n.t('enterUsername')}
                                        rightComponent={<Icon name='user-circle' type='font-awesome' opacity={0.7} />}
                                        height={40}
                                        value={values.username}
                                        onChangeValue={(value) => {
                                            setFieldValue('username', value)
                                        }}
                                        containerStyle={{ width: (SCREEN_WIDTH - 100) }} />
                                    {(errors && errors.username) && <ErrorMessage message={errors.username} />}
                                </Col>

                                <Col style={{ marginBottom: 10 }}>
                                    <Text style={AppStyles.text}>{I18n.t('passWord')}</Text>
                                    <Input
                                        placeholder={I18n.t('enterPassWord')}
                                        rightComponent={<Icon name='lock' type='font-awesome' opacity={0.7} />}
                                        height={40}
                                        value={values.password}
                                        isPassword={true}
                                        onChangeValue={(value) => {
                                            setFieldValue('password', value)
                                        }}
                                        containerStyle={{ width: (SCREEN_WIDTH - 100) }} />
                                    {(errors && errors.password) && <ErrorMessage message={errors.password} />}
                                </Col>
                                <Col width={(SCREEN_WIDTH - 100)} style={{ marginBottom: 10, }}>
                                    <Checkbox

                                        value={values.remember}
                                        onChangeValue={(value) => { setFieldValue('remember', value) }} content={<Text style={AppStyles.text}>{I18n.t('rememberToLogin')}</Text>} />
                                </Col>
                                {/* <Row fillParent rightContent  style={{backgroundColor: 'red',}}>
                                    <Checkbox
                                        value={values.remember}
                                        onChangeValue={(value) => { setFieldValue('remember', value) }} content={<Text>{I18n.t('rememberToLogin')}</Text>} />
                                </Row> */}

                                <Button width={200} shadowLevel={20} shadowColor={'#c3c3c3'} onPress={() => {
                                    handleSubmit();
                                }}><Text style={{ color: '#ffffff' }}>{I18n.t('Login')}</Text></Button>

                                <Button type={'secondary'} style={{ marginTop: normalize(20) }} onPress={() => {
                                    navigation.navigate("FORGOT")
                                    //    alert('quên mật khẩu')
                                    //    console.log('navigation',navigation.navigate("FORGOT"))

                                }}>
                                    <Text style={{ color: '#273069', fontSize: normalize(11) }}>{I18n.t('forgotPassword')}</Text>
                                </Button>
                            </Col>
                        )}
                    </Formik>
                    <Image resizeMode='stretch' source={Images.bottomCornerBg} style={{ width: Metrics.screenWidth, height: Metrics.screenWidth / 5, position: 'absolute', bottom: 0, left: 0 }} />
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
