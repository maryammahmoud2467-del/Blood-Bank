export type BloodType =
  | "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export interface Donor {
  _id: string;
  name: string;
  phone: string;
  bloodType: BloodType;
  createdAt: string;
}

export interface CreateDonorInput {
  name: string;
  phone: string;
  bloodType: BloodType;
}