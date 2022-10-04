import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';

function AdminAllTimesheets() {

    useEffect(() => {
        fetchAdminAllTimesheets();
    }, []);

    const dispatch = useDispatch();

    const fetchAdminAllTimesheets = () => {
        console.log('dispatching to adminAllTimesheets...')
        dispatch({
            type: 'FETCH_ADMIN_ALL_TIMESHEETS'
        })
    }

    return(
        <h1>ADMIN VIEWS ALL TIMEHSHEETS HERE</h1>
    )
}

export default AdminAllTimesheets;