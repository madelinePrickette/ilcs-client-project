import { useState } from 'react';
import {useDispatch} from 'react-redux';

//MUI Dialog imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//mui for table
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

//This component is reachable only by admins. AdminAllClients maps over the client list and returns this component. 
//In the mapping, AdminAllClients passes the individual client data as a prop. 
//This component contains the information on a single client from the database.
//This component also contains buttons to edit and delete the individual client info.

function AdminClientItem ({client}) {

        //const variables
        const dispatch = useDispatch(); 
        const clientId = client.client_id;
        const [editClient, setEditClient] = useState({firstName: client.client_first_name, lastName: client.client_last_name, address: client.address, city: client.city, state: client.state, zip: client.zip, bio: client.bio, clientId: client.client_id});

        //useStates to control Dialogs open/close functionality
        const [deleteOpen, setDeleteOpen] = useState(false);
        const [editOpen, setEditOpen] = useState(false);

        //Setting user input functions:
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
          };
        const handleDeleteClose = () => {
            setDeleteOpen(false);
          };
        
        //function to handle delete button action
        const handleDelete = () => {
            setDeleteOpen(false);
            dispatch({
                type: 'DELETE_CLIENT',
                payload: clientId
            })
        }//end of handleDelete function

        //functions to handle edit dialog open/close
        const handleEditClickOpen = () => {
            setEditOpen(true);
            setEditClient({firstName: client.client_first_name, lastName: client.client_last_name, address: client.address, city: client.city, state: client.state, zip: client.zip, bio: client.bio, clientId: client.client_id});
        }//end of handleEditClickOpen
        const handleEditClose = () => {
            setEditOpen(false);
        }//end of handleEditClose

        //function to handle edit client action.
        const handleEdit = () => {
            dispatch({
                type: 'EDIT_CLIENT',
                payload: editClient
            })
            setEditOpen(false);
        }
        
    return(
        <>
            {/* Checking if the client is active in the system. */}
            {/* If active, the client will render in the DOM */}
            {/* If not active, the client will be assigned a 'hide-class' class and will be hidden from render in DOM */}
            {client.client_active ?

                <TableRow hover >
                    <TableCell>{client.client_first_name}</TableCell>
                    <TableCell>{client.client_last_name}</TableCell>
                    <TableCell>{client.address}</TableCell>
                    <TableCell>{client.city}</TableCell>
                    <TableCell>{client.state}</TableCell>
                    <TableCell>{client.zip}</TableCell>
                    <TableCell
                    style={{width: '30%', whiteSpace: 'normal',
                    wordBreak: 'break-word'}}
                    >{client.bio}</TableCell>
                    <TableCell>
                        <Button
                        onClick={handleEditClickOpen}
                        variant='contained' 
                        >
                            edit
                        </Button>
                    </TableCell>
                    <TableCell>
                        <Button
                        onClick={handleDeleteClickOpen}
                        variant='contained' 
                        >
                            delete
                        </Button>
                    </TableCell>
                </TableRow>
                :
                <TableRow className="hide-row" style={{display: 'none'}}>
                    <TableCell>{client.client_first_name}</TableCell>
                    <TableCell>{client.client_last_name}</TableCell>
                    <TableCell>{client.address}</TableCell>
                    <TableCell>{client.city}</TableCell>
                    <TableCell>{client.state}</TableCell>
                    <TableCell>{client.zip}</TableCell>
                    <TableCell>{client.bio}</TableCell>
                    <TableCell>
                        <Button
                        variant='contained'
                        onClick={handleDeleteClickOpen}
                        >
                            edit
                        </Button>
                    </TableCell>
                    <TableCell>
                        <Button
                        variant='contained'
                        onClick={handleDeleteClickOpen}
                        >
                            delete
                        </Button>
                    </TableCell>
                </TableRow>
            }

            {/* Delete Client Modal Code: */}
            <Dialog
            open={deleteOpen}
            onClose={handleDeleteClose}
            >
                <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete client?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Delete client will remove client from the application interface.
                    </DialogContentText>
                </DialogContent>
               
                <DialogActions>
                <Button 
                onClick={handleDeleteClose}
                variant='contained'
                >
                    Cancel
                </Button>
                <Button 
                onClick={handleDelete}
                variant='contained'
                >
                    Delete Client
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
                        multiline
                        minRows={4}
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
                    <Button 
                    onClick={handleEditClose}
                    variant='contained'
                    >
                        Cancel
                    </Button>
                    <Button 
                    onClick={handleEdit}
                    variant='contained'
                    >
                        Confirm Edit Client
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
} //end of Admin Client Item

export default AdminClientItem;