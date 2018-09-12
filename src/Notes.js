import React, { Component } from 'react';
import fire from './fire';
import { Link } from 'react-router-dom';

class Notes extends Component{
    constructor(){
        super()
        this.state = {
            title: '',
            note: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        let noteRef = fire.database().ref('notes');
        noteRef.on('value', snapshot => {
            let notes = snapshot.val();
            let newNote = [];
            for (let note in notes){
                newNote.push({
                    id: note,
                    title: notes[note].title
                })
            }
            this.setState({
                note: newNote
            })
        })
    }
    handleChange(e) {
        this.setState({
        [e.target.name]: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        let noteRef = fire.database().ref('notes');
        const note = {
        title: this.state.title
        }
        noteRef.push(note);
        this.setState({
            title: ''
        })
    }
    removeItem(noteId){
        let noteRef = fire.database().ref(`/notes/${noteId}`)
        noteRef.remove()
    }
    render(){
        return(
            <div className='side-bar'>
                <div>
                    {this.state.note.map((note, i) =>
                    <div className="note" key={i}>
                        {/* <Link to={'/notes/' + note.id} params={{id: note.id}}><p>{note.title}</p></Link> */}
                        <a href={'/notes/' + note.id}><p>{note.title}</p></a>
                        <button onClick={() => this.removeItem(note.id)}>Delete</button>
                    </div>
                    )}
                </div>
                <div>
                    <section className="add-item">
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" name="title" placeholder="New Note" onChange={this.handleChange} value={this.state.title} />
                            <button>Add</button>
                        </form>
                    </section>
                </div>
            </div>
        )
    }
}

export default Notes