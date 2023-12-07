document.getElementById('edit-user-form-{{user.userId}}').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from being submitted in the default way
   
    // Get the form data
    const formData = new FormData(event.target);
   console('edit profile client');
    // Convert the form data to an object
    const data = Object.fromEntries(formData.entries());
   
    // Send the form data to the server
    fetch('/edit-profile/{{user.userId}}', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      // Handle the server response
      console.log(data);
      console('edit profile client fetched');
    })
    .catch((error) => {
      // Handle any errors
      console.error('Error:', error);
    });
   });
   