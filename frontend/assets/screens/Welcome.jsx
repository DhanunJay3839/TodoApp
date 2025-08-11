import { StyleSheet, Text, View,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';


const Welcome = () => {

    const Navigation = useNavigation();
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#FFFFFF'}}>
        <View style={{flex:1,paddingHorizontal:20,backgroundColor:'#FFFFFF'}}>
            <View style={{alignItems:'center',marginTop:40}}>
                <Image source={require('../Images/welcome.png')} style={{height:220,width:220}}/>

                 <Text style={{fontSize:28,fontWeight:'400',color:'#1A1A1A',marginTop:30,letterSpacing:0.8}}>Welcome to TaskFlow</Text>
                 <Text style={{color:'#666666',fontSize:16,fontWeight:'400',marginTop:13,letterSpacing:0.8}}>Your personal productivity journey starts here</Text>
                 <View style={{height:88,width:'100%',borderRadius:12,backgroundColor:'#F9FAFB',alignItems:'center',flexDirection:'row',gap:20,marginTop:40}}>
                    <View>
                        <Image source={require('../Images/create.png')} style={{height:48,width:48,marginLeft:20}}/>

                    </View>
                    <View style={{gap:6}}>
        
                        <Text style={{fontSize:16,color:'#1A1A1A',fontWeight:'400'}}>Create Tasks</Text>
                         <Text style={{fontSize:14,color:'#666666',fontWeight:'400'}}>Start by adding your first task</Text>
                    </View>
                    


                 </View>

                 <View style={{height:88,width:'100%',borderRadius:12,backgroundColor:'#F9FAFB',alignItems:'center',flexDirection:'row',gap:20,marginTop:15}}>
                    <View>
                        <Image source={require('../Images/due.png')} style={{height:48,width:48,marginLeft:20}}/>

                    </View>
                    <View style={{gap:6}}>
        
                        <Text style={{fontSize:16,color:'#1A1A1A',fontWeight:'400'}}>Set Due Dates</Text>
                         <Text style={{fontSize:14,color:'#666666',fontWeight:'400'}}>Never miss a deadline</Text>
                    </View>
                    


                 </View>

                 <View style={{height:88,width:'100%',borderRadius:12,backgroundColor:'#F9FAFB',alignItems:'center',flexDirection:'row',gap:20,marginTop:15}}>
                    <View>
                        <Image source={require('../Images/progress.png')} style={{height:48,width:48,marginLeft:20}}/>

                    </View>
                    <View style={{gap:6}}>
        
                        <Text style={{fontSize:16,color:'#1A1A1A',fontWeight:'400'}}>Track Progress</Text>
                         <Text style={{fontSize:14,color:'#666666',fontWeight:'400'}}>Monitor your productivity</Text>
                    </View>
                    


                 </View>

                 <TouchableOpacity onPress={()=>Navigation.navigate('Create')} style={{width:'100%'}}>
                    <View style={{height:56,width:'95%',backgroundColor:'#2563EB',borderRadius:12,alignSelf:'center',justifyContent:'center',alignItems:'center',marginTop:60}}>
                        <Text style={{color:'#FFFFFF',fontWeight:'400',fontSize:16}}>Get Started</Text>

                    </View>

                 </TouchableOpacity>
            </View>
     
      </View>

    </SafeAreaView>
    
  )
}

export default Welcome

const styles = StyleSheet.create({})