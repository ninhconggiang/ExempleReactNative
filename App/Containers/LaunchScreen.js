import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'
import Container from '../Components/Container'
import Content from '../Components/Content'
import Row from '../Components/Row'
import Col from '../Components/Col'
// import Header

export default class LaunchScreen extends Component {
  render() {
    return (
      <Container  >
        <Content>
          <Col fillParent center>
            <Text>Hello</Text>
            <Text>Hi</Text>
            <Row fillParent center ><Text>Hello 2 </Text><Text>Hi 2</Text></Row>
          </Col>
        </Content>
      </Container>
    )
  }
}
