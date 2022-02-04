import styled from 'styled-components';
import Nav from './Nav';
import React from "react";


const Box = styled.h3`
    margin-top: 100px;
    text-align: center;
    box-sizing: border-box;
    max-width: 100%;
    min-width: 0px;
    min-height: 0px;
    flex-direction: row;
`;
const Link = styled.a`
    padding:5px;
`;

export default () => {
return(
    <Box>
        <div>🗿 Mind Uploading DAO </div>
            <Link href="https://discord.gg/46G79Ag6gJ"> Discord</Link>

            <Link href="https://gov.minduploadingdao.org">Governance</Link>

    </Box>
)
};
