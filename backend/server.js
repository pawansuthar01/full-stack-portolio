import { config } from "dotenv";
config();
import app from "./App.js";
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`https://localhost:${PORT}`);
});
