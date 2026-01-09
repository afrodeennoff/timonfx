import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, imageData } = req.body;

  if (!process.env.API_KEY) {
    return res.status(500).json({ error: 'Intel key missing from environment' });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const parts: any[] = [];
    
    if (imageData) {
      parts.push({
        inlineData: {
          data: imageData,
          mimeType: "image/png"
        }
      });
    }
    
    parts.push({ text: prompt });

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts },
    });

    let generatedImage = null;
    if (result.candidates?.[0]?.content?.parts) {
      for (const part of result.candidates[0].content.parts) {
        if (part.inlineData) {
          generatedImage = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    return res.status(200).json({ image: generatedImage });
  } catch (error: any) {
    console.error('Generation failure:', error);
    return res.status(500).json({ error: error.message || 'Failed to synthesize' });
  }
}