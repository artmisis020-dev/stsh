import type {
  CreateProviderRequestDto,
  IdActionDto,
  ProviderRequestDto,
  SubmitProviderResultsDto,
  UserDto,
} from "@starshield/shared";

export type PendingUsersResponse = UserDto[];

export type PendingAdminActionsResponse = IdActionDto[];

export type ProviderRequestsResponse = ProviderRequestDto[];

export type ProviderRequestCreateFormValues = CreateProviderRequestDto;

export type ProviderResultFormValues = {
  providerRequestId: string;
  actionId: string;
  success: boolean;
  resultingState: SubmitProviderResultsDto["results"][number]["resultingState"];
};
