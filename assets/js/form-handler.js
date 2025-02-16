document.addEventListener("DOMContentLoaded", function () {
    const handleSubmit = event => {
      event.preventDefault(); // Prevent default form submission
  
      const myForm = event.target;
      const formData = new FormData(myForm);
  
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      })
        .then(() => alert("Mulțumim! Mesajul a fost trimis cu succes."))
        .catch(error => alert("Eroare la trimiterea formularului: " + error));
    };
  
    document.querySelector("#contact-form").addEventListener("submit", handleSubmit);
  });
  