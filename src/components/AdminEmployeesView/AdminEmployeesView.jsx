import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Link, Box, Paper } from '@material-ui/core'
import MUIDataTable from "mui-datatables";

function AdminEmployeesView() {

  useEffect(() => {
    dispatch({type: 'FETCH_EMPLOYEES_LIST'});
  }, []);

  //Const variables

  const dispatch = useDispatch();
  const employeesList = useSelector(store => store.adminemployeesview);
  const history = useHistory();

  const clickEmployee = (id) => {
    // console.log(id);
    history.push(`/employee/${id}`)

  }

  //Datatables variables
  const columns = [
    {
      name: "",
      label: "",
      options: {
       filter: false,
       sort: false,
      }
     },
     {
      name: "first_name",
      label: "First Name",
      options: {
       filter: true,
       sort: true,
      }
     },
     {
      name: "last_name",
      label: "Last Name",
      options: {
       filter: true,
       sort: true,
      }
     },
     {
      name: "email",
      label: "Email",
      options: {
       filter: true,
       sort: true,
      }
     },
     {
      name: "id",
      label: "ID",
      options: {
        display: false,
       filter: true,
       sort: true,
      }
     },
  ]
  const data = [];
  const responsive = 'standard';
  const options = {
    selectableRowsHeader: false,
    selectableRowsOnClick: false,
    selectableRowsHideCheckboxes: true,
    responsive: 'standard',
    onRowClick: rowData => clickEmployee(rowData[4])
  };




  return (
    // <div className='adminEmployeesView'>
    //   <div className='employeeListTitle' style={{textAlign: 'center', width: '100%'}}>
    //     <h2>Employees</h2>
    //     <Button 
    //       variant='contained' 
    //       style={{float: 'right', marginBottom: '10px'}}
    //       onClick={() => {history.push('/registration')}}
    //     >Add New Employee</Button>
    //   </div>
    // {employeesList.map(employee => {
    //   return (
    //     <div  style={{marginLeft: 'auto', marginRight: 'auto'}} key={employee.id}>
    //     <div style={{margin: '20px', borderRadius: '50%'}} className="adminEmployeeDiv">
    //     <img src={employee.pic} style={{height: '250px', width: '250px', border: '10px solid #D3D3D3', borderRadius: '50%', objectFit: 'cover'}} onClick={() => {clickEmployee(employee.id)}}/><p></p>
    //     </div>
    //     <div style={{textAlign: 'center'}}>
    //     <Link onClick={() => {clickEmployee(employee.id)}} style={{color: '#000000'}}>{employee.first_name} {employee.last_name}</Link>
    //     </div>
    //     </div>
    //   )
    // })}
    // </div>
    <div>
      {employeesList.map(employee => {
        data.push([<img  style={{height: '75px', width: '75px', objectFit: 'cover'}} src={employee.pic}/>, employee.first_name, employee.last_name, employee.email, employee.id])
      })}
      <MUIDataTable
      title={"Employees"}
      data={data}
      options={options}
      columns={columns}
      />
    </div>
  ) 
}

export default AdminEmployeesView;