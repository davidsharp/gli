const {h, render, Component} = require('ink');
const TextInput = require('ink-text-input');

class EnterUsername extends Component {
	constructor() {
		super();

		this.state = {
			query: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.props.onSubmit.bind(this);
	}

	render(props, state) {
		return (
			<div>
				Enter your username:

				<TextInput
					value={state.query}
					onChange={this.handleChange}
					onSubmit={this.handleSubmit}
				/>
			</div>
		);
	}

	handleChange(value) {
		this.setState({
			query: value
		});
	}
}

module.exports = EnterUsername