import axios from 'axios';

// Alternative: Use OpenUV API (free tier available)
// Sign up at https://www.openuv.io/
const OPENUV_API_KEY = process.env.REACT_APP_OPENUV_API_KEY;

export const getUVIndex = async (lat, lon) => {
  try {
    const response = await axios.get('https://api.openuv.io/api/v1/uv', {
      headers: {
        'x-access-token': OPENUV_API_KEY
      },
      params: { lat, lng: lon }
    });
    return response.data.result.uv;
  } catch (error) {
    console.error('UV Index fetch error:', error);
    return null;
  }
};