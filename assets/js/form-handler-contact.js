document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(this); 
    const messageDiv = document.getElementById('responseMessage');

    
    fetch('sendMail.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            messageDiv.textContent = "Formular trimis cu succes!";;
            messageDiv.style.backgroundColor = "#B19777";
            messageDiv.style.color = "#fff";
            messageDiv.style.display = "block";
            messageDiv.style.padding = "5px";
            messageDiv.style.fontSize = "20px";

            setTimeout(function() {
                messageDiv.style.display = "none";
            }, 3000);
        
            form.reset();
            
        }
    })
    .catch(error => {
        messageDiv.textContent = "Eroare la trimitere. Încearcă din nou.";
        messageDiv.style.backgroundColor = "#f44336";
        messageDiv.style.color = "#fff";
        messageDiv.style.display = "block";
        messageDiv.style.padding = "5px";
        messageDiv.style.fontSize = "20px";

        setTimeout(function() {
            messageDiv.style.display = "none";
        }, 3000);
    });
});
