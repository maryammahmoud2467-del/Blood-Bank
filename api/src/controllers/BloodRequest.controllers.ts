import { Request, Response } from "express";
import { BloodRequest } from "../models/BloodRequest.models";

export const createBloodRequest = async (req: Request, res: Response) => {
  try {
    const { hospitalName, bloodType, quantity } = req.body;

    if (!hospitalName || !bloodType || !quantity) {
      return res.status(400).json({
        success: false,
        message: "hospitalName, bloodType and quantity are required.",
      });
    }

    const bloodRequest = await BloodRequest.create({
      hospitalName,
      bloodType,
      quantity,
    });

    return res.status(201).json({
      success: true,
      message: "Blood request created.",
      data: bloodRequest,
    });
  } catch (error) {
    console.error("Create blood request error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

export const getBloodRequests = async (_req: Request, res: Response) => {
  try {
    const requests = await BloodRequest.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: requests });
  } catch (error) {
    console.error("Get blood requests error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

export const updateBloodRequestStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status." });
    }

    const updated = await BloodRequest.findByIdAndUpdate(id, { status }, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Request not found." });
    }

    return res.status(200).json({ success: true, message: "Status updated.", data: updated });
  } catch (error) {
    console.error("Update blood request error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

export const deleteBloodRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await BloodRequest.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Request not found." });
    }

    return res.status(200).json({ success: true, message: "Request deleted." });
  } catch (error) {
    console.error("Delete blood request error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};