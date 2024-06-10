import React, { useState } from 'react';
import { Container, VStack, Heading, Button, Box, FormControl, FormLabel, Input, HStack, useToast } from "@chakra-ui/react";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from '../integrations/supabase/index.js';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Events = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const toast = useToast();

  const [newEvent, setNewEvent] = useState({ name: '', date: '' });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = async () => {
    try {
      await addEvent.mutateAsync(newEvent);
      toast({ title: "Event added.", status: "success", duration: 2000, isClosable: true });
      setNewEvent({ name: '', date: '' });
    } catch (error) {
      toast({ title: "Error adding event.", status: "error", duration: 2000, isClosable: true });
    }
  };

  const handleUpdateEvent = async (event) => {
    try {
      await updateEvent.mutateAsync(event);
      toast({ title: "Event updated.", status: "success", duration: 2000, isClosable: true });
      setEditingEvent(null);
    } catch (error) {
      toast({ title: "Error updating event.", status: "error", duration: 2000, isClosable: true });
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent.mutateAsync(id);
      toast({ title: "Event deleted.", status: "success", duration: 2000, isClosable: true });
    } catch (error) {
      toast({ title: "Error deleting event.", status: "error", duration: 2000, isClosable: true });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading events.</div>;

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">Events</Heading>
        
        <Box p={4} borderWidth={1} borderRadius="md">
          <Heading as="h2" size="md" mb={4}>Add New Event</Heading>
          <FormControl id="name" mb={4}>
            <FormLabel>Event Name</FormLabel>
            <Input type="text" name="name" value={newEvent.name} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="date" mb={4}>
            <FormLabel>Event Date</FormLabel>
            <Input type="date" name="date" value={newEvent.date} onChange={handleInputChange} />
          </FormControl>
          <Button colorScheme="blue" onClick={handleAddEvent}>Add Event</Button>
        </Box>

        {events.map(event => (
          <Box key={event.id} p={4} borderWidth={1} borderRadius="md">
            {editingEvent === event.id ? (
              <>
                <FormControl id="name" mb={4}>
                  <FormLabel>Event Name</FormLabel>
                  <Input type="text" name="name" value={event.name} onChange={(e) => setEditingEvent({ ...event, name: e.target.value })} />
                </FormControl>
                <FormControl id="date" mb={4}>
                  <FormLabel>Event Date</FormLabel>
                  <Input type="date" name="date" value={event.date} onChange={(e) => setEditingEvent({ ...event, date: e.target.value })} />
                </FormControl>
                <Button colorScheme="blue" onClick={() => handleUpdateEvent(editingEvent)}>Update Event</Button>
                <Button variant="ghost" onClick={() => setEditingEvent(null)}>Cancel</Button>
              </>
            ) : (
              <>
                <Heading as="h3" size="md">{event.name}</Heading>
                <Text>{event.date}</Text>
                <HStack spacing={2} mt={2}>
                  <Button size="sm" leftIcon={<FaEdit />} onClick={() => setEditingEvent(event.id)}>Edit</Button>
                  <Button size="sm" leftIcon={<FaTrash />} colorScheme="red" onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                </HStack>
              </>
            )}
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Events;