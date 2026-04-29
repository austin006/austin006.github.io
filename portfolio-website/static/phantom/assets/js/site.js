(function () {
	var storageKey = "preferred-theme";
	var root = document.documentElement;
	var mediaQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
	var mediaListenerBound = false;

	function readStoredTheme() {
		try {
			return window.localStorage.getItem(storageKey);
		} catch (error) {
			return null;
		}
	}

	function writeStoredTheme(theme) {
		try {
			window.localStorage.setItem(storageKey, theme);
		} catch (error) {
			return;
		}
	}

	function getPreferredTheme() {
		var storedTheme = readStoredTheme();
		if (storedTheme === "light" || storedTheme === "dark") {
			return storedTheme;
		}

		return mediaQuery && mediaQuery.matches ? "dark" : "light";
	}

	function updateThemeToggleButtons(theme) {
		var isDark = theme === "dark";
		var buttons = document.querySelectorAll("[data-theme-toggle]");

		buttons.forEach(function (button) {
			var label = button.querySelector(".theme-toggle__label");
			button.setAttribute("aria-pressed", isDark ? "true" : "false");
			button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
			if (label) {
				label.textContent = isDark ? "Switch to light mode" : "Switch to dark mode";
			}
		});
	}

	function applyTheme(theme, persist) {
		root.setAttribute("data-theme", theme);
		root.style.colorScheme = theme;
		updateThemeToggleButtons(theme);
		if (persist) {
			writeStoredTheme(theme);
		}
	}

	function initThemeToggle() {
		var buttons = document.querySelectorAll("[data-theme-toggle]");

		buttons.forEach(function (button) {
			if (button.dataset.themeToggleBound === "true") {
				return;
			}

			button.dataset.themeToggleBound = "true";
			button.addEventListener("click", function () {
				var currentTheme = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
				var nextTheme = currentTheme === "dark" ? "light" : "dark";
				applyTheme(nextTheme, true);
			});
		});

		if (mediaQuery && !mediaListenerBound && typeof mediaQuery.addEventListener === "function") {
			mediaQuery.addEventListener("change", function (event) {
				var storedTheme = readStoredTheme();
				if (storedTheme !== "light" && storedTheme !== "dark") {
					applyTheme(event.matches ? "dark" : "light", false);
				}
			});
			mediaListenerBound = true;
		}

		applyTheme(getPreferredTheme(), false);
	}

	function parseSearchDocuments() {
		var searchData = document.getElementById("site-search-data");
		if (!searchData) {
			return [];
		}

		try {
			var documents = JSON.parse(searchData.textContent || "[]");
			return Array.isArray(documents) ? documents : [];
		} catch (error) {
			return [];
		}
	}

	function normalizeSearchValue(value) {
		return (value || "").toLowerCase().replace(/\s+/g, " ").trim();
	}

	function escapeHtml(value) {
		return String(value).replace(/[&<>"']/g, function (character) {
			return {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"'": "&#39;"
			}[character];
		});
	}

	function buildSearchSnippet(text, term) {
		var source = (text || "").replace(/\s+/g, " ").trim();
		if (!source) {
			return "";
		}

		var lowered = source.toLowerCase();
		var index = lowered.indexOf(term);
		if (index === -1) {
			return source.slice(0, 150) + (source.length > 150 ? "..." : "");
		}

		var start = Math.max(0, index - 55);
		var end = Math.min(source.length, index + 95);
		var snippet = source.slice(start, end).trim();
		if (start > 0) {
			snippet = "..." + snippet;
		}
		if (end < source.length) {
			snippet += "...";
		}
		return snippet;
	}

	function scoreSearchDocument(documentData, query, terms) {
		var title = normalizeSearchValue(documentData.title);
		var description = normalizeSearchValue(documentData.description);
		var content = normalizeSearchValue(documentData.content);
		var combined = [title, description, content].join(" ");

		if (!combined.includes(query)) {
			var anyTermMatch = terms.some(function (term) {
				return combined.includes(term);
			});
			if (!anyTermMatch) {
				return null;
			}
		}

		var score = 0;
		if (title.includes(query)) {
			score += 14;
		}
		if (description.includes(query)) {
			score += 8;
		}
		if (content.includes(query)) {
			score += 4;
		}

		terms.forEach(function (term) {
			if (title.includes(term)) {
				score += 5;
			}
			if (description.includes(term)) {
				score += 3;
			}
			if (content.includes(term)) {
				score += 1;
			}
		});

		return score;
	}

	function renderSearchResults(matches, rawQuery, results, status) {
		if (!matches.length) {
			results.hidden = false;
			results.innerHTML = '<p class="menu-search__empty">No matches found.</p>';
			status.textContent = 'No results for "' + rawQuery + '".';
			return;
		}

		results.hidden = false;
		results.innerHTML = matches.map(function (match) {
			var snippetSource = match.description || match.content || "";
			var snippet = buildSearchSnippet(snippetSource, normalizeSearchValue(rawQuery));
			var meta = match.section || "Page";

			return (
				'<a class="menu-search__result" href="' + escapeHtml(match.url) + '">' +
					'<span class="menu-search__result-meta">' + escapeHtml(meta) + '</span>' +
					'<span class="menu-search__result-title">' + escapeHtml(match.title) + '</span>' +
					(snippet ? '<span class="menu-search__result-snippet">' + escapeHtml(snippet) + '</span>' : "") +
				'</a>'
			);
		}).join("");

		status.textContent = matches.length + (matches.length === 1 ? " result" : " results") + ' for "' + rawQuery + '".';
	}

	function initSiteSearch() {
		var searchRoot = document.querySelector("[data-search-root]");
		if (!searchRoot || searchRoot.dataset.searchBound === "true") {
			return;
		}

		var input = searchRoot.querySelector("[data-search-input]");
		var status = searchRoot.querySelector("[data-search-status]");
		var results = searchRoot.querySelector("[data-search-results]");
		if (!input || !status || !results) {
			return;
		}

		var documents = parseSearchDocuments();
		searchRoot.dataset.searchBound = "true";

		function clearResults() {
			results.hidden = true;
			results.innerHTML = "";
			status.textContent = "Find titles, descriptions, and page content across the site.";
		}

		function runSearch() {
			var rawQuery = (input.value || "").trim();
			var query = normalizeSearchValue(rawQuery);
			if (query.length < 2) {
				clearResults();
				return;
			}

			var terms = query.split(" ").filter(Boolean);
			var matches = documents.map(function (documentData) {
				return {
					title: documentData.title || "",
					url: documentData.url || "#",
					section: documentData.section || "",
					description: documentData.description || "",
					content: documentData.content || "",
					score: scoreSearchDocument(documentData, query, terms)
				};
			}).filter(function (documentData) {
				return documentData.score !== null;
			}).sort(function (first, second) {
				return second.score - first.score;
			}).slice(0, 8);

			renderSearchResults(matches, rawQuery, results, status);
		}

		input.addEventListener("input", runSearch);
		input.addEventListener("search", runSearch);
		input.addEventListener("keydown", function (event) {
			if (event.key !== "Enter") {
				return;
			}

			event.preventDefault();
			runSearch();
			var firstResult = results.querySelector(".menu-search__result");
			if (firstResult) {
				firstResult.focus();
			}
		});

		clearResults();
	}

	function initPortfolioViewToggle() {
		var rootToggle = document.querySelector("[data-portfolio-toggle]");
		if (!rootToggle || rootToggle.dataset.toggleBound === "true") {
			return;
		}

		var buttons = rootToggle.querySelectorAll("[data-view-button]");
		var panels = document.querySelectorAll(".portfolio-view-panel[data-view-panel]");
		if (!buttons.length || !panels.length) {
			return;
		}

		rootToggle.dataset.toggleBound = "true";

		function setView(view) {
			buttons.forEach(function (button) {
				var active = button.getAttribute("data-view-button") === view;
				button.classList.toggle("is-active", active);
				button.setAttribute("aria-selected", active ? "true" : "false");
				button.setAttribute("aria-pressed", active ? "true" : "false");
			});

			panels.forEach(function (panel) {
				var active = panel.getAttribute("data-view-panel") === view;
				panel.classList.toggle("is-hidden", !active);
				panel.setAttribute("aria-hidden", active ? "false" : "true");
			});
		}

		buttons.forEach(function (button) {
			button.addEventListener("click", function () {
				setView(button.getAttribute("data-view-button"));
			});
		});

		setView("grid");
	}

	function initProjectEmbeds() {
		var legacyEmbeds = document.querySelectorAll('.project-content iframe[src*="/portfolio/"][src*="/assets/"]');
		legacyEmbeds.forEach(function (embed) {
			var source = embed.getAttribute("src") || "";
			var normalizedSource = source.replace(/(\/portfolio\/[^/]+)\/assets\//, "$1/");
			if (normalizedSource !== source) {
				embed.setAttribute("src", normalizedSource);
			}
		});

		var embeds = document.querySelectorAll('.project-content iframe[src*="youtube.com/embed"]');
		if (!embeds.length) {
			return;
		}

		embeds.forEach(function (embed) {
			if (embed.closest(".project-video__frame")) {
				return;
			}

			if (embed.dataset.embedBound === "true") {
				return;
			}

			var width = parseFloat(embed.getAttribute("width") || "");
			var height = parseFloat(embed.getAttribute("height") || "");
			var ratio = width > 0 && height > 0 ? width + " / " + height : "16 / 9";

			embed.dataset.embedBound = "true";
			embed.style.display = "block";
			embed.style.width = "100%";
			embed.style.maxWidth = "100%";
			embed.style.height = "auto";
			embed.style.aspectRatio = ratio;
			embed.setAttribute("loading", "lazy");
		});
	}

	function initProjectImages() {
		var images = document.querySelectorAll(".project-content .image img, .image.main img");
		if (!images.length) {
			return;
		}

		function updateImageOrientation(image) {
			var wrapper = image.closest(".image");
			if (!wrapper || !image.naturalWidth || !image.naturalHeight) {
				return;
			}

			var isPortrait = image.naturalHeight / image.naturalWidth > 1.15;
			wrapper.classList.toggle("image--portrait", isPortrait);
		}

		images.forEach(function (image) {
			if (image.complete) {
				updateImageOrientation(image);
				return;
			}

			image.addEventListener("load", function () {
				updateImageOrientation(image);
			}, { once: true });
		});
	}

	function initProjectFigures() {
		var contentRoots = document.querySelectorAll(".project-content");
		if (!contentRoots.length) {
			return;
		}

		function isProjectMedia(node) {
			return !!(
				node &&
				node.classList &&
				(node.classList.contains("image") || node.classList.contains("project-video"))
			);
		}

		contentRoots.forEach(function (root) {
			var captions = Array.prototype.filter.call(root.children, function (node) {
				return node.classList && node.classList.contains("project-caption");
			});

			captions.forEach(function (caption) {
				var mediaNodes = [];
				var probe = caption.previousElementSibling;

				while (isProjectMedia(probe)) {
					mediaNodes.unshift(probe);
					probe = probe.previousElementSibling;
				}

				if (!mediaNodes.length) {
					return;
				}

				var figure = document.createElement("figure");
				var hasVideo = mediaNodes.some(function (node) {
					return node.classList.contains("project-video");
				});

				figure.className = "project-figure " + (hasVideo ? "project-figure--video" : "project-figure--image");
				root.insertBefore(figure, mediaNodes[0]);

				mediaNodes.forEach(function (node) {
					figure.appendChild(node);
				});

				var figcaption = document.createElement("figcaption");
				figcaption.className = "project-caption project-figure__caption";
				figcaption.innerHTML = caption.innerHTML;
				figure.appendChild(figcaption);
				caption.remove();
			});
		});
	}

	function initSite() {
		initThemeToggle();
		initSiteSearch();
		initPortfolioViewToggle();
		initProjectEmbeds();
		initProjectImages();
		initProjectFigures();
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initSite, { once: true });
	} else {
		initSite();
	}
})();
