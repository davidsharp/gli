const {h, Component, Text, Bold, Color} = require('ink');
const {Select, Option, Separator} = require('ink-select');
const ProjectPagination = require('import-jsx')('./ProjectPagination.jsx', {pragma: 'h'});
const opn = require('opn');
const fetch = require('node-fetch');

class GlitchProjects extends Component {
  constructor(props){
    super(props)
    this.state={loaded:false,user:{},projects:[],pages:[],page:0}
    fetch(`https://api.glitch.com/users/byLogins?logins=${props.opts[0]}`)
      .then(r=>r.json())
      .then(user=>{
        if(user.length<1){
          console.log(`Whoops! User "${props.opts[0]}" not found! 🤦‍`)
          process.exit()
        }
        const pagesObj=this.buildPages(props.pins?this.getPins(user[0]):user[0].projects)
        this.setState({
          loaded:true,
          projects:(props.pins?this.getPins(user[0]):user[0].projects),
          pages:pagesObj.pages,
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
  buildPages(projects,pageLength=8) {
    let pro = [...projects]
    let pages = [[]]
    while(pro.length>0){
      if(pages[pages.length-1].length + 1/*pro[0].length*/ <= pageLength)
        pages[pages.length-1].push(pro.shift())
      else pages.push([pro.shift()])
    }
    console.log(pages[0].length,pages[1].length)
    return {
      pages,
      pageLength,
      numberOfPages:pages.length,
      numberofProjects:projects.length
    }
  }
  render() {
    return (this.state.loaded?
      <div>
        <Bold><Color keyword="magenta">
        {`${this.props.pins?'📌   Pinned ':''}Glitch projects of ${this.state.user.name} (${this.state.user.login})`}
        <br />
        {`"${this.state.user.description}"`}
        </Color></Bold>
        <br />
        {`Page ${this.state.page+1}`}
        <br /><Separator />
        <ProjectPagination
          page={this.state.pages[this.state.page]}
          onAny={item => this.setState({message: item + ' was selected'})}
          onOption={o => opn(`https://glitch.com/~${o.domain}`, { wait: false }).then(x=>process.exit())}
          nextPage={() => this.setState({page:this.state.page+1})}
          prevPage={() => this.setState({page:this.state.page-1})}
          optionString={this.buildString}
        />
        <br />
        { this.state && this.state.message && <Text green>{this.state.message}</Text>}
      </div>
    :<div>Loading!</div>);
  }
}

module.exports = GlitchProjects