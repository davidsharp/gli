const {h, Component, Text} = require('ink');
const {Select, Option, Separator} = require('ink-select');
const opn = require('opn');
const fetch = require('node-fetch');

class GlitchProjects extends Component {
  constructor(props){
    super(props)
    this.state={loaded:false,user:{}}
    fetch(`https://api.glitch.com/users/byLogins?logins=${props.opts[0]}`)
      .then(r=>r.json())
      .then(user=>this.setState({loaded:true,user:user[0]}))
  }
  render() {
    return (this.state.loaded?
      <div>
        {`Glitch projects of ${this.state.user.name} (${this.state.user.login})`}
        <br />
        {`${this.state.user.description}`}
        <Select onSelect={item => this.setState({message: item + ' was selected'})}>
          {
            this.state.user.projects.map( o => <Option value={o.domain}
              onChange={() => {}/*this.setState({current:o})*/}
              onSelect={() => opn(`https://glitch.com/~${o.domain}`)}
            >
              {`${o.domain} – ${o.description}`}
            </Option> )
          }
        </Select>
        <br />
        { this.state && this.state.message && <Text green>{this.state.message}</Text>}
      </div>
    :<div>Loading!</div>);
  }
}

module.exports = GlitchProjects