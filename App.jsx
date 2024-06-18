import {  GluestackUIProvider, Heading, Image, ScrollView } from '@gluestack-ui/themed';

import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Box, Button,SafeAreaView } from '@gluestack-ui/themed';

import Video from 'react-native-video'
import { config } from '@gluestack-ui/config';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
const App = () => {
  const videoRef=React.useRef(null)
  const [imageUrl,setImageUrl]=useState('');
  const [fetchedDogs,setFetchedDogs]=useState([]);
  const [addingPrev,setAddingPrev]=useState('');
  async function fetchDogo(){
    const res=await fetch("https://random.dog/woof.json");
    const data=await res.json();
    if(data){
      if(addingPrev !== ''){
        setFetchedDogs([...fetchedDogs,addingPrev])
      }
     
      setAddingPrev(data.url);
      
      console.log(data.url);
      setImageUrl(data.url);
    }
  }
  return (
  <GluestackUIProvider config={config}>
    <SafeAreaView>
    <ScrollView>
      <Box  alignItems='center' >
        <Text></Text>
       <Heading mb={'$3'} fontSize={'$2xl'}>
       <FontAwesome
          name="paw"
          size={25}
          backgroundColor="transparent"
          
        />  Dogo</Heading> 
       <Box mb={'$3'}>
       {
         
            imageUrl.endsWith(".mp4") ? 
             ( 
              <Box mb={'$2'}>
              <Video ref={videoRef} source={{uri: imageUrl}} controls resizeMode="contain" style={{ width: 200, height: 200 }} /> 
             </Box>
          ) :
          (
            <Image style={{ width: 150, height: 150 }} source={{uri: imageUrl}} alt='dog image' resizeMode='cover'></Image>
             )
        }
       </Box>
       
       <Button bg="$primary200" borderRadius={'$2xl'} width={"$1/2"}  onPress={()=> fetchDogo()}  mb={'$3'}><Text>Click me..!!!</Text></Button>
       
       <Box flexDirection='row' flexWrap='wrap' gap={'$2'} alignItems='center' justifyContent='center'> 
        {
          fetchedDogs.map((dog,index)=> (
            dog.endsWith(".mp4") ? 
            ( 
              <Box key={index}  mb={'$2'}>
              <Video ref={videoRef} source={{uri: dog}} controls resizeMode="contain" style={{ width: 150, height: 150 }} /> 
             </Box>
          ): (
           <Image key={index} size='lg' source={{uri: dog}} alt='dog image' resizeMode='cover' style={{ width: 150, height: 150 }} ></Image>
            )
             ))
        }
       </Box>
       
      </Box>
      </ScrollView>
    </SafeAreaView>
  </GluestackUIProvider>
  )
};
export default App;
const styles = StyleSheet.create({});