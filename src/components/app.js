import React, { Component } from 'react';
import Header from './header';
import Content from './content';


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
            </div>
        )
    }

    
}


export default App;