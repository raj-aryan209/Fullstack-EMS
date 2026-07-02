import { Loader2Icon, LogInIcon, LogOut, LogOutIcon } from 'lucide-react'
import { useState } from 'react'

const CheckInButton = ({todayRecord, onAction}) => {
  const [loading, setLoading] = useState(false)
  const handleAttendance = async ()=> {
    setLoading(true) 
    setTimeout(()=>{ 
    setLoading(false) 
    onAction( ) 
   },1000)
  }

  if (todayRecord?.checkOut){
    return ( 
    <div className='f1ex flex-col items-center justify-center p-8 bg-slate-50 rounded-2x1 border border-slate-200'>
      <h3 className='text-lg font-bold text-slate-900'>Work Day Completed</h3> 
      <p className='text-slate-500 text-sm mt-1'>Great job! See you tomorrow</p>

    </div> 
    )
  }
    const ischeckedIn = !!todayRecord?.ischeckedIn;
  
  
  return (
    <div className='fixed bottom-4 right-4 flex flex-col z-1'>
      <button onClick={handleAttendance} disabled={loading
      } className={`w-full max-w-xs flex justify-between items-center gap-8 p-4 rounded-xl bg-gradient-to-br text-white ${ischeckedIn ? "from-slate-700 to-slate-900" : "from-indigo-600 to-indigo-700"}`}>
        {loading ? <Loader2Icon className="size-7 animate-spin"/> : ischeckedIn ? <LogOutIcon className='size-7'/> : <LogInIcon className='size-7'/>}
        <div className='relative flex flex-col items-center text-center'>

          <h2 className='text-lg font-medium mb-1'>{loading ? "Processing..." : ischeckedIn ? "Clock Out" : "Clock In"}</h2>
          <p className='text-xs opacity-80'>{ischeckedIn ? "Click to end your shift" : "start your work day"}</p>
        </div>
      </button>

    </div>
  )
}

export default CheckInButton 