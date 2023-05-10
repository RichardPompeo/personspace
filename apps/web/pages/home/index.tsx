import React from 'react';

import abstract from "../../assets/abstract.svg";
import { Container, HeaderContent, Header, Title, Button, SubTitle, Img } from './styles';


function Home() {
  return (
    <Container>
      <HeaderContent>
        <Header>
          <Title>
            Have your own <strong>personal <br /> space</strong>, and use it however <br /> you want.
          </Title>

          <SubTitle>
            Create an account to save and store everything <br /> you do on the site.
          </SubTitle>

          <Button>
            About the site
          </Button>
        </Header>

        <Img src={abstract.src} />
      </HeaderContent>
    </Container>
  )
}

export default Home;