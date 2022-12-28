import { Container } from 'react-bootstrap';
import jum from './../imgs/jumbo.jpg';
import styled from 'styled-components';

const Styles = styled.div`
.jumbo {
    background: url(${jum}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 600px;
    position: relative;
    z-index: -2;
}
.overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

`;


const Jumbotron = () => (
    <Styles>
         <div className="jumbo">
            <div className="overlay" ></div>
            <Container>
                <h1 style={{paddingTop: '10rem'}} >Документы (регистрация на обучение)</h1>
                {/*<p style={{paddingTop: '2rem', fontSize: '18px'}}>Для обучения работников организаций на факультете повышения квалификации и переподготовки кадров БГМУ необходимо прислать по почте письмо на бланке организации,заверенное подписью руководителя и печатью учреждения. В письме необходимо указать интересующие Вас наименование образовательной программы повышения квалификации или переподготовки и желаемые сроки обучения.</p>*/}
            </Container>
        </div>
    </Styles>
);
    


export default Jumbotron;
