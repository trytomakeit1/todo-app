import React from 'react';
import TasksList from './tasksList';

import * as data from '../../tasks.json';

export default class Content extends React.Component{

    constructor(){
        super();
        this.state={};
    }


    render(){

        console.log(data.todoList);
        return(
            <div>
                <p>This is the main content.</p>
                
                <TasksList tasksList={data.todoList} />
            </div>

        )
    }
}