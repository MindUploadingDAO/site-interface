import styled from 'styled-components';

// Button with ripple animation
const Button = styled.button`
    font-size: 24px;
    margin: 10px;
    padding: 0.25em 1em;
    border-radius: 3px;
    background:#fff;
    color: #0c3fd9;
    border: 2px solid #0c3fd9;
    &:hover {
        border: 2px solid #000;
    }

    &:active {
        border: 2px solid #000;
    }
`;

export default Button;
