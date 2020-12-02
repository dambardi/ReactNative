import React, {Component} from 'react';
import { AppLoading } from 'expo';
import {  Container, Header, Title, Content, Footer, FooterTab, Button, Right, Body, Text, InputGroup, Input, Icon, Thumbnail } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

const axios = require("axios");

export default class App extends React.Component {
constructor(props) {
    super(props);
    this.handlerClick = this.handlerClick.bind(this);
    this.handlerChange = this.handlerChange.bind(this);
    this.state = {
      isReady: false,
      response: [],
      consultoApi: false,
      results: {name: 'Rick'}
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  
  handlerChange = (text) => {
    console.log(text);
    var nombre = text;
    this.setState({ value: nombre });
  }


  handlerButtom = () => {
    console.log("handleado");

    var nombre = this.state.value;

    axios.get('https://rickandmortyapi.com/api/character/?name=' + nombre )
      .then( response =>{
        console.log(response);
        this.setState({consulteApi:true, results: response.data.results[0]});
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    if(this.state.consulteApi === true){
      return (
        <Container>
        <Header>
          <Body>
            <Title>Rick And Morty API</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <InputGroup borderType="rounded" >
            <Icon name="md-search" style={{color:'#384850'}}></Icon>
            <Input  onChangeText={this.handlerChange.bind(this)} style={{color: '#00c497'}} />
          </InputGroup>
          <Button onPress={this.handlerButtom.bind(this)} full info>
            <Text>Buscar</Text>
          </Button> 
          <Card style={{flex: 0}}>
            <CardItem>
              <Body>
                <Image source={{uri: this.state.results.image}} style={{height: 500, width: 310, flex: 1}}/>
                <Text>Nombre: {this.state.results.name}</Text>
                <Text>Estado: {this.state.results.status}</Text>
                <Text>Especie: {this.state.results.species}</Text>
                <Text>Genero: {this.state.results.gender}</Text>
              </Body>
            </CardItem>
           </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Api ReactNative 2020</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
    }else{
      return(
        <Container>
        <Header>
          <Body>
            <Title>Rick and Morty API</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <InputGroup borderType="rounded" >
            <Icon name="md-search" style={{color:'#384850'}}></Icon>
            <Input  onChangeText={this.handlerChange.bind(this)} style={{color: '#00c497'}} />
          </InputGroup>
          <Button onPress={this.handlerButtom.bind(this)} full info>
            <Text>Buscar</Text>
          </Button> 
          <Card style={{flex: 0}}>
            <CardItem>
              <Body>
              
                <Text>"Get Out Of Here, Summer! ...</Text>
          
              </Body>
            </CardItem>
           </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Api ReactNative 2020</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>    
      ); 
   
  }
}
}
