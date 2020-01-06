
$(document).ready(function() {

  $(".nameUser").text("Alex Falco");


  $("#text").on('keyup', function() {
    const maxCount = 140;
    let countRemain = maxCount - ($(this).val().length);

    console.log(countRemain);
  
    if (countRemain > 0) {
      $("#counter").text(countRemain);
    } else {
   
      $("#counter").text(countRemain).css("color", "red");
    }

  });
});







