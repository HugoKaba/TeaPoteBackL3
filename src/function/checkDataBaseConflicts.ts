import { ConflictException } from '@nestjs/common';
import { PrismaService } from '../config/prisma/prisma.service';

interface CheckItem {
  field: string;
  value: any;
  message: string;
  table?: string;
  exist?: boolean;
}

export default class checkDataBase {
  constructor(private readonly prismaService: PrismaService) {}

  private async checkDataBaseConflictsNotExist(
    field: string,
    value: any,
    message: string,
    table: string = 'user',
  ): Promise<string | null> {
    try {
      const record = await this.prismaService[table].findFirst({
        where: { [field]: value },
      });

      if (record === null) {
        return message;
      }
      return null;
    } catch (error) {
      throw new Error('Database operation failed');
    }
  }

  private async checkDataBaseConflictsExist(
    field: string,
    value: any,
    message: string,
    table: string = 'user',
  ): Promise<string | null> {
    try {
      const record = await this.prismaService[table].findFirst({
        where: { [field]: value },
      });

      if (record !== null) {
        return message;
      }
      return null;
    } catch (error) {
      throw new Error('Database operation failed');
    }
  }

  public async runChecks(checks: CheckItem[]) {
    const conflicts: Record<string, string[]> = {};

    const results = await Promise.all(
      checks.map((check) =>
        check.exist
          ? this.checkDataBaseConflictsExist(
              check.field,
              check.value,
              check.message,
              check.table ?? 'user',
            )
          : this.checkDataBaseConflictsNotExist(
              check.field,
              check.value,
              check.message,
              check.table ?? 'user',
            ),
      ),
    );

    results.forEach((result, index) => {
      if (result !== null) {
        const field = checks[index].field;

        if (!conflicts[field]) {
          conflicts[field] = [];
        }
        conflicts[field].push(result);
      }
    });

    return conflicts;
  }
}
