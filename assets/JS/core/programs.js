export async function initPrograms() {
  const gridContainer = document.getElementById('programs-data-grid');
  if (!gridContainer) return;

  try {
    const response = await fetch('./data/programs.json');
    if (!response.ok) throw new Error('Could not retrieve programs data schema.');
    const programs = await response.json();

    const gridHTML = programs.map(program => {
      const delayClass = program.delay > 0 ? `reveal-delay-${program.delay}` : '';
      
      // ✅ FALLBACK SAFE LOGIC: Render an image tag if a path exists. 
      // Otherwise, safely default to your custom FontAwesome design layout block.
      const mediaContent = program.img
        ? `<img src="${program.img}" alt="${program.title}" class="program-img-element">`
        : `<div class="program-img-placeholder"><i class="${program.icon}"></i></div>`;

      return `
        <div class="program-card reveal ${delayClass}">
          <div class="program-image">
            ${mediaContent}
            <div class="program-category">${program.category}</div>
          </div>
          <div class="program-body">
            <h3>${program.title}</h3>
            <p>${program.desc}</p>
            <a href="${program.link}" class="program-link">
              ${program.linkLabel} <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      `;
    }).join('');

    gridContainer.innerHTML = gridHTML;

  } catch (error) {
    console.error('❌ Programs Component Processing Error:', error);
    gridContainer.innerHTML = `<p style="color: red; text-align: center;">Unable to populate organizational initiatives matrix data rows.</p>`;
  }
}