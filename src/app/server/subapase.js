import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wvwnarfblestqsriyito.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2d25hcmZibGVzdHFzcml5aXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4MTE5MzMsImV4cCI6MjA0ODM4NzkzM30.Fc7fzIz5R4-eUcG7EQNGyZYZB3Y1NM3cyoahAWUZRcE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);