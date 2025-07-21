const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('current-time');
const durationTime = document.getElementById('duration');
const volume = document.getElementById('volume');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

let isPlaying = false;
let currentTrack = 0;

const playlist = [];

const surahNames = [
  "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس",
  "هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه",
  "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم",
  "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر",
  "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق",
  "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة",
  "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج",
  "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس",
  "التكوير", "الانفطار", "المطففين", "الانشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد",
  "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات",
  "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر",
  "المسد", "الإخلاص", "الفلق", "الناس"
];

for (let i = 1; i <= 114; i++) {
  const number = i.toString().padStart(3, '0'); // يحول 1 إلى 001 و 10 إلى 010
  playlist.push({
    src: `https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${number}.mp3`,
    title: surahNames[i - 1],
    artist: "مشاري راشد العفاسي"
  });
}



function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  title.textContent = track.title;
  artist.textContent = track.artist;
  audio.load();
}

loadTrack(currentTrack);

playBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    playBtn.innerHTML = '&#9654;';
  } else {
    audio.play();
    playBtn.innerHTML = '&#10074;&#10074;';
  }
  isPlaying = !isPlaying;
});

stopBtn.addEventListener('click', () => {
  audio.pause();
  audio.currentTime = 0;
  playBtn.innerHTML = '&#9654;';
  isPlaying = false;
});

nextBtn.addEventListener('click', () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = '&#10074;&#10074;';
});

prevBtn.addEventListener('click', () => {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = '&#10074;&#10074;';
});

audio.addEventListener('loadedmetadata', () => {
  durationTime.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
  currentTime.textContent = formatTime(audio.currentTime);
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
}
audio.addEventListener('ended', () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = '&#10074;&#10074;';
});
