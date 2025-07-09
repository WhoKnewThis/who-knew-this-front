import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <p>© 2025 Who Knew This?. All Rights Reserved.</p>
    </FooterWrapper>
  );
};

export default Footer;