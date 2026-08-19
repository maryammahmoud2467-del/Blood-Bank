import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { API_BASE_URL } from "../api.config";
import {
  BloodRequest,
  CreateBloodRequestInput,
  RequestStatus,
} from "../../models/Blood-Request";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

@Injectable({ providedIn: "root" })
export class BloodRequestService {
  private readonly http = inject(HttpClient);
  private readonly url = `${API_BASE_URL}/blood-requests`;

  getBloodRequests(): Observable<ApiResponse<BloodRequest[]>> {
    return this.http.get<ApiResponse<BloodRequest[]>>(this.url);
  }

  createBloodRequest(input: CreateBloodRequestInput): Observable<ApiResponse<BloodRequest>> {
    return this.http.post<ApiResponse<BloodRequest>>(this.url, input);
  }

  updateStatus(id: string, status: RequestStatus): Observable<ApiResponse<BloodRequest>> {
    return this.http.patch<ApiResponse<BloodRequest>>(`${this.url}/${id}/status`, { status });
  }

  deleteBloodRequest(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.url}/${id}`);
  }
}