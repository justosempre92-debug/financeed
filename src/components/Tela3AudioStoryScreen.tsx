import React, { useState, useRef } from 'react';
import { Play, Pause, RotateCcw, Sparkles, ArrowRight, ArrowLeft, Music } from 'lucide-react';
import kidSavingCoinImg from '../assets/images/crianca_guardando_moeda_1793836708285.jpg';
import { playPopSound, playStarSound } from '../utils/sound';

interface Tela3AudioStoryScreenProps {
  childName?: string;
  onNext: () => void;
  onBack: () => void;
}

// Local audio path saved in the public directory
const LOCAL_AUDIO_URL = '/historinha.mp3';

export const Tela3AudioStoryScreen: React.FC<Tela3AudioStoryScreenProps> = ({
  childName,
  onNext,
  onBack,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [imgError, setImgError] = useState<boolean>(false);

  // HTML5 audio element reference
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Timeupdate and loadedmetadata handlers
  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration && !isNaN(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.warn('Playback notice:', err);
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      audioRef.current.play().catch((err) => {
        console.warn('Playback notice:', err);
      });
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex-1 flex flex-col items-center justify-between px-4 py-6 max-w-4xl mx-auto w-full select-none">
      {/* Top Header Badge */}
      <div className="w-full flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-extrabold mb-3 shadow-xs animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-600 fill-emerald-300" />
          <span>{childName ? `Momento Mágico de ${childName}` : 'Momento Mágico'} · Tela 3</span>
          <Sparkles className="w-4 h-4 text-emerald-600 fill-emerald-300" />
        </div>

        {/* Título: VAMOS GUARDAR MOEDINHAS! */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 drop-shadow-xs">
          VAMOS GUARDAR MOEDINHAS!
        </h1>
        <p className="text-sm sm:text-base font-bold text-emerald-900/90 mt-1">
          Cada moedinha guardada é um passo para realizar grandes sonhos!
        </p>
      </div>

      {/* Center Section: <img> tag representing child saving a coin */}
      <div className="my-4 flex flex-col items-center">
        <div className="relative group">
          {/* Ambient Glow */}
          <div className="absolute inset-2 rounded-3xl bg-emerald-200/50 blur-2xl group-hover:bg-emerald-300/60 transition-all duration-300 pointer-events-none" />

          {/* Floating Stars */}
          <span className="absolute -top-3 -right-2 text-2xl animate-bounce pointer-events-none z-20" style={{ animationDuration: '2.5s' }}>
            🪙
          </span>
          <span className="absolute -bottom-2 -left-3 text-2xl animate-bounce pointer-events-none z-20" style={{ animationDuration: '3s' }}>
            ✨
          </span>

          {/* Child saving coin <img> */}
          <div className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-3xl border-4 border-white shadow-2xl bg-gradient-to-b from-emerald-100 to-teal-50 p-2 overflow-hidden flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
            <img
              src={
                imgError
                  ? 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&auto=format&fit=crop&q=80'
                  : kidSavingCoinImg
              }
              alt="Criança guardando moeda no cofrinho"
              className="w-full h-full object-cover rounded-2xl drop-shadow-md select-none pointer-events-none"
              loading="eager"
              onError={() => setImgError(true)}
            />
          </div>
        </div>
      </div>

      {/* Hidden real HTML5 <audio> tag pointing to local file */}
      <audio
        ref={audioRef}
        src={LOCAL_AUDIO_URL}
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
      />

      {/* Audio Player Card */}
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border-3 border-emerald-300 shadow-xl flex flex-col items-center">
        {/* Play / Pause circular blue button */}
        <div className="relative mb-2">
          {/* Subtle pulse ring while playing */}
          {isPlaying && (
            <div className="absolute inset-0 rounded-full bg-blue-400/40 animate-ping pointer-events-none" />
          )}

          <button
            type="button"
            onClick={togglePlayPause}
            className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white shadow-xl shadow-blue-500/30 border-4 border-white flex items-center justify-center cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-200 group"
            aria-label={isPlaying ? 'Pausar áudio da história' : 'Reproduzir áudio da história'}
          >
            {isPlaying ? (
              <Pause className="w-9 h-9 sm:w-11 sm:h-11 fill-white text-white drop-shadow-sm" />
            ) : (
              <Play className="w-9 h-9 sm:w-11 sm:h-11 fill-white text-white drop-shadow-sm ml-1" />
            )}
          </button>
        </div>

        {/* Text directly below the button: 'Ouça essa história!' */}
        <p className="text-lg sm:text-xl font-extrabold text-blue-950 mt-1 mb-3 tracking-wide">
          Ouça essa história!
        </p>

        {/* Real-time Progress Bar (currentTime and duration) */}
        <div className="w-full space-y-2 px-2">
          {/* Visual Progress Bar with gradient */}
          <div className="relative w-full h-3.5 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300">
            <div
              className="h-full bg-gradient-to-r from-blue-400 via-sky-400 to-blue-600 rounded-full transition-all duration-150 relative"
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/70 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Interactive Range Scrubber */}
          <div className="relative w-full flex items-center -mt-2">
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-3 opacity-0 absolute cursor-pointer z-10"
              aria-label="Controle de tempo da história"
            />
          </div>

          {/* Time display: currentTime / duration and percentage */}
          <div className="flex items-center justify-between text-xs font-black text-slate-600 px-1 pt-1">
            <span className="tabular-nums text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
              {formatTime(currentTime)}
            </span>

            <span className="text-[11px] font-bold text-slate-500">
              {progressPercent.toFixed(0)}% reproduzido
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRestart}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                title="Reiniciar do começo"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>
              <span className="tabular-nums text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>

        {/* Audio file indicator */}
        <div className="mt-4 pt-3 border-t border-slate-100 w-full flex items-center justify-center text-xs text-slate-500 font-semibold gap-1.5">
          <Music className="w-3.5 h-3.5 text-blue-500" />
          <span>Áudio Oficial: Historinha do Cofrinho Mágico</span>
        </div>
      </div>

      {/* Footer Navigation: 'Voltar' and 'Próximo' para a Tela 4 */}
      <div className="w-full max-w-2xl mt-6 pt-4 border-t border-emerald-200/80 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            if (audioRef.current) audioRef.current.pause();
            playPopSound();
            onBack();
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 font-extrabold text-xs sm:text-sm border border-emerald-200 shadow-xs cursor-pointer active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar (Tela 2)</span>
        </button>

        {/* Botão 'Próximo' para a Tela 4 */}
        <button
          type="button"
          onClick={() => {
            if (audioRef.current) audioRef.current.pause();
            playStarSound();
            onNext();
          }}
          className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-black text-base sm:text-lg shadow-xl shadow-emerald-500/30 border-3 border-white cursor-pointer transform hover:scale-105 active:scale-95 transition-all animate-pulse-gentle"
          aria-label="Avançar para a Tela 4"
        >
          <span>Próximo</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
