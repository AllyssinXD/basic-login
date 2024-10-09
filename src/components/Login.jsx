import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Alert, Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import '../app.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async ()=>{
        try{
            await axios.post('http://localhost:5000/auth/login', {
                username: username,
                password: password
            }, {
                withCredentials: true  // Necessário para enviar e receber cookies
            })
            
            navigate('/')
        } catch(err){
            console.log(err)
            if(err.message == "Network Error")
                setError("Não foi possivel conectar ao servidor.")
            else
                setError(err.response.data.message)
        }
    }

    return (
        <Container style={{width: "450px"}} className="d-flex flex-column justify-content-center align-items-center min-vh-100">
            {error?<Alert className="w-100" variant="danger">{error}</Alert>:null}
            <Form className="w-100 border p-5 rounded bg-white">
                <Row><h1 className="mb-5">Login</h1></Row>  
                        <Row className="mb-3"><FormGroup>
                            <FormLabel>Nome de Usuário</FormLabel>
                            <FormControl type="text" placeholder="usuario4002Exemplo" value={username} onChange={(e)=>{setUsername(e.target.value)}}></FormControl>
                        </FormGroup></Row>
                        <Row className="mb-5"><FormGroup>
                            <FormLabel>Senha</FormLabel>
                            <FormControl type="password" placeholder="Digite sua senha aqui" value={password} onChange={(e)=>{setPassword(e.target.value)}}></FormControl>
                        </FormGroup></Row>
                        <Row>
                            <Col className="w-50 d-flex align-items-center">
                                <Button onClick={handleSubmit} className="w-100">Login</Button>
                            </Col>
                            <Col className="d-flex align-items-center">
                                <Link to='/register'>Ainda não tem uma conta?</Link>
                            </Col>
                        </Row>
            </Form>
        </Container>
    )
}