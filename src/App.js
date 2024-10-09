import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function App() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
      axios.get('http://localhost:5000/auth', {withCredentials:true})
      .then(res=>setUsername(res.data.username))
      .catch(err=>{
        if(err.message == "Network Error")
          setError('Não foi possivel conectar ao servidor')
        else if(err.response.data.message)
          if(err.response.data.message == "Cookie de token não definido")
            setError("Você não está logado")
        else
          setError(err.response.data.message)
      })
  },[username])

  const handleLogout = ()=>{
    axios.get('http://localhost:5000/auth/logout', {withCredentials:true})
    setUsername('')
  }

  function NotLogged(){
    return <Container style={{width: '380px'}}>
      <Row><Col><Alert variant="danger">{error}</Alert></Col></Row>
      <Row>
        <Col><Button onClick={()=>navigate('/login')} className="w-100"> Login </Button></Col>
        <Col><Button onClick={()=>navigate('/register')} className="w-100"> Registrar-se </Button></Col>
      </Row>
    </Container>
  }

  return (
    <Container className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
      {error?<NotLogged/>:<>
      <h1>Bem-vindo {username}</h1>
      <Button variant="danger" onClick={handleLogout}> Fazer Logout </Button>
      </>}
      
    </Container>
  );
}

export default App;
