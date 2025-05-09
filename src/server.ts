import "dotenv/config";
import app from "./app";
import connectDB from "./db/db";

const PORT = process.env.PORT || 3333;

connectDB()

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
