const enteredUrl = document.getElementById("url");
const result = document.getElementById("output");

// Mock function to check URL existence on server
const checkUrlExistence = (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock server response true for exist false for non existence
      const isExistingAtServer = url.includes("google.com");
      resolve(isExistingAtServer);
    }, 1200);
  });
};

// Throttle function for limit the server requests
const throttle = (func, delay) => {
  let timer;
  return function (...rest) {
    if (!timer) {
      timer = setTimeout(() => {
        func(...rest);
        timer = null;
      }, delay);
    }
  };
};

// Function to update result
const updateResult = (isExistingAtServer) => {
  result.textContent = isExistingAtServer
    ? "URL exists in Server"
    : "URL does not exists in Server";
};

// Throttled URL existence check
const throttledCheck = throttle(async () => {
  const url = enteredUrl.value;
  if (url) {
    const isExistingAtServer = await checkUrlExistence(url);
    updateResult(isExistingAtServer);
  } else {
    result.textContent = "";
  }
}, 1500);

enteredUrl.addEventListener("input", throttledCheck);
