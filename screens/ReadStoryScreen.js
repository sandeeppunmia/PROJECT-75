import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import db from '../config'
import { ScrollView } from 'react-native-gesture-handler';
import {SearchBar} from 'react-native-elements';

export default class ReadStoryScreen extends React.Component{

constructor(props){
    super(props);
    this.state={
        search:'',
        allStories:[]
    }
}

updateSearch = (search) => {
  this.setState({ search })
}

  componentDidMount(){
    this.retriveStories()
  }

  retriveStories=()=>{
    try {
      var allStories = []
      var stories = db.collection("stories")
      .get().then((querySnapshot)=> {
        querySnapshot.forEach((doc)=> {
          allStories.push(doc.data())
          console.log("These are the stories",allStories)
        })
        this.setState({
          allStories 
        })
      })
    }
    catch (error) {
      console.log(error)
    }
  }


  
 render(){
   const { search }  = this.state
        return(
          <View>
            <SearchBar 
              placeholder="Type Here...."
              onChangeText={this.updateSearch}
              value={search}
              />

            <FlatList
            data={this.state.allStories}
            renderItem={({item})=>(
              <View style={styles.itemContainer}>
                <Text>Title:{item.title}</Text>
                <Text>Author:{item.author}</Text>
                </View>
            )
            }
            keyExtractor={(item,index)=>index.toString()}
            />
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      backgroundColor:'red',
      alignItems:'center',
      justifyContent:'center',
    },
    item:{
      backgroundColor:'green',
      padding:20
    },
    title:{
      fontSize:32
    },
    itemContainer:{
      height:80,
      width:'100%',
      borderWidth:2,
      borderColor:'green',
      alignItems:'center',
      justifyContent:'center'
    }
  })