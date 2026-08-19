import { Router } from "express";
import { createDonor, getDonors } from "../controllers/Donor.controllers";

const router = Router();

router.post("/", createDonor);
router.get("/", getDonors);

export default router;