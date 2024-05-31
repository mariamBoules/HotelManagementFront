async function submitForm() {
  var fullName = document.getElementById('FullName').value;
  var mail = document.getElementById('Mail').value;
  var mobileNumber = document.getElementById('MobileNumber').value;
  var password = document.getElementById('Password').value;
  var gender = document.getElementById('Gender').value;
  var birthDate = document.getElementById('BirthDate').value;

  // Check if the input field is empty
  if (
    fullName.trim() === '' ||
    mail.trim() == '' ||
    mobileNumber.trim() == '' ||
    password.trim() == '' ||
    gender.trim() == '' ||
    birthDate.trim() == ''
  ) {
    alert('Please fill all fields');
    return false; // Prevent the form submission
  }
  try {
    const requestBody = {
      FullName: fullName,
      Mail: mail,
      MobileNumber: mobileNumber,
      Password: password,
      Gender: gender,
      BirthDate: birthDate,
    };
    const requestHeaders = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'ccess-Control-Allow-Methods': 'POST'
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout set to 5 seconds (5000 milliseconds)

    const endpointUrl = 'http://localhost:8085/register-user';

    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(requestBody), // Convert the data to a JSON string
      signal: controller.signal, // Associate the signal with the request
    });

    if (!response.ok) {
      alert('not ok');
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json(); // Assuming the response is JSON
    clearTimeout(timeoutId); // Clear the timeout
    alert(JSON.stringify(data));
    console.log('Success:', data); // Handle the response data    
  } catch (error) {
    alert(error);
    console.error('There was a problem with the fetch operation:', error);
  }
  document.getElementById("signup-form").reset();
}
