export type Paginated<T> = {
  current_page: number;
  data: T[];
  last_page: number;
  total: number;
  per_page: number;
};

export type Branch = {
  id: number;
  name: string;
  address: string | null;
  phone: string | null;
  status: "active" | "inactive";
  created_at: string;
};

export type UserProfile = {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  gender: "male" | "female" | "other" | null;
  blood_group: string | null;
  religion: string | null;
  nid_number: string | null;
  birth_certificate_number: string | null;
  emergency_contact_number: string | null;
  date_of_birth: string | null;
  joining_date: string | null;
};

export type Member = {
  id: number;
  user_id: number;
  branch_id: number | null;
  phone: string | null;
  address: string | null;
  user: UserProfile;
  branch: Branch | null;
};
