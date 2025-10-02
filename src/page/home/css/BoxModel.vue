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
// const lrcLyrics = `
// [ml:1.0]
// [ti:我曾在... (I was There)]
// [ar:无期迷途/Elena Borroni]
// [al:残锋]
// [by:]
// [offset:0]
// [00:00.00]我曾在... (I was There) - 无期迷途/Elena Borroni
// [00:00.38]TME享有本翻译作品的著作权
// [00:00.38]词：Michele Bettali/Gio Vincenzi
// [00:00.55]
// [00:00.55]曲：Michele Bettali/Gio Vincenzi
// [00:00.71]
// [00:00.71]编曲：Michele Bettali/Gio Vincenzi
// [00:00.90]
// [00:00.90]混音/母带：Michele Bettali/翊尧
// [00:01.18]
// [00:01.18]I was there when the sun was going down
// [00:08.55]我曾茫然地看着日暮西沉
// [00:08.55]Nothing left to be held in my hand
// [00:16.00]两手空空 无所依傍
// [00:16.00]I was there when my hope lost its crown
// [00:23.29]我曾亲眼目睹 我至高无上的希望崩塌陨落
// [00:23.29]When it fell as if made of sand
// [00:32.10]如同流沙般轰然坠地
// [00:32.10]I stared at your photos when I felt alone
// [00:35.66]当孤独袭上心头 我总会凝视着你的留影
// [00:35.66]I sat in that corner waiting for a call
// [00:39.31]坐在无人知晓的角落里 沉默地守着电话
// [00:39.31]I danced with your shadow for so many nights
// [00:43.04]多少个无眠的夜晚 我与你的幽影翩然而舞
// [00:43.04]I dreamed of our future till the morning lights
// [00:46.71]直到晨光破晓 依然沉浸在我们的海市蜃楼
// [00:46.71]Now mem'ries are fading into something real
// [00:50.41]如今飘渺的回忆化为残酷而真切的现实
// [00:50.41]Like salt on a wound that's never gonna heal
// [00:54.46]如同那道永不愈合的伤口 撒上盐粒般刺痛
// [00:54.46]I'm here in a place that should have been our home
// [00:57.85]我留在这个本该为我们遮风避雨的地方
// [00:57.85]And I'm sinking like a stone
// [01:00.28]我如同一枚顽石 慢慢下坠沉没
// [01:00.28]I was there when the sun was going down
// [01:07.48]我曾茫然地看着日暮西沉
// [01:07.48]Nothing left to be held in my hand
// [01:14.97]两手空空 无所依傍
// [01:14.97]I was there when my hope lost its crown
// [01:22.34]我曾亲眼目睹 我至高无上的希望崩塌陨落
// [01:22.34]When it fell as if made of sand
// [01:45.89]如同流沙般轰然坠地
// [01:45.89]I can feel you even though you're gone
// [01:49.41]即便你已飘然远去 我也能感受到你的存在
// [01:49.41]I can feel you deep inside my bones
// [01:53.25]在我奔涌的骨血里 你的影子依然挥之不去
// [01:53.25]Your scent still remaining on all of my clothes
// [01:56.89]我的衣袂之间 依然残留着你的气息
// [01:56.89]Plays tricks with my mind and I feel you close
// [02:00.75]勾起我的思念 让我与你相依
// [02:00.75]I cry every morning in an empty bed
// [02:04.23]在空空荡荡的床上 我用泪水迎接每道晨曦
// [02:04.23]You dwell in my heart can't get you out of my head
// [02:08.42]你烙印在我的心底 挥之不去
// [02:08.42]Lost in a place that has become unknown
// [02:11.78]我迷失在这片迷途之中
// [02:11.78]I'm sinking like a stone
// [02:17.87]我如同一枚顽石 慢慢下坠沉没
// [02:17.87]I was there when the sun was going down
// [02:25.09]我曾茫然地看着日暮西沉
// [02:25.09]Nothing left to be held in my hand
// [02:32.48]两手空空 无所依傍
// [02:32.48]I was there when my hope lost its crown
// [02:39.83]我曾亲眼目睹 我至高无上的希望崩塌陨落
// [02:39.83]When it fell as if made of sand
// [02:47.24]如同流沙般轰然坠地
// [02:47.24]I was there when the sun was going down
// [02:54.53]我曾茫然地看着日暮西沉
// [02:54.53]Nothing left to be held in my hand
// [03:02.05]两手空空 无所依傍
// [03:02.05]I was there when my hope lost its crown
// [03:09.32]我曾亲眼目睹 我至高无上的希望崩塌陨落
// [03:09.32]When it fell as if made of sand
// [03:14.032]如同流沙般轰然坠地
// [03:14.032]
// `.trim();
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
</template>

<style scoped>
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
