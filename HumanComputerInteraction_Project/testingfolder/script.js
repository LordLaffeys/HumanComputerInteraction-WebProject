document.addEventListener("DOMContentLoaded", function() {
  var openPopupBtn = document.getElementById("openPopupBtn");
  var popup = document.getElementById("popup");
  var closeBtn = document.querySelector(".close-btn");

  openPopupBtn.onclick = function() {
      popup.style.display = "block";
  }

  closeBtn.onclick = function() {
      popup.style.display = "none";
  }

  window.onclick = function(event) {
      if (event.target == popup) {
          popup.style.display = "none";
      }
  }
});
