import React from 'react'
import { useState } from 'react'
import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useItemStore } from '../store/item';
const CreatePage = () => {
  const [item, setItem] = useState({
    name: '',
    description: '',
    dateFound: new Date().toISOString()
  })
  const { createItem } = useItemStore();
  const toast = useToast();
  const handleAddItem = async () => {
    const { success, message } = await createItem(item);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});
		}
		setItem({ name: "", description: "",  dateFound: new Date().toISOString()});
  }
	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Product
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Name'
							name='name'
							value={item.name}
							onChange={(e) => setItem({ ...item, name: e.target.value })}
						/>
						<Input
							placeholder='Description'
							name='description'
							value={item.description}
							onChange={(e) => setItem({ ...item, description: e.target.value })}
						/>
						<Input
							placeholder='Date Found'
							name='dateFound'
              type='date'
							value={item.dateFound}
							onChange={(e) => setItem({ ...item, dateFound: e.target.value })}
						/>

						<Button colorScheme='blue' onClick={handleAddItem} w='full'>
							Add Item
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);

}

export default CreatePage