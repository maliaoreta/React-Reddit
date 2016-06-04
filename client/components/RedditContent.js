'use strict';

class RedditContent extends React.Component{
  constructor(props) {
    super (props);

    this.state = {
      giphyAlert: false,
    }

    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }
  onMouseUp() {
    if (window.getSelection().toString().length > 0) {
      this.setState({giphyAlert: true});
    }
    console.log('window.getSelection().toString(): ', window.getSelection().toString());
  }
  onMouseDown() {
    this.setState({giphyAlert: false})
  }
  getRedditContent() {
    return this.props.redditContent.data.children.map((eachPost) => {
      if (eachPost.data.preview) {
        return (
          <div key={eachPost.data.id} className="post" style={{margin: '1em'}}>
            <div className="postTitle" onMouseUp={this.onMouseUp} style={{fontWeight: 'bold'}}>
              <a href={eachPost.data.url} style={{textDecoration: 'none'}}>{eachPost.data.title}</a>
            </div>
            <img className="postPreview" src={eachPost.data.preview.images[0].source.url} style={{height: 500, width: 500}} />
          </div>
        )
      } else {
        return (
          <div key={eachPost.data.id} className="post" style={{margin: '1em'}}>
            <div className="postTitle" onMouseUp={this.onMouseUp} style={{fontWeight: 'bold'}}>
              <a href={eachPost.data.url} style={{textDecoration: 'none'}}>{eachPost.data.title}</a>
            </div>
          </div>
        )
      }
    })
  }
  render() {
    let displayGiphyAlert = 'none';
    if (this.state.giphyAlert === true) {
      displayGiphyAlert = 'block';
    }
    return (
      <div className="redditContent">
        {this.state.giphyAlert ?
          <div className="giphyAlertBackground" style={{backgroundColor:'gray', padding: '3em', display: `${displayGiphyAlert}`}} onMouseDown={this.onMouseDown}>
            <div className="giphyAlert" style={{backgroundColor: 'pink'}}>
              ohhaaaaay
            </div>
          </div>
        : null}
        {this.props.redditContent.data ? this.getRedditContent() : null}
        }
      </div>
    )
  }
}

export default RedditContent;