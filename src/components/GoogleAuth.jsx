import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    
    // 🔍 DEBUG: Check Client ID
    console.log('🔍 Raw Client ID:', clientId);
    console.log('🔍 Client ID length:', clientId?.length);
    console.log('🔍 Starts with http?:', clientId?.startsWith('http'));
    
    if (!clientId) {
      console.error('❌ Google Client ID is missing! Check your .env file.');
      return;
    }

    if (clientId.startsWith('http')) {
      console.error('❌ Client ID should NOT start with http:// or https://');
      console.error('❌ Remove the protocol from your .env file');
      return;
    }

    // Prevent duplicate initialization
    if (window.googleSignInInitialized) {
      console.log('⚠️ Google Sign-In already initialized, skipping...');
      return;
    }

    const initializeGoogleSignIn = () => {
      if (!window.google) {
        console.error('❌ Google Sign-In script not loaded yet');
        return;
      }

      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        // Mark as initialized
        window.googleSignInInitialized = true;
        console.log('✅ Google Sign-In initialized');

        const buttonDiv = document.getElementById('googleSignInButton');
        if (buttonDiv) {
          window.google.accounts.id.renderButton(
            buttonDiv,
            { 
              theme: 'outline', 
              size: 'large',
              text: 'signin_with',
              shape: 'rectangular'
            }
          );
          console.log('✅ Google Sign-In button rendered');
        } else {
          console.error('❌ Button container not found');
        }
      } catch (error) {
        console.error('❌ Error initializing Google Sign-In:', error);
        window.googleSignInInitialized = false; // Reset on error
      }
    };

    // Check if script is already loaded
    const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
    
    if (existingScript) {
      console.log('⚠️ Google Sign-In script already exists');
      if (window.google) {
        initializeGoogleSignIn();
      } else {
        existingScript.addEventListener('load', initializeGoogleSignIn);
      }
      return;
    }

    // Load Google Sign-In script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      console.log('✅ Google Sign-In script loaded');
      initializeGoogleSignIn();
    };

    script.onerror = () => {
      console.error('❌ Failed to load Google Sign-In script');
    };

    // Cleanup function - but don't remove script or reset flag
    return () => {
      // Don't remove the script or reset the flag
      // This prevents re-initialization issues
    };
  }, []);

  const handleCredentialResponse = (response) => {
    try {
      // Decode JWT token
      const userObject = parseJwt(response.credential);
      setUser(userObject);
      localStorage.setItem('user', JSON.stringify(userObject));
      console.log('✅ User signed in:', userObject);
      
      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('❌ Error handling credential response:', error);
    }
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('❌ Error parsing JWT:', error);
      throw error;
    }
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
    console.log('✅ User signed out');
    
    // Redirect to home page after sign out
    navigate('/');
  };

  useEffect(() => {
    // Check for saved user on mount
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        console.log('✅ Loaded saved user from localStorage');
      } catch (error) {
        console.error('❌ Error loading saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  if (user) {
    return (
      <div className="flex items-center gap-3 p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
        <img 
          src={user.picture} 
          alt={user.name} 
          className="w-10 h-10 rounded-full border-2 border-blue-400 shadow-lg"
        />
        <span className="text-sm font-bold hidden md:inline text-white">{user.name}</span>
        <button
          onClick={handleSignOut}
          className="text-sm px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-bold shadow-lg hover:shadow-xl hover:scale-105"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <div id="googleSignInButton"></div>
    </div>
  );
};

export default GoogleAuth;