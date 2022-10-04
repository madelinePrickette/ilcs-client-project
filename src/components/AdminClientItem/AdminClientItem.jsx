import { useState } from 'react';
import {useDispatch} from 'react-redux';
import  {useHistory} from 'react-router-dom';

function AdminClientItem ({client}) {

    return(
        <>
            <tr>
                <td>{client.client_first_name}</td>
            </tr>
        </>
    );

} //end of Admin Client Item

export default AdminClientItem;