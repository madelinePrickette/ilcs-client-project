import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Link, Box, Paper, Typography } from "@material-ui/core";
import MaterialReactTable from "material-react-table";

function AdminEmployeesView() {
  useEffect(() => {
    dispatch({ type: "FETCH_EMPLOYEES_LIST" });
  }, []);

  //Const variables

  const dispatch = useDispatch();
  const employeesList = useSelector((store) => store.adminemployeesview);
  const history = useHistory();

  const clickEmployee = (id) => {
    history.push(`/employee/${id}`);
  };

  //MaterialReactTable variables
  const data = [];
  const columns = useMemo(
    () => [
      {
        accessorKey: "first_name", //access nested data with dot notation
        header: "First Name",
        Cell: ({ cell, row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              alt="avatar"
              height={50}
              width={50}
              src={row.original.pic}
              loading="lazy"
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
            <Typography>{cell.getValue()}</Typography>
          </Box>
        ),
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
      },
      {
        accessorKey: "email", //normal accessorKey
        header: "Email",
      },
      {
        accessorKey: "id", //normal accessorKey
        header: "ID",
      },
    ],
    []
  );

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
      <div style={{ textAlign: "left", marginLeft: '10px' }}>
        <h1>Employees</h1>
      </div>
      <div>
        {employeesList.map((employee) => {
          data.push({
            pic: employee.pic,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            id: employee.id,
          });
        })}
        <MaterialReactTable
          columns={columns}
          data={data}
          enableFullScreenToggle={false}
          enableColumnResizing
          renderTopToolbarCustomActions={() => (
            <Box>
              <Button
                variant="contained"
                style={{ float: "right", marginBottom: "10px" }}
                onClick={() => {
                  history.push("/registration");
                }}
              >
                Add New Employee
              </Button>
            </Box>
          )}
          initialState={{ columnVisibility: { id: false } }}
          muiTableBodyRowProps={({ row }) => ({
            onClick: (event) => {
              clickEmployee(row.original.id);
            },
            sx: {
              cursor: "pointer", //you might want to change the cursor too when adding an onClick
            },
          })}
          muiTopToolbarProps={{
            //no useTheme hook needed, just use the `sx` prop with the theme callback
            sx: {
              backgroundColor: "#D3D3D3",
            },
          }}
          muiTableHeadCellProps={{
            //no useTheme hook needed, just use the `sx` prop with the theme callback
            sx: {
              backgroundColor: "#3768AD",
              color: "#FFFFFF",
            },
          }}
          // #3768AD
        />
      </div>
    </div>
  );
}

export default AdminEmployeesView;
