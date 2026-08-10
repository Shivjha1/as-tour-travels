// ===========================================================================
// AS TOUR AND TRAVELS — site script
// Everything funnels toward WhatsApp: (a) static wa.me anchors already carry
// prefilled text in the HTML, (b) the train ticket form below assembles a
// message from the fields and opens WhatsApp with it.
// ===========================================================================

const WHATSAPP_NUMBER = "918298500120"; // +91 82985 00120

document.addEventListener("DOMContentLoaded", () => {
  /* ---- mobile nav toggle ---- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("nav-links-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navLinks.style.display = open ? "flex" : "";
    });
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navLinks.classList.remove("nav-links-open");
        navLinks.style.display = "";
      })
    );
  }

  /* ---- scroll reveal ---- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---- train ticket enquiry form -> WhatsApp ---- */
  const trainForm = document.getElementById("train-form");
  if (trainForm) {
    trainForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(trainForm);
      const from = (data.get("from") || "").toString().trim();
      const to = (data.get("to") || "").toString().trim();
      const date = (data.get("date") || "").toString().trim();
      const passengers = (data.get("passengers") || "").toString().trim();
      const travelClass = (data.get("travelClass") || "").toString().trim();
      const name = (data.get("name") || "").toString().trim();

      if (!from || !to || !date) {
        trainForm.querySelector(".form-error")?.remove();
        const err = document.createElement("p");
        err.className = "form-error";
        err.style.color = "#b03a2e";
        err.style.fontFamily = "var(--font-mono)";
        err.style.fontSize = "0.85rem";
        err.textContent = "Kripya From, To aur Journey Date bharein.";
        trainForm.prepend(err);
        return;
      }

      const lines = [
        "Namaste AS Tour and Travels,",
        "Mujhe train ticket book karani hai:",
        `From: ${from}`,
        `To: ${to}`,
        `Journey Date: ${date}`,
        passengers ? `Passengers: ${passengers}` : null,
        travelClass ? `Class: ${travelClass}` : null,
        name ? `Naam: ${name}` : null,
      ].filter(Boolean);

      const message = encodeURIComponent(lines.join("\n"));
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    });
  }

  /* ---- current year in footer ---- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});
