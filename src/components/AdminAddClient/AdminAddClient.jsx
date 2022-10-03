import React, { useState } from 'react';

function AdminAddClient () {

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
        console.log('handle submit clicked');
        console.log(newClient);

    }//end of handleSubmit



    

    return(
        <>
            <h2>Add New Client</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name
                    <input
                    type="text"
                    placeholder="name"
                    onChange={handleFirstName}
                    />
                </label>
                <label>
                    Last Name
                    <input
                    type="text"
                    placeholder="name"
                    onChange={handleLastName}
                    />
                </label>
                <label>
                    Address
                    <input
                    type="text"
                    placeholder="name"
                    onChange={handleAddress}
                    />
                </label>
                <label>
                    City
                    <input
                    type="text"
                    placeholder="name"
                    onChange={handleCity}
                    />
                </label>
                <label>
                    State
                    <input
                    type="text"
                    placeholder="name"
                    onChange={handleState}
                    />
                </label>
                <label>
                    Zip
                    <input
                    type="number"
                    placeholder="name"
                    onChange={handleZip}
                    />
                </label>
                <label>
                    Bio
                <textarea 
                type="text"
                placeholder="Notes"
                onChange={handleBio}
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