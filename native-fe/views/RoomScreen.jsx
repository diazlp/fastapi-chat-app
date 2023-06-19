import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';

const RoomScreen = ({ route }) => {
  const { roomId } = route.params;
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const encodedRoomId = encodeURIComponent(roomId);
    const newSocket = new WebSocket(`ws://10.0.2.2:8000/messages/${encodedRoomId}`);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [roomId]);

  useEffect(() => {
    const handleReceivedMessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      const received = JSON.parse(receivedMessage.message)
      setMessages((prevMessages) => [...prevMessages, { ...received, sender: 'Participant' }]);
    };

    if (socket) {
      socket.addEventListener('message', handleReceivedMessage);
    }

    return () => {
      if (socket) {
        socket.removeEventListener('message', handleReceivedMessage);
      }
    };
  }, [socket]);

  const handleMessageSend = () => {
    if (message.trim() !== '' && socket) {
      const newMessage = {
        text: message,
        time: getCurrentTime(),
        sender: 'Me',
      };
      socket.send(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <View className="flex-1 bg-gray-100 overflow-auto">
      <ScrollView className="flex-1">
        {messages.map((msg, index) => (
          <View
            key={index}
            className={`flex flex-row justify-${msg.sender === 'Me' ? 'end self-end' : 'start'} mt-4 mx-4`}
          >
            <View
              className={`rounded-lg px-4 py-2 text-white ${msg.sender === 'Me' ? 'bg-blue-500 self-end' : 'bg-white'
                }`}
            >
              <Text className={`text-${msg.sender === 'Me' ? 'white' : 'black'}`}>{msg.text}</Text>
              <Text className="text-xs text-gray-800 mt-1">{msg.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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