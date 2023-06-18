import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const RoomScreen = ({ route }) => {
  const { roomId } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleMessageSend = () => {
    if (message.trim() !== '') {
      const newMessage = {
        text: message,
        time: getCurrentTime(),
        sender: 'Me',
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-1">
        {messages.map((msg, index) => (
          <View
            key={index}
            className={`flex flex-row justify-${msg.sender === 'Me' ? 'end self-end' : 'start'} mt-4 mx-4`}
          >
            <View
              className={`rounded-lg px-4 py-2 ${msg.sender === 'Me' ? 'bg-blue-500 self-end' : 'bg-white'
                }`}
            >
              <Text className={`text-${msg.sender === 'Me' ? 'white' : 'black'}`}>{msg.text}</Text>
              <Text className="text-xs text-gray-500 mt-1">{msg.time}</Text>
            </View>
          </View>
        ))}
      </View>
      <View className="flex flex-row items-center px-4 py-2 bg-white">
        <TextInput
          placeholder="Type your message..."
          className="flex-1 p-2 mr-2 border border-gray-300 rounded"
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <Button title="Send" onPress={handleMessageSend} />
      </View>
    </View>
  );
};

export default RoomScreen;