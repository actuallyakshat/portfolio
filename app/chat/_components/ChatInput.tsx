"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, Mic, MicOff } from "lucide-react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  // Optional: Add a prop to disable input while AI is responding
  disabled?: boolean;
}

export default function ChatInput({
  onSendMessage,
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [speechSupported, setSpeechSupported] = useState(false);
  const [micAvailable, setMicAvailable] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const [silenceTimer, setSilenceTimer] = useState<NodeJS.Timeout | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isVoiceDetected, setIsVoiceDetected] = useState(false);

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);

    // Manual check for speech recognition support
    const checkSpeechSupport = () => {
      const webkitSpeechRecognition = (window as any).webkitSpeechRecognition;
      const speechRecognition = (window as any).SpeechRecognition;
      return !!(webkitSpeechRecognition || speechRecognition);
    };

    // Check microphone permissions
    const checkMicrophoneAccess = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          setMicAvailable(true);
        }
      } catch (error) {
        console.log("Microphone not available:", error);
        setMicAvailable(false);
      }
    };

    setSpeechSupported(
      browserSupportsSpeechRecognition || checkSpeechSupport(),
    );
    checkMicrophoneAccess();
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    // Focus the input when the component mounts or when it becomes enabled
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [inputRef, disabled]);

  useEffect(() => {
    // Update the message state when the transcript changes
    if (transcript) {
      setMessage(transcript);
    }
  }, [transcript]);

  const handleSubmit = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      resetTranscript(); // Clear the transcript after sending
    }
  };

  const handleVoiceInput = async () => {
    if (!speechSupported) {
      alert(
        "Your browser does not support speech recognition. Please try Chrome or Edge.",
      );
      return;
    }

    if (listening) {
      stopListeningWithCleanup();
    } else {
      await startListeningWithVoiceDetection();
    }
  };

  const stopListeningWithCleanup = () => {
    SpeechRecognition.stopListening();

    // Clean up audio context and media stream
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }

    if (audioContext) {
      audioContext.close();
      setAudioContext(null);
    }

    // Clear silence timer
    if (silenceTimer) {
      clearTimeout(silenceTimer);
      setSilenceTimer(null);
    }

    setIsVoiceDetected(false);
  };

  const startListeningWithVoiceDetection = async () => {
    try {
      // Request microphone permission and set up voice activity detection
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);
      setMicAvailable(true);

      // Set up audio context for voice activity detection
      const context = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      setAudioContext(context);

      const source = context.createMediaStreamSource(stream);
      const analyser = context.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      let lastVoiceTime = Date.now();
      const SILENCE_THRESHOLD = 30; // Adjust this value to change sensitivity
      const SILENCE_DURATION = 3000; // Stop after 3 seconds of silence

      const checkVoiceActivity = () => {
        if (!listening) return;

        analyser.getByteFrequencyData(dataArray);

        // Calculate average volume
        const average =
          dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;

        if (average > SILENCE_THRESHOLD) {
          lastVoiceTime = Date.now();
          setIsVoiceDetected(true);

          // Clear any existing silence timer
          if (silenceTimer) {
            clearTimeout(silenceTimer);
            setSilenceTimer(null);
          }
        } else {
          setIsVoiceDetected(false);

          // Check if we've been silent for too long
          const silenceDuration = Date.now() - lastVoiceTime;

          if (silenceDuration > SILENCE_DURATION && !silenceTimer) {
            const timer = setTimeout(() => {
              if (listening) {
                stopListeningWithCleanup();
              }
            }, 500); // Small delay to avoid immediate cutoff

            setSilenceTimer(timer);
          }
        }

        // Continue monitoring
        if (listening) {
          requestAnimationFrame(checkVoiceActivity);
        }
      };

      resetTranscript();
      setMessage("");

      // Start speech recognition
      await SpeechRecognition.startListening({
        continuous: true,
        language: "en-US", // You can make this configurable
      });

      // Start voice activity monitoring
      requestAnimationFrame(checkVoiceActivity);
    } catch (error) {
      console.error("Failed to start speech recognition:", error);
      alert(
        "Failed to start speech recognition. Please check your microphone permissions.",
      );
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on component unmount
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
      if (audioContext) {
        audioContext.close();
      }
      if (silenceTimer) {
        clearTimeout(silenceTimer);
      }
    };
  }, [mediaStream, audioContext, silenceTimer]);

  // Don't render until we're on the client
  if (!isClient) {
    return (
      <div className="p-4">
        <div className="flex items-center rounded-xl bg-gray-50/80 py-2 pl-4 pr-2">
          <input
            type="text"
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none"
            placeholder="Ask anything"
          />
          <button
            type="button"
            className="ml-2 flex size-8 items-center justify-center rounded-lg bg-blue-500 text-white"
            disabled
          >
            <Mic size={16} />
          </button>
          <button
            type="button"
            className="ml-2 flex size-8 items-center justify-center rounded-lg bg-rose-500 text-white"
            disabled
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    );
  }

  const isSpeechButtonDisabled = disabled || !speechSupported;

  return (
    <div className="p-4">
      <div
        className={`flex items-center rounded-xl bg-gray-50/80 py-2 pl-4 pr-2 focus-within:border-rose-500 focus-within:ring-1 focus-within:ring-rose-500 ${
          disabled ? "cursor-not-allowed opacity-70" : ""
        }`}
      >
        <input
          type="text"
          ref={inputRef}
          className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none"
          placeholder={
            listening
              ? isVoiceDetected
                ? "Voice detected..."
                : "Listening for voice..."
              : "Ask anything"
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          disabled={disabled}
        />
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`ml-2 flex size-8 items-center justify-center rounded-lg text-white transition-colors ${
            listening
              ? isVoiceDetected
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          } ${isSpeechButtonDisabled ? "cursor-not-allowed opacity-50" : ""}`}
          title={
            !speechSupported
              ? "Speech recognition not supported"
              : listening
                ? isVoiceDetected
                  ? "Voice detected - Stop listening"
                  : "Listening for voice - Stop listening"
                : "Start voice input"
          }
          disabled={isSpeechButtonDisabled}
        >
          {listening ? <MicOff size={16} /> : <Mic size={16} />}
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="ml-2 flex size-8 items-center justify-center rounded-lg bg-rose-500 text-white transition-colors hover:bg-rose-600 disabled:opacity-50"
          disabled={!message.trim() || disabled}
        >
          <ArrowUp size={16} />
        </button>
      </div>
      {!speechSupported && (
        <p className="mt-1 text-xs text-red-500">
          Speech recognition is not supported in your browser. Try Chrome or
          Edge.
        </p>
      )}
      {!micAvailable && speechSupported && (
        <p className="mt-1 text-xs text-orange-500">
          Microphone not detected. Click the mic button to grant permissions.
        </p>
      )}
    </div>
  );
}
