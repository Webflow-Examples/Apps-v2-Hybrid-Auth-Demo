Webflow Hybrid App - Authentication Demo
========================================================

This project demonstrates how to handle authentication between a Webflow designer extension and a backend application. This is a sample implementation of a secure communication channel using JSON Web Tokens (JWTs).

Features
--------

1.  Integration with Webflow API to fetch and manage sites.
2.  JWT-based authentication to secure the communication between the Webflow designer extension and the Next.js backend.
3.  Middleware for handling CORS and preflight requests.
4.  Demonstrates the secure transmission of JWTs from a Next.js application to a parent window in a different origin.
5.  An endpoint that handles GET requests from the designer extension, validating authorization tokens, fetching site data from the Webflow API, and responding with the necessary data.

Prerequisites
-------------

-   Node.js
-   npm
-   MongoDB

Environment Variables
---------------------

The following environment variables are required to run this application:

-   `GITHUB_ID` - Your GitHub app ID. Used for OAuth.
-   `GITHUB_SECRET` - Your GitHub app secret. Used for OAuth.
-   `NEXTAUTH_SECRET` - A secret string used to encrypt session data.
-   `NEXTAUTH_URL` - The base URL for the NextAuth.js endpoints.
-   `NEXT_PUBLIC_WEBFLOW_DESIGNER_EXT_URL` - The URL for the Webflow designer extension. Replace `<ext-id>` with your extension ID. Can be localhost for development.
-   `CLIENT_ID` - Your Webflow API client ID.
-   `CLIENT_SECRET` - Your Webflow API client secret.
-   `MONGODB_URI` - The URI to your MongoDB database.
-   `DESIGNER_EXT_JWT_SECRET` - The secret key to sign and verify JWT tokens.

In a local development environment, you would set these in a `.env.local` file at the root of your project. For deployment, you would set these in your hosting environment.

*Please make sure to keep all these keys secret. They should not be shared or exposed publicly.*

Getting Started
---------------

1.  Clone the repository:

    bashCopy code

    `git clone https://github.com/<your-username>/<your-repo>.git
    cd <your-repo>`

2.  Install dependencies:

    Copy code

    `npm install`

3.  Start the server:

    arduinoCopy code

    `npm run dev`

Key Components
--------------

-   `WebflowiFramePage` - A Next.js page that retrieves an 'idToken' from the cookie store and passes it to the `WebflowiFrame` component.
-   `WebflowiFrame` - A React component that sends a message containing the 'idToken' to its parent window. The message is only sent if the 'idToken' is defined and has not been sent before. This demonstrates secure cross-origin communication using the `window.postMessage` method.
-   `GET` function (in `/api/getSites`): This function is triggered when the Webflow designer extension sends a GET request. It validates the authorization token from the request headers, connects to the MongoDB database to retrieve the user's access token, and then fetches the sites data from the Webflow API using the access token. The response is sent back to the designer extension with the 'Access-Control-Allow-Origin' header set to allow cross-origin requests.

Usage
-----

This backend application primarily serves the `/api/getSites` endpoint. It handles GET requests and expects a 'WF-Authorization' header with a valid JWT. It connects to the MongoDB database, finds the access token associated with the user ID from the JWT payload, and uses this token to fetch site data from the Webflow API.

Designer Extension (DE Folder)
------------------------------

All the code related to the Webflow Designer Extension is contained within the `DE` directory. This is where the magic happens - the authentication of the designer extension with the backend, the retrieval of sites data, and the display of the data in a paginated format.

Key features of the Designer Extension code include:

-   Authenticating with the backend by receiving an ID token from an iframe.
-   Making HTTP requests to the backend to retrieve sites data.
-   Displaying the retrieved data in a paginated list with navigation controls.

This code makes use of various web technologies and techniques such as XMLHttpRequests for making HTTP requests, the `postMessage` API for cross-origin communication, event listeners for handling various events, and basic error handling. For a more detailed understanding of the code, refer to the in-code comments or feel free to ask questions in the project's issue section.

Please note, the Designer Extension code assumes a backend URL defined in the `BACKEND_URL` variable. Be sure to set this value according to your backend server's address when setting up the extension for your own use.