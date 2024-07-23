"use client";

import { useEffect, useState } from "react";

import MusicButton from "@/components/MusicButton";
import { Music, musics } from "./musics";
import { formatName } from "@/utils/transformers";
import { Filter } from "@/components/icons";

export default function Home() {
  const [musicName, setMusicName] = useState<string>();
  const [music, setMusic] = useState<HTMLAudioElement>();
  
  const [studio, setStudio] = useState(false)

  useEffect(() => {
    music?.pause();

    if (musicName) {
      const audio = new Audio(`/musics/${encodeURIComponent(musicName)}`);
      audio.play();
      setMusic(audio);
    }
  }, [musicName]);

  useEffect(() => {
    if (music) {
      music.addEventListener("ended", () => {
        setMusicName(undefined);
      });

      return () => {
        music.removeEventListener("ended", () => {
          setMusicName(undefined);
        });
      };
    }
  }, [music]);


  return (
    <>
    <main className="min-h-screen flex  flex-col items-center gap-6 pt-12 p-6">
      <h1 className="font-bold text-3xl"><span className="text-blue-dark">#</span>EAC music</h1>
      <div className="mb-4 flex flex-wrap max-w-[500px]">
        <button onClick={() => setStudio(!studio)} className={`flex gap-2 cursor-pointer font-bold ${studio ? 'bg-blue-dark text-white' :'bg-black/30'} px-5 h-10 items-center rounded-full`}>studio<Filter className="h-5 w-5" /></button>
      </div>
      {musics.map((m, i) => {
        const iMPlaying = m.src === musicName;
        return (
          <MusicButton
            studio={m.studio}
            key={`music-${i}`}
            tone={m.tone}
            name={formatName(m.name)}
            playing={iMPlaying}
            disabled={studio && !m.studio}
            onClick={() => {
              if (iMPlaying) setMusicName(undefined);
              else setMusicName(m.src);
            }}
          />
        );
      })}
    </main>
      <div className="h-[300px] pt-[100px] mt-[-100px] background w-full flex items-center justify-center mix-blend-multiply z-0">
        <a href="https://www.instagram.com/andrelmmartins/" target="_blank" className="flex items-center px-5 h-10 bg-black text-white font-bold rounded-full">@andrelmmartins</a>
      </div>
      </>
  );
}
