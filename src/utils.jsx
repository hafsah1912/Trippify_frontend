export const decodeUsername = (username) => {
    try {
      if (!username) return null;
  
      // Check if the username is Base64 encoded (usually alphanumeric with '=' padding)
      if (/^[A-Za-z0-9+/=]+$/.test(username)) {
        return atob(username).trim(); // Decode from Base64
      }
  
      return decodeURIComponent(username).trim(); // Decode from URL encoding
    } catch (error) {
      console.error("Error decoding username:", error);
      return null;
    }
  };
  