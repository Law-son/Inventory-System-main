
document.getElementById('logout-button').addEventListener('click', async () => {
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch('http://127.0.0.1:8000/accounts/logout/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
        });

        if (!response.ok) throw new Error('Logout failed');

        localStorage.removeItem('authToken'); // Remove token
        // Redirect or perform any other action on success
        window.location.href = '/public/index.html';
        alert('Logged out successfully');
    } catch (error) {
        console.error('Error:', error);
    }
});
