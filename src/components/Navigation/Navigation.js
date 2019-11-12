import React from 'react';
import { Link } from 'react-router-dom';

const Navigation =({link})=>{
    return (
        <nav style={{display:'flex',justifyContent:'space-between'}}>
            <Link className='f3 link dim black underline pa3 pointer' to="/signIn">{link}</Link>
        </nav>
    )
}

export default Navigation;