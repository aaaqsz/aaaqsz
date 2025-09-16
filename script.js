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
  },
  {
    q: "デッドリフトで主に鍛えられるのは？",
    c: ["広背筋・脊柱起立筋", "腹直筋", "三角筋", "上腕二頭筋"],
    a: 0
  },
  {
    q: "懸垂（チンニング）で特に強化されるのは？",
    c: ["広背筋", "大腿四頭筋", "腹筋", "僧帽筋"],
    a: 0
  },
  {
    q: "ブルガリアンスクワットで特に鍛えられるのは？",
    c: ["大腿四頭筋と臀筋", "上腕三頭筋", "三角筋", "腹直筋"],
    a: 0
  },
  {
    q: "アームカールで主に鍛えられる筋肉は？",
    c: ["上腕二頭筋", "大胸筋", "僧帽筋", "ハムストリング"],
    a: 0
  },
  {
    q: "ショルダープレスで主に鍛えられるのは？",
    c: ["三角筋", "広背筋", "腹筋", "大腿四頭筋"],
    a: 0
  },
  {
    q: "カーフレイズで主に鍛えるのは？",
    c: ["下腿三頭筋（ふくらはぎ）", "広背筋", "上腕二頭筋", "大胸筋"],
    a: 0
  },
  {
    q: "ランジで鍛えられる筋肉は？",
    c: ["大腿四頭筋と臀筋", "三角筋", "僧帽筋", "上腕三頭筋"],
    a: 0
  }
];

let idx = 0;
let score = 0;
let results = []; // ✅ 回答履歴を保存

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
      let correct = false;
      if(i === q.a){
        li.classList.add("correct");
        score++;
        correct = true;
      } else {
        li.classList.add("wrong");
      }
      // ✅ 回答を記録
      results.push({
        question: q.q,
        userAnswer: q.c[i],
        correctAnswer: q.c[q.a],
        correct: correct
      });
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

  let html = "";

  if(score === QUESTIONS.length){
    const facts = [
      "筋肉は48時間以上の休養でより成長する。",
      "スクワットは“キング・オブ・エクササイズ”とも呼ばれる。",
      "プランクはわずか1分でも体幹強化に効果的。",
      "デッドリフトは全身運動として最も効率的な種目のひとつ。",
      "懸垂は広背筋を鍛える最強の自重トレーニング。"
    ];
    const fact = facts[Math.floor(Math.random()*facts.length)];
    html += `🎉 全問正解！おめでとう！<br><br>豆知識: ${fact}<br><br>`;
  }

  // ✅ 間違えた問題の一覧を追加
  const wrongs = results.filter(r => !r.correct);
  if(wrongs.length > 0){
    html += "<h3>間違えた問題と正解:</h3><ul>";
    wrongs.forEach(r => {
      html += `<li><b>Q:</b> ${r.question}<br>
               あなたの答え: ${r.userAnswer}<br>
               正解: ${r.correctAnswer}</li><br>`;
    });
    html += "</ul>";
  }

  detailEl.innerHTML = html;
}

showQuestion();
