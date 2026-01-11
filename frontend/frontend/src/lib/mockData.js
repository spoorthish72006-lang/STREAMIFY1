// Generate mock tickets
export const mockTickets = [
  {
    id: 'TKT-001',
    customerId: 'CUST-4521',
    customerName: 'Sarah Johnson',
    subject: 'Unable to access online banking',
    category: 'account',
    priority: 'high',
    status: 'in-progress',
    createdAt: new Date(Date.now() - 1000 * 60 * 15),
    waitTime: 15,
    assignedTo: 'Agent 3',
    channel: 'phone',
    notes: 'Password reset attempted, escalating to IT'
  },
  {
    id: 'TKT-002',
    customerId: 'CUST-3892',
    customerName: 'Michael Chen',
    subject: 'Fraudulent transaction on credit card',
    category: 'card',
    priority: 'urgent',
    status: 'open',
    createdAt: new Date(Date.now() - 1000 * 60 * 8),
    waitTime: 8,
    channel: 'phone',
    notes: 'Customer reporting unauthorized charge of $1,250'
  },
  {
    id: 'TKT-003',
    customerId: 'CUST-7654',
    customerName: 'Emily Rodriguez',
    subject: 'Loan application status inquiry',
    category: 'loan',
    priority: 'medium',
    status: 'waiting',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    waitTime: 45,
    resolutionTime: 120,
    assignedTo: 'Agent 7',
    channel: 'email',
    notes: 'Waiting for underwriting team response'
  },
  {
    id: 'TKT-004',
    customerId: 'CUST-2341',
    customerName: 'David Park',
    subject: 'Dispute ATM withdrawal fee',
    category: 'transaction',
    priority: 'low',
    status: 'resolved',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    waitTime: 12,
    resolutionTime: 25,
    assignedTo: 'Agent 2',
    satisfactionScore: 5,
    channel: 'chat',
    notes: 'Fee reversed, customer satisfied'
  },
  {
    id: 'TKT-005',
    customerId: 'CUST-8901',
    customerName: 'Lisa Anderson',
    subject: 'Update contact information',
    category: 'account',
    priority: 'low',
    status: 'resolved',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
    waitTime: 8,
    resolutionTime: 15,
    assignedTo: 'Agent 5',
    satisfactionScore: 4,
    channel: 'in-person',
    notes: 'Address and phone number updated'
  },
  {
    id: 'TKT-006',
    customerId: 'CUST-5567',
    customerName: 'Robert Thompson',
    subject: 'Missing deposit from 3 days ago',
    category: 'transaction',
    priority: 'high',
    status: 'in-progress',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    waitTime: 30,
    assignedTo: 'Agent 1',
    channel: 'phone',
    notes: 'Investigating with operations team'
  },
  {
    id: 'TKT-007',
    customerId: 'CUST-9823',
    customerName: 'Jennifer Lee',
    subject: 'Request for credit limit increase',
    category: 'card',
    priority: 'medium',
    status: 'open',
    createdAt: new Date(Date.now() - 1000 * 60 * 22),
    waitTime: 22,
    channel: 'phone',
    notes: 'Queue position: 4'
  },
  {
    id: 'TKT-008',
    customerId: 'CUST-4432',
    customerName: 'James Wilson',
    subject: 'Overdraft protection inquiry',
    category: 'account',
    priority: 'low',
    status: 'resolved',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    waitTime: 18,
    resolutionTime: 32,
    assignedTo: 'Agent 4',
    satisfactionScore: 3,
    channel: 'email',
    notes: 'Information provided about overdraft options'
  },
  {
    id: 'TKT-009',
    customerId: 'CUST-7721',
    customerName: 'Maria Garcia',
    subject: 'Card activation issue',
    category: 'card',
    priority: 'medium',
    status: 'in-progress',
    createdAt: new Date(Date.now() - 1000 * 60 * 12),
    waitTime: 12,
    assignedTo: 'Agent 6',
    channel: 'chat',
    notes: 'Troubleshooting activation process'
  },
  {
    id: 'TKT-010',
    customerId: 'CUST-3345',
    customerName: 'Daniel Brown',
    subject: 'Statement not received',
    category: 'account',
    priority: 'low',
    status: 'closed',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    waitTime: 5,
    resolutionTime: 10,
    assignedTo: 'Agent 2',
    satisfactionScore: 5,
    channel: 'email',
    notes: 'Statement resent, paperless option discussed'
  }
];

// Last 7 days call volume data
export const callVolumeData = [
  { date: '11/17', calls: 342, avgWaitTime: 18 },
  { date: '11/18', calls: 389, avgWaitTime: 22 },
  { date: '11/19', calls: 428, avgWaitTime: 25 },
  { date: '11/20', calls: 451, avgWaitTime: 28 },
  { date: '11/21', calls: 397, avgWaitTime: 21 },
  { date: '11/22', calls: 372, avgWaitTime: 19 },
  { date: '11/23', calls: 298, avgWaitTime: 15 }
];

// Last 6 months satisfaction data
export const satisfactionData = [
  { month: 'Jun', score: 4.5 },
  { month: 'Jul', score: 4.4 },
  { month: 'Aug', score: 4.2 },
  { month: 'Sep', score: 4.0 },
  { month: 'Oct', score: 3.9 },
  { month: 'Nov', score: 3.96 }
];
