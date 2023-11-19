import { NavLink } from "react-router-dom";
import styled, {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *::before, *::after, *{
        box-sizing: border-box;
        user-select: none;
    }
    body{
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
        background: #08090b;
        font-size: 14px;
        line-height: 1.5;
        color: #ffffffdd;
    }
    input::placeholder{
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
    }
    .container{
        max-width: 1550px;
        margin: 0 auto;
        padding: 0 20px;
    }
    .border-transparent{
        border: 1px solid transparent;
        outline: 1px solid transparent;
    }
    .container__fluid{
        width: 100%;
        margin: 0 auto;
        padding: 0 20px;
    }
    /* #24292f */
    /* #32383f */
    /* #0d1117 */
    /* 21262d */
`
export const Button = styled.button`
    padding: 0.3rem;
    font-size: 14px;
    border: 1px solid ${({active}) => active ? "#6e77815e": "transparent"};
    color: #6e7781;
    border-radius: 4px;
    background-color: #0f1114;
    text-decoration: none;
    background-position: calc(10%) calc(50%);
    background-size: 1rem;
    background-repeat: no-repeat;
    &:hover{
        background-color: #20242a;
    }
`
export const Link = styled.a`
    padding: 0.5rem 0.5rem;
    background: transparent;
    text-decoration: none;
    border-radius: 8px;
    &:hover{
        background: #20242a;
    }
    color: #fff;
`
export const ProfileBtn = styled.button.attrs({
    className: "border-transparent header__profile-btn"
})`
    border-radius: 20px;
    padding: 1rem 1rem;
    background-size:cover;
    background-position: center;
    background-repeat: no-repeat;
    border: 1px solid #fff;
`
export const Input = styled.input`
    padding: 0.5rem 1rem;
    background: #08090b;
    color: #6e7781;
    border: 1px solid #6e77815e;
    outline: 2px solid transparent;
    border-radius: 4px;
    letter-spacing: 1px;
    box-shadow: 0px 0px 8px transparent;
    &::placeholder{
        color: #6e7781;
    }
    &:focus{
        outline: 3px solid #0969DA;
        border: 1px solid transparent;
        box-shadow: inset 0px 0px 4px #0969DA !important;
    }
`
export const ErrorBox = styled.div`
    width: 100%;
    text-align: center;
`
export const ErrorTitle = styled.h3`
    color: crimson;
    font-size: 23px;
`
export const LoadingBox = styled.div`
    width: 100%;
    text-align: center;
`
export const LoadTitle = styled.h3`
    color: #fff;
    font-size: 23px;
`
export const DefaultLink  = styled(NavLink)`
    color: #1078e6;
    font-size: 16px;
    text-decoration: none;  
    &:hover{
        text-decoration: underline;
    }
`
export const ButtonActive = styled(Button)`
    background: #20242a;
    color: #fff;
`
export const Avatar = styled.img.attrs({
    
})`
    margin-right: 0.5rem;
    border-radius: 50%;
`
export const TextSettings = styled.p`
    color: #6e7781;
    font-size: ${({styledType}) => styledType ? "0.9rem": "0.8rem"};
    margin: 0rem 0.5rem;
`