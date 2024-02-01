function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@$%^&*()-_=+[]{}|;:,.?';
  let randomString = '';

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomChar = characters.charAt(randomIndex);

    if (randomChar !== '/') {
      randomString += randomChar;
    } else {
      i--; // Repeat the loop iteration if the character is '/'
    }
  }

  return randomString;
}

module.exports = {
  generateRandomString,
};
