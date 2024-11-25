import { Controller, Get } from "@nestjs/common";
import { GetCurrentUserId } from "src/common/decorator";
import { GetTeaTypeService } from "./service/getTeatype.service";

@Controller('teaType')
export class TeaTypeController {
  constructor(private readonly getTeaTypeService: GetTeaTypeService) {}

  @Get('tea')
  getAllTeaType(@GetCurrentUserId() userId: number) {
    return this.getTeaTypeService.getTeaType(userId);
  }
}

