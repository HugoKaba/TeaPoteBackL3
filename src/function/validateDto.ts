import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export const validateDto = async (dtoClass: any, data: any): Promise<any> => {
  const transformedData = plainToClass(dtoClass, data, {
    excludeExtraneousValues: true,
  });

  const errors = await validate(transformedData);

  if (errors.length > 0) {
    throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
  }

  return transformedData;
};
