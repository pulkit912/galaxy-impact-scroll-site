(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/CanvasSequence.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CanvasSequence
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const TOTAL_FRAMES = 60;
// Clamp helper
function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
}
function CanvasSequence() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const imagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const [loaded, setLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Render state kept in refs - never cause re-renders
    const currentFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0) // smoothed float frame position
    ;
    const targetFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0) // raw target from scroll
    ;
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const dprRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(1);
    // ── Preload all frames eagerly ─────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CanvasSequence.useEffect": ()=>{
            let count = 0;
            const imgs = new Array(TOTAL_FRAMES);
            for(let i = 1; i <= TOTAL_FRAMES; i++){
                const img = new Image();
                const padded = String(i).padStart(3, '0');
                img.src = `/frames/ezgif-frame-${padded}.jpg`;
                img.decoding = 'async';
                img.onload = ({
                    "CanvasSequence.useEffect": ()=>{
                        count++;
                        setLoaded(count);
                        imgs[i - 1] = img;
                        if (count === TOTAL_FRAMES) {
                            imagesRef.current = imgs;
                        }
                    }
                })["CanvasSequence.useEffect"];
                img.onerror = ({
                    "CanvasSequence.useEffect": ()=>{
                        count++;
                        setLoaded(count);
                    }
                })["CanvasSequence.useEffect"];
            }
        }
    }["CanvasSequence.useEffect"], []);
    // ── Canvas resize with DPR capped at 2 ────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CanvasSequence.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const resize = {
                "CanvasSequence.useEffect.resize": ()=>{
                    // Cap DPR at 2 to avoid GPU memory OOM on high-DPR phones
                    const dpr = Math.min(window.devicePixelRatio || 1, 2);
                    dprRef.current = dpr;
                    canvas.width = Math.round(window.innerWidth * dpr);
                    canvas.height = Math.round(window.innerHeight * dpr);
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                    }
                }
            }["CanvasSequence.useEffect.resize"];
            resize();
            window.addEventListener('resize', resize, {
                passive: true
            });
            return ({
                "CanvasSequence.useEffect": ()=>window.removeEventListener('resize', resize)
            })["CanvasSequence.useEffect"];
        }
    }["CanvasSequence.useEffect"], []);
    // ── Native scroll listener → update targetFrame ───────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CanvasSequence.useEffect": ()=>{
            const onScroll = {
                "CanvasSequence.useEffect.onScroll": ()=>{
                    const docH = document.documentElement.scrollHeight - window.innerHeight;
                    const prog = docH > 0 ? clamp(window.scrollY / docH, 0, 1) : 0;
                    targetFrameRef.current = prog * (TOTAL_FRAMES - 1);
                }
            }["CanvasSequence.useEffect.onScroll"];
            window.addEventListener('scroll', onScroll, {
                passive: true
            });
            onScroll(); // init on mount
            return ({
                "CanvasSequence.useEffect": ()=>window.removeEventListener('scroll', onScroll)
            })["CanvasSequence.useEffect"];
        }
    }["CanvasSequence.useEffect"], []);
    // ── rAF render loop: lerp currentFrame → target, then draw ───────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CanvasSequence.useEffect": ()=>{
            const isMobile = {
                "CanvasSequence.useEffect.isMobile": ()=>window.innerWidth < 768
            }["CanvasSequence.useEffect.isMobile"];
            const render = {
                "CanvasSequence.useEffect.render": ()=>{
                    const canvas = canvasRef.current;
                    if (!canvas) return;
                    const imgs = imagesRef.current;
                    if (!imgs || imgs.length < TOTAL_FRAMES) return;
                    const ctx = canvas.getContext('2d');
                    if (!ctx) return;
                    // Lerp speed: faster on mobile so it feels responsive
                    const lerpFactor = isMobile() ? 0.18 : 0.12;
                    currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * lerpFactor;
                    const rawIdx = clamp(currentFrameRef.current, 0, TOTAL_FRAMES - 1);
                    const floorIdx = Math.floor(rawIdx);
                    const ceilIdx = Math.min(TOTAL_FRAMES - 1, floorIdx + 1);
                    const blend = rawIdx - floorIdx;
                    const imgA = imgs[floorIdx];
                    const imgB = imgs[ceilIdx];
                    if (!imgA) return;
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    const cw = window.innerWidth;
                    const ch = window.innerHeight;
                    // Subtle zoom arc keeps the image feeling dynamic
                    const progress = rawIdx / (TOTAL_FRAMES - 1);
                    const zoom = 0.85 + Math.sin(progress * Math.PI) * 0.15;
                    const drawParams = {
                        "CanvasSequence.useEffect.render.drawParams": (img)=>{
                            const base = Math.max(cw / img.width, ch / img.height) * zoom;
                            return {
                                dw: img.width * base,
                                dh: img.height * base,
                                dx: (cw - img.width * base) / 2,
                                dy: (ch - img.height * base) / 2
                            };
                        }
                    }["CanvasSequence.useEffect.render.drawParams"];
                    ctx.clearRect(0, 0, cw, ch);
                    // Darken for text readability
                    ctx.filter = 'brightness(0.55) contrast(1.1)';
                    const a = drawParams(imgA);
                    ctx.globalAlpha = 1;
                    ctx.drawImage(imgA, a.dx, a.dy, a.dw, a.dh);
                    // Cross-dissolve to next frame
                    if (blend > 0 && imgB) {
                        const b = drawParams(imgB);
                        ctx.globalAlpha = blend;
                        ctx.drawImage(imgB, b.dx, b.dy, b.dw, b.dh);
                        ctx.globalAlpha = 1;
                    }
                    ctx.filter = 'none';
                }
            }["CanvasSequence.useEffect.render"];
            const loop = {
                "CanvasSequence.useEffect.loop": ()=>{
                    render();
                    rafRef.current = requestAnimationFrame(loop);
                }
            }["CanvasSequence.useEffect.loop"];
            rafRef.current = requestAnimationFrame(loop);
            return ({
                "CanvasSequence.useEffect": ()=>cancelAnimationFrame(rafRef.current)
            })["CanvasSequence.useEffect"];
        }
    }["CanvasSequence.useEffect"], []);
    const pct = Math.round(loaded / TOTAL_FRAMES * 100);
    const isLoading = loaded < TOTAL_FRAMES;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                style: {
                    position: 'fixed',
                    inset: 0,
                    width: '100vw',
                    height: '100vh',
                    display: 'block',
                    zIndex: 0,
                    // Let the browser know we only need vertical scrolling - don't hijack touch
                    touchAction: 'pan-y'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/CanvasSequence.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    inset: 0,
                    zIndex: 100,
                    background: '#000',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1.5rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'relative',
                            width: '56px',
                            height: '56px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                viewBox: "0 0 56 56",
                                style: {
                                    position: 'absolute',
                                    inset: 0,
                                    animation: 'spin 1.4s linear infinite'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "28",
                                        cy: "28",
                                        r: "24",
                                        fill: "none",
                                        stroke: "rgba(255,140,60,0.15)",
                                        strokeWidth: "3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CanvasSequence.tsx",
                                        lineNumber: 192,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "28",
                                        cy: "28",
                                        r: "24",
                                        fill: "none",
                                        stroke: "rgba(255,140,60,0.9)",
                                        strokeWidth: "3",
                                        strokeDasharray: `${pct / 100 * 150.8} 150.8`,
                                        strokeLinecap: "round",
                                        strokeDashoffset: "0",
                                        transform: "rotate(-90 28 28)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CanvasSequence.tsx",
                                        lineNumber: 193,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/CanvasSequence.tsx",
                                lineNumber: 191,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'rgba(255,140,60,0.9)',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '11px',
                                    fontWeight: 700
                                },
                                children: pct
                            }, void 0, false, {
                                fileName: "[project]/src/components/CanvasSequence.tsx",
                                lineNumber: 200,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/CanvasSequence.tsx",
                        lineNumber: 190,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: 'rgba(255,255,255,0.35)',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '11px',
                            letterSpacing: '0.25em',
                            textTransform: 'uppercase'
                        },
                        children: "Loading"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CanvasSequence.tsx",
                        lineNumber: 207,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        children: `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`
                    }, void 0, false, {
                        fileName: "[project]/src/components/CanvasSequence.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CanvasSequence.tsx",
                lineNumber: 176,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(CanvasSequence, "IGU7pq3XzIPnfG0S9tUU7cXgIrI=");
_c = CanvasSequence;
var _c;
__turbopack_context__.k.register(_c, "CanvasSequence");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-motion-value-event.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const NAV_LINKS = [
    'Story',
    'Impact',
    'About'
];
function Navbar() {
    _s();
    const { scrollY } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])();
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValueEvent"])(scrollY, 'change', {
        "Navbar.useMotionValueEvent": (y)=>{
            setScrolled(y > 60);
            if (y > 60) setMenuOpen(false); // auto-close on scroll
        }
    }["Navbar.useMotionValueEvent"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].nav, {
                animate: {
                    backgroundColor: scrolled || menuOpen ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0)',
                    backdropFilter: scrolled || menuOpen ? 'blur(14px)' : 'blur(0px)'
                },
                transition: {
                    duration: 0.35,
                    ease: 'easeOut'
                },
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent'
                },
                className: "px-5 sm:px-8 md:px-12 py-3 sm:py-4 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                        initial: {
                            opacity: 0,
                            x: -20
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        transition: {
                            duration: 0.7,
                            delay: 0.2
                        },
                        className: "text-white font-black text-base sm:text-lg md:text-xl tracking-widest uppercase",
                        style: {
                            textShadow: '0 0 30px rgba(255,140,60,0.5)'
                        },
                        children: "GALAXY IMPACT"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Navbar.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            x: 20
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        transition: {
                            duration: 0.7,
                            delay: 0.3
                        },
                        className: "hidden md:flex items-center gap-8 lg:gap-10",
                        children: NAV_LINKS.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: `#${link.toLowerCase()}`,
                                className: "text-white/70 hover:text-white text-sm font-semibold tracking-widest uppercase transition-colors duration-200",
                                style: {
                                    textShadow: '0 2px 8px rgba(0,0,0,0.8)'
                                },
                                children: link
                            }, link, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Navbar.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        transition: {
                            delay: 0.3
                        },
                        onClick: ()=>setMenuOpen((o)=>!o),
                        className: "md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] focus:outline-none",
                        "aria-label": "Toggle menu",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                animate: menuOpen ? {
                                    rotate: 45,
                                    y: 7
                                } : {
                                    rotate: 0,
                                    y: 0
                                },
                                className: "block w-6 h-[2px] bg-white rounded-full origin-center"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                animate: menuOpen ? {
                                    opacity: 0,
                                    scaleX: 0
                                } : {
                                    opacity: 1,
                                    scaleX: 1
                                },
                                className: "block w-6 h-[2px] bg-white rounded-full"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                animate: menuOpen ? {
                                    rotate: -45,
                                    y: -7
                                } : {
                                    rotate: 0,
                                    y: 0
                                },
                                className: "block w-6 h-[2px] bg-white rounded-full origin-center"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Navbar.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Navbar.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: -20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -20
                    },
                    transition: {
                        duration: 0.3,
                        ease: 'easeOut'
                    },
                    style: {
                        position: 'fixed',
                        top: '56px',
                        left: 0,
                        right: 0,
                        zIndex: 49,
                        background: 'rgba(0,0,0,0.92)',
                        backdropFilter: 'blur(16px)',
                        borderBottom: '1px solid rgba(255,255,255,0.08)'
                    },
                    className: "flex flex-col px-6 py-6 gap-5 md:hidden",
                    children: NAV_LINKS.map((link, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].a, {
                            href: `#${link.toLowerCase()}`,
                            initial: {
                                opacity: 0,
                                x: -16
                            },
                            animate: {
                                opacity: 1,
                                x: 0
                            },
                            transition: {
                                delay: i * 0.07
                            },
                            onClick: ()=>setMenuOpen(false),
                            className: "text-white font-black text-2xl tracking-widest uppercase border-b border-white/10 pb-4 last:border-0 last:pb-0",
                            style: {
                                textShadow: '0 0 20px rgba(255,140,60,0.4)'
                            },
                            children: link
                        }, link, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 112,
                            columnNumber: 15
                        }, this))
                }, "mobile-menu", false, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 93,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Navbar.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Navbar, "6CY9pdGQHnFbCPe+zz72NwKsRqI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValueEvent"]
    ];
});
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/HeroSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
'use client';
;
;
function HeroSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "hero",
        className: "relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-5 sm:px-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    scaleX: 0,
                    opacity: 0
                },
                animate: {
                    scaleX: 1,
                    opacity: 1
                },
                transition: {
                    duration: 1.2,
                    ease: [
                        0.22,
                        1,
                        0.36,
                        1
                    ],
                    delay: 0.3
                },
                className: "w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent mb-8 sm:mb-10"
            }, void 0, false, {
                fileName: "[project]/src/components/HeroSection.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h1, {
                initial: {
                    opacity: 0,
                    y: 50,
                    scale: 0.9
                },
                animate: {
                    opacity: 1,
                    y: 0,
                    scale: 1
                },
                transition: {
                    duration: 1.2,
                    ease: [
                        0.22,
                        1,
                        0.36,
                        1
                    ],
                    delay: 0.5
                },
                className: "text-[4rem] xs:text-7xl sm:text-8xl md:text-[9rem] lg:text-[12rem] xl:text-[14rem] font-black leading-none tracking-tighter uppercase",
                style: {
                    background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,140,60,0.85) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 60px rgba(255,110,40,0.55))'
                },
                children: [
                    "GALAXY",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                        fileName: "[project]/src/components/HeroSection.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    "IMPACT"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HeroSection.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                initial: {
                    opacity: 0,
                    y: 20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    duration: 0.9,
                    ease: 'easeOut',
                    delay: 0.9
                },
                className: "mt-6 sm:mt-8 text-base sm:text-xl md:text-2xl text-white/80 font-semibold tracking-wide max-w-xs sm:max-w-sm md:max-w-lg",
                style: {
                    textShadow: '0 2px 16px rgba(0,0,0,0.9)'
                },
                children: "The fist that shook the island."
            }, void 0, false, {
                fileName: "[project]/src/components/HeroSection.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    scaleX: 0,
                    opacity: 0
                },
                animate: {
                    scaleX: 1,
                    opacity: 1
                },
                transition: {
                    duration: 1.0,
                    ease: [
                        0.22,
                        1,
                        0.36,
                        1
                    ],
                    delay: 1.1
                },
                className: "mt-8 w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
            }, void 0, false, {
                fileName: "[project]/src/components/HeroSection.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                transition: {
                    duration: 1,
                    delay: 1.5
                },
                className: "absolute bottom-8 sm:bottom-12 flex flex-col items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] sm:text-xs font-bold tracking-[0.3em] text-white/50 uppercase",
                        children: "Scroll to experience"
                    }, void 0, false, {
                        fileName: "[project]/src/components/HeroSection.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        animate: {
                            y: [
                                0,
                                8,
                                0
                            ]
                        },
                        transition: {
                            duration: 1.6,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        },
                        className: "flex flex-col items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-px h-6 sm:h-8 bg-gradient-to-b from-white/40 to-transparent"
                            }, void 0, false, {
                                fileName: "[project]/src/components/HeroSection.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "12",
                                height: "8",
                                viewBox: "0 0 12 8",
                                fill: "none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M1 1L6 7L11 1",
                                    stroke: "rgba(255,255,255,0.4)",
                                    strokeWidth: "1.5",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroSection.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/HeroSection.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HeroSection.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HeroSection.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HeroSection.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = HeroSection;
var _c;
__turbopack_context__.k.register(_c, "HeroSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CinematicSections.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CinematicSections
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
// ── Shared styles ─────────────────────────────────────────────────────────────
const glowText = {
    textShadow: '0 0 40px rgba(255,120,50,0.5), 0 2px 20px rgba(0,0,0,0.95)'
};
const solidText = {
    textShadow: '0 2px 20px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.8)'
};
function StorySection({ id, chapter, heading, body, align = 'center', headingColor = 'white' }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: false,
        amount: 0.3
    });
    // Responsive alignment — on mobile always center for readability
    const alignClass = align === 'left' ? 'items-start text-left pl-5 sm:pl-10 md:pl-20 lg:pl-36 pr-5 sm:pr-8' : align === 'right' ? 'items-end text-right pr-5 sm:pr-10 md:pr-20 lg:pr-36 pl-5 sm:pl-8' : 'items-center text-center px-5 sm:px-10 md:px-20';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: id,
        ref: ref,
        className: `min-h-[100dvh] flex flex-col justify-center ${alignClass} py-20 sm:py-24`,
        children: [
            chapter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                initial: {
                    opacity: 0,
                    y: 16
                },
                animate: inView ? {
                    opacity: 1,
                    y: 0
                } : {
                    opacity: 0,
                    y: 16
                },
                transition: {
                    duration: 0.55,
                    ease: 'easeOut'
                },
                className: "text-[10px] sm:text-xs font-black tracking-[0.4em] uppercase text-orange-400/80 mb-4 sm:mb-5",
                style: solidText,
                children: chapter
            }, void 0, false, {
                fileName: "[project]/src/components/CinematicSections.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h2, {
                initial: {
                    opacity: 0,
                    y: 50
                },
                animate: inView ? {
                    opacity: 1,
                    y: 0
                } : {
                    opacity: 0,
                    y: 50
                },
                transition: {
                    duration: 0.95,
                    ease: [
                        0.22,
                        1,
                        0.36,
                        1
                    ],
                    delay: 0.1
                },
                className: "text-[2.2rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight max-w-3xl",
                style: {
                    color: headingColor,
                    ...glowText
                },
                children: heading
            }, void 0, false, {
                fileName: "[project]/src/components/CinematicSections.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            body && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                initial: {
                    opacity: 0,
                    y: 24
                },
                animate: inView ? {
                    opacity: 1,
                    y: 0
                } : {
                    opacity: 0,
                    y: 24
                },
                transition: {
                    duration: 0.85,
                    ease: 'easeOut',
                    delay: 0.3
                },
                className: "mt-5 sm:mt-7 text-sm sm:text-base md:text-lg lg:text-xl text-white font-semibold max-w-xs sm:max-w-sm md:max-w-xl leading-relaxed",
                style: solidText,
                children: body
            }, void 0, false, {
                fileName: "[project]/src/components/CinematicSections.tsx",
                lineNumber: 67,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CinematicSections.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_s(StorySection, "O7qYEn3iCrBBWRAefWku+E/MdDM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = StorySection;
// ── Galaxy Impact stamp ─────────────────────────────────────────────────────
function GalaxyImpactStamp() {
    _s1();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: false,
        amount: 0.35
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "impact",
        ref: ref,
        className: "min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 sm:px-8 gap-4 sm:gap-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    scaleX: 0
                },
                animate: inView ? {
                    scaleX: 1
                } : {
                    scaleX: 0
                },
                transition: {
                    duration: 0.8
                },
                className: "w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"
            }, void 0, false, {
                fileName: "[project]/src/components/CinematicSections.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    scale: 0.75
                },
                animate: inView ? {
                    opacity: 1,
                    scale: 1
                } : {
                    opacity: 0,
                    scale: 0.75
                },
                transition: {
                    duration: 1.4,
                    ease: [
                        0.22,
                        1,
                        0.36,
                        1
                    ]
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block text-[3.5rem] xs:text-6xl sm:text-8xl md:text-[9rem] lg:text-[12rem] xl:text-[14rem] font-black leading-none tracking-tighter",
                        style: {
                            background: 'linear-gradient(180deg, #ffffff 0%, #FF8C32 60%, #FF3A10 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 0 60px rgba(255,100,30,0.65))'
                        },
                        children: "GALAXY"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CinematicSections.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block text-[3.5rem] xs:text-6xl sm:text-8xl md:text-[9rem] lg:text-[12rem] xl:text-[14rem] font-black leading-none tracking-tighter",
                        style: {
                            background: 'linear-gradient(180deg, #FF8C32 0%, #FF2200 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 0 80px rgba(255,50,10,0.7))'
                        },
                        children: "IMPACT"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CinematicSections.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CinematicSections.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                initial: {
                    opacity: 0,
                    y: 20
                },
                animate: inView ? {
                    opacity: 1,
                    y: 0
                } : {
                    opacity: 0,
                    y: 20
                },
                transition: {
                    duration: 0.8,
                    delay: 0.5
                },
                className: "text-sm sm:text-lg md:text-xl text-white/85 font-semibold tracking-wide max-w-xs sm:max-w-none",
                style: solidText,
                children: "A punch carrying the power of the cosmos."
            }, void 0, false, {
                fileName: "[project]/src/components/CinematicSections.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    scaleX: 0
                },
                animate: inView ? {
                    scaleX: 1
                } : {
                    scaleX: 0
                },
                transition: {
                    duration: 0.8,
                    delay: 0.3
                },
                className: "w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"
            }, void 0, false, {
                fileName: "[project]/src/components/CinematicSections.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CinematicSections.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
_s1(GalaxyImpactStamp, "O7qYEn3iCrBBWRAefWku+E/MdDM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c1 = GalaxyImpactStamp;
// ── Final banner ────────────────────────────────────────────────────────────
function FinalBanner() {
    _s2();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: false,
        amount: 0.25
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: ref,
        className: "min-h-[100dvh] flex flex-col items-center justify-center text-center px-5 sm:px-10 md:px-20 gap-6 sm:gap-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                initial: {
                    opacity: 0
                },
                animate: inView ? {
                    opacity: 1
                } : {
                    opacity: 0
                },
                transition: {
                    duration: 0.7
                },
                className: "text-[10px] sm:text-xs font-black tracking-[0.4em] text-orange-400/80 uppercase",
                style: solidText,
                children: "The Legend"
            }, void 0, false, {
                fileName: "[project]/src/components/CinematicSections.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h2, {
                initial: {
                    opacity: 0,
                    y: 60
                },
                animate: inView ? {
                    opacity: 1,
                    y: 0
                } : {
                    opacity: 0,
                    y: 60
                },
                transition: {
                    duration: 1.3,
                    ease: [
                        0.22,
                        1,
                        0.36,
                        1
                    ],
                    delay: 0.15
                },
                className: "text-[2rem] leading-tight sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white max-w-xs sm:max-w-2xl md:max-w-4xl",
                style: {
                    textShadow: '0 0 80px rgba(255,120,50,0.4), 0 2px 30px rgba(0,0,0,0.98)'
                },
                children: "WHEN A SINGLE FIST STRUCK LIKE A GALAXY"
            }, void 0, false, {
                fileName: "[project]/src/components/CinematicSections.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    scaleX: 0
                },
                animate: inView ? {
                    scaleX: 1
                } : {
                    scaleX: 0
                },
                transition: {
                    duration: 1.1,
                    delay: 0.5
                },
                className: "w-28 sm:w-40 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"
            }, void 0, false, {
                fileName: "[project]/src/components/CinematicSections.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                initial: {
                    opacity: 0,
                    y: 20
                },
                animate: inView ? {
                    opacity: 1,
                    y: 0
                } : {
                    opacity: 0,
                    y: 20
                },
                transition: {
                    duration: 0.8,
                    delay: 0.6
                },
                className: "text-xs sm:text-base md:text-lg text-white/60 font-semibold tracking-wider",
                style: solidText,
                children: "— Monkey D. Garp · Hachinosu · One Piece"
            }, void 0, false, {
                fileName: "[project]/src/components/CinematicSections.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CinematicSections.tsx",
        lineNumber: 148,
        columnNumber: 5
    }, this);
}
_s2(FinalBanner, "O7qYEn3iCrBBWRAefWku+E/MdDM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c2 = FinalBanner;
function CinematicSections() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative z-10",
        id: "story",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StorySection, {
                id: "story",
                chapter: "Chapter I · Hachinosu",
                heading: "THE SKY GREW QUIET",
                body: "Above the pirate island of Hachinosu, chaos filled the streets. Pirates laughed and buildings burned, unaware of the shadow forming in the sky.",
                align: "left"
            }, void 0, false, {
                fileName: "[project]/src/components/CinematicSections.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StorySection, {
                chapter: "Chapter II · The Arrival",
                heading: "A LEGEND DESCENDS",
                body: "A man who once cornered the Pirate King. The Hero of the Marines. Monkey D. Garp.",
                align: "right",
                headingColor: "#FFB97A"
            }, void 0, false, {
                fileName: "[project]/src/components/CinematicSections.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StorySection, {
                chapter: "Chapter III · The Gathering",
                heading: "THE AIR BEGAN TO TREMBLE",
                body: "Garp raised his fist. The clouds twisted. The ocean roared. An unimaginable force gathered in the sky.",
                align: "left"
            }, void 0, false, {
                fileName: "[project]/src/components/CinematicSections.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GalaxyImpactStamp, {}, void 0, false, {
                fileName: "[project]/src/components/CinematicSections.tsx",
                lineNumber: 206,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StorySection, {
                chapter: "Chapter V · The Aftermath",
                heading: "THE SHOCKWAVE SPREAD",
                body: "Buildings shattered. The island trembled. Pirates were thrown into the sky by the force of a single punch.",
                align: "right"
            }, void 0, false, {
                fileName: "[project]/src/components/CinematicSections.tsx",
                lineNumber: 208,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StorySection, {
                chapter: "Chapter VI · The Stillness",
                heading: "SILENCE",
                body: "Dust drifted through the air. The battlefield froze in shock.",
                align: "center",
                headingColor: "#C8DCFF"
            }, void 0, false, {
                fileName: "[project]/src/components/CinematicSections.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StorySection, {
                id: "about",
                chapter: "Chapter VII · The Man",
                heading: "THE HERO OF THE MARINES",
                body: "The man who once fought the Pirate King. Monkey D. Garp.",
                align: "left",
                headingColor: "#FFB97A"
            }, void 0, false, {
                fileName: "[project]/src/components/CinematicSections.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FinalBanner, {}, void 0, false, {
                fileName: "[project]/src/components/CinematicSections.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CinematicSections.tsx",
        lineNumber: 193,
        columnNumber: 5
    }, this);
}
_c3 = CinematicSections;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "StorySection");
__turbopack_context__.k.register(_c1, "GalaxyImpactStamp");
__turbopack_context__.k.register(_c2, "FinalBanner");
__turbopack_context__.k.register(_c3, "CinematicSections");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ParallaxTextOverlay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ParallaxTextOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const BADGES = [
    {
        id: 'garp',
        label: 'Monkey D. Garp',
        sub: 'Hero of the Marines',
        scrollStart: 0.02,
        scrollEnd: 0.22,
        speed: -0.18,
        position: {
            left: '5%',
            top: '22%'
        }
    },
    {
        id: 'hachinosu',
        label: 'Hachinosu',
        sub: 'Island of Pirates',
        scrollStart: 0.28,
        scrollEnd: 0.52,
        speed: 0.14,
        position: {
            right: '5%',
            bottom: '28%'
        }
    },
    {
        id: 'galaxy',
        label: 'Galaxy Impact',
        sub: '銀河天翔',
        scrollStart: 0.55,
        scrollEnd: 0.80,
        speed: -0.22,
        position: {
            left: '50%',
            top: '55%',
            transform: 'translateX(-50%)'
        }
    }
];
function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
}
function ParallaxTextOverlay() {
    _s();
    const badgeRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ParallaxTextOverlay.useEffect": ()=>{
            const onScroll = {
                "ParallaxTextOverlay.useEffect.onScroll": ()=>{
                    scrollRef.current = window.scrollY;
                }
            }["ParallaxTextOverlay.useEffect.onScroll"];
            window.addEventListener('scroll', onScroll, {
                passive: true
            });
            const loop = {
                "ParallaxTextOverlay.useEffect.loop": ()=>{
                    const scrollY = scrollRef.current;
                    const docH = document.documentElement.scrollHeight - window.innerHeight;
                    const prog = docH > 0 ? clamp(scrollY / docH, 0, 1) : 0;
                    BADGES.forEach({
                        "ParallaxTextOverlay.useEffect.loop": (badge, i)=>{
                            const el = badgeRefs.current[i];
                            if (!el) return;
                            // Fade window with smooth margins
                            const fadeRange = 0.04;
                            let opacity = 0;
                            if (prog >= badge.scrollStart && prog <= badge.scrollEnd) {
                                const fadeIn = clamp((prog - badge.scrollStart) / fadeRange, 0, 1);
                                const fadeOut = clamp((badge.scrollEnd - prog) / fadeRange, 0, 1);
                                opacity = Math.min(fadeIn, fadeOut);
                            }
                            // Parallax offset based on scroll position within the badge window
                            const windowCenter = (badge.scrollStart + badge.scrollEnd) / 2;
                            const offsetPx = (prog - windowCenter) * badge.speed * window.innerHeight;
                            el.style.opacity = String(opacity);
                            el.style.transform = `translateY(${offsetPx}px)${badge.id === 'galaxy' ? ' translateX(-50%)' : ''}`;
                        }
                    }["ParallaxTextOverlay.useEffect.loop"]);
                    rafRef.current = requestAnimationFrame(loop);
                }
            }["ParallaxTextOverlay.useEffect.loop"];
            rafRef.current = requestAnimationFrame(loop);
            return ({
                "ParallaxTextOverlay.useEffect": ()=>{
                    cancelAnimationFrame(rafRef.current);
                    window.removeEventListener('scroll', onScroll);
                }
            })["ParallaxTextOverlay.useEffect"];
        }
    }["ParallaxTextOverlay.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            inset: 0,
            zIndex: 8,
            pointerEvents: 'none',
            overflow: 'hidden'
        },
        "aria-hidden": "true",
        children: BADGES.map((badge, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: (el)=>{
                    badgeRefs.current[i] = el;
                },
                style: {
                    position: 'absolute',
                    opacity: 0,
                    willChange: 'transform, opacity',
                    ...badge.position
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'inline-flex',
                        flexDirection: 'column',
                        gap: '4px',
                        padding: '10px 16px 10px 14px',
                        background: 'rgba(0,0,0,0.45)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,140,60,0.25)',
                        borderLeft: '3px solid rgba(255,140,60,0.8)',
                        borderRadius: '6px',
                        maxWidth: '200px',
                        boxShadow: '0 4px 32px rgba(0,0,0,0.5), 0 0 40px rgba(255,100,30,0.08)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "'Bebas Neue', 'Inter', sans-serif",
                                fontSize: 'clamp(14px, 3.5vw, 20px)',
                                fontWeight: 900,
                                letterSpacing: '0.08em',
                                color: '#fff',
                                textShadow: '0 0 20px rgba(255,140,60,0.45)',
                                lineHeight: 1,
                                whiteSpace: 'nowrap'
                            },
                            children: badge.label
                        }, void 0, false, {
                            fileName: "[project]/src/components/ParallaxTextOverlay.tsx",
                            lineNumber: 136,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 'clamp(9px, 2vw, 11px)',
                                fontWeight: 600,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,140,60,0.8)',
                                lineHeight: 1,
                                whiteSpace: 'nowrap'
                            },
                            children: badge.sub
                        }, void 0, false, {
                            fileName: "[project]/src/components/ParallaxTextOverlay.tsx",
                            lineNumber: 150,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ParallaxTextOverlay.tsx",
                    lineNumber: 120,
                    columnNumber: 11
                }, this)
            }, badge.id, false, {
                fileName: "[project]/src/components/ParallaxTextOverlay.tsx",
                lineNumber: 109,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/ParallaxTextOverlay.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
_s(ParallaxTextOverlay, "/sGl5HkyR3cCwvyaC+OvQSCUGFI=");
_c = ParallaxTextOverlay;
var _c;
__turbopack_context__.k.register(_c, "ParallaxTextOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProjectGrid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const PROJECTS = [
    {
        title: 'Galaxy Impact',
        description: 'Scroll-driven cinematic tribute site with canvas image sequences synced to scroll progress. Inspired by One Piece.',
        tags: [
            'Next.js',
            'Canvas API',
            'Framer Motion'
        ],
        accentColor: '#FF8C32',
        icon: '✦',
        year: '2024'
    },
    {
        title: 'Nexus Particle Engine',
        description: 'WebGL-powered interactive particle simulation with real-time mouse physics and 50k+ particle support.',
        tags: [
            'WebGL',
            'GLSL',
            'React'
        ],
        accentColor: '#6EE7F7',
        icon: '◈',
        year: '2024'
    },
    {
        title: 'Voxel Parallax World',
        description: '2D cinematic parallax landscape with day/night cycle transitions driven entirely by scroll position.',
        tags: [
            'React',
            'CSS Shaders',
            'Vite'
        ],
        accentColor: '#A78BFA',
        icon: '⬡',
        year: '2024'
    },
    {
        title: 'Galaxy Simulator',
        description: 'Real-time GPU-accelerated galaxy particle simulation with mouse-driven gravitational interactions.',
        tags: [
            'WebGL2',
            'GLSL',
            'TypeScript'
        ],
        accentColor: '#34D399',
        icon: '⊛',
        year: '2024'
    },
    {
        title: 'Fluid Shader Playground',
        description: 'Interactive fluid dynamics simulation using compute-style fragment shaders with touch/mouse support.',
        tags: [
            'GLSL',
            'WebGL',
            'Canvas'
        ],
        accentColor: '#F472B6',
        icon: '≋',
        year: '2024'
    },
    {
        title: 'Developer Portfolio',
        description: 'Dark-theme developer portfolio with animated sections, smooth scroll navigation, and project showcases.',
        tags: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        accentColor: '#FBBF24',
        icon: '◉',
        year: '2024'
    }
];
function ProjectCard({ project, index }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        amount: 0.2
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        ref: ref,
        initial: {
            opacity: 0,
            y: 48
        },
        animate: inView ? {
            opacity: 1,
            y: 0
        } : {
            opacity: 0,
            y: 48
        },
        transition: {
            duration: 0.75,
            ease: [
                0.22,
                1,
                0.36,
                1
            ],
            delay: index % 3 * 0.12
        },
        style: {
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '28px 24px 24px',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'default',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
        },
        whileHover: {
            y: -6,
            boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${project.accentColor}18`,
            borderColor: `${project.accentColor}40`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: 0,
                    left: '20%',
                    right: '20%',
                    height: '1px',
                    background: `linear-gradient(to right, transparent, ${project.accentColor}80, transparent)`
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ProjectGrid.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: '28px',
                            lineHeight: 1,
                            color: project.accentColor,
                            filter: `drop-shadow(0 0 8px ${project.accentColor}80)`
                        },
                        children: project.icon
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProjectGrid.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.25)'
                        },
                        children: project.year
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProjectGrid.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProjectGrid.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                style: {
                    fontFamily: "'Bebas Neue', 'Inter', sans-serif",
                    fontSize: 'clamp(20px, 4vw, 26px)',
                    fontWeight: 900,
                    letterSpacing: '0.06em',
                    color: '#fff',
                    marginBottom: '10px',
                    textShadow: `0 0 24px ${project.accentColor}40`
                },
                children: project.title
            }, void 0, false, {
                fileName: "[project]/src/components/ProjectGrid.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.55)',
                    marginBottom: '20px',
                    fontWeight: 400
                },
                children: project.description
            }, void 0, false, {
                fileName: "[project]/src/components/ProjectGrid.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px'
                },
                children: project.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: project.accentColor,
                            background: `${project.accentColor}15`,
                            border: `1px solid ${project.accentColor}30`,
                            borderRadius: '99px',
                            padding: '3px 10px',
                            lineHeight: 1.8
                        },
                        children: tag
                    }, tag, false, {
                        fileName: "[project]/src/components/ProjectGrid.tsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ProjectGrid.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProjectGrid.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_s(ProjectCard, "O7qYEn3iCrBBWRAefWku+E/MdDM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = ProjectCard;
function ProjectGrid() {
    _s1();
    const headingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const headingInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(headingRef, {
        once: true,
        amount: 0.4
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "projects",
        style: {
            position: 'relative',
            zIndex: 10,
            padding: 'clamp(64px, 10vw, 120px) clamp(20px, 5vw, 80px)',
            maxWidth: '1200px',
            margin: '0 auto'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: headingRef,
                style: {
                    textAlign: 'center',
                    marginBottom: 'clamp(40px, 7vw, 72px)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                        initial: {
                            opacity: 0,
                            y: 12
                        },
                        animate: headingInView ? {
                            opacity: 1,
                            y: 0
                        } : {},
                        transition: {
                            duration: 0.5
                        },
                        style: {
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.35em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,140,60,0.8)',
                            marginBottom: '16px',
                            textShadow: '0 2px 16px rgba(0,0,0,0.8)'
                        },
                        children: "Selected Work"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProjectGrid.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h2, {
                        initial: {
                            opacity: 0,
                            y: 32
                        },
                        animate: headingInView ? {
                            opacity: 1,
                            y: 0
                        } : {},
                        transition: {
                            duration: 0.85,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1
                            ],
                            delay: 0.1
                        },
                        style: {
                            fontFamily: "'Bebas Neue', 'Inter', sans-serif",
                            fontSize: 'clamp(42px, 8vw, 88px)',
                            fontWeight: 900,
                            letterSpacing: '0.04em',
                            color: '#fff',
                            lineHeight: 1,
                            textShadow: '0 0 60px rgba(255,120,50,0.3), 0 2px 24px rgba(0,0,0,0.98)'
                        },
                        children: "PROJECTS"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProjectGrid.tsx",
                        lineNumber: 224,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            scaleX: 0
                        },
                        animate: headingInView ? {
                            scaleX: 1
                        } : {},
                        transition: {
                            duration: 0.9,
                            delay: 0.3
                        },
                        style: {
                            width: '80px',
                            height: '2px',
                            background: 'linear-gradient(to right, transparent, rgba(255,140,60,0.8), transparent)',
                            margin: '20px auto 0'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProjectGrid.tsx",
                        lineNumber: 241,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProjectGrid.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                    gap: 'clamp(16px, 3vw, 28px)'
                },
                children: PROJECTS.map((project, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProjectCard, {
                        project: project,
                        index: i
                    }, project.title, false, {
                        fileName: "[project]/src/components/ProjectGrid.tsx",
                        lineNumber: 263,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ProjectGrid.tsx",
                lineNumber: 255,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProjectGrid.tsx",
        lineNumber: 191,
        columnNumber: 5
    }, this);
}
_s1(ProjectGrid, "jw9yAvSY46bJBlPafHsyX5Rxn3E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c1 = ProjectGrid;
var _c, _c1;
__turbopack_context__.k.register(_c, "ProjectCard");
__turbopack_context__.k.register(_c1, "ProjectGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_bfea876a._.js.map