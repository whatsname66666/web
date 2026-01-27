<template>
  <div class="code-editor-container">
    <div class="editor-header">
      <el-button type="primary" @click="runCode">运行</el-button>
      <el-button @click="saveCode">保存</el-button>
      <!-- 其他控制按钮 -->
    </div>
    <div class="code-tabs">
      <div
        v-for="tab in tabs"
        :key="tab.name"
        :class="['tab', { active: activeTab === tab.name }]"
        @click="switchTab(tab.name)"
      >
        {{ tab.label }}
      </div>
    </div>
    <div class="editor-wrapper">
      <div
        v-for="tab in tabs"
        :key="tab.name"
        :class="['editor-pane', { active: activeTab === tab.name }]"
        :data-tab="tab.name"
        :ref="(el: unknown) => setEditorRef(el as HTMLElement | null, tab.name)"
      ></div>
    </div>
    <div class="preview-container">
      <iframe
        ref="previewFrame"
        class="preview-frame"
        sandbox="allow-scripts allow-same-origin"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/htmlmixed/htmlmixed";
import { ElMessage } from "element-plus";

// 编辑器实例和代码数据
interface EditorInstance {
  [key: string]: CodeMirror.Editor | null;
}

const editors: EditorInstance = {};
const htmlCode = ref("");
const cssCode = ref("");
const jsCode = ref("");
const activeTab = ref("html");
const previewFrame = ref<HTMLIFrameElement | null>(null);

const tabs = [
  { name: "html", label: "HTML", mode: "htmlmixed" },
  { name: "css", label: "CSS", mode: "css" },
  { name: "js", label: "JavaScript", mode: "javascript" },
];

// 设置编辑器引用
function setEditorRef(el: HTMLElement | null, tabName: string) {
  if (el) {
    const tabName = el.getAttribute("data-tab") as string;
    if (tabName) {
      editors[tabName] = el as any;
    }
  }else{
    // delete editors?.value[tabName];
  }
}

// 初始化编辑器
onMounted(() => {
  nextTick(() => {
    tabs.forEach((tab) => {
      if (editors[tab.name]) {
        const editor = CodeMirror(editors[tab.name] as unknown, {
          mode: tab.mode,
          theme: "dracula",
          lineNumbers: true,
          autoCloseTags: true,
          value:
            tab.name === "html"
              ? htmlCode.value
              : tab.name === "css"
              ? cssCode.value
              : jsCode.value,
        });

        editor.on("change", (instance: any) => {
          if (tab.name === "html") htmlCode.value = instance.getValue();
          if (tab.name === "css") cssCode.value = instance.getValue();
          if (tab.name === "js") jsCode.value = instance.getValue();
        });
      }
    });

    runCode(); // 初始运行一次
  });
});

// 运行代码
function runCode() {
  if (!previewFrame.value) return;

  const preview =
    previewFrame.value.contentDocument ||
    previewFrame.value.contentWindow?.document;
  if (!preview) return;

  preview.open();
  preview.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>${cssCode.value}</style>
    </head>
    <body>
      ${htmlCode.value}
      <script>${jsCode.value}<\/script>
    </body>
    </html>
  `);
  preview.close();
}

// 保存代码到本地存储
function saveCode() {
  const codeData = {
    html: htmlCode.value,
    css: cssCode.value,
    js: jsCode.value,
  };
  localStorage.setItem("savedCode", JSON.stringify(codeData));
  ElMessage.success("代码已保存！");
}

// 切换标签页
function switchTab(tabName: string) {
  activeTab.value = tabName;
}

// 组件卸载前清理
onBeforeUnmount(() => {
  // 清理编辑器实例等资源
  Object.values(editors).forEach((editor) => {
    if (editor) {
      (editor as any).toTextArea();
    }
  });
});
</script>

<style scoped>
.code-editor-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.editor-header {
  padding: 10px;
  background: #252526;
  border-bottom: 1px solid #444;
}

.code-tabs {
  display: flex;
  background: #2d2d2d;
  border-bottom: 1px solid #444;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  border-right: 1px solid #444;
  color: #ccc;
}

.tab.active {
  background: #1e1e1e;
  color: #0078d4;
  font-weight: bold;
}

.editor-wrapper {
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
}

.editor-pane {
  display: none;
  width: 100%;
  height: 100%;
}

.editor-pane.active {
  display: block;
}

.preview-container {
  flex: 1;
  border-top: 1px solid #444;
}

.preview-frame {
  width: 100%;
  height: 100%;
  border: none;
  background: white;
}

:deep(.CodeMirror) {
  height: 100%;
}
</style>
