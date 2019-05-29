import React from 'react';


const FaceRecognition = ({imageUrl}) =>{

    return(
        <div>
            <div className='center ma'>
                <div className='absolute mt2'>
                  <img src={imageUrl} width='500px' height='auto'></img>
                </div>
            </div>
            <div style={{height:'200px'}}>

            </div>
        </div>
    );
}

export default FaceRecognition;