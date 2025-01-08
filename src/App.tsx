import React, { useEffect } from 'react';
import { Shield, Sun, Moon, Users, UserPlus, FileText } from 'lucide-react'; 
import Tabs from './components/Tabs';
import type { Insurer, InsuranceFormData, Customer, InsurancePlan } from './types/insurance';
import { CustomerCard } from './components/customer/CustomerCard';
import InsuranceForm from './components/insurance/InsuranceForm';
import InsuranceList from './components/insurance/InsuranceList';

const tabs = [
  { id: 'insurers', label: 'Insurers', icon: <Users className="w-5 h-5" /> },
  { id: 'customers', label: 'Customers', icon: <UserPlus className="w-5 h-5" /> },
  { id: 'plans', label: 'Insurance Plans', icon: <FileText className="w-5 h-5" /> }
];

export default function App() {
  const [activeTab, setActiveTab] = React.useState('insurers');
  const [insurers, setInsurers] = React.useState<Insurer[]>([
     
  ]);

  useEffect(() => {
    fetch("/data/insurers.json")
      .then((response) => response.json())
      .then((data) => setInsurers(data));
  }, []);

  const [customers, setCustomers] = React.useState<Customer[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '(555) 111-2233',
      address: '123 Main St, City, State 12345',
      joinDate: '2024-01-15'
    }
  ]);

  const [plans, setPlans] = React.useState<InsurancePlan[]>([
    {
      id: '1',
      name: 'Premium Health Care',
      type: 'health',
      description: 'Comprehensive health coverage including dental and vision',
      coverage: 1000000,
      monthlyPremium: 299.99,
      benefits: ['Dental', 'Vision', 'Prescription drugs', 'Mental health']
    }
  ]);

  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleAddInsurer = (data: InsuranceFormData) => {
    const newInsurer: Insurer = {
      ...data,
      id: crypto.randomUUID()
    };
    setInsurers(prev => [...prev, newInsurer]);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="w-full max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">Insurance Admin</h1>
              <p className="pt-4 text-xs font-semibold text-blue-600">
                by Bootcoding
              </p>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-800 dark:text-gray-200" />
              ) : (
                <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <div className="mt-6">
          {activeTab === 'insurers' && (
            <div className="grid gap-6 sm:gap-8">
              <InsuranceForm onSubmit={handleAddInsurer} />
              <InsuranceList insurers={insurers} />
            </div>
          )}
          {activeTab === 'customers' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Customers Management</h2>
              <CustomerCard />
            </div>
          )}
          {activeTab === 'plans' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Insurance Plans Management</h2>
              <p className="text-gray-600 dark:text-gray-400">Insurance plans management interface will be implemented here.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}