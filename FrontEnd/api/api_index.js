const API_URL = 'http://www.dream-capture.com';

export const SIGNIN_URL = `${API_URL}/api/session`;
export const SIGNUP_URL = `${API_URL}/api/users`;
export const DREAM_URL = (dreamId) => `${API_URL}/dreams/${dreamId}`;
