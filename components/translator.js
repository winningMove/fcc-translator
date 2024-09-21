const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");
const britishToAmericanSpelling = require("./british-to-american-spelling.js");
const britishToAmericanTitles = require("./british-to-american-titles.js");

class Translator {
  #translateTime(token, from, to) {
    const i = token.indexOf(from);
    return token.slice(0, i) + to + token.slice(i + 1);
  }

  #translateAmToBr(text) {
    let idiomsTranslated = text;
    Object.entries(americanOnly).forEach(([k, v]) => {
      const regex = new RegExp(k, "gi");
      idiomsTranslated = idiomsTranslated.replace(regex, v);
    });

    const timeRegex = /^\d{1,2}[:]\d{2}/;
    const translation = idiomsTranslated
      .split(" ")
      .map((token) => {
        if (timeRegex.test(token)) {
          return this.#translateTime(token, ":", ".");
        }
        const tokenLowerCase = token.toLowerCase();
        if (americanToBritishTitles[tokenLowerCase]) {
          const newTitle = americanToBritishTitles[tokenLowerCase];
          const capitalized =
            newTitle.charAt(0).toUpperCase() + newTitle.slice(1);
          return capitalized;
        }
        if (americanToBritishSpelling[tokenLowerCase]) {
          const newSpelling = americanToBritishSpelling[tokenLowerCase];
          return newSpelling;
        }
        return token;
      })
      .join("");
    const capitalizedSentenceStart =
      translation.charAt(0).toUpperCase() + translation.slice(1);
    return capitalizedSentenceStart;
  }

  #translateBrToAm(text) {
    let idiomsTranslated = text;
    Object.entries(britishOnly).forEach(([k, v]) => {
      const regex = new RegExp(k, "gi");
      idiomsTranslated = idiomsTranslated.replace(regex, v);
    });

    const timeRegex = /^\d{1,2}[.]\d{2}/;
    const translation = idiomsTranslated
      .split(" ")
      .map((token) => {
        if (timeRegex.test(token)) {
          return this.#translateTime(token, ".", ":");
        }
        const tokenLowerCase = token.toLowerCase();
        if (britishToAmericanTitles[tokenLowerCase]) {
          const newTitle = britishToAmericanTitles[tokenLowerCase];
          const capitalized =
            newTitle.charAt(0).toUpperCase() + newTitle.slice(1);
          return capitalized;
        }
        if (britishToAmericanSpelling[tokenLowerCase]) {
          const newSpelling = britishToAmericanSpelling[tokenLowerCase];
          return newSpelling;
        }
        return token;
      })
      .join("");
    const capitalizedSentenceStart =
      translation.charAt(0).toUpperCase() + translation.slice(1);
    return capitalizedSentenceStart;
  }

  translate(text, locale) {
    let translation;
    switch (locale) {
      case "american-to-british":
        translation = this.#translateAmToBr(text);
        break;
      case "british-to-american":
        translation = this.#translateBrToAm(text);
    }
    return translation;
  }
}

module.exports = Translator;
