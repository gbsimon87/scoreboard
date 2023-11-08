const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 15);
};

const slicedPlayerName = (playerName) => {
  const spaceIndex = playerName.indexOf(" ");
  if (spaceIndex !== -1) {
    const slicedName = playerName[0] + ". " + playerName.slice(spaceIndex + 1);
    return slicedName;
  } else {
    return playerName;
  }
}

// Retrieve data from local storage
const getLocalStorage = (key) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error('Error reading from local storage:', error);
    return null;
  }
}

// Save data to local storage
const setLocalStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error('Error writing to local storage:', error);
  }
}

// Export the functions for use in your code
export {
  generateRandomId,
  getLocalStorage,
  setLocalStorage,
  slicedPlayerName
};
