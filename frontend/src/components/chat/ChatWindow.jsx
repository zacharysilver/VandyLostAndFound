// File: /frontend/src/components/chat/ChatWindow.jsx
import React, { 
    useState, 
    useEffect, 
    useCallback, 
    useMemo,
    useRef 
  } from 'react';
  import {
    Box,
    Flex,
    IconButton,
    VStack,
    Text,
    Heading,
    useColorModeValue,
    Divider,
    HStack,
    Avatar,
  } from '@chakra-ui/react';
  import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
  import ConversationList from './ConversationList';
  import MessageList from './MessageList';
  import { useChat } from '../../context/ChatContext';
  
  // Performance Monitoring Utility
  const usePerformanceMonitor = (componentName) => {
    const renderCount = useRef(0);
    const lastRenderTime = useRef(Date.now());
  
    useEffect(() => {
      renderCount.current += 1;
      const currentTime = Date.now();
      const timeSinceLastRender = currentTime - lastRenderTime.current;
  
      // Log if renders are happening too quickly
      if (timeSinceLastRender < 16) { // Less than one frame (60fps)
        console.warn(`Rapid re-render detected for ${componentName}`, {
          renderCount: renderCount.current,
          timeSinceLastRender: `${timeSinceLastRender}ms`
        });
      }
  
      lastRenderTime.current = currentTime;
    });
  };
  
  // Debounce utility function
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  // Optimized IsolatedMessageInput Component
  const IsolatedMessageInput = React.memo(({ onSendMessage }) => {
    const [localInput, setLocalInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Performance monitoring
    usePerformanceMonitor('IsolatedMessageInput');
  
    // Debounced send message to reduce rapid state changes
    const debouncedSendMessage = useCallback(
      debounce(async (message) => {
        if (!message.trim() || isSubmitting) return;
  
        try {
          setIsSubmitting(true);
          await onSendMessage(message);
        } catch (error) {
          console.error('Message submission error:', error);
        } finally {
          setIsSubmitting(false);
          setLocalInput('');
        }
      }, 300),
      [onSendMessage, isSubmitting]
    );
  
    // Memoized change handler to prevent unnecessary re-renders
    const handleChange = useCallback((e) => {
      const newValue = e.target.value;
      // Prevent state update if value hasn't changed
      setLocalInput(prevInput => 
        prevInput !== newValue ? newValue : prevInput
      );
    }, []);
  
    // Memoized key press handler
    const handleKeyPress = useCallback((e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        // Only submit if there's a non-empty message
        if (localInput.trim()) {
          debouncedSendMessage(localInput);
        }
      }
    }, [localInput, debouncedSendMessage]);
  
    // Memoized send handler
    const handleSend = useCallback(() => {
      if (localInput.trim()) {
        debouncedSendMessage(localInput);
      }
    }, [localInput, debouncedSendMessage]);
  
    return (
      <HStack w="full" spacing={2}>
        <Box
          as="textarea"
          value={localInput}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          borderRadius="md"
          borderColor="gray.300"
          _dark={{ borderColor: "gray.600" }}
          p={2}
          rows={2}
          resize="none"
          flex="1"
          isDisabled={isSubmitting}
        />
        <IconButton
          icon={<FaPaperPlane />}
          colorScheme="blue"
          onClick={handleSend}
          isLoading={isSubmitting}
          isDisabled={!localInput.trim() || isSubmitting}
          aria-label="Send message"
        />
      </HStack>
    );
  });
  
  IsolatedMessageInput.displayName = 'IsolatedMessageInput';
  
  const ChatWindow = ({ initialRecipient = null, initialItem = null }) => {
    const {
      conversations,
      activeConversation,
      messages,
      loading,
      setActiveConversation,
      fetchConversations,
      fetchMessages,
      sendMessage
    } = useChat();
    
    // Performance monitoring
    usePerformanceMonitor('ChatWindow');
    
    const [showConversations, setShowConversations] = useState(!initialRecipient);
    
    // Memoize color values to prevent unnecessary re-renders
    const colors = useMemo(() => ({
      bgColor: useColorModeValue('white', 'gray.800'),
      headerBgColor: useColorModeValue('gray.50', 'gray.700'),
      avatarBgColor: useColorModeValue('blue.500', 'blue.200')
    }), []);
    
    // Memoized handlers to prevent unnecessary re-renders
    const handleSendMessage = useCallback((messageText) => {
      if (!activeConversation?.partner?._id) return;
      
      return sendMessage(
        activeConversation.partner._id,
        messageText,
        initialItem ? initialItem._id : null
      );
    }, [activeConversation, sendMessage, initialItem]);
    
    const handleBackToConversations = useCallback(() => {
      setShowConversations(true);
    }, []);
    
    const handleSelectConversation = useCallback((conversation) => {
      setActiveConversation(conversation);
      setShowConversations(false);
    }, [setActiveConversation]);
  
    // Combined and optimized initialization effect
    useEffect(() => {
      let isMounted = true;
      const initializeChat = async () => {
        try {
          // Fetch conversations first
          await fetchConversations();
          
          // Set initial recipient if provided
          if (isMounted && initialRecipient) {
            setActiveConversation({
              partner: initialRecipient,
              latestMessage: null,
              unreadCount: 0
            });
            setShowConversations(false);
          }
        } catch (error) {
          console.error('Chat initialization error:', error);
        }
      };
  
      initializeChat();
  
      return () => {
        isMounted = false;
      };
    }, [initialRecipient, fetchConversations]);
    
    // Fetch messages when active conversation changes
    useEffect(() => {
      if (activeConversation?.partner?._id) {
        const controller = new AbortController();
        
        fetchMessages(activeConversation.partner._id, controller.signal);
        
        return () => controller.abort();
      }
    }, [activeConversation, fetchMessages]);
    
    return (
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        bg={colors.bgColor}
      >
        <Box p={4} bg={colors.headerBgColor}>
          <Heading size="md">Messages</Heading>
        </Box>
        <Divider />
        
        <Flex direction={{ base: 'column', md: 'row' }} h="600px">
          {showConversations ? (
            <Box w={{ base: 'full', md: '300px' }} h="full" borderRightWidth={{ md: '1px' }}>
              <ConversationList
                conversations={conversations}
                activeConversation={activeConversation}
                onSelectConversation={handleSelectConversation}
              />
            </Box>
          ) : (
            <Box p={4} h="full" flex="1">
              {activeConversation?.partner && (
                <VStack spacing={4} h="full">
                  <HStack w="full" justify="space-between">
                    <HStack>
                      <IconButton
                        icon={<FaArrowLeft />}
                        size="sm"
                        variant="ghost"
                        onClick={handleBackToConversations}
                        display={{ md: 'none' }}
                        aria-label="Back to conversations"
                      />
                      <Avatar 
                        name={activeConversation.partner.name} 
                        size="sm" 
                        bg={colors.avatarBgColor}
                      />
                      <Box>
                        <Text fontWeight="bold">{activeConversation.partner.name}</Text>
                        <Text fontSize="xs" color="gray.500">{activeConversation.partner.email}</Text>
                      </Box>
                    </HStack>
                  </HStack>
                  
                  <MessageList messages={messages} partner={activeConversation.partner} />
                  
                  <IsolatedMessageInput onSendMessage={handleSendMessage} />
                </VStack>
              )}
            </Box>
          )}
        </Flex>
      </Box>
    );
  };
  
  export default React.memo(ChatWindow);