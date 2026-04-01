"use strict";
console.log("[jSec] Starting...");
import $ from 'jquery';

const jSecRenderer = (function () {

    let currentSections = [];
    let currentLabel = 'Posts';
    let currentPage = 1;
    const POSTS_PER_PAGE = 5;
    const $mainContent = $('#main-content');

    /* ===============================
    Inline Rainbow Parser
    =============================== */
    function parseRainbow(text, $el) {
        const parts = text.split(/==(.*?)==/);
        parts.forEach((part, i) => {
            if (i % 2 === 1) {
                $el.append($('<span class="rainbow-animated"></span>').text(part));
            } else if (part) {
                $el.append(document.createTextNode(part));
            }
        });
        return $el;
    }

    /* ===============================
    Helper: Render Author with SVG if admin
    =============================== */
    function renderAuthor(authorName) {
        const adminMatch = /%admin%$/i.test(authorName);
        if (adminMatch) {
            const $span = $('<span class="blog-card-author"></span>');
            $span.html(`${authorName.replace(/%admin%$/i, '')} <img src="https://s3.wagger.dev/uploads/c02210e09a8ba8a809487de3b4d7a17e00f551aa5b8e35e519c61e2cda1dbb1a.svg" alt="ADMIN" class="author-svg" />`);
            return $span;
        } else {
            return $('<span class="blog-card-author"></span>').text(authorName);
        }
    }

    /* ===============================
    Render Blog Card List (with pagination)
    =============================== */
    function renderBlogList(sections, label, page = 1) {
        history.replaceState(null, '', window.location.pathname);
        $mainContent.empty();

        currentPage = page;

        const totalPages = Math.ceil(sections.length / POSTS_PER_PAGE);
        const startIdx = (page - 1) * POSTS_PER_PAGE;
        const pageSections = sections.slice(startIdx, startIdx + POSTS_PER_PAGE);

        const $feed = $('<div class="blog-feed"></div>');
        const $feedLabel = $('<h2 id="feed-party-grab" class="feed-label"></h2>').text(label || 'Posts');
        $feed.append($feedLabel);

        pageSections.forEach((section) => {
            const $card = $('<article class="blog-card"></article>');
            const $body = $('<div class="blog-card-body"></div>');

            /* --- Meta --- */
            const $meta = $('<div class="blog-card-meta"></div>');
            if (section.date) {
                $meta.append($('<time class="blog-card-date"></time>').text(section.date));
            }
            if (section.author) {
                $meta.append(renderAuthor(section.author));
            }
            if (section.date || section.author) {
                $body.append($meta);
            }

            /* --- Title --- */
            if (section.title) {
                $body.append(parseRainbow(section.title, $('<h3 class="blog-card-title"></h3>')));
            }

            /* --- Description --- */
            if (section.description) {
                const stripped = section.description.replace(/==(.*?)==/g, '$1');
                const excerpt = stripped.length > 160
                    ? stripped.slice(0, 160).trimEnd() + '…'
                    : section.description;

                $body.append(parseRainbow(excerpt, $('<p class="blog-card-excerpt"></p>')));
            }

            /* --- Bottom Row --- */
            const $bottom = $('<div class="blog-card-bottom"></div>');

            if (section.videoSrc) {
                $bottom.append($('<div class="blog-card-video-preview">(+Video)</div>'));
            }

            const $readMore = $('<a class="blog-read-more" href="#">Weiterlesen →</a>');
            $readMore.on('click', (e) => {
                e.preventDefault();
                renderArticle(section, sections, label);
            });

            $bottom.append($readMore);
            $body.append($bottom);
            $card.append($body);
            $feed.append($card);
        });

        /* --- Pagination --- */
        if (totalPages > 1) {
            const $pagination = $('<div class="blog-pagination"></div>');

            if (page > 1) {
                const $prev = $('<button class="blog-page-btn">← Zurück</button>');
                $prev.on('click', () => renderBlogList(sections, label, page - 1));
                $pagination.append($prev);
            }

            $pagination.append(
                $('<span class="blog-page-info"></span>')
                    .text(`Seite ${page} / ${totalPages}`)
            );

            if (page < totalPages) {
                const $next = $('<button class="blog-page-btn">Weiter →</button>');
                $next.on('click', () => renderBlogList(sections, label, page + 1));
                $pagination.append($next);
            }

            $feed.append($pagination);
        }

        $mainContent.append($feed);
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        console.log(`[jSec] Blog list rendered (page ${page}/${totalPages}).`);
    }

    /* ===============================
    Render Single Article
    =============================== */
    function renderArticle(section, sections, label) {
        history.replaceState(null, '', '#/' + section.id);
        $mainContent.empty();

        const $article = $('<article class="blog-article"></article>');

        /* --- Back --- */
        const savedPage = currentPage;
        const $back = $('<button class="blog-back-btn">← Zurück</button>');
        $back.on('click', () => renderBlogList(sections, label, savedPage));
        $article.append($back);

        /* --- Hero --- */
        if (section.imgSrc) {
            const $heroWrapper = $('<div class="blog-article-hero-wrapper"></div>');
            const $hero = $('<img class="blog-article-hero">')
                .attr('src', section.imgSrc)
                .attr('alt', section.imgAlt || '');
            $heroWrapper.append($hero);
            $article.append($heroWrapper);
        }

        function toEmbedUrl(url) {
            const match = url.match(/v=([^&]+)/);
            if (match) {
                console.log("Konvertiere " + url + "...");
                console.log("Ergebnis:" + match);
                return `https://www.youtube.com/embed/${match[1]}`;
            }
            return url;
        }
        /* --- Video --- */
        if (section.videoSrc) {
            const $videoWrapper = $('<div class="blog-article-video"></div>');

            if (section.videoType === 'mp4') {
                const $video = $('<video controls class="blog-article-video-player"></video>');
                $video.append($('<source>', {
                    src: section.videoSrc,
                    type: 'video/mp4'
                }));
                $videoWrapper.append($video);
            } else {
                $videoWrapper.append($('<iframe>', {
                    src: toEmbedUrl(section.videoSrc),
                    frameborder: 0,
                    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                    allowfullscreen: true
                }));
            }

            $article.append($videoWrapper);
        }

        /* --- Meta --- */
        const $meta = $('<div class="blog-article-meta"></div>');
        if (section.date) {
            $meta.append($('<time></time>').text(section.date));
        }
        if (section.author) {
            $meta.append(renderAuthor(section.author));
        }
        if (section.date || section.author) {
            $article.append($meta);
        }

        /* --- Title --- */
        if (section.title) {
            $article.append(parseRainbow(section.title, $('<h1 class="blog-article-title"></h1>')));
        }

        $article.append($('<hr class="blog-article-divider">'));

        /* --- Content --- */
        if (section.description) {
            const $content = $('<div class="blog-article-content"></div>');
            section.description.split(/\n\n+/).forEach(para => {
                $content.append(parseRainbow(para, $('<p></p>')));
            });
            $article.append($content);
        }

        $mainContent.append($article);
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        console.log("[jSec] Article rendered.");
    }

    /* ===============================
    Routing
    =============================== */
    window.addEventListener('hashchange', () => {
        const match = window.location.hash.match(/^#\/(\d+)$/);
        if (match) {
            const id = parseInt(match[1]);
            const target = currentSections.find(s => s.id === id);
            if (target) {
                renderArticle(target, currentSections, currentLabel);
                return;
            }
        }
        renderBlogList(currentSections, currentLabel, currentPage);
    });

    /* ===============================
    Public API
    =============================== */
    return {
        setSections(sections, label) {
            currentSections = sections;
            currentLabel = label || 'Posts';
            renderBlogList(currentSections, currentLabel, 1);
        },
        initialize(sections, label) {
            currentSections = sections;
            currentLabel = label || 'Die neuesten Nachrichten aus Bulettien';

            const match = window.location.hash.match(/^#\/(\d+)$/);
            if (match) {
                const id = parseInt(match[1]);
                const target = sections.find(s => s.id === id);
                if (target) {
                    renderArticle(target, currentSections, currentLabel);
                    return;
                }
            }

            renderBlogList(currentSections, currentLabel, 1);
        }
    };

})();

export default jSecRenderer;