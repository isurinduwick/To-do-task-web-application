/**
 * API base URL and endpoints
 */
export const API_BASE_URL = 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  TASKS: `${API_BASE_URL}/tasks`
};

/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};
