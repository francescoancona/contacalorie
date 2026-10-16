export class GeminiProvider {
  constructor(apiKey, model = 'gemini-2.0-flash-lite') {
    this.apiKey = apiKey;
    this.model = model;
    this.endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  }

  async parseFoods(text) {
    if (!this.apiKey) return null;

    const prompt = `Sei un assistente nutrizionale. Analizza il seguente testo in italiano e estrai tutti gli alimenti con i relativi grammi.
Restituisci SOLO un array JSON valido nel formato: [{"food": "nome alimento", "grams": numero_grammi}]
Se i grammi non sono specificati, usa null.
Non aggiungere altro testo, solo il JSON.

Testo: "${text}"`;

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 512,
          },
        }),
      });

      if (!response.ok) return null;

      const data = await response.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

      // Extract JSON array from response
      const match = raw.match(/\[[\s\S]*\]/);
      if (!match) return null;

      const parsed = JSON.parse(match[0]);
      if (!Array.isArray(parsed)) return null;

      return parsed.map(item => ({
        food: String(item.food || ''),
        grams: item.grams != null ? Number(item.grams) : null,
      }));
    } catch {
      return null;
    }
  }
}
