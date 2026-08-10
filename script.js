https://script.google.com/macros/s/AKfycby1IOWyCzkVjopLhkZqXDdXsW-cmN5MA7Cw3I8eAGwKqomrgJrDFyr6Bgub2XgUKnai/exec



const phone = "918298500120";

function toggleMenu(){
  document.getElementById("navMenu").classList.toggle("nav-open");
}

function whatsappUrl(message){
  return "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
}

const defaultMessage = "Hello AS Tour & Travels, I need railway ticket booking assistance.";
document.getElementById("whatsappButton").href = whatsappUrl(defaultMessage);
document.getElementById("heroWhatsApp").href = whatsappUrl(defaultMessage);

function sendWhatsApp(event){
  event.preventDefault();
  const from = document.getElementById("from").value.trim();
  const to = document.getElementById("to").value.trim();
  const date = document.getElementById("date").value;
  const className = document.getElementById("className").value;
  const passengers = document.getElementById("passengers").value;
fetch(API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "text/plain;charset=utf-8"
  },
  body: JSON.stringify({
    from: from,
    to: to,
    date: date,
    className: className,
    passengers: passengers
  })
});
  const message =
    "Hello AS Tour & Travels,%0A%0A" +
    "I need railway ticket booking assistance.%0A" +
    "From: " + from + "%0A" +
    "To: " + to + "%0A" +
    "Journey Date: " + date + "%0A" +
    "Class/Type: " + className + "%0A" +
    "Passengers: " + passengers;

  window.open("https://wa.me/" + phone + "?text=" + message, "_blank");
}

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => document.getElementById("navMenu").classList.remove("nav-open"));
});
