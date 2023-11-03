export const generateRandomId = () => {
  // Generate a random ID (you can use a more robust method if needed)
  return Math.random().toString(36).substring(2, 15);
};

export const slicedPlayerName = (playerName) => {
  const spaceIndex = playerName.indexOf(" ");
  if (spaceIndex !== -1) {
    const slicedName = playerName[0] + ". " + playerName.slice(spaceIndex + 1);
    return slicedName;
  } else {
    return playerName;
  }
}