import { useState } from 'react';
import {useDispatch} from 'react-redux';
import  {useHistory} from 'react-router-dom';

//MUI Dialog imports
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AdminClientItem ({client}) {

        //useStates
        const [open, setOpen] = useState(false);

        //variables
        const clientId = client.client_id

        const dispatch = useDispatch();

        const handleClickOpen = () => {
            setOpen(true);
            console.log('handle click clicked');
          };
        
        const handleClose = () => {
            setOpen(false);
            console.log('handle close');
          };
        
        const handleDelete = () => {
            setOpen(false);
            console.log('close');
            dispatch({
                type: 'DELETE_CLIENT',
                payload: clientId
            })
            

        }//end of handleDelete function
        console.log('this is client id', clientId);
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
                <td>
                    <button
                    onClick={handleClickOpen}
                    >
                        delete
                    </button>
                </td>

            </tr>

            <Dialog
            open={open}
            onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete Client?"}
                </DialogTitle>
               
                <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleDelete} autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>
        </>
    );

} //end of Admin Client Item

export default AdminClientItem;