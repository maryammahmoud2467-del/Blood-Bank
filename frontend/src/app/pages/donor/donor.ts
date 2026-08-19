import { Component, inject, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DatePipe } from "@angular/common";

import { BloodRequestService } from "../../core/services/blood-request";
import { DonorService } from "../../core/services/donor";
import { BloodRequest } from "../../models/Blood-Request";
import { BloodType, CreateDonorInput } from "../../models/donor";

@Component({
  selector: "app-donor",
  imports: [FormsModule, DatePipe],
  templateUrl: "./donor.html",
  styleUrl: "./donor.css",
})
export class Donor implements OnInit {
  private readonly bloodRequestService = inject(BloodRequestService);
  private readonly donorService = inject(DonorService);

  requests = signal<BloodRequest[]>([]);
  loading = signal(false);
  message = signal("");

  form: CreateDonorInput = {
    name: "",
    phone: "",
    bloodType: "A+",
  };

  bloodTypes: BloodType[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.loading.set(true);
    this.bloodRequestService.getBloodRequests().subscribe({
      next: (response) => {
        this.requests.set(response.data.filter((r) => r.status === "Approved"));
        this.loading.set(false);
      },
      error: () => {
        this.message.set("Could not load blood requests.");
        this.loading.set(false);
      },
    });
  }

  registerDonor(): void {
    this.message.set("");
    this.donorService.createDonor(this.form).subscribe({
      next: () => {
        this.message.set("Thank you! You are registered as a donor.");
        this.form = { name: "", phone: "", bloodType: "A+" };
      },
      error: () => {
        this.message.set("Could not register. Please try again.");
      },
    });
  }
}