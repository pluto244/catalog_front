export enum Roles {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER',
}

export interface UserDto {
  id: number;
  name: string;
  email: string;
  idOfFollowedProductsList: number[];
  role: Roles;
}