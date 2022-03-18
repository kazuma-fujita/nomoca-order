import axios from 'axios';
import { GOOGLE_API_KEY, GOOGLE_GEOCODE_BASE_URL } from 'constants/google-api-key';

export const geocodeAPI = axios.create({
  method: 'GET',
  baseURL: GOOGLE_GEOCODE_BASE_URL,
  params: { language: 'ja', components: 'country:JP', key: GOOGLE_API_KEY },
});
