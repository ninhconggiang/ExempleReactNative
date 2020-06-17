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
export class ChangePassScreen extends Component {
    render() {
        return (
            <Container  type={'secondary'}>
            <Content >
                <Header {...this.props} title={I18n.t("forgotPassword")} height={40} 
                leftComponent={<Icon name='arrow-left' type='font-awesome' color='#fff'/>}></Header>
                <Formik initialValues={{ currentPassWord: '', newPassWord: '', confluentPassWord: '' }}
                    onSubmit={values => {
                        alert(JSON.stringify(values))
                    }}
                    validationSchema={yup.object().shape({
                        currentPassWord: yup.string()
                            .label('currentPassWord')
                            .required(I18n.t("pleaseEnterCurrentPassWord")),
                            newPassWord: yup.string()
                            .label('newPassWord')
                            .required(I18n.t("pleaseEnterNewPassWord")),                            
                            confluentPassWord: yup.string()
                            .label('confluentPassWord')
                            .required(I18n.t("pleaseEnterThePassWord"))                          
                    })}
                >
                    {({ handleSubmit, values, setFieldValue, errors }) => (
                        <Col fillParent centerHorizontal >
                            <Image resizeMode='stretch' source={Images.logo} style={{ width: normalize(100), height: normalize(100), marginTop: normalize(60), marginBottom: normalize(40) }} />
                            <Col style={{ marginBottom: 6 }}>
                                <Text style={AppStyles.text}>
                                    {I18n.t('currentPassword')}                                       
                                 </Text>
                                <Input
                                placeholder={I18n.t('pleaseEnterCurrentPassWord')}  
                                    // rightComponent={<Icon name='lock' type='font-awesome' opacity={0.7} />}
                                    height={40}
                                    isPassword={true}
                                    value={values.currentPassWord}
                                    onChangeValue={(value) => {
                                        setFieldValue('currentPassWord', value)
                                    }}
                                    containerStyle={{ width: (SCREEN_WIDTH - 100) }}
                                >
                                </Input>
                                {(errors && errors.currentPassWord) && <ErrorMessage message={errors.currentPassWord} />}
                            </Col>
                            <Col style={{ marginBottom: 6 }}>
                                <Text style={AppStyles.text}>
                                    {I18n.t('newPassWord')}
                                    
                                 </Text>
                                <Input
                                 placeholder={I18n.t('pleaseEnterNewPassWord')}  
                                    // rightComponent={<Icon name='lock' type='font-awesome' opacity={0.7} />}
                                    height={40}
                                    isPassword={true}
                                    value={values.newPassWord}
                                    onChangeValue={(value) => {
                                        setFieldValue('newPassWord', value)
                                    }}
                                    containerStyle={{ width: (SCREEN_WIDTH - 100) }}
                                >
                                </Input>
                                {(errors && errors.newPassWord) && <ErrorMessage message={errors.newPassWord} />}
                            </Col>
                            <Col style={{ marginBottom: 60 }}>
                                <Text style={AppStyles.text}>
                                    {I18n.t("enterThePassword")}                                       
                                 </Text>
                                <Input
                                 placeholder={I18n.t('pleaseEnterThePassWord')}  
                                    // rightComponent={<Icon name='lock' type='font-awesome' opacity={0.7} />}
                                    height={40}
                                    isPassword={true}
                                    value={values.confluentPassWord}
                                    onChangeValue={(value) => {
                                        setFieldValue('confluentPassWord', value)
                                    }}
                                    containerStyle={{ width: (SCREEN_WIDTH - 100) }}
                                >
                                </Input>
                                {(errors && errors.confluentPassWord) && <ErrorMessage message={errors.confluentPassWord} />}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassScreen)