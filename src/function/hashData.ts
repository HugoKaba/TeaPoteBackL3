import * as bcrypt from 'bcrypt';

export default async function hashData(data: string) {
  return bcrypt.hash(data, 10);
}
