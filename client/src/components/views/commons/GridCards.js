import React from 'react';
import {Col} from 'antd';


function GridCards(props) {

  if(props.landingpage) {
    return (
      <Col lg={6} md={8} xs={24}>
          <div style={{position: 'relative'}}>
              <a href={`/movie/${props.movieId}`}>
                  <img style={{width: '100%', height: '320px'}} src={props.image} alt={props.movieName}/>
              </a>
          </div>
      </Col>
    )
  }
  else if(props.detailpage) {
    return (
      <Col lg={6} md={8} xs={24}>
          <div style={{position: 'relative'}}>
                <img style={{width: '100%', height: '320px'}} src={props.image} alt={props.CastName}/>
          </div>
      </Col>
    )
  }



}

export default GridCards