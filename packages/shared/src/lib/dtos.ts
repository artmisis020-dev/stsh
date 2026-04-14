import {
  ActionStatus,
  ActionType,
  IdState,
  ProviderRequestStatus,
  UserRole,
  UserStatus,
} from "./enums";

export type RegisterDto = {
  email: string;
  password: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type AuthResponseDto = {
  accessToken: string;
  user: UserDto;
};

export type ClientRequestActionInputDto = {
  idValue: string;
  actionType: ActionType;
};

export type SubmitClientRequestDto = {
  comment: string;
  actions: ClientRequestActionInputDto[];
};

export type UserDto = {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
};

export type IdDto = {
  id: string;
  value: string;
  currentState: IdState;
  createdAt: string;
};

export type IdActionDto = {
  id: string;
  idId: string;
  actionType: ActionType;
  status: ActionStatus;
  clientRequestId: string;
  providerRequestId: string | null;
  createdAt: string;
};

export type ClientRequestDto = {
  id: string;
  userId: string;
  comment: string;
  createdAt: string;
  actions: IdActionDto[];
};

export type CreateProviderRequestDto = {
  externalId: string;
  actionIds: string[];
};

export type ProviderRequestResultItemDto = {
  actionId: string;
  success: boolean;
  resultingState: IdState;
};

export type SubmitProviderResultsDto = {
  results: ProviderRequestResultItemDto[];
};

export type ProviderRequestDto = {
  id: string;
  externalId: string;
  status: ProviderRequestStatus;
  createdAt: string;
};

export type AuditLogDto = {
  id: string;
  idId: string;
  prevState: IdState;
  newState: IdState;
  createdAt: string;
};
