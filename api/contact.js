import supabase from './db-client.js';

const clean = (value, maxLength) => String(value || '').trim().slice(0, maxLength);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'POST') {
      const name = clean(req.body?.name, 120);
      const email = clean(req.body?.email, 180);
      const subject = clean(req.body?.subject, 200);
      const message = clean(req.body?.message, 5000);
      const delivery_status = clean(req.body?.delivery_status, 30) || 'pending';

      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Name, email, subject, and message are required.' });
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'A valid email address is required.' });
      }

      const { data, error } = await supabase
        .from('contact_messages')
        .insert({ name, email, subject, message, delivery_status })
        .select('id, delivery_status, created_at')
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === 'PUT') {
      const id = Number(req.body?.id);
      const delivery_status = clean(req.body?.delivery_status, 30);
      const provider_response = clean(req.body?.provider_response, 1000);

      if (!id || !['sent', 'failed', 'pending'].includes(delivery_status)) {
        return res.status(400).json({ error: 'A valid message id and delivery status are required.' });
      }

      const { data, error } = await supabase
        .from('contact_messages')
        .update({ delivery_status, provider_response })
        .eq('id', id)
        .select('id, delivery_status, created_at')
        .single();

      if (error) throw error;
      return res.status(200).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Contact API error:', err);
    return res.status(500).json({ error: err.message || 'Unable to save message' });
  }
}
