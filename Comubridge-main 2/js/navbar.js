$(document).ready(function() {
    // Toggle menu on click
    $("#menu-toggler").click(function() {
      toggleBodyClass("menu-active");
      toggleBodyClass("body_overflow_hidden");
    });
  
    function toggleBodyClass(className) {
      document.body.classList.toggle(className);
    }
  
   });