async function login() {
  var mobileNumber = document.getElementById('MobileNumber').value;
  var password = document.getElementById('password').value;

  // Check if the input field is empty
  if (
    mobileNumber.trim() == '' ||
    password.trim() == ''
  ) {
    alert('Please fill all fields');
    return false; // Prevent the form submission
  }
  try {
    const requestBody = {
      MobileNumber: mobileNumber,
      Password: password,
    };
    const requestHeaders = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'ccess-Control-Allow-Methods': 'POST'
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout set to 5 seconds (5000 milliseconds)

    const endpointUrl = 'http://localhost:8080/sign-in';


    fetch(endpointUrl, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        // Check if the response status is OK (200)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Parse the JSON response
        return response.json();
      })
      .then(data => {
        // Log the entire response for debugging
        console.log('Response:', data);
        if (data["Message"] == "200") {
          window.location.href = "roomSearch.html"
        } else {
          alert(data["Message"])
        }
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        alert(error)
      });
  } catch (error) {
    alert(error);
    console.error('There was a problem with the fetch operation:', error);
  }
  document.getElementById("login-form").reset();
}
