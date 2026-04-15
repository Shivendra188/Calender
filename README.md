#  Interactive Wall Calendar (React + Tailwind)

A modern, interactive calendar component inspired by a physical wall calendar design.
This project focuses on combining **aesthetic UI** with **real user interactions** like date range selection and note-taking.

---
##  Live Demo (Optional)

 https://calendershivendra.netlify.app/
 

##  Features

*  **Realistic Wall Calendar UI**

  * Inspired by physical hanging calendars
  * Includes custom SVG spiral binding for realism

*  **Accurate Calendar Logic**

  * Proper month rendering (previous + next month dates included)
  * Monday-first layout

*  **Date Range Selection**

  * Click or drag to select a range
  * Start, end, and in-between dates are visually highlighted

*  **Per-Day Notes**

  * Click any date to add notes
  * Notes are saved using `localStorage` (no backend required)

*  **Notebook-style Notes UI**

  * Styled textarea with realistic writing lines
  * Clean and intuitive writing experience

*  **Responsive Design**

  * Works smoothly on both desktop and mobile
  * Layout adapts using Tailwind CSS

*  **Modern UI/UX**

  * Smooth hover states
  * Clear visual hierarchy
  * Minimal and clean design

---

##  Tech Stack

* **React (Vite)** – component-based architecture
* **Tailwind CSS** – utility-first styling
* **Day.js** – lightweight date manipulation
* **SVG** – for realistic spiral binding UI
* **localStorage** – for client-side persistence

---

##  Project Structure

```
src/
├── components/
│   └── Calendar.jsx
├── App.jsx
├── main.jsx
└── index.css
```

---

##  How to Run Locally

### 1. Clone the repository

```
git clone https://github.com/Shivendra188/Calender.git
cd calendar-app
```


### 2. Install dependencies

```
npm install
```

### 3. Start development server

```
npm run dev
```

### 4. Open in browser

```
http://localhost:5173
```

---

##  Key Implementation Decisions

* **SVG for Binding:**
  Instead of simple CSS, SVG was used to create a realistic spiral binding for a more authentic wall calendar feel.

* **Custom Calendar Logic:**
  Built manually (instead of using libraries) to demonstrate understanding of date calculations and rendering.

* **Range Selection UX:**
  Implemented using mouse events (`onMouseDown`, `onMouseEnter`, `onMouseUp`) to simulate real calendar interactions.

* **Local Storage for Notes:**
  Keeps the project frontend-only while still providing persistence.

* **Tailwind CSS:**
  Used for fast, responsive styling and consistent design.

---

##  Future Improvements

*  Dark mode support
*  Holiday highlights (India-specific)
*  Animations (page flip / transitions)
*  Touch drag support for mobile
*  Multiple month view (like booking apps)

---



##  Live Demo (Optional)

 https://calendershivendra.netlify.app/

---

##  Final Note

This project was built to demonstrate both **UI craftsmanship** and **frontend engineering skills**, focusing on detail, usability, and clean component design.

---

 If you like this project, feel free to star the repo!
