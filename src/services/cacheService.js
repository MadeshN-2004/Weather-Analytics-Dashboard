const CACHE_DURATION = 60000; // 60 seconds
const cache = {};

export const isCacheValid = (key) => {
  const cached = cache[key];
  if (!cached) return false;
  return Date.now() - cached.timestamp < CACHE_DURATION;
};

export const getCachedData = (key) => {
  return cache[key]?.data;
};

export const setCachedData = (key, data) => {
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
};

export const clearCache = () => {
  Object.keys(cache).forEach(key => delete cache[key]);
};