const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");
const britishToAmericanSpelling = require("./british-to-american-spelling.js");
const britishToAmericanTitles = require("./british-to-american-titles.js");

class Translator {
  #spanify(token) {
    return `<span class="highlight">${token}</span>`;
  }

  #translateTime(token, from, to) {
    const i = token.indexOf(from);
    const translated = token.slice(0, i) + to + token.slice(i + 1);
    if (translated.charAt(translated.length - 1) === ".") {
      return this.#spanify(translated.slice(0, -1)) + ".";
    }
    return this.#spanify(translated);
  }

  #translateAmToBr(text) {
    let idiomsTranslated = text;
    Object.entries(americanOnly).forEach(([k, v]) => {
      const regex = new RegExp(`\\b${k}\\b`, "gi");
      idiomsTranslated = idiomsTranslated.replace(regex, this.#spanify(v));
    });

    const timeRegex = /^\d{1,2}[:]\d{2}/;
    const translation = idiomsTranslated
      .split(" ")
      .map((token, index) => {
        if (timeRegex.test(token)) {
          return this.#translateTime(token, ":", ".");
        }
        const tokenLowerCase = token.toLowerCase();
        if (americanToBritishTitles[tokenLowerCase]) {
          const newTitle = americanToBritishTitles[tokenLowerCase];
          const capitalized =
            newTitle.charAt(0).toUpperCase() + newTitle.slice(1);
          return this.#spanify(capitalized);
        }
        if (americanToBritishSpelling[tokenLowerCase]) {
          let newSpelling = americanToBritishSpelling[tokenLowerCase];
          if (index === 0)
            newSpelling =
              newSpelling.charAt(0).toUpperCase() + newSpelling.slice(1);
          return this.#spanify(newSpelling);
        }
        return token;
      })
      .join(" ");
    return translation;
  }

  #translateBrToAm(text) {
    let idiomsTranslated = text;
    Object.entries(britishOnly).forEach(([k, v]) => {
      const regex = new RegExp(`(?<!fish-and-)\\b${k}\\b`, "gi");
      idiomsTranslated = idiomsTranslated.replace(regex, this.#spanify(v));
    });

    const timeRegex = /^\d{1,2}[.]\d{2}/;
    const translation = idiomsTranslated
      .split(" ")
      .map((token, index) => {
        if (timeRegex.test(token)) {
          return this.#translateTime(token, ".", ":");
        }
        const tokenLowerCase = token.toLowerCase();
        if (britishToAmericanTitles[tokenLowerCase]) {
          const newTitle = britishToAmericanTitles[tokenLowerCase];
          const capitalized =
            newTitle.charAt(0).toUpperCase() + newTitle.slice(1);
          return this.#spanify(capitalized);
        }
        if (britishToAmericanSpelling[tokenLowerCase]) {
          let newSpelling = britishToAmericanSpelling[tokenLowerCase];
          if (index === 0)
            newSpelling =
              newSpelling.charAt(0).toUpperCase() + newSpelling.slice(1);
          return this.#spanify(newSpelling);
        }
        return token;
      })
      .join(" ");
    return translation;
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
    if (text === translation) return "Everything looks good to me!";
    return translation;
  }
}

module.exports = Translator;
