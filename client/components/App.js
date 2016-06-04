'use strict';

import RedditContent from './RedditContent';

class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      redditContent: {},
      subreddit: '',
      currSubreddit: '',
      giphyAlert: false
    }

    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRandomSubreddit = this.handleRandomSubreddit.bind(this);
  }
  componentWillMount() {
    fetch('https://www.reddit.com/.json')
      .then((response) => {
        return response.text();
      })
      .then((responseText) => {
        this.setState({currSubreddit: '/r/all'})
        this.setState({redditContent: JSON.parse(responseText)});
      })
      .catch((error) => {
        console.error('error', error); 
      })
  }
  onMouseUp() {
    if (window.getSelection().toString().length > 0) {
      this.setState({giphyAlert: true})
      console.log('window.getSelection().toString(): ', window.getSelection().toString());
    }
  }
  onMouseDown() {
    window.getSelection().empty();
    this.setState({giphyAlert: false})
  }
  handleInputChange(event) {
    this.setState({subreddit: event.target.value})
  }
  handleFormSubmit(event) {
    event.preventDefault();

    fetch(`https://www.reddit.com/r/${this.state.subreddit}.json`)
      .then((response) => response.text())
      .then((responseText) => {
        this.setState({currSubreddit: `/r/${this.state.subreddit}`})
        this.setState({redditContent: JSON.parse(responseText)})
      })
      .catch((error) => {
        console.error(error);
      })
  }
  handleRandomSubreddit() {
    fetch('https://www.reddit.com/r/random.json')
      .then((response) => {
        this.setState({currSubreddit: response.url.match(/(\/r\/\w+\/)/)[0]}) 
        return response.text()
      })
      .then((responseText) => {
        this.setState({redditContent: JSON.parse(responseText)})
      })
      .catch((error) => {
        console.error(error);
      })
  }
  render() {
    return (
      <div className="app" onMouseUp={this.onMouseUp}>
        <div className="header" style={{fontWeight: 'bold', fontSize: '2em'}}>
          React Reddit
        </div>
        <div className="inputSubredditContainer">
          <form onSubmit={this.handleFormSubmit}>
            <input onChange={this.handleInputChange} placeholder="View A Subreddit" />
            <button>Submit</button>
          </form>
        </div>
        <div className="randomSubreddit">
          <button onClick={this.handleRandomSubreddit}>Random</button>
        </div>
        <div className="subredditHeader" style={{margin: '1em', fontWeight: 'bold'}}>{this.state.currSubreddit}</div>
        <RedditContent redditContent={this.state.redditContent} giphyAlert={this.state.giphyAlert} triggerMouseDown={this.onMouseDown} />
      </div>
    )
  }
}

export default App;