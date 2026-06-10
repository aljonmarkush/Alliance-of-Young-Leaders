export async function initGallery() {
  const gridContainer = document.getElementById('gallery-data-grid');
  if (!gridContainer) return;

  try {
    const response = await fetch('./data/gallery.json');
    if (!response.ok) throw new Error('Could not retrieve gallery data model.');
    const galleryItems = await response.json();

    const gridHTML = galleryItems.map((item, index) => {
      // ✅ SAFETY CHECK: Render the real image markup if a path exists.
      // Otherwise, safely fall back to your custom FontAwesome placeholder layout.
      const visualContent = item.img 
        ? `<img src="${item.img}" alt="${item.title}" class="gallery-img-element">`
        : `<div class="gallery-placeholder"><i class="fas fa-image"></i><span>${item.title}</span></div>`;

      return `
        <div class="gallery-item" data-index="${index}">
          ${visualContent}
          <div class="gallery-overlay">
            <i class="fas fa-expand"></i>
          </div>
        </div>
      `;
    }).join('');

    gridContainer.innerHTML = gridHTML;

  } catch (error) {
    console.error('❌ Gallery Processing Engine Error:', error);
    gridContainer.innerHTML = `<p style="color: red; text-align: center;">Unable to load photos at this time.</p>`;
  }
}