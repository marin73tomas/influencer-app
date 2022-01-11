
import getStripe from "../services/getStripe";

const redirectToCheckout = async () => {
  // Create Stripe checkout
  const {
    data: { id },
  } = await axios.post("/api/checkout_sessions", {
    items: Object.entries(cartDetails).map(([_, { id, quantity }]) => ({
      price: id,
      quantity,
    })),
  });
  // Redirect to checkout
  const stripe = await getStripe();
  await stripe.redirectToCheckout({ sessionId: id });
};