
$(document).ready(function () {

    function question() {
        this.question = "";
        this.answer = "";
        this.dummyAns = [];
        this.url = "";
    };



    var questionBoard = {

        questions: [],

        index: 0,

        correct:0,

        notCorrect:0,

        createQuestionsBlank: function () {
            var temp = [];
            for (var i = 0; i < 10; i++) {
                temp.push(new question());
            }
            this.questions = temp;
            console.log(temp);
        },

        populateQuestions: function () {
            this.questions[0].question = "What is Batista's finisher?";
            this.questions[0].answer = "Batista Slam";
            this.questions[0].dummyAns[0] = "TombStone";
            this.questions[0].dummyAns[1] = "Pedigree";
            this.questions[0].dummyAns[2] = "Choke Slam";
            this.questions[0].dummyAns[3] = "Batista Slam";
            this.questions[0].url = "./assets/images/batista.gif";

            this.questions[1].question = "What is HHH's finisher?";
            this.questions[1].answer = "Pedigree";
            this.questions[1].dummyAns[0] = "TombStone";
            this.questions[1].dummyAns[3] = "Buatista Slam";
            this.questions[1].dummyAns[2] = "Choke Slam";
            this.questions[1].dummyAns[1] = "Pedigree";
            this.questions[1].url = "./assets/images/hhh.gif";

            this.questions[2].question = "What is Undertakers finisher?";
            this.questions[2].answer = "TombStone";
            this.questions[2].dummyAns[3] = "Pedigree";
            this.questions[2].dummyAns[2] = "Buatista Slam";
            this.questions[2].dummyAns[1] = "Choke Slam";
            this.questions[2].dummyAns[0] = "TombStone";
            this.questions[2].url = "./assets/images/tombstone.gif";

            this.questions[3].question = "What is John Cena's finisher?";
            this.questions[3].answer = "FU";
            this.questions[3].dummyAns[0] = "TombStone";
            this.questions[3].dummyAns[2] = "Frog Splash";
            this.questions[3].dummyAns[3] = "5 Knucle shuffle";
            this.questions[3].dummyAns[1] = "FU";
            this.questions[3].url = "./assets/images/fu.gif";
        },

        createQuestionHtml: function (question) {
            var form = $("<form id=\"questionsBlock\">");
            var qs = $("<h3 id=\"question\">");
            qs.html(question.question);
            form.append(qs);
            for (var i = 0; i < 4; i++) {
                var qs1 = $("<input id=\"answers\">");
                qs1.attr("type", "radio");
                qs1.attr("value", question.dummyAns[i]);
                qs1.attr("name", "answer");
                form.append(qs1);
                form.append(question.dummyAns[i] + "<br>");
            }
            var submit = $("<input id=\"submit\">");
            submit.attr("type", "submit")
            form.append(submit);
            var emptyDiv = $("<div>");
            var img = $("<img id=\"imageResolved\">")
            emptyDiv.append(img);
            form.append(emptyDiv);
            $("#gameBoard").html(form);
            return form;
        },

        validateAnswer: function (question, answer) {
            var result = false;
            questionBoard.questions.forEach(function (questionIN) {
                if (questionIN.question === question) {
                    if (questionIN.answer === answer) {
                        console.log("SUCESS");
                        result = true;
                    }
                }
            });
            return result;
        },
        findQsURL: function (question) {
            var result = "";
            questionBoard.questions.forEach(function (questionIN) {
                if (questionIN.question === question) {
                    result = questionIN.url;
                }
            });
            return result;
        },

        nextQs: function () {
            if (questionBoard.index >= 4) {
                questionBoard.index = 0;
            }
            questionBoard.createQuestionHtml(this.questions[questionBoard.index]);
            questionBoard.index++;
        },

        credits: function()
        {
            var topDiv = $("<div>");
            var correct = $("<h2 class=\"result\"> Correct : "+this.correct+"</h2>");
            var notCorrect = $("<h2 class=\"result\"> Wrong : "+this.notCorrect+"</h2>");

            topDiv.append(correct);
            topDiv.append(notCorrect);

            $("#gameBoard").html(topDiv);
            $("#buttonNext").text("reload");       
        }
    }
    questionBoard.createQuestionsBlank();
    questionBoard.populateQuestions();

    var QuestionsAnswered = 0;
    var canPick = false;
    var theEnd = false;


    //Timer Helper Stuff
    function startInterval() {
        if (canPick == false) {
            $("#buttonNext").click(function (event) {
                event.preventDefault();
                questionBoard.nextQs();
                run();
                canPick = true;
               
                if($("#buttonNext").text() == "reload")
                     location.reload();
                if(questionBoard.correct == 4 || questionBoard.notCorrect == 4 || (questionBoard.correct+questionBoard.notCorrect) >= 4 )
                {
                    $("#show-number").empty();
                    questionBoard.credits();
                    theEnd = true;
                    stop();
                    
                }
               
                return callback();
            });
            
        }

        function callback() {
            if( theEnd == false)
            $("#questionsBlock").submit(function (event) {
                event.preventDefault();
                var question = $("#question").html();
                var answer = $("input:checked").val()
                console.log("Input Recieved : " + question + " answer: " + answer);
                var correctNess = questionBoard.validateAnswer(question, answer);
                if (canPick) 
                {
                    if (correctNess == true) 
                    {
                        var imageGif = $("#imageResolved");
                        imageGif.attr("src", questionBoard.findQsURL(question));
                        stop();
                        number = 21;
                        questionBoard.correct++;
                        canPick = false;

                    }
                    else {
                        var imageGif = $("#imageResolved");
                        imageGif.attr("src", "./assets/images/wrong.gif");
                        canPick = false;
                        stop();
                        questionBoard.notCorrect++;
                        number = 21;
                    }
                }
            });
        }
    }
    //  Interval Demonstration
    //  Set our number counter to 100.
    var number = 21;
    //  Variable that will hold our interval ID when we execute
    //  the "run" function
    var intervalId;

    var isRunning = false;

    startInterval();


    function run() {
        if (!isRunning) {
            isRunning = true;
            intervalId = setInterval(decrement, 1000);
        }
    }
    //  The decrement function.
    function decrement() {

        //  Decrease number by one.
        number--;

        //  Show the number in the #show-number tag.
        $("#show-number").html("<h2 style=\"text-align:center;\"> Time Left For the Quiz ::" + number + "</h2>");

        //  Once number hits zero...
        if (number === 0) {

            //  ...run the stop function.
            stop();

            questionBoard.credits();

            //  Alert the user that time is up.
            alert("Time Up!");
        }
    }
    //  The stop function
    function stop() {
        isRunning = false;
        //  Clears our intervalId
        //  We just pass the name of the interval
        //  to the clearInterval function.
        clearInterval(intervalId);

    }

});