const {h, Component, Text, Bold, Color} = require('ink');
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
  buildString(domain,description,wrapAt=80,tabLength=4) {
    let s = `${domain} – ${description}`
    if(s.length>80){
      const words = description.split(' ')
      const lines = [`${domain} – `]
      while(words.length>0){
        if(lines.length>0 && (lines[lines.length-1].length + words[0].length <= wrapAt))
          lines[lines.length-1] = lines[lines.length-1]+' '+words.shift()
        else lines.push((lines.length==0?'':''.padEnd(tabLength))+words.shift())
      }
      s=lines.join('\n')
      //s=s.substring(0,wrapAt-1)+'\n'.padEnd(1+tabLength)+s.substring(wrapAt)
    }
    return s
  }
  render() {
    return (this.state.loaded?
      <div>
        <Bold><Color keyword="magenta">
        {`${this.props.pins?'📌   Pinned ':''}Glitch projects of ${this.state.user.name} (${this.state.user.login})`}
        <br />
        {`"${this.state.user.description}"`}
        </Color></Bold>
        <br /><Separator />
        <Select onSelect={item => this.setState({message: item + ' was selected'})}>
          {
            this.state.projects.map( o => <Option value={o.domain}
              onChange={() => {}/*this.setState({current:o})*/}
              onSelect={() => opn(`https://glitch.com/~${o.domain}`, { wait: false }).then(x=>process.exit())}
            >
              {this.buildString(o.domain,o.description)}
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