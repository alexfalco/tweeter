/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  loadTweets()
})



const  loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: "GET",
    //dataType: JSON , 
  })
  .done(function(result) {
    renderTweets(result) }
  );

}

const createTweetElement = function(tweetObj) {

  let $tweet = $('<article>');
  let $header = $('<header>');
  let $avatar = $('<img>').attr('src',tweetObj.user.avatars);
  let $username = $('<p>').text(tweetObj.user.name);
  let $handle = $('<p>').text(tweetObj.user.handle);
  let $content = $('<p>').text(tweetObj.content.text);
  let $line = $('<hr>');
  let $footer = $('<footer>').text(tweetObj.created_at);
  
  $header = $header
  .append($avatar)
  .append($username)
  .append($handle);
   
  $tweet = $tweet.append($header).append($content).append($line).append($footer)

  $("#tweetContainer").prepend($tweet)
 
}

const renderTweets = function(arrayTweet) {

for ( tweet of arrayTweet) {
  createTweetElement(tweet)
}

}


// AJAX Request

// selector est le form
// JQuery permet le handler Submit pour un form
$(document).ready(function() {
 
  $('.new-tweet form').on('submit', function (event) {
   
    event.preventDefault()
    console.log($('#text').val())
    if ($('#text').val() === "") {
      alert('You need to type something')
    } else if ($('#text').val().length >= 140) {
      alert('140 is the Max buddy')
    }
    else {
    $.ajax({
      url: '/tweets',
      method: "POST",
      data: $('#text').serialize(), 
    })
    .done(function(result) {
      loadTweets(result) })
  }
  }); 

}) 


$(document).ready(function() {

$('#Bar2').click(function() {
  $('.new-tweet').toggle();
})
})

