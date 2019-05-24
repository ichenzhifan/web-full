import React, { PureComponent, Component } from 'react';

class List extends Component {
	constructor(props) {
		super(props);

		this.state = {
			comments: [
				{ body: 'react is very good', author: 'facebook' },
				{ body: 'vue is very good', author: 'youyuxi' }
			]
		};
  }
  
  componentDidMount(){
    setInterval(() => {
      this.setState({
        comments: [
          { body: 'react is very good', author: 'facebook' },
          { body: 'vue is very good', author: 'youyuxi' }
        ]
      })
    }, 1000);
  }

	render() {
		return this.state.comments.map((m, i) => {
			return <Comment {...m} key={i} />;
		});
	}
}

class Comment extends PureComponent{  
  render(){
    console.count('xxx');

    return (
      <p>
        {this.props.body} - {this.props.author}
      </p>
    );
  }
}

// function Comment(props) {
//   console.count('xxx');

// 	return (
// 		<p>
// 			{props.body} - {props.author}
// 		</p>
// 	);
// }

export default List;
