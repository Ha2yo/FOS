// src/main.js

// 페이지 로드 함수
async function loadPage(pageName) {
  const container = document.getElementById('app-container');
  const response = await fetch(`pages/${pageName}/${pageName}.html`);
  const html = await response.text();
  container.innerHTML = html;
  
  // 페이지별 스크립트 로드
  const script = document.createElement('script');
  script.src = `pages/${pageName}/${pageName}.js`;
  container.appendChild(script);
}

// 초기 페이지 로드
document.addEventListener("DOMContentLoaded", () => {
  loadPage('home');
});

// 내비게이션바 클릭 이벤트
document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      const pageName = e.currentTarget.dataset.page;
      loadPage(pageName);
      
      // 활성 클래스 변경
      navItems.forEach(i => i.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });
  });
});