<script setup name="boxModel">
import { ref, onMounted, onUnmounted, reactive } from "vue";
import WaveSurfer from "wavesurfer.js";
import music from "@/assets/music/I was there(海拉end).wav";
import lrcLyrics from "@/assets/music/I was There.lrc?raw";
import image from '@/assets/image/cg-残锋（下）.jpeg'
const waveformContainer = ref(null);
const wavesurfer = ref(null);
const isPlaying = ref(false);
const lyricsContainer = ref(null);
const volume = ref(0.8); // 默认音量
const toggleAudioMute = ref("icon-bofang");
const currentTime = ref(0);
const duration = ref(0);
const parsedLyrics = ref([]);
const currentLyricIndex = ref(-1);

const backgroundStyle = ref({
  backgroundImage: `url(${image})`,
});

const formInline = reactive({
  music: "",
});

// 解析LRC歌词
function parseLRC(lrcText) {
  const lines = lrcText.split("\n");
  const result = [];

  for (const line of lines) {
    // 跳过元数据行
    if (
      line.startsWith("[ml:") ||
      line.startsWith("[ti:") ||
      line.startsWith("[ar:") ||
      line.startsWith("[al:") ||
      line.startsWith("[by:") ||
      line.startsWith("[offset:")
    ) {
      continue;
    }

    // 匹配时间标签
    const timeTags = line.match(/\[(\d+):(\d+\.\d+)\]/g);
    if (!timeTags) continue;

    // 提取歌词文本
    const text = line.replace(timeTags[0], "").trim();
    if (!text) continue;

    // 处理每个时间标签
    for (const tag of timeTags) {
      const matches = tag.match(/\[(\d+):(\d+\.\d+)\]/);
      if (matches) {
        const minutes = parseFloat(matches[1]);
        const seconds = parseFloat(matches[2]);
        const time = minutes * 60 + seconds;

        result.push({
          time,
          text,
        });
      }
    }
  }

  // 按时间排序
  return result.sort((a, b) => a.time - b.time);
}

parsedLyrics.value = parseLRC(lrcLyrics);
//jm神秘番号377253
onMounted(() => {
  // 初始化 Wavesurfer
  wavesurfer.value = WaveSurfer.create({
    container: waveformContainer.value,
    waveColor: "#dcf7f754", // 波形颜色
    progressColor: "#00ffffc2", // 进度颜色
    cursorColor: "transparent", // 隐藏光标
    // barWidth: 2, // 条形宽度:cite[1]
    // barGap: 1, // 条形间隙:cite[1]
    // barRadius: 1, // 条形圆角:cite[1]
    height: 500, // 容器高度，应与圆形直径匹配
    minPxPerSec: 100,
    normalize: true,
  });

  // 加载音频（替换为你的音频 URL）
  wavesurfer.value.load(music);

  // 事件监听
  wavesurfer.value.on("ready", () => {
    console.log("音频加载完成");
    wavesurfer.value.setVolume(volume.value); // 设置初始音量
    duration.value = wavesurfer.value.getDuration();
  });

  wavesurfer.value.on("play", () => {
    toggleAudioMute.value = "icon-zanting";
    isPlaying.value = true;
  });

  wavesurfer.value.on("pause", () => {
    toggleAudioMute.value = "icon-bofang";
    isPlaying.value = false;
  });

  wavesurfer.value.on("seek", (time) => {
    currentTime.value = time;
    updateCurrentLyric(time);
  });

  wavesurfer.value.on("audioprocess", (time) => {
    // 音频播放过程中持续触发，可用于更复杂的动态效果:cite[4]
    currentTime.value = time;
    updateCurrentLyric(time);
  });
});
const changeMusic = async (e) => {
  if (e === "Wash Your Sins Away") {
    try {
      const music = await import("@/assets/music/Wash Your Sins Away.wav");
      const image = await import('@/assets/image/悬城cg1.jpeg')
      backgroundStyle.value.backgroundImage = `url(${image.default})`;
      wavesurfer.value.load(music.default);
      const lrcLyrics = await import(
        "@/assets/music/Wash Your Sins Away.lrc?raw"
      );
      parsedLyrics.value = parseLRC(lrcLyrics.default);
    } catch (e) {
      console.log("音频加载失败：", e);
    }
  } else {
    try {
      const music = await import("@/assets/music/I was there(海拉end).wav");
      const image = await import('@/assets/image/cg-残锋（下）.jpeg')
      backgroundStyle.value.backgroundImage = `url(${image.default})`;
      wavesurfer.value.load(music.default);
      const lrcLyrics = await import("@/assets/music/I was There.lrc?raw");
      parsedLyrics.value = parseLRC(lrcLyrics.default);
    } catch (e) {
      console.log("音频加载失败：", e);
    }
  }
};

// 更新当前歌词
const updateCurrentLyric = (time) => {
  if (parsedLyrics.value.length === 0) return;

  // 找到当前时间对应的歌词
  let newIndex = -1;
  for (let i = 0; i < parsedLyrics.value.length; i++) {
    if (parsedLyrics.value[i].time <= time) {
      newIndex = i;
    } else {
      break;
    }
  }

  // 如果歌词索引发生变化
  if (newIndex !== currentLyricIndex.value) {
    currentLyricIndex.value = newIndex;
    scrollToCurrentLyric();
  }
};

// 滚动到当前歌词
const scrollToCurrentLyric = () => {
  if (!lyricsContainer.value || currentLyricIndex.value === -1) return;

  const lyricElements = lyricsContainer.value.querySelectorAll(".lyric-line");
  if (
    lyricElements.length > 0 &&
    currentLyricIndex.value < lyricElements.length
  ) {
    const activeElement = lyricElements[currentLyricIndex.value];
    const containerHeight = lyricsContainer.value.clientHeight;
    const elementOffset = activeElement.offsetTop;
    const elementHeight = activeElement.clientHeight;

    lyricsContainer.value.scrollTo({
      top: elementOffset - containerHeight / 2 + elementHeight / 2,
      behavior: "smooth",
    });
  }
};

// 格式化时间显示
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
onUnmounted(() => {
  if (wavesurfer.value) {
    wavesurfer.value.destroy();
  }
});

const playPause = () => {
  wavesurfer.value.playPause();
};

const setVolume = (val) => {
  wavesurfer.value.setVolume(parseFloat(val.target.value));
};
</script>

<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="选择音乐">
      <el-select
        v-model="formInline.music"
        placeholder="选择音乐"
        clearable
        @change="changeMusic"
      >
        <el-option label="I was there" value="I was there" />
        <el-option label="Wash Your Sins Away" value="Wash Your Sins Away" />
      </el-select>
    </el-form-item>
  </el-form>
  <div class="circular-wavesurfer-container">
    <!-- 圆形波形容器 -->
    <div class="circular-container">
      <div
        ref="waveformContainer"
        class="circular-waveform"
        :style="backgroundStyle"
      ></div>
    </div>

    <div class="time-display">
      <span>{{ formatTime(currentTime) }}</span>
      /
      <span>{{ formatTime(duration) }}</span>
    </div>

    <!-- 控制按钮 -->
    <div class="controls">
      <SvgIcon
        :icon-class="toggleAudioMute"
        @click="playPause"
        style="font-size: 32px; color: red"
      />
      <input
        type="range"
        class="volume-slider"
        min="0"
        max="1"
        step="0.01"
        v-model="volume"
        @input="setVolume"
      />
    </div>

    <!-- 歌词容器 -->
    <div class="visualization">
      <div class="lyrics-container" ref="lyricsContainer">
        <div class="lyrics">
          <div
            v-for="(line, index) in parsedLyrics"
            :key="index"
            :class="['lyric-line', { active: index === currentLyricIndex }]"
          >
            {{ line.text }}
          </div>
        </div>

        <div v-if="parsedLyrics.length === 0" class="lyrics-placeholder">
          <i
            class="fas fa-music"
            style="font-size: 32px; margin-bottom: 10px"
          ></i>
          <p>暂无歌词</p>
        </div>
      </div>


    </div>
  </div>
      <div class="foot">
      {{formInline.music}}
      </div>
</template>

<style scoped>
.foot{
  width: 500px;
  text-align: center;
  color: #04fe5b;
  font-size: 24px;
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
.circular-wavesurfer-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.circular-container {
  width: 500px;
  height: 500px;
  border-radius: 500px;
  overflow: hidden;
}
.circular-waveform {
  width: 100%; /* 圆的直径 */
  height: 500px; /* 圆的直径 */
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  /* background-image: url(../../../assets/image/cg-残锋（下）.jpeg); */
  background-size: cover;
  background-position: center center;
}

.volume-slider {
  display: none;
}
.time-display {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 14px;
  opacity: 0.8;
}

.visualization {
  display: flex;
  margin-bottom: 30px;
  position: absolute;
  width: 500px;
  color: #fff;
}

.lyrics-container {
  flex: 1;
  height: 300px;
  overflow: hidden;
  position: relative;
  /* background: #a7fcff; */
  border-radius: 10px;
  padding: 15px;
}

.lyrics {
  position: relative;
  transition: transform 0.3s ease;
}

.lyric-line {
  padding: 8px 15px;
  margin: 5px 0;
  border-radius: 6px;
  transition: all 0.3s ease;
  text-align: center;
  font-size: 16px;
}

.lyric-line.active {
  color: #00ffffc2;
  font-weight: 600;
  font-size: 18px;
  /* background: rgba(255, 221, 0, 0.1); */
  transform: scale(1.05);
}

.waveform-container {
  width: 100%;
  height: 150px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

.volume-control {
  display: flex;
  align-items: center;
  width: 150px;
}

.volume-icon {
  margin-right: 10px;
  font-size: 20px;
}

input[type="range"] {
  width: 100%;
  height: 5px;
  -webkit-appearance: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffdd00;
  cursor: pointer;
}

.time-display {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 14px;
  opacity: 0.8;
}

.lyrics-placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.6;
  text-align: center;
}
</style>
