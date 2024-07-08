import React, { Suspense } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppRouter } from '@/app/providers/router';

function App() {
    return (
        <GoogleOAuthProvider clientId="748813053767-ernmm4nbs07766sklpjh745b5ot678a2.apps.googleusercontent.com">
            <div className="app">
                <Suspense>
                    <AppRouter />
                </Suspense>
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;
