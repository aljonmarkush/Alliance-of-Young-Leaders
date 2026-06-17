export async function initOfficers() {
  const landingGrid = document.getElementById('officers-data-grid');
  if (!landingGrid) return;

  // Grab the fresh container wrappers and trigger elements from our template update
  const allOfficersGrid = document.getElementById('all-officers-data-grid');
  const landingViewWrapper = document.getElementById('officers-landing-view');
  const directoryViewWrapper = document.getElementById('officers-directory-view');
  const goDirectoryBtn = document.getElementById('btn-go-directory');
  const backBtn = document.getElementById('btn-back-to-landing');

  try {
    // 1. Fetch your JSON context data
    const response = await fetch('./data/officers.json'); 
    if (!response.ok) throw new Error('Could not retrieve officers data model.');
    const officers = await response.json();

    // Arrays to capture categorized markup blocks
    let landingCardsArray = [];
    let completeDirectoryArray = [];

    // 2. Loop and map data values matching your exact design structure
    officers.forEach(officer => {
      const featuredClass = officer.isFeatured ? 'officer-featured' : '';
      const delayClass = officer.delay > 0 ? `reveal-delay-${officer.delay}` : '';
      
      const photoContent = officer.img 
        ? `<img src="${officer.img}" alt="${officer.name}" class="officer-img-element">`
        : `<i class="fas fa-user"></i>`;
      
      const placeholderClass = officer.img ? '' : 'officer-placeholder';

      const socialLinksHTML = Object.entries(officer.socials || {})
        .map(([platform, url]) => {

        let iconClass = '';

        switch (platform) {
          case 'facebook':
            iconClass = 'fab fa-facebook';
            break;
          case 'instagram':
            iconClass = 'fab fa-instagram';
            break;
          case 'linkedin':
           iconClass = 'fab fa-linkedin';
            break;
         case 'twitter':
            iconClass = 'fab fa-twitter';
           break;
         case 'email':
           iconClass = 'fas fa-envelope';
           break;
         default:
           iconClass = 'fas fa-link';
          }

       return `
         <a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${platform}">
          <i class="${iconClass}"></i>
         </a>
         `; 
      }).join('');

      const cardHTML = `
        <div class="officer-card ${featuredClass} reveal ${delayClass}">
          <div class="officer-photo-wrap">
            <div class="officer-photo ${placeholderClass}">
              ${photoContent}
            </div>
            ${officer.isFeatured ? '<div class="officer-badge">Adviser</div>' : ''}
          </div>
          <div class="officer-info">
            <h3>${officer.name}</h3>
            <p class="officer-position">${officer.position}</p>
            <p class="officer-desc">${officer.desc || ''}</p>
            <div class="officer-socials">
              ${socialLinksHTML}
            </div>
          </div>
        </div>
      `;

      // Master array gets every single officer element
      completeDirectoryArray.push(cardHTML);

      // Homepage landing target gets only the 2 Advisers (isFeatured: true)
      if (officer.isFeatured) {
        landingCardsArray.push(cardHTML);
      }
    });

    // 3. Mount populated collections to their target DOM layout frames
    landingGrid.innerHTML = landingCardsArray.join('');
    if (allOfficersGrid) {
      allOfficersGrid.innerHTML = completeDirectoryArray.join('');
    }

    // 4. Interaction Events Setup (Smoothly swaps active layouts inside section view)
    if (goDirectoryBtn && landingViewWrapper && directoryViewWrapper) {
      goDirectoryBtn.addEventListener('click', () => {
        landingViewWrapper.style.display = 'none';
        directoryViewWrapper.style.display = 'block';
        
        // Auto-center view to top of component header smoothly
        document.getElementById('officers').scrollIntoView({ behavior: 'smooth' });
      });
    }

    if (backBtn && landingViewWrapper && directoryViewWrapper) {
      backBtn.addEventListener('click', () => {
        directoryViewWrapper.style.display = 'none';
        landingViewWrapper.style.display = 'block';
        
        document.getElementById('officers').scrollIntoView({ behavior: 'smooth' });
      });
    }

  } catch (error) {
    console.error('❌ Officers Processing Engine Error:', error);
    landingGrid.innerHTML = `<p style="color: red; text-align: center;">Unable to display executive leadership listings at this time.</p>`;
  }
}