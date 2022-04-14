/**
 * Components for Dashboard
 */

import {useEffect, useState} from "react";
import axios from "axios";
import {get_jwt_token} from "./authToken";

import "./stylesheets/dashboard.css"

function SubmissionForm(props) {
    const [content, setContent] = useState('');

    return (
        <form onSubmit={e => {
            e.preventDefault()
            props.onSubmit(content)
        }}>
            <input type="text" placeholder="Content" onChange={e => {
                setContent(e.target.value)
            }} />
            <input type="submit"/>
        </form>
    )
}

function ContentListItem(props) {
    return (
        <li>
            <div>
                <span>{props.content}</span>
                <button onClick={() => {
                    props.onDelete(props.content)
                }}>Delete</button>
            </div>
        </li>
    )
}

function ContentList(props) {
    return (
        <ul>
            {props.content.map(item => (
                <ContentListItem content={item} onDelete={props.onDelete}/>
            ))}
        </ul>
    )
}

export default function Dashboard() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        axios.get('/api/user', {
            headers: {
                Authorization: 'Bearer ' + get_jwt_token()
            }
        }).then(res => {
            setUserData(res.data)
        })
    }, [])

    const onFormSubmit = (value) => {
        axios.post('/api/user', value, {
            headers: {
                Authorization: "Bearer " + get_jwt_token()
            }
        })
            .then(() => {
                setUserData([...userData, value])
            })
    }

    const onItemDelete = (value) => {
        axios.delete('/api/user', {
            data: value,
            headers: {
                Authorization: "Bearer " + get_jwt_token()
            }
        })
            .then(() => {
                const newData = [...userData]
                newData.splice(newData.indexOf(value), 1)

                setUserData(newData)
            })
    }

    return (
        <div>
            <SubmissionForm onSubmit={onFormSubmit} />
            <ContentList content={userData} onDelete={onItemDelete} />
        </div>
    )
}