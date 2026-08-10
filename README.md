# AS Tour and Travels — Website

A ready-to-upload static website (plain HTML/CSS/JS — no build step needed).

## Files

- `index.html` — the main page (all sections)
- `privacy-policy.html`, `terms.html`, `refund-policy.html` — legal pages
- `style.css` — all styling
- `script.js` — mobile menu, scroll animations, and the train-booking form → WhatsApp

## 1. Before you publish — please edit these

- **Tour Packages** (`index.html`, search for `id="packages"`): the destinations, days and prices are **sample placeholders**. Replace them with your real, current packages and prices.
- **WhatsApp number / phone / email**: currently set to `+91 82985 00120` and `jharaja538@gmail.com` everywhere (search-and-replace if these ever change).
- Double-check the address block under "About Us" and "Contact" matches exactly what you want shown.

## 2. Put it on GitHub Pages (free hosting)

1. Create a new GitHub repository (e.g. `as-tour-and-travels`).
2. Upload all the files in this folder to the repository (drag-and-drop on github.com works, or use `git add . && git commit -m "site" && git push`).
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source: Deploy from a branch**, branch **main**, folder **/(root)**, then **Save**.
5. After a minute, GitHub will give you a live link like:
   `https://yourusername.github.io/as-tour-and-travels/`

That's it — no server, no database, nothing else to configure.

## 3. How the WhatsApp buttons work

Every "Book Now", "Enquire Now" and the floating green button is a plain link in the form:

```
https://wa.me/918298500120?text=your%20message%20here
```

Clicking it opens WhatsApp (app on mobile, WhatsApp Web on desktop) with your number and a pre-filled message — the visitor just taps send. The **train ticket form** builds this message automatically from whatever the visitor typed (From/To/Date/Passengers/Class) before opening WhatsApp.

## 4. Notes

- No booking is processed on the website itself — everything routes to your WhatsApp, exactly as requested.
- The site never claims "100% confirmed ticket" anywhere, in line with the instruction not to promise guarantees that can't legally be backed.
- All pages work without JavaScript too (content just won't fade in on scroll).
