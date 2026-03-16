"use strict";
    console.log("[jSec] Starting...");
    import $ from 'jquery';

    const jSecRenderer = (function() {

        let currentSections = [];
        let currentLabel = 'Posts';
        const $mainContent = $('#main-content');

        /* ===============================
        Render Blog Card List
        =============================== */
        function renderBlogList(sections, label) {
            $mainContent.empty();

            const $feed = $('<div class="blog-feed"></div>');
            const $feedLabel = $('<h2 class="feed-label"></h2>').text(label || 'Posts');
            $feed.append($feedLabel);

            sections.forEach((section) => {

                const $card = $('<article class="blog-card"></article>');
                const $body = $('<div class="blog-card-body"></div>');

                /* --- Meta --- */
                const $meta = $('<div class="blog-card-meta"></div>');
                if (section.date) {
                    $meta.append($('<time class="blog-card-date"></time>').text(section.date));
                }
                if (section.author) {
                    $meta.append($('<span class="blog-card-author"></span>').text(section.author));
                }
                if (section.date || section.author) {
                    $body.append($meta);
                }

                /* --- Title --- */
                if (section.title) {
                    $body.append(
                        $('<h3 class="blog-card-title"></h3>').text(section.title)
                    );
                }

                /* --- Description / Excerpt --- */
                if (section.description) {
                    const excerpt = section.description.length > 160
                        ? section.description.slice(0, 160).trimEnd() + '…'
                        : section.description;

                    $body.append(
                        $('<p class="blog-card-excerpt"></p>').text(excerpt)
                    );
                }

                /* --- Bottom Row --- */
                const $bottom = $('<div class="blog-card-bottom"></div>');

                /* Video indicator if videoSrc exists */
                if (section.videoSrc) {
                    const $videoPreview = $(
                        '<div class="blog-card-video-preview">(+Video)</div>'
                    );
                    $bottom.append($videoPreview);
                }

                /* Read More */
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

            $mainContent.append($feed);
            $('html, body').animate({ scrollTop: 0 }, 'fast');

            console.log("[jSec] Blog list rendered.");
        }

        /* ===============================
        Render Single Article
        =============================== */
        function renderArticle(section, sections, label) {

            $mainContent.empty();
            const $article = $('<article class="blog-article"></article>');

            /* --- Back Button --- */
            const $back = $('<button class="blog-back-btn">← Zurück</button>');
            $back.on('click', () => renderBlogList(sections, label));
            $article.append($back);

            /* --- Hero Image --- */
            if (section.imgSrc) {
                const $heroWrapper = $('<div class="blog-article-hero-wrapper"></div>');
                const $hero = $('<img class="blog-article-hero">')
                    .attr('src', section.imgSrc)
                    .attr('alt', section.imgAlt || '');
                $heroWrapper.append($hero);
                $article.append($heroWrapper);
            }

            /* --- Video Rendering --- */
            if (section.videoSrc) {

                const $videoWrapper = $('<div class="blog-article-video"></div>');

                if (section.videoType === 'mp4') {

                    const $video = $('<video controls class="blog-article-video-player"></video>');
                    $video.append(
                        $('<source>', {
                            src: section.videoSrc,
                            type: 'video/mp4'
                        })
                    );
                    $videoWrapper.append($video);

                } else {
                    // Default: embed (YouTube etc.)
                    const $iframe = $('<iframe>', {
                        src: section.videoSrc,
                        frameborder: 0,
                        allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                        allowfullscreen: true
                    });
                    $videoWrapper.append($iframe);
                }

                $article.append($videoWrapper);
            }

            /* --- Meta --- */
            const $articleMeta = $('<div class="blog-article-meta"></div>');
            if (section.date) {
                $articleMeta.append(
                    $('<time class="blog-article-date"></time>').text(section.date)
                );
            }
            if (section.author) {
                $articleMeta.append(
                    $('<span class="blog-article-author"></span>').text(section.author)
                );
            }
            if (section.date || section.author) {
                $article.append($articleMeta);
            }

            /* --- Title --- */
            if (section.title) {
                $article.append(
                    $('<h1 class="blog-article-title"></h1>').text(section.title)
                );
            }

            /* --- Divider --- */
            $article.append($('<hr class="blog-article-divider">'));

            /* --- Full Content --- */
            if (section.description) {
                const paragraphs = section.description.split(/\n\n+/);
                const $content = $('<div class="blog-article-content"></div>');

                paragraphs.forEach(para => {
                    $content.append($('<p></p>').text(para));
                });

                $article.append($content);
            }

            /* --- Optional Action Button --- */
            if (section.showButton && section.buttonText) {

                const $btn = $('<button class="blog-action-btn"></button>')
                    .text(section.buttonText);

                if (section.disabled) {
                    $btn.prop('disabled', true);

                } else if (section.buttonAction) {
                    $btn.on('click', section.buttonAction);

                } else if (section.buttonLink) {
                    $btn.on('click', () => {
                        window.location.href = section.buttonLink;
                    });
                }

                $article.append($btn);
            }

            $mainContent.append($article);
            $('html, body').animate({ scrollTop: 0 }, 'fast');

            console.log("[jSec] Article rendered.");
        }

        /* ===============================
        Public API
        =============================== */
        return {

            setSections: function(sections, label) {
                currentSections = sections;
                currentLabel = label || 'Posts';
                renderBlogList(currentSections, currentLabel);
            },

            initialize: function(sections, label) {
                currentSections = sections;
                currentLabel = label || 'Die neuesten Nachrichten aus Bulettien';
                renderBlogList(currentSections, currentLabel);
            }
        };

    })();

export default jSecRenderer;