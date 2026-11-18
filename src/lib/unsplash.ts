/** Build an Unsplash image URL from a photo id. */
export function unsplash(id: string, width = 1600) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}`;
}

/** 4:5 crop of a photo, optionally zoomed into a focal point (x, y in 0..1). */
export function unsplashPortrait(
  id: string,
  width: number,
  focus?: { x: number; y: number; zoom: number },
) {
  const height = Math.round(width * 1.25);
  const base = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&h=${height}`;
  return focus
    ? `${base}&crop=focalpoint&fp-x=${focus.x}&fp-y=${focus.y}&fp-z=${focus.zoom}`
    : base;
}
