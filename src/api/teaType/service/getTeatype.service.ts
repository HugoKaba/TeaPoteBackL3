import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/config/prisma/prisma.service";
import { TeaTypeFinderService } from "src/model/teaType/teatypeFinder.service";

@Injectable()
export class GetTeaTypeService {

  constructor(
    private readonly teaTypeFinderService: TeaTypeFinderService,
  ){}
  async getTeaType(userId: number) {
    const teaType = await this.teaTypeFinderService.findAllUserTeaTypes(userId);

    const adminteaType = await this.teaTypeFinderService.findAllUserTeaTypes(1);

    const allTeaType = teaType.concat(adminteaType);
    
    return allTeaType;
  }
}