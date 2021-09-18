import React, { useState, useEffect } from 'react'
// import notes from '../assets/data'
import { ReactComponent as ArrowLeft } from '../assets/icons/chevron-left.svg'
import { Link } from 'react-router-dom'

const NotePage = ({match, history}) => {
    let noteId = match.params.id

    // let note = notes.find(note => note.id === Number(noteId)) 

    let [note, setNotes] = useState([null])

    useEffect(() => {
        getNote()
    }, [noteId])

    let getNote = async () => {
        let response = await fetch(`http://localhost:8000/notes/${noteId}`)
        let data = await response.json()
        console.log('data:', data)
        setNotes(data)
    }

    let updateNote = async () =>{
        await fetch(`http://localhost:8000/notes/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        await fetch(`http://localhost:8000/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        history.push('/')
    }

    let handleSubmit = () => {
        if(noteId !== 'new' && !note.body){
            deleteNote()
        } else if(noteId === 'new'){
            updateNote()
        }
        history.push('/')
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to="/" >
                        <ArrowLeft onClick={handleSubmit} />
                    </Link>
                </h3>
                <button>Delete</button>
            </div>
            <textarea onChange={(e)=> {setNotes({...note, 'body':e.target.value})}} value={note?.body}>
            
            </textarea>
        </div>
    )
}

export default NotePage
