var score=0;
function checkAnswer() 
{
    var correctAnswer= document.getElementById("videoName").innerHTML;
    let userAnswer = document.getElementById("answer-input").value;
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      console.log("Correct! +1 point");
      score++;
      scorevalue.innerText = score;
      // reset game here
    }
  }

function afficheS() {
  scorevalue.innerText = score;
}