/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  console.log(" DOM is ready to be manipulated");
  $(".errorBox").slideUp()

  // const data = [
  //   // {
  //   //   user: {
  //   //     name: "Newton",
  //   //     avatars: "https://i.imgur.com/73hZDYK.png",
  //   //     handle: "@SirIsaac",
  //   //   },
  //   //   content: {
  //   //     text: "If I have seen further it is by standing on the shoulders of giants",
  //   //   },
  //   //   created_at: 1461116232227,
  //   // },
  //   // {
  //   //   user: {
  //   //     name: "Descartes",
  //   //     avatars: "https://i.imgur.com/nlhLi3I.png",
  //   //     handle: "@rd",
  //   //   },
  //   //   content: {
  //   //     text: "Je pense , donc je suis",
  //   //   },
  //   //   created_at: 1461113959088,
  //   // },
  // ];

  const renderTweets = function (tweets) {
    //loops through tweets
    for (const tweet of tweets) {
      //calls createTweetElement for each tweet
      $(".tweetContainer").prepend(createTweetElement(tweet));
      //takes return value and prepends it to each tweet container
    }
  };

  const createTweetElement = function (tweet) {
    const clean = function (string) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(string));
      return div.innerHTML;
    };
    const $tweet = `
    <article class="tweet">
          <header class="tweetHeader">
            <div class="tweetPoster">
            <img src="${tweet.user.avatars}" />
              <p>${tweet.user.name}</p>
            </div>
            <address>${tweet.user.handle}</address>
          </header>
          <div class="textInTweet">
            <h5>
            ${clean(tweet.content.text)}
            </h5>
          </div>
          <footer class="tweetFooter">
            <p> ${timeago.format(tweet.created_at)}</p>
            <div class="icons">
              <a
                ><i class="fas fa-flag"></i><i class="fas fa-retweet"></i
                ><i class="fas fa-heart"></i
              ></a>
            </div>
          </footer>
        </article>
    `;

    return $tweet;
  };
  // Test / driver code (temporary). Eventually will get this from the server.

  // const $tweet = createTweetElement(data);

  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('.tweetContainer').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

  // renderTweets(data);

  $("#tweetForm").submit(function (event) {
    event.preventDefault();
    console.log("Button clicked, performing ajax call...");
    $(".errorBox").slideUp(100000)
    // $("#errorBox").hide()
    // console.log("errorbox hidden")
    // .removeClass(".errorBox")

    const x = $("#tweet-text").val();
    const y = x.length;

    if (x === null || x === "") {
      $(".errorBox").slideDown()
      $(".errorMessage").text("Error: no data was submitted!")
      return false;
    } 
    
    if (y > 140) {
      $(".errorBox").slideDown()
      $(".errorMessage").text("Error: there is a maximum limit of 140 characters!")
      return false;
    }
  
      const tweetFormData = $(this).serialize();
      console.log("tweetFormData",tweetFormData)
      $.post("/tweets", tweetFormData).then((response) => {
        loadTweets();
      });

  });

  const loadTweets = function (tweets) {
    console.log("loadTweets activated!");
    $.get("/tweets").then((response) => {
      console.log("response", response);
      renderTweets(response);
    });
  };
  loadTweets();

  // $("#tweetForm").submit(function (event) {
  //   const loadTweets = function (tweets) {
  //     console.log("loadTweets activated!");
  //     $.get("/tweets", function(data) {
  //       console.log("data passed");
  //       renderTweets(data);
  //     });
  //   };
  //   loadTweets();
  // });
});