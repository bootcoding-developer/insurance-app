import React, { useState } from 'react';
import { Users, Calendar, DollarSign } from 'lucide-react';
import type { Insurer } from '../types/insurance';

interface Props {
  insurers: Insurer[];
}

const InsuranceList: React.FC<Props> = ({ insurers }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortKey, setSortKey] = useState<keyof Insurer | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value);
  const handleSort = (key: keyof Insurer) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const filteredInsurers = insurers
    .filter((insurer) => 
      insurer.name.toLowerCase().includes(search.toLowerCase()) || 
      insurer.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((insurer) => 
      statusFilter === 'all' || insurer.status === statusFilter
    );

  const sortedInsurers = filteredInsurers.sort((a, b) => {
    if (!sortKey) return 0;
    const valueA = a[sortKey];
    const valueB = b[sortKey];
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    }
    return 0;
  });

  const paginatedInsurers = sortedInsurers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredInsurers.length / itemsPerPage);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Users className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Insurance Records</h2>
        </div>
      </div>

      {/* Search, Filter, and Sorting */}
      <div className="p-4 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full sm:w-1/3 px-4 py-2 border rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={search}
          onChange={handleSearchChange}
        />
        <select
          className="w-full sm:w-1/3 px-4 py-2 border rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={statusFilter}
          onChange={handleStatusChange}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Insurer Details
              </th>
              <th
                scope="col"
                className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('policyNumber')}
              >
                Policy Info
              </th>
              <th
                scope="col"
                className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('startDate')}
              >
                Dates
              </th>
              <th
                scope="col"
                className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('premium')}
              >
                Premium
              </th>
              <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedInsurers.map((insurer) => (
              <tr key={insurer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{insurer.name}</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{insurer.email}</div>
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">{insurer.policyNumber}</td>
                <td className="hidden sm:table-cell px-3 sm:px-6 py-4 whitespace-nowrap">
                  {new Date(insurer.startDate).toLocaleDateString()}
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">{insurer.premium.toFixed(2)}</td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-semibold ${insurer.status === 'active' ? 'text-green-600' : insurer.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                    {insurer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 flex justify-between items-center">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-200">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InsuranceList;
