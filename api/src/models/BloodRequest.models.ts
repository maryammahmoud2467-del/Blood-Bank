import { model, Schema } from "mongoose";

export type BloodType =
  | "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export type RequestStatus =
  | "Pending" | "Approved" | "Rejected";

export interface BloodRequestDocument {
  hospitalName: string;
  bloodType: BloodType;
  quantity: number;
  status: RequestStatus;
  createdAt: Date;
  updatedAt: Date;
}

const bloodRequestSchema = new Schema<BloodRequestDocument>(
  {
    hospitalName: { type: String, required: true, trim: true },
    bloodType: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const BloodRequest = model<BloodRequestDocument>(
  "BloodRequest",
  bloodRequestSchema
);