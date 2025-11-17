import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import UpdateSocials from './link/UpdateSocials';
import LinkPageRenderer from './link/LinkPageRenderer';
import laptopPotato from '@/assets/laptop.svg?url';

async function getLinkPage(token) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/link-tree`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!data.success) {
      return null;
    }
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function PotatoTreeContent() {
  const { token } = useAuthStore();
  const [blocks, setBlocks] = useState();

  useEffect(() => {
    getLinkPage(token).then((data) => {
      setBlocks(data);
    });
  }, [token]);

  if (!blocks) {
    return <div>Loading...</div>;
  }

  return (
    <div className='rounded-xl h-[calc(95vh-9rem)] flex overflow-hidden relative'>
      <div className='hidden md:block absolute left-10 bottom-10 pointer-events-none'>
        <img
          src={laptopPotato}
          alt='Potato Pay Mascot'
          className='w-18 h-18 object-contain mascot-enter scale-250'
          style={{ filter: 'drop-shadow(6px 6px 0 rgba(0,0,0,1))' }}
        />
      </div>
      <div className='flex-1 overflow-y-auto'>
        <LinkPageRenderer blocks={blocks} />
      </div>
      <div className='w-[300px] overflow-y-auto'>
        <UpdateSocials />
      </div>
    </div>
  );
}
