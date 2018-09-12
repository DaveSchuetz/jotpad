import React, { Component } from 'react'
import fire from './fire'

class Note extends Component{
    constructor(props){
        super(props)
        this.state = {
            note: []
        }
        // let {id} = this.props.match.params
        // console.log(id)
        // this.noteRef = fire.database().ref().child(`/notes/${id}`)
        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    // componentDidMount(){
    //     this.noteRef.on('value', snapshot => {
    //         this.setState({
    //             note: snapshot.val()
    //         })
    //     })
    // }
    // componentWillUnmount(){
    //     this.noteRef.off
    // }
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
        return(
            <div>
                <h3>{this.state.note.title}</h3>
                {/* <p>{this.state.note.info}</p> */}
                <form onSubmit={this.handleSubmit}>
                    <textarea rows="40" cols="80" onChange={this.handleChange} value={this.state.note.info} />
                    <button>Save</button>
                </form>
            </div>
        )
    }
}

export default Note
