// Types
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  source: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  source: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  token: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'stopped';
  template: string;
  subject: string;
  content: string;
  emailsSent: number;
  recipients: number;
  openRate: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  content: string;
}

export interface DashboardStats {
  totalLeads: number;
  newLeadsToday: number;
  conversionRate: number;
  averageResponseTime: number;
}

export interface EngagementDataPoint {
  date: string;
  leads: number;
  responses: number;
  conversions: number;
}

export interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
  secret: string;
}

// Mock data
let currentUser: User | null = null;
let mockContacts: Contact[] = [];
let mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    status: 'New Lead',
    source: 'Website',
    createdAt: '2024-02-20T10:00:00Z'
  }
];

let mockWebhooks: Webhook[] = [];

let mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Welcome Series',
    description: 'Automated welcome emails for new leads',
    status: 'active',
    template: 'simple',
    subject: 'Welcome to Our School!',
    content: 'Welcome content here...',
    emailsSent: 156,
    recipients: 180,
    openRate: 68,
    createdAt: '2024-02-20T10:00:00Z',
    updatedAt: '2024-02-20T10:00:00Z'
  }
];

const emailTemplates: EmailTemplate[] = [
  {
    id: 'simple',
    name: 'Simple',
    description: 'Clean, straightforward design for direct communication',
    thumbnail: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=200&h=150&fit=crop',
    content: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h1 style="color: #333; margin-bottom: 20px;">{title}</h1>
        <div style="color: #666; line-height: 1.6;">
          {content}
        </div>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
          <p>You received this email because you're subscribed to {school_name} updates.</p>
          <p><a href="{unsubscribe_link}" style="color: #999;">Unsubscribe</a></p>
        </div>
      </div>
    `
  },
  {
    id: 'announcement',
    name: 'Announcement',
    description: 'Bold, attention-grabbing design for important news',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=150&fit=crop',
    content: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="color: #1a73e8; margin-bottom: 20px; font-size: 28px;">{title}</h1>
          <div style="color: #333; line-height: 1.6; font-size: 16px; text-align: left;">
            {content}
          </div>
        </div>
        <div style="margin-top: 30px; text-align: center;">
          <a href="{cta_link}" style="display: inline-block; padding: 12px 24px; background-color: #1a73e8; color: white; text-decoration: none; border-radius: 5px;">
            {cta_text}
          </a>
        </div>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px; text-align: center;">
          <p>You received this email because you're subscribed to {school_name} updates.</p>
          <p><a href="{unsubscribe_link}" style="color: #999;">Unsubscribe</a></p>
        </div>
      </div>
    `
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    description: 'Multi-section layout for comprehensive updates',
    thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=200&h=150&fit=crop',
    content: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #333; margin-bottom: 10px;">{title}</h1>
          <p style="color: #666;">{subtitle}</p>
        </div>
        
        <div style="margin-bottom: 40px;">
          <h2 style="color: #1a73e8; margin-bottom: 15px;">Featured Story</h2>
          <img src="{feature_image}" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 15px;">
          <h3 style="color: #333;">{feature_title}</h3>
          <p style="color: #666; line-height: 1.6;">{feature_content}</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px;">
          <div>
            <h3 style="color: #333;">{section1_title}</h3>
            <p style="color: #666; line-height: 1.6;">{section1_content}</p>
          </div>
          <div>
            <h3 style="color: #333;">{section2_title}</h3>
            <p style="color: #666; line-height: 1.6;">{section2_content}</p>
          </div>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h3 style="color: #333; margin-bottom: 10px;">Upcoming Events</h3>
          <ul style="color: #666; line-height: 1.6; padding-left: 20px;">
            {events_list}
          </ul>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px; text-align: center;">
          <p>You received this email because you're subscribed to {school_name} updates.</p>
          <p><a href="{unsubscribe_link}" style="color: #999;">Unsubscribe</a></p>
        </div>
      </div>
    `
  }
];

// Auth functions
export async function login(email: string, password: string): Promise<User> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock validation
  if (email === 'demo@example.com' && password === 'password123') {
    const user: User = {
      id: '1',
      email,
      name: 'Demo User',
      role: 'admin',
      token: 'mock-jwt-token'
    };
    currentUser = user;
    return user;
  }

  throw new Error('Invalid email or password');
}

export async function logout() {
  currentUser = null;
  return { success: true };
}

export async function getCurrentUser() {
  return currentUser;
}

// Contact management
export async function fetchContacts() {
  return mockContacts;
}

export async function createContact(contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) {
  const now = new Date().toISOString();
  const newContact: Contact = {
    ...contact,
    id: Date.now().toString(),
    createdAt: now,
    updatedAt: now
  };
  mockContacts.push(newContact);
  return newContact;
}

export async function updateContact(id: string, data: Partial<Contact>) {
  const index = mockContacts.findIndex(c => c.id === id);
  if (index === -1) throw new Error('Contact not found');

  mockContacts[index] = {
    ...mockContacts[index],
    ...data,
    updatedAt: new Date().toISOString()
  };

  return mockContacts[index];
}

export async function deleteContact(id: string) {
  mockContacts = mockContacts.filter(c => c.id !== id);
  return { success: true };
}

export async function importContacts(contacts: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>[]) {
  const now = new Date().toISOString();
  const newContacts = contacts.map(contact => ({
    ...contact,
    id: Date.now().toString(),
    createdAt: now,
    updatedAt: now
  }));
  mockContacts = [...mockContacts, ...newContacts];
  return newContacts;
}

// Webhook management
export async function fetchWebhooks() {
  return mockWebhooks;
}

export async function createWebhook(data: Omit<Webhook, 'id' | 'createdAt' | 'updatedAt' | 'secret'>) {
  const now = new Date().toISOString();
  const newWebhook: Webhook = {
    ...data,
    id: Date.now().toString(),
    secret: Math.random().toString(36).substring(2, 15),
    createdAt: now,
    updatedAt: now
  };
  mockWebhooks.push(newWebhook);
  return newWebhook;
}

export async function updateWebhook(id: string, data: Partial<Webhook>) {
  const index = mockWebhooks.findIndex(w => w.id === id);
  if (index === -1) throw new Error('Webhook not found');

  mockWebhooks[index] = {
    ...mockWebhooks[index],
    ...data,
    updatedAt: new Date().toISOString()
  };

  return mockWebhooks[index];
}

export async function deleteWebhook(id: string) {
  mockWebhooks = mockWebhooks.filter(w => w.id !== id);
  return { success: true };
}

// Lead management
export async function fetchLeads() {
  return mockLeads;
}

export async function addLead(lead: Omit<Lead, 'id' | 'createdAt'>) {
  const newLead: Lead = {
    ...lead,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  mockLeads.push(newLead);
  return newLead;
}

export async function importLeads(leads: Omit<Lead, 'id' | 'createdAt'>[]) {
  const newLeads = leads.map(lead => ({
    ...lead,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  }));
  mockLeads = [...mockLeads, ...newLeads];
  return newLeads;
}

// Campaign management
export async function fetchCampaigns() {
  return mockCampaigns;
}

export async function fetchEmailTemplates() {
  return emailTemplates;
}

export async function createCampaign(data: Partial<Campaign>) {
  const newCampaign: Campaign = {
    id: Date.now().toString(),
    name: data.name || '',
    description: data.description || '',
    status: 'draft',
    template: data.template || 'simple',
    subject: data.subject || '',
    content: data.content || '',
    emailsSent: 0,
    recipients: 0,
    openRate: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...data
  };

  mockCampaigns.push(newCampaign);
  return newCampaign;
}

export async function updateCampaign(id: string, data: Partial<Campaign>) {
  const index = mockCampaigns.findIndex(c => c.id === id);
  if (index === -1) throw new Error('Campaign not found');

  mockCampaigns[index] = {
    ...mockCampaigns[index],
    ...data,
    updatedAt: new Date().toISOString()
  };

  return mockCampaigns[index];
}

export async function deleteCampaign(id: string) {
  mockCampaigns = mockCampaigns.filter(c => c.id !== id);
  return { success: true };
}

export async function duplicateCampaign(id: string) {
  const campaign = mockCampaigns.find(c => c.id === id);
  if (!campaign) throw new Error('Campaign not found');

  const newCampaign: Campaign = {
    ...campaign,
    id: Date.now().toString(),
    name: `${campaign.name} (Copy)`,
    status: 'draft',
    emailsSent: 0,
    recipients: 0,
    openRate: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  mockCampaigns.push(newCampaign);
  return newCampaign;
}

// Dashboard and analytics
export async function fetchDashboardStats(): Promise<DashboardStats> {
  return {
    totalLeads: mockLeads.length,
    newLeadsToday: 5,
    conversionRate: 68,
    averageResponseTime: 2.4
  };
}

export async function fetchEngagementData(): Promise<EngagementDataPoint[]> {
  const today = new Date();
  const data: EngagementDataPoint[] = [];

  for (let i = 13; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      leads: Math.floor(Math.random() * 50) + 10,
      responses: Math.floor(Math.random() * 30) + 5,
      conversions: Math.floor(Math.random() * 15) + 2
    });
  }

  return data;
}