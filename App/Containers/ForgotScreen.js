import React, { Component } from 'react'
import { Image, Text, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Container from '../Components/Container'
import Content from '../Components/Content'
import { Formik } from 'formik';
import Col from '../Components/Col';
import { Images, Metrics } from '../Themes';
import { Icon, normalize } from 'react-native-elements'
import AppStyles from '../Themes/ApplicationStyles'
import Input from '../Components/Input'
import ErrorMessage from '../Components/ErrorMessage';
import Button from '../Components/Button'
import * as yup from 'yup';
import Header from '../Components/Header'
import I18n from '../I18n'
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
export class ForgotScreen extends Component {
    render() {
        return (
            <Container  type={'secondary'}>
                <Content >
                    <Header title={I18n.t("forgotPassword")} height={40} {...this.props}
                    leftComponent={<Icon name='arrow-left' type='font-awesome' color='#fff'/>} ></Header>
                    <Formik initialValues={{ username: '', emailAddress: '', phoneNumber: '' }}
                        onSubmit={values => {
                            alert(JSON.stringify(values))
                        }}
                        validationSchema={yup.object().shape({
                            username: yup.string()
                                .label('username')
                                .required(I18n.t("pleaseEnterUsername")),
                            phoneNumber: yup.number()
                                .label('phoneNumber')
                                .required(I18n.t("pleaseEnterPhoneNumber")),                            
                            emailAddress: yup.string()
                                .label('emailAddress')
                                .required(I18n.t("pleaseEnterAddress"))
                                .email('Sai email')
                        })}
                    >
                        {({ handleSubmit, values, setFieldValue, errors }) => (
                            <Col fillParent centerHorizontal >
                                <Image resizeMode='stretch' source={Images.logo} style={{ width: normalize(100), height: normalize(100), marginTop: normalize(60), marginBottom: normalize(40) }} />
                                <Col style={{ marginBottom: 6 }}>
                                    <Text style={AppStyles.text}>
                                        {I18n.t('username')}                                       
                                     </Text>
                                    <Input
                                    placeholder='Nhập tên đăng nhập...'
                                        rightComponent={<Icon name='lock' type='font-awesome' opacity={0.7} />}
                                        height={40}
                                        value={values.username}
                                        onChangeValue={(value) => {
                                            setFieldValue('username', value)
                                        }}
                                        containerStyle={{ width: (SCREEN_WIDTH - 100) }}
                                    >
                                    </Input>
                                    {(errors && errors.username) && <ErrorMessage message={errors.username} />}
                                </Col>
                                <Col style={{ marginBottom: 6 }}>
                                    <Text style={AppStyles.text}>
                                        {I18n.t('phoneNumber')}
                                        
                                     </Text>
                                    <Input
                                     placeholder='Nhập số điện thoại...'
                                        rightComponent={<Icon name='phone' type='font-awesome' opacity={0.7} />}
                                        height={40}
                                        value={values.phoneNumber}
                                        onChangeValue={(value) => {
                                            setFieldValue('phoneNumber', value)
                                        }}
                                        containerStyle={{ width: (SCREEN_WIDTH - 100) }}
                                    >
                                    </Input>
                                    {(errors && errors.phoneNumber) && <ErrorMessage message={errors.phoneNumber} />}
                                </Col>
                                <Col style={{ marginBottom: 60 }}>
                                    <Text style={AppStyles.text}>
                                        {I18n.t("emailAddress")}                                       
                                     </Text>
                                    <Input
                                     placeholder='Nhập địa chỉ email...'
                                        rightComponent={<Icon name='envelope' type='font-awesome' opacity={0.7} />}
                                        height={40}
                                        value={values.emailAddress}
                                        onChangeValue={(value) => {
                                            setFieldValue('emailAddress', value)
                                        }}
                                        containerStyle={{ width: (SCREEN_WIDTH - 100) }}
                                    >
                                    </Input>
                                    {(errors && errors.emailAddress) && <ErrorMessage message={errors.emailAddress} />}
                                </Col>
                                <Button width={200} shadowLevel={20} shadowColor={'#c3c3c3'} onPress={() => {
                                    handleSubmit();
                                }}><Text style={{ color: '#ffffff' }}>{I18n.t("confirm")}</Text></Button>
                            </Col>
                        )}
                    </Formik>
                    <Image resizeMode='stretch' source={Images.bottomCornerBg} style={{ width: Metrics.screenWidth, height: Metrics.screenWidth / 5, position: 'absolute', bottom: 0, left: 0 }} />
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotScreen)
