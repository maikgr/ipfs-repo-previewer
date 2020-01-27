import React from 'react';
import { Header, Container, Icon, Divider, Input, Card, Button } from 'semantic-ui-react';
import Img from 'react-image'
import './App.css';
import api from './repo-fetch';
import dlsite from './dlsite-fetch';

function Cards (props) {
  const elements = props.items.map(item => {
    return (<Card>
      <Img src={item.image} unloader={item.brokenImage} className="ui image"/>
      <Card.Content>
        <Card.Header>{item.header}</Card.Header>
        <Card.Meta>
          {item.meta}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button.Group fluid>
          <Button onClick={() => { window.open(item.rjSite)}} content='RJ' />
          <Button onClick={() => { window.open(item.reSite)}} content='RE' />
          <Button content='Download' onClick={() => { window.open(item.download)}} primary/>
        </Button.Group>
      </Card.Content>
    </Card>)
  })
  return (<Card.Group centered className="display">
    {elements}
    </Card.Group>)
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'https://cloudflare-ipfs.com/ipfs/QmfXScx6H6M4TW1SqZ14qcZR3Gay6wfck8dHCs3Bio2CzU',
      items: []
    }

    this.onChange = this.onChange.bind(this);
    this.onDisplay = this.onDisplay.bind(this);
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  async onDisplay(e) {
    const links = await api.getLinks(this.state.value);
    const codes = await dlsite.parseCode(links);
    this.setState({
      items: this.parseCodeToImageMeta(codes)
    })
  }

  parseCodeToImageMeta(codes) {
    return codes.map(code => {
      return {
        header: code.name,
        meta: code.size,
        image: code.imagePath,
        brokenImage: 'https://react.semantic-ui.com/images/wireframe/image.png',
        rjSite: code.linkJp,
        reSite: code.linkEn,
        download: code.download
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Header as='h2' icon inverted textAlign='center'>
            <Icon name='grid layout' />
            /hgg2d/ ipfs previewer
          <Header.Subheader>
              Copy paste ipfs repo link below, kudos to DL Site Previewer for parsing code.
          </Header.Subheader>
          </Header>
          <Divider />
          <Input
            fluid
            action={{
              color: 'teal',
              labelPosition: 'right',
              icon: 'search',
              content: 'Display',
              onClick: this.onDisplay
            }}
            value={this.state.value}
            onChange={this.onChange}
          />
        </Container>
        <Cards items={this.state.items}/>
      </div>
    );
  }
}

export default App;
