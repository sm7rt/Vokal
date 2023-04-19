// a library to wrap and simplify api calls
import apisauce from 'apisauce';

// Base URL
const baseURL = process.env.REACT_APP_API_URL_AVAILABILITY;

// ------
// STEP 1
// ------
//
// Create and configure an apisauce-based api object.
//
export const api = apisauce.create({
  // base URL is read from the "constructor"
  baseURL,
  // here are some default headers
  headers: {
    'Cache-Control': 'no-cache'
  },
  // 10 second timeout...
  timeout: 10000
});
