# PRTS Suite — 明日方舟 PRTS 终端主题 + 普瑞赛斯桌宠（DeepSeek Harness）

一个浏览器侧的 DeepSeek Harness 主题与桌宠插件。把 DSH Web 改造成「PRTS 信息终端」：
深青配色 / 数据流背景 / 粒子 / 开机动画 / 息屏待机 / 普瑞赛斯动态立绘桌宠（实时 DeepSeek 余额）。

## 功能一览

| 模块 | 说明 |
|---|---|
| 主题层 | PRTS 深青配色（覆盖静态蓝阶）、等宽终端字体、滚动条/选区、气泡信号线 |
| 终端背景板 | 45° 漂移数据网格、噪点、四角角标、右上 HUD 打字日志、底部编年刻度条、鼠标光晕、扫描针、点击终端响应 |
| 数据流 | 多列终端代码串（`[T+0001] NODE SYNC`、hex 流）向上流动 |
| 粒子场 | 信息之海微光，鼠标扰动推开+增亮 |
| 光标 | 低多边形白色手套（整手收拢动画、悬停黄菱形、点击波纹、文本 I-beam、lerp 跟手） |
| 启动画面 | Win7 PRTS 开机动画（帧序列 sprite）+ 版权行 |
| 背景徽章 | 左上常驻 PRTS 菱形徽（开机动画帧循环） |
| 息屏待机 | 8 分钟无操作 → 锁屏（动画壁纸 + 时钟日期），任意交互唤醒并重播开机动画 |
| 普瑞赛斯桌宠 | 悬浮立绘（呼吸浮动、拖拽）、台词气泡（v2 预言家版）、**实时 DeepSeek 余额**（60s 刷新）、记住生日（当天生日台词）、唤醒联动台词 |
| 设置页 | 设置 → PRTS 终端：粒子场/终端网格/扫描线/数据流/终端徽章/余额桌宠/启动序列/息屏待机 8 个开关 |
| 自愈 | 被清理的图层 400ms 内自动重建 |

## 安装

```bash
# 1. 克隆后，复制到 profile 依赖并挂载
git clone <this-repo>
dsh plugin --profile web add ./dsh-client-prts-suite
# 2. 重启 dsh web
dsh web
# 3. 打开 http://127.0.0.1:3080
```

> 素材（手形动画、开机动画帧、立绘）需要通过插件内的本地路径加载；锁屏壁纸由
> host 端路由 `/prts-assets/lockscreen.webp` 流式提供，路径在 `lib/index.js` 的
> `LOCK_FILE` 修改为你的文件（或设置环境变量 `PRTS_LOCK_FILE`）。

## 桌宠余额

- 首次点击立绘 → 输入 DeepSeek API Key（`sk-...`，保存在浏览器 localStorage）
- 余额来自官方接口 `https://api.deepseek.com/user/balance`（只读、免费）
- 点击桌宠下方「设置我的生日 🎂」→ 生日当天触发专属台词

## 目录

```
package.json           # dsh 插件声明（bundle patch + client entry）
cordis.patch.yml       # 组合 patch（insert dsh-prts-suite）
lib/index.js           # host：锁屏静态资源路由（/prts-assets/lockscreen.webp）
lib/client.js          # client bundle（含全部内嵌素材 base64）
lib/client.template.js # client 源码模板（素材占位符）
```

## 许可与致谢

代码 MIT。素材来源见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
