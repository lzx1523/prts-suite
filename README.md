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
# 方式 1：直接从 GitHub 安装
dsh plugin --profile web add github:lzx1523/prts-suite
# 方式 2：克隆后本地安装
git clone https://github.com/lzx1523/prts-suite.git
dsh plugin --profile web add ./prts-suite
# 无论哪种方式，之后重启 dsh web 生效
dsh web
```

> 锁屏壁纸由 host 端路由 `/prts-assets/lockscreen.webp` 流式提供，路径在 `lib/index.js` 的
> `LOCK_FILE` 修改为你的文件（默认 `E:/1523/priestess_lockscreen.webp`，或设置环境变量 `PRTS_LOCK_FILE`）。

## 素材与重建（client.js 更新说明）

**`lib/client.js` 是构建产物**，由 `lib/client.template.js` 生成——其中的视觉素材以
base64 形式内嵌在三个占位符里：

| 占位符 | 素材 | 来源 |
|---|---|---|
| `__SHEET_B64__` | 光标手形 sprite（33 帧 × 64px，1344×64 PNG） | Montag178/arknights_cursor（Unlicense） |
| `__BOOT_SHEET_B64__` | 开机动画帧 sprite（33 帧 × 128px，6784×128 PNG） | Win7 开机动画包帧序列 |
| `__PRIESTESS_B64__` | 普瑞赛斯立绘（256×256 PNG） | priestess-chat 项目 |

**替换素材后重新生成 client.js**（PowerShell 示例）：

```powershell
$tpl = Get-Content lib/client.template.js -Raw
$tpl = $tpl.Replace('__SHEET_B64__', [Convert]::ToBase64String([IO.File]::ReadAllBytes('path/to/hand-sheet.png')))
$tpl = $tpl.Replace('__BOOT_SHEET_B64__', [Convert]::ToBase64String([IO.File]::ReadAllBytes('path/to/boot-sheet.png')))
$tpl = $tpl.Replace('__PRIESTESS_B64__', [Convert]::ToBase64String([IO.File]::ReadAllBytes('path/to/priestess.png')))
[IO.File]::WriteAllText('lib/client.js', $tpl)
```

- 素材尺寸/帧数变动时，同步修改 `client.template.js` 中对应的 CSS `background-size`、
  帧循环常量（如 1344px / 6784px / 53 帧）
- 锁屏壁纸 `priestess_lockscreen.webp` **不内嵌**（27MB 太大），由 host 路由流式加载；
  换壁纸只需替换本地文件，无需重新构建
- 修改后刷新浏览器即可生效；改 host 代码（`lib/index.js`）需重启 `dsh web`

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
lib/client.template.js # client 源码模板（素材占位符，默认构建来源）
```

## 许可与致谢

代码 MIT。素材来源见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
