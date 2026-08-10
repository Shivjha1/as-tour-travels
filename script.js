// AS Tour & Travels — WhatsApp-only enquiries
// IMPORTANT: replace the value below with your WhatsApp number in international format,
// without +, spaces or dashes. Example for India: 919876543210
const WHATSAPP_NUMBER = "PUT_YOUR_WHATSAPP_NUMBER_HERE";

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

function whatsappLink(message = "Hello AS Tour & Travels, I want to enquire about a travel booking.") {
  if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER.includes("PUT_YOUR")) return "#contact";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function setWhatsAppLinks() {
  ["whatsappHero", "whatsappContact"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = whatsappLink();
  });
}
setWhatsAppLinks();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

// Booking enquiries are sent directly to WhatsApp. No Google Sheet or Apps Script is used.
const bookingForm = document.getElementById("bookingForm");
const statusEl = document.getElementById("formStatus");
bookingForm?.addEventListener("submit", event => {
  event.preventDefault();
  if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER.includes("PUT_YOUR")) {
    statusEl.textContent = "Please add your WhatsApp number in script.js first.";
    statusEl.style.color = "#b42318";
    return;
  }

  const data = Object.fromEntries(new FormData(bookingForm).entries());
  const message = `Hello AS Tour & Travels!%0A%0A*Train Booking Enquiry*%0A%0A*Passenger:* ${data.passengerName}%0A*Phone/WhatsApp:* ${data.phone}%0A*From:* ${data.from}%0A*To:* ${data.to}%0A*Journey Date:* ${data.journeyDate}%0A*Passengers:* ${data.passengers}%0A*Class:* ${data.classPreference}%0A*Message:* ${data.message || "None"}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener");
  statusEl.textContent = "WhatsApp opened with your enquiry. Please tap Send in WhatsApp.";
  statusEl.style.color = "#168a45";
});

const policies = {
  privacy: {
    title: "Privacy Policy",
    text: `<p>When you use this website, your booking details are placed into a WhatsApp message so you can send them directly to AS Tour & Travels. The website does not store your booking enquiry in a Google Sheet or website database.</p><p>WhatsApp may process messages according to its own privacy practices. Do not send passwords, payment PINs, OTPs or other highly sensitive information.</p>`
  },
  terms: {
    title: "Terms & Conditions",
    text: `<p>All booking requests are enquiries only and are subject to availability, supplier rules, applicable taxes/fees and the information provided by the customer.</p><p>A WhatsApp enquiry is not a confirmed ticket or reservation until the applicable booking provider confirms it.</p><p>We do not promise or advertise a 100% confirmed ticket guarantee.</p>`
  },
  refund: {
    title: "Refund / Cancellation Policy",
    text: `<p>Refunds and cancellations depend on the rules of the railway, airline, bus operator, hotel, cab provider or tour supplier involved.</p><p>Any service charges or non-refundable amounts will be communicated where applicable before proceeding. Customers should confirm the final cancellation and refund terms for their booking.</p>`
  }
};
const dialog = document.getElementById("policyDialog");
const policyTitle = document.getElementById("policyTitle");
const policyText = document.getElementById("policyText");
function openPolicy(key) {
  const p = policies[key];
  if (!p) return;
  policyTitle.textContent = p.title;
  policyText.innerHTML = p.text;
  dialog.showModal();
}
document.querySelectorAll("a[href^='#']").forEach(a => {
  const key = a.getAttribute("href").slice(1);
  if (policies[key]) a.addEventListener("click", e => { e.preventDefault(); openPolicy(key); });
});
document.querySelector(".dialog-close")?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });


/* Premium scroll reveal */
document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(
    "section, .card, .service-card, .package-card, .feature-card, .tour-card, .info-card"
  );
  targets.forEach(el => el.classList.add("reveal"));

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.12, rootMargin:"0px 0px -35px 0px"});

  targets.forEach(el => io.observe(el));
});
