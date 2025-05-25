export type TOrganization = { 
  name: string;
  type: "gurukul" | "vedic_institution" | "ashram";
  description: string;
  headTeacher: string;
  studentCapacity: number;
  coursesOffered: string;
  contact: {
    email: string;
    phone: string;
    website?: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
};
