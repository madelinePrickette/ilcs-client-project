import { useState } from 'react';
import {useDispatch} from 'react-redux';

function AdminAddClient () {

    const dispatch = useDispatch();

    //client object
    const [newClient, setNewClient] = useState({firstName: '', lastName:'', address: '', city: '', state:'', zip:'', bio:''});

    //setting input functions:
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
    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log('handle submit clicked');
        // console.log(newClient);
        dispatch({
            type: 'ADD_CLIENT',
            payload: newClient
        })
        setNewClient({firstName: '', lastName:'', address: '', city: '', state:'', zip:'', bio:''});

    }//end of handleSubmit



    

    return(
        <>
            <h2>Add New Client</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name
                    <input
                    type="text"
                    placeholder="First Name"
                    onChange={handleFirstName}
                    value={newClient.firstName}
                    />
                </label>
                <label>
                    Last Name
                    <input
                    type="text"
                    placeholder="Last Name"
                    onChange={handleLastName}
                    value={newClient.lastName}
                    />
                </label>
                <label>
                    Address
                    <input
                    type="text"
                    placeholder="Address"
                    onChange={handleAddress}
                    value={newClient.address}
                    />
                </label>
                <label>
                    City
                    <input
                    type="text"
                    placeholder="City"
                    onChange={handleCity}
                    value={newClient.city}
                    />
                </label>
                <label>
                    State
                    <input
                    type="text"
                    placeholder="State"
                    onChange={handleState}
                    value={newClient.state}
                    />
                </label>
                <label>
                    Zip
                    <input
                    type="number"
                    placeholder="Zip"
                    onChange={handleZip}
                    value={newClient.zip}
                    />
                </label>
                <label>
                    Bio
                    <textarea 
                    type="text"
                    placeholder="Bio"
                    onChange={handleBio}
                    value={newClient.bio}
                    />
                </label>
                <button>Cancel</button>
                <button
                type="submit">
                    Submit
                </button>

            </form>
        </>

    );


} // end of AdminAddClient component 

export default AdminAddClient;