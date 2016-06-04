'use strict';

class RedditContent extends React.Component{
  constructor(props) {
    super (props);

    this.state = {
      giphyData: {}
    }
  }
  getRedditContent() {
    return this.props.redditContent.data.children.map((eachPost) => {
      if (eachPost.data.preview) {
        return (
          <div key={eachPost.data.id} className="post" style={{margin: '1em'}}>
            <div className="postTitle" style={{fontWeight: 'bold'}}>
              <a href={eachPost.data.url} style={{textDecoration: 'none'}}>{eachPost.data.title}</a>
            </div>
            <img className="postPreview" src={eachPost.data.preview.images[0].source.url} style={{height: 500, width: 500}} />
          </div>
        )
      } else {
        return (
          <div key={eachPost.data.id} className="post" style={{margin: '1em'}}>
            <div className="postTitle" style={{fontWeight: 'bold'}}>
              <a href={eachPost.data.url} style={{textDecoration: 'none'}}>{eachPost.data.title}</a>
            </div>
          </div>
        )
      }
    })
  }
  getGiphy() {
    fetch('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cute+puppy')
      .then((response) => response.text())
      .then((responseText) => {
        this.setState({giphyData: JSON.parse(responseText)})
        console.log('responseText: ', responseText);
      })
      .catch((error) => {
        console.error(error);
      })
  }
  render() {
    let displayGiphyAlert = 'none';
    if (this.props.giphyAlert === true) {
      displayGiphyAlert = 'block';
    }

    return (
      <div className="redditContent">
        {this.props.giphyAlert ?
          <div className="giphyAlert" style={{backgroundColor: 'pink'}}>
            <button className="giphyButton" onClick={this.getGiphy}>Giphy This</button>
            <button className="closeGiphyButton" onClick={this.props.triggerMouseDown}>No Giphy</button>
            <img src={this.state.giphyData.data.image_url} />
          </div>
        : null}
        {this.props.redditContent.data ? this.getRedditContent() : null}
      </div>
    )
  }
}

export default RedditContent;