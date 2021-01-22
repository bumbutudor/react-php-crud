import React, {Component} from 'react';
import Axios from 'axios';
import {AppContext} from './Context';

class WordList extends Component{
    static contextType = AppContext;   
    
    state = {
        words:[]
    }
    
    fetchWords = () => {
        fetch('http://localhost/php-react/all-words.php')
        .then(response => {
            response.json().then(function(data) {
                if(data.success === 1){
                    this.setState({
                        words:data.words.reverse()
                    });
                } 
                else{
                    this.context.post_show(false);
                }               
            }.bind(this));
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount(){
        this.fetchWords();
    }

    handleUpdate = (id) => {
        // Axios.post('http://localhost/php-react/update-user.php',
        // {
        //     id:id,
        //     user_name:this.name.value,
        //     user_email:this.email.value
        // })
        // .then(({data}) => {
        //     if(data.success === 1){
        //         let users = this.state.users.map(user => {
        //             if(user.id === id){
        //                 user.user_name = this.name.value;
        //                 user.user_email = this.email.value;
        //                 user.isEditing = false;
        //                 return user;
        //             }
        //             return user; 
        //         });
        //         this.setState({
        //             users
        //         });
        //     }
        //     else{
        //         alert(data.msg);
        //     }
        // })
        // .catch(error => {
        //     console.log(error);
        // });
    }

    
    editMode = (id) => {
    //     let users = this.state.users.map(user => {
    //         if(user.id === id){
    //             user.isEditing = true;
    //             return user;
    //         }
    //         user.isEditing = false;
    //         return user;
            
    //     });

    //     this.setState({
    //         users
    //     });
       
    // }

    // cancleEdit = (id) => {
    //     let users = this.state.users.map(user => {
    //         if(user.id === id){
    //             user.isEditing = false;
    //             return user;
    //         }
    //         return user
            
    //     });
    //     this.setState({
    //         users
    //     });
    }

    handleDelete = (id) => {
        let deleteWord = this.state.words.filter(cuvant => {
            return cuvant.id !== id;
        });
        
        Axios.post('http://localhost/php-react/delete-word.php',{
            id:id
        })
        .then(({data}) => {
            if(data.success === 1){
                this.setState({
                    words:deleteWord
                });
            }
            else{
                alert(data.msg);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidUpdate(){
        let newWord = this.context.new_word;
        if(newWord){ 
            this.setState({
                words:[
                    newWord,
                    ...this.state.words
                    
                ]
            });          
            this.context.new_word = false;
        }        
    }

    render(){

        let allWords = this.state.words.map(({id,cuvant,predefinitie,definitie,isEditing}, index) => {
            
            return isEditing === true ? (   
            <tr key={id}>
                <td><input className="form-control" type="text" ref={(item) => this.name = item} defaultValue={cuvant}/></td>
                <td><input className="form-control" type="predefinitie" ref={(item) => this.predefinitie = item} defaultValue={predefinitie}/></td>
                <td><input className="form-control" type="definitie" ref={(item) => this.definitie = item} defaultValue={definitie}/></td>
                <td>
                    <button className="btn btn-success mr-2" onClick={() => this.handleUpdate(id)}>Salvează</button>
                    <button onClick={() => this.cancleEdit(id)} className="btn btn-light">Nu salva</button>
                </td>
            </tr>
            ):
            ( 
                <tr key={id}>
                    <td>{cuvant}</td>
                    <td><span>{predefinitie}</span></td>
                    <td>{definitie}</td>
                    <td>
                        <button className="btn btn-dark mr-2" onClick={() => this.editMode(id)}>Modifică</button>
                        <button onClick={() => this.handleDelete(id)} className="btn btn-danger">Șterge</button>
                    </td>
                </tr>
            );
        });

        

        return(
            <>
            {allWords}
            </>
        );
        
    }
}

export default WordList;