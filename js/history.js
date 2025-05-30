var score = 0;
var bonus = 0;

function start_quiz() {
    document.getElementById("question1-slide").style.display = "block";
    document.getElementById("start_quiz").style.display = "none";
}

function question_wrong(count) {
    var num = count;
    document.getElementById("question" + num + "-wrong").style.display = "block";
    document.getElementById("question" + num + "-slide").style.display = "none";
}

function question_right(count) {
    var num = count;
    score = score + 1;
    document.getElementById("question" + num + "-right").style.display = "block";
    document.getElementById("question" + num + "-slide").style.display = "none";
    if (score > 2) {
        document.getElementById("result_text").innerHTML = "Well done! A true historian in the making - your grandparents will be proud!";
    } else {
        document.getElementById("result_text").innerHTML = "Yikes! May want to review your knowledge before visiting your grandparents.";
    }
    document.getElementById("result").innerHTML = score;
    console.log(score);
}

function bonus_right(count) {
    var num = count;
    bonus = bonus + 1;
    document.getElementById("question" + num + "-right").style.display = "block";
    document.getElementById("question" + num + "-slide").style.display = "none";
    document.getElementById("bonus_result").innerHTML = bonus;
    console.log(bonus);
}

function nextQuestion(count) {
    var previous = count - 1;
    var num = count;
    document.getElementById("question" + previous + "-right").style.display = "none";
    document.getElementById("question" + previous + "-wrong").style.display = "none";
    document.getElementById("question" + num + "-slide").style.display = "block";
}

function finish(previous) {
    document.getElementById("question" + previous + "-right").style.display = "none";
    document.getElementById("question" + previous + "-wrong").style.display = "none";
    document.getElementById("final_score").style.display = "block";
}