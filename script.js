const newsJsonUrl = "https://raw.githubusercontent.com/raztem/GNews-Worker/main/news.json";

document.addEventListener("DOMContentLoaded", async () => {
    const newsContainer = document.getElementById("news-container");

    try {
        const response = await fetch(newsJsonUrl);
        const data = await response.json();

        data.articles.forEach(article => {
            const newsCard = document.createElement("div");
            newsCard.className = "news-card";

            const publishedDate = new Date(article.publishedAt);
            const formattedDate = publishedDate.toLocaleString("uk-UA", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });

            newsCard.innerHTML = `
                <img src="${article.image}" alt="Image" class="news-img" data-url="${article.source.url}">
                <div class="news-body">
                    <h2 class="news-title">${article.title}</h2>
                    <p class="date">${formattedDate}</p>
                    <p class="news-description">${article.description}</p>
                    <span class="dots">⋯</span>
                    <p class="news-content">${article.content}</p>
                    <a href="${article.source.url}" target="_blank" class="source-link">${article.source.name}</a>
                </div>
            `;

            const img = newsCard.querySelector(".news-img");
            img.addEventListener("click", (e) => {
                window.open(e.target.dataset.url, "_blank");
            });

            const dots = newsCard.querySelector(".dots");
            const contentParagraph = newsCard.querySelector(".news-content");

            dots.addEventListener("click", () => {
                const isVisible = contentParagraph.style.display === "block";
                contentParagraph.style.display = isVisible ? "none" : "block";
                dots.textContent = isVisible ? "⋯" : "✕";
            });

            newsContainer.appendChild(newsCard);
        });
    } catch (error) {
        console.error("Помилка завантаження новин:", error);
    }
});
