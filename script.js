const QUESTIONS = [
  {
    q: "ベンチプレスで主に鍛えられる筋肉はどれ？",
    c: ["大胸筋", "上腕二頭筋", "僧帽筋", "広背筋"],
    a: 0
  },
  {
    q: "スクワットで最も大きな刺激を受ける筋肉は？",
    c: ["ハムストリング", "大腿四頭筋", "臀筋", "前腕筋"],
    a: 1
  },
  {
    q: "プランクが特に鍛える部位は？",
    c: ["体幹（コア）", "ふくらはぎ", "上腕三頭筋", "肩"],
    a: 0
  }
];

let idx = 0;
let score = 0;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const detailEl = document.getElementById("detail");
const quizArea = document.getElementById("quiz");
const bar = document.getElementById("bar");
const qcount = document.getElementById("qcount");

function updateProgress() {
  bar.style.width = Math.round(((idx+1)/QUESTIONS.length)*100) + '%';
  qcount.textContent = `${idx+1} / ${QUESTIONS.length}`;
}

function showQuestion() {
  const q = QUESTIONS[idx];
  questionEl.textContent = q.q;
  choicesEl.innerHTML = "";

  q.c.forEach((choice, i) => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.onclick = () => {
      if(i === q.a){
        li.classList.add("correct");
        score++;
      } else {
        li.classList.add("wrong");
      }
      Array.from(choicesEl.children).forEach(el => el.onclick = null);
    };
    choicesEl.appendChild(li);
  });

  updateProgress();
}

nextBtn.onclick = () => {
  idx++;
  if(idx < QUESTIONS.length){
    showQuestion();
  } else {
    finish();
  }
};

function finish(){
  quizArea.classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${QUESTIONS.length}`;

  // 🎉 全問正解したら豆知識ランダム表示
  if(score === QUESTIONS.length){
    const facts = [
      "筋肉は48時間以上の休養でより成長する。",
      "スクワットは“キング・オブ・エクササイズ”とも呼ばれる。",
      "プランクはわずか1分でも体幹強化に効果的。"
    ];
    const fact = facts[Math.floor(Math.random()*facts.length)];
    detailEl.innerHTML = `🎉 全問正解！おめでとう！<br><br>豆知識: ${fact}`;
  }
}

showQuestion();
