'use strict';

import RedditContent from './RedditContent';
import styles from './componentStyles/App.scss';
import TextField from 'material-ui/TextField';
import { white } from 'material-ui/styles/colors';

const style = {
  floatingLabelFocusStyle: {
    color: white,
    fontSize: '1.5em'
  },
  underlineFocusStyle: {
    borderColor: white,
    borderWidth: '1px'
  }
}

class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      redditContent: {},
      subreddit: '',
      currSubreddit: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRandomSubreddit = this.handleRandomSubreddit.bind(this);
    this.redirectHome = this.redirectHome.bind(this);
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
  redirectHome() {
    window.location = '/';
  }
  render() {
    return (
      <div className="app">
        <div className="headerContainer">
          <div className="header">
            <div onClick={this.redirectHome}>Reddit Giphy</div>
          </div>
          <div className="subredditHeader">
            <div>{this.state.currSubreddit}</div>
          </div>
          <div className="inputSubredditContainer">
            <form onSubmit={this.handleFormSubmit}>
              <TextField
                onChange={this.handleInputChange}
                floatingLabelText={<p className="inputText"><i className="material-icons">search</i> Subreddit</p>}
                floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                underlineFocusStyle={style.underlineFocusStyle}
              />
            </form>
          </div>
          <div className="randomSubreddit" onClick={this.handleRandomSubreddit}>
            <div>Random</div>
          </div>
        </div>
        <RedditContent redditContent={this.state.redditContent} giphyAlert={this.state.giphyAlert} triggerMouseDown={this.onMouseDown} />
      </div>
    )
  }
}

export default App;
