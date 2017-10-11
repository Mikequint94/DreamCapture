export const API_URL = 'https://dream-capture.herokuapp.com';

export const SESSION_URL = `${API_URL}/api/session`;
export const USERS_URL = `${API_URL}/api/users`;
export const DREAM_URL = (dreamId) => `${API_URL}/api/dreams/${dreamId}`;
