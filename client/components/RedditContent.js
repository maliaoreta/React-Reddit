'use strict';

class RedditContent extends React.Component{
  getRedditContent() {
    return this.props.redditContent.data.children.map((eachPost) => {
      if (eachPost.data.preview) {
        return (
          <div key={eachPost.data.id} className="post" style={{margin: '1em'}}>
            <div className="postTitle" style={{fontWeight: 'bold'}}>
              <a href={eachPost.data.url}>{eachPost.data.title}</a>
            </div>
            <img className="postPreview" src={eachPost.data.preview.images[0].source.url} style={{height: 500, width: 500}} />
          </div>
        )
      } else {
        return (
          <div key={eachPost.data.id} className="post" style={{margin: '1em'}}>
            <div className="postTitle" style={{fontWeight: 'bold'}}>
              <a href={eachPost.data.url}>{eachPost.data.title}</a>
            </div>
          </div>
        )
      }
    })
  }
  render() {
    return (
      <div className="redditContent">
        {this.props.redditContent.data ? this.getRedditContent() : null}
      </div>
    )
  }
}

export default RedditContent;