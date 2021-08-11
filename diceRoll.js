
export function RollDice(input){

    function randomInt(low, high) {
        return low + Math.floor(Math.random() * high);
      }
      
      const intRegex = /^[0-9]+$/
      const parserRegex = /([-\+])|([d])|([0-9]+)/g
      
      function parseIntStrict(str) {
        if (!str.match(intRegex)) {
          throw new Error("invalid integer: " + str)
        }
        return parseInt(str)
      }
      
      function splitParts(str) {
        return Array.from(str.matchAll(parserRegex), match => match[0]);
      }
      
      function parseRollConfig(userInput) {
        let err = new Error("Invalid user input: " + userInput)
        let parts = splitParts(userInput);
      
        let add = 0;
      
        try {
          if (parts.length < 3) {
            throw err
          }
          let numDice = parseIntStrict(parts[0])
          if (numDice < 1 || numDice > 6) {
            throw err
          }
      
          if (parts[1] !== "d") {
            throw err
          }
      
          let high = parseIntStrict(parts[2])
          if (high < 2 || high > 20) {
            throw err
          }
          if (parts.length == 3) {
            return {valid: true, numDice, high, add}
          }
          if (parts.length == 5) {
            let op = parts[3];
            if (["+", "-"].indexOf(op) == -1) {
              throw err
            }
            
            let diff = parseIntStrict(parts[4]);
            let isPlus = op === "+";
            let add = (isPlus ? diff : diff * -1)
            return {valid: true, numDice, high, add}
          }
        } catch (e) {
          console.log("error: " + e)
        }
        return {valid: false}
      }
      
    //   let userInput = prompt('Enter a number');
      let regexMatches = input.matchAll(parserRegex);
      let rollConfig = parseRollConfig(input);
      if (!rollConfig.valid) {
        throw new Error("nothing to do");
      }
      let high = rollConfig.high;
      let numDice = rollConfig.numDice;
      let rolls = [];
      
      for (let i = 0; i < numDice; i++) {
          rolls.push(randomInt(1, high))
      }
      
      let sum = rolls.reduce((acc, n) => acc + n)
      
      let output = {
        rolls,
        sum,
        total: sum + rollConfig.add,
        add: rollConfig.add,
        high: rollConfig.high,
        numDice: rollConfig.numDice,
        valid: rollConfig.valid,
      }
    return output;
}