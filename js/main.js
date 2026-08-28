document.body.classList.add('js-reveal');
    const revealItems = document.querySelectorAll('.section-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, {
      threshold: 0.18,
      rootMargin: '0px 0px -8% 0px'
    });
    revealItems.forEach((item) => revealObserver.observe(item));

    function makeDots(container, count, activeIndex, onClick) {
      container.innerHTML = '';
      for (let i = 0; i < count; i += 1) {
        const dot = document.createElement('button');
        dot.className = `dot${i === activeIndex ? ' active' : ''}`;
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => onClick(i));
        container.appendChild(dot);
      }
    }

    const heroSlides = [...document.querySelectorAll('.hero-slide')];
    const heroDots = document.querySelector('[data-hero-dots]');
    let heroIndex = 0;

    function setHero(index) {
      heroIndex = (index + heroSlides.length) % heroSlides.length;
      heroSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === heroIndex);
        slide.setAttribute('aria-hidden', i === heroIndex ? 'false' : 'true');
      });
      makeDots(heroDots, heroSlides.length, heroIndex, setHero);
    }

    document.querySelector('[data-hero-prev]').addEventListener('click', () => setHero(heroIndex - 1));
    document.querySelector('[data-hero-next]').addEventListener('click', () => setHero(heroIndex + 1));
    setHero(0);

    function pagerText(count, activeIndex) {
      return Array.from({ length: count }, (_, i) => i === activeIndex ? '✦' : '•').join(' ');
    }

    const newsItems = [
      { title: 'TGS 2026 Announcement', date: '2026.08.20', image: 'assets/image/news-featured-01.jpg' },
      { title: '[CBT] Frequently Asked Questions', date: '2026.08.19', image: 'assets/image/news-featured-02.jpg' },
      { title: 'Welcome to the Official Website', date: '2026.05.07', image: 'assets/image/news-featured-03.jpg' }
    ];
    const newsImage = document.querySelector('[data-news-image]');
    const newsTitle = document.querySelector('[data-news-title]');
    const newsDate = document.querySelector('[data-news-date]');
    const newsPager = document.querySelector('[data-news-pager]');
    let newsIndex = 0;

    function setNews(index) {
      newsIndex = (index + newsItems.length) % newsItems.length;
      const item = newsItems[newsIndex];
      newsImage.src = item.image;
      newsImage.alt = item.title;
      newsTitle.textContent = item.title;
      newsDate.textContent = item.date;
      newsPager.textContent = pagerText(newsItems.length, newsIndex);
    }

    document.querySelector('[data-news-prev]').addEventListener('click', () => setNews(newsIndex - 1));
    document.querySelector('[data-news-next]').addEventListener('click', () => setNews(newsIndex + 1));
    setNews(0);

    const worldData = [
      {
        title: 'Blue Tower',
        image: 'assets/image/world-01.jpg',
        quote: 'A sky-piercing tower where every door opens into a different fate.',
        body: 'The Blue Tower appears after the world fractures. Rei enters through the weakest blue door and finds a lobby where factions, relics, and lost travelers gather before climbing into unknown floors.'
      },
      {
        title: 'Entrance Lobby',
        image: 'assets/image/world-02.jpg',
        quote: 'A quiet ground floor where strangers become allies, rivals, or warnings.',
        body: 'The lobby is the first safe place inside the tower. Here, summoned people trade rumors, prepare decks, choose routes, and decide which faction door is worth trusting.'
      },
      {
        title: 'Faction Doors',
        image: 'assets/image/world-03.jpg',
        quote: 'Color, crest, and oath decide how a climber survives.',
        body: 'Each door represents a faction identity and battle style. Blue favors direct strength, White protects and restores, Black spreads fear and summons, while other doors twist combat through buffs, debuffs, and risk.'
      }
    ];
    const worldStage = document.querySelector('[data-world-stage]');
    const worldDots = document.querySelector('[data-world-dots]');
    const worldCopy = document.querySelector('[data-world-copy]');
    let worldIndex = 1;

    function renderWorld(index, animate = false) {
      worldIndex = (index + worldData.length) % worldData.length;
      if (animate) {
        worldStage.classList.add('is-changing');
      }
      const updateCards = () => {
        worldStage.innerHTML = '';
        const order = [worldIndex - 1, worldIndex, worldIndex + 1].map((i) => (i + worldData.length) % worldData.length);
        order.forEach((dataIndex) => {
          const item = worldData[dataIndex];
          const card = document.createElement('article');
          card.className = `world-card${dataIndex === worldIndex ? ' active' : ''}`;
          card.innerHTML = `<h3>${item.title}</h3><img src="${item.image}" alt="${item.title}">`;
          worldStage.appendChild(card);
        });
        const active = worldData[worldIndex];
        worldCopy.innerHTML = `<h3>${active.title}</h3><blockquote>&quot;${active.quote}&quot;</blockquote><p>${active.body}</p>`;
        makeDots(worldDots, worldData.length, worldIndex, (dotIndex) => renderWorld(dotIndex, true));
        requestAnimationFrame(() => {
          worldStage.classList.remove('is-changing');
        });
      };
      if (animate) {
        setTimeout(updateCards, 220);
      } else {
        updateCards();
      }
    }

    document.querySelector('[data-world-prev]').addEventListener('click', () => renderWorld(worldIndex - 1, true));
    document.querySelector('[data-world-next]').addEventListener('click', () => renderWorld(worldIndex + 1, true));
    renderWorld(worldIndex);

    const characters = [
      { name: 'Vita Neri', group: '✦ Ashen Dawn', art: 'assets/image/character-01.png', thumb: 'assets/image/character-thumb-01.jpg', symbol: 'assets/image/faction-symbol-01.png', bg: 'assets/image/character-bg-01.png' },
      { name: 'Character Two', group: '✦ Black Archive', art: 'assets/image/character-02.png', thumb: 'assets/image/character-thumb-02.jpg', symbol: 'assets/image/faction-symbol-02.png', bg: 'assets/image/character-bg-02.png' },
      { name: 'Character Three', group: '✦ Student Council', art: 'assets/image/character-03.png', thumb: 'assets/image/character-thumb-03.jpg', symbol: 'assets/image/faction-symbol-03.png', bg: 'assets/image/character-bg-03.png' }
    ];
    const characterBg = document.querySelector('[data-character-bg]');
    const characterArt = document.querySelector('[data-character-art]');
    const characterSymbol = document.querySelector('[data-character-symbol]');
    const characterInfo = document.querySelector('[data-character-info]');
    const characterName = document.querySelector('[data-character-name]');
    const characterGroup = document.querySelector('[data-character-group]');
    const characterThumbs = document.querySelector('[data-character-thumbs]');
    const characterDots = document.querySelector('[data-character-dots]');
    let characterIndex = 0;

    function renderCharacterThumbs() {
      characterThumbs.innerHTML = '';
      characters.forEach((character, i) => {
        const button = document.createElement('button');
        button.className = `thumb${i === characterIndex ? ' active' : ''}`;
        button.type = 'button';
        button.innerHTML = `<img src="${character.thumb}" alt="${character.name} thumbnail">`;
        button.addEventListener('click', () => setCharacter(i));
        characterThumbs.appendChild(button);
      });
      makeDots(characterDots, characters.length, characterIndex, setCharacter);
    }

    function setCharacter(index) {
      index = (index + characters.length) % characters.length;
      if (index === characterIndex) return;
      characterIndex = index;
      const character = characters[characterIndex];
      characterArt.classList.add('switching');
      characterInfo.classList.add('switching');
      setTimeout(() => {
        characterArt.querySelector('img').src = character.art;
        characterArt.querySelector('img').alt = `${character.name} artwork`;
        characterSymbol.style.backgroundImage = `url("${character.symbol}")`;
        characterBg.style.backgroundImage = `url("${character.bg}")`;
        characterName.textContent = character.name;
        characterGroup.textContent = character.group;
        renderCharacterThumbs();
        requestAnimationFrame(() => {
          characterArt.classList.remove('switching');
          characterInfo.classList.remove('switching');
        });
      }, 260);
    }

    renderCharacterThumbs();
    characterBg.style.backgroundImage = `url("${characters[characterIndex].bg}")`;
    const characterPrev = document.querySelector('[data-character-prev]');
    const characterNext = document.querySelector('[data-character-next]');
    characterPrev.addEventListener('click', (event) => {
      event.preventDefault();
      setCharacter(characterIndex - 1);
    });
    characterNext.addEventListener('click', (event) => {
      event.preventDefault();
      setCharacter(characterIndex + 1);
    });

    const videoItems = [
      { title: 'Character Introduction PV', image: 'assets/image/media-video-01.jpg' },
      { title: 'Teaser PV', image: 'assets/image/media-video-02.jpg' },
      { title: 'Super Teaser PV', image: 'assets/image/media-video-03.jpg' },
      { title: 'Story PV', image: 'assets/image/media-video-04.jpg' },
      { title: 'Gameplay PV', image: 'assets/image/media-video-05.jpg' }
    ];
    const videoImages = [...document.querySelectorAll('[data-video-card-image]')];
    const videoTitles = [...document.querySelectorAll('[data-video-card-title]')];
    const videoPager = document.querySelector('[data-video-pager]');
    let videoIndex = 0;

    function renderVideoCards(index) {
      videoIndex = (index + videoItems.length) % videoItems.length;
      videoImages.forEach((image, slot) => {
        const item = videoItems[(videoIndex + slot) % videoItems.length];
        image.src = item.image;
        image.alt = item.title;
        videoTitles[slot].textContent = item.title;
      });
      videoPager.textContent = pagerText(videoItems.length, videoIndex);
    }

    document.querySelector('[data-video-prev]').addEventListener('click', () => renderVideoCards(videoIndex - 1));
    document.querySelector('[data-video-next]').addEventListener('click', () => renderVideoCards(videoIndex + 1));
    renderVideoCards(0);

    const assetItems = [
      { title: 'Visual Title', tag: 'Visuals', image: 'assets/image/media-asset-01.jpg' },
      { title: 'Concept Art', tag: 'Visuals', image: 'assets/image/media-asset-02.jpg' },
      { title: 'Comic Title', tag: 'Comics', image: 'assets/image/media-asset-03.jpg' },
      { title: 'Story Arc', tag: 'Comics', image: 'assets/image/media-asset-04.jpg' },
      { title: 'Official Stamp', tag: 'Stamps', image: 'assets/image/media-asset-05.jpg' },
      { title: 'Special Wallpaper', tag: 'Visuals', image: 'assets/image/media-asset-06.jpg' }
    ];
    const assetImages = [...document.querySelectorAll('[data-asset-card-image]')];
    const assetTags = [...document.querySelectorAll('[data-asset-card-tag]')];
    const assetTitles = [...document.querySelectorAll('[data-asset-card-title]')];
    const assetPager = document.querySelector('[data-asset-pager]');
    let assetIndex = 0;

    function renderAssetCards(index) {
      assetIndex = (index + assetItems.length) % assetItems.length;
      assetImages.forEach((image, slot) => {
        const item = assetItems[(assetIndex + slot) % assetItems.length];
        image.src = item.image;
        image.alt = item.title;
        assetTags[slot].textContent = item.tag;
        assetTitles[slot].textContent = item.title;
      });
      assetPager.textContent = pagerText(assetItems.length, assetIndex);
    }

    document.querySelector('[data-asset-prev]').addEventListener('click', () => renderAssetCards(assetIndex - 1));
    document.querySelector('[data-asset-next]').addEventListener('click', () => renderAssetCards(assetIndex + 1));
    renderAssetCards(0);

    const modal = document.querySelector('[data-video-modal]');
    const video = modal.querySelector('video');
    document.querySelectorAll('[data-open-video]').forEach((button) => {
      button.addEventListener('click', () => {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        video.currentTime = 0;
        video.play().catch(() => {});
      });
    });
    document.querySelector('[data-close-video]').addEventListener('click', () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      video.pause();
    });
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        video.pause();
      }
    });
