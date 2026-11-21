import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const results = await Promise.all([
      supabase.from('profile').select('*').limit(1).maybeSingle(),
      supabase.from('impact_metrics').select('*').order('sort_order', { ascending: true }),
      supabase.from('projects').select('*').order('sort_order', { ascending: true }),
      supabase.from('experiences').select('*').order('sort_order', { ascending: true }),
      supabase.from('skill_categories').select('*').order('sort_order', { ascending: true }),
      supabase.from('education').select('*').order('sort_order', { ascending: true }),
      supabase.from('credentials').select('*').order('sort_order', { ascending: true }),
    ]);

    for (const result of results) {
      if (result.error) throw result.error;
    }

    return res.status(200).json({
      profile: results[0].data,
      metrics: results[1].data || [],
      projects: results[2].data || [],
      experiences: results[3].data || [],
      skillCategories: results[4].data || [],
      education: results[5].data || [],
      credentials: results[6].data || [],
    });
  } catch (err) {
    console.error('Portfolio API error:', err);
    return res.status(500).json({ error: err.message || 'Unable to load portfolio' });
  }
}
