// File: frontend/src/pages/Profile.jsx
import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  Divider,
  Spinner,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import ItemCard from "../components/ItemCard";

import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, loading } = useAuth();
  const bgColor = useColorModeValue("white", "gray.700"); // Use white in light mode, dark gray in dark mode

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box textAlign="center" mt="50px">
        <Text>No profile data available.</Text>
      </Box>
    );
  }

  return (
    <Box
      maxW="800px"
      mx="auto"
      mt="8"
      p="6"
      bg={bgColor}  // use dynamic background
      borderRadius="lg"
      boxShadow="lg"
    >
      <HStack spacing="6">
        <Avatar name={user.name} size="xl" />
        <Box>
          <Heading as="h2" size="lg">
            {user.name}
          </Heading>
          <Text color="gray.500">{user.email}</Text>
        </Box>
      </HStack>
      <Divider my="6" />

      <VStack align="start" spacing="4">
        <Heading as="h3" size="md">
          Created Items
        </Heading>
        {user.createdItems && user.createdItems.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
            {user.createdItems.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </SimpleGrid>
        ) : (
          <Text color="gray.500">No created items found.</Text>
        )}
      </VStack>

      <Divider my="6" />

      <VStack align="start" spacing="4">
        <Heading as="h3" size="md">
          Followed Items
        </Heading>
        {user.followedItems && user.followedItems.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
              {user.followedItems.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </SimpleGrid>
        ) : (
          <Text color="gray.500">No followed items found.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default Profile;
