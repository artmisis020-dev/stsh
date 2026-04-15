import type {
  CreateProviderRequestDto,
  TerminalKitActionDto,
  ProviderRequestDto,
  SubmitProviderResultsDto,
  UserDto,
} from "@starshield/shared";

export type PendingUsersResponse = UserDto[];

export type PendingTerminalKitActionsResponse = TerminalKitActionDto[];

export type ProviderRequestsResponse = ProviderRequestDto[];

export type ProviderRequestCreateFormValues = CreateProviderRequestDto;

export type ProviderResultFormValues = {
  providerRequestId: string;
  actionId: string;
  success: boolean;
  resultingState: SubmitProviderResultsDto["results"][number]["resultingState"];
};
