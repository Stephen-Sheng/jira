export type Raw = string | number;
export type Project = {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
};

export type User = {
  token: string;
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
};
