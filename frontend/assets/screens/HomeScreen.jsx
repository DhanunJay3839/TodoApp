import {StyleSheet, Text, View,Image,TextInput, TouchableOpacity,FlatList,option,Alert, ActivityIndicator,ScrollView } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { BASE_URL } from '../api';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_700Bold, Inter_300Light, Inter_100Thin, Inter_600SemiBold, Inter_500Medium } from '@expo-google-fonts/inter';


const HomeScreen = () => {

    const navigation = useNavigation()
    const [taskStatuses, setTaskStatuses] = useState({});
    const isFocused = useIsFocused();
    const [activeDropdownId, setActiveDropdownId] = useState(null);
    const [tasks, setTasks] = React.useState([]);
    const [loading,setLoading] = useState(false);

    const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

 useEffect(() => {
  if (isFocused) {
    fetchTasks();
  }
}, [isFocused]);

  const Handlepress =() =>
  {
    setLoading(true);

    setTimeout(()=> {
      setLoading(false);
      navigation.navigate('AddTask');
    },1000)
  }


  const handleDeleteTask = async (taskId) => {
  try {
    await axios.delete(`${BASE_URL}/DeleteTask/${taskId}`);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  } catch (error) {
    console.error('Failed to delete task:', error);
    alert('Error deleting task. Please try again.');
  }
};


 const convertTo24Hour = (time12h) => {
  if (!time12h) return '00:00'; 

  const [time, modifier] = time12h.split(' ');
  if (!time || !modifier) return '00:00';

  let [hours, minutes] = time.split(':');

  if (hours === '12') { 
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = String(parseInt(hours, 10) + 12);
  }

  return `${hours.padStart(2, '0')}:${minutes}`;
};

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getAllTasks`);
      const sortedTasks = response.data.sort((a, b) => {
        const aDate = new Date(`${a.dueDate} ${a.duetime}`);
        const bDate = new Date(`${b.dueDate} ${b.duetime}`);
        return aDate - bDate;
      });
      setTasks(sortedTasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      alert('Unable to fetch tasks , Please make sure your Spring Boot server is running');
    }
  };


  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#FFFFFF'}}>
        <View style={{flex:1 ,paddingTop: 20,paddingHorizontal:10 }}>

            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:12}}>
                <Text style={{fontSize:24,fontWeight:'400',color:'#111827'}}>My Tasks</Text>
                <TouchableOpacity onPress={() => {navigation.navigate('Logout')}}>
               <Image source={require('../Images/starboyypf.jpeg')} style={{ height: 32, width: 32, borderRadius: 16 }}/>
               </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={Handlepress}>
            <View style={{marginTop:20}}>
            <View style={{height:50,width:'98%',backgroundColor:'#F9FAFB',borderRadius:12,justifyContent:'center',paddingHorizontal:20,borderWidth:0.3,borderColor:'grey',alignSelf:'center'}}>
              {loading ? (
                <ActivityIndicator size="large" color='grey'/>

              ) : (
                 <Text style={{fontSize:16,color:'#9CA3AF'}}>+  Add a New task...</Text>

              )}
              
              </View>
            </View>
            </TouchableOpacity>
            <View style={{paddingBottom:10,marginTop: 15}}>
            <Text style={{ fontSize: 16, fontWeight: '400', color: '#6B7280',marginLeft:10}}>Upcoming Tasks</Text>
            </View>

            <View style={{flex: 1 ,backgroundColor:'white',width:'100%'}}>
              <ScrollView contentContainerStyle={{  paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
          
          
   {tasks.map((task, index) => (
  <View
    key={task.id || index}
    style={{
      height: 255,
      width: '100%',
      borderRadius: 16,
      borderBottomWidth:1,
      borderBottomColor:'#9CA3AF',
      backgroundColor: 'white',
      paddingHorizontal: 15,
    }}
  >
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <View style={{ marginTop: 20 }}>

    <Text style={{ fontSize: 24, color: '#1A1A1A', fontWeight: '500'}}>
      {task.taskname}
    </Text>
    </View>
     <View style={{ position: 'relative', marginTop: 20  }}>
 <TouchableOpacity onPress={() => {
  setActiveDropdownId(activeDropdownId === task.id ? null : task.id);
}}>


    <View style={{
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 10,
  backgroundColor:
    (taskStatuses[task.id] || task.status || 'Pending'
) === 'Completed'
      ? '#10B981'  
      : (taskStatuses[task.id] || task.status || 'Pending'
) === 'In Progress'
      ? '#3B82F6'  
      : '#111827', 
}}>
  <Text style={{ fontSize: 16, color: '#FFFFFF' }}>
    {(taskStatuses[task.id] || task.status || 'Pending'
)} ▼
  </Text>
</View>


  </TouchableOpacity>

  {activeDropdownId === task.id && (
    <View
      style={{
        backgroundColor: '#FFF',
        marginTop: 5,
        borderRadius: 10,
        elevation: 4,
        position: 'absolute',
        top: 40,
        right: 0,
        zIndex: 999,
        width: 140,
      }}
    >
      {['Pending', 'In Progress', 'Completed'].map((option) => (
  <TouchableOpacity
    key={option}
    onPress={async () => {
      try {
        await axios.put(`${BASE_URL}/updateTaskStatus/${task.id}`, {
          status: option
        });
        setTaskStatuses(prev => ({ ...prev, [task.id]: option }));
        setActiveDropdownId(null);
      } catch (error) {
        console.error('Failed to update status:', error);
        alert('Failed to update task status');
      }
    }}
    style={{ padding: 10 }}
  >
    <Text style={{ fontSize: 16 }}>{option}</Text>
  </TouchableOpacity>
))}

    </View>
  )}
</View>

  </View>

    <Text style={{ fontSize: 14, color: '#6B7280', fontWeight: '400', marginTop: 12 }}>
      Description
    </Text>

    <Text style={{ fontSize: 16, color: '#1A1A1A', fontWeight: '400', marginTop: 5 }}>
      {task.description}
    </Text>

    <Text style={{ fontSize: 14, color: '#6B7280', fontWeight: '400', marginTop: 20 }}>
      Due date & Time
    </Text>

    <Text style={{ fontSize: 16, color: '#4A4A4A', fontWeight: '400', marginTop: 5 }}>
      {new Date(`${task.dueDate}T${convertTo24Hour(task.duetime)}`).toLocaleString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})}

    </Text>

  
     <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>

    <View style={{ flexDirection: 'row', marginTop: 20,alignItems:'center' }}>
  {/* Priority Badge */}
  <View>
    <Text style={{ fontSize: 16, color: '#1A1A1A', fontWeight: '400', marginTop: 5 }}>Priority :</Text>
  </View>
  <View
    style={{
      height: 30,
      borderWidth:1,
      borderColor:
          task.priority === 'High'
            ? '#FF4D4F'
            : task.priority === 'Medium'
            ? '#F59E0B'
            : '#10B981',
      paddingHorizontal: 15,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:5,
      marginLeft:10
    }}
  >
    <Text
      style={{
        fontSize: 14,
        fontWeight: '400',
        color:
          task.priority === 'High'
            ? '#FF4D4F'
            : task.priority === 'Medium'
            ? '#F59E0B'
            : '#10B981',
      }}
    >
      {task.priority}
    </Text>
  </View>
 </View>

  <View>

  <TouchableOpacity
  onPress={() => {
  Alert.alert(
    'Delete Task',
    'Are you sure you want to delete this task?',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => handleDeleteTask(task.id) },
    ]
  );
}}

  style={{
    marginTop: 15,
    backgroundColor: 'white',
    paddingVertical: 8,
    borderWidth:0.5,
    borderColor:'red',
    paddingHorizontal: 20,
    borderRadius: 8,
    
    alignSelf: 'flex-end'
  }}
>
  <Text style={{ color: '#EF4444', fontWeight: '500' }}>Delete</Text>
</TouchableOpacity>
</View>



</View>

  </View>
 
))}
</ScrollView>

</View>
            
</View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})