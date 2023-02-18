import { HttpException, HttpStatus } from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';

export async function checkUUID(id: string) {
  if (!uuidValidate(id)) {
    throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
  }
}

export async function cheskIsExists(id: string, prisma: any) {
  const result = await prisma.findUnique({
    where: {
      id: id,
    },
  });
  if (!result) {
    console.log('NOT_FOUND');
    throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
  }
  return result;
}
