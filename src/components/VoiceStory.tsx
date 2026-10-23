import { Mic, Square, Trash2, Download, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { CONTACT_EMAIL } from "@/data/hideas";

export function VoiceStory() {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
  }, [audioUrl]);

  const start = async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (event) => event.data.size && chunksRef.current.push(event.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
      };
      recorderRef.current = recorder;
      recorder.start();
      setRecording(true);
    } catch {
      setError("Microphone access is needed to record your story.");
    }
  };

  const stop = () => {
    recorderRef.current?.stop();
    setRecording(false);
  };

  const clear = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
  };

  const subject = encodeURIComponent("My voice note from a Hideas circle");
  const body = encodeURIComponent(
    `${anonymous ? "Please share this anonymously." : "You may contact me about how my name is shown."}\n\nI recorded my story on the Hideas website and will attach the downloaded voice note to this email.`,
  );

  return (
    <div className="border-2 border-cream/25 bg-ink-soft p-6 text-cream shadow-[8px_8px_0_var(--marigold)] sm:p-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-jade">Share your circle</p>
      <h3 className="poster mt-3 text-4xl">Tell it in your own voice</h3>
      <p className="mt-4 max-w-2xl leading-relaxed text-cream/75">
        Record a short reflection. Listen before sharing, and choose whether your name stays private.
      </p>
      <label className="mt-5 flex items-center gap-3 text-sm text-cream/80">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(event) => setAnonymous(event.target.checked)}
          className="size-4 accent-[var(--marigold)]"
        />
        I want to remain anonymous
      </label>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {!recording ? (
          <button type="button" onClick={start} className="flex items-center gap-2 border-2 border-ink bg-marigold px-5 py-3 font-display uppercase text-ink">
            <Mic className="size-4" /> Record
          </button>
        ) : (
          <button type="button" onClick={stop} className="flex items-center gap-2 border-2 border-cream bg-ember px-5 py-3 font-display uppercase text-cream">
            <Square className="size-4" /> Stop
          </button>
        )}
        {audioUrl ? <audio controls src={audioUrl} className="max-w-full" /> : null}
      </div>
      {error ? <p className="mt-3 text-sm text-marigold">{error}</p> : null}
      {audioUrl ? (
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={audioUrl} download="hideas-circle-story.webm" className="flex items-center gap-2 border-2 border-cream/40 px-4 py-2 font-mono text-[11px] uppercase text-cream">
            <Download className="size-4" /> Download recording
          </a>
          <a href={`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`} className="flex items-center gap-2 border-2 border-ink bg-jade px-4 py-2 font-mono text-[11px] uppercase text-cream">
            <Mail className="size-4" /> Open email to share
          </a>
          <button type="button" onClick={clear} aria-label="Delete recording" className="grid size-10 place-items-center border-2 border-cream/40 text-cream">
            <Trash2 className="size-4" />
          </button>
        </div>
      ) : null}
      <p className="mt-4 text-xs leading-relaxed text-cream/50">
        Your recording stays on this device. Download it, then attach it to the email that opens.
      </p>
    </div>
  );
}