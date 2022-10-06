import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

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
    {employeesList.map(employee => {
      return (
        <div key={employee.id} style={{background: '#000000', margin: '20px'}} className="adminEmployeeDiv">
        <img src={employee.pic} style={{height: '250px', width: '250px'}} onClick={() => {clickEmployee(employee.id)}}/><p></p>
        <a onClick={() => {clickEmployee(employee.id)}} style={{color: '#ffffff'}}>{employee.first_name} {employee.last_name}</a>
        </div>
      )
    })}
    </div>
  ) 
}

export default AdminEmployeesView;