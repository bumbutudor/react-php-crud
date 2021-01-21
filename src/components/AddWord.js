import React,{Component} from 'react';
import Axios from 'axios';
import {AppContext} from './Context';

export default class AddWord extends Component{
    static contextType = AppContext;   
    
    insertWord = (event) => {
        event.preventDefault();
        event.persist();
        Axios.post('http://localhost/php-react/add-word.php',{
            dict_cuvant:this.cuvant.value,
            dict_predefinitie:this.predefinitie.value,
            dict_definitie:this.definitie.value
        })
        .then(function ({data}) {
            if(data.success === 1){
                this.context.addNewWord(data.id,this.cuvant.value,this.predefinitie.value,this.definitie.value);
                event.target.reset();
                alert(data.msg);
            }
            else{
                alert(data.msg);  
            }
        }.bind(this))
        .catch(function (error) {
        console.log(error);
        });

    }

    render(){

        return(
            <form onSubmit={this.insertWord}>
            <div className="form-row">
                <div className="form-group col-sm-2">
                    <label className="font-weight-bold">Cuvânt</label>
                    <input type="text" name="cuvant" ref={(val) => this.cuvant = val} className="form-control" placeholder=""/>
                </div>
                <div className="form-group col-sm-4">
                    <label className="font-weight-bold">Predefiniție</label>
                    <textarea rows="1" name="predefinitie" ref={(val) => this.predefinitie = val} className="form-control" placeholder=""></textarea>
                </div>
                <div className="form-group col-sm-6">
                    <label className="font-weight-bold">Definiție</label>
                    <textarea rows="1" name="definitie" ref={(val) => this.definitie = val} className="form-control" placeholder=""></textarea>
                </div>
                <div className="form-group col-sm-12 text-right">
                    <button type="submit" className="btn btn-primary">Adaugă</button>
                </div>
            </div>
        </form>        
        );
    }
}