import { Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "crypto";
import { ProviderRequestStatus, type CreateProviderRequestDto, type ProviderRequestDto, type SubmitProviderResultsDto } from "@starshield/shared";

@Injectable()
export class ProviderRequestsService {
  private readonly requests: ProviderRequestDto[] = [];

  create(payload: CreateProviderRequestDto) {
    const request: ProviderRequestDto = {
      id: randomUUID(),
      externalId: payload.externalId,
      status: ProviderRequestStatus.Pending,
      createdAt: new Date().toISOString(),
    };

    this.requests.unshift(request);
    return {
      ...request,
      actionIds: payload.actionIds,
    };
  }

  findAll() {
    return this.requests;
  }

  submitResults(id: string, payload: SubmitProviderResultsDto) {
    const request = this.requests.find((entry) => entry.id === id);

    if (!request) {
      throw new NotFoundException("Provider request not found.");
    }

    const successfulResults = payload.results.filter((item) => item.success).length;
    const failedResults = payload.results.length - successfulResults;

    if (successfulResults === payload.results.length) {
      request.status = ProviderRequestStatus.Completed;
    } else if (failedResults === payload.results.length) {
      request.status = ProviderRequestStatus.Failed;
    } else {
      request.status = ProviderRequestStatus.PartialSuccess;
    }

    return {
      request,
      results: payload.results,
    };
  }
}
