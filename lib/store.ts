import { create } from "zustand";

interface VoiceState {
  submitted: boolean;
  time: number;
  displayedText: string;
  isTyping: boolean;
  timerId: NodeJS.Timeout | null;
  typingTimeoutId: NodeJS.Timeout | null;
  setSubmitted: (submitted: boolean) => void;
  incrementTime: () => void;
  resetTime: () => void;
  toggleSubmitted: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  startTyping: () => void;
  stopTyping: () => void;
  setDisplayedText: (text: string) => void;
}

const fullText =
  "Sabe, eu estava pensando outro dia em como as coisas mudam rápido. Às vezes a gente acha que nada está acontecendo, mas quando olha pra trás percebe o quanto já caminhou. É engraçado como pequenos momentos, que na hora parecem simples, acabam se tornando memórias gigantes...";

export const useVoiceStore = create<VoiceState>((set, get) => ({
  submitted: false,
  time: 0,
  displayedText: "",
  isTyping: false,
  timerId: null,
  typingTimeoutId: null,

  setSubmitted: (submitted) => set({ submitted }),

  incrementTime: () => set((state) => ({ time: state.time + 1 })),

  resetTime: () => set({ time: 0 }),

  toggleSubmitted: () => {
    const state = get();
    if (state.submitted) {
      // Stopping
      state.stopTimer();
      state.stopTyping();
      set({ submitted: false, time: 0, displayedText: "", isTyping: false });
    } else {
      // Starting
      set({ submitted: true });
      state.startTimer();
      // Start typing after 3 seconds
      const typingTimeout = setTimeout(() => {
        state.startTyping();
      }, 3000);
      set({ typingTimeoutId: typingTimeout });
    }
  },

  startTimer: () => {
    const timerId = setInterval(() => {
      get().incrementTime();
    }, 1000);
    set({ timerId });
  },

  stopTimer: () => {
    const state = get();
    if (state.timerId) {
      clearInterval(state.timerId);
      set({ timerId: null });
    }
    if (state.typingTimeoutId) {
      clearTimeout(state.typingTimeoutId);
      set({ typingTimeoutId: null });
    }
  },

  startTyping: () => {
    set({ isTyping: true });
    let currentIndex = 0;

    const typeText = () => {
      if (currentIndex < fullText.length && get().submitted) {
        set({ displayedText: fullText.slice(0, currentIndex + 1) });
        currentIndex++;
        setTimeout(typeText, 50);
      } else {
        set({ isTyping: false });
      }
    };

    typeText();
  },

  stopTyping: () => {
    set({ isTyping: false, displayedText: "" });
  },

  setDisplayedText: (text) => set({ displayedText: text }),
}));
