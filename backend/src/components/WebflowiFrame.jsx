'use client'
import { useEffect, useState } from "react";

// WebflowiFrame is a React component that sends a message to a parent window containing an sessionToken.
export default function WebflowiFrame({ sessionToken }) {
  // tokenSent state indicates whether the sessionToken has been sent to the parent window or not.
  const [tokenSent, setTokenSent] = useState(false);
  
  // useEffect is a React Hook that is used to perform side effects in function components.
  // Here, it is used to send a postMessage to the parent window containing the sessionToken,
  // but only if the sessionToken is defined and has not been sent before.
  useEffect(() => {
    // Check if sessionToken exists and if it hasn't been sent yet.
    if (sessionToken && !tokenSent) {
      // Update the state to indicate the token has been sent.
      setTokenSent(true);
      // postMessage is used to safely enable cross-origin communication.
      // We're sending the sessionToken to the parent window which is located at the provided URL.
      window.parent.postMessage({ sessionToken }, process.env.NEXT_PUBLIC_WEBFLOW_DESIGNER_EXT_URL);
    }
  }, [sessionToken, tokenSent]);  // The useEffect hook will run every time the sessionToken or tokenSent state changes.

  // The component does not render anything visible to the DOM.
  return null;
}
