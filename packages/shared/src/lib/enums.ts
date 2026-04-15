export enum TerminalKitState {
  Initiated = "initiated",
  Active = "active",
  DeactivatedTemp = "deactivated_temp",
  DeactivatedPerm = "deactivated_perm",
}

export enum ActionType {
  Activate = "activate",
  DeactivateTemp = "deactivate_temp",
  DeactivatePerm = "deactivate_perm",
}

export enum ActionStatus {
  PendingAdmin = "pending_admin",
  PendingProvider = "pending_provider",
  Completed = "completed",
  Failed = "failed",
}

export enum ProviderRequestStatus {
  Pending = "pending",
  PartialSuccess = "partial_success",
  Completed = "completed",
  Failed = "failed",
}

export enum UserRole {
  Admin = "admin",
  Client = "client",
}

export enum UserStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}
