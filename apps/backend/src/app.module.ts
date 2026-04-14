import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HealthModule } from "./modules/health/health.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ClientRequestsModule } from "./modules/client-requests/client-requests.module";
import { IdActionsModule } from "./modules/id-actions/id-actions.module";
import { ProviderRequestsModule } from "./modules/provider-requests/provider-requests.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    HealthModule,
    AuthModule,
    UsersModule,
    ClientRequestsModule,
    IdActionsModule,
    ProviderRequestsModule,
  ],
})
export class AppModule {}
