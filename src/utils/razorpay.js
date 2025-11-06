// Minimal Razorpay loader and checkout helper

export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-checkout-js')) {
      return resolve(true);
    }
    const script = document.createElement('script');
    script.id = 'razorpay-checkout-js';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// options: { key, amount, currency, name, description, image, order_id, prefill, notes, theme }
export async function openRazorpayCheckout(options) {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    throw new Error('Razorpay SDK failed to load');
  }
  if (!window.Razorpay) {
    throw new Error('Razorpay SDK not available');
  }
  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      handler: (response) => resolve(response),
      modal: { ondismiss: () => reject(new Error('Payment cancelled')) },
      ...options,
    });
    rzp.open();
  });
}
