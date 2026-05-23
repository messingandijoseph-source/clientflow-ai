export const generateAIContent = async (businessType, contentType) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const business = businessType || "business";

  const templates = {
    sales: `🔥 Special offer for you!

Looking for trusted ${business} services? We’ve got exactly what you need.

✅ Quality service
✅ Affordable prices
✅ Fast response
✅ Customer satisfaction guaranteed

📲 Message us now on WhatsApp and place your order today!`,

    followup: `Hello 👋

I hope you're doing well. I just wanted to follow up concerning our ${business} offer.

We still have available slots/products, and I’d be happy to help you choose the best option.

📲 Let me know if you’d like more details today.`,

    promo: `🎉 Limited-time promo!

Get the best ${business} deals today at a special price.

🔥 Offer valid for a short time only
✅ Quality guaranteed
✅ Fast service
✅ Easy payment options

📲 Contact us now before the promo ends!`,

    caption: `Your next favorite ${business} solution is here 🚀

We help customers enjoy quality, affordability, and trusted service every day.

Don’t wait until later — send us a message today and let’s serve you better.

#BusinessAfrica #SmallBusiness #ClientFlowAI #WhatsAppBusiness`,
  };

  return templates[contentType] || templates.sales;
};