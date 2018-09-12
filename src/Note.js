import React, { Component } from 'react'
import fire from './fire'

class Note extends Component{
    constructor(){
        super()
        this.state = {
            note: []
        }
        // this.handleChange = this.handleChange.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){        
        let {id} = this.props.match.params
        console.log(this.props.match.params)
        let noteRef = fire.database().ref(`/notes/${id}`)
        noteRef.on('value', snapshot => {
            this.setState({
                note: snapshot.val()
            })
        })
    }
    
    render(){
        return(
            <div>
                <h3>{this.state.note.title}</h3>
                <p>{this.state.note.info}</p>
            </div>
        )
    }
}

export default Note
