import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import  {useHistory} from 'react-router-dom';
import AdminClientItem from '../AdminClientItem/AdminClientItem';
import AdminAddClient from '../AdminAddClient/AdminAddClient';
import './AdminAllClients.css';


function AdminAllClients() {



    const clientList = useSelector(store => store.adminClients);


    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_CLIENTS'
        })
    }, []);

  


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
            <AdminAddClient
            />
           
        </>
    )

}//end of AdminAllClients

export default AdminAllClients;