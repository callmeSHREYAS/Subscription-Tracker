const arcjetModule = require("@arcjet/node");

const arcjet = arcjetModule.default;
const { shield, detectBot, tokenBucket } = arcjetModule;


const { isSpoofedBot } = require("@arcjet/inspect");


const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    // Shield protects against common attacks (SQLi, XSS, etc.)
    shield({ mode: "LIVE" }),

    // Bot detection
    detectBot({
      mode: "DRY_RUN",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // "CATEGORY:MONITOR",
        // "CATEGORY:PREVIEW",
      ],
    }),

    // Rate limiting (token bucket)
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

module.exports = aj