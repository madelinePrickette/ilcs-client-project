import { useState } from 'react';
import {useDispatch} from 'react-redux';
import './AdminClientItem.css';

//MUI Dialog imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AdminClientItem ({client}) {

        const dispatch = useDispatch();    
        //use states to control dialog open/close
        const [deleteOpen, setDeleteOpen] = useState(false);
        const [editOpen, setEditOpen] = useState(false);
        //Updated Client Info Object
        const [editClient, setEditClient] = useState({firstName: client.client_first_name, lastName: client.client_last_name, address: client.address, city: client.city, state: client.state, zip: client.zip, bio: client.bio, clientId: client.client_id});

        //setting user input functions:
        const handleFirstName = (event) => {
            setEditClient({...editClient, firstName: event.target.value})
        }
        const handleLastName = (event) => {
            setEditClient({...editClient, lastName: event.target.value})
        }
        const handleAddress = (event) => {
            setEditClient({...editClient, address: event.target.value})
        }
        const handleCity = (event) => {
            setEditClient({...editClient, city: event.target.value})
        }
        const handleState = (event) => {
            setEditClient({...editClient, state: event.target.value})
        }
        const handleZip = (event) => {
            setEditClient({...editClient, zip: event.target.value})
        }
        const handleBio = (event) => {
            setEditClient({...editClient, bio: event.target.value})
        }
        //functions to handle delete dialog open/close
        const handleDeleteClickOpen = () => {
            setDeleteOpen(true);
            console.log('handle click clicked');
          };
        const handleDeleteClose = () => {
            setDeleteOpen(false);
            console.log('handle close');
          };
        const handleDelete = () => {
            setDeleteOpen(false);
            console.log('close');
            dispatch({
                type: 'DELETE_CLIENT',
                payload: clientId
            })
        }//end of handleDelete function
        //functions to handle edit dialog open/close
        const handleEditClickOpen = () => {
            setEditOpen(true);
            setEditClient({firstName: client.client_first_name, lastName: client.client_last_name, address: client.address, city: client.city, state: client.state, zip: client.zip, bio: client.bio, clientId: client.client_id});
            console.log('this is edit client', editClient);
        }//end of handleEditClickOpen
        const handleEditClose = () => {
            setEditOpen(false);
        }//end of handleEditClose
        const handleEdit = () => {
            // console.log('in the edit');
            // console.log('this is edit client', editClient);
            
            dispatch({
                type: 'EDIT_CLIENT',
                payload: editClient
            })
            setEditOpen(false);
        }
        // console.log('this is client id', clientId);
    return(
        <>
            {client.client_active ?

                <tr>
                    <td>{client.client_first_name}</td>
                    <td>{client.client_last_name}</td>
                    <td>{client.address}</td>
                    <td>{client.city}</td>
                    <td>{client.state}</td>
                    <td>{client.zip}</td>
                    <td>{client.bio}</td>
                    <td>
                        <button
                        onClick={handleEditClickOpen}
                        >
                            edit
                        </button></td>
                    <td>
                        <button
                        onClick={handleDeleteClickOpen}
                        >
                            delete
                        </button>
                    </td>
                </tr>
                :
                <tr className="hide-row">
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
                        onClick={handleDeleteClickOpen}
                        >
                            delete
                        </button>
                    </td>
                </tr>
            }

            {/* Delete Client Modal Code: */}

            <Dialog
            open={deleteOpen}
            onClose={handleDeleteClose}
            >
                <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete Client?"}
                </DialogTitle>
               
                <DialogActions>
                <Button onClick={handleDeleteClose}>Disagree</Button>
                <Button onClick={handleDelete} autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Client Modal Code: */}

            <Dialog open={editOpen} onClose={handleEditClose}>
                <DialogTitle>Edit Client</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please edit information to update client.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleFirstName}
                        value={editClient.firstName}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleLastName}
                        value={editClient.lastName}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="address"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleAddress}
                        value={editClient.address}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="city"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleCity}
                        value={editClient.city}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="state"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleState}
                        value={editClient.state}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Zip code"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handleZip}
                        value={editClient.zip}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="bio"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleBio}
                        value={editClient.bio}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button onClick={handleEdit}>Confirm Edit Client</Button>
                </DialogActions>
            </Dialog>
        </>
    );

} //end of Admin Client Item

export default AdminClientItem;