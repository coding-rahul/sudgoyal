import UserForm from "component/UserForm";
import React from "react";
import { useEffect, useState } from "react";
import './UsersList.css';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()).then((res) => {
            setUsers(res)
        })
    }, [])

    return (
        <div className="content">
            <UserForm users={users} />
        </div>
    )
}

export default UsersList;