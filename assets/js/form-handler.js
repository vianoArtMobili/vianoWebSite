function openPopup(message, status) {
  
  document.getElementById("popup").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  if(status === 200){
    document.getElementById("message-text").style.color = "green";
  } else {
    document.getElementById("message-text").style.color = "red";
  }
  document.getElementById("message-text").textContent = message;
  setTimeout(closePopup, 3000);
}
function closePopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}
