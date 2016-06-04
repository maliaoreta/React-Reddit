'use strict';

import styles from './componentStyles/RedditContent.scss';

class RedditContent extends React.Component{
  constructor(props) {
    super (props);

    this.state = {
      giphyAlert: false,
      giphyData: {},
      postURL: '',
      postTitle: ''
    }

    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.getGiphy = this.getGiphy.bind(this);
    this.handlePostTitleClick = this.handlePostTitleClick.bind(this);
    this.handleViewClick = this.handleViewClick.bind(this);
  }
  onMouseUp() {
    this.setState({giphyAlert: true})
  }
  onMouseDown() {
    window.getSelection().empty();
    this.setState({giphyAlert: false})
    this.setState({giphyData: {}})
  }
  getRedditContent() {
    return this.props.redditContent.data.children.map((eachPost) => {
      if (eachPost.data.preview) {
        return (
          <div key={eachPost.data.id} className="post">
            <div className="postTitle" onClick={this.onMouseUp}>
              <a href={eachPost.data.url} onClick={this.handlePostTitleClick}>{eachPost.data.title}</a>
            </div>
            <img className="postPreview" src={eachPost.data.preview.images[0].source.url} />
          </div>
        )
      } else {
        return (
          <div key={eachPost.data.id} className="post">
            <div className="postTitle" onClick={this.onMouseUp}>
              <a href={eachPost.data.url} onClick={this.handlePostTitleClick}>{eachPost.data.title}</a>
            </div>
          </div>
        )
      }
    })
  }
  getGiphy() {
    let giphyQuery = this.refs.giphyQuery.value.replace(/ /g, '+');
    
    fetch(`http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${giphyQuery}`)
      .then((response) => response.text())
      .then((responseText) => {
        this.setState({giphyData: JSON.parse(responseText)})
      })
      .catch((error) => {
        console.error(error);
      })
  }
  handlePostTitleClick(event) {
    event.preventDefault();
    this.setState({postURL: event.currentTarget.getAttribute('href')})
    this.setState({postTitle: event.currentTarget.text})
  }
  handleViewClick() {
    window.location = this.state.postURL;
  }
  render() {
    let displayGiphyAlert = 'none';
    if (this.props.giphyAlert === true) {
      displayGiphyAlert = 'block';
    }

    return (
      <div className="redditContent">
        {this.state.giphyAlert ?
          <div className="giphyAlert">
            <textArea style={{resize: 'none', width: '95%'}} ref="giphyQuery" defaultValue={this.state.postTitle}/>
            <button className="giphyButton" onClick={this.getGiphy}>Giphy This</button>
            <button className="viewPostButtton" onClick={this.handleViewClick}>View This Post</button>
            <button className="closeGiphyButton" onClick={this.onMouseDown}>Exit</button>
            {this.state.giphyData.data ? <img src={this.state.giphyData.data.image_url} /> : null}
          </div>
        : null}
        {this.props.redditContent.data ? this.getRedditContent() : null}
      </div>
    )
  }
}

export default RedditContent;