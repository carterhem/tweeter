/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $("#tweet-text").on("input", function() {
    const length = $(this).val().length;
    //grab the 
    $(".counter").val(140 - length);
  
    if ($(".counter").val() < 0) {
      $(".counter").removeClass("counterBlack");
      $(".counter").addClass("counterRed");
    } else if ($(".counter").val() > 0) {
      $(".counter").removeClass("counterRed");
    }
  });

  const renderTweets = function(tweets) {
    //loops through tweets
    for (const tweet of tweets) {
      //calls createTweetElement for each tweet
      $(".tweetContainer").prepend(createTweetElement(tweet));
      //takes return value and prepends it to each tweet container
    }
  };

  const createTweetElement = function(tweet) {
    const clean = function(string) {
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

  $("#tweetForm").submit(function(event) {
    event.preventDefault();
    console.log("Button clicked, performing ajax call...");

    const x = $("#tweet-text").val();
    const y = x.length;

    if (x === null || x === "") {
      $(".errorBox").slideDown();
      $(".errorMessage").text("Error: no data was submitted!");
      setTimeout(() => {
        $(".errorBox").slideUp();
      }, 4000);
      return false;
    }

    if (y > 140) {
      $(".errorBox").slideDown();
      $(".errorMessage").text(
        "Error: there is a maximum limit of 140 characters!"
      );
      setTimeout(() => {
        $(".errorBox").slideUp();
      }, 4000);
      return false;
    }

    const tweetFormData = $(this).serialize();
    console.log("tweetFormData", tweetFormData);
    $.post("/tweets", tweetFormData).then((response) => {
      loadTweets();
      $("#tweetForm").trigger("reset");
    });
  });

  const loadTweets = function(tweets) {
    console.log("loadTweets activated!");
    $.get("/tweets").then((response) => {
      console.log("response", response);
      renderTweets(response);
    });
  };
  loadTweets();
});
