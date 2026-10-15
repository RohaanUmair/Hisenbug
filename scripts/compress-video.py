"""Compress a source clip into small web-ready MP4 + WebM files (muted, looping-friendly).

Usage: python scripts/compress-video.py public/barchart-video.mp4 public/media/bar-chart --width 640 --fps 24 --poster
Needs: pip install imageio-ffmpeg  (bundles an ffmpeg binary)
"""
import argparse, os, subprocess
import imageio_ffmpeg

ap = argparse.ArgumentParser()
ap.add_argument('src'); ap.add_argument('out_base')
ap.add_argument('--width', type=int, default=640)
ap.add_argument('--fps', type=int, default=24)
ap.add_argument('--crf', type=int, default=30)
ap.add_argument('--poster', action='store_true')
a = ap.parse_args()

ff = imageio_ffmpeg.get_ffmpeg_exe()
os.makedirs(os.path.dirname(a.out_base) or '.', exist_ok=True)
vf = f'scale={a.width}:-2,fps={a.fps}'
base = [ff, '-hide_banner', '-loglevel', 'error', '-y', '-i', a.src, '-an', '-vf', vf]
subprocess.run(base + ['-c:v', 'libx264', '-preset', 'slow', '-crf', str(a.crf), '-pix_fmt', 'yuv420p', '-movflags', '+faststart', a.out_base + '.mp4'], check=True)
subprocess.run(base + ['-c:v', 'libvpx-vp9', '-crf', str(a.crf + 4), '-b:v', '0', '-row-mt', '1', a.out_base + '.webm'], check=True)
if a.poster:
    subprocess.run([ff, '-hide_banner', '-loglevel', 'error', '-y', '-i', a.src, '-frames:v', '1', '-vf', f'scale={a.width}:-2', '-q:v', '4', a.out_base + '.jpg'], check=True)
for ext in ('mp4', 'webm', 'jpg'):
    p = f'{a.out_base}.{ext}'
    if os.path.exists(p): print(p, round(os.path.getsize(p) / 1024), 'KB')
