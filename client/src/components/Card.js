// import React from 'react';
import styled from 'styled-components';

const Card = styled.section`
    /* background: #300a24; */
    background: ${props => (props.variant === 'light' ? 'white' : '#300a24')};
    color: ${props => (props.variant === 'light' ? '#300a24' : 'white')};
    padding: 1rem;
    margin-bottom: 1rem;
    h3 {
        margin-top: 0;
    }
`;

export default Card;
