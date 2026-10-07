"""Generate compact WebP assets while preserving original PNG files."""
from pathlib import Path
from PIL import Image

directory = Path(__file__).resolve().parents[1] / 'public' / 'images'
names = ['logo', 'nenwebmoi', 'hero-giftbox', 'green-rice-cake',
         'green-rice-cake0', 'preserved-fruit', 'preserved-fruit0',
         'bavi-milk-cakes', 'bavi-milk-cakes0', 'lotus-tea', 'lotus-tea0']
before = after = 0
for name in names:
    source = directory / f'{name}.png'
    target = directory / f'{name}.webp'
    with Image.open(source) as image:
        image.thumbnail((1920, 1920) if name == 'nenwebmoi' else
                        (256, 256) if name == 'logo' else (1200, 1200))
        image.save(target, 'WEBP', quality=84, method=6)
    before += source.stat().st_size
    after += target.stat().st_size
print(f'Referenced images: {before / 1e6:.2f} MB -> {after / 1e6:.2f} MB ({(1-after/before)*100:.1f}% smaller)')
