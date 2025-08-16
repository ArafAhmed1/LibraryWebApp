const LOCAL_STORAGE_KEY = "currentUserId";

// Set the current user ID
export const setCurrentUserId = (id) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, id);
};

// Get the current user ID
export const getCurrentUserId = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEY);
};

// Clear the current user ID
export const clearCurrentUserId = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};
