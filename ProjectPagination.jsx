const {h, Component, Text, Bold, Color} = require('ink');
const {Select, Option, Separator} = require('ink-select');
module.exports = props => (
  <Select onSelect={props.onAny}>
          {
            props.page &&
            props.page
            .map( o => <Option value={o.domain}
              onSelect={() => props.onOption(o)}
            >
              {props.optionString(o.domain,o.description)}
            </Option> )
          }
          <Option value={'prev'}
              onSelect={props.prevPage}
            >
              prev page
            </Option>
            <Option value={'next'}
              onSelect={props.nextPage}
            >
              next page
            </Option>
        </Select>
)