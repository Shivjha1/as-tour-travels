// Google Apps Script Web App URL
const API_URL = "https://script.google.com/macros/s/AKfycby1IOWyCzkVjopLhkZqXDdXsW-cmN5MA7Cw3I8eAGwKqomrgJrDFyr6Bgub2XgUKnai/exec";

// WhatsApp number in international format, without + or spaces.
const WHATSAPP_NUMBER = "918298500120";

function whatsappUrl(message) {
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

async function sendBookingToSheet(data) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        action: "submitCustomer",
        from: data.from,
        to: data.to,
        date: data.date,
        className: data.className,
        passengers: data.passengers,
        phone: data.phone
      })
    });
    return response.ok;
  } catch (error) {
    console.error("Google Sheet submission failed:", error);
    return false;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("year").textContent = new Date().getFullYear();

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.getElementById("mainNav");
  if (menuButton) {
    menuButton.addEventListener("click", () => nav.classList.toggle("open"));
  }

  const defaultMessage = "Hello AS Tour & Travels, I would like to enquire about your travel services.";
  const wa = whatsappUrl(defaultMessage);
  document.getElementById("heroWhatsApp").href = wa;
  document.getElementById("contactWhatsApp").href = wa;

  document.querySelectorAll(".package-enquire").forEach(link => {
    link.href = whatsappUrl("Hello AS Tour & Travels, I would like to enquire about a tour package.");
  });

  const form = document.getElementById("bookingForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const from = document.getElementById("from").value.trim();
    const to = document.getElementById("to").value.trim();
    const date = document.getElementById("date").value;
    const className = document.getElementById("className").value;
    const passengers = document.getElementById("passengers").value;
    const phone = document.getElementById("customerPhone").value.trim();

    const booking = { from, to, date, className, passengers, phone };

    status.textContent = "Sending enquiry...";

    const sheetSaved = await sendBookingToSheet(booking);

    const message =
      "Hello AS Tour & Travels,%0A%0A" +
      "Train Ticket Booking Enquiry%0A" +
      "From: " + encodeURIComponent(from) + "%0A" +
      "To: " + encodeURIComponent(to) + "%0A" +
      "Journey Date: " + encodeURIComponent(date) + "%0A" +
      "Class/Type: " + encodeURIComponent(className) + "%0A" +
      "Passengers: " + encodeURIComponent(passengers) + "%0A" +
      "Phone: " + encodeURIComponent(phone);

    window.open(
      "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + message,
      "_blank",
      "noopener"
    );

    status.textContent = sheetSaved
      ? "Enquiry sent. WhatsApp has been opened."
      : "WhatsApp has been opened. Please note: the Sheet could not be confirmed from the browser.";

    form.reset();
  });
});
