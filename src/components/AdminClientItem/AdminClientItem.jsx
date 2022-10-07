import { useState } from 'react';
import {useDispatch} from 'react-redux';
import  {useHistory} from 'react-router-dom';
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

        //useStates
        const [deleteOpen, setDeleteOpen] = useState(false);
        const [editOpen, setEditOpen] = useState(false);

        //variables
        const clientId = client.client_id

        const dispatch = useDispatch();

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
        const handleEditClickOpen = () => {
            setEditOpen(true);

        }//end of handleEditClickOpen
        const handleEditClose = () => {
            setEditOpen(false);

        }//end of handleEditClose
        const handleEdit = () => {
            console.log('in the edit');
        }
        console.log('this is client id', clientId);
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
                        // onChange={handleFirstName}
                        // value={newClient.firstName}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        // onChange={handleLastName}
                        // value={newClient.lastName}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="address"
                        type="text"
                        fullWidth
                        variant="standard"
                        // onChange={handleAddress}
                        // value={newClient.address}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="city"
                        type="text"
                        fullWidth
                        variant="standard"
                        // onChange={handleCity}
                        // value={newClient.city}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="state"
                        type="text"
                        fullWidth
                        variant="standard"
                        // onChange={handleState}
                        // value={newClient.state}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Zip code"
                        type="number"
                        fullWidth
                        variant="standard"
                        // onChange={handleZip}
                        // value={newClient.zip}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="bio"
                        type="text"
                        fullWidth
                        variant="standard"
                        // onChange={handleBio}
                        // value={newClient.bio}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button onClick={handleEdit}>Add Client</Button>
                </DialogActions>
            </Dialog>
        </>
    );

} //end of Admin Client Item

export default AdminClientItem;