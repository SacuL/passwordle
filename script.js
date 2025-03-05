const commonPasswords = [
  "123456",
  "password",
  "123456789",
  "12345678",
  "qwerty",
  "abc123",
  "password1",
  "111111",
  "123123",
  "admin",
];

let targetPassword = commonPasswords[Math.floor(Math.random() * commonPasswords.length)];

document.getElementById("more-keys").addEventListener("click", () => {
  alert("Here's every character imaginable! Good luck. 😆");
});

// More logic for input handling and feedback will be added next
