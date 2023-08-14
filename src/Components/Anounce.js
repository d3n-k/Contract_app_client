import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import { Context } from "..";
import { useContext, useEffect } from "react";
import { fetchAnnounce } from "../http/AnnounceApi";

const Anounce = observer(() => {
  const { announ } = useContext(Context);

  useEffect(() => {
    fetchAnnounce().then((data) => announ.setAnnounces(data));
  }, []);

  return (
    <div style={{backgroundColor: '#cdcaca' }}>
      <Container style={{ paddingTop: "5rem", paddingBottom: "5rem"}}>
      {announ.announces.map((ann) => {
        return <div style={{backgroundColor: 'white' }} key={ann.id} className="anounce" dangerouslySetInnerHTML={{__html: ann.name}} />
      })}
    </Container>
    </div>
  );
});

export default Anounce;
