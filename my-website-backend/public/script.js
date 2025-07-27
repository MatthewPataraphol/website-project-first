window.addEventListener('scroll', function() {
    const distance = window.scrollY;
    const header = document.querySelector('h1');
  
    // Calculate the opacity based on the scroll distance
    const opacity = distance > 100 ? 1 : distance / 100;
  
    // Set the colors based on the scroll distance and opacity
    if (distance > 100) {
      header.style.color = 'black';
    } else {
      const startColor = [80, 80, 80]; // RGB values for black
      const endColor = [0, 0, 0]; // RGB values for blue
      const interpolatedColor = startColor.map((channel, index) =>
        Math.round(channel + (endColor[index] - channel) * opacity)
      );
      header.style.color = `rgb(${interpolatedColor.join(',')})`;
    }
});

///////////////////////////////////////////////////////////////////////////////////////////
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const statusDiv = document.getElementById("form-status");

    fetch("/contact", {
      method: "POST",
      body: new URLSearchParams(formData),
    })
      .then((res) => {
        if (res.ok) {
          statusDiv.textContent = "Message sent successfully!";
          statusDiv.style.color = "lightgreen";
          form.reset();

          // Hide the message after 3 seconds
          setTimeout(() => {
            statusDiv.textContent = "";
          }, 2000);
        } else {
          statusDiv.textContent = "Something went wrong.";
          statusDiv.style.color = "red";

          setTimeout(() => {
            statusDiv.textContent = "";
          }, 2000);
        }
      })
      .catch(() => {
        statusDiv.textContent = "Network error.";
        statusDiv.style.color = "red";

        setTimeout(() => {
            statusDiv.textContent = "";
        }, 2000);
      });
  });
}