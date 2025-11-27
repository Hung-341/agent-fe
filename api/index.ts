import type { VercelRequest, VercelResponse } from '@vercel/node';
import { insertLeadSchema } from '../shared/schema';
import { z } from 'zod';

// In-memory storage for serverless (note: data will not persist between invocations)
// For production, use a database like Vercel Postgres, Supabase, or Neon
const leads = new Map();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url, method } = req;
  const path = url?.replace('/api', '') || '';

  try {
    // Health check
    if (path === '/health' && method === 'GET') {
      return res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
    }

    // Create lead
    if (path === '/leads' && method === 'POST') {
      const validatedData = insertLeadSchema.parse(req.body);
      const id = crypto.randomUUID();
      const lead = {
        ...validatedData,
        id,
        createdAt: new Date(),
      };
      leads.set(id, lead);
      return res.status(201).json(lead);
    }

    // Get all leads
    if (path === '/leads' && method === 'GET') {
      const allLeads = Array.from(leads.values()).sort(
        (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      return res.status(200).json(allLeads);
    }

    // Get single lead
    if (path?.startsWith('/leads/') && method === 'GET') {
      const id = path.replace('/leads/', '');
      const lead = leads.get(id);
      if (!lead) {
        return res.status(404).json({ error: 'Lead not found' });
      }
      return res.status(200).json(lead);
    }

    return res.status(404).json({ error: 'Not found' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: error.errors 
      });
    }
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
