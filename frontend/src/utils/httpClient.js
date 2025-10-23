/**
 * HTTP Client utility for making API requests
 */

/**
 * Default request headers
 */
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

/**
 * Parse the HTTP response
 */
const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();
    
    if (!response.ok) {
      throw {
        status: response.status,
        statusText: response.statusText,
        data
      };
    }
    
    return data;
  }
  
  if (!response.ok) {
    throw {
      status: response.status,
      statusText: response.statusText,
      data: await response.text()
    };
  }
  
  return response.text();
};

/**
 * HTTP GET request
 */
export const get = async (url, options = {}) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      ...options.headers
    },
    ...options
  });
  
  return parseResponse(response);
};

/**
 * HTTP POST request
 */
export const post = async (url, data, options = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...defaultHeaders,
      ...options.headers
    },
    body: JSON.stringify(data),
    ...options
  });
  
  return parseResponse(response);
};

/**
 * HTTP PUT request
 */
export const put = async (url, data, options = {}) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      ...defaultHeaders,
      ...options.headers
    },
    body: JSON.stringify(data),
    ...options
  });
  
  return parseResponse(response);
};

/**
 * HTTP PATCH request
 */
export const patch = async (url, data, options = {}) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      ...defaultHeaders,
      ...options.headers
    },
    body: JSON.stringify(data),
    ...options
  });
  
  return parseResponse(response);
};

/**
 * HTTP DELETE request
 */
export const del = async (url, options = {}) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      ...defaultHeaders,
      ...options.headers
    },
    ...options
  });
  
  return parseResponse(response);
};
