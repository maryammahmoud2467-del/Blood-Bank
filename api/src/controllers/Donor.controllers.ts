import { Request, Response } from "express";
import { Donor } from "../models/Donor.models";

export const createDonor = async (req: Request, res: Response) => {
  try {
    const { name, phone, bloodType } = req.body;

    if (!name || !phone || !bloodType) {
      return res.status(400).json({
        success: false,
        message: "name, phone and bloodType are required.",
      });
    }

    const donor = await Donor.create({ name, phone, bloodType });

    return res.status(201).json({
      success: true,
      message: "Donor registered successfully.",
      data: donor,
    });
  } catch (error) {
    console.error("Create donor error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

export const getDonors = async (_req: Request, res: Response) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: donors });
  } catch (error) {
    console.error("Get donors error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};