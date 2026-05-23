import axios from "axios";

const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

export const generateAIContent = async (
  businessType,
  contentType,
  language = "en"
) => {
  try {
    const prompts = {
      sales:
        language === "fr"
          ? `Écris un message WhatsApp professionnel et convaincant pour promouvoir un business de type ${businessType}. Le message doit être humain, court, engageant et adapté aux clients africains.`
          : `Write a professional and persuasive WhatsApp sales message for a ${businessType} business. Make it human, short, engaging, and adapted to African customers.`,

      followup:
        language === "fr"
          ? `Écris un message de relance professionnel pour un client intéressé par un business de ${businessType}.`
          : `Write a professional follow-up message for a customer interested in a ${businessType} business.`,

      promo:
        language === "fr"
          ? `Crée une offre promotionnelle puissante pour un business de ${businessType}.`
          : `Create a powerful promotional offer for a ${businessType} business.`,

      caption:
        language === "fr"
          ? `Écris une légende Facebook/Instagram engageante pour un business de ${businessType}.`
          : `Write an engaging Facebook/Instagram caption for a ${businessType} business.`,
    };

    const prompt = prompts[contentType] || prompts.sales;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content:
              language === "fr"
                ? "Tu es un assistant IA expert en marketing et vente pour les petites entreprises africaines."
                : "You are an AI marketing and sales assistant specialized in helping African small businesses.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    const message =
      error?.response?.data?.error?.message ||
      error?.message ||
      "Unknown OpenAI error";

    console.log("OPENAI ERROR:", message);

    return language === "fr"
      ? `Erreur OpenAI: ${message}`
      : `OpenAI Error: ${message}`;
  }
};