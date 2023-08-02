'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function WebflowRedirect({ authorize, code }) {
  const router = useRouter();
  const [checkAuth, setCheckAuth] = useState(true);
  const [showElement, setShowElement] = useState(false);
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    // Check if `code` exists and if `checkAuth` is true.
    if (code && checkAuth) {
      authorize(code)
      .then(authorized => {
          // If authorization is successful, navigate to the root ("/") route
          if (authorized) {
            // Set `checkAuth` state to false
            setCheckAuth(false);
            router.push('/');
          } else {
            // If not successful, log the error message to the console
            console.error(`Authorization Failed!`);
          }
      })
      .catch(error => {
          // If there's an error during authorization, log the error message to the console
          console.error(`Something went wrong: ${error}`);
      });
    }

    // Set a timeout to display a warning message if authorization takes too long
    const timeoutId = setTimeout(() => {
      setShowElement(true);
    }, 2000);

    return () => {
      // Cleanup function to clear the timeout when the component unmounts or before next effect run
      clearTimeout(timeoutId);
    };
  }, [authorize, checkAuth, code, router]);

  // Separate useEffect hook to handle the display of the warning based on `showElement` and `checkAuth`
  useEffect(() => {
    if(showElement && checkAuth) {
      setWarning(
        <div className="mb-6 text-lg text-gray-500">
          Not working? Try refreshing the page.
        </div>
      );
    }
  }, [showElement, checkAuth]);

return (
    <div className="grid items-center justify-center h-screen min-h-full bg-gray-200 place-items-center py-24 px-6 sm:py-32 lg:px-8">
      <div className="text-center">
        <div className="flex flex-col items-center justify-center space-x-1">
          <h1 className="text-4xl mb-4">Authorizing your Webflow account</h1>
          {warning}
          <div className="flex mt-6 space-x-2 animate-pulse">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}