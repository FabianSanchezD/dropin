# ⚡ Drop-In

Drop-In is a platform for students to create spontaneous meetups around campus — for studying, hanging out, and encouraging face-to-face reunions with friends or making new ones!

## 🚀 Features

- 🎯 **Personalized Account Creation**  
  Students can create their own account and choose their interests, campus, and name. All data is securely stored and not visible to Drop-In administrators and contributors.

- 📅 **Meetup Creation**  
  Students can create meetups for others to join. They specify a title, description, interest, location, attendee limit, and more.

- 📊 **Meetup Dashboard**  
  Students can view all meetups related to their interests or located on their campus. Meetups are categorized into:
  - Recommended
  - Live
  - Upcoming

- 🤝 **Join a Meetup**  
  Students can join meetups, view participants, and track how many more attendees are allowed to join.

---

## 🧠 Tech Stack

### Frontend
- ⚛️ [React](https://react.dev/) – Component-based UI library
- 🎨 [TailwindCSS](https://tailwindcss.com/) – Utility-first CSS framework

### Backend
- ⚡ [Supabase](https://supabase.com/) – Auth, database, and background jobs

---

## 🗂️ File Structure

```
public/
  ├─ dropin-icon.png
  ├─ dropin-notext.png
  └─ dropin-text.png

src/
  ├─ components/
  │   ├─ Footer.jsx
  │   ├─ Navbar.jsx
  │   └─ NavbarProfile.jsx
  ├─ layouts/
  │   ├─ DashboardLayout.jsx
  │   ├─ MainLayout.jsx
  │   └─ ProfileLayout.jsx
  ├─ routes/
  │   ├─ About.jsx
  │   ├─ Dashboard.jsx
  │   ├─ Home.jsx
  │   ├─ Login.jsx
  │   ├─ MeetupCreation.jsx
  │   ├─ MeetupPage.jsx
  │   ├─ NotFound.jsx
  │   ├─ ProfileDetails.jsx
  │   ├─ ProfileStarter.jsx
  │   └─ ProfileUpdater.jsx
  ├─ App.css
  ├─ App.jsx
  ├─ index.css
  ├─ main.jsx
  ├─ supabase-client.js
.env
.gitignore
eslint.config.js
index.html
package.json
package-lock.json
vite.config.js
README.md
```

---

## 🛠️ Getting Started

To run the project locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

> ⚠️ Make sure to create a `.env` file and add your Supabase environment variables (e.g. `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).

---

## 🌟 Show Your Support

If you find this project useful, please give it a ⭐ on GitHub, it helps others discover it!

---

## 👨‍💻 Maintainer and Contributions

Maintained by [Fabian Sanchez](https://github.com/FabianSanchezD/).
Feel free to contribute by reporting an issue or asking to solve one!

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute it for your own projects.
