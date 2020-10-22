import * as R from "ramda";

export function dec2hex(dec: number): string {
  const aaa = dec < 10 ? "0" + String(dec) : dec.toString(16);
  // console.log('aaaa',aaa.split(''))
  // return aaa;

  const getValue = (decVal) =>
    (decVal < 10 ? "0" + String(decVal) : decVal.toString(16))[
      Math.round(Math.random())
    ];

  const val = (dec < 10 ? "0" + String(dec) : dec.toString(16))[
    Math.round(Math.random())
  ];

  const isNil = (value) => (R.isNil(value) ? "0" : value);
  const isNumeric = (str) => (isNaN(parseInt(str)) ? str : parseInt(str));

  const valVal = R.pipe(getValue, isNil, isNumeric)(dec);

  // console.log('valval', valVal);
  return valVal;
  return (dec < 10 ? "0" + String(dec) : dec.toString(16))[
    Math.round(Math.random())
  ];
}

// generateId :: Integer -> String
export function generateId(len = 300) {
  const arr = new Uint8Array(len);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex);
  // .join('').split('').map(str =>{
  //   return isNaN(parseInt(str)) ? str : parseInt(str)
  // })
}

export function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

export function getType(type = "string", arr = []) {
  var newArr = generateId();
  // console.log("nss,", newArr);
  var shufArr = shuffle(newArr);
  // return shufArr;
  return R.pipe(generateId, R.partition(R.is(Number)), shuffle)(300);
}

function getCharactersAllowed({
  upperCaseAllowed,
  lowerCaseAllowed,
  numbersAllowed,
  symbolsAllowed,
  duplicatesAllowed,
}) {
  const lowerCaseCharacters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbolCharacters = "@#$%<>^!&*";

  return "".concat(
    lowerCaseAllowed ? lowerCaseCharacters : "",
    upperCaseAllowed ? upperCaseCharacters : "",
    numbersAllowed ? numbers : "",
    symbolsAllowed ? symbolCharacters : ""
  );
}

export function randomString({
  upperCaseAllowed,
  lowerCaseAllowed,
  numbersAllowed,
  symbolsAllowed,
  duplicatesAllowed,
  passwordLength,
}) {
  const symbolCharacters = "@#$%<>^!&*";

  const charset = getCharactersAllowed({
    upperCaseAllowed,
    lowerCaseAllowed,
    numbersAllowed,
    symbolsAllowed,
    duplicatesAllowed,
  });

  console.log("charset", charset);
  // const isOpera =
  //   Object.prototype.toString.call(window.opera) == "[object Opera]";

  const mapIndexed = R.addIndex(R.map);
  if (window.crypto && window.crypto.getRandomValues) {
    let values = new Uint32Array(passwordLength);
    window.crypto.getRandomValues(values);

    const mapCryptoArray = (value, index) => {
      // return index;
      return charset[values[index] % charset.length];
    };

    const generatedPassword = R.pipe(
      mapIndexed(mapCryptoArray),
      !duplicatesAllowed ? R.uniq : R.identity(),
      R.join("")
    )(Array.from(values));

    const checkIfSymbolIsPresent = R.innerJoin((o, type) => o === type)(
      R.split("")(symbolCharacters)
    )(R.split("")(generatedPassword));

    const passwordWithSymbol = R.isEmpty(checkIfSymbolIsPresent) && symbolsAllowed? R.join('',R.update(
      Math.floor(Math.random() * generatedPassword.length),
      // symbolCharacters.charAt(Math.floor(Math.random() * symbolCharacters.length)),
      symbolCharacters.charAt(Math.floor(Math.random() * symbolCharacters.length)),
      R.split('')(generatedPassword)
    ))
    : generatedPassword;

    return passwordWithSymbol;

    // console.log('rss',res);
    // for(let i=0; i<values.length; i++)
    // {
    //     result += charset[values[i] % charset.length];
    // }
    // return result;
  }
  // else if (isOpera) {
  //   //Opera's Math.random is secure, see http://lists.w3.org/Archives/Public/public-webcrypto/2013Jan/0063.html
  //   let result = "";
  //   for (let i = 0; i < passwordLength; i++) {
  //     result += charset[Math.floor(Math.random() * charset.length)];
  //   }
  //   return result;
  // }
  else
    throw new Error(
      "Your browser sucks and can't generate secure random numbers"
    );
}
