import React,{Component} from 'react';
// import UsersList from './UsersList';
import WordList from './WordList';
// import AddUser from './AddUser';
import AddWord from './AddWord';
import {Provider} from './Context';
class App extends Component {
    state = {
        post_found:true,
        new_word:false
    }
    addNewWord = (id,cuvant,predefinitie,definitie) => {
        if(this.state.post_found){
            this.setState({
                new_word:{id:id,cuvant:cuvant,predefinitie:predefinitie,definitie:definitie}
            });
        }
        else{
            this.setState({
                post_found:true
            });
        }
        
    }

    postShow = (show) => {
        this.setState({
            post_found:show
        })
    }
    
    render(){
        const contextValue = {
            new_word:this.state.new_word,
            addNewWord:this.addNewWord,
            post_show:this.postShow
        }

        let showWords;
        if(this.state.post_found){
            showWords = (
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Cuvânt</th>
                            <th>Predefiniție</th>
                            <th>Definiție</th>
                            <th>Acțiuni</th>
                        </tr>
                    </thead>
                    <tbody>
                        <WordList/>
                    </tbody>
                </table>
            );
        }
        else{
            showWords = (
                <div className="alert alert-light" role="alert">
                    <h4 className="alert-heading">Nu am găsit niciun cuvânt în dicționar.</h4>
                    <hr/>
                    <p>Vă rugăm să le adăugați.</p>
                </div>
            );
        }
        return (
            <Provider value={contextValue}>
            <div className="container-fluid">
            <div className="container p-5">
                <div className="card shadow-sm">
                    <h1 className="card-header text-center text-muted">Gestionare dicționar</h1>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <AddWord/>
                            </div>
                            <div className="col-md-12">
                                {showWords}
                            </div>
                        </div>
                    </div>
                </div>
    
            </div>
            </div>
        </Provider>
        );
    }
}
export default App;