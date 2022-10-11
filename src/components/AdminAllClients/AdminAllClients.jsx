import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import  {useHistory} from 'react-router-dom';
import AdminClientItem from '../AdminClientItem/AdminClientItem';
import AdminAddClient from '../AdminAddClient/AdminAddClient';
import './AdminAllClients.css';

//mui for table
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';



function AdminAllClients() {



    const clientList = useSelector(store => store.adminClients);


    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_CLIENTS'
        })
    }, []);
     //MUI TABLE STYLES
     const useStylesForTable = makeStyles({
        root: {
          width: '100%',
        },
        container: {
          maxHeight: 540,
        },
    });
        const tableClasses = useStylesForTable();

    //END MUI TABLE STYLES
  


    console.log('client list', clientList);

    return(
        <>  
            
            <h2>Clients</h2>

            <AdminAddClient/> 

            <Paper className={tableClasses.root}>
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
                    {clientList && clientList.map( client => {
                        return (
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
        </>
    )

}//end of AdminAllClients

export default AdminAllClients;