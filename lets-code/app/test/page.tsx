'use client'
import React from 'react'

const TestPage = () => {
    const divRef = React.useRef<HTMLDivElement>(null);
    const divRef2 = React.useRef<HTMLDivElement>(null);
    const divRef3 = React.useRef<HTMLDivElement>(null);
    const divRef4 = React.useRef<HTMLDivElement>(null);


    React.useEffect(() => {
        if (divRef.current) {
            console.log(divRef.current.clientHeight);
            // change the background color of the child div's constantly to random colors
            const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'black', 'white', 'brown'];
            // const shades = ['red', 'blue', 'green', 'yellow', 'purple'];
            const shades = ['#cc59ce', '#d26ed4','#d983da','#df98e1','#e5ace7']
            const interval = setInterval(async() => {
                console.log("inside")
                // select randomly divRef or divRef2 or divRef3
                // const childDivs = divRef.current.children;
                // Array containing references to the divs
                    const divRefs = [divRef, divRef2, divRef3, divRef4];

                    // Select a random index between 0 and 2
                    const randomDivRef = divRefs[Math.floor(Math.random() * divRefs.length)];

                    // Access the children of the randomly selected div
                    const childDivs = randomDivRef.current.children;

                for (let i = 0; i < childDivs.length+5; i++) {
                    // @ts-ignore
                    // childDivs[i].style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    for(let j = 0; j < childDivs.length; j++) { childDivs[j].style.backgroundColor = 'black'; }
                    console.log(i)
                    if(i < childDivs.length)
                    childDivs[i].style.backgroundColor = shades[0];
                    if(i > 0 && i < childDivs.length+1)
                    childDivs[i-1].style.backgroundColor = shades[1];
                    if(i > 1 && i < childDivs.length+2)
                    childDivs[i-2].style.backgroundColor = shades[2];
                    if(i > 2 && i < childDivs.length+3)
                    childDivs[i-3].style.backgroundColor = shades[3];
                    if(i > 3  && i < childDivs.length+4)
                    childDivs[i-4].style.backgroundColor = shades[4];
                    // sleep for 1 second
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }, 500);
            
            return () => clearInterval(interval);
        }
    }, [])

  return (
    <div style={{ display: 'flex' }}>
        <div ref={divRef}>
        {Array(10).fill(null).map((_, index) => (
            <div key={index} style={{ width: '10px', height: '10px', backgroundColor: 'black', margin: '5px' }}></div>
        ))}
        </div>
        <div ref={divRef2}>
        {Array(10).fill(null).map((_, index) => (
            <div key={index} style={{ width: '10px', height: '10px', backgroundColor: 'black', margin: '5px' }}></div>
        ))}
        </div>
        <div ref={divRef3}>
        {Array(10).fill(null).map((_, index) => (
            <div key={index} style={{ width: '10px', height: '10px', backgroundColor: 'black', margin: '5px' }}></div>
        ))}
        </div>
        <div ref={divRef4}>
        {Array(10).fill(null).map((_, index) => (
            <div key={index} style={{ width: '10px', height: '10px', backgroundColor: 'black', margin: '5px' }}></div>
        ))}
        </div>
    </div>
  )
}

export default TestPage