async function loadGallery() {
    try {
        const years = [2025, 2026, 2027]; // 可以动态获取
        const gallery = document.getElementById('photo-gallery');
        
        for (const year of years) {
            const response = await fetch(`/api/photos/${year}`);
            const photos = await response.json();
            
            if (photos.length > 0) {
                const yearSection = document.createElement('div');
                yearSection.className = 'year-section';
                yearSection.innerHTML = `
                    <h3>${year}年</h3>
                    <div class="photo-grid">
                        ${photos.map(photo => `
                            <div class="photo-item">
                                <img src="${photo.url}" alt="${year}年照片">
                            </div>
                        `).join('')}
                    </div>
                `;
                gallery.appendChild(yearSection);
            }
        }
    } catch (error) {
        console.error('加载照片失败:', error);
    }
} 