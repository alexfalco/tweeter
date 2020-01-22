/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    method: "GET"
    //dataType: JSON ,
  }).done(function(result) {
    renderTweets(result);
  });
};

$(document).ready(function() {
  loadTweets();
});

const createTweetElement = function(tweetObj) {
  let $tweet = $("<article>");
  let $header = $("<header>");
  const $avatar = $("<img>").attr("src", tweetObj.user.avatars);
  const $username = $("<p>").text(tweetObj.user.name);
  const $handle = $("<p>").text(tweetObj.user.handle);
  const $content = $("<p>").text(tweetObj.content.text);
  const $line = $("<hr>");
  const $footer = $("<footer>").text(moment(tweetObj.created_at).fromNow());

  $header = $header
    .append($avatar)
    .append($username)
    .append($handle);

  $tweet = $tweet
    .append($header)
    .append($content)
    .append($line)
    .append($footer);

  $("#tweetContainer").prepend($tweet);
};

const renderTweets = function(arrayTweet) {
  for (let tweet of arrayTweet) {
    createTweetElement(tweet);
  }
};

$(document).ready(function() {
  // Unhide the tweet section
  $(".new-tweet").hide();
  $("#Bar2").click(function() {
    $(".new-tweet")
      .toggle()
      .animate({ height: "show" });
  });

  // Unhide the tweet section
  $(".new-tweet").hide();
  $("#Bar4").click(function() {
    $(".new-tweet")
      .toggle()
      .animate({ height: "show" });
  });

  // Submit a Tweet
  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault();

    if ($("#text").val() === "") {
      $("#erroMsg").text("You need to type something");
    } else if ($("#text").val().length >= 140) {
      $("#erroMsg").text("140 is the Max buddy");
    } else {
      $("#erroMsg").text("");
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $("#text").serialize()
      }).done(function(result) {
        loadTweets(result);
        $("#text").val("");
      });
    }
  });
});
