const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");

suite("Unit Tests", () => {
  let translator;
  suiteSetup(function initTranslator() {
    translator = new Translator();
  });
  suiteTeardown(function deallocTranslator() {
    translator = null;
  });
  suite("American to British English translation", () => {
    test("Mangoes are my favorite fruit.", () => {
      const translation = translator.translate(
        "Mangoes are my favorite fruit.",
        "american-to-british"
      );
      assert.strictEqual(
        translation,
        `Mangoes are my <span class="highlight">favourite</span> fruit.`
      );
    });
    test("I ate yogurt for breakfast.", () => {
      const translation = translator.translate(
        "I ate yogurt for breakfast.",
        "american-to-british"
      );
      assert.strictEqual(
        translation,
        `I ate <span class="highlight">yoghurt</span> for breakfast.`
      );
    });
    test("We had a party at my friend's condo.", () => {
      const translation = translator.translate(
        "We had a party at my friend's condo.",
        "american-to-british"
      );
      assert.strictEqual(
        translation,
        `We had a party at my friend's <span class="highlight">flat</span>.`
      );
    });
    test("Can you toss this in the trashcan for me?", () => {
      const translation = translator.translate(
        "Can you toss this in the trashcan for me?",
        "american-to-british"
      );
      assert.strictEqual(
        translation,
        `Can you toss this in the <span class="highlight">bin</span> for me?`
      );
    });
    test("The parking lot was full.", () => {
      const translation = translator.translate(
        "The parking lot was full.",
        "american-to-british"
      );
      assert.strictEqual(
        translation,
        `The <span class="highlight">car park</span> was full.`
      );
    });
    test("Like a high tech Rube Goldberg machine.", () => {
      const translation = translator.translate(
        "Like a high tech Rube Goldberg machine.",
        "american-to-british"
      );
      assert.strictEqual(
        translation,
        `Like a high tech <span class="highlight">Heath Robinson device</span>.`
      );
    });
    test("To play hooky means to skip class or work.", () => {
      const translation = translator.translate(
        "To play hooky means to skip class or work.",
        "american-to-british"
      );
      assert.strictEqual(
        translation,
        `To <span class="highlight">bunk off</span> means to skip class or work.`
      );
    });
    test("No Mr. Bond, I expect you to die.", () => {
      const translation = translator.translate(
        "No Mr. Bond, I expect you to die.",
        "american-to-british"
      );
      assert.strictEqual(
        translation,
        `No <span class="highlight">Mr</span> Bond, I expect you to die.`
      );
    });
    test("Dr. Grosh will see you now.", () => {
      const translation = translator.translate(
        "Dr. Grosh will see you now.",
        "american-to-british"
      );
      assert.strictEqual(
        translation,
        `<span class="highlight">Dr</span> Grosh will see you now.`
      );
    });
    test("Lunch is at 12:15 today.", () => {
      const translation = translator.translate(
        "Lunch is at 12:15 today.",
        "american-to-british"
      );
      assert.strictEqual(
        translation,
        `Lunch is at <span class="highlight">12.15</span> today.`
      );
    });
  });
  suite("British to American English translation", () => {
    test("We watched the footie match for a while.", () => {
      const translation = translator.translate(
        "We watched the footie match for a while.",
        "british-to-american"
      );
      assert.strictEqual(
        translation,
        `We watched the <span class="highlight">soccer</span> match for a while.`
      );
    });
    test("Paracetamol takes up to an hour to work.", () => {
      const translation = translator.translate(
        "Paracetamol takes up to an hour to work.",
        "british-to-american"
      );
      assert.strictEqual(
        translation,
        `<span class="highlight">Tylenol</span> takes up to an hour to work.`
      );
    });
    test("First, caramelise the onions.", () => {
      const translation = translator.translate(
        "First, caramelise the onions.",
        "british-to-american"
      );
      assert.strictEqual(
        translation,
        `First, <span class="highlight">caramelize</span> the onions.`
      );
    });
    test("I spent the bank holiday at the funfair.", () => {
      const translation = translator.translate(
        "I spent the bank holiday at the funfair.",
        "british-to-american"
      );
      assert.strictEqual(
        translation,
        `I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.`
      );
    });
    test("I had a bicky then went to the chippy.", () => {
      const translation = translator.translate(
        "I had a bicky then went to the chippy.",
        "british-to-american"
      );
      assert.strictEqual(
        translation,
        `I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.`
      );
    });
    test("I've just got bits and bobs in my bum bag.", () => {
      const translation = translator.translate(
        "I've just got bits and bobs in my bum bag.",
        "british-to-american"
      );
      assert.strictEqual(
        translation,
        `I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`
      );
    });
    test("The car boot sale at Boxted Airfield was called off.", () => {
      const translation = translator.translate(
        "The car boot sale at Boxted Airfield was called off.",
        "british-to-american"
      );
      assert.strictEqual(
        translation,
        `The <span class="highlight">swap meet</span> at Boxted Airfield was called off.`
      );
    });
    test("Have you met Mrs Kalyani?", () => {
      const translation = translator.translate(
        "Have you met Mrs Kalyani?",
        "british-to-american"
      );
      assert.strictEqual(
        translation,
        `Have you met <span class="highlight">Mrs.</span> Kalyani?`
      );
    });
    test("Prof Joyner of King's College, London.", () => {
      const translation = translator.translate(
        "Prof Joyner of King's College, London.",
        "british-to-american"
      );
      assert.strictEqual(
        translation,
        `<span class="highlight">Prof.</span> Joyner of King's College, London.`
      );
    });
    test("Tea time is usually around 4 or 4.30.", () => {
      const translation = translator.translate(
        "Tea time is usually around 4 or 4.30.",
        "british-to-american"
      );
      assert.strictEqual(
        translation,
        `Tea time is usually around 4 or <span class="highlight">4:30</span>.`
      );
    });
  });
  suite("Highlights are correct", () => {
    test("Mangoes are my favorite fruit.", () => {
      const translation = translator.translate(
        "Mangoes are my favorite fruit.",
        "american-to-british"
      );
      assert.strictEqual(
        translation,
        `Mangoes are my <span class="highlight">favourite</span> fruit.`
      );
    });
    test("I ate yogurt for breakfast.", () => {
      const translation = translator.translate(
        "I ate yogurt for breakfast.",
        "american-to-british"
      );
      assert.strictEqual(
        translation,
        `I ate <span class="highlight">yoghurt</span> for breakfast.`
      );
    });
    test("We watched the footie match for a while.", () => {
      const translation = translator.translate(
        "We watched the footie match for a while.",
        "british-to-american"
      );
      assert.strictEqual(
        translation,
        `We watched the <span class="highlight">soccer</span> match for a while.`
      );
    });
    test("Paracetamol takes up to an hour to work.", () => {
      const translation = translator.translate(
        "Paracetamol takes up to an hour to work.",
        "british-to-american"
      );
      assert.strictEqual(
        translation,
        `<span class="highlight">Tylenol</span> takes up to an hour to work.`
      );
    });
  });
});
