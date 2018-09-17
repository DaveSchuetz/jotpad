import React, { Component } from 'react';
import fire from '../firebase/fire';



class Notes extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            title: '',
            note: [],
            authUser: props.authUser,
            collapsed: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleNavbar = this.toggleNavbar.bind(this);
    }
    componentWillReceiveProps(nextProps){
        this.setState(nextProps)
        let noteRef = fire.database().ref('notes').orderByChild('owner').equalTo(this.state.authUser);
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
        title: this.state.title,
        owner: this.state.authUser
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
    toggleNavbar() {
        this.setState({
        collapsed: !this.state.collapsed,
        });
        }
    render(){
        const collapsed = this.state.collapsed;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
        return(
            <nav className="navbar navbar-light navbar-expand-lg">
                <button onClick={this.toggleNavbar} className={`${classTwo}`} data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${classOne}`} id="navbarCollapse">
                    <div>
                    {this.state.note.map((note, i) =>
                    <div className="navbar-item" key={i}>
                        {/* <Link to={'/notes/' + note.id} params={{id: note.id}}><p>{note.title}</p></Link> */}
                        <a href={'/notes/' + note.id} className="note-link">{note.title}</a>
                        <button className="jot-del" onClick={() => this.removeItem(note.id)}>X</button>
                    </div>
                    )}
                    
                    {this.state.authUser ? (
                   
                        <form className="new-jot" onSubmit={this.handleSubmit}>
                            <input type="text" name="title" placeholder="New Jot" onChange={this.handleChange} value={this.state.title} />
                            <button className="jot-add">+</button>
                        </form>
                
                    ) : <div></div>
                    }
                    </div>
                </div>
            </nav>
        )
    }
}

export default Notes