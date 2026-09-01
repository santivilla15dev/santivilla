"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

type Props = {
  script: string;
  lang: "es" | "de";
  playLabel: string;
  pauseLabel: string;
  stopLabel: string;
  unsupportedLabel: string;
};

function speechLang(lang: "es" | "de"): string {
  return lang === "de" ? "de-DE" : "es-ES";
}

export function AuditAudioPlayer({
  script,
  lang,
  playLabel,
  pauseLabel,
  stopLabel,
  unsupportedLabel,
}: Props) {
  const supported = useSyncExternalStore(
    noopSubscribe,
    () => "speechSynthesis" in window,
    () => true,
  );
  const [playing, setPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setPlaying(false);
    utteranceRef.current = null;
  }, []);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  function pickVoice(): SpeechSynthesisVoice | null {
    if (typeof window === "undefined") return null;
    const voices = window.speechSynthesis.getVoices();
    const target = speechLang(lang);
    return (
      voices.find((v) => v.lang === target) ||
      voices.find((v) => v.lang.startsWith(lang)) ||
      voices[0] ||
      null
    );
  }

  function play() {
    if (!supported || !script.trim()) return;
    stop();

    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = speechLang(lang);
    const voice = pickVoice();
    if (voice) utterance.voice = voice;
    utterance.rate = 0.95;
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setPlaying(true);
  }

  function pause() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setPlaying(false);
    }
  }

  if (!supported) {
    return (
      <p className="text-xs text-surface/60">{unsupportedLabel}</p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {!playing ? (
        <button
          type="button"
          onClick={play}
          className="rounded-full bg-[#c9a227] px-4 py-2 text-xs font-medium text-[#1a1408]"
        >
          {playLabel}
        </button>
      ) : (
        <button
          type="button"
          onClick={pause}
          className="rounded-full border border-white/25 px-4 py-2 text-xs font-medium text-surface"
        >
          {pauseLabel}
        </button>
      )}
      <button
        type="button"
        onClick={stop}
        className="rounded-full border border-white/15 px-3 py-2 text-xs text-surface/70"
      >
        {stopLabel}
      </button>
    </div>
  );
}
