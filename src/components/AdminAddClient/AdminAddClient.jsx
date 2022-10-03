import React, { useState } from 'react';

function AdminAddClient () {

    //form input fields 
    const [notes, setNotes] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState(0);
    const [bio, setBio] = useState('');

    //client object
    const [newClient, setNewClient] = useState({});

    //functions

    //handleSubmit form
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('handle submit clicked')

    }//end of handleSubmit





    return(
        <>
            <h2>Add New Client</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                    type="text"
                    placeholder="name"
                    />
                </label>
                <label>
                    Address
                    <input
                    type="text"
                    placeholder="name"
                    />
                </label>
                <label>
                    City
                    <input
                    type="text"
                    placeholder="name"
                    />
                </label>
                <label>
                    State
                    <input
                    type="text"
                    placeholder="name"
                    />
                </label>
                <label>
                    Zip
                    <input
                    type="number"
                    placeholder="name"
                    />
                </label>
                <label>
                    Bio
                <textarea 
                type="text"
                placeholder="Notes"
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