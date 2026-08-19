export type BloodType =
  | "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export type RequestStatus =
  | "Pending" | "Approved" | "Rejected";

export interface BloodRequest {
  _id: string;
  hospitalName: string;
  bloodType: BloodType;
  quantity: number;
  status: RequestStatus;
  createdAt: string;
}

export interface CreateBloodRequestInput {
  hospitalName: string;
  bloodType: BloodType;
  quantity: number;
}