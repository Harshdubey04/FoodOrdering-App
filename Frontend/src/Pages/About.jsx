import UserClass from "../Components/userClass";
import React from "react";
import { Theme } from "../Contexts/ThemeContext";

class About extends React.Component{

// Connect Theme Context to Class Component
static contextType = Theme;

constructor(props){
    super(props);
}

componentDidMount(){
    console.log("Parent Component Mounted");
}

render(){
    //  Current Theme
    const { theme } = this.context;

    return(
        <div className={`min-h-screen px-6 py-10 transition-all duration-300 flex flex-col items-center
            ${theme==="dark" ? "bg-gray-950 text-gray-100" : "bg-white text-black"}`}>
            {/* Page Title */}
            <h1 className={`text-3xl font-bold mb-4 tracking-wide
                ${theme==="dark" ? "text-green-400" : "text-gray-800"}`}>
                This is About Page
            </h1>

            {/* Description Section */}
            <p className={`max-w-2xl leading-relaxed text-base text-left
                ${theme==="dark" ? "text-gray-300" : "text-gray-600"}`}>
                Welcome to the About page of our restaurant application. This project demonstrates 
                modern React concepts including class components, functional components, hooks, 
                context API, and dynamic UI themes. The dark mode provides a comfortable viewing 
                experience while keeping the design clean and professional.
            </p>
        </div>
    )
}

}

export default About;
