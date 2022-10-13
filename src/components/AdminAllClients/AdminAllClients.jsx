import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AdminClientItem from '../AdminClientItem/AdminClientItem';
import AdminAddClient from '../AdminAddClient/AdminAddClient';

//mui imports for designing table
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

function AdminAllClients() {

    //const variables
    const dispatch = useDispatch();
    const clientList = useSelector(store => store.adminClients);
    //MUI TABLE STYLES
    const useStylesForClientTable = makeStyles({
        root: {
          width: '100%',
          margin: 'auto',
        },
        clientsContainer: {
          maxHeight: '100%',
          maxWidth:'100%',
        }
    });
    const tableClasses = useStylesForClientTable();

    useEffect(() => {
        dispatch({
            type: 'FETCH_CLIENTS'
        })
    }, []);

    //This component contains code for the client table.
    //'FETCH_CLIENTS' is dispatched in the use effect to get all client information from the database and set in a reducer.
    //The client information is mapped over to return each individual client info in a new component called, AdminClientItem.
    
    return(
        <div className={useStylesForClientTable.clientsContainer}>  
            <Paper className={tableClasses.root}>
                <h1 style={{marginLeft:'10px'}}>Clients</h1>
                {/* This component contains the Add Client Dialog */}
                <AdminAddClient/> 
                <TableContainer className={tableClasses.container}>   
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>State</TableCell>
                            <TableCell>Zip</TableCell>
                            <TableCell>Bio</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* ClientList is pulled from the store and contains all client info */}
                        {clientList && clientList.map( client => {
                            return (
                            // <AdminClientItem /> contains individual client data.
                            <AdminClientItem 
                            key={client.client_id} 
                            client={client}
                            />
                            )
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}//end of AdminAllClients

export default AdminAllClients;