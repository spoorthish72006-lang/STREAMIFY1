import { createContext, useContext, useState, useEffect } from 'react';
import { ticketsApi } from '../lib/api';

const TicketContext = createContext();

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const data = await ticketsApi.getAllTickets();
      // Ensure data is an array and map _id to id if missing
      const mappedData = Array.isArray(data) ? data.map(t => ({...t, id: t._id || t.id})) : [];
      setTickets(mappedData);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
      setError("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const addTicket = async (ticketData) => {
    try {
      // Optimistic update could go here, but for now we'll wait for server
      const response = await ticketsApi.createTicket({
        ...ticketData,
        status: 'open',
        waitTime: 0,
        createdAt: new Date().toISOString()
      });
      const newTicket = { ...response, id: response._id || response.id };
      setTickets(prev => [newTicket, ...prev]);
      return newTicket;
    } catch (err) {
      console.error("Failed to create ticket:", err);
      // Handle error (maybe show toast)
    }
  };

  const updateTicket = (id, updates) => {
    // Optimistic local update
    setTickets(prev => prev.map(ticket => 
      ticket.id === id ? { ...ticket, ...updates } : ticket
    ));
    // In a real implementation, you'd call api.tickets.updateTicket(id, updates) here
  };

  const deleteTicket = async (id) => {
    try {
      await ticketsApi.deleteTicket(id);
      setTickets(prev => prev.filter(ticket => ticket.id !== id));
    } catch (err) {
      console.error("Failed to delete ticket:", err);
    }
  };

  const assignTicket = async (id, agent) => {
    try {
      // Handle both object (real) and string (legacy/mock) agent passing
      const agentId = agent?.id || (typeof agent === 'string' ? agent : null);
      const agentName = agent?.name || (typeof agent === 'string' ? agent : 'Unknown Agent');

      await ticketsApi.assignTicket(id, agentId); 
       // Local update
      updateTicket(id, { 
        assignedTo: agentName, // UI expects a name string usually
        status: 'in-progress' 
      });
    } catch (err) {
      console.error("Failed to assign ticket:", err);
    }
  };

  const resolveTicket = (id, satisfactionScore) => {
    // Simulating resolution update until backend supports it specifically
    const ticket = tickets.find(t => t.id === id);
    if (ticket) {
      const resolutionTime = Math.floor((Date.now() - new Date(ticket.createdAt).getTime()) / 60000);
      updateTicket(id, { 
        status: 'resolved', 
        satisfactionScore,
        resolutionTime 
      });
      // TODO: Add api.tickets.resolveTicket(id, { satisfactionScore, resolutionTime })
    }
  };

  return (
    <TicketContext.Provider value={{
      tickets,
      loading,
      error,
      addTicket,
      updateTicket,
      deleteTicket,
      assignTicket,
      resolveTicket,
      refreshTickets: fetchTickets
    }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
}
