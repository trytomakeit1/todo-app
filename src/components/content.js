import React from 'react';
import TasksList from './tasksList';
import SingleTask from './singleTask';
import NewTask from './newTask';
//import * as data from '../../tasks.json';

import {Route} from 'react-router-dom';

import {fetchList, fetchTask, addTask, updateTask, deleteTask} from '../../api/index';

export default class Content extends React.Component{

    constructor(){
        super();
        this.state={
            //tasks: data.todoList
            error: '',
            msg: '',
            tasks:[],
            currentTask:{}
        };
        this.getDetails = this.getDetails.bind(this);
        this.editTask = this.editTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        
    }



    componentDidMount(){

        fetchList((err, list) => {
            if(err) {
                console.error(err);
                this.setState({
                    error: "There is a problem with loading the tasks list."
                });

            } else {
                this.setState((state)=>({
                    tasks: list
                }));
            }
        });
        /*
        fetchList().then((list)=>{
            //console.log('list from api', list);
            this.setState((state)=>({
                tasks: list
            }))
        }).catch(e=>console.error(e));
        */
    }


    getDetails(taskId) {

        fetchTask(taskId, (err, task)=>{
            if(err) {
                console.error(err);
                this.setState({
                    error: "There is a problem with loading the task."
                });

            } else {
                this.setState((state)=>({
                    currentTask: task
                }));
            }

        });

        /*
        fetchTask(taskId).then(task => {
            console.log(task);

            this.setState({
                currentTask: task
            })
        }).catch(e=>console.error(e));
        */
           
    }


    addNewTask(newTask){

        addTask(newTask, (err, result)=>{

            if(err) {
                console.error(err);
                this.setState({
                    error: "There is a problem with adding the task."
                });

            } else {

                fetchList((err, list) => {
                    if(err) {
                        console.error(err);
                        this.setState({
                            error: "There is a problem with loading the tasks list."
                        });

                    } else {
                        this.setState((state)=>({
                            tasks: list,
                            msg: result
                        }));
                    }
                });
            }

        });

        /*
        addTask(newTask).then((str)=>{

            fetchList().then(listData =>{
                this.setState({
                    tasks: listData
                });
            })
            .catch(e => console.error(e));
        }).catch(e => console.error(e));
        */

    }


    editTask(taskId, editedTask){

        updateTask(taskId, editedTask,(err, result) =>{

            if(err) {
                console.error(err);
                this.setState({
                    error: "There is a problem with updating the task."
                });

            } else {

                fetchList((err, list) => {
                    if(err) {
                        console.error(err);
                        this.setState({
                            error: "There is a problem with loading the tasks list."
                        });

                    } else {
                        this.setState((state)=>({
                            tasks: list,
                            msg: result
                        }));
                    }
                });
            }


        /*
        updateTask(taskId, editedTask).then(result => {

            // instead of calling the DB again, just update the state with the updated task.
            let newTasks = []
            this.state.tasks.forEach((singleTask, index) =>{
                console.log(singleTask);

                console.log(taskId);
                if(singleTask._id === taskId){

                    let newSingleTask = {...singleTask};
                    // update this element
                    newSingleTask.title = editedTask.title;
                    newSingleTask.date = editedTask.date;
                    newSingleTask.description = editedTask.description;
                    newSingleTask.finished = editedTask.finished;

                    newTasks.push(newSingleTask);
                    
                } else {
                    newTasks.push(singleTask);
                }
            });

            console.log(newTasks);
        
            this.setState({
                tasks: newTasks
            });
        }).catch(e=>console.error(e));
        */
        });
 
    }



    deleteTask(taskId){

        deleteTask(taskId, (err, result) => {

            if(err) {
                console.error(err);
                this.setState({
                    error: "There is a problem with deleting the task."
                });

            } else {

                fetchList((err, list) => {
                    if(err) {
                        console.error(err);
                        this.setState({
                            error: "There is a problem with loading the tasks list."
                        });

                    } else {
                        this.setState((state)=>({
                            tasks: list,
                            msg: result
                        }));
                    }
                });
            }


        });

    }



    render(){
        
        return(
            <div>
                <p>This is the main content.</p>
                <Route exact path="/" render={()=>(
                    
                    <TasksList tasksList={this.state.tasks}
                    getDetails={(taskId)=>this.getDetails(taskId)}
                    onDeleteTask={(taskId)=>this.deleteTask(taskId)}
                    onError={this.state.error}
                    onInfo={this.state.msg} />
                )}>
                
                </Route>

                <Route path="/task/" render={({history})=>{
                    // if is No error fetching the task
                    if(!this.state.error || this.state.error === ''){
                        return (<SingleTask task={this.state.currentTask} onEdit={(id, task)=>
                            {this.editTask(id, task);
                                history.push("/");
                            }
                        }
                        onError={this.state.error} />)}
                    else {
                        // TODO
                        // Warning: Cannot update during an existing state transition (such as within `render`).
                        // Render methods should be a pure function of props and state
                        history.push("/");

                    }
                }}>
                </Route>

                <Route path="/new" render={({history})=>{
                    return (
                        <NewTask onNewTask={(newTask)=>
                            {
                                this.addNewTask(newTask);
                                history.push("/");
                            
                            }
                        } />
                    )
                }
                }>


                </Route>

            </div>

        )
    }
}