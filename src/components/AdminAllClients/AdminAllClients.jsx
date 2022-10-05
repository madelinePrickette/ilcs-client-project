import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import  {useHistory} from 'react-router-dom';
import AdminClientItem from '../AdminClientItem/AdminClientItem';

//MUI Dialog imports
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function AdminAllClients() {



    const clientList = useSelector(store => store.adminClients)

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_CLIENTS'
        })
    }, []);

    const handleAddClient = () => {
        history.push('/add-client');
        console.log('handle add');

    } //end of handleAddClient

    console.log('client list', clientList);

    return(
        <>
            <h2>Clients</h2>
            <table>
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {clientList && clientList.map( client => {
                        return (
                        <AdminClientItem 
                        key={client.client_id} 
                        client={client}
                        />
                        )
                    })}
                </tbody>
            </table>
            <button>
                Add Client
            </button>
        </>
    )

}//end of AdminAllClients

export default AdminAllClients;