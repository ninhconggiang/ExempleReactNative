import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image } from 'react-native'
import Container from '../Components/Container'
import Content from '../Components/Content'
import { Formik } from 'formik'
import Header from '../Components/Header'
import I18n from '../I18n'
import { Icon, normalize } from 'react-native-elements'
import Col from '../Components/Col'
import Row from '../Components/Row'
export class ProfileScreen extends Component {
    render() {
        return (

            <Container type={'secondary'}>
                <Content>
                    <Header {...this.props} height={normalize(40)} title={I18n.t('profile')}
                        leftComponent={<Icon name='arrow-left' type='font-awesome' color='#fff'></Icon>}></Header>
                    <Formik>
                        <Col>
                            <Col center style={{ marginTop: normalize(30), backgroundColor: 'pink', }}>
                                <Image source={require('../Images/ic_resident.png')}>

                                </Image>
                                {/* <Text>
                                aaaaaaaaaa
                            </Text> */}
                            </Col>
                            <Col style={{ margin: normalize(10) }}>
                                <Row>
                                    <Text style={{flex:1}}>
                                        Name
                                    </Text>
                                    <Text style={{flex:2}}>
                                        Ho và tên
                                    </Text>
                                </Row>
                            </Col>
                        </Col>
                    </Formik>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
