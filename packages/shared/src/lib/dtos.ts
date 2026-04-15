import {
  ActionStatus,
  ActionType,
  TerminalKitState,
  ProviderRequestStatus,
  UserRole,
  UserStatus,
} from "./enums.js";

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
  terminalKit: string;
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
  updatedAt: string;
};

export type TerminalKitDto = {
  id: string;
  terminalKit: string;
  currentState: TerminalKitState;
  createdAt: string;
  updatedAt: string;
};

export type TerminalKitActionDto = {
  id: string;
  terminalKitId: string;
  terminalKit?: string;
  actionType: ActionType;
  status: ActionStatus;
  previousState: TerminalKitState | null;
  resultingState: TerminalKitState | null;
  clientRequestId: string;
  providerRequestId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ClientRequestDto = {
  id: string;
  userId: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  actions: TerminalKitActionDto[];
};

export type CreateProviderRequestDto = {
  externalId: string;
  actionIds: string[];
  comment?: string;
};

export type ProviderRequestResultItemDto = {
  actionId: string;
  success: boolean;
  resultingState: TerminalKitState;
};

export type SubmitProviderResultsDto = {
  results: ProviderRequestResultItemDto[];
};

export type ProviderRequestDto = {
  id: string;
  externalId: string;
  comment: string;
  status: ProviderRequestStatus;
  createdAt: string;
  updatedAt: string;
  actions: TerminalKitActionDto[];
};

export type TerminalKitCapacityDto = {
  activeCount: number;
  limit: number;
  remaining: number;
  utilizationPercent: number;
};

export type TerminalKitActionHistoryDto = {
  id: string;
  terminalKitId: string;
  terminalKit: string;
  clientRequestId: string;
  actionType: ActionType;
  status: ActionStatus;
  previousState: TerminalKitState | null;
  resultingState: TerminalKitState | null;
  createdAt: string;
  updatedAt: string;
};
