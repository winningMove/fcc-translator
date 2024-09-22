const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");

suite("Functional Tests", () => {
  let requester, translator;
  suiteSetup(() => {
    requester = chai.request(server).keepOpen();
    translator = new Translator();
  });
  suiteTeardown(() => {
    requester.close(() => {
      requester = null;
    });
    translator = null;
  });
  suite("POST to /api/translate", () => {
    test("with text and locale - passes", (done) => {
      requester
        .post("/api/translate")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          text: "Mangoes are my favorite fruit.",
          locale: "american-to-british",
        })
        .end((err, res) => {
          assert.property(res.body, "translation");
          assert.strictEqual(
            res.body.translation,
            `Mangoes are my <span class="highlight">favourite</span> fruit.`
          );
          done();
        });
    });
    test("with text and invalid locale - error", (done) => {
      requester
        .post("/api/translate")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          text: "Mangoes are my favorite fruit.",
          locale: "americanese-to-britishese",
        })
        .end((err, res) => {
          assert.property(res.body, "error");
          assert.strictEqual(res.body.error, "Invalid value for locale field");
          done();
        });
    });
    test("with missing text field - error", (done) => {
      requester
        .post("/api/translate")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          textz: "Mangoes are my favorite fruit.",
          locale: "american-to-british",
        })
        .end((err, res) => {
          assert.property(res.body, "error");
          assert.strictEqual(res.body.error, "Required field(s) missing");
          done();
        });
    });
    test("with missing locale field - error", (done) => {
      requester
        .post("/api/translate")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          text: "Mangoes are my favorite fruit.",
          localez: "american-to-british",
        })
        .end((err, res) => {
          assert.property(res.body, "error");
          assert.strictEqual(res.body.error, "Required field(s) missing");
          done();
        });
    });
    test("with empty text field - error", (done) => {
      requester
        .post("/api/translate")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          text: "",
          locale: "american-to-british",
        })
        .end((err, res) => {
          assert.property(res.body, "error");
          assert.strictEqual(res.body.error, "No text to translate");
          done();
        });
    });
    test("with text that needs no translation - passes", (done) => {
      requester
        .post("/api/translate")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          text: "Mangoes are my favourite fruit.",
          locale: "american-to-british",
        })
        .end((err, res) => {
          assert.property(res.body, "translation");
          assert.strictEqual(
            res.body.translation,
            "Everything looks good to me!"
          );
          done();
        });
    });
  });
});
