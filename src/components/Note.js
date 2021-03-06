import React, { Component } from 'react'
import fire from '../firebase/fire'
import { Redirect } from 'react-router-dom';

class Note extends Component{
    constructor(props){
        super(props)
        this.state = {
            note: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){        
        let {id} = this.props.match.params
        console.log(id)
        let noteRef = fire.database().ref(`/notes/${id}`)
        noteRef.on('value', snapshot => {
            this.setState({
                note: snapshot.val()
            })
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        let {id} = this.props.match.params
        let noteRef = fire.database().ref(`/notes/${id}`);
        const note = {
        title: this.state.note.title,
        info: this.state.note.info
        }
        noteRef.update(note);
    }
    handleChange(e) {
        const state = this.state.note
        state.info = e.target.value
        this.setState(state)
    }
    render(){
        if (this.state.note === null){
            return <Redirect to='/' />
        }
        return(
            <div className="jotpad">
                <h3 className="jot">{this.state.note.title}</h3>
                <form className="pad" onSubmit={this.handleSubmit}>
                    <textarea onChange={this.handleChange} value={this.state.note.info} />
                    <button className="save-btn">Save</button>
                </form>
            </div>
        )
    }
}

export default Note
