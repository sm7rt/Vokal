// Api
import apisauce from 'apisauce';

// Base URL
const baseURL = process.env.REACT_APP_API_URL;

//
// Create and configure an apisauce-based api object.
//
export const api = apisauce.create({
  // base URL is read from the "constructor"
  baseURL,
  // here are some default headers
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache'
  },
  // 30 second timeout...
  timeout: 30000
});
