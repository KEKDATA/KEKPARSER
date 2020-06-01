const voices: SpeechSynthesisVoice[] =
  window?.speechSynthesis?.getVoices() ?? {};
let ruVoice = <SpeechSynthesisVoice>{};

for (let i = 0; i < voices.length; i += 1) {
  const currentVoice = voices[i];
  const currentLang = currentVoice.lang;

  if (currentLang === 'ru-RU') {
    ruVoice = currentVoice;
  }
}

export const speakMessage = (text: string) => {
  const speechSynthesisRu = new SpeechSynthesisUtterance(text);
  speechSynthesisRu.lang = 'ru-RU';
  speechSynthesisRu.voice = ruVoice;

  window.speechSynthesis.speak(speechSynthesisRu);
};
