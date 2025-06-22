import { UserDto } from "../api/types";
import { UserType } from "../model/types";

export function mapUser(dto: UserDto): UserType {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
  }
}