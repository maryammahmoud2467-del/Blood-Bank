import express from "express";
import cors from "cors";

import bloodRequestRouter from "./routes/BloodRequest.routes";
import donorRouter from "./routes/Donor.routes";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/health", (_request, response) => {
  response.json({ success: true, message: "Blood Bank API is running" });
});

app.use("/api/blood-requests", bloodRequestRouter);
app.use("/api/donors", donorRouter);

export default app;