import { StyleSheet, Text, View,TouchableOpacity,Image,Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
const Logout = () => {
  const Navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert('Logout Confirmation','Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => Navigation.navigate('LogIn')
        }
      ]
    );
  };
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#FFFFFF'}}>
    <View style={{flex:1,backgroundColor:'#FFFFFF',paddingHorizontal:20}}>
      <Image source={require('../Images/todologout.jpg')} style={{height:160,width:160,marginTop:100,marginLeft:130}}/>
      <View style={{alignItems:'center'}}>
      <Text style={{fontSize:24,fontWeight:'500',marginTop:40}}>Leaving so soon?</Text>
      <Text style={{fontSize:16,fontWeight:'400',color:'#666666',marginTop:10}}>Are you sure you want to logout?</Text>
       </View>
      <TouchableOpacity style={{marginTop:100}} onPress={handleLogout}>
        <View style={{height:52,width:'100%',backgroundColor:'#FF3B30',justifyContent:'center',alignItems:'center',borderRadius:12}}>
          <Text style={{fontSize:16,fontWeight:'400',color:'white'}}>Log Out</Text>

        </View>

      </TouchableOpacity>

      <TouchableOpacity style={{marginTop:20}} onPress={() => Navigation.navigate('Home')}>
        <View style={{height:52,width:'100%',backgroundColor:'#F5F5F5',justifyContent:'center',alignItems:'center',borderRadius:12}}>
          <Text style={{fontSize:16,fontWeight:'400',color:'black'}}>Cancel</Text>

        </View>

      </TouchableOpacity>
      <Text style={{fontSize:14,fontWeight:'400',color:'#888888',textAlign:'center',marginTop:20}}>You'll need to sign in again to access your account</Text>

     
    </View>
    </SafeAreaView>
  )
}

export default Logout

const styles = StyleSheet.create({})