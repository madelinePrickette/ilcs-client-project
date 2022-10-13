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

    //const variables
    const dispatch = useDispatch();
    const [newClient, setNewClient] = useState({firstName: '', lastName:'', address: '', city: '', state:'', zip:'', bio:''});
    const [open, setOpen] = useState(false);
    
    //functions that handle open/close of AdminAddClient Dialog
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setNewClient({firstName: '', lastName:'', address: '', city: '', state:'', zip:'', bio:''});
    };

    //functions that set user inputs:
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
    const handleDemoData = () => {
        console.log('demo data clicked');
        setNewClient({firstName: 'Jane', lastName:'Smith', address: '4990 Harriet Ave', city: 'Minneapolis', state:'MN', zip:'55414', bio:'Needs assistance with grocery shopping and light house work.'});
    }

    //function that handles submitting the form
    const handleSubmit = () => {
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

    //This component contains code that allows the admin to add a new client to the database.
    //The component contains input fields to capture the new client information.
    //The handle submit button sends the information captured by the input fields to the database. 

    return(
        <>
        {/* This button opens the Dialog */}
            <Button 
            onClick={handleClickOpen}
            variant='contained' 
            style={{float: 'right', marginBottom: '10px', marginRight: '10px'}}
            >
                Add New Client
            </Button>
            
            {/* AddNewClient Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle
                onClick={handleDemoData}>Add New Client</DialogTitle>
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
                        multiline
                        minRows={4}
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