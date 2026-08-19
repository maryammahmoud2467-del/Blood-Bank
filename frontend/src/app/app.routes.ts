import { Routes } from "@angular/router";

import { Admin } from "./pages/admin/admin";
import { Donor } from "./pages/donor/donor";
import { Hospital } from "./pages/hospital/hospital";

export const routes: Routes = [
  { path: "", redirectTo: "donor", pathMatch: "full" },
  { path: "donor", component: Donor },
  { path: "hospital", component: Hospital },
  { path: "admin", component: Admin },
  { path: "**", redirectTo: "donor" },
];