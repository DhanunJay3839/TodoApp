import { StyleSheet, Text, View, TextInput, Platform, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_700Bold, Inter_300Light, Inter_100Thin, Inter_600SemiBold, Inter_500Medium } from '@expo-google-fonts/inter';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';


const AddTask = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation()
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const formatCustomTime = (date) => {
  if (!date) return '';
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutes} ${ampm}`;
};


  const [time, setTime] = useState(new Date());
  const [showPickerT, setShowPickerT] = useState(false);

  const [priority, setPriority] = useState('Medium');
  const priorities = ['Low', 'Medium', 'High'];


  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const onChangeT = (event, selectedTime) => {
    setShowPickerT(false);
    if (selectedTime) setTime(selectedTime);
  };

  const formatDate = (date) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-GB'); 
  };

  const formatTime = (time) => {
    if (!time) return 'Select time';
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };


const getPriorityColor = (priority) => {
  switch (priority) {
    case 'Low':
      return '#10B981';
    case 'Medium':
      return '#F59E0B';
    case 'High':
      return '#EF4444';
    default:
      return '#6B7280'; 
  }
};

const handleCreateTask = async () => {
  const todo = {
    taskname: taskName,
    description: description,
    dueDate: date.toISOString().split('T')[0],
    duetime: time ? formatCustomTime(time) : '',
    priority,
  };

  try {
    await axios.post('https://ff1d053aea2e.ngrok-free.app/addTask', todo);
    navigation.goBack();
  } catch (err) {
    console.error('Error creating task:', err);
    alert('Failed to create task.');
  }
};


const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: '#FFFFFF', paddingTop: 10 }}>
       
      {/* Header */}
        <View style={{ height: 48, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E5E5E5', paddingBottom: 10}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ fontSize: 16, fontFamily: 'Inter_400Regular', color: '#007AFF' }}>Cancel</Text>
          </TouchableOpacity>
            <Text style={{ fontSize: 20, fontFamily: 'Inter_500Medium', color: 'black' }}>New Task</Text>
          <TouchableOpacity onPress={handleCreateTask}>
            <Text style={{ fontSize: 16, fontFamily: 'Inter_400Regular', color: '#007AFF' }}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Task Name & Description */}
        <ScrollView contentContainerStyle={{paddingTop: 60, paddingBottom: 340 }} showsVerticalScrollIndicator={false}>
          <TextInput onChangeText={setTaskName} style={{ height: 43, width: '100%', borderBottomColor: '#E5E5E5', borderBottomWidth: 1, justifyContent: 'center', fontSize: 16 }} placeholder='Task name' placeholderTextColor='#9CA3AF' />
          <TextInput onChangeText={setDescription} style={{ height: 86, width: '100%', borderBottomColor: '#E5E5E5',marginTop: 60, borderBottomWidth: 1, justifyContent: 'center', fontSize: 16 }} placeholder='Add description' placeholderTextColor='#9CA3AF' />
       

        {/* Due Date */}
        <View style={{ height: 76, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: 10 }}>
          <Text style={{ fontSize: 16, color: 'black' }}>Due Date</Text>
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <Text style={{ fontSize: 16, color: '#007AFF' }}>{formatDate(date)} {'>'}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 1, backgroundColor: '#E5E5E5', marginTop: 8 }} />
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChange}
          />
        )}

        {/* Due Time */}
        <View style={{ height: 76, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: 10,}}>
          <Text style={{ fontSize: 16, color: 'black' }}>Due Time</Text>
          <TouchableOpacity onPress={() => setShowPickerT(true)}>
            <Text style={{ fontSize: 16, color: '#007AFF' }}>{formatTime(time)} {'>'}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 1, backgroundColor: '#E5E5E5', marginTop: 8 }} />
        {showPickerT && (
          <DateTimePicker
            value={time || new Date()}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChangeT}
            is24Hour={false}
          />
        )}


<View style={{ marginTop: 50,borderBottomWidth:1, borderBottomColor: '#E5E5E5'}}>
  <Text style={{ fontSize: 16, color: 'black', marginBottom: 18 }}>Priority</Text>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingBottom:20 }}>
    {priorities.map((p) => (
      <TouchableOpacity
        key={p}
        onPress={() => setPriority(p)}
        style={{
          height:44,
          width:100,
          alignItems:'center',
          justifyContent:'center',
          borderWidth: 1,
          borderColor: priority === p ? getPriorityColor(p) : '#E5E5E5',
          borderRadius: 20,
          backgroundColor: priority === p ? getPriorityColor(p) : 'white',
        }}
      >
        <Text style={{ color: priority === p ? 'white' : 'black' }}>{p}</Text>
      </TouchableOpacity>
    ))}
  </View>


</View>
<TouchableOpacity onPress={handleCreateTask}>

  <View style={{height:48,width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'#007AFF',borderRadius:8,marginTop:120}}>
    <Text style={{fontSize:16,fontFamily:'Inter_500Medium',color:'white'}}>Create Task</Text>

  </View>
  </TouchableOpacity>
</ScrollView>

</View>
    </SafeAreaView>
  );
};

export default AddTask;

const styles = StyleSheet.create({});
