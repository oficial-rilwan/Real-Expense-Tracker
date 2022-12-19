export default interface User {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: Date | null;
  country: string;
  currency: string;
}
