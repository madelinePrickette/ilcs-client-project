import { useState } from 'react';
import {useDispatch} from 'react-redux';
import  {useHistory} from 'react-router-dom';

function AdminClientItem ({client}) {

    return(
        <>
            <tr>
                <td>{client.client_first_name}</td>
                <td>{client.client_last_name}</td>
                <td>{client.address}</td>
                <td>{client.city}</td>
                <td>{client.state}</td>
                <td>{client.zip}</td>
                <td>{client.bio}</td>
                <td><button>edit</button></td>
                <td><button>delete</button></td>








            </tr>
        </>
    );

} //end of Admin Client Item

export default AdminClientItem;