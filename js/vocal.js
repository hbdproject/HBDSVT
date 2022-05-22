//문제 객체 생성자
function question(txt, choice, answer){
    this.txt = txt;
    this.choice = choice;
    this.answer = answer;
}

//문제 객체 -12개
var questions = [
    new question('힙합팀 리더의 활동명으로 올바른 것은?', ['예습복습', '에수쿱스', '에스쿱스', '에이쿱스'],'에스쿱스'),
    new question('원우가 GSVT E-Triathlon Championship에서 사용한 닉네임으로 알맞은 것은?', ['Vv원우vV', '아직ONE발남았다', '차처음탑니당', '아직one발남았다'],'아직one발남았다'),
    new question('4월 4일 민규 인스타에 올라온 사진의 댓글 중 정한이 사용하지 않은 단어는?', ['쭈구리', '여유있는척', '캐럿', '무단투기'],'무단투기'),
    new question('버논의 위버스 닉네임으로 올바른 것은?', ['국밥boi', 'kpoppapī','kpopopī','kpopopīp'],'kpoppapī'),
    new question('원우가 한 번도 하지 않은 머리색은?', ['보라색','빨간색','초록색','없다'],'없다'),
    new question('에스쿱스가 자고 일어나서 더 낮게 녹음이 된 노래는?', ['빠른 걸음', '트라우마', '언행일치', '숨이 차'],'빠른 걸음'),
    new question('2022년 힙합팀 나이를 모두 더하면 몇 살?', ['105', '107', '106', '104'], '106'),
    new question('버논의 학창시절 동아리로 올바른 것은?', ['무릉도원','무에타이','무한도전', '무동놀이'],'무에타이'),
    new question('연습생 시절, 힙합팀 중 타 그룹 뮤비에 출연하지 않은 멤버는?', ['민규', '에스쿱스', '버논', '원우'],'버논'),
    new question('원우의 고향인 창원까지 가기 위해 서울에서 출발하는 KTX를 탔다. 이 때 열차가 지나지 않는 역은?', ['천안아산', '대전', '동대구', '진주'],'진주'),
    new question('힙합팀 멤버들의 혈액형이 아닌 것은?', ['A형', 'B형', 'O형', 'AB형'],'O형'),
    new question('또민규가 떨어뜨리거나 흘리거나 부수지 않은 것은?', ['상', '라면', '유리', '카메라'],'카메라'),
];

//미중복 랜덤 번호 만들기
function randQuestion(n){
    var array = new Array(n);
    var tmp;
    var randNum;

    //번호 할당
    for(var i = 0; i < n; i++){
        array[i] = i;
    }

    //번호 섞음
    // for(var i = 0; i < n; i++){
    //     randNum = Math.floor(Math.random * n);
    //     tmp = array[i];
    //     array[i] = array[randNum];
    //     array[randNum] = tmp;
    // }
    array.sort(() => Math.random() - 0.5);

    return array;
}

//퀴즈 객체 생성자
function Quiz(questions){
    this.score = 0; //점수
    this.questions = questions; //질문 할당
    this.questionIndex = 0; //질문 순서 번호
    this.index = new randQuestion(questions.length); //랜덤 문제 번호 배열
}

var quiz = new Quiz(questions); //퀴즈 객체
var arrIdx = 0; //quiz.index[arrIdx];

//문제 출력 함수
function printQuiz(){
    var question = document.getElementById('question'); //html에 문제 질문 노출
    var idx = quiz.questionIndex + 1; //문제 순서
    var choice = document.querySelectorAll('.btn_quiz'); //정답 선택 버튼 찾기
    var qIdx = quiz.index[arrIdx];

    document.getElementById('question').innerHTML = idx + '. ' + quiz.questions[qIdx].txt;

    for(var i = 0; i < 4; i++){
        choice[i].innerHTML = quiz.questions[qIdx].choice[i];
    }
}

//정답
Quiz.prototype.correctAnswer = function(answer) {
    return answer == this.questions[quiz.index[arrIdx]].answer;
}

//정답 체크
var btn = document.querySelectorAll('.btn_quiz');
function chkAnswer(i){
    btn[i].addEventListener('click', function(){
        var answer = btn[i].innerText;

        if (quiz.correctAnswer(answer)){
            quiz.score++;
        }
        else {
            endQuiz();
        }

        if (quiz.questionIndex < quiz.questions.length - 1){
            quiz.questionIndex++;
            arrIdx++;
            printQuiz();
        }
        else{
            endQuiz();
        }
    });
}

//트위터 결과 공유
function shareScore() {
    var sendText = "SVT 사이버 방석 보컬팀 퀴즈에서 " + quiz.score + "개를 맞췄습니다."; // 전달할 텍스트
    var sendUrl = "https://hbdproject.github.io/HBDSVT/"; // 전달할 URL
    window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
}

//종료
function endQuiz(){
    var quizDiv = document.getElementById('quiz');
    var txt = '<p>'+ quiz.questions.length + '개 중에서 ' + quiz.score + '개를 맞췄습니다.' + '</p>';

    quizDiv.innerHTML = txt;

    var btn = document.getElementById('btn_link');
    btn.addEventListener('click', function(){
        shareScore(quiz.score);
    });
}

for (var i = 0; i < btn.length; i++) {
    chkAnswer(i);
} 

printQuiz();