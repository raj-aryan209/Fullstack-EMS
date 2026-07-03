import { useState, useEffect, useCallback } from "react";
import Loading from "../components/Loading";
import { dummyPayslipData, dummyEmployeeData } from "../assets/assets";
import PayslipList from "../components/payslips/PayslipList";
import GeneratePayslipsForm from "../components/payslips/GeneratePayslipsForm";


const Payslips = () => {
const [payslips, setPayslips] = useState([])
const [employees,setEmployees] = useState([])
const [loading, setLoading] = useState(true);
const isAdmin = true;

const fetchPayslips = useCallback(async () => {
  setPayslips(dummyPayslipData);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

}, [])
    useEffect(() => {
      fetchPayslips();
    }, [fetchPayslips])

    useEffect(() => {
      if (isAdmin) {
        setEmployees(dummyEmployeeData);
      }
    }, [isAdmin])

    if (loading) return <Loading />;
      return (
          <div className="animate-fade-in">
            <div className="flex flex-col-1 sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="page-title">Payslips</h1>
                <p className="page-subtitle">
                  {isAdmin  ? "Generate and manage employee payslips"
                    : "Your payslip history"}</p>
                   
                
              </div>
              {isAdmin && <GeneratePayslipsForm employees={employees} onSuccess= {fetchPayslips}/>}

            </div>
            <PayslipList payslips={payslips} isAdmin={isAdmin}/>
          </div>
        
      )
    }

export default Payslips