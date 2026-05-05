'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [status, setStatus] = useState('جارٍ الاتصال...');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? 'متصل ✅' : 'Supabase يعمل ✅');
    });
  }, []);

  return (
    <main style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', fontFamily:'sans-serif', fontSize:24 }}>
      iMeets — {status}
    </main>
  );
}
