import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useState } from 'react';
import Input from './Input';
import './UserForm.css';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const UserForm = (props) => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBVBtdhas5DdD2SBu7AXDrPuLY6Gw9TMb0"
    })
    const [map, setMap] = React.useState(null)
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [selectedUser, setSelectedUser] = useState({})
    const [isFormSubmitted, setIdFormSubmitted] = useState(false)

    const handleOnTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleOnBodyChange = (event) => {
        setBody(event.target.value)
    }

    const handleOnSelect = (event) => {
        const value = event.target.value;
        let user = props.users.filter((user) => user.id === +value)
        setSelectedUser(user[0])
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setIdFormSubmitted(true)
        if (!Object.keys(selectedUser).length) return;
        const user = {
            title: title,
            body: body,
            userId: selectedUser['id']
        }

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json()).then(res => {
            console.log(res)
        })
    }

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const center = {
        // @ts-ignore
        lat: selectedUser && selectedUser.address ? +selectedUser.address.geo.lat : 0,
        // @ts-ignore
        lng: selectedUser && selectedUser.address ? +selectedUser.address.geo.lng : 0
    };

    const availableOptions = [<option key={`select`} value="select" disabled>Select user</option>, ...props.users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)]
    return (
        <form className='form'>

            {!Object.keys(selectedUser).length && isFormSubmitted ? <h6 style={{ color: 'red' }}>Please select a user</h6> : ''}
            <Input
                className="margin"
                label="Title"
                type="text"
                onChange={handleOnTitleChange}
                errorMessage={'Please enter title'}
                isValid={title.length}
                placeholder="Enter title..."
                value={title} />

            <Input
                className="margin"
                label="Body"
                type="text"
                onChange={handleOnBodyChange}
                errorMessage={'Please enter body'}
                isValid={body.length}
                placeholder="Enter body..."
                value={body} />

            <div className="margin">
                <label>Select user</label>
                <select placeholder='Select user...' defaultValue="select" onChange={handleOnSelect}>
                    {availableOptions}
                </select>
            </div>

            <div style={!Object.keys(selectedUser).length ? { display: 'none' } : {}}>
                {Object.keys(selectedUser).length && <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                />}
            </div>

            <div style={{ width: '100%', marginTop: '2rem' }}>
                <button className="button" style={{ width: '100%' }} onClick={onSubmit}>Submit</button>
            </div>
        </form>
    )
}

export default UserForm;