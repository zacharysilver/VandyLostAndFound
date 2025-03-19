// File: /frontend/src/pages/ChatPage.jsx
import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text
} from '@chakra-ui/react';
import ChatWindow from '../components/chat/ChatWindow';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ChatPage = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <Box p={10} textAlign="center">Loading...</Box>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <Container maxW="container.lg" py={8}>
      <Heading mb={6}>Messages</Heading>
      <Text mb={4}>
        View and respond to messages about lost and found items.
      </Text>
      
      <ChatWindow />
    </Container>
  );
};

export default ChatPage;