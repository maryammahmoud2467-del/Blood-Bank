import {
  inject,
  Injectable
} from "@angular/core";

import {
  HttpClient
} from "@angular/common/http";

import {
  Observable
} from "rxjs";

import {
  API_BASE_URL
} from "../api.config";

import type {
  ApiResponse
} from "../../models/api-response";

import type {
  User,
  CreateUserInput,
  UpdateUserInput,
  UserStatus
} from "../../models/User";


@Injectable({
  providedIn: "root"
})
export class UserService {

  private readonly http =
    inject(HttpClient);

  private readonly url =
    `${API_BASE_URL}/users`;


  // =========================
  // Get All Users
  // =========================

  getUsers():
    Observable<ApiResponse<User[]>> {

    return this.http.get<
      ApiResponse<User[]>
    >(this.url);

  }


  // =========================
  // Get User By ID
  // =========================

  getUserById(
    id: string
  ):
    Observable<ApiResponse<User>> {

    return this.http.get<
      ApiResponse<User>
    >(`${this.url}/${id}`);

  }


  // =========================
  // Create User
  // =========================

  createUser(
    user: CreateUserInput
  ):
    Observable<ApiResponse<User>> {

    return this.http.post<
      ApiResponse<User>
    >(
      this.url,
      user
    );

  }


  // =========================
  // Update User
  // =========================

  updateUser(
    id: string,
    updates: UpdateUserInput
  ):
    Observable<ApiResponse<User>> {

    return this.http.patch<
      ApiResponse<User>
    >(
      `${this.url}/${id}`,
      updates
    );

  }


  // =========================
  // Delete User
  // =========================

  deleteUser(
    id: string
  ):
    Observable<{
      success: boolean;
      message: string;
    }> {

    return this.http.delete<{
      success: boolean;
      message: string;
    }>(
      `${this.url}/${id}`
    );

  }


  // =========================
  // Approve / Reject User
  // =========================

  updateUserStatus(
    id: string,
    status: UserStatus
  ):
    Observable<ApiResponse<User>> {

    return this.http.patch<
      ApiResponse<User>
    >(
      `${this.url}/${id}/status`,
      { status }
    );

  }

}