import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react'
import { DEPARTMENTS, dummyEmployeeData } from '../assets/assets'
import EmployeeForm from '../components/EmployeeForm'

const Employees = () => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedDept, setSelectedDept] = useState('')
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, employeeId: null, employeeName: '' })
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editEmployee, setEditEmployee] = useState(null)

  const fetchEmployees = useCallback(async () => {
    setLoading(true)
    setEmployees(dummyEmployeeData)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])
  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase()
    return employees.filter((emp) => {
      const matchesSearch =
        !query ||
        [emp.firstName, emp.lastName, emp.email, emp.position, emp.department]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query))

      const matchesDept = !selectedDept || emp.department === selectedDept
      return matchesSearch && matchesDept
    })
  }, [employees, search, selectedDept])

  const handleEdit = (employee) => {
    setEditEmployee(employee)
  }

  const handleDeleteClick = (employee) => {
    setDeleteModal({
      isOpen: true,
      employeeId: employee._id,
      employeeName: `${employee.firstName} ${employee.lastName}`
    })
  }

  const handleDeleteConfirm = () => {
    if (deleteModal.employeeId) {
      setEmployees(employees.filter(emp => emp._id !== deleteModal.employeeId))
      setDeleteModal({ isOpen: false, employeeId: null, employeeName: '' })
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, employeeId: null, employeeName: '' })
  }

  return (
    <div className='animate-fade-in'>
      {/* ----header----- */}

      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
        <div>
          <h1 className='page-title'>Employees</h1>
          <p className='page-subtitle'>Manage your team members</p>
        </div>
        <button onClick={()=> setShowCreateModal(true)}
        className='btn-primary flex items-center gap-2 w-full sm:w-auto justify-center'>
          <Plus size={16} /> Add Employee
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 mb-6'>
        <div className='relative'>
          <Search size={16} className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' />
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search employees...'
            className='pl-11 pr-4'
          />
        </div>
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className='btn-secondary appearance-none w-full lg:w-auto'
        >
          <option value=''>All Departments</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className='text-center text-slate-500 py-12'>Loading employees...</p>
      ) : (
        <div className='grid grid-cols-1 gap-4'>
          {employees.length === 0 ? (
            <div className='card p-6 text-center text-slate-600'>No employees found</div>
          ) : (
            employees.map((emp) => (
              <div
                key={emp._id}
                className='card p-5 sm:p-6 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center hover:bg-purple-50/50 hover:shadow-md transition-all duration-300 cursor-pointer'
              >
                <div className='flex-1'>
                  <h2 className='font-semibold text-slate-900 text-lg'>
                    {emp.firstName} {emp.lastName}
                  </h2>
                  <p className='text-sm text-slate-500'>
                    {emp.position} • {emp.department}
                  </p>
                  <p className='text-sm text-slate-500 mt-2'>{emp.email}</p>
                </div>
                <div className='flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end'>
                  <div className='text-right'>
                    <p className='text-sm text-slate-500'>Status</p>
                    <p className={`font-semibold ${emp.employmentStatus === 'ACTIVE' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {emp.employmentStatus}
                    </p>
                  </div>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => handleEdit(emp)}
                      className='p-2.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 group'
                      title='Edit employee'
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(emp)}
                      className='p-2.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-600 transition-colors duration-200'
                      title='Delete employee'
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 max-w-sm mx-4'>
            <h2 className='text-lg font-semibold text-slate-900 mb-2'>Delete Employee</h2>
            <p className='text-slate-600 mb-6'>
              Are you sure you want to delete <strong>{deleteModal.employeeName}</strong>? This action cannot be undone.
            </p>
            <div className='flex justify-end gap-3'>
              <button
                onClick={handleDeleteCancel}
                className='px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors duration-200'
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className='px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-200'
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Create employee modal */}
      {showCreateModal && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4' onClick={() => setShowCreateModal(false)}>
          <div className='relative bg-white rounded-2xl w-full max-w-3xl animate-fade-in' onClick={(e) => e.stopPropagation()}>
            <div className='flex items-center justify-between p-6 pb-0'>
              <div>
                <h2 className='text-lg font-semibold text-slate-900'>Add New Employee</h2>
                <p className='text-sm text-slate-500 mt-0.5'>Create a user account and employee profile</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className='p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600'>
                <X className='w-5 h-5' />
              </button>
            </div>
            <div className='p-6'>
              {/* Add your employee form here */}
              <EmployeeForm
              onSuccess={()=>{
                setShowCreateModal(false);
                fetchEmployees(); 
              }} onCancel={()=> setShowCreateModal(false)}/>
            </div>
          </div>
        </div>
      )}

      {/* edit employee modal */}
      {editEmployee && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm' onClick={() => setEditEmployee(null)}>
          <div className='relative bg-white rounded-2xl w-full max-w-3xl animate-fade-in' onClick={(e) => e.stopPropagation()}>
            <div className='flex items-center justify-between p-6 pb-0'>
              <div>
                <h2 className='text-lg font-semibold text-slate-900'>Edit Employee</h2>
                <p className='text-sm text-slate-500 mt-0.5'>Update employee information</p>
              </div>
              <button onClick={() => setEditEmployee(null)} className='p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600'>
                <X className='w-5 h-5' />
              </button>
            </div>
            <div className='p-6'>
              <EmployeeForm
                initialData={editEmployee}
                onSuccess={() => {
                  setEditEmployee(null)
                  fetchEmployees()
                }}
                onCancel={() => setEditEmployee(null)}
              />
            </div>
          </div>
        </div>
      )}


    </div>
      
   

    
  )
}

export default Employees