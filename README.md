# URL Existence Checker

This is a simple browser application that allows users to check if a given URL exists. The application checks the validity of the URL format and queries a mock server to determine if the URL exists. It supports checking URL and using the results in `.includes()` functions.

## Features

- Check the validity of a URL format.
- Check if a URL exists.
- Use the results in `.includes()` functions or any other desired operations.

## How to Use

1. Application deployed version can be checked on: http://url-checker.surge.sh/

2. Open the HTML file in your web browser to run the application.

3. Enter a URL in the input field and the application will check its existence.

## Mock URL Existence Check Function

The application uses a mock function to check the existence of URLs. The `checkUrlExistence` function checks the existence of a URL and returns `true` for URLs containing "google.com" and `false` for others. This function is for demonstration purposes; you can replace it with actual server requests.

```javascript
const checkUrlExistence = (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock server response (true for exist, false for non-existence)
      const isExistingAtServer = url.includes("google.com");
      resolve(isExistingAtServer);
    }, 1200);
  });
};
```
