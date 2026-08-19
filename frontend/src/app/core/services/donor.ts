import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { API_BASE_URL } from "../api.config";
import { Donor, CreateDonorInput } from "../../models/donor";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

@Injectable({ providedIn: "root" })
export class DonorService {
  private readonly http = inject(HttpClient);
  private readonly url = `${API_BASE_URL}/donors`;

  getDonors(): Observable<ApiResponse<Donor[]>> {
    return this.http.get<ApiResponse<Donor[]>>(this.url);
  }

  createDonor(input: CreateDonorInput): Observable<ApiResponse<Donor>> {
    return this.http.post<ApiResponse<Donor>>(this.url, input);
  }
}