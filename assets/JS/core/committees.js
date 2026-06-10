export async function initCommittees() {
  const gridContainer = document.getElementById('committees-data-grid');
  if (!gridContainer) return;

  try {
    const response = await fetch('./data/committees.json');
    if (!response.ok) throw new Error('Could not retrieve committees dataset.');
    const committees = await response.json();

    const gridHTML = committees.map(committee => {
      const delayClass = committee.delay > 0 ? `reveal-delay-${committee.delay}` : '';
      
      // Loop array tags dynamically
      const membersHTML = (committee.members || [])
        .map(member => `<span class="member-tag">${member}</span>`)
        .join('');

      return `
        <div class="committee-card reveal ${delayClass}">
          <div class="committee-header">
            <div class="committee-icon"><i class="${committee.icon}"></i></div>
            <div>
              <h3>${committee.title}</h3>
              <span class="committee-role-label">Committee Chair</span>
              <p class="committee-chair">${committee.chair}</p>
            </div>
          </div>
          <p class="committee-desc">${committee.desc}</p>
          <div class="committee-members">
            ${membersHTML}
          </div>
        </div>
      `;
    }).join('');

    gridContainer.innerHTML = gridHTML;

  } catch (error) {
    console.error('❌ Committees Processing Engine Error:', error);
    gridContainer.innerHTML = `<p style="color: red; text-align: center;">Unable to load committee structures.</p>`;
  }
}