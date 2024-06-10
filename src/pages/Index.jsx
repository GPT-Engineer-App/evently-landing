import { Container, VStack, Heading, Text, Button, Box, Image, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUsers, FaChartLine } from "react-icons/fa";

const Index = () => {
  return (
    <Container centerContent maxW="container.xl" p={4}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center" mt={10}>
          <Heading as="h1" size="2xl" mb={4}>
            Manage Your Events Seamlessly
          </Heading>
          <Text fontSize="xl" color="gray.600">
            The ultimate solution for organizing and managing your events efficiently.
          </Text>
        </Box>

        <Box textAlign="center">
          <Image src="/images/event-management.png" alt="Event Management" borderRadius="md" />
        </Box>

        <HStack spacing={8} justify="center">
          <Box textAlign="center">
            <FaCalendarAlt size="3em" color="#2a69ac" />
            <Heading as="h3" size="lg" mt={4}>
              Schedule
            </Heading>
            <Text mt={2} color="gray.600">
              Plan and schedule your events with ease.
            </Text>
          </Box>
          <Box textAlign="center">
            <FaUsers size="3em" color="#2a69ac" />
            <Heading as="h3" size="lg" mt={4}>
              Manage
            </Heading>
            <Text mt={2} color="gray.600">
              Keep track of attendees and manage registrations.
            </Text>
          </Box>
          <Box textAlign="center">
            <FaChartLine size="3em" color="#2a69ac" />
            <Heading as="h3" size="lg" mt={4}>
              Analyze
            </Heading>
            <Text mt={2} color="gray.600">
              Get insights and analytics on your events.
            </Text>
          </Box>
        </HStack>

        <Box textAlign="center" mt={10}>
          <Button as={Link} to="/events" colorScheme="blue" size="lg">
            View Events
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;