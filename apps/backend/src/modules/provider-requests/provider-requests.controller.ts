import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateProviderRequestBodyDto } from "./dto/create-provider-request.dto";
import { SubmitProviderResultsBodyDto } from "./dto/submit-provider-results.dto";
import { ProviderRequestsService } from "./provider-requests.service";

@Controller("provider-requests")
export class ProviderRequestsController {
  constructor(private readonly providerRequestsService: ProviderRequestsService) {}

  @Post()
  create(@Body() payload: CreateProviderRequestBodyDto) {
    return this.providerRequestsService.create(payload);
  }

  @Get()
  findAll() {
    return this.providerRequestsService.findAll();
  }

  @Post(":id/results")
  submitResults(@Param("id") id: string, @Body() payload: SubmitProviderResultsBodyDto) {
    return this.providerRequestsService.submitResults(id, payload);
  }
}
