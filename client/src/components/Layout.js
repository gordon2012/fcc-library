import React from 'react';
import styled from 'styled-components';

const Flex = styled.div`
    display: flex;
    ${props => (props.column ? 'flex-direction: column' : '')}
    ${props => (props.full ? 'min-height: 100vh;' : '')}
`;

const Box = styled.div`
    ${props => (props.flex ? `flex: ${props.flex};` : '')}
`;

const Container = styled.div`
    ${props =>
        props.width
            ? `
        max-width: ${props.width};
        margin: 0 auto;
    `
            : ''}
`;

const StyledFooter = styled.footer`
    padding: 1rem 0;
    text-align: center;
`;
const Footer = () => (
    <StyledFooter>
        A{' '}
        <a
            href="https://freecodecamp.org"
            target="_blank"
            rel="noopener noreferrer"
        >
            freeCodeCamp
        </a>{' '}
        Information Security and Quality Assurance Project
    </StyledFooter>
);

const Layout = ({ children }) => {
    return (
        <Flex full column>
            <Box flex={1}>
                <Container width="1000px">{children}</Container>
            </Box>
            <Box>
                <Footer />
            </Box>
        </Flex>
    );
};

export default Layout;
