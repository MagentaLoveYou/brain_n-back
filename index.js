8$(document).ready(function() {
    var items = ['PASSION', 'ETERNITY', 'LIBERTY', 'TRANQUILITY', 'DESTINY', 'FANTASTIC', 'TARRASQUE', 'WARRUNNER', 'MORPHLING', 'MYSTIC']; 
    var previous = [];
    var correct = 0;
    var incorrect = 0;
    var intervalId;
    var level = 3;
    randomIndex = 0;
    var delay = ( milliseconds ) => new Promise((resolve) => setTimeout(resolve, milliseconds));
    var flag = true;
    var clck = 0;
    var counter = 0;
    var repeat = true;
    var start_flag = true;
    var repeat_repeat = true;
    var sync = 0;
    var proverka = true;

    function displayRandomItem() {
        var percentage = [];
        flag = true; 
        repeat_repeat = false;
        if (counter <= 20 + level * 2 ) {
        for (let i = 0; i<=3; i++) {
          var randomIndex = Math.floor(Math.random() * items.length);
          percentage.push(items[randomIndex]);
          percentage.push(previous[previous.length - (level + 1)]);
        };
        if (previous.length > 0) {
          percentage.push(previous[previous.length - (level + 1)]);
          percentage.push(previous[previous.length - (level + 1)]);
          percentage.push(previous[previous.length - (level + 1)]);
        };
        //$("#prompt").text('');1
        rndm =  Math.floor(Math.random() * percentage.length);
        var text = percentage[rndm];
        previous.push(text);
        var count = 0;
        // $("#prompt").text('');
        function character(start, end, text) {
          return text.substring(start, end);
        };
        function type() {
          var rnd = 20;
          setTimeout(type, rnd);
          $("#prompt").append(character(count, count+1, text));
          count++;
        }
        //$("#prompt").text('');
        type();

        delay(3000)
        //setTimeout(delay, 3000)
        if (previous[previous.length - (level + 1)] === previous[previous.length - 1] && repeat === true )  {
          incorrect++;
          $("#score").text("Correct: " + correct + " Incorrect: " + incorrect);
          repeat_repeat = true;
          proverka = false;
        } else {
            clck--;
        };
        repeat = true;
        proverka = true;
        counter++;
        $("#prompt").text('')
            
      } else {
          clearInterval(intervalId);
          $("#prompt").text("");
          var perc = correct / ((correct + incorrect) / 100);
          var text_result = ('Score: ' + String(perc).substring(0, 4) + '%');
          $("#percent").text(text_result);
          counter = 0;
      };
        // if ( counter === 1 + level * 2 ) {
        //   clearInterval(intervalId);
        //   $("#prompt").text("");
        //   var perc = correct / ((correct + incorrect) / 100);
        //   var text_result = ('Score: ' + String(perc).substring(0, 4));
        //   $("#score").text(text_result);
        //   counter = 0;
        // };
    };

    function check() {
         if (previous[previous.length - (level + 1)] === previous[previous.length - 1]) {
           correct++;
         } else {
           incorrect++;
         };
         if (clck === 0) {
           clck++;
         } else {
           clck--;
         };
         $("#score").text("Correct: " + correct + " Incorrect: " + incorrect);
         flag = false;
        
//       if (repeat === false && proverka === false) {
//           incorrect--;
//           $("#score").text("Correct: " + correct + " Incorrect: " + incorrect);
//       }
      };
   
  
    $("#start-button").click(function() {
      if (start_flag) {
        intervalId = setInterval(displayRandomItem, 3000)
        start_flag = false
      };
    });
  
    $("#yes-button").click(function() {
      repeat = false;
      repeat_repeat = true;
      if (flag) {
        if (clck === 0) {
          clck++
        };
        check();
      };
    });
  
    $("#stop-button").click(function() {
      clearInterval(intervalId);
    });
  
    $("#reset-button").click(function() {
      clearInterval(intervalId);
      previous = [];
      correct = 0;
      incorrect = 0;
      $("#prompt").text("");
      $("#percent").text("");
      $("#score").text("Correct: 0 Incorrect: 0");
      start_flag = true;
    });
  
    $("#set-level-button").click(function() {
      level = parseInt($("#level-input").val());
    });
  });
