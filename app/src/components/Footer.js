import styled from 'styled-components';
import Nav from './Nav';
import React from "react";


const Box = styled.h3`
    margin-top: 80px;
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
        <div>🗿 MindUploadingDAO</div>
            <Link href="https://discord.gg/46G79Ag6gJ"> Discord</Link>

            <Link> Snapshot</Link>
              
            <Link href="https://gov.minduploadingdao.org">Governance</Link>

    </Box>
)
};
