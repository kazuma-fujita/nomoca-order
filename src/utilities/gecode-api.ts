import axios from 'axios';

export const GOOGLE_GEOCODE_BASE_URL = process.env.NEXT_PUBLIC_GOOGLE_GEOCODE_BASE_URL as string;
export const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;

export const geocodeAPI = axios.create({
  method: 'GET',
  baseURL: GOOGLE_GEOCODE_BASE_URL,
  params: { language: 'ja', components: 'country:JP', key: GOOGLE_API_KEY },
});
