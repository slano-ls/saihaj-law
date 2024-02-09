import React, { useState } from 'react';
import useStore from '@/helpers/store';
import { useRouter } from 'next/router';

// Import the audio files for each page
import audio1 from './audio1.mp3';
import audio2 from './audio2.mp3';
import audio3 from './audio3.mp3';
import mainAudio from './audio.mp3';

export const Navbar: React.FC = () => {
  const router = useStore((s) => s.router);
  const _router = useRouter();
  const [active, setActive] = useState(_router.pathname);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  const navItems = [
    {
      text: 'HOME',
      path: '/',
      audio: audio3,
    },
    {
      text: 'PROJECTS',
      path: '/projects',
      audio: audio1,
    },
    {
      text: 'CONTACT',
      path: '/contact',
      audio: audio2,
    },
  ];

  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
    
    if (!isSoundEnabled) {
      playAudio(mainAudio);
    } else {
      stopAudio();
    }
  };

  const playAudio = (audioSrc: string) => {
    if (!audioPlayer) {
      const audio = new Audio(audioSrc);
      setAudioPlayer(audio);
      audio.play().catch((error) => console.error("Audio playback error: ", error));
    } else {
      audioPlayer.play().catch((error) => console.error("Audio playback error: ", error));
    }
  };

  const stopAudio = () => {
    if (audioPlayer) {
      audioPlayer.pause();
    }
  };

  const handleNavItemClick = (path: string, audioSrc: string) => {
    router.push(path);
    setActive(path);
    playAudio(audioSrc);
  };

  return (
    <nav className='absolute top-0 left-0 right-0 z-20 flex items-center justify-between w-full px-5 pt-5 pb-1 border-b sm:px-10 lg:px-20 text-white/75 border-b-white/20'>
      <span
        className='text-xl cursor-pointer font-fog mix-blend-difference'
        onClick={() => {
          router.push('/');
          setActive('/');
        }}
      >
        Saihaj L.
      </span>
      <ul className='flex text-sm font-light tracking-wider space-x-4 md:space-x-10 font-ubuntu [&>*]:cursor-pointer [&>*]:leading-none [&>*:hover]:text-white [&>*]:transition-all'>
        {navItems.map((item) => {
          const { text, path, audio } = item;

          return (
            <li
              key={text}
              onClick={() => handleNavItemClick(path, audio)}
              className={`${
                active === path ? 'text-white' : 'text-white/75'
              } hover-effect`}
            >
              {text}
            </li>
          );
        })}
        <li>
          <button onClick={toggleSound} className="hover-effect">
            {isSoundEnabled ? 'DISABLE SOUND' : 'ENABLE SOUND'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

