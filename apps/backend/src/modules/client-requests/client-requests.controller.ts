import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UserRole } from "@starshield/shared";
import { CurrentUser, type JwtPayload } from "../../decorators/current-user.decorator";
import { Roles } from "../../decorators/roles.decorator";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { RolesGuard } from "../../guards/roles.guard";
import { CreateClientRequestDto } from "./dto/create-client-request.dto";
import { ClientRequestsService } from "./client-requests.service";

@Controller("client-requests")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientRequestsController {
  constructor(private readonly clientRequestsService: ClientRequestsService) {}

  @Post()
  @Roles(UserRole.Client)
  create(@CurrentUser() user: JwtPayload, @Body() payload: CreateClientRequestDto) {
    return this.clientRequestsService.create(user.sub, payload);
  }

  @Get("my")
  @Roles(UserRole.Client)
  getMyRequests(@CurrentUser() user: JwtPayload) {
    return this.clientRequestsService.getMyRequests(user.sub);
  }

  @Get()
  @Roles(UserRole.Admin)
  getAllRequests() {
    return this.clientRequestsService.getAllRequests();
  }
}
