const adj = [
    "조용한", "잊혀진", "부서진", "보이지 않는", "임시적인", "미완성의", "텅 빈", "손상된", "오래된",
    "닫힌", "열리지 않는", "느린", "끊어진", "흐릿한", "반쯤 지워진", "누락된", "정렬되지 않은",
    "읽기 전용인", "백업되지 않은", "숨겨진", "이름 없는", "이동된", "압축된", "만료된", "수정 중인",
    "응답 없는", "로딩 중인", "경고만 남은", "비어있는 것처럼 보이는",
];

const noun = [
    "창문", "길", "신호", "시스템", "기억", "오류", "파일", "페이지", "버전", "흔적",
    "폴더", "링크", "캐시", "로그", "주소", "화면", "입력", "출력", "경로", "서버",
    "데이터", "네트워크", "타임아웃", "프로세스", "디렉토리", "업데이트", "알림", "색인",
    "백업", "임시파일", "스크롤", "커서", "드래그", "클립보드", "히스토리",
];

const abst = [
    "기억", "질서", "진보", "공허함", "시간", "고요함", "의심", "지연", "망각",
    "불완전함", "반복", "기다림", "혼란", "정확함", "흐름", "부재", "여백", "실패",
    "시작", "끝", "중간", "경계", "연결", "단절", "침묵", "속도", "무게", "방향",
    "목적", "흔적", "원인", "결과", "형태", "패턴", "규칙", "예외",
];

const verb = [
    "사라지", "돌아오", "존재하", "연결되", "무너지", "남아있", "로드되",
    "열리", "닫히", "실행되", "종료되", "저장되", "삭제되", "복구되",
    "응답하", "대기하", "반복되", "멈추", "작동하", "이동하", "변환되",
];

const verbCant = [
    "사라질", "돌아올", "존재할", "연결될", "무너질", "남아있을", "로드될",
    "열릴", "닫힐", "실행될", "종료될", "저장될", "삭제될", "복구될",
    "응답할", "대기할", "반복될", "멈출", "작동할", "이동할", "변환될",
];

const verbDoes = [
    "사라진다", "돌아온다", "존재한다", "연결된다", "무너진다", "남아있다", "로드된다",
    "열린다", "닫힌다", "실행된다", "종료된다", "저장된다", "삭제된다", "복구된다",
    "응답한다", "대기한다", "반복된다", "멈춘다", "작동한다", "이동한다", "변환된다",
];

const adjEn = [
    "silent", "forgotten", "broken", "invisible", "temporary", "unfinished", "empty", "corrupted", "old",
    "closed", "slow", "severed", "blurred", "half-erased", "missing", "misaligned", "read-only",
    "hidden", "unnamed", "moved", "expired", "pending", "unresponsive", "loading", "archived",
];

const nounEn = [
    "window", "path", "signal", "system", "memory", "error", "file", "page", "version", "trace",
    "folder", "link", "cache", "log", "address", "screen", "input", "output", "directory", "server",
    "record", "network", "timeout", "process", "update", "cursor", "clipboard", "history",
];

const abstEn = [
    "memory", "order", "progress", "emptiness", "time", "stillness", "doubt", "delay", "forgetting",
    "incompleteness", "repetition", "waiting", "confusion", "accuracy", "flow", "absence", "silence",
    "beginning", "end", "boundary", "connection", "disconnection", "weight", "direction", "pattern",
];

const verbEn = [
    "disappear", "return", "exist", "connect", "collapse", "remain", "load",
    "open", "close", "run", "terminate", "save", "delete", "recover",
    "respond", "wait", "repeat", "stop", "move", "convert",
];

const verbEnDoes = [
    "disappears", "returns", "exists", "connects", "collapses", "remains", "loads",
    "opens", "closes", "runs", "terminates", "saves", "deletes", "recovers",
    "responds", "waits", "repeats", "stops", "moves", "converts",
];

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function hasBatchim(w) {
    const c = w.charCodeAt(w.length - 1);
    return c >= 0xAC00 && c <= 0xD7A3 && (c - 0xAC00) % 28 !== 0;
}
const eun = w => w + (hasBatchim(w) ? "은" : "는");
const eul = w => w + (hasBatchim(w) ? "을" : "를");
const gwa = w => w + (hasBatchim(w) ? "과" : "와");
const ida = w => w + (hasBatchim(w) ? "이다" : "다");

const patterns = [
    () => `${pick(adj)} ${eun(pick(noun))} 언제나 ${pick(adj)} 상태로 남는다.`,
    () => `${pick(abst)} 없이는 ${pick(noun)}도 ${pick(verbCant)} 수 없다.`,
    () => `${pick(verb)}지 않는 ${pick(noun)}도 결국 ${ida(pick(noun))}.`,
    () => `${eun(pick(abst))} 그저 ${pick(adj)} ${pick(noun)}일 뿐이다.`,
    () => `${pick(verb)}기를 거부하는 ${eul(pick(noun))} 믿지 마라.`,
    () => `${eun(pick(noun))} 결국 ${pick(verbDoes)}. 언제나 그래왔다.`,
    () => `${gwa(pick(abst))} ${eun(pick(abst))} 같은 ${pick(noun)} 안에 존재할 수 없다.`,
];

const patternsEn = [
    () => `the ${pick(adjEn)} ${pick(nounEn)} is always ${pick(adjEn)}.`,
    () => `without ${pick(abstEn)}, no ${pick(nounEn)} can ${pick(verbEn)}.`,
    () => `a ${pick(nounEn)} that does not ${pick(verbEn)} is still a ${pick(nounEn)}.`,
    () => `${pick(abstEn)} is just a ${pick(adjEn)} ${pick(nounEn)}.`,
    () => `never trust a ${pick(nounEn)} that refuses to ${pick(verbEn)}.`,
    () => `the ${pick(nounEn)} always ${pick(verbEnDoes)}. it always has.`,
    () => `${pick(abstEn)} and ${pick(abstEn)} cannot exist in the same ${pick(nounEn)}.`,
];

function generateQuote() {
    const isKo = document.body.classList.contains('ko');
    document.getElementById("quote").textContent = pick(isKo ? patterns : patternsEn)();
}

generateQuote();

const marqueeTop = document.querySelector('marquee.en-only').getBoundingClientRect().top + window.scrollY;
document.querySelector('.floating').style.top = marqueeTop + 'px';