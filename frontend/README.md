# Country Explorer

A simple and modern web application to explore countries around the world. Built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, using live data from the **REST Countries API**.

---

## What does this app do?

This project lets you browse countries, search for any nation by name or capital, filter them by continent, and sort them by population or area. Clicking on any country opens up a detailed page with more information like its official name, languages, currencies, timezones, neighboring borders, and a direct link to Google Maps.

---

## Features

- **Search:** Search countries instantly by their common name, official name, or capital city.
- **Filter by Region:** Quickly filter countries by continent (Africa, Americas, Asia, Europe, Oceania).
- **Sorting Options:**
  - Name (A to Z and Z to A)
  - Population (Highest first and Lowest first)
  - Area (Largest first)
- **Country Details Page (`/country/[name]`):**
  - High-quality flag display
  - Capital, region, subregion, population, and area
  - Spoken languages and currencies (with symbols)
  - Timezones
  - Clickable neighboring borders that take you directly to that country's page
  - Direct links to Google Maps and OpenStreetMap
- **Fast and Responsive:** Works smoothly on mobile, tablet, and desktop screens.
- **Loading & Error Handling:** Shows skeleton loaders while fetching data and includes a friendly error page if something goes wrong.

---

## Why are there 254 countries instead of 195?

While the United Nations officially recognizes **195 sovereign countries** (193 members + Vatican City and Palestine), the REST Countries API follows the **ISO 3166-1** standard. 

This standard includes not only sovereign nations, but also:
- **Dependent & Overseas Territories:** Places like Puerto Rico (US), Greenland (Denmark), Bermuda (UK), Guam (US), Hong Kong, and Aruba (Netherlands).
- **Special/Disputed Territories:** Such as Taiwan, Kosovo, and Antarctica.

That is why the total count in the API is 254.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **API:** REST Countries API (v5)

---

## How to Run Locally

### 1. Go to the frontend folder
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variable
Create a `.env.local` file inside the `frontend` folder (one is already provided) and add your API key:
```env
RESTCOUNTRIES_API_KEY=your_api_key_here
```

### 4. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── country/[name]/page.tsx   # Country details page
│   │   ├── layout.tsx                # App layout (navbar, footer, fonts)
│   │   ├── page.tsx                  # Home page (Server Component)
│   │   ├── loading.tsx               # Skeleton loading state
│   │   ├── error.tsx                 # Error boundary with retry button
│   │   └── not-found.tsx             # 404 page
│   ├── components/
│   │   ├── CountryCard.tsx           # Individual country card
│   │   ├── CountryExplorerClient.tsx # Search, filter, and sorting logic
│   │   ├── Navbar.tsx                # Top navigation bar
│   │   ├── Footer.tsx                # Simple footer
│   │   └── ui/                       # Reusable UI components (buttons, badges)
│   ├── lib/
│   │   ├── api.ts                    # REST Countries API fetch functions
│   │   └── utils.ts                  # Number formatting and helper functions
│   └── types/
│       └── country.ts                # TypeScript types for country data
├── .env.local                        # API key configuration
├── next.config.ts                    # Next.js config & allowed image domains
└── package.json
```

---

## Build for Production

To create an optimized production build:
```bash
npm run build
npm run start
```
