export class SpeechRecognizer {
  constructor(language = 'it-IT') {
    this.language = language;
    this._SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  }

  isSupported() {
    return this._SR !== null;
  }

  listen() {
    return new Promise((resolve, reject) => {
      if (!this._SR) {
        reject(new Error('SpeechRecognition non supportato da questo browser'));
        return;
      }

      const recognition = new this._SR();
      recognition.lang = this.language;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };

      recognition.onerror = (event) => {
        let msg = 'Errore nel riconoscimento vocale';
        if (event.error === 'not-allowed') msg = 'Permesso microfono negato';
        else if (event.error === 'no-speech') msg = 'Nessun audio rilevato';
        else if (event.error === 'network') msg = 'Errore di rete';
        reject(new Error(msg));
      };

      recognition.onnomatch = () => {
        reject(new Error('Nessuna corrispondenza trovata'));
      };

      recognition.start();
    });
  }
}
