let appID = "6H4RUOWB7Q";
let apiKey = "c4920017f671d06dd4796aaa89d05112";

const search = instantsearch({
  indexName: "hds_zones",
  searchClient: algoliasearch(appID, apiKey)
});

search.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 100
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits",
    cssClasses: {
        root: 'ais-Hits-list',
        list: ['text-3xl', 'divide-y', 'divide-dashed', 'divide-gray-200'],
      },
    templates: {
      empty: "",
      item: `
            <div class="item py-3">
                <div class="item-content">
                    <span class="hit-suburb capitalize">{{{_highlightResult.Suburb.value}}}</span>,
                    <span class="hit-state">{{{_highlightResult.Delivery_State.value}}}</span>,
                    <span class="hit-postcode font-bold">{{{_highlightResult.Postcode.value}}}</span>&nbsp;&nbsp;&nbsp;
                    <span class="hit-zone-name">({{{_highlightResult.Zone Name.value}}},</span>
                    <span class="hit-zone-code">{{{_highlightResult.Zone Code.value}}})</span>&nbsp;&nbsp;&nbsp;
                    <span class="hit-day">🚚 {{{_highlightResult.Day Of Week.value}}}</span>
                    <span class="hit-start">{{{_highlightResult.DefaultStart.value}}}</span>-
                    <span class="hit-finish">{{{_highlightResult.DefaultFinish.value}}}</span>
                </div>
            </div>`
    }
  })
);


search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#search-box",
    placeholder: "",
    showReset: true,
    showSubmit: true,
    showLoadingIndicator: true
  })
);

//search.addWidget(
  //instantsearch.widgets.pagination({
    //container: "#pagination"
  //})
//);

search.addWidget(
  instantsearch.widgets.stats({
    container: "#stats-container",
    templates: {
        text: `
        {{#areHitsSorted}}
        {{#hasNoSortedResults}}No relevant results{{/hasNoSortedResults}}
        {{#hasOneSortedResults}}1 relevant result{{/hasOneSortedResults}}
        {{#hasManySortedResults}}{{#helpers.formatNumber}}{{nbSortedHits}}{{/helpers.formatNumber}} relevant results{{/hasManySortedResults}}
        sorted out of {{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}}
      {{/areHitsSorted}}
      {{^areHitsSorted}}
        {{#hasNoResults}}HDS <span class="underline decoration-wavy decoration-yellow-400 decoration-8 underline-offset-1">doesn't deliver</span> to "<span class="underline decoration-wavy decoration-yellow-400 decoration-8 underline-offset-1">{{query}}</span>"{{/hasNoResults}}
        {{#hasOneResult}}<span class="underline decoration-wavy decoration-yellow-400 decoration-8 underline-offset-1">Yes!</span> HDS services "<span class="underline decoration-wavy decoration-yellow-400 decoration-8 underline-offset-1">{{query}}</span>" with <span class="underline decoration-wavy decoration-yellow-400 decoration-8 underline-offset-1">1 Delivery Window</span> each week{{/hasOneResult}}
        {{#hasManyResults}}<span class="underline decoration-wavy decoration-yellow-400 decoration-8 underline-offset-1">Yes!</span> HDS services "<span class="underline decoration-wavy decoration-yellow-400 decoration-8 underline-offset-1">{{query}}</span>" with <span class="underline decoration-wavy decoration-yellow-400 decoration-8 underline-offset-1">{{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber }}&nbsp;Delivery Windows</span> each week{{/hasManyResults}}
      {{/areHitsSorted}}
        `,
    },
  })
);

/* search.addWidget(
    instantsearch.widgets.stats({
        container: "#yesno",
        templates: {
            text: `
                {{#areHitsSorted}}
                {{#hasNoSortedResults}}No{{/hasNoSortedResults}}
                {{#hasOneSortedResults}}Yes!{{/hasOneSortedResults}}
                {{#hasManySortedResults}}Yes!{{/hasManySortedResults}}
                {{/areHitsSorted}}
                {{^areHitsSorted}}
                {{#hasNoResults}}No{{/hasNoResults}}
                {{#hasOneResult}}Yes!{{/hasOneResult}}
                {{#hasManyResults}}Yes!{{/hasManyResults}}
                {{/areHitsSorted}}
            `,
        },
    })); */

//search.addWidget(
  //instantsearch.widgets.refinementList({
    //container: "#filter",
    //attribute: "Delivery_State",
    //limit: 10,
    //showMore: false,
    //searchable: false,
    //searchablePlaceholder: "Search our brands"
  //})
//);

search.start();

/***** ANIMATED PLACEHOLDER *****/

/***** ANIMATE 1 PLACEHOLDER *****/
// const searchBar = document.querySelector(".ais-SearchBox-input");
// const DELAY_AFTER_ANIMATION = 1000;
// const PLACEHOLDER = "This is an animated placeholder";

// const getRandomDelayBetween = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const setPlaceholder = (inputNode, placeholder) => {
//   inputNode.setAttribute("placeholder", placeholder);
// };

// const animateLetters = (
//   currentLetters,
//   remainingLetters,
//   inputNode
// ) => {
//   if (!remainingLetters.length) {
//     return 
//   }

//   currentLetters.push(remainingLetters.shift());

//   setTimeout(() => {
//     setPlaceholder(inputNode, currentLetters.join(""));
//     animateLetters(currentLetters, remainingLetters, inputNode);
//   }, getRandomDelayBetween(50, 90));
// };

// const animatePlaceholder = (inputNode, placeholder) => {
//   animateLetters([], placeholder.split(""), inputNode);
// };

// window.addEventListener("load", () => {
//   // Single placeholder option
//   animatePlaceholder(searchBar, PLACEHOLDER);
// });


/***** ANIMATE MULTIPLE PLACEHOLDERs *****/

const searchBar = document.querySelector(".ais-SearchBox-input");
const DELAY_AFTER_ANIMATION = 1500;
const PLACEHOLDERS = [
  "Hobart", //1st animated placeholder 
  "Brooklyn Vic", 
  "2123", 
  "6553"
];

const getRandomDelayBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const setPlaceholder = (inputNode, placeholder) => {
  inputNode.setAttribute("placeholder", placeholder);
};

const animateLetters = (
  currentLetters,
  remainingLetters,
  inputNode,
  onAnimationEnd
) => {
  if (!remainingLetters.length) {
    return (
      typeof onAnimationEnd === "function" &&
      onAnimationEnd(currentLetters.join(""), inputNode)
    );
  }

  currentLetters.push(remainingLetters.shift());

  setTimeout(() => {
    setPlaceholder(inputNode, currentLetters.join(""));
    animateLetters(currentLetters, remainingLetters, inputNode, onAnimationEnd);
  }, getRandomDelayBetween(100, 180));
};

const animatePlaceholder = (inputNode, placeholder, onAnimationEnd) => {
  animateLetters([], placeholder.split(""), inputNode, onAnimationEnd);
};

const onAnimationEnd = (placeholder, inputNode) => {
  setTimeout(() => {
    let newPlaceholder =
      PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)];

    do {
      newPlaceholder =
        PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)];
    } while (placeholder === newPlaceholder);

    animatePlaceholder(inputNode, newPlaceholder, onAnimationEnd);
  }, DELAY_AFTER_ANIMATION);
};

window.addEventListener("load", () => {
  // If we want multiple different placeholders, we pass our callback
  animatePlaceholder(
    searchBar,
    PLACEHOLDERS[0], 
    onAnimationEnd
  );
});
