import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("health")
@ApiTags("Health")
export class HealthController {
  @Get()
  @ApiOperation({ summary: "Check backend health" })
  @ApiOkResponse({
    schema: {
      type: "object",
      properties: {
        status: { type: "string", example: "ok" },
        service: { type: "string", example: "backend" },
        timestamp: { type: "string", format: "date-time" },
      },
    },
  })
  getHealth() {
    return {
      status: "ok",
      service: "backend",
      timestamp: new Date().toISOString(),
    };
  }
}
