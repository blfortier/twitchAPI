/*global $*/
// Run jQuery
$(document).ready(function() {
  
    // Assign the given array of users to the variable users
    var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404"];

    // Call the Twitch API and access the data to determine if Free Code Camp is online or offline
    $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/freecodecamp").done(function(data) {
        
        // If FCC is offline, display as such to the screen
        if (data.stream === null) {
            $("#fccStatus").html(" is currently offline!");
        }
        // If FCC is online, display such to the screen
        else {
            $("#fccStatus").html(" is curently online!");
        }
    });


    // Use this for loop to cycle through the given data from the API and display the info
    for (var i = 0; i < users.length; i++) {

        // Request an AJAX request
        $.ajax({
            type: "GET",
            // Use the array users to check the info of each streamer
            url: "https://wind-bow.glitch.me/twitch-api/channels/" + users[i],
            
            // If successful, check the online status of each user
            success: function(dataIndex) {
                
                // Call the API again, this time accessing data about the user
                $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/" + dataIndex.name).done(function(data2) {
                    console.log(data2);
                    
                    // Determine the user name based on into given in the streaming object...Since the user name is not given,
                    // use the slice method on the user's website URL
                    var name = data2._links.self.slice(37);
                    
                    // DIsplay to the DOM nodes the data gathered from the API
                    if (data2.stream === null) {
                        $("#userName").append('<a target = "_blank" href = "https://www.twitch.tv/' + name + '">'+ name +'</a><br>');
                        $("#userStatus").append("OFFline!<br>");
                        $("#currentGame").append("N/A<br>");
                        $("#userLogo").attr("src", dataIndex[i].logo)
                    }
                    else {
                       $("#userName").append('<a target = "_blank" href = "https://www.twitch.tv/' + name + '">'+ name +'</a><br>');
                       $("#userStatus").append("ONline!<br>");
                       $("#currentGame").append(data2.stream.game + "<br>");
                    }
                });
            },
            // This is supposed to display an error message if the user is not found
            error: function(err) {
                $("#userName").append(users[i] + "<br>");
                $("#userStatus").append("User was not found...<br>");
                $("#currentGame").append("N/A<br>");

            }

        });
    };
});