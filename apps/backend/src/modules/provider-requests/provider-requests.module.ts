import { Module } from "@nestjs/common";
import { ProviderRequestsController } from "./provider-requests.controller";
import { ProviderRequestsService } from "./provider-requests.service";

@Module({
  controllers: [ProviderRequestsController],
  providers: [ProviderRequestsService],
  exports: [ProviderRequestsService],
})
export class ProviderRequestsModule {}
