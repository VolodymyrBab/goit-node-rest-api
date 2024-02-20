import app from "./app.js";
import { connectDB } from "./db/mongoConnect.js";

const port = process.env.PORT ?? 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running. Use our API on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();