import React, { useState } from 'react'
import { View, TextInput, Button, Text } from 'react-native'

const HomeScreen = ({ navigation }) => {
  const [createRoomName, setCreateRoomName] = useState("")
  const [joinRoomId, setJoinRoomId] = useState('');
  const [joinRoomError, setJoinRoomError] = useState('');

  const handleCreateRoom = async () => {
    setJoinRoomError('')

    const payload = {
      name: createRoomName
    }

    try {
      const response = await fetch('http://localhost:8000/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Room created successfully:', data);
      } else {
        console.error('Failed to create room:', response.status);
      }
    } catch (error) {
      console.error('Error creating room:', error);
    }

  }

  const handleJoinRoom = async () => {
    try {
      const response = await fetch(`http://localhost:8000/rooms/${joinRoomId}`);


      if (response.ok) {
        const data = await response.json();
        navigation.navigate('Room', { roomId: data.name });
        setJoinRoomId("")
        setCreateRoomName("")
      } else {
        setJoinRoomError('Room not found');
      }
    } catch (error) {
      console.error('Error joining room:', error);
      setJoinRoomError('Error joining room');
    }
  };


  return (
    <View className="pl-10 flex-1 items-start justify-start py-36 bg-white">

      <Text className="text-black text-md mb-4">Create a Room</Text>
      <View className="flex flex-row items-center w-2/3 mb-10">
        <TextInput
          placeholder='Enter new room name'
          className="w-full p-1 border border-gray-300 mr-2 leading-normal text-black"
          value={createRoomName}
          onChangeText={(text) => setCreateRoomName(text)} />
        <Button
          title="Create"
          color="blue"
          onPress={handleCreateRoom} />
      </View>

      <Text className="text-black text-md mb-4">or join room</Text>
      <View className="flex flex-row items-center w-2/3">
        <TextInput
          placeholder='Enter existing room name'
          className="w-full p-1 border border-gray-300 mr-2 text-black"
          value={joinRoomId}
          onChangeText={(text) => setJoinRoomId(text)}
        />
        <Button
          title="Join"
          color="green"
          onPress={handleJoinRoom}
        />
      </View>
      {joinRoomError ? <Text style={{ color: 'red' }}>{joinRoomError}</Text> : null}
    </View>
  )
}

export default HomeScreen