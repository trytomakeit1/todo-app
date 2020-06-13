import React, { Component } from 'react';
import Header from './header';
import Content from './content';
import {Route} from 'react-router-dom';
import About from './about';

class App extends Component {


    constructor(){

        super();
        this.state={};
    }

    render(){
        return(
            <div className="container">
                <Header />
                <Content />

                
                <Route path="/about" component={About} />
            </div>
        )
    }

    
}


export default App;