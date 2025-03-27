// File: frontend/src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
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
  const { token } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const bgColor = useColorModeValue("white", "gray.700");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok && data.user) {
          setUserProfile(data.user);
        } else {
          console.warn("User fetch failed:", data);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!userProfile) {
    return (
      <Box textAlign="center" mt="50px">
        <Text>No profile data available.</Text>
      </Box>
    );
  }

  return (
    <Box maxW="800px" mx="auto" mt="8" p="6" bg={bgColor} borderRadius="lg" boxShadow="lg">
      <HStack spacing="6">
        <Avatar name={userProfile.name} size="xl" />
        <Box>
          <Heading as="h2" size="lg">{userProfile.name}</Heading>
          <Text color="gray.500">{userProfile.email}</Text>
        </Box>
      </HStack>

      <Divider my="6" />

      <VStack align="start" spacing="4">
        <Heading as="h3" size="md">Created Items</Heading>
        {userProfile.createdItems?.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
            {userProfile.createdItems.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </SimpleGrid>
        ) : (
          <Text color="gray.500">No created items found.</Text>
        )}
      </VStack>

      <Divider my="6" />

      <VStack align="start" spacing="4">
        <Heading as="h3" size="md">Followed Items</Heading>
        {userProfile.followedItems?.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
            {userProfile.followedItems.map((item) => (
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
