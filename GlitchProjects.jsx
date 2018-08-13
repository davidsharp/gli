const {h, Component, Text} = require('ink');
const {Select, Option, Separator} = require('ink-select');
const opn = require('opn');
const fetch = require('node-fetch');

class GlitchProjects extends Component {
  constructor(props){
    super(props)
    this.state={loaded:false,user:{},projects:[]}
    fetch(`https://api.glitch.com/users/byLogins?logins=${props.opts[0]}`)
      .then(r=>r.json())
      .then(user=>{
        if(user.length<1){
          console.log(`Whoops! User "${props.opts[0]}" not found! 🤦‍`)
          process.exit()
        }
        this.setState({
          loaded:true,
          projects:(props.pins?this.getPins(user[0]):user[0].projects),
          user:user[0]
        })
      })
  }
  getPins(user) {
    const ids = user.pins.map(p=>(p.projectId))
    return user.projects.filter(
      c=>(ids.findIndex(
        id=>id==c.projectPermission.projectId
      )>-1)
    )
  }
  render() {
    return (this.state.loaded?
      <div>
        {`${this.props.pins?'📌   Pinned ':''}Glitch projects of ${this.state.user.name} (${this.state.user.login})`}
        <br />
        {`"${this.state.user.description}"`}
        <br /><Separator />
        <Select onSelect={item => this.setState({message: item + ' was selected'})}>
          {
            this.state.projects.map( o => <Option value={o.domain}
              onChange={() => {}/*this.setState({current:o})*/}
              onSelect={() => opn(`https://glitch.com/~${o.domain}`, { wait: false }).then(x=>process.exit())}
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