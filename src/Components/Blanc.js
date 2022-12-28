import {Container, Row, Col} from 'react-bootstrap';
import blanc from './../imgs/blanc.jpg';
//import link from './../docx/blank.docx';
import link1 from './../docx/blank1.docx';
import link2 from './../docx/blank2.docx';

function Blanc() {
    return(
        <Container style={{marginTop: '5rem', marginBottom: '5rem'}}>
            <Row>
                <Col md={4} >
                    <p style={{fontSize: '20px', fontFamily: 'Roboto', marginTop: '1rem', marginLeft: '2rem'}}>
                        Для обучения <span className="span">работников организаций</span> на факультете повышения квалификации и переподготовки кадров БГМУ необходимо прислать письмо на бланке организации, заверенное подписью руководителя. В письме необходимо указать интересующие Вас наименование образовательной программы переподготовки, повышения квалификации или обучающего курса и желаемые сроки обучения.
                        Письмо можно прислать в бумажном варианте на почтовый адрес университета (220083, г. Минск, пр. Дзержинского, 83) либо в электронном виде по СМДО или по электронной почте на адрес <a className="link" href="mailto:bsmu@bsmu.by">bsmu@bsmu.by</a> или <a className="link" href="mailto:cancelary@bsmu.by">cancelary@bsmu.by</a>. 
                        <a className="link" href={link1}>Пример письма (файл пример для организаций)</a>.
                    </p>
                </Col>
                <Col md={4} >
                    <img style={{width: '100%'}} src={blanc} alt="" />
                </Col>
                <Col md={4} >
                    <p style={{fontSize: '20px', fontFamily: 'Roboto', marginTop: '1rem', marginLeft: '2rem'}}>
                       {/*Для граждан Республики Беларусь, желающих пройти обучение на факультете повышения квалификации и переподготовки кадров БГМУ на платной основе, необходимо прислать по почте <a className="link" href={link}>личное заявление</a>.*/}
                       Для <span className="span">граждан</span>, желающих пройти обучение на факультете повышения квалификации и переподготовки кадров БГМУ на платной основе, необходимо прислать личное заявление, заверенное подписью. В письме необходимо указать интересующие Вас наименование образовательной программы переподготовки, повышения квалификации или обучающего курса и желаемые сроки обучения.
                        Заявление можно прислать в бумажном варианте на почтовый адрес университета (220083, г. Минск, пр. Дзержинского, 83) либо в электронном виде по электронной почте на адрес <a className="link" href="mailto:bsmu@bsmu.by">bsmu@bsmu.by</a> или <a className="link" href="mailto:cancelary@bsmu.by">cancelary@bsmu.by</a>. 
                        <a className="link" href={link2}>Пример заявления (файл пример для физ.лиц)</a>.
                    </p>
                    {/*<p style={{fontSize: '20px', fontFamily: 'Roboto',  marginLeft: '2rem'}}>
                    При получении <span className="span">направления на обучение</span> необходимо заполнить и распечатать <span className="span">Договор</span> о повышении квалификации руководящего работника (специалиста) <span className="span">за счет средств республиканского (местного) бюджета</span> или <span className="span">Договор</span> о повышении квалификации руководящего работника (специалиста) <span className="span">на платной основе</span>.
                    </p>*/}
                </Col>
            </Row>
        </Container>
    );
}

export default Blanc;