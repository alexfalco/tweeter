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


// Submit a Tweet 
$(document).ready(function() {
 
  $('.new-tweet form').on('submit', function (event) {
  
    
    event.preventDefault()
   
    if ($('#text').val() === "") {
      $("#erroMsg").text('You need to type something')
    } else if ($('#text').val().length >= 14) {
      $("#erroMsg").text('140 is the Max buddy')
    }
    else {
      $("#erroMsg").text('')
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


// Unhide the tweet section 
$(document).ready(function() {
  $('.new-tweet').hide()
$('#Bar2').click(function() {
  $('.new-tweet').toggle();
})
})


// Unhide the tweet section 
$(document).ready(function() {
  $('.new-tweet').hide()
$('#Bar4').click(function() {
  $('.new-tweet').toggle();
})
})