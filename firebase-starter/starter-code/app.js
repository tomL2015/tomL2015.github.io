$(document).ready(function() {
  var fireb = new Firebase("https://fpapp2016.firebaseio.com");
  $('#messages-form').submit(function(e){
    e.preventDefault();
    var $messageInput = $(this).find('input[name="message"]')
    fireb.child('messages').push({
      text: $messageInput.val(),
      votes: 0
    })
    $messageInput.val("");
  })
  function getFanMessages() {
    fireb.child('messages').on('value', function(results){
      // $('#messages').empty();
      var values = results.val();
      for(var key in values) {
        var msg = values[key];
        $("<p>" + msg.text + ", " + msg.votes + " votes</p>").appendTo('#messages');
      }
    })
  }


  function updateVotes(msgID, votes) {
  	var ref = new Firebase("https://fpapp2016.firebaseio.com/messages/ + msgID");
  	ref.update({ votes: votes})
  }

  getFanMessages();
})

//Parse.initialize("APPLICATION_ID", "JAVASCRIPT_KEY")