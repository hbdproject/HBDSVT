//메인 트위터로 공유하기
function shareTwitter() {
    var sendText = "SVT 사이버 방석 퀴즈에 도전하세요!"; // 전달할 텍스트
    var sendUrl = "https://hbdproject.github.io/HBDSVT/"; // 전달할 URL
    window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
}