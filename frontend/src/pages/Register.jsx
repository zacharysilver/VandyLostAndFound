import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, FormControl, FormLabel, Heading, VStack, Text, useToast } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext"; // Import Auth

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const { login } = useAuth(); // Use login function

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!email.toLowerCase().endsWith("@vanderbilt.edu")) {
            toast({
                title: "Invalid Email",
                description: "You must use a Vanderbilt University email.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                toast({
                    title: "Registration Successful",
                    description: "Welcome! Redirecting to homepage...",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

                login(data.token); // ✅ Save token & log in user
            } else {
                toast({
                    title: "Error",
                    description: data.msg || "Registration failed. Email may already be in use.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Server Error",
                description: "Failed to connect to the server. Please try again later.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box maxW="400px" mx="auto" mt="50px" p="6" boxShadow="lg" borderRadius="md">
            <Heading mb="4">Register</Heading>
            <form onSubmit={handleRegister}>
                <VStack spacing="4">
                    <FormControl isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder="Enter your Vanderbilt email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>

                    <Button colorScheme="blue" type="submit" isLoading={loading} width="full">Register</Button>

                    <Text>
                        Already have an account?{" "}
                        <Button variant="link" colorScheme="blue" onClick={() => navigate("/login")}>Login</Button>
                    </Text>
                </VStack>
            </form>
        </Box>
    );
};

export default Register;
