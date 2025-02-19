function openPopup(message, status) {
    document.getElementById("message-text").textContent = message;

    if(status === 200){
        document.getElementById("message-text").style.color = "green";
    } else {
        document.getElementById("message-text").style.color = "red";
    }
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
    setTimeout(closePopup, 3000);
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}


document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(this); 
    
    fetch('sendMail.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            openPopup(`${data.message}`, 200);
            form.reset();
            
        }
    })
    .catch(error => {
        openPopup(`${error.message}`, 500);
        form.reset();
    });
});