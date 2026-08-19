import { Component, inject, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DatePipe } from "@angular/common";

import { BloodRequestService } from "../../core/services/blood-request";
import {
  BloodRequest,
  BloodType,
  CreateBloodRequestInput,
} from "../../models/Blood-Request";

@Component({
  selector: "app-hospital",
  imports: [FormsModule, DatePipe],
  templateUrl: "./hospital.html",
  styleUrl: "./hospital.css",
})
export class Hospital implements OnInit {
  private readonly bloodRequestService = inject(BloodRequestService);

  requests = signal<BloodRequest[]>([]);
  loading = signal(false);
  message = signal("");

  form: CreateBloodRequestInput = {
    hospitalName: "",
    bloodType: "A+",
    quantity: 1,
  };

  bloodTypes: BloodType[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.loading.set(true);
    this.bloodRequestService.getBloodRequests().subscribe({
      next: (response) => {
        this.requests.set(response.data);
        this.loading.set(false);
      },
      error: () => {
        this.message.set("Could not load requests.");
        this.loading.set(false);
      },
    });
  }

  createRequest(): void {
    this.message.set("");
    this.bloodRequestService.createBloodRequest(this.form).subscribe({
      next: () => {
        this.message.set("Blood request created successfully.");
        this.form = { hospitalName: "", bloodType: "A+", quantity: 1 };
        this.loadRequests();
      },
      error: () => {
        this.message.set("Could not create request.");
      },
    });
  }
}