export interface Insurer {
  id: string;
  name: string;
  email: string;
  phone: string;
  policyNumber: string;
  insuranceType: 'health' | 'life' | 'auto' | 'property';
  startDate: string;
  endDate: string;
  premium: number;
  status: 'active' | 'pending' | 'expired';
}

export type InsuranceFormData = Omit<Insurer, 'id'>;

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
}

export type CustomerFormData = Omit<Customer, 'id'>;

export interface InsurancePlan {
  id: string;
  name: string;
  type: 'health' | 'life' | 'auto' | 'property';
  description: string;
  coverage: number;
  monthlyPremium: number;
  benefits: string[];
}

export type InsurancePlanFormData = Omit<InsurancePlan, 'id'>;