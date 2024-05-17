document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const token = document.getElementById('token').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });

        if (response.ok) {
            window.location.href = '/view-students.html';
        } else {
            alert('Invalid token. Please try again.');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Error logging in. Please try again.');
    }
});

