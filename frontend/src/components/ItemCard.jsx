import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
const ItemCard = ({ item }) => {
return (		<Box
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition='all 0.3s'
    _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
>

    <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
            {item.name}
        </Heading>

        <Text fontWeight='bold' fontSize='xl' color={'white'} mb={4}>
            {item.description}
        </Text>

        <Text fontWeight='bold' fontSize='xl' color={'white'} mb={4}>
            Found on {item.dateFound.substring(0, 10)}
        </Text>
    </Box></Box>)};
export default ItemCard;