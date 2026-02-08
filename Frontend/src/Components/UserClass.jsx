import React from "react"

class UserClass extends React.Component{

    constructor(props){
        super(props);
        console.log(`${this.props.name} class constructor called`);        
        
        this.state={
            count:0,
            color:"red",
        }
    }
    
    componentDidMount(){
        console.log(`${this.props.name} component mounted`);
    }

    render(){
        console.log(`${this.props.name} component rendered`);
        
        return(
            <div>
                <h1>Hello form user class</h1>
                <h3>My name is {this.props.name} </h3>
                <p>Count is {this.state.count}</p>
                <button
                    onClick={()=>{
                        this.setState({
                            count:this.state.count+1,
                        })
                    }}
                >
                    Increment Count
                </button>
            </div>
        )
    }
}

export default UserClass
