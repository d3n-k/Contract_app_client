import { Row, Col } from 'react-bootstrap';
import icon from './../imgs/icon.png';


function LiComp( { text } ) {
    return(
        <div>
            <Row style={{marginTop:'1rem'}} >
                <Col xs={3} sm={3} lg={2} >
                   <img className='icon' alt='' src={icon}/>
                </Col>
                <Col xs={9} sm={9} lg={10} >
                  <p className='text' > {text} </p>
                </Col>
            </Row>
           
        </div>
    );
}

export default LiComp;