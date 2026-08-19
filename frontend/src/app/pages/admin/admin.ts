import { Component, inject, OnInit, signal } from "@angular/core";
import { DatePipe } from "@angular/common";

import { BloodRequestService } from "../../core/services/blood-request";
import { DonorService } from "../../core/services/donor";
import { BloodRequest } from "../../models/Blood-Request";
import { Donor } from "../../models/donor";

@Component({
  selector: "app-admin",
  imports: [DatePipe],
  templateUrl: "./admin.html",
  styleUrl: "./admin.css",
})
export class Admin implements OnInit {
  private readonly bloodRequestService = inject(BloodRequestService);
  private readonly donorService = inject(DonorService);

  requests = signal<BloodRequest[]>([]);
  donors = signal<Donor[]>([]);
  loading = signal(false);
  message = signal("");

  ngOnInit(): void {
    this.loadRequests();
    this.loadDonors();
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

  loadDonors(): void {
    this.donorService.getDonors().subscribe({
      next: (response) => this.donors.set(response.data),
      error: () => {},
    });
  }

  approve(id: string): void {
    this.bloodRequestService.updateStatus(id, "Approved").subscribe({
      next: () => this.loadRequests(),
      error: () => this.message.set("Could not approve request."),
    });
  }

  reject(id: string): void {
    this.bloodRequestService.updateStatus(id, "Rejected").subscribe({
      next: () => this.loadRequests(),
      error: () => this.message.set("Could not reject request."),
    });
  }

  remove(id: string): void {
    const confirmed = window.confirm("Delete this blood request?");
    if (!confirmed) return;

    this.bloodRequestService.deleteBloodRequest(id).subscribe({
      next: () => this.loadRequests(),
      error: () => this.message.set("Could not delete request."),
    });
  }

  isPending(request: BloodRequest): boolean {
    return request.status === "Pending";
  }
}