from pathlib import Path
from playwright.sync_api import sync_playwright
import base64
p = Path(__file__).parent
html = (p/'index.html').read_text(encoding='utf-8')
replacements = {
    'assets/logo/kure-games-logo.png': 'data:image/png;base64,' + base64.b64encode((p/'assets/logo/kure-games-logo.png').read_bytes()).decode(),
    'assets/artworks/artwork-01.webp': 'data:image/webp;base64,' + base64.b64encode((p/'assets/artworks/artwork-01.webp').read_bytes()).decode(),
    'assets/artworks/artwork-02.webp': 'data:image/webp;base64,' + base64.b64encode((p/'assets/artworks/artwork-02.webp').read_bytes()).decode(),
}
for old, new in replacements.items():
    html = html.replace(old, new)
js = """() => ({
    width: innerWidth,
    fullWidth: document.documentElement.scrollWidth,
    slides: document.querySelectorAll('.scene-slide').length,
    controlsHidden: document.getElementById('carousel-controls').hidden,
    pending: document.querySelectorAll('[data-platform]:disabled').length,
    activeDots: document.querySelectorAll('.carousel-dot[aria-current=\"true\"]').length,
    activeSlide: document.querySelectorAll('.scene-slide.is-active').length
})"""
with sync_playwright() as play:
    browser = play.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox','--disable-dev-shm-usage'])
    for width, height, name in [(1440,900,'desktop'), (390,844,'mobile'), (360,740,'small-mobile')]:
        page = browser.new_page(viewport={'width': width, 'height': height}, device_scale_factor=1)
        errors=[]
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.set_content(html, wait_until='load')
        page.wait_for_timeout(350)
        page.screenshot(path=str(p/f'preview-{name}.png'), full_page=True)
        result = page.evaluate(js)
        print(name, result, errors)
        assert result['fullWidth'] <= width + 1
        assert result['slides'] == 2
        assert result['controlsHidden'] is False
        assert result['pending'] == 2
        assert result['activeDots'] == 1
        assert result['activeSlide'] == 1
        assert not errors
        page.close()
    browser.close()
print('PASS')
