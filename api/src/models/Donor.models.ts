import { model, Schema } from "mongoose";

export type BloodType =
  | "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export interface DonorDocument {
  name: string;
  phone: string;
  bloodType: BloodType;
  createdAt: Date;
}

const donorSchema = new Schema<DonorDocument>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    bloodType: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Donor = model<DonorDocument>("Donor", donorSchema);