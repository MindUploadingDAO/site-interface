import styled from 'styled-components';

// Button with ripple animation
const Button2 = styled.button`
    font-size: 24px;
    margin: 10px;
    padding: 0.5em 1em;
    border-radius: 3px;
    background: rgb(60 108 255);
    color: #fff;
    border: 2px solid rgb(12, 63, 217);
    &:hover {
        background: rgb(12, 63, 217);
    }

    &:active {
        background: rgb(12, 63, 217);
    }

    a{
        text-decoration:none;
        color:#fff;
    }
`;

export default Button2;
