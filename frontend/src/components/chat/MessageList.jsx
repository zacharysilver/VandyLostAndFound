// File: /frontend/src/components/chat/MessageList.jsx
import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import {
  VStack,
  HStack,
  Text,
  Box,
  Avatar,
  Flex,
  useColorModeValue,
  Image,
  Divider
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';

// Memoized Message Component
const MessageItem = React.memo(({ message, isSelf, partner, borderColor, selfBgColor, otherBgColor }) => {
  const formatTime = useCallback((timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  return (
    <Flex
      justify={isSelf ? 'flex-end' : 'flex-start'}
      mb={2}
    >
      <HStack align="start" spacing={2}>
        {!isSelf && (
          <Avatar 
            name={partner?.name} 
            size="xs" 
            bg={useColorModeValue('blue.500', 'blue.200')}
            color={useColorModeValue('white', 'gray.800')}
          />
        )}
        <Box>
          <Box
            maxW="xs"
            bg={isSelf ? selfBgColor : otherBgColor}
            p={2}
            borderRadius="lg"
            borderTopLeftRadius={!isSelf ? 0 : undefined}
            borderTopRightRadius={isSelf ? 0 : undefined}
          >
            {message.item && (
              <Box mb={2} borderRadius="md" overflow="hidden" borderWidth="1px" borderColor={borderColor}>
                <Image 
                  src={message.item.image} 
                  fallbackSrc="https://via.placeholder.com/100" 
                  alt={message.item.name} 
                  h="80px" 
                  w="100%" 
                  objectFit="cover" 
                />
                <Text fontSize="xs" fontWeight="bold" p={1}>
                  {message.item.name}
                </Text>
              </Box>
            )}
            <Text fontSize="sm">{message.content}</Text>
          </Box>
          <Text fontSize="xs" color="gray.500" mt={1} textAlign={isSelf ? 'right' : 'left'}>
            {formatTime(message.createdAt)}
          </Text>
        </Box>
        {isSelf && (
          <Avatar 
            name={partner?.name} 
            size="xs" 
            bg={useColorModeValue('green.500', 'green.200')}
            color={useColorModeValue('white', 'gray.800')}
          />
        )}
      </HStack>
    </Flex>
  );
});

MessageItem.displayName = 'MessageItem';

const MessageList = React.memo(({ messages, partner }) => {
  const { user } = useAuth();
  const messagesEndRef = useRef(null);
  
  // Memoize color values
  const selfBgColor = useColorModeValue('blue.100', 'blue.700');
  const otherBgColor = useColorModeValue('gray.100', 'gray.600');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Memoize message grouping to prevent unnecessary recalculations
  const groupedMessages = useMemo(() => {
    const groups = {};
    
    messages.forEach(message => {
      const date = new Date(message.createdAt).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return Object.entries(groups)
      .map(([date, dayMessages]) => ({
        date,
        messages: dayMessages
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [messages]);

  // Optimized auto-scroll effect
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    // Use requestAnimationFrame for smoother scrolling
    const animationFrame = requestAnimationFrame(scrollToBottom);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [messages]);

  return (
    <VStack
      spacing={4}
      align="stretch"
      overflowY="auto"
      h="400px"
      p={3}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="md"
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: useColorModeValue('gray.300', 'gray.600'),
          borderRadius: '24px',
        },
      }}
    >
      {messages.length === 0 ? (
        <Flex justify="center" align="center" h="full">
          <Text color="gray.500">No messages yet</Text>
        </Flex>
      ) : (
        groupedMessages.map(group => (
          <Box key={group.date}>
            <Flex align="center" justify="center" my={2}>
              <Divider flex="1" />
              <Text fontSize="xs" color="gray.500" mx={2}>
                {group.date === new Date().toLocaleDateString() ? 'Today' : group.date}
              </Text>
              <Divider flex="1" />
            </Flex>
            
            {group.messages.map((message) => (
              <MessageItem
                key={message._id}
                message={message}
                isSelf={message.sender._id === user?._id}
                partner={partner}
                borderColor={borderColor}
                selfBgColor={selfBgColor}
                otherBgColor={otherBgColor}
              />
            ))}
          </Box>
        ))
      )}
      <div ref={messagesEndRef} />
    </VStack>
  );
});

MessageList.displayName = 'MessageList';

export default MessageList;