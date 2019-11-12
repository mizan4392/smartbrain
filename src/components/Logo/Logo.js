import React from 'react';
import Tilt from 'react-tilt'
import { Link } from 'react-router-dom';
import './Logo.css';


const Logo =()=>{
    return (
        <div className='ma4 mt0 logo'>
            <Link to="/">
                <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 90, width: 90 }} >
                    <div className="Tilt-inner pa3">
                        <img src="https://img.icons8.com/metro/104/000000/brain.png" alt=' '></img>
                    </div>
                </Tilt>
            </Link>
        </div>
    )
}

export default Logo;