export interface User {
  id: string;
  accountId: string;
  firstName: string;
  lastName: string;
  picture: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  isDeleted: boolean;
  provider: string;
}
