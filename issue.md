## issue

I've been attempting to get some pagination within a long list like so:
```jsx
<Select onSelect={item => this.setState({message: item + ' was selected'})}>
  {
    this.state.pages[this.state.page].map( o => <Option value={o.domain}
      onSelect={() => opn(o.domain, { wait: false }).then(x=>process.exit())}
    >
      {o.domain}
    </Option> )
  }
  <Option value={'prev'}
    onSelect={() => this.setState({page:this.state.page-1})}
  >
    prev page
  </Option>
  <Option value={'next'}
    onSelect={() => this.setState({page:this.state.page+1})}
  >
    next page
  </Option>
</Select>
```

I can see that the state for the page number changes, but the list itself

I'm not sure if it's specifically ink-select components or ink itself that's causing this