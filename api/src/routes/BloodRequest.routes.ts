import { Router } from "express";
import {
  createBloodRequest,
  getBloodRequests,
  updateBloodRequestStatus,
  deleteBloodRequest,
} from "../controllers/BloodRequest.controllers";

const router = Router();

router.post("/", createBloodRequest);
router.get("/", getBloodRequests);
router.patch("/:id/status", updateBloodRequestStatus);
router.delete("/:id", deleteBloodRequest);

export default router;