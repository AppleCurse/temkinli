export class AudioSpeechAssistant {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;
  private static isSpeakingState = false;

  public static speak(
    text: string,
    onStart?: () => void,
    onEnd?: () => void
  ) {
    if (!this.synth) return;

    this.stop();

    // Clean markdown or technical badges from spoken text
    const cleanText = text
      .replace(/[*#_`]/g, '')
      .replace(/₺/g, 'Türk Lirası')
      .replace(/%/g, 'yüzde ')
      .replace(/\//g, ' bölü ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'tr-TR';
    utterance.rate = 1.0;
    utterance.pitch = 0.95; // Slightly deeper, authoritative merchant tone

    // Try finding Turkish voice
    const voices = this.synth.getVoices();
    const trVoice = voices.find((v) => v.lang.includes('tr') || v.name.includes('Turkish'));
    if (trVoice) {
      utterance.voice = trVoice;
    }

    utterance.onstart = () => {
      this.isSpeakingState = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeakingState = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isSpeakingState = false;
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public static stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeakingState = false;
    }
  }

  public static isSpeaking(): boolean {
    return this.isSpeakingState;
  }
}
