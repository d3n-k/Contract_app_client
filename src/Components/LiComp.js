import { Row, Col } from 'react-bootstrap';
import icon from './../imgs/icon.png';


function LiComp( { text } ) {
    return(
        <div>
            <Row style={{marginTop:'1rem'}} >
                <Col xs={2} sm={2} lg={1} >
                   <img className='icon' alt='' src={icon}/>
                </Col>
                <Col xs={10} sm={10} lg={11} >
                  <p className='text' > {text} </p>
                </Col>
            </Row>
           
        </div>
    );
}

export default LiComp;