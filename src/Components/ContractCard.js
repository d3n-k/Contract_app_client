import { Col, Card, Button } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive';
import dogovor from './../imgs/dogovor.jpg';

function ContractCard ( {title, buttonStyle, setModal} ) {

    const mobile = useMediaQuery({ query: '(max-width: 767px)' });

    return(

        <Col md={4} >

            { mobile
              ? <Card className="modile-card" style={{width: '18rem', minHeight: '413px', marginTop: '1.5rem' }} >
                   <Card.Img variant="top" src={dogovor} />
                  <Card.Body style={{backgroundColor: '#e1dede'}} >
                    <Card.Title style={{fontSize: '18px'}} >
                       {title}
                    </Card.Title>
                       <Button onClick={() => setModal(true)} style={buttonStyle} variant="success" > Заполнить </Button>
                   </Card.Body>
                 </Card>
              : <Card style={{width: '18rem', minHeight: '413px', marginTop: '1.5rem'}} >
                   <Card.Img variant="top" src={dogovor} />
                  <Card.Body style={{backgroundColor: '#e1dede'}}>
                  <Card.Title style={{fontSize: '18px'}} >
                     {title}
                   </Card.Title>
                     <Button onClick={() => setModal(true)} style={buttonStyle} variant="success" > Заполнить </Button>
                  </Card.Body>
                </Card>
            }

        </Col>
    );
}

export default ContractCard;