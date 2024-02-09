import React, { useState } from 'react';
import useStore from '@/helpers/store';
import { useRouter } from 'next/router';

// Import the audio file
import audioFile from './audio.mp3';

export const Navbar: React.FC = () => {
  const router = useStore((s) => s.router);
  const _router = useRouter();
  const [active, setActive] = useState(_router.pathname);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  const navItems = [
    {
      text: 'HOME',
      path: '/',
    },
    {
      text: 'PROJECTS',
      path: '/projects',
    },
    {
      text: 'CONTACT',
      path: '/contact',
    },
  ];

  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
    
    // Toggle music when the sound button is clicked
    if (!isSoundEnabled) {
      playAudio();
    } else {
      stopAudio();
    }
  };

  const playAudio = () => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  const stopAudio = () => {
    const audio = new Audio(audioFile);
    audio.pause();
  };

  return (
    <nav className='absolute top-0 left-0 right-0 z-20 flex items-center justify-between w-full px-5 pt-5 pb-1 border-b sm:px-10 lg:px-20 text-white/75 border-b-white/20'>
      <span
        className='text-xl cursor-pointer font-fog mix-blend-difference'
        onClick={() => router.push('/')}
      >
        Saihaj L.
      </span>
      <ul className='flex text-sm font-light tracking-wider space-x-4 md:space-x-10 font-ubuntu [&>*]:cursor-pointer [&>*]:leading-none [&>*:hover]:text-white [&>*]:transition-all'>
        {navItems.map((item) => {
          const { text, path } = item;

          return (
            <li
              key={text}
              onClick={() => {
                router.push(path);
                setActive(path);
              }}
              className={`${
                active === path ? 'text-white' : 'text-white/75'
              } hover-effect`}
            >
              {text}
            </li>
          );
        })}
        <li>
          <button onClick={toggleSound}>
            {isSoundEnabled ? 'Disable Sound' : 'Enable Sound'}
          </button>
        </li>
      </ul>
    </nav>
  );
};
