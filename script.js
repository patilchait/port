
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const sectionId = this.getAttribute('href').substring(1);
        const section = document.getElementById(sectionId);

        if (section) {
            section.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


document.getElementById('Contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

   
    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const message = document.querySelector('textarea[name="message"]').value.trim();

    
    if (!isValidName(name)) {
        alert('Please enter a valid name (without numbers).');
        return;
    }

    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

   
    if (message === '') {
        alert('pls enter the message.');
        return;
    }

    
    fetch(this.getAttribute('action'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert('Message sent successfully!');
        this.reset(); // Clear form inputs
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was a problem sending your message. Please try again later.');
    });
});


function isValidName(name) {
    return /^[a-zA-Z ]+$/.test(name);
}


function isValidEmail(email) {
    
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
