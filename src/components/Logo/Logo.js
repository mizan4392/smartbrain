import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';


const Logo =()=>{
    return (
        <div className='ma4 mt0 logo'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 90, width: 90 }} >
                <div className="Tilt-inner pa3">
                     <img src="https://img.icons8.com/metro/104/000000/brain.png" alt='brain image'></img>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;