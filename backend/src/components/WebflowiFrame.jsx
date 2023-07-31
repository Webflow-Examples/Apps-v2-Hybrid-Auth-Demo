'use client'
import { useEffect, useState } from "react";

export default function WebflowiFrame({ idToken }) {
  const [tokenSent, setTokenSent] = useState(false);
  useEffect(() => {
    if (idToken && !tokenSent) {
      setTokenSent(true);
      window.parent.postMessage({ idToken }, process.env.NEXT_PUBLIC_WEBFLOW_DESIGNER_EXT_URL);
    }
  }, [idToken, tokenSent]);

  return idToken;
}