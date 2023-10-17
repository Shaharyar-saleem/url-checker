const enteredUrl = document.getElementById("url");
const result = document.getElementById("output");
let lastInputTimestamp = 0; // Initialize the last input timestamp

// Function to check if a URL has a valid format
function isValidURL(url) {
  const pattern =
    /^(https?:\/\/)?([A-Za-z0-9-]+\.)*[A-Za-z0-9-]+(:\d{2,5})?(\/\S*)?$/;
  return pattern.test(url);
}

// Mock server function to check URL existence and type (simulated async)
const checkUrlExistenceAndType = (url, timestamp) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (timestamp >= lastInputTimestamp) {
        // Mock server response (true for exist, false for non-existence, type based on URL)
        const isExistingAtServer = url.includes("google.com");
        const isFolder = url.endsWith("/");
        resolve({ exists: isExistingAtServer, isFolder });
      }
    }, 1200);
  });
};

// Throttle function for limiting server requests
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
const updateResult = (exists, isFolder) => {
  if (exists) {
    result.textContent = isFolder
      ? "URL exists and is a folder."
      : "URL exists and is a file.";
  } else {
    result.textContent = "URL does not exist.";
  }
};

// Throttled URL existence check
const throttledCheck = throttle(async () => {
  const url = enteredUrl.value;
  if (url) {
    if (!isValidURL(url)) {
      result.textContent = "Invalid URL format.";
      return;
    }

    lastInputTimestamp = Date.now();
    const { exists, isFolder } = await checkUrlExistenceAndType(
      url,
      lastInputTimestamp
    );
    updateResult(exists, isFolder);
  } else {
    result.textContent = "";
  }
}, 1500);

enteredUrl.addEventListener("input", throttledCheck);
