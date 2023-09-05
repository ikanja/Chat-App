import React, { Component } from 'react';
import './App.css';
import Messages from './components/Messages/messages';
import Input from './components/Input/input';
import Header from './components/header/header';

function randomName() {
  const adjectives = [
    'Autumn',
    'Hidden',
    'Bitter',
    'Misty',
    'Silent',
    'Empty',
    'Dry',
    'Dark',
    'Summer',
    'Icy',
    'Delicate',
    'Quiet',
    'White',
    'Cool',
    'Spring',
    'Winter',
    'Patient',
    'Twilight',
    'Dawn',
    'Crimson',
    'Wispy',
    'Weathered',
    'Blue',
    'Billowing',
    'Broken',
    'Cold',
    'Damp',
    'Falling',
    'Frosty',
    'Green',
    'Long',
    'Late',
    'Lingering',
    'Bold',
    'Little',
    'Morning',
    'Muddy',
    'Old',
    'Red',
    'Rough',
    'Still',
    'Small',
    'Sparkling',
    'Throbbing',
    'Shy',
    'Wandering',
    'Withered',
    'Wild',
    'Black',
    'Young',
    'Holy',
    'Solitary',
    'Fragrant',
    'Aged',
    'Snowy',
    'Proud',
    'Floral',
    'Restless',
    'Divine',
    'Polished',
    'Ancient',
    'Purple',
    'Lively',
    'Nameless',
  ];
  const nouns = [
    'Waterfall',
    'River',
    'Breeze',
    'Moon',
    'Rain',
    'Wind',
    'Sea',
    'Morning',
    'Snow',
    'Lake',
    'Sunset',
    'Pine',
    'Shadow',
    'Leaf',
    'Dawn',
    'Glitter',
    'Forest',
    'Hill',
    'Cloud',
    'Meadow',
    'Sun',
    'Glade',
    'Bird',
    'Brook',
    'Butterfly',
    'Bush',
    'Dew',
    'Dust',
    'Field',
    'Fire',
    'Flower',
    'Firefly',
    'Feather',
    'Grass',
    'Haze',
    'Mountain',
    'Night',
    'Pond',
    'Darkness',
    'Snowflake',
    'Silence',
    'Sound',
    'Sky',
    'Shape',
    'Surf',
    'Thunder',
    'Violet',
    'Water',
    'Wildflower',
    'Wave',
    'Water',
    'Resonance',
    'Sun',
    'Wood',
    'Dream',
    'Cherry',
    'Tree',
    'Fog',
    'Frost',
    'Voice',
    'Paper',
    'Frog',
    'Smoke',
    'Star',
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + ' ' + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      member: {
        username: randomName(),
        color: randomColor(),
      },
      members: [],
    };

    this.initScaledrone();
  }

  initScaledrone() {
    this.drone = new window.Scaledrone('bz19gv87jnapQ1zg', {
      data: this.state.member,
    });

    this.drone.on('open', (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });

    this.drone.on('member_join', (member) => {
      const members = this.state.members.concat(member);
      this.setState({ members });
    });

    this.drone.on('member_leave', ({ id }) => {
      const members = this.state.members.filter((member) => member.id !== id);
      this.setState({ members });
    });

    const room = this.drone.subscribe('observable-room');
    room.on('data', this.handleNewMessage);
  }

  handleNewMessage = (data, member) => {
    const newMessage = { member, text: data };
    const messages = [...this.state.messages, newMessage];

    this.setState({ messages });
  };

  onSendMessage = (message) => {
    this.drone.publish({
      room: 'observable-room',
      message,
    });
  };

  render() {
    return (
      <div className='App'>
        <Header />
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }
}

export default App;
