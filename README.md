# Website Index Template

Open `index.html` in a browser to preview the page.

Add your images and video into:

```text
assets/image/
```

## Required Asset Names

```text
logo.png

main-wallpaper-01.jpg
main-wallpaper-02.jpg
main-wallpaper-03.jpg

world-01.jpg
world-02.jpg
world-03.jpg
world-04.jpg

character-01.png
character-02.png
character-03.png

character-thumb-01.jpg
character-thumb-02.jpg
character-thumb-03.jpg

faction-symbol-01.png
faction-symbol-02.png
faction-symbol-03.png

character-bg-01.png
character-bg-02.png
character-bg-03.png

news-featured-01.jpg
news-featured-02.jpg
news-featured-03.jpg

media-video-01.jpg
media-video-02.jpg
media-video-03.jpg
media-video-04.jpg
media-video-05.jpg

media-asset-01.jpg
media-asset-02.jpg
media-asset-03.jpg
media-asset-04.jpg
media-asset-05.jpg
media-asset-06.jpg

light-map-bg.jpg
dark-texture-bg.jpg

video-01.mp4
```

## Recommended Character Image Sizes

```text
Full character image: 1400 x 1800 px
Thumbnail image:      144 x 270 px
```

## Recommended World Image Sizes

```text
World carousel image: 1920 x 900 px
Safe minimum:         1600 x 900 px
```

## Character Artwork Position / Scale

Edit this in `css/style.css`:

```css
.character-art img {
  transform: scale(var(--character-scale, 2)) translateX(var(--character-offset-x, -10%)) translateY(var(--character-offset-y, 15%));
}
```

Recommended values:

```text
Bust-up / closer:     --character-scale: 1.6 to 2.2
Fuller body:          --character-scale: 0.95 to 1.3
Move left/right:      --character-offset-x
Move up/down:         --character-offset-y
```

## Current Behavior

- Section order: `Main > World > Characters > News > Media`.
- Main carousel changes wallpaper images only.
- Main play button always opens `video-01.mp4`.
- Character arrows and thumbnails change character.
- Section animation resets when scrolled out and replays when scrolled in.

## Dummy Assets

This package includes dummy placeholder images so you can match sizes and composition.

Replace each dummy file with your final image using the same filename.
