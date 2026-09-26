// Server entry point: loads .env, then starts the app built in app.ts.
// Kept separate from app.ts so tests can import the app without opening a port.
import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🧙‍♂️`);
});
