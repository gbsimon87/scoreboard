export const generateRandomId = () => {
  // Generate a random ID (you can use a more robust method if needed)
  return Math.random().toString(36).substring(2, 15);
};
