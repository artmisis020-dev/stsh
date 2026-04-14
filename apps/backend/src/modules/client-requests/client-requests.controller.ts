import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateClientRequestDto } from "./dto/create-client-request.dto";
import { ClientRequestsService } from "./client-requests.service";

@Controller("client-requests")
export class ClientRequestsController {
  constructor(private readonly clientRequestsService: ClientRequestsService) {}

  @Post()
  create(@Body() payload: CreateClientRequestDto) {
    return this.clientRequestsService.create(payload);
  }

  @Get("my")
  getMyRequests() {
    return this.clientRequestsService.getMyRequests();
  }
}
