import { toast } from "sonner";

/**
 * Triggers Razorpay checkout for subscription payment
 * Similar to the payment flow in pp-link, but for subscriptions
 * 
 * @param {Object} options - Subscription payment options
 * @param {string} [options.subscriptionId="sub_Rlk5fX9jPCRyby"] - Razorpay subscription ID
 * @param {string} [options.key="rzp_test_RZQA8D3pHvPbFd"] - Razorpay key ID
 * @param {string} [options.name="PotatoPay"] - Business/creator name
 * @param {string} [options.description="Subscription Payment"] - Description for the subscription
 * @param {Object} [options.prefill={}] - Prefill customer details { name, email, contact }
 * @param {Object} [options.theme={}] - Theme options { color }
 * @param {Function} [options.handler] - Success handler callback (receives response object)
 * @param {Function} [options.onError] - Error handler callback
 * 
 * @example
 * // Basic usage with default subscription ID
 * triggerRazorpaySubscription({});
 * 
 * @example
 * // With custom subscription ID and handler
 * triggerRazorpaySubscription({
 *   subscriptionId: "sub_custom123",
 *   name: "My Business",
 *   description: "Monthly Subscription",
 *   prefill: {
 *     name: "John Doe",
 *     email: "john@example.com",
 *     contact: "1234567890"
 *   },
 *   handler: (response) => {
 *     console.log("Payment successful:", response);
 *   }
 * });
 */
export const triggerRazorpaySubscription = (options = {}) => {
  const {
    subscriptionId = "sub_Rm1uh0HJlE4ZEA",
    key = "rzp_test_RlisDJzfagn5g8",
    name = "PotatoPay",
    description = "Subscription Payment",
    prefill = {},
    theme = {},
    handler,
    onError,
  } = options;
  // Check if Razorpay is loaded
  if (typeof window === "undefined" || !window.Razorpay) {
    const error = new Error("Razorpay script not loaded. Please ensure the Razorpay script is included in your HTML.");
    if (onError) {
      onError(error);
    } else {
      console.error(error);
    }
    return;
  }

  try {
    const options = {
      key: key,
      subscription_id: subscriptionId,
      name: name,
      description: description,
      ...(Object.keys(prefill).length > 0 && { prefill }),
      ...(Object.keys(theme).length > 0 && { theme }),
      handler: handler || ((response) => {
        console.log("Subscription payment successful:", response);
        toast.success("Your Pro subscription will soon be activated", {
          duration: 5000,
        });
      }),
      modal: {
        ondismiss: () => {
          console.log("Subscription payment modal closed");
        },
      },
    };

    console.log("Razorpay options:", options);

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    if (onError) {
      onError(error);
    } else {
      console.error("Error opening Razorpay subscription checkout:", error);
    }
  }
};

export default triggerRazorpaySubscription;

