import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'

function AdminEmployeesView() {

  const dispatch = useDispatch();
  const employeesList = useSelector(store => store.adminemployeesview);
  const history = useHistory();
  useEffect(() => {
    dispatch({type: 'FETCH_EMPLOYEES_LIST'});
  }, []);

  const clickEmployee = (id) => {
    // console.log(id);
    history.push(`/employee/${id}`)

  }

  return (
    <div className='adminEmployeesView'>
      <div className='employeeListTitle' style={{textAlign: 'center', width: '100%'}}>
        <h2>All Employees</h2>
        <Button 
          variant='contained' 
          style={{float: 'right'}}
          onClick={() => {history.push('/registration')}}
        >Add New Employee</Button>
      </div>
    {employeesList.map(employee => {
      return (
        <div  style={{marginLeft: 'auto', marginRight: 'auto'}} key={employee.id}>
        <div style={{margin: '20px', borderRadius: '50%'}} className="adminEmployeeDiv">
        <img src={employee.pic} style={{height: '250px', width: '250px', borderRadius: '50%'}} onClick={() => {clickEmployee(employee.id)}}/><p></p>
        </div>
        <div style={{textAlign: 'center'}}>
        <a onClick={() => {clickEmployee(employee.id)}} style={{color: '#000000'}}>{employee.first_name} {employee.last_name}</a>
        </div>
        </div>
      )
    })}
    </div>
  ) 
}

export default AdminEmployeesView;