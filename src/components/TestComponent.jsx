import { useState } from "react";
import { Button } from "./ui/button";

function TestComponent() {

    // const [user, setUser] = useState({ name: "John", age: 20});
    const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);

    // const handleClick = () => {
    //     setUser({...user, age: 25});
    // }

    const handleClick = () => {
        setNumbers([...numbers, 6]);
    }

    return(
        <div className="px-4 lg:px-16 py-8 border border-black">
            {/* <h1 className="text-2xl">{user.name}</h1>
            <h1 className="text-2xl">{user.age}</h1>
            <Button onClick={handleClick}>Click Me</Button> */}

            {
                numbers.map( (number) => (
                    <h1 className="text-2xl">{number}</h1>
                ))
            }
            
            <Button onClick={handleClick}>Click Me</Button>
        </div>
    );   
}

export default TestComponent;