# weather-observatory
A smart weather dashboard powered by the [WeatherAI API](https://weather-ai.co/docs).  
Search any city to see current conditions, a 7-day forecast, and an AI-generated weather summary.

## Tech Stack

- **Frontend:** React + Vite, react-bits, Axios
- **Backend:** Node.js, Express, Morgan (logging), Axios
- **Deployment:** Vercel

## Architecture
The backend acts as a secure proxy — the WeatherAI API key is never exposed to the browser.

## Getting Started

### Prerequisites
- Node.js v18+
- A WeatherAI API key from [weather-ai.co](https://weather-ai.co)

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/weather-observatory.git
cd weather-observatory
```

### 2. Set up the backend
```bash
cd server
npm install
cp .env.example .env
# Add your API key to .env
npm run dev
```

### 3. Set up the frontend
```bash
cd ../client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Environment Variables

### server/.env
| Variable | Description |
|---|---|
| `PORT` | Server port (default: 3001) |
| `WEATHER_AI_API_KEY` | Your WeatherAI API key |
| `WEATHER_AI_BASE_URL` | `https://api.weather-ai.co` |

### client/.env
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend URL (default: `http://localhost:3001/api`) |

## Live Demo
