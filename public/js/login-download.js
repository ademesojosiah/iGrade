document.getElementById('logout-link').addEventListener('click', async (event) => {
    event.preventDefault();
    try {
        const response = await fetch('/logout', { method: 'POST' });
        if (response.ok) {
            window.location.href = '/';
        } else {
            alert('Error logging out.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error logging out.');
    }
});

document.getElementById('download-btn').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/download-csv');    
        if (response.status === 401) {
            window.location.href = '/';
            alert('signup !!!');
            return;
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'students.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error downloading CSV:', error);
        alert('Error downloading CSV');
    }
});