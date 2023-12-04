
// input fields and button
const updateBtn = document.querySelector("#updateBtn");
// forms
const statusForm = document.forms.statusForm;

statusForm.addEventListener("submit", async function (e) {
    e.preventDefault();


    const newdescTitle = statusForm.elements.descTitle.value;
    console.log('New Description Title', newdescTitle);
    try {
        const response = await fetch('/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({descTitle: newdescTitle })
        });

        if (response.ok) {
            location.reload(); // Refresh the page on successful update
        } else {
            console.error('Error updating status');
            updateError.textContent = 'Error updating status';
        }
    } catch (error) {
        console.error('Error:', error);
        updateError.textContent = 'Error updating status';
    }
});