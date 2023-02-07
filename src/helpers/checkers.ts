import { HttpException, HttpStatus } from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';

export async function checkUUID(id: string) {
  if (!uuidValidate(id)) {
    throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
  }
}

export async function cheskIsExists(id: string, data: any[]) {
  const result = data.find((element: { id: string }) => element.id === id);
  if (!result) {
    throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
  }
  return result;
}
