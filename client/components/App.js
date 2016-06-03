'use strict';

import RedditContent from './RedditContent';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      redditContent: {}
    }
  }
  componentWillMount() {
    fetch('https://www.reddit.com/.json')
      .then((response) => {
        return response.text();
      })
      .then((responseText) => {
        this.setState({redditContent: JSON.parse(responseText)});
      })
      .catch((error) => {
        console.error('error', error); 
      })
  }
  render() {
    return (
      <div className="app">
        <div className="header">
          React Reddit
        </div>
        <RedditContent redditContent={this.state.redditContent} />
      </div>
    )
  }
}

export default App;