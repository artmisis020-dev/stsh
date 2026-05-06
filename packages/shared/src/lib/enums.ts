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

export enum ErrorCode {
  // Auth
  InvalidCredentials = "AUTH_INVALID_CREDENTIALS",
  UserNotApproved = "AUTH_USER_NOT_APPROVED",
  UserEmailAlreadyExists = "AUTH_USER_EMAIL_EXISTS",
  UserLoginAlreadyExists = "AUTH_USER_LOGIN_EXISTS",
  // Client requests
  DuplicateTerminalKits = "CLIENT_REQUEST_DUPLICATE_KITS",
  ActiveActionInProgress = "CLIENT_REQUEST_ACTIVE_ACTION",
  OnlyActivationAllowed = "CLIENT_REQUEST_ONLY_ACTIVATION_ALLOWED",
  AlreadyActive = "CLIENT_REQUEST_ALREADY_ACTIVE",
  PermDeactivatedCannotActivate = "CLIENT_REQUEST_PERM_DEACTIVATED",
  OnlyActiveCanBeDeactivated = "CLIENT_REQUEST_NOT_ACTIVE",
}
