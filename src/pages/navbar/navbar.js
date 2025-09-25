// navbar 웹 컴포넌트
class navbar extends HTMLElement {
  connectedCallback() {
    // Shadow DOM 생성
    this.attachShadow({ mode: 'open' });
    // CSS 파일 동적으로 불러오기
    fetch('/styles/navbar.css')
      .then(response => response.text())
      .then(css => {
        // CSS와 HTML 삽입
        this.shadowRoot.innerHTML=`
          <style>${css}</style>
          <ul>
            <li><a href="/pages/home/home.html">home</a></li>
            <li><a href="/pages/store/store.html">store</a></li>
            <li><a href="/pages/test/test.html">DB test</a></li>
          </ul>
        `;
      })
  }
}

customElements.define('nav-bar', navbar);