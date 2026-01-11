import { createContext, useContext, useState } from 'react';
import { mockTickets } from '../lib/mockData';

const TicketContext = createContext();

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState(mockTickets);

  const addTicket = (ticketData) => {
    const newTicket = {
      ...ticketData,
      id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
      createdAt: new Date(),
      waitTime: 0,
      status: 'open'
    };
    setTickets(prev => [newTicket, ...prev]);
  };

  const updateTicket = (id, updates) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === id ? { ...ticket, ...updates } : ticket
    ));
  };

  const deleteTicket = (id) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== id));
  };

  const assignTicket = (id, agent) => {
    updateTicket(id, { 
      assignedTo: agent, 
      status: 'in-progress' 
    });
  };

  const resolveTicket = (id, satisfactionScore) => {
    const ticket = tickets.find(t => t.id === id);
    if (ticket) {
      const resolutionTime = Math.floor((Date.now() - new Date(ticket.createdAt).getTime()) / 60000);
      updateTicket(id, { 
        status: 'resolved', 
        satisfactionScore,
        resolutionTime 
      });
    }
  };

  return (
    <TicketContext.Provider value={{
      tickets,
      addTicket,
      updateTicket,
      deleteTicket,
      assignTicket,
      resolveTicket
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
