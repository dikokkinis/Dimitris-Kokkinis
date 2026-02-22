const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
});

(function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
})();

function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const targetPos = target.getBoundingClientRect().top + window.pageYOffset;
    const startPos = window.pageYOffset;
    const distance = targetPos - startPos;
    const duration = 1000;
    let start = null;

    function ease(t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; }

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percent = Math.min(progress / duration, 1);
        window.scrollTo(0, startPos + distance * ease(percent));
        if (progress < duration) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}

function scrollNextProject() {
    const slider = document.getElementById('projectsSlider');
    const slideWidth = slider.clientWidth;
    
    if (slider.scrollLeft + slideWidth >= slider.scrollWidth) {
        slider.scrollTo({
            left: 0,
            behavior: 'smooth'
        });
    } else {
        slider.scrollBy({
            left: slideWidth,
            behavior: 'smooth'
        });
    }
}
//----------------------------------------------
// --- MUSIC PLAYER FUNCTIONALITY ---

document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const nextBtn = document.getElementById('nextBtn');
    const turntableContainer = document.querySelector('.turntable-container');

    let isPlaying = false;
    let currentTrackIndex = 0;

    const playlist = [
        './assets/audio/sample1.mp3',
        './assets/audio/sample2.mp3',
        './assets/audio/sample3.mp3',
        './assets/audio/sample4.mp3',
        './assets/audio/sample5.mp3',
        './assets/audio/sample6.mp3',
    ];

    function loadTrack(index) {
        audioPlayer.src = playlist[index];
        audioPlayer.load();
    }

    function togglePlayState(playing) {
        if (playing) {
            turntableContainer.classList.add('is-spinning');
            isPlaying = true;
        } else {
            turntableContainer.classList.remove('is-spinning');
            isPlaying = false;
        }
    }

    playBtn.addEventListener('click', () => {
        if (!audioPlayer.src) {
            loadTrack(currentTrackIndex);
        }

        if (isPlaying) {
            audioPlayer.pause();
            togglePlayState(false);
        } else {
            audioPlayer.play();
            togglePlayState(true);
        }
    });

    nextBtn.addEventListener('click', () => {
        currentTrackIndex++;
        if (currentTrackIndex >= playlist.length) {
            currentTrackIndex = 0;
        }
        loadTrack(currentTrackIndex);
        audioPlayer.play()
            .then(() => {
                togglePlayState(true);
            })
            .catch(error => {
                console.error("Playback failed:", error);
                togglePlayState(false); 
            });
        });

    function loadTrack(index) {
        audioPlayer.pause();
        audioPlayer.src = playlist[index];
        audioPlayer.load();
}

    audioPlayer.addEventListener('ended', () => {
        togglePlayState(false);
    });
    loadTrack(currentTrackIndex);
});