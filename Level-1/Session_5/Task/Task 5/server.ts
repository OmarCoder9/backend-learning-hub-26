import express from "express";
import fleetRouter from "./router/fleetRouter";
import { logger } from "./middleware/logger";
import { validateMicrobus } from "./middleware/validateMicrobus";

const app = express();

app.use(express.json());
app.use(logger);
app.use(validateMicrobus);
app.use(fleetRouter);

const PORT: number = 3000;
app.listen(PORT, () => {
  console.log(`app is running in http://localhost:${PORT}`);
});
