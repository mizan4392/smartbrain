import React from "react";
import "./FaceRecognition.css";

class FaceRecognition extends React.Component {
  render() {
    const boundingBox = this.props.box.map((box,i) =>{
       return <div key={i} className='bounding-box' style={{top:box.topRow,right:box.rightCol,bottom:box.bottomRow,left:box.leftCol}}></div>
    })

    return (
      <div>
        <div className="center ma">
          <div className="absolute mt2">
            <img
              id="inputImage"
              src={this.props.imageUrl}
              width="500px"
              height="auto"
              alt=""
            ></img>
            {boundingBox}
          </div>
        </div>
        <div style={{ height: "300px" }}></div>
      </div>
    );
  }
}

export default FaceRecognition;
