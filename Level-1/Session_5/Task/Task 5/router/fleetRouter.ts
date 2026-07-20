import { Router } from "express";
import {
  createMicrobus,
  deleteMicrobus,
  filterFleet,
  getFleet,
  getFleetById,
  getRating,
  updateMicrobus,
} from "../controller/fleetController";

const router = Router();

router.get("/fleet", getFleet);
router.get("/fleet/filter", filterFleet);
router.get("/fleet/:id", getFleetById);
router.post("/fleet", createMicrobus);
router.put("/fleet/:id", updateMicrobus);
router.delete("/fleet/:id", deleteMicrobus);
router.get("/fleet/rate/:id", getRating);

export default router;
