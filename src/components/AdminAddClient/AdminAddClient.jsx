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

function AdminAddClient () {

    const dispatch = useDispatch();

    //new client object that takes in user form inputs
    const [newClient, setNewClient] = useState({firstName: '', lastName:'', address: '', city: '', state:'', zip:'', bio:''});

    //Code that handles MUI dialog box open and close
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setNewClient({firstName: '', lastName:'', address: '', city: '', state:'', zip:'', bio:''});

    };

    //setting user input functions:
    const handleFirstName = (event) => {
        setNewClient({...newClient, firstName: event.target.value})
    }
    const handleLastName = (event) => {
        setNewClient({...newClient, lastName: event.target.value})
    }
    const handleAddress = (event) => {
        setNewClient({...newClient, address: event.target.value})
    }
    const handleCity = (event) => {
        setNewClient({...newClient, city: event.target.value})
    }
    const handleState = (event) => {
        setNewClient({...newClient, state: event.target.value})
    }
    const handleZip = (event) => {
        setNewClient({...newClient, zip: event.target.value})
    }
    const handleBio = (event) => {
        setNewClient({...newClient, bio: event.target.value})
    }

    //handleSubmit form
    const handleSubmit = () => {
        // console.log('handle submit clicked');
        // console.log(newClient);
        if (newClient.firstName === '' || newClient.firstLast === '' 
            || newClient.address === '' || newClient.city === '' 
            || newClient.state === '' || newClient.zip === '' 
            || newClient.bio === '') 
        {
            alert ("Please fill out all fields before adding new client.");  
        } else {
            dispatch({
                type: 'ADD_CLIENT',
                payload: newClient
            })
            setNewClient({firstName: '', lastName:'', address: '', city: '', state:'', zip:'', bio:''});
            setOpen(false);
        }
    }//end of handleSubmit



    return(
        <>
            <Button 
            onClick={handleClickOpen}
            variant='contained' 
            style={{float: 'right'}}
            >
                Add New Client
            </Button>
            
            {/* Add new client dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Client</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter information to add new client.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleFirstName}
                        value={newClient.firstName}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleLastName}
                        value={newClient.lastName}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="address"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleAddress}
                        value={newClient.address}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="city"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleCity}
                        value={newClient.city}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="state"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleState}
                        value={newClient.state}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Zip code"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handleZip}
                        value={newClient.zip}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="bio"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleBio}
                        value={newClient.bio}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add Client</Button>
                </DialogActions>
            </Dialog>
        </>

    );


} // end of AdminAddClient component 

export default AdminAddClient;