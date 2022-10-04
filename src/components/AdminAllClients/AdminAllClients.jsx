import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import  {useHistory} from 'react-router-dom';
import AdminAddClient from '../AdminAddClient/AdminAddClient';
import AdminClientItem from '../AdminClientItem/AdminClientItem';


function AdminAllClients() {

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
                    
                    <AdminClientItem />
                    
                </tbody>
            </table>
            <button
            onClick={handleAddClient}
            >
                Add Client
            </button>
        </>
    )

}//end of AdminAllClients

export default AdminAllClients;