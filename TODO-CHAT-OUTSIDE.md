# Click Outside to Close Chat TODO

- [x] Add useRef<HTMLDivElement>(null) for chatRef
- [x] Add useEffect with mousedown/touchstart listener to setIsOpen(false) if outside
- [x] Attach ref={chatRef} to motion.div container (chat box, exclude toggle button)
- [x] Vite HMR test: open chat, click outside -> closes smoothly; clicks inside ok (logs x14)
- [x] Added scroll useEffect (window scroll closes chat)
- [x] Complete ✅
**Implementation:**
1. Added `const chatRef = useRef<HTMLDivElement>(null);`
2. Added useEffect listener for mousedown/touchstart (closes if outside)
3. Added scroll useEffect for window scroll
4. Added `ref={chatRef}` to `<motion.div>` (chat box)
Toggle button outside ref, scroll inside chat preserved, TS safe.

