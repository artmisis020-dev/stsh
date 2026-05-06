import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
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
@ApiTags("Provider Requests")
@ApiBearerAuth("bearer")
export class ProviderRequestsController {
  constructor(private readonly providerRequestsService: ProviderRequestsService) {}

  @Post()
  @ApiOperation({ summary: "Create a provider request" })
  create(@Body() payload: CreateProviderRequestBodyDto) {
    return this.providerRequestsService.create(payload);
  }

  @Get()
  @ApiOperation({ summary: "List provider requests" })
  findAll() {
    return this.providerRequestsService.findAll();
  }

  @Post(":id/results")
  @ApiOperation({ summary: "Submit provider processing results" })
  submitResults(@Param("id") id: string, @Body() payload: SubmitProviderResultsBodyDto) {
    return this.providerRequestsService.submitResults(id, payload);
  }
}
