import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Link, Box, Paper, Typography } from "@material-ui/core";
import MaterialReactTable from "material-react-table";

//This component is reachable only by admins after logging in and clicking on the employees link from the drawer. The admin can view all current employees and can click on an individual employee row to view more information. Clicking on the 'add new employee' button will bring the admin to a new component to register a new employee.

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
    <div>
      <div style={{ textAlign: "left", marginLeft: "10px" }}>
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
