# AI ML Studio — Machine Learning Project Showcase

A single, unified dashboard presenting five machine learning demo applications:

1. **House Price Prediction** — Linear Regression
2. **Customer Segmentation** — K-Means Clustering
3. **Cat vs Dog Classification** — Support Vector Machine (SVM)
4. **Hand Gesture Recognition** — Computer Vision / Gesture Classification
5. **Food Recognition & Calorie Estimation** — Image Classification

Built with React, Vite, Tailwind CSS, Recharts and Lucide icons. Includes a guided **Jury Demo Mode** for
live presentation to a professor or panel.

---

## 1. Install & Run (VS Code)

**Requirements:** Node.js 18+ and npm.

```bash
# 1. Open this folder in VS Code
code ai-ml-studio

# 2. Open a terminal in VS Code (Terminal → New Terminal) and install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The terminal will print a local URL — usually **http://localhost:5173**. Open it in your browser.

To build a production bundle:

```bash
npm run build
npm run preview   # serve the production build locally
```

---

## 2. Project Structure

```
ai-ml-studio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx              # App entry, router setup
    ├── App.jsx                # Route table + shared layout (sidebar/topbar)
    ├── index.css               # Tailwind layers + design tokens (glass, buttons, inputs)
    ├── lib/
    │   └── demoEngine.js       # All simulated "model" logic lives here (see below)
    ├── data/
    │   └── projects.js         # Shared metadata: project list, nav items, methodology steps
    ├── components/
    │   ├── Sidebar.jsx
    │   ├── Topbar.jsx
    │   ├── UI.jsx               # PageHeader, DemoBadge, DemoNotice, BackendNotice, StatCard
    │   └── JuryDemoMode.jsx     # Guided walkthrough modal (Start Jury Demo)
    └── pages/
        ├── Home.jsx             # Landing page (hero + 5 project cards)
        ├── Dashboard.jsx        # Stats, charts, recent projects
        ├── HousePrice.jsx       # Task 01
        ├── CustomerSegmentation.jsx  # Task 02
        ├── CatDog.jsx           # Task 03
        ├── HandGesture.jsx      # Task 04
        ├── FoodRecognition.jsx  # Task 05
        ├── Results.jsx          # Status table for all 5 tasks
        ├── Methodology.jsx      # Pipeline breakdown per task
        ├── About.jsx
        └── NotFound.jsx
```

---

## 3. What currently uses demo data

**Every prediction in this build is simulated on the client** — there is no Python/FastAPI/Flask backend
wired up. All simulated logic is isolated in **`src/lib/demoEngine.js`**:

| Function | Powers |
|---|---|
| `predictHousePrice()` | Task 01 — House Price Prediction |
| `generateCustomerDataset()`, `classifyCustomer()` | Task 02 — Customer Segmentation |
| `classifyCatDog()` | Task 03 — Cat vs Dog Classification |
| `classifyGesture()` | Task 04 — Hand Gesture Recognition |
| `analyzeFoodImage()` | Task 05 — Food Recognition |

Every result screen carries a visible **"Demo Prediction" / "Demo Classification" / "Demo Recognition" /
"Demo AI Analysis"** badge so it's always clear to a viewer (or a jury) that no real trained model produced
the number on screen. The camera on the Hand Gesture page is a **real** browser camera feed — only the
gesture classification itself is simulated.

---

## 4. Connecting a real ML backend

The frontend is intentionally decoupled from the "model" logic so a real backend can be dropped in without
touching any page component:

1. Build a Python API (FastAPI or Flask is a natural fit) with one endpoint per task, e.g.
   `POST /api/house-price`, `POST /api/customer-segment`, `POST /api/classify/cat-dog`,
   `POST /api/classify/gesture`, `POST /api/classify/food`.
2. In `src/lib/demoEngine.js`, replace the body of the relevant function with a `fetch()` call to your
   endpoint, keeping the same return shape (e.g. `predictHousePrice` should still resolve to
   `{ price, confidence, range, breakdown }`).
3. Remove or relabel the "Demo Prediction" badges in `src/components/UI.jsx` once real inference is live.
4. If you want real accuracy metrics, populate them on `src/pages/Results.jsx` — the project intentionally
   avoids inventing accuracy numbers.

Example swap for house price prediction:

```js
// Before (demo):
export function predictHousePrice(input) {
  // local calculation…
}

// After (real backend):
export async function predictHousePrice(input) {
  const res = await fetch('/api/house-price', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  return res.json() // must resolve to { price, confidence, range, breakdown }
}
```

---

## 5. Jury Demo Mode

Click **"Start Jury Demo"** in the sidebar, topbar, or home page to open a guided modal that steps through
all five tasks in order. Each step shows a short explanation, a **Run Demo** button that produces a live
(simulated) result, and **Next / Back** controls — designed for presenting to a professor or panel without
needing to navigate the full app manually. "Open Full Page" on any step jumps to that task's real page.

---

## 6. Notes

- Routing uses `HashRouter`, so the app works correctly from a static file server or `npm run preview`
  without extra server configuration for client-side routes.
- All charts (bar, pie, scatter) use Recharts and render from data in `src/lib/demoEngine.js` /
  `src/data/projects.js` — no external API calls.
- No real model accuracy, precision or recall values are shown anywhere in the UI, since no model has
  actually been trained in this build.
