export type UserRole =
  | "Donor"
  | "Hospital"
  | "Admin"
  | "Staff";

export type UserStatus =
  | "Pending"
  | "Approved"
  | "Rejected";

export type BloodType =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  role: UserRole;
  status: UserStatus;

  // Donor information
  bloodType?: BloodType;
  medicalConditions?: string;
  medications?: string;
  donationRestriction?: string;
  availableForDonation?: boolean;

  // Hospital information
  hospitalName?: string;
  hospitalAddress?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  status?: UserStatus;

  bloodType?: BloodType;
  medicalConditions?: string;
  medications?: string;
  donationRestriction?: string;
  availableForDonation?: boolean;

  hospitalName?: string;
  hospitalAddress?: string;
}

export type UpdateUserInput = Partial<CreateUserInput>;