import React, { Component } from 'react'
import { Image, View, Text, TouchableOpacity, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import Container from '../Components/Container'
import Content from '../Components/Content'
import { Formik } from 'formik';
import Col from '../Components/Col'
import Row from '../Components/Row'
import { Images, Metrics } from '../Themes';
import { normalize, Icon } from 'react-native-elements'
import ListButtonMenu from '../utilities/ListButtonMenu'
import Button from '../Components/Button'
import styles from './Styles/HomeScreenStyles'

export class HomeScreen extends Component {
    renderButton (){
        return ListButtonMenu.map((row, index) => {
            return <Row key={index.toString()}
                >
                {row.map((ele, index) => {
                    console.log('ele',ele)
                    if (ele.empty) return <Col key={index.toString()}
                        style={styles.empty}></Col>

                    else return <TouchableOpacity
                        key={index.toString()}
                        onPress={
                          
                            
                            () =>   ele.screen && this.props.navigation.push(ele.screen)
                        }
                        style={styles.touchStyle}>
                        <Col style={{ transform: [{ rotate: '45deg' }], justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name={ele.icon.name} type={ele.icon.type} size={ele.icon.size} color='#273069' />
                            <Text style={styles.textStyle}>{ele.name}</Text>
                        </Col>
                    </TouchableOpacity>
                })}
            </Row>
        })
    }
    render() {
        return (     
            <Container>
                <Content>
                    <Formik initialValues={{  listImages: [Images.slider1, Images.slider2, Images.slider3]}}>             
                        <Col fillParent centerHorizontal>
                            <Col style={{ flex: 1 }}>
                                <Image source={Images.logo} style={styles.logoStyle} />
                            </Col>
                            <Col style={{ flex: 3.5 }}>
                                <Col style={{ transform: [{ rotate: '-45deg' }], }}>
                                    {this.renderButton()}
                                </Col>
                            </Col>
                            <Col style={styles.fotterLogo}>
                                <Image source={Images.footer} style={styles.fotterLogo} />
                            </Col>
                        </Col>
                    </Formik>
                    <Image resizeMode='stretch' source={Images.bottomCornerBg} style={{ width: Metrics.screenWidth, height: Metrics.screenWidth/5, position: 'absolute', bottom: 0, left: 0 }}/>
                </Content>
            </Container>
        )
    }
}
const mapStateToProps = (state) => ({
})
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
