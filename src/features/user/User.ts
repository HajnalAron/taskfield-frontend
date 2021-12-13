export interface User {
  id: number;
  email: string;
  firstname: string;
  surname: string;
  avatar: string;
  role: "administrator" | "support" | "user";
}
