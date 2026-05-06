import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UserRole } from "@starshield/shared";
import { Roles } from "../../decorators/roles.decorator";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { RolesGuard } from "../../guards/roles.guard";
import { CreateProviderRequestBodyDto } from "./dto/create-provider-request.dto";
import { SubmitProviderResultsBodyDto } from "./dto/submit-provider-results.dto";
import { ProviderRequestsService } from "./provider-requests.service";

@Controller("provider-requests")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.Admin)
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
