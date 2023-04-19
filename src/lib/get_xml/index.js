const XMLParser = require('react-xml-parser')
const parser = new XMLParser()

async function GetXml(url, headers = {}, setResult, sendErr = -1) {
  let result = []

  const data = await fetch(url, {headers})

  if (data.ok && data.status === 200) {
    const text = await data.text()

    result = parser.parseFromString(text).children
  
    setResult(result)
  
    return true
  } else {
    console.log('ERROR: GetXml')
    console.log('status = ' + data.status);
    
    setResult(sendErr)
    
    return false
  }

}

export default GetXml
