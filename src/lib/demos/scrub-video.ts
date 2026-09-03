/**
 * Prepara un <video> para scrub por scroll en Safari iOS.
 * Sin play() mudo previo, loadeddata/seek a menudo no pintan frames.
 */
export async function primeVideoForScrub(
  video: HTMLVideoElement,
): Promise<boolean> {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "true");
  video.setAttribute("webkit-playsinline", "true");
  video.preload = "auto";

  if (video.error) return false;

  await waitForDecodable(video);

  try {
    await video.play();
    video.pause();
    if (video.currentTime > 0.001) {
      video.currentTime = 0;
    }
  } catch {
    // Autoplay bloqueado: el caller reintenta tras el primer gesto.
    return video.readyState >= 2;
  }

  return video.readyState >= 2;
}

function waitForDecodable(video: HTMLVideoElement): Promise<void> {
  if (video.readyState >= 2) return Promise.resolve();

  return new Promise((resolve, reject) => {
    let settled = false;

    function done() {
      if (settled) return;
      settled = true;
      cleanup();
      resolve();
    }

    function fail() {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error("video load failed"));
    }

    function cleanup() {
      video.removeEventListener("loadedmetadata", done);
      video.removeEventListener("loadeddata", done);
      video.removeEventListener("canplay", done);
      video.removeEventListener("error", fail);
      window.clearTimeout(timer);
    }

    video.addEventListener("loadedmetadata", done);
    video.addEventListener("loadeddata", done);
    video.addEventListener("canplay", done);
    video.addEventListener("error", fail);

    try {
      video.load();
    } catch {
      // ignore
    }

    const timer = window.setTimeout(() => {
      if (video.readyState >= 1) done();
      else fail();
    }, 8000);
  });
}

/** Reintenta prime en el primer gesto del usuario (iOS). */
export function onFirstUserGesture(retry: () => void): () => void {
  const opts = { passive: true, once: true } as const;
  const run = () => retry();
  window.addEventListener("touchstart", run, opts);
  window.addEventListener("pointerdown", run, opts);
  window.addEventListener("scroll", run, opts);
  return () => {
    window.removeEventListener("touchstart", run);
    window.removeEventListener("pointerdown", run);
    window.removeEventListener("scroll", run);
  };
}
