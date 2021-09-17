import React from 'react'
import notes from '../assets/data'
import { ReactComponent as ArrowLeft } from '../assets/icons/chevron-left.svg'
import { Link } from 'react-router-dom'

const NotePage = ({match}) => {
    let noteId = match.params.id

    let note = notes.find(note => note.id === Number(noteId)) 

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to="/" >
                        <ArrowLeft />
                    </Link>
                </h3>
            </div>
            <textarea value={note?.body}>

            </textarea>
        </div>
    )
}

export default NotePage
