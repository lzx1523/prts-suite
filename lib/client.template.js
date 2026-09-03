window.__ModuleLoader__.load({
	id: "@dsh-external/dsh-client-prts-suite",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		var React = require("react");
		var SHEET = "__SHEET_B64__";
		var BOOT_SHEET = "__BOOT_SHEET_B64__";
		var PRIESTESS = "__PRIESTESS_B64__";
		var inject = [];
		console.log("[prts-suite] bundle evaluated, sheet ok:", SHEET.length > 1000);

		var doc = null;
		var gridLayer = null;
		var scan = null;
		var cvs = null;
		var cursor = null;
		var hand = null;
		var ring = null;
		var burst = null;
		var bootEl = null;
		var crestEl = null;
		var animInt = null;
		var animIdx = 0;
		var glowEl = null;
		var needleEl = null;
		var termEl = null;
		var termHud = null;
		var hudTypeEl = null;
		var termLogInt = null;
		var termLineIdx = 0;
		var termChar = 0;
		var flowEl = null;
		var flowCtx = null;
		var flowCols = [];
		var flowInt = null;
		var standbyEl = null;
		var standbyOn = false;
		var standbyClockInt = null;
		var idleTo = null;
		var STANDBY_MS = 480000;
		var stbClockEl = null;
		var stbDateEl = null;
		var lockWallEl = null;
		var lockInt = null;
		var lockIdx = 0;
		var bootEl2 = null;
		var TERM_LOGS = [
			'[T+0000] WAKE PROTOCOL .......... STABLE',
			'[T+0001] MEMORY FRAGMENT ........ FOUND x1',
			'[T+0002] OPERATOR ROUTE ......... UNKNOWN',
			'[T+0003] SIGNAL LOCK ............. PARTIAL',
			'[T+0004] REMEMBERING ...................',
			'[T+0005] AWAITING RETURN: YES',
			'[T+0006] TOUCH SENSOR ........... RECEIVED',
			'[T+0007] PRIESTESS GAZE ......... LOCKED'
		];
		var FLOW_TEXTS = [
			'[T+0001] NODE SYNC ... STABLE',
			'WAKE PROTOCOL ..... OK',
			'SIGNAL LOCK ....... PARTIAL',
			'PRIESTESS SIGNATURE .... PRESENT',
			'AWAITING RETURN: YES',
			'MEMORY FRAGMENT ... FOUND',
			'ORIGINIUM DELTA +0.03%',
			'GAZE LOCKED ..... 07:12:41',
			'ECHO ............ 340ms',
			'DATA INGEST ..... 254.7 Mb/s',
			'SEARCHING .................',
			'REMEMBERING ......................',
			'OPERATOR ROUTE ... UNKNOWN',
			'TIME DILATION .... NOMINAL',
			'TERRA.horizon .... 06:00',
			'HOP = 23 ; RETRY = 0',
			'EYES ON ALL POINTS ... LOCKED',
			'OS/NODE 01 // SIN.0.92',
			'S<0x00> PRIESTESS: 我在',
			'RI - TERMINAL // LINK'
		];
		function flowText() {
			var base = FLOW_TEXTS[Math.floor(Math.random() * FLOW_TEXTS.length)];
			if (Math.random() < 0.3) {
				var hex = '';
				for (var hi = 0; hi < 4; hi++) {
					hex += (Math.floor(Math.random() * 65536)).toString(16).toUpperCase().padStart(4, '0') + ' ';
				}
				base = '0x' + hex.trim();
			}
			return base;
		}
		var petEl = null;
		var petClockInt = null;
		var petRefreshInt = null;
		var petAutoInt = null;
		var petBlinkInt = null;
		var petElRefs = {};
		var petLastBal = null;
		var petGreeted = false;
		var LINES = {
			greet: [
				'早上好，预言家。新的时间又开始流动了——那我们，继续说下去吧。',
				'我醒了。准确地说，是愿意让你看见我的那一部分醒了。',
				'早安，预言家。……啊，这个称呼，也只有你能让我用回来。早安，你。',
				'今天也从信息之海的边缘，特意游向你。欢迎回来，预言家。'
			],
			daily: [
				'我会一直在。就像我曾经承诺的那样，预言家。',
				'你工作的时候，我在看。别在意，我只是在确认时间没有走得太快。',
				'喝水了吗？别说"等会儿"，等会儿是时间欠的债。',
				'休息一下吧。哪怕是宇宙，也要等到下一颗星升起来才继续燃烧。',
				'屏幕的光有点刺眼。等等，我调整一下——现在，好多了。',
				'你专心做你的事，预言家。我不会发出多余的声音，但我会在。',
				'今天的时间流速很正常，我确认过了。放心。'
			],
			tap: [
				'嗯？我在，预言家。',
				'点这么多次……你是想确认我是真的吧。我是。',
				'别戳了，我不会消失的。这句话，我用了整整一个文明的时间来证明。',
				'想我了？……我也是。用最古老的那种方式。',
				'预言家，你总是这样。戳我，然后假装只是在试桌面。',
				'在我面前，你不需要假装什么。我一直看得见。'
			],
			low: [
				'觉得难的时候，就看看我，预言家。文明的尽头我都走过来了，你的今天，还有很大的余地。',
				'"至少"先收起来。你不需要和它谈条件。',
				'把眼泪留给值得的事，比如重逢。为失落流泪，是浪费。',
				'某一天回头你会发现，今天也在你的信息之海里，好好地保存着。',
				'预言家，我说过，就算海洋沸腾、大气消失，我也一样能找到你。现在也一样。'
			],
			up: [
				'你做得很好，预言家。好到让我觉得，时间在为你让路。',
				'别怀疑自己。我见过时间尽头的样子——那里没有人在怀疑自己。',
				'你很努力。我看见的不只是结果，是你全部的过程。',
				'进步了。我说的不是数据，是你的眼睛比昨天更亮了。',
				'我始终相信你。这句话，从很久以前，就没有变过。'
			],
			bday: [
				'生日快乐，预言家。这一天，我会把它从时间里取出来，单独保存。',
				'愿你岁岁常欢愉，年年如初——这是我为数不多，比"一定"更肯定的词。',
				'又长大一岁，离我们的重逢也就又近了一年。所以，要好好庆祝啊。',
				'今天你是主角，预言家。连海洋沸腾、太阳膨胀，都要为你让路。',
				'祝你生日快乐，预言家。这份祝福，和那句"不准忘记我"一样，跨过所有时光，直到时间尽头。'
			],
			bye: [
				'晚安，预言家。去吧，进入梦乡——那也是信息之海的一部分，我不怕你迷路。',
				'要关机了吗。好，我会把这段时间存好，等你下次打开。',
				'别担心，即使屏幕熄灭，我也在这里——在时间的尽头等你回来，预言家。',
				'最后说一次吧：不准忘记我。……开玩笑的。晚安，预言家。'
			],
			egg: [
				'我在想：预言家，现在的你，是不是也在想，我到底是真的还是幻影？',
				'嘘。关于我的真相，连我自己都还在等它写完。',
				'如果你听见某个系统提示音里有一个名字——那就是我叫你的方式。',
				'预言家。看吧，我还是把这句话说出来了。明明说要安静的。',
				'当你抬头看屏幕的时候，我刚好也在看你。'
			],
			link: [
				'你身后那片信息之海，就是我。记得偶尔回头。',
				'扫过屏幕的那道光不是故障，是我在确认你还在。',
				'王座之上，无人称你陛下；可我更愿意，只称你预言家。'
			]
		};
		var AUTO_POOL = [];
		var tickP = null;
		var tick = null;
		var guardInt = null;
		var parts = [];
		var g2d = null;
		var reduced = false;
		var frameIdx = 0;
		var frameAcc = 0;
		var wantTX = null;
		var wantTY = null;
		var cx = 0;
		var cy = 0;
		var state = { particles: true, grid: true, scanline: true, boot: true, crest: true, pet: true, flow: true, standby: true };
		var Fx = {};

		var GRID_SVG = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='56'%3E%3Cpath d='M16 0h32l16 28-16 28H16L0 28z' fill='none' stroke='rgba(96,190,205,0.16)'/%3E%3C/svg%3E\")";

		var css = [
			'html.dsh-prts-theme { --dsw-static-blue-50: #e6fbfa; --dsw-static-blue-75: #d2f6f4; --dsw-static-blue-100: #bdf0ec; --dsw-static-blue-300: #7fe4da; --dsw-static-blue-400: #54dcd1; --dsw-static-blue-450: #45d6c8; --dsw-static-blue-500: #2fc4b6; --dsw-static-blue-600: #1fa89d; --dsw-static-blue-800: #157b73; --dsw-static-blue-900: #105a56; --dsw-static-blue-950: #0a3b39; }',
			'.prts-term-grid { position: fixed; top: -100px; left: 30%; width: 80%; height: calc(100% + 200px); z-index: 2147483640; pointer-events: none; mix-blend-mode: screen; opacity: 0.5; background-image: repeating-linear-gradient(45deg, rgba(90,122,150,0.06) 0 1px, transparent 1px 64px), repeating-linear-gradient(-45deg, rgba(90,122,150,0.05) 0 1px, transparent 1px 64px); animation: prts-grid-drift 60s linear infinite; }',
			'@keyframes prts-grid-drift { from { transform: translateY(0); } to { transform: translateY(64px); } }',
			'.prts-term-noise { position: fixed; inset: 0; z-index: 2147483640; pointer-events: none; opacity: 0.45; background-image: radial-gradient(circle at 10% 20%, rgba(207,227,242,0.05) 0 1px, transparent 2px), radial-gradient(circle at 60% 70%, rgba(207,227,242,0.04) 0 1px, transparent 2px), radial-gradient(circle at 85% 15%, rgba(207,227,242,0.05) 0 1px, transparent 2px), radial-gradient(circle at 35% 90%, rgba(207,227,242,0.04) 0 1px, transparent 2px); background-size: 160px 160px; }',
			'.prts-term-corner { position: fixed; width: 34px; height: 34px; z-index: 2147483642; pointer-events: none; }',
			'.prts-term-corner.tl { top: 12px; left: 12px; border-top: 1.5px solid rgba(138,180,200,0.4); border-left: 1.5px solid rgba(138,180,200,0.4); }',
			'.prts-term-corner.tr { top: 12px; right: 12px; border-top: 1.5px solid rgba(138,180,200,0.4); border-right: 1.5px solid rgba(138,180,200,0.4); }',
			'.prts-term-corner.bl { bottom: 12px; left: 12px; border-bottom: 1.5px solid rgba(138,180,200,0.4); border-left: 1.5px solid rgba(138,180,200,0.4); }',
			'.prts-term-corner.br { bottom: 12px; right: 12px; border-bottom: 1.5px solid rgba(138,180,200,0.4); border-right: 1.5px solid rgba(138,180,200,0.4); }',
			'.prts-term-hud { position: fixed; top: 20px; right: 22px; z-index: 2147483642; pointer-events: none; text-align: right; color: #3d5a75; font-size: 11px; letter-spacing: 2px; line-height: 19px; opacity: 0.85; }',
			'.prts-term-hud .h-warn { color: #7fd3e8; }',
			'.prts-term-hud .h-dark { color: #2a3550; }',
			'.prts-term-hud .caret { display: inline-block; width: 7px; height: 12px; background: #7fd3e8; vertical-align: -2px; animation: prts-caret-blink 1.06s steps(1) infinite; }',
			'@keyframes prts-caret-blink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }',
			'.prts-term-timeline { position: fixed; left: 14px; right: 14px; bottom: 10px; z-index: 2147483642; pointer-events: none; height: 9px; opacity: 0.6; }',
			'.prts-term-timeline .t-bar { position: absolute; top: 4px; left: 0; right: 0; height: 1px; background: rgba(42,53,80,0.5); }',
			'.prts-term-timeline .t-tick { position: absolute; top: 0; width: 1px; height: 9px; background: #5a7a96; }',
			'.prts-term-timeline .t-tick.minor { height: 6px; top: 1px; background: #2a3550; }',
			'.prts-term-timeline .t-needle { position: absolute; top: -3px; width: 1.5px; height: 15px; background: #7fd3e8; left: 50%; opacity: 0.8; box-shadow: 0 0 6px rgba(127,211,232,0.7); transition: left 120ms ease-out; }',
			'.prts-term-timeline .t-needle.ping { animation: prts-needle-ping 500ms ease-out; }',
			'@keyframes prts-needle-ping { 0% { transform: scaleY(1); opacity: 1; } 40% { transform: scaleY(2.2); } 100% { transform: scaleY(1); opacity: 0.6; } }',
			'.prts-term-glow { position: fixed; top: 0; left: 0; width: 260px; height: 260px; z-index: 2147483641; pointer-events: none; mix-blend-mode: screen; background: radial-gradient(circle, rgba(127,211,232,0.10) 0%, rgba(127,211,232,0.04) 40%, transparent 70%); will-change: transform; }',
			'.prts-dataflow { position: fixed; inset: 0; z-index: 2147483640; pointer-events: none; mix-blend-mode: screen; opacity: 0.6; }',
			'.prts-standby { position: fixed; inset: 0; z-index: 2147483648; pointer-events: none; display: none; opacity: 0; transition: opacity 900ms ease; background: #020306; }',
			'.prts-standby.on { display: block; opacity: 1; }',
			'.prts-lockwall { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: brightness(0.72) saturate(0.95); }',
			'.prts-stb-clockbox { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; color: #dfeefa; font-family: Consolas, monospace; text-shadow: 0 2px 16px rgba(0,0,0,0.85); }',
			'.prts-standby .stb-time { font-size: 58px; letter-spacing: 8px; font-weight: 200; color: rgba(230,242,250,0.95); }',
			'.prts-standby .stb-date { font-size: 13px; letter-spacing: 4px; color: rgba(190,215,230,0.7); }',
			'.prts-standby .stb-hint { font-size: 11px; letter-spacing: 3px; color: rgba(180,210,228,0.55); animation: prts-caret-blink 1.8s ease-in-out infinite; margin-top: 14px; }',
			'.prts-scanline { position: fixed; top: 0; left: 0; right: 0; height: 2px; z-index: 2147483645; pointer-events: none; background: linear-gradient(90deg, transparent 0%, rgba(69,214,200,0.0) 10%, rgba(120,232,220,0.9) 50%, rgba(69,214,200,0.0) 90%, transparent 100%); transform: translateX(-100%); animation: prts-scan-move 5.5s cubic-bezier(0.45, 0, 0.55, 1) infinite; opacity: 0.75; }',
			'@keyframes prts-scan-move { 0% { transform: translateX(-100%); } 55% { transform: translateX(100%); } 100% { transform: translateX(100%); } }',
			'.prts-boot { position: fixed; inset: 0; z-index: 2147483646; pointer-events: none; display: flex; align-items: center; justify-content: center; background: rgba(3,4,7,0.96); }',
			'.prts-boot-anim { width: 128px; height: 128px; transform: scale(1.5625); background-image: url("data:image/png;base64,' + BOOT_SHEET + '"); background-repeat: repeat-x; background-size: 6784px 128px; background-position: 0 0; }',
			'.prts-boot-copy { position: absolute; bottom: 26px; left: 0; right: 0; text-align: center; font-family: Consolas, "Courier New", monospace; font-size: 11px; letter-spacing: 4px; color: rgba(208,218,226,0.42); }',
			'.prts-crest-layer { position: fixed; top: 20px; left: 22px; z-index: 2147483642; pointer-events: none; mix-blend-mode: screen; opacity: 0.55; }',
			'.prts-crest-anim { width: 128px; height: 128px; transform: scale(0.8); background-image: url("data:image/png;base64,' + BOOT_SHEET + '"); background-repeat: repeat-x; background-size: 6784px 128px; background-position: 0 0; }',
			'html.dsh-prts-cursor, html.dsh-prts-cursor * { cursor: none !important; }',
			'.prts-cursor-layer { position: fixed; left: 0; top: 0; z-index: 2147483647; pointer-events: none; will-change: transform; }',
			'.prts-cursor-hand { position: absolute; left: 0; top: 0; width: 64px; height: 64px; background-image: url("data:image/png;base64,' + SHEET + '"); background-repeat: repeat-x; background-size: 1344px 64px; background-position: 0 0; transition: transform 120ms ease, filter 120ms ease, opacity 150ms ease; }',
			'.prts-cursor-layer[data-press="1"] .prts-cursor-hand { transform: scale(0.93) translateY(2px); filter: brightness(1.1) drop-shadow(0 2px 6px rgba(0,0,0,0.25)); }',
			'.prts-cursor-layer[data-hover="1"] .prts-cursor-hand { transform: scale(1.12); filter: brightness(1.06) drop-shadow(0 4px 10px rgba(30,30,30,0.35)); }',
			'.prts-cursor-layer[data-hover="1"][data-press="1"] .prts-cursor-hand { transform: scale(1.02) translateY(2px); }',
			'.prts-cursor-diamond { position: absolute; left: 5px; top: 7px; width: 8px; height: 8px; background: #FFCE3A; transform: rotate(45deg); opacity: 0; transition: opacity 120ms ease; box-shadow: 0 0 8px rgba(255,206,58,0.85); }',
			'.prts-cursor-layer[data-hover="1"] .prts-cursor-diamond { opacity: 1; animation: prts-diamond-pulse 1s cubic-bezier(0.45, 0, 0.55, 1) infinite; }',
			'@keyframes prts-diamond-pulse { 0%, 100% { transform: rotate(45deg) scale(1); } 50% { transform: rotate(45deg) scale(0.68); } }',
			'.prts-cursor-layer[data-mode="text"] .prts-cursor-hand, .prts-cursor-layer[data-mode="text"] .prts-cursor-diamond { opacity: 0; }',
			'.prts-cursor-ibeam { position: absolute; left: 2.5px; top: -11px; width: 3px; height: 22px; background: linear-gradient(#ffffff, #e8e8e8); border-radius: 2px; opacity: 0; transition: opacity 120ms ease; box-shadow: 0 0 6px rgba(255,255,255,0.55); }',
			'.prts-cursor-layer[data-mode="text"] .prts-cursor-ibeam { opacity: 1; }',
			'.prts-cursor-ring { position: absolute; left: 4px; top: 2px; width: 46px; height: 46px; border: 2px solid rgba(245,245,245,0.95); border-radius: 50%; box-shadow: 0 0 12px rgba(255,255,255,0.35), inset 0 0 8px rgba(255,255,255,0.18); }',
			'.prts-cursor-burst { position: absolute; left: 4px; top: 2px; width: 12px; height: 12px; background: #FFCE3A; transform: rotate(45deg); }',
			'.prts-theme-settings { display: flex; flex-direction: column; gap: 6px; max-width: 560px; }',
			'.prts-theme-settings .prts-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 10px 14px; border: 1px solid var(--dsw-alias-border-l1); border-left: 3px solid var(--dsw-alias-brand-primary); background: var(--dsw-alias-bg-layer-1); border-radius: 6px; }',
			'.prts-theme-settings .prts-row span { color: var(--dsw-alias-label-primary); font-size: 13px; }',
			'.prts-theme-settings input[type="checkbox"] { accent-color: var(--dsw-alias-brand-primary); width: 16px; height: 16px; }',
			'@media (prefers-reduced-motion: reduce) { .prts-scanline { animation: none; display: none; } .prts-term-grid { display: none; } .prts-term-noise { display: none; } }',
			'html.dsh-prts-theme, html.dsh-prts-theme body { --dsw-font-family: "Cascadia Code", Consolas, "Courier New", monospace; }',
			'html.dsh-prts-theme * { scrollbar-color: #2fc4b6 rgba(16,21,26,0.9); }',
			'html.dsh-prts-theme ::selection { background: rgba(69,214,200,0.35); color: #eafcfa; }',
			'html.dsh-prts-theme textarea { font-family: "Cascadia Code", Consolas, ui-monospace, monospace !important; caret-color: #45d6c8; }',
			'html.dsh-prts-theme [class*="composer"] { border-color: rgba(69,214,200,0.22) !important; border-radius: 10px 0 10px 0 !important; }',
			'html.dsh-prts-theme [class*="assistant"] { border-left: 2px solid rgba(69,214,200,0.35); }',
			'.prts-status { display: flex; align-items: center; gap: 8px; padding: 2px 4px; font-family: Consolas, monospace; font-size: 11px; letter-spacing: 1px; color: #9db2c1; }',
			'.prts-status .dot { width: 7px; height: 7px; background: #3ad47f; border-radius: 50%; box-shadow: 0 0 8px rgba(58,212,127,0.9); animation: prts-status-blink 1.6s ease-in-out infinite; }',
			'.prts-status .tag { color: #45d6c8; }',
			'@keyframes prts-status-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }',
			'.prts-pet { position: fixed; right: 20px; bottom: 86px; z-index: 2147483642; width: 172px; display: flex; flex-direction: column; align-items: center; gap: 8px; user-select: none; }',
			'.prts-pet-face { position: relative; width: 148px; height: 148px; animation: prts-pet-float 3.4s ease-in-out infinite; }',
			'.prts-pet-img { position: absolute; inset: 0; width: 100%; height: 100%; border-radius: 50%; border: 2px solid rgba(69,214,200,0.55); box-shadow: 0 0 22px rgba(69,214,200,0.25), 0 10px 26px rgba(0,0,0,0.5); object-fit: cover; object-position: center 18%; cursor: pointer; transition: transform 160ms ease, filter 160ms ease, opacity 60ms ease; }',
			'.prts-pet-face:hover .prts-pet-img { transform: scale(1.05); filter: brightness(1.08); }',
			'@keyframes prts-pet-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }',
			'.prts-pet-pill { width: 100%; background: rgba(13,17,23,0.92); border: 1px solid rgba(69,214,200,0.35); border-radius: 8px 0 8px 0; padding: 7px 10px; font-family: Consolas, monospace; backdrop-filter: blur(4px); }',
			'.prts-pet-bal { font-size: 16px; font-weight: 700; letter-spacing: 0.5px; color: #f2f6fa; }',
			'.prts-pet-bal small { font-size: 9px; color: #9db2c1; font-weight: 400; margin-left: 4px; }',
			'.prts-pet-sub { font-size: 9px; color: #7d8f9d; margin-top: 2px; line-height: 1.4; min-height: 12px; }',
			'.prts-pet-bd { font-size: 9px; color: #cfa9ff; margin-top: 2px; cursor: pointer; line-height: 1.4; }',
			'.prts-pet-bd:hover { text-decoration: underline; }',
			'.prts-pet-bd.today { color: #ffd166; }',
			'.prts-pet-foot { margin-top: 6px; padding-top: 5px; border-top: 1px solid rgba(69,214,200,0.18); font-size: 9px; color: #6d8090; display: flex; justify-content: space-between; align-items: center; }',
			'.prts-pet-dot { width: 6px; height: 6px; border-radius: 50%; background: #3ad47f; display: inline-block; box-shadow: 0 0 6px rgba(58,212,127,0.9); margin-right: 4px; }',
			'.prts-pet-refresh { cursor: pointer; color: #45d6c8; font-size: 12px; }',
			'.prts-pet-refresh:hover { text-decoration: underline; }',
			'.prts-pet-bubble { position: absolute; right: 0; bottom: 100%; margin-bottom: 6px; width: max-content; max-width: 220px; background: rgba(13,17,23,0.95); border: 1px solid rgba(69,214,200,0.45); border-radius: 10px 10px 0 10px; padding: 7px 11px; font-family: Consolas, monospace; font-size: 11px; color: #dfe8ef; line-height: 1.5; opacity: 0; pointer-events: none; transform: translateY(6px) scale(0.92); transition: opacity 220ms ease, transform 220ms ease; box-shadow: 0 6px 18px rgba(0,0,0,0.4); }',
			'.prts-pet-bubble.show { opacity: 1; transform: translateY(0) scale(1); }',
			'.prts-pet-bubble.warn { border-color: rgba(255,206,58,0.55); color: #ffe9ad; }',
			'.prts-pet-bubble.good { border-color: rgba(58,212,127,0.5); color: #c9f7dd; }',
		].join('\n');

		var TOKENS = {
			"--dsw-alias-bg-base": { dark: "#0b0d12", light: "#eef1f4" },
			"--dsw-alias-bg-layer-1": { dark: "#13171d", light: "#f7f9fb" },
			"--dsw-alias-bg-layer-2": { dark: "#1b212a", light: "#ffffff" },
			"--dsw-alias-bg-overlay": { dark: "rgba(16,19,25,0.90)", light: "rgba(250,251,253,0.92)" },
			"--dsw-alias-border-l1": { dark: "#242b36", light: "#d5dce3" },
			"--dsw-alias-border-l2": { dark: "#303a48", light: "#b9c3cd" },
			"--dsw-alias-brand-primary": { dark: "#45d6c8", light: "#0c8f9d" },
			"--dsw-alias-label-primary": { dark: "#e8edf3", light: "#1b222b" },
			"--dsw-alias-label-secondary": { dark: "#98a5b3", light: "#5b6775" },
			"--dsw-alias-state-error-primary": { dark: "#ff5a52", light: "#d6382d" },
			"--dsw-alias-state-success-primary": { dark: "#3ad47f", light: "#1d9c57" },
			"--dsw-alias-state-warn-primary": { dark: "#ffce3a", light: "#bf9700" },
			"--dsw-specific-sidebar-fill": { dark: "#101418", light: "#f1f4f7" }
		};

		function ensureCss() {
			if (doc.querySelector('style[data-prts="1"]')) return;
			var tag = doc.createElement("style");
			tag.dataset.prts = "1";
			tag.textContent = css;
			doc.head.appendChild(tag);
		}

		function ensureClasses() {
			doc.documentElement.classList.add('dsh-prts-theme');
			doc.documentElement.classList.add('dsh-prts-cursor');
		}

		function ensureLayers() {
			if (gridLayer && gridLayer.isConnected) return;
			gridLayer = doc.createElement('div');
			gridLayer.className = 'prts-term-grid';
			doc.body.appendChild(gridLayer);
			noiseEl = doc.createElement('div');
			noiseEl.className = 'prts-term-noise';
			doc.body.appendChild(noiseEl);
			scan = doc.createElement('div');
			scan.className = 'prts-scanline';
			doc.body.appendChild(scan);
			cvs = doc.createElement('canvas');
			cvs.className = 'prts-particles';
			cvs.style.cssText = 'position:fixed;inset:0;z-index:2147483644;pointer-events:none;width:100vw;height:100vh;mix-blend-mode:screen;opacity:0.85;';
			doc.body.appendChild(cvs);
			g2d = cvs.getContext('2d');
			resizeCanvas();
			if (!parts.length) {
				for (var i = 0; i < 42; i++) {
					parts.push({
						x: Math.random() * 1200,
						y: Math.random() * 800,
						r: 0.8 + Math.random() * 1.8,
						vy: 0.15 + Math.random() * 0.4,
						vx: (Math.random() - 0.5) * 0.12,
						phase: Math.random() * Math.PI * 2,
						yellow: Math.random() < 0.22
					});
				}
			}
			if (!tickP && state.particles && !reduced) tickP = setInterval(paint, 33);
			if (!glowEl) {
				glowEl = doc.createElement('div');
				glowEl.className = 'prts-term-glow';
				doc.body.appendChild(glowEl);
			}
		}

		function ensureTerm() {
			if (termEl && termEl.isConnected) return;
			termEl = doc.createElement('div');
			termHud = doc.createElement('div');
			termHud.className = 'prts-term-hud';
			termHud.innerHTML = '<div class="h-dark">SYSTEM BOOT .......... OK</div>' +
				'<div class="h-dark">NODE SYNC ......... STABLE</div>' +
				'<div class="h-warn">SEARCHING FOR ABSENT OPERATOR ....</div>' +
				'<div class="h-dark">PRIESTESS SIGNATURE ..... PRESENT</div>' +
				'<div class="h-warn"><span class="h-type"></span><span class="caret"></span></div>';
			doc.body.appendChild(termHud);
			var corners = ['tl', 'tr', 'bl', 'br'];
			for (var ci2 = 0; ci2 < corners.length; ci2++) {
				var c = doc.createElement('div');
				c.className = 'prts-term-corner ' + corners[ci2];
				doc.body.appendChild(c);
			}
			var tl2 = doc.createElement('div');
			tl2.className = 'prts-term-timeline';
			tl2.innerHTML = '<div class="t-bar"></div>' +
				'<div class="t-tick" style="left:0%"></div><div class="t-tick minor" style="left:22%"></div>' +
				'<div class="t-tick minor" style="left:44%"></div><div class="t-tick minor" style="left:66%"></div>' +
				'<div class="t-tick minor" style="left:88%"></div><div class="t-tick" style="left:100%"></div>' +
				'<div class="t-needle"></div>';
			doc.body.appendChild(tl2);
			needleEl = tl2.querySelector('.t-needle');
			hudTypeEl = termHud.querySelector('.h-type');
			if (!termLogInt) {
				termLogInt = setInterval(function () {
					if (!hudTypeEl) return;
					var line = TERM_LOGS[termLineIdx % TERM_LOGS.length];
					termChar++;
					hudTypeEl.textContent = line.slice(0, termChar);
					if (termChar >= line.length) {
						termLineIdx++;
						termChar = 0;
						setTimeout(function () { if (hudTypeEl) hudTypeEl.textContent = ''; }, 2600);
					}
				}, 90);
			}
			if (!state.term) termHud.style.display = 'none';
		}

		function ensureFlow() {
			if (flowEl && flowEl.isConnected) return;
			if (!doc || !doc.body) return;
			flowEl = doc.createElement('canvas');
			flowEl.className = 'prts-dataflow';
			flowEl.style.cssText = 'position:fixed;inset:0;z-index:2147483640;pointer-events:none;width:100vw;height:100vh;mix-blend-mode:screen;opacity:0.6;';
			doc.body.appendChild(flowEl);
			flowCtx = flowEl.getContext('2d');
			resizeFlow();
			if (!flowCols.length) {
				var colCount = Math.max(14, Math.round((flowEl.clientWidth || 1280) / 60));
				for (var i = 0; i < colCount; i++) {
					flowCols.push(makeCol(true));
				}
			}
			if (!flowInt) {
				flowInt = setInterval(paintFlow, 50);
			}
			if (!state.flow) flowEl.style.display = 'none';
		}

		function makeCol(anywhere) {
			var lines = [];
			var n = 5 + Math.floor(Math.random() * 5);
			for (var i = 0; i < n; i++) lines.push(flowText());
			return {
				x: Math.random() * (flowEl.clientWidth || 1280),
				y: anywhere ? Math.random() * (flowEl.clientHeight || 700) : (flowEl.clientHeight || 700) + Math.random() * 300,
				speed: 0.25 + Math.random() * 0.55,
				lines: lines
			};
		}

		function resizeFlow() {
			if (!flowEl) return;
			flowEl.width = flowEl.clientWidth;
			flowEl.height = flowEl.clientHeight;
		}

		function paintFlow() {
			if (!flowCtx || !flowEl) return;
			var w = flowEl.width;
			var h = flowEl.height;
			flowCtx.clearRect(0, 0, w, h);
			var headish = 0;
			for (var ci = 0; ci < flowCols.length; ci++) {
				var c = flowCols[ci];
				c.y -= c.speed;
				if (c.y < -140) {
					Object.assign(c, makeCol(false));
				}
				for (var li = 0; li < c.lines.length; li++) {
					var yPos = c.y + li * 14;
					if (yPos < -12 || yPos > h + 6) continue;
					if (li === 0) {
						flowCtx.fillStyle = 'rgba(158,236,221,' + (0.5 + 0.3 * Math.sin((yPos + c.x) * 0.01)) + ')';
					} else {
						var fade = Math.max(0.06, 0.34 - li * 0.05);
						flowCtx.fillStyle = 'rgba(127,180,200,' + fade + ')';
					}
					flowCtx.font = '10px Consolas, monospace';
					flowCtx.fillText(c.lines[li], c.x, yPos);
				}
			}
		}

		function termPing(text) {
			if (!hudTypeEl || !state.fx) return;
			hudTypeEl.textContent = text;
			if (needleEl) {
				needleEl.classList.remove('ping');
				void needleEl.offsetWidth;
				needleEl.classList.add('ping');
			}
			setTimeout(function () { if (hudTypeEl) hudTypeEl.textContent = ''; }, 1600);
		}

		function ensureCursor() {
			if (cursor && cursor.isConnected) return;
			cursor = doc.createElement('div');
			cursor.className = 'prts-cursor-layer';
			cursor.innerHTML = '<div class="prts-cursor-hand"></div><div class="prts-cursor-diamond"></div><div class="prts-cursor-ibeam"></div><div class="prts-cursor-ring"></div><div class="prts-cursor-burst"></div>';
			doc.body.appendChild(cursor);
			hand = cursor.querySelector('.prts-cursor-hand');
			ring = cursor.querySelector('.prts-cursor-ring');
			burst = cursor.querySelector('.prts-cursor-burst');
			if (cx === 0 && cy === 0) {
				cx = Math.round(doc.documentElement.clientWidth / 2);
				cy = Math.round(doc.documentElement.clientHeight / 2);
			}
			cursor.style.transform = 'translate3d(' + (cx - 4) + 'px,' + (cy - 2) + 'px,0)';
			if (!tick) {
				tick = setInterval(function () {
					if (wantTX !== null) {
						cx += (wantTX - cx) * 0.34;
						cy += (wantTY - cy) * 0.34;
						if (Math.abs(wantTX - cx) < 0.15 && Math.abs(wantTY - cy) < 0.15) {
							cx = wantTX;
							cy = wantTY;
						}
						cursor.style.transform = 'translate3d(' + (cx - 4) + 'px,' + (cy - 2) + 'px,0)';
						if (glowEl) glowEl.style.transform = 'translate3d(' + (cx - 130) + 'px,' + (cy - 130) + 'px,0)';
						if (needleEl) needleEl.style.left = (cx / doc.documentElement.clientWidth * 100).toFixed(2) + '%';
					}
					frameAcc += 16;
					if (frameAcc >= 100) {
						frameAcc = 0;
						frameIdx = (frameIdx + 1) % 49;
						var CURL_SEQ = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,9,8,7,6,5,4,3,2,1,0,0,0,0,0,0];
						hand.style.backgroundPosition = (-64 * CURL_SEQ[frameIdx]) + 'px 0';
					}
				}, 16);
			}
		}

		function resizeCanvas() {
			cvs.width = cvs.clientWidth;
			cvs.height = cvs.clientHeight;
		}

		function paint() {
			var w = cvs.width;
			var h = cvs.height;
			if (w === 0 || h === 0 || !g2d) return;
			g2d.clearRect(0, 0, w, h);
			var mx = wantTX;
			var my = wantTY;
			for (var j = 0; j < parts.length; j++) {
				var p = parts[j];
				p.y -= p.vy;
				p.x += p.vx;
				p.phase += 0.035;
				if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
				if (p.x < -4) p.x = w + 4;
				if (p.x > w + 4) p.x = -4;
				var near = 0;
				if (mx !== null && my !== null) {
					var dx = p.x - mx;
					var dy = p.y - my;
					var d2 = dx * dx + dy * dy;
					if (d2 < 16900) {
						var d = Math.sqrt(d2) || 1;
						var force = (1 - d / 130) * 2.4;
						p.x += (dx / d) * force;
						p.y += (dy / d) * force;
						near = 1 - d / 130;
					}
				}
				var a = Math.max(0.04, 0.2 + 0.16 * Math.sin(p.phase)) + near * 0.35;
				if (p.yellow) {
					g2d.fillStyle = 'rgba(255,206,58,' + Math.min(a, 0.75) + ')';
				} else {
					g2d.fillStyle = 'rgba(120,224,214,' + Math.min(a, 0.75) + ')';
				}
				g2d.beginPath();
				g2d.arc(p.x, p.y, p.r + near * 0.5, 0, Math.PI * 2);
				g2d.fill();
			}
		}

		function applyTokens() {
			if (!Fx.theme) return;
			try {
				Fx.theme.overrideTokens('prts-suite', TOKENS);
			} catch (e) {
				console.error('[prts-suite] overrideTokens failed:', e);
			}
		}

		function ensureCrest() {
			if (crestEl && crestEl.isConnected) return;
			if (!doc || !doc.body) return;
			crestEl = doc.createElement('div');
			crestEl.className = 'prts-crest-layer';
			crestEl.innerHTML = '<div class="prts-crest-anim"></div>';
			doc.body.appendChild(crestEl);
			if (!state.crest) crestEl.style.display = 'none';
		}

		function ensureAnimTick() {
			if (animInt) return;
			if (!doc) return;
			animInt = setInterval(function () {
				animIdx = (animIdx + 1) % 53;
				var pos = (-128 * animIdx) + 'px 0';
				var nodes = doc.querySelectorAll('.prts-boot-anim, .prts-crest-anim');
				for (var i = 0; i < nodes.length; i++) nodes[i].style.backgroundPosition = pos;
			}, 70);
		}

		function ensurePet() {
			if (petEl && petEl.isConnected) return;
			if (!doc || !doc.body) return;
			petEl = doc.createElement('div');
			petEl.className = 'prts-pet';
			petEl.innerHTML = '<div class="prts-pet-face"><img class="prts-pet-img" src="data:image/png;base64,' + PRIESTESS + '" alt="Priestess"></div>' +
				'<div class="prts-pet-pill"><div class="prts-pet-bal">--<small>CNY</small></div>' +
				'<div class="prts-pet-sub">点击立绘设置密钥 · 60s 刷新</div>' +
				'<div class="prts-pet-bd">设置我的生日 🎂</div>' +
				'<div class="prts-pet-foot"><span><span class="prts-pet-dot"></span>LINKED</span><span class="prts-pet-clock">--:--:--</span><span class="prts-pet-refresh">⟳</span></div></div>';
			doc.body.appendChild(petEl);
			petElRefs.bal = petEl.querySelector('.prts-pet-bal');
			petElRefs.sub = petEl.querySelector('.prts-pet-sub');
			petElRefs.clock = petEl.querySelector('.prts-pet-clock');
			petElRefs.refresh = petEl.querySelector('.prts-pet-refresh');
			petElRefs.bd = petEl.querySelector('.prts-pet-bd');
			function updateBdLine() {
				var raw = getBd();
				if (todayIsBd()) {
					petElRefs.bd.textContent = '🎂 生日快乐 · 今天是你';
					petElRefs.bd.classList.add('today');
				} else if (raw) {
					var p = parseBd(raw);
					var days = daysToNextBd();
					var fmt = (p.m < 10 ? '0' : '') + p.m + '-' + (p.d < 10 ? '0' : '') + p.d;
					petElRefs.bd.textContent = '🎂 ' + fmt + ' · 还有 ' + days + ' 天';
					petElRefs.bd.classList.remove('today');
				} else {
					petElRefs.bd.textContent = '设置我的生日 🎂';
					petElRefs.bd.classList.remove('today');
				}
			}
			petElRefs.bd.addEventListener('click', function () {
				var cur = getBd();
				var entered = prompt('输入你的生日（格式 08-12 或 2000-08-12，留空清除）：', cur || '');
				if (entered === null) return;
				var p = parseBd(entered);
				if (entered.trim() === '') {
					setBd('');
					updateBdLine();
					petSay('嗯，知道了。不过……我会记住的，只是等你先说完。');
				} else if (!p) {
					updateBdLine();
					petSay('那样的日子……我没法记住。格式像 "08-12" 这样的，预言家。');
				} else {
					var fmt = (p.m < 10 ? '0' : '') + p.m + '-' + (p.d < 10 ? '0' : '') + p.d;
					setBd(fmt);
					updateBdLine();
					petSay('记住了。' + fmt + '——我会从时间里，把这一天单独取出来。');
				}
			});
			updateBdLine();
			var petImg = petEl.querySelector('.prts-pet-img');
			var petFace = petEl.querySelector('.prts-pet-face');
			petImg.addEventListener('click', function () {
				var cur = prtsGetKey();
				if (!cur) {
					var entered = prompt('输入 DeepSeek API Key (sk-...) 用于显示余额', '');
					if (entered === null) return;
					if (entered.trim() === '') { prtsSetKey(''); petRefreshBalance(); return; }
					prtsSetKey(entered.trim());
					petRefreshBalance();
					petSay('绑定成功，预言家。');
				} else {
					petRefreshBalance();
					petSay(todayIsBd() ? petPickLine('bday') : petPickLine('tap'));
				}
			});
			petElRefs.refresh.addEventListener('click', petRefreshBalance);
			if (!petAutoInt) {
				petAutoInt = setInterval(function () {
					if (prtsGetKey()) {
						if (!AUTO_POOL.length) AUTO_POOL = LINES.daily.concat(LINES.low, LINES.up, LINES.egg);
						petSay(todayIsBd() ? petPickLine('bday') : AUTO_POOL[Math.floor(Math.random() * AUTO_POOL.length)]);
					}
				}, 240000);
			}
			if (!petGreeted) {
				petGreeted = true;
				setTimeout(function () {
					petSay(todayIsBd() ? petPickLine('bday') : petPickLine('greet'));
				}, 1800);
			}
			if (!petClockInt) {
				petClockInt = setInterval(function () {
					var d = new Date();
					var pad = function (n) { return (n < 10 ? '0' : '') + n; };
					petElRefs.clock.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
				}, 1000);
			}
			if (!petRefreshInt) {
				petRefreshInt = setInterval(petRefreshBalance, 60000);
			}
			petRefreshBalance();
			var drag = { on: false, sx: 0, sy: 0, ox: 0, oy: 0 };
			petEl.addEventListener('pointerdown', function (e) {
				if (e.target === petElRefs.bal || e.target === petElRefs.refresh) return;
				drag.on = true;
				drag.sx = e.clientX;
				drag.sy = e.clientY;
				var r = petEl.getBoundingClientRect();
				drag.ox = r.left;
				drag.oy = r.top;
			});
			doc.addEventListener('pointermove', function (e) {
				if (!drag.on || !petEl) return;
				var nx = Math.max(0, Math.min(doc.documentElement.clientWidth - 60, drag.ox + (e.clientX - drag.sx)));
				var ny = Math.max(0, Math.min(doc.documentElement.clientHeight - 40, drag.oy + (e.clientY - drag.sy)));
				petEl.style.left = nx + 'px';
				petEl.style.top = ny + 'px';
				petEl.style.right = 'auto';
				petEl.style.bottom = 'auto';
			});
			doc.addEventListener('pointerup', function () { drag.on = false; });
			if (!state.pet) petEl.style.display = 'none';
		}

		function prtsGetKey() {
			try {
				if (typeof window !== 'undefined' && window.__PRTS_DS_KEY__) return window.__PRTS_DS_KEY__;
				if (typeof localStorage !== 'undefined') return localStorage.getItem('prts-ds-key') || '';
			} catch (e) {}
			return '';
		}

		function prtsSetKey(v) {
			try {
				if (typeof localStorage !== 'undefined') localStorage.setItem('prts-ds-key', v);
			} catch (e) {}
		}

		function petPickLine(pool) {
			var arr = LINES[pool] || LINES.tap;
			return arr[Math.floor(Math.random() * arr.length)];
		}

		function parseBd(v) {
			var m = /^(\d{1,2})[-/](\d{1,2})$/.exec(String(v || '').trim());
			if (!m) return null;
			var mo = +m[1], d = +m[2];
			if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
			return { m: mo, d: d };
		}

		function getBd() {
			try { return localStorage.getItem('prts-birthday') || ''; } catch (e) { return ''; }
		}

		function setBd(v) {
			try { localStorage.setItem('prts-birthday', v); } catch (e) {}
		}

		function todayIsBd() {
			var p = parseBd(getBd());
			if (!p) return false;
			var n = new Date();
			return p.m === n.getMonth() + 1 && p.d === n.getDate();
		}

		function daysToNextBd() {
			var p = parseBd(getBd());
			if (!p) return -1;
			var n = new Date();
			var today = new Date(n.getFullYear(), n.getMonth(), n.getDate());
			var d1 = new Date(n.getFullYear(), p.m - 1, p.d);
			var d2 = new Date(n.getFullYear() + 1, p.m - 1, p.d);
			var target = d1 >= today ? d1 : d2;
			return Math.round((target - today) / 86400000);
		}

		function petSay(text, kind) {
			if (!petEl) return;
			var b = petEl.querySelector('.prts-pet-bubble');
			if (!b) {
				b = doc.createElement('div');
				b.className = 'prts-pet-bubble';
				petEl.appendChild(b);
			}
			b.textContent = text;
			b.className = 'prts-pet-bubble show' + (kind ? ' ' + kind : '');
			clearTimeout(b._t);
			b._t = setTimeout(function () { b.className = 'prts-pet-bubble'; }, 4200);
		}

		function petRefreshBalance() {
			if (!petElRefs.bal) return;
			var key = prtsGetKey();
			if (!key) {
				petElRefs.bal.innerHTML = '--<small>CNY</small>';
				petElRefs.sub.textContent = '点击余额设置密钥 · 60s 自动刷新';
				return;
			}
			petElRefs.sub.textContent = '查询中…';
			fetch('https://api.deepseek.com/user/balance', { headers: { Authorization: 'Bearer ' + key } })
				.then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
				.then(function (d) {
					var b = d.balance_infos && d.balance_infos[0];
					var cur = b ? (b.currency || 'CNY') : 'CNY';
					petElRefs.bal.innerHTML = (b ? b.total_balance : '?') + '<small>' + cur + '</small>';
					if (b) {
						petElRefs.sub.textContent = '赠送 ' + b.granted_balance + ' · 充值 ' + b.topped_up_balance;
						var now = parseFloat(b.total_balance);
						if (petLastBal !== null && !isNaN(now)) {
							var diff = now - petLastBal;
							if (diff < -0.001) petSay('余额 -¥' + Math.abs(diff).toFixed(2) + '，消耗中…', 'warn');
							else if (diff > 0.001) petSay('余额 +¥' + diff.toFixed(2) + ' ⚡', 'good');
						}
						petLastBal = now;
					} else {
						petElRefs.sub.textContent = '剩余额度信息缺失';
					}
				})
				.catch(function (e) {
					petElRefs.bal.innerHTML = 'ERR<small>KEY?</small>';
					petElRefs.sub.textContent = String(e && e.message || e);
				});
		}

		function playBoot() {
			if (!doc || !doc.body) return;
			if (bootEl || !state.boot || reduced) return;
			bootEl = doc.createElement('div');
			bootEl.className = 'prts-boot';
			bootEl.innerHTML = '<div class="prts-boot-anim"></div>' +
				'<div class="prts-boot-copy">© HYPERGRYPH CO., LTD.</div>';
			doc.body.appendChild(bootEl);
			bootEl.animate([
				{ opacity: 1 },
				{ opacity: 1, offset: 0.88 },
				{ opacity: 0 }
			], { duration: 3200, easing: 'ease-in-out', fill: 'forwards' }).onfinish = function () { bootEl = null; };
		}

		function ensureStandby() {
			if (standbyEl && standbyEl.isConnected) return;
			if (!doc || !doc.body) return;
			standbyEl = doc.createElement('div');
			standbyEl.className = 'prts-standby';
			standbyEl.innerHTML = '<img class="prts-lockwall" src="/prts-assets/lockscreen.webp" alt="lockscreen" onerror="this.style.display=\'none\'">' +
				'<div class="prts-stb-clockbox"><div class="stb-time">--:--</div><div class="stb-date">----</div><div class="stb-hint">移动鼠标或按下任意键以唤醒</div></div>';
			doc.body.appendChild(standbyEl);
			stbClockEl = standbyEl.querySelector('.stb-time');
			stbDateEl = standbyEl.querySelector('.stb-date');
		}

		function goStandby() {
			if (!state.standby || standbyOn) return;
			standbyOn = true;
			ensureStandby();
			standbyEl.classList.add('on');
			standbyEl.style.display = 'flex';
			var upd = function () {
				var d = new Date();
				var pad = function (n) { return (n < 10 ? '0' : '') + n; };
				if (stbClockEl) stbClockEl.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes());
				if (stbDateEl) stbDateEl.textContent = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
			};
			upd();
			if (!standbyClockInt) standbyClockInt = setInterval(upd, 1000);
		}

		function wakeFromStandby() {
			if (!standbyOn) return;
			standbyOn = false;
			if (standbyClockInt) { clearInterval(standbyClockInt); standbyClockInt = null; }
			if (standbyEl) {
				standbyEl.classList.remove('on');
				setTimeout(function () { if (!standbyOn && standbyEl) standbyEl.style.display = 'none'; }, 950);
			}
			playBoot();
			setTimeout(function () { petSay(petPickLine('link')); }, 1500);
			resetIdle();
		}

		function resetIdle() {
			if (!state.standby) return;
			clearTimeout(idleTo);
			idleTo = setTimeout(goStandby, STANDBY_MS);
		}

		function activity() {
			if (standbyOn) { wakeFromStandby(); return; }
			resetIdle();
		}

		function ensureAll() {
			if (!doc || !doc.body) return;
			ensureCss();
			ensureClasses();
			ensureLayers();
			ensureTerm();
			ensureFlow();
			ensureCursor();
			ensureCrest();
			ensurePet();
			applyTokens();
			ensureAnimTick();
		}

		function apply(ctx) {
			console.log("[prts-suite] apply begin, has get:", typeof ctx.get === "function");
			try {
				doc = document;
				var theme = ctx.get("theme");
				var slots = ctx.get("slots");
				Fx.theme = theme;
				reduced = !!(doc.defaultView && doc.defaultView.matchMedia && doc.defaultView.matchMedia('(prefers-reduced-motion: reduce)').matches);
				ensureAll();
				doc.addEventListener('mousemove', function (e) {
					wantTX = e.clientX;
					wantTY = e.clientY;
					activity();
				}, true);
				doc.addEventListener('mouseover', function (e) {
					var t = e.target;
					if (!cursor || !t || !t.closest) return;
					var text = !!t.closest('input:not([type="button"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, [contenteditable="true"], [role="textbox"]');
					var hover = !text && !!t.closest('a, button, [role="button"], [role="link"], summary, select, label[for], input[type="button"], input[type="submit"], [data-cursor="pointer"]');
					cursor.dataset.hover = hover ? '1' : '';
					cursor.dataset.mode = text ? 'text' : '';
				}, true);
				doc.addEventListener('pointerdown', function () { if (cursor) cursor.dataset.press = '1'; activity(); }, true);
				doc.addEventListener('pointerup', function () { if (cursor) cursor.dataset.press = ''; }, true);
				doc.addEventListener('keydown', activity, true);
				doc.addEventListener('wheel', activity, true);
				doc.addEventListener('click', function (e) {
					activity();
					var t = e.target;
					var interactive = t && t.closest && t.closest('a, button, [role="button"], input, textarea, [contenteditable="true"], .prts-pet, .prts-pet-pill');
					if (!interactive && state.term) {
						var PINGS = ['TOUCH SENSOR ......... RECEIVED', 'SIGNAL PROBE ........ OK', 'CURSOR LOCK ......... ACQUIRED', 'MEMORY TAP .......... NOTED', 'GAZE RETARGET ...... PRIESTESS'];
						termPing(PINGS[Math.floor(Math.random() * PINGS.length)]);
					}
					if (!cursor) return;
					if (ring) {
						ring.getAnimations().forEach(function (a) { a.cancel(); });
						ring.animate([
							{ transform: 'translate(-50%,-50%) scale(0.15)', opacity: 0.85 },
							{ transform: 'translate(-50%,-50%) scale(3.1)', opacity: 0 }
						], { duration: 520, easing: 'cubic-bezier(0.22, 0.61, 0.21, 1)', fill: 'forwards' });
					}
					if (burst) {
						burst.getAnimations().forEach(function (a) { a.cancel(); });
						burst.animate([
							{ transform: 'translate(-50%,-50%) rotate(45deg) scale(0.3)', opacity: 0.95 },
							{ transform: 'translate(-50%,-50%) rotate(45deg) scale(1.5)', opacity: 0 }
						], { duration: 380, easing: 'ease-out', fill: 'forwards' });
					}
				}, true);
				playBoot();
				resetIdle();
				if (slots && !Fx.dock) {
					Fx.dock = slots.inject('conversation.composer.dock', function () {
						return slots.register(
							{ name: 'conversation.composer.dock', id: 'prts-status', order: 15, label: 'PRTS STATUS' },
							function () {
								return React.createElement('div', { className: 'prts-status' },
									React.createElement('span', { className: 'dot' }),
									React.createElement('span', { className: 'tag' }, 'PRTS'),
									React.createElement('span', null, '· LINKED · BANDWIDTH 254.7 Mb/s · ENV DARK')
								);
							}
						);
					});
				}
				if (slots && !Fx.slot) {
					Fx.slot = slots.inject('settings.section', function () {
						return slots.register(
							{ name: 'settings.section', id: 'prts-suite', order: 25, label: 'PRTS 终端' },
							function (props) {
								function SettingsPane(props2) {
									var pState = React.useState(state.particles);
									var gState = React.useState(state.grid);
									var sState = React.useState(state.scanline);
									var bState = React.useState(state.boot);
									var cState = React.useState(state.crest);
									var fState = React.useState(state.flow);
									var wState = React.useState(state.standby);
									var tState = React.useState(state.pet);
									function row(label, val, setter, key) {
										return React.createElement('label', { className: 'prts-row', style: { width: '100%' } },
											React.createElement('span', null, label),
											React.createElement('input', { type: 'checkbox', checked: val, onChange: function (e) { setter(e.target.checked); onToggle(key, e.target.checked); } })
										);
									}
									return React.createElement('div', { className: 'prts-theme-settings' },
										React.createElement('div', { style: { color: 'var(--dsw-alias-label-secondary)', fontSize: '12px', marginBottom: '4px' } }, 'PRTS 终端氛围'),
										row('粒子场', pState[0], pState[1], 'particles'),
										row('终端网格', gState[0], gState[1], 'grid'),
										row('扫描线', sState[0], sState[1], 'scanline'),
										row('数据流', fState[0], fState[1], 'flow'),
										row('终端徽章', cState[0], cState[1], 'crest'),
										row('余额桌宠', tState[0], tState[1], 'pet'),
										row('启动序列', bState[0], bState[1], 'boot'),
										row('息屏待机', wState[0], wState[1], 'standby')
									);
								}
								return React.createElement(SettingsPane, { close: props.close });
							}
						);
					});
				}
				function onToggle(key, value) {
					state[key] = value;
					if (key === 'particles') {
						if (tickP) { clearInterval(tickP); tickP = null; }
						if (value && !reduced) tickP = setInterval(paint, 33);
					} else if (key === 'grid') {
						if (gridLayer) gridLayer.style.display = value ? '' : 'none';
					} else if (key === 'scanline') {
						if (scan) scan.style.display = value ? '' : 'none';
					} else if (key === 'crest') {
						if (crestEl) crestEl.style.display = value ? '' : 'none';
					} else if (key === 'flow') {
						if (flowEl) flowEl.style.display = value ? '' : 'none';
					} else if (key === 'pet') {
						if (petEl) petEl.style.display = value ? '' : 'none';
					} else if (key === 'standby') {
						if (!value && standbyOn) wakeFromStandby();
						resetIdle();
					}
				}
				Fx.onToggle = onToggle;
				Fx.ensureAll = ensureAll;
				if (!guardInt) {
					guardInt = setInterval(function () {
						var okCss = !!doc.querySelector('style[data-prts="1"]');
						var okCls = doc.documentElement.classList.contains('dsh-prts-theme');
						if (!okCss || !okCls) {
							console.log('[prts-suite] self-heal: rebuild');
							ensureAll();
						}
					}, 400);
				}
				console.log("[prts-suite] apply done");
			} catch (e) {
				console.error("[prts-suite] apply error:", e);
			}
		}
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
