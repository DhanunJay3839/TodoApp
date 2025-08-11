import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Alert} from 'react-native'
import { useState,React } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { BASE_URL } from '../api';
import axios from 'axios';

const CreateAccount = () => {
    const navigation = useNavigation();

    const [checked, setChecked] = useState(false);
    const [name,setname] = useState('');
    const[email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const CreateAccount = async () => {
  if (!checked) {
    Alert.alert('Agreement Required', 'You must agree to the Terms of Service and Privacy Policy to continue.');
    return;
  }

  try {
    const postdata = {
      username: name,
      email: email,
      password: password
    };

    const response = await axios.post(`${BASE_URL}/createAccount`, postdata);
    console.log('Account created:', response.data);

    Alert.alert('Success', 'Account Created Successfully', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('LogIn')
      }
    ]);

  } catch (error) {
    console.log('Error:', error.message);
    Alert.alert('Error', 'Please Fill All the fields');
  }
};


  return (
    <SafeAreaView style={{flex:1}}>
        <View style={{flex:1,paddingHorizontal:20}}>
            <Text style={{fontSize:24,color:'#333333',fontWeight:'400',marginTop:50}}>Create Account</Text>
            <Text style={{fontSize:16,color:'#666666',fontWeight:'400',marginTop:7}}>Start managing your tasks today </Text>

        <View style={{marginTop:70}}>
            <Text style={{fontSize:14,color:'#333333',fontWeight:'400'}}>Full Name</Text>
            <TextInput 
            value={name}
            onChangeText={text => setname(text)}
            style={{height:50,width:'100%',backgroundColor:'#F9FAFB',borderWidth:1,borderRadius:8,marginTop:8,borderColor:'#E0E0E0',paddingLeft:10}} placeholder='Enter your full name' placeholderTextColor='#9CA3AF'/>

            <Text style={{fontSize:14,color:'#333333',fontWeight:'400',marginTop:30}}>Email</Text>
            <TextInput 
            value={email}
            onChangeText={text => setEmail(text)}
            style={{height:50,width:'100%',backgroundColor:'#F9FAFB',borderWidth:1,borderRadius:8,marginTop:8,borderColor:'#E0E0E0',paddingLeft:10}} placeholder='Enter your email' placeholderTextColor='#9CA3AF'/>

            <Text style={{fontSize:14,color:'#333333',fontWeight:'400',marginTop:30}}>Password</Text>
            <TextInput 
            value = {password}
            onChangeText={text => setPassword(text)}
            style={{height:50,width:'100%',backgroundColor:'#F9FAFB',borderWidth:1,borderRadius:8,marginTop:8,borderColor:'#E0E0E0',paddingLeft:10}} placeholder='Enter your password' placeholderTextColor='#9CA3AF'/>
        </View>
        <View style={{ flexDirection: 'row', alignContent: 'center',marginTop:110 ,marginLeft:5}}>
            <TouchableOpacity
  onPress={() => setChecked(!checked)}
  style={{
    height: 24,
    width: 24,
    borderWidth: 2,
    borderColor: '#4B5563',
    borderRadius: 4,
    backgroundColor: checked ? '#2563EB' : '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  {checked && (
    <Text style={{color: 'white', fontSize: 16}}>✓</Text>
  )}
</TouchableOpacity>

      <Text style={{fontSize:14,fontWeight:'400',color:'#4B5563',marginLeft:10}}>I agree to the </Text>
      <Text style={{fontSize:14,fontWeight:'400',color:'#2563EB'}}>Terms of Service </Text>
      <Text style={{fontSize:14,fontWeight:'400',color:'#4B5563'}}>and</Text>
      
    </View>
    <Text style={{fontSize:14,fontWeight:'400',color:'#2563EB',marginLeft:38}}>Privacy Policy</Text>

    <TouchableOpacity onPress={CreateAccount} style={{height:48,width:'100%',borderRadius:8,backgroundColor:'#2196F3',justifyContent:'center',alignItems:'center',marginTop:20}}>
            <Text style={{color:'#FFFFFF',fontSize:16,fontWeight:'500'}}>Create Account</Text>
    
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
            <Text style={{ fontSize: 16, fontWeight: '400', color: '#4B5563' }}>
                Already Have an Account?
            </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
            <Text style={{ fontSize: 16, fontWeight: '400', color: '#2563EB', marginLeft: 8 }}>
               Log In
            </Text>
          </TouchableOpacity>
          </View>


        </View>

    </SafeAreaView>
  )
}

export default CreateAccount

const styles = StyleSheet.create({})