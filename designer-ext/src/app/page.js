'use client'
import { useState, useEffect } from 'react';

export default function DesignerExtension() {
  const [idToken, setIdToken] = useState(null);
  const [sites, setSites] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const getSites = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/api/getSites`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        // credentials: 'include',
      });
      if (response.status !== 200) {
        setError(response.data.error);
        return console.error(response.data.error);
      }
      const data = await response.json();
      setSites(data.sites);
    } catch (error) {
      setError('Failed to load sites');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const messageHandler = (event) => {
      if (event.origin !== BACKEND_URL) {
        return;
      }

      var token = event.data.idToken;
      if (token) {
        setIdToken(token);
        window.removeEventListener('message', messageHandler);
      }
    };

    window.addEventListener('message', messageHandler);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  return (
    <div>
      <iframe src={`${BACKEND_URL}/webflow_iframe`} hidden></iframe>
      {idToken ? (
        <div>
          <p>Authenticated content: idtoken = {JSON.stringify(idToken)}</p>
          <button onClick={getSites} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'List Sites'}
          </button>
          {error && <p>Error: {error}</p>}
          {sites && (
            <ul>
              {sites.map((site, index) => (
                <li key={index}>{site.displayName}</li>
              ))}
            </ul>
          )}
        </div>      
      ) : (
        <div>Unauthenticated content</div>
      )}
    </div>
  );
}