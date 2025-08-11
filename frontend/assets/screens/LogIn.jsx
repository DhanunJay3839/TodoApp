import { StyleSheet, Text, View ,Image,TextInput,TouchableOpacity,KeyboardAvoidingView,Platform,ScrollView,Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../api';
import axios from 'axios';
const LogIn = () => {

  const navigation = useNavigation();

  const [email,setemail] = useState('');
  const [password,setPassword] = useState('');

  const LoginAccount = async()=> {
    try{

     const logindata = {
      email : email,
      password : password
    }

    const loginresponse = await axios.post(`${BASE_URL}/login`,logindata);
    console.log('Logged In Successfully');

    Alert.alert('Success','LoggedIn successfully',
      [
        {
          text : 'Ok',
          onPress : ()=> navigation.navigate('Home')
        }
      ]
    )


     }
    catch (error) {
        console.log('Error:', error.message);
        Alert.alert('Error', 'Please Fill All the fields');
      }
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
      <View style={{flex:1,paddingHorizontal:20,backgroundColor:'#FFFFFF'}}>
      <View style={{alignItems:'center',marginTop:60}}>
        <Image source={require('../Images/taskflow.jpg')} style={{ height: 64, width: 64}}/>
        <Text style={{color:'#333333',fontWeight:'400',fontSize:24,marginTop:10}}>TaskFlow</Text>
       
        <Text style={{fontSize:24,fontWeight:'400',color:'#111827',marginTop:30}}>Welcome Back</Text>
        <Text style={{fontSize:16,color:'#4B5563',fontSize:16,marginTop:6}}>Sign in to continue</Text>

      </View>
      <View style={{marginTop:50}}>
        <Text style={{fontSize:14,color:'#374151',fontWeight:'400'}}>Email</Text>
        <TextInput 
        value={email}
        onChangeText={text => setemail(text)}
        style={{height:50,width:'100%',backgroundColor:'#F9FAFB',borderWidth:1,borderRadius:8,marginTop:8,borderColor:'#E0E0E0',paddingLeft:10}} placeholder='Enter your email' placeholderTextColor='#9CA3AF'/>
         <Text style={{fontSize:14,color:'#374151',fontWeight:'400',marginTop:25}}>Password</Text>
        <TextInput 
        value = {password}
        onChangeText={text => setPassword(text)}
        style={{height:50,width:'100%',backgroundColor:'#F9FAFB',borderWidth:1,borderRadius:8,marginTop:8,borderColor:'#E0E0E0',paddingLeft:10}} placeholder='Enter your password' placeholderTextColor='#9CA3AF'/>
      </View>
      <TouchableOpacity onPress={LoginAccount}
      style={{height:48,width:'100%',borderRadius:8,backgroundColor:'#2196F3',justifyContent:'center',alignItems:'center',marginTop:100}}>
        <Text style={{color:'#FFFFFF',fontSize:17,fontWeight:'500'}}>Log In</Text>

      </TouchableOpacity>
      <View style={{flexDirection:'row',justifyContent:'center',marginTop:40}}>
        <Text style={{fontSize:16,color:'#4B5563',fontWeight:'400'}}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Text style={{fontSize:16,color:'#2196F3',fontWeight:'400',marginLeft:5}}>Sign Up</Text>
        </TouchableOpacity>
        
      </View>
    </View>

    </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
   
  )
}

export default LogIn

const styles = StyleSheet.create({})