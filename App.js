import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, SafeAreaView, RefreshControl } from 'react-native';
import React, {Component, useState} from 'react';
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default class App extends Component{

  constructor() { 
    
    super()
    // Set the default state 
    this.state = {
    images: []
    }
    // Get some images 
    this.imageSearch()
    }

    
  

  imageSearch = () => {
    
    // 1. Build URL endpoint
    const urlEndpoint = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s'
    // 2. Request data 
    axios.get(urlEndpoint)
    .then((response) => { 
      //console.log(response) 
      this.setState({
      images: response.data.photos.photo
      });
    })
    
  }
  
  

  
  /*
  constructor(props){
    super(props);
    this.state = {
      pictures: []
    }
    this.search()
  }

  search(){
    const urlpoint = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=21&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s';
    axios.get(urlpoint)
    .then((response) =>
      this.setState({
        pictures: response.data.photos.photo
      })
    )
  }

  render(){
  return (
    <SafeAreaView style={styles.container}>
      <View>
    <FlatList data={this.state.pictures} 
    renderItem={({item})=>{ return(
      <View>
        <Image source={{uri: item.url_s}} />
      </View>
    )}
  } />
  </View>
    </SafeAreaView>
  );
}*/
render(){
  const refreshing = false;
  return(
    
    <SafeAreaView style={styles.container}>
    <Text>{'\n\n\n'}</Text>
    <View style={styles.container}>
    <FlatList style={styles.flatListStyle} 
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={this.imageSearch()}
      />
    }
    data={this.state.images} 
    numColumns={2}
    renderItem={({item})=>{ return (
    <View>
    <Image style={styles.image} source={{uri: item.url_s}} />
    </View>
    )}} 
    />
</View>
</SafeAreaView>
  )
}
}

const styles = StyleSheet.create({ container: {
  flex: 1,
  backgroundColor: '#F3F3F3',
  },
  image: {
  width: (Dimensions.get('window').width / 2) - 20,
  height: 150,
  margin: 10,
  },
  flatListStyle: { flex: 1,
  }
  });
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
