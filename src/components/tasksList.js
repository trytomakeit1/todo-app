import React from 'react';

import {Link} from 'react-router-dom';

class TasksList extends React.Component {

    constructor(props){
        super(props);
        this.state={};

    }        
    


    render(){
        return(

            <div>

                {this.props.tasksList.map((element, index)=>{

                    return(
                        <div className="taskContainer" key={element.id} >
                            <div>
                                <div>
                                    <h5 className="inlineBlock">Title:</h5>
                                    <span style={{padding: '0px 20px'}}>{element.title}</span>
                                </div>

                                <hr />
                                <h5 className="inlineBlock">Due date:</h5>
                                <span style={{padding: '0px 20px'}}>
                                    {new Date(element.date).toDateString()}
                                </span>
                                <h5 className="inlineBlock">Done: </h5>

                                <input style={{padding: '0px 20px'}} type="checkbox" disabled checked={element.finished}/>
                            </div>
                            
                            
                            <div>
                                <Link className="button pull-right" to={`/task/${element.id}`} onClick={()=>this.props.getDetails(element.id)}>Go to details</Link>
                            </div>
                            
                            <div style={{clear: 'both'}}></div>
                        </div>
                    );

                })}
            </div>
        )
    }

}
export default TasksList;