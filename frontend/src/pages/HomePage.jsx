import {
	Container,
	SimpleGrid,
	Text,
	VStack,
	Input,
	HStack,
	Button,
  } from "@chakra-ui/react";
  import { useEffect } from "react";
  import { useItemStore } from "../store/item";
  import { CalendarIcon, SearchIcon } from "@chakra-ui/icons";
  import ItemCard from "../components/ItemCard";
  
  const HomePage = () => {
	const {
	  fetchItems,
	  searchQuery,
	  setSearchQuery,
	  startDate,
	  endDate,
	  setStartDate,
	  setEndDate,
	  filteredItems,
	} = useItemStore((state) => ({
	  fetchItems: state.fetchItems,
	  searchQuery: state.searchQuery,
	  setSearchQuery: state.setSearchQuery,
	  startDate: state.startDate,
	  endDate: state.endDate,
	  setStartDate: state.setStartDate,
	  setEndDate: state.setEndDate,
	  filteredItems: state.filteredItems,
	}));
  
	useEffect(() => {
	  fetchItems();
	}, [fetchItems]);
  
	// Helper functions to toggle input type for date fields
	const handleFocus = (e) => {
	  e.target.type = "date";
	};
  
	const handleBlur = (e) => {
	  if (!e.target.value) {
		e.target.type = "text";
	  }
	};
  
	return (
	  <Container maxW="container.xl" py={12}>
		<VStack spacing={8}>
		  <Text
			fontSize="30"
			fontWeight="bold"
			bgGradient="linear(to-r, cyan.400, blue.500)"
			bgClip="text"
			textAlign="center"
		  >
			Current Items 🚀
		  </Text>
  
		  {/* 🔍 Search Inputs */}
		  <HStack spacing={4} width="100%" justify="center">
			{/* Name Search Box */}
			<HStack borderWidth="1px" borderRadius="md" width="400px" padding="2">
			  <Input
				placeholder="Search by items e.g. Watch, Laptop"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				border="none"
				focusBorderColor="transparent"
			  />
			  <Button variant="solid" colorScheme="blue">
				<SearchIcon />
			  </Button>
			</HStack>
  
			{/* Start Date Search Box */}
			<HStack borderWidth="1px" borderRadius="md" width="400px" padding="2">
			  <Input
				// Render as text if no value to show placeholder
				type={startDate ? "date" : "text"}
				placeholder="Start Date"
				value={startDate || ""}
				onChange={(e) => setStartDate(e.target.value)}
				onFocus={handleFocus}
				onBlur={handleBlur}
				border="none"
				focusBorderColor="transparent"
			  />
			  <Button variant="solid" colorScheme="blue">
				<CalendarIcon />
			  </Button>
			</HStack>
  
			{/* End Date Search Box */}
			<HStack borderWidth="1px" borderRadius="md" width="400px" padding="2">
			  <Input
				// Render as text if no value to show placeholder
				type={endDate ? "date" : "text"}
				placeholder="End Date"
				value={endDate || ""}
				onChange={(e) => setEndDate(e.target.value)}
				onFocus={handleFocus}
				onBlur={handleBlur}
				border="none"
				focusBorderColor="transparent"
			  />
			  <Button variant="solid" colorScheme="blue">
				<CalendarIcon />
			  </Button>
			</HStack>
		  </HStack>
  
		  {/* Render Filtered Items */}
		  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
			{filteredItems().map((item) => (
			  <ItemCard key={item._id} item={item} />
			))}
		  </SimpleGrid>
  
		  {filteredItems().length === 0 && (
			<Text
			  fontSize="xl"
			  textAlign="center"
			  fontWeight="bold"
			  color="gray.500"
			>
			  No items found 😢
			</Text>
		  )}
		</VStack>
	  </Container>
	);
  };
  
  export default HomePage;
  