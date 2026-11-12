"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface LightboxItem {
  type: "image" | "video";
  src: string;
}

const MAX_SCALE = 4;
const CLICK_SCALE = 2.5;
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

// Full-screen viewer for product / review photos and videos.
//  - photos: click or double-tap to zoom in/out (on the spot you clicked),
//    mouse wheel or two-finger pinch to zoom, drag to pan while zoomed,
//    drag/swipe sideways (when not zoomed) to go to the next photo;
//  - videos: plain player with controls;
//  - Esc or a click on the dark backdrop closes; ← → switch items.
export function MediaLightbox({
  items,
  startIndex = 0,
  onClose,
}: {
  items: LightboxItem[];
  startIndex?: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [gesturing, setGesturing] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const drag = useRef<{ x: number; y: number; tx: number; ty: number; moved: boolean } | null>(null);
  const pinch = useRef<{ dist: number; scale: number } | null>(null);
  const item = items[index];

  const reset = useCallback(() => {
    setScale(1);
    setTx(0);
    setTy(0);
  }, []);

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + items.length) % items.length);
      reset();
    },
    [items.length, reset],
  );

  // Keyboard + body scroll lock.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && items.length > 1) go(1);
      else if (e.key === "ArrowLeft" && items.length > 1) go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [go, onClose, items.length]);

  function limit(nextTx: number, nextTy: number, s: number) {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return [nextTx, nextTy] as const;
    const maxX = (rect.width * (s - 1)) / 2;
    const maxY = (rect.height * (s - 1)) / 2;
    return [clamp(nextTx, -maxX, maxX), clamp(nextTy, -maxY, maxY)] as const;
  }

  function zoomTo(s: number, clientX?: number, clientY?: number) {
    const rect = stageRef.current?.getBoundingClientRect();
    if (s <= 1 || !rect || clientX === undefined || clientY === undefined) {
      reset();
      return;
    }
    // Keep the point under the cursor in place.
    const ox = clientX - (rect.left + rect.width / 2);
    const oy = clientY - (rect.top + rect.height / 2);
    const [x, y] = limit(-ox * (s - 1), -oy * (s - 1), s);
    setScale(s);
    setTx(x);
    setTy(y);
  }

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    setGesturing(true);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y) || 1, scale };
      drag.current = null;
    } else {
      drag.current = { x: e.clientX, y: e.clientY, tx, ty, moved: false };
    }
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const s = clamp((pinch.current.scale * Math.hypot(a.x - b.x, a.y - b.y)) / pinch.current.dist, 1, MAX_SCALE);
      const [x, y] = limit(tx, ty, s);
      setScale(s);
      setTx(s === 1 ? 0 : x);
      setTy(s === 1 ? 0 : y);
      return;
    }
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 6) d.moved = true;
    if (scale > 1) {
      const [x, y] = limit(d.tx + dx, d.ty + dy, scale);
      setTx(x);
      setTy(y);
    }
  }

  function onPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size === 0) setGesturing(false);
    if (pinch.current) {
      if (pointers.current.size < 2) pinch.current = null;
      drag.current = null;
      return;
    }
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (scale === 1 && d.moved && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.2 && items.length > 1) {
      go(dx < 0 ? 1 : -1);
    } else if (!d.moved) {
      if (scale > 1) reset();
      else zoomTo(CLICK_SCALE, e.clientX, e.clientY);
    }
  }

  function onWheel(e: React.WheelEvent<HTMLDivElement>) {
    const s = clamp(scale * (e.deltaY < 0 ? 1.15 : 0.87), 1, MAX_SCALE);
    if (s === 1) reset();
    else zoomTo(s, e.clientX, e.clientY);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Penampil foto"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        aria-label="Tutup"
        onClick={onClose}
        className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
      >
        <X className="size-6" />
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Sebelumnya"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 sm:flex"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            aria-label="Berikutnya"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 sm:flex"
          >
            <ChevronRight className="size-6" />
          </button>
          <span className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/15 px-3 py-1 text-sm text-white">
            {index + 1} / {items.length}
          </span>
        </>
      )}

      {item.type === "video" ? (
        <video
          key={item.src}
          src={item.src}
          controls
          autoPlay
          playsInline
          className="max-h-[85vh] max-w-[94vw] rounded-md"
        />
      ) : (
        <div
          ref={stageRef}
          className={`relative h-[85vh] w-[94vw] max-w-5xl touch-none select-none ${scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onWheel={onWheel}
          onDoubleClick={(e) => e.preventDefault()}
        >
          <div
            className="absolute inset-0 will-change-transform"
            style={{
              transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
              transition: gesturing ? "none" : "transform 160ms ease-out",
            }}
          >
            <Image
              key={item.src}
              src={item.src}
              alt=""
              fill
              unoptimized
              sizes="100vw"
              className="object-contain"
              draggable={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}
