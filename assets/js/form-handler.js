document.querySelector("#newsletter-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const messageDiv = document.querySelector("#form-message");

  fetch("/", {
      method: "POST",
      body: formData,
  })
  .then(() => {
      messageDiv.textContent = "Formular trimis cu succes!";
      messageDiv.style.backgroundColor = "#B19777";
      messageDiv.style.color = "#fff";
      messageDiv.style.display = "block";
      
      setTimeout(function() {
        messageDiv.style.display = "none";
    }, 3000);

    form.reset();
  })
  .catch((error) => {
      messageDiv.textContent = "Eroare la trimitere. Încearcă din nou.";
      messageDiv.style.backgroundColor = "#f44336";
      messageDiv.style.color = "#fff";
      messageDiv.style.display = "block";
      
      setTimeout(function() {
        messageDiv.style.display = "none";
    }, 3000);
  });
});