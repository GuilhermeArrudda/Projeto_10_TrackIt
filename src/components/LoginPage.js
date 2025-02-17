import {Page, Logo, Input, Form, ButtonEnter, TextButton, StyledLink} from "./styleds/styleds";
import { useNavigate } from "react-router-dom";
import Loader from "react-loader-spinner";
import { postLoginRequest } from "../Tools/Server";
import { useState, useContext, useEffect } from "react";
import UserContext from "./UserContext";

export default function LoginPage(){
    const { setUserData } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    useEffect (() => {
        if (localStorage.getItem("userInfo") !== null){

            navigate("/hoje")
        }
        // eslint-disable-next-line
    }, [])

    function login(e){
        e.preventDefault();
        setIsLoading(true);
        const infos = {
            email,
            password
        }

        postLoginRequest(infos)
            .then(response => {
                setUserData(response.data)
                localStorage.setItem("userInfo", JSON.stringify(response.data))
                navigate('/hoje')
            })
            .catch(error => {
                if (error.response.status === 422 || error.response.status === 401) {
                    alert("Dados Invalidos");
                    return;
                }
                alert(error);
            })
            .finally(() => setIsLoading(false));

    }  





    return(
        <Page white> 
            <Logo/>
            <Form onSubmit={login}>
                <Input
                    placeholder="email"
                    type="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    disabled={isLoading}
                />
                <Input
                    placeholder="senha"
                    type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    disabled={isLoading}
                />
            <ButtonEnter type="submit" disabled={isLoading}> 
            {!isLoading ? "Entrar" : <Loader type="ThreeDots" color="#FFF" height={50} width={80} />} 
            </ButtonEnter>
            </Form>
            <StyledLink to="/cadastro">
                <TextButton fontsize="14px" underline={true}>
                Não tem uma conta? Cadastre-se!
                </TextButton>
            </StyledLink>
        </Page>
    )
}