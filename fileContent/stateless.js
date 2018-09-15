module.exports = function(className, {stylesheet, ssPath}) {
return `
import React, {Fragment} from 'react';
${stylesheet ? `import './${ssPath}';` : ''}

export default ${className} = (props) => {
  return <div></div>
}`
}
