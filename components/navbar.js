class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: rgba(255, 255, 255, 0.95);
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          width: 98%;
          top: 0;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        nav.scrolled {
          padding: 1rem 2rem;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
        }
.logo {
          color: black;
          font-weight: bold;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          text-decoration: none;
        }
        .logo-icon {
          margin-right: 0.5rem;
        }
        ul {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        a {
          color: black;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s;
          position: relative;
        }
        a:hover {
          color: #93c5fd;
        }
        a:after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: #93c5fd;
          transition: width 0.3s;
        }
        a:hover:after {
          width: 100%;
        }
        .book-now {
          background: white;
          color: var(--navy-blue);
          padding: 0.5rem 1.5rem;
          border-radius: 9999px;
          transition: all 0.3s;
          font-weight: 600;
        }
        .book-now:hover {
          background: #e5e7eb;
          transform: translateY(-2px);
          color: var(--navy-blue);
        }
        .book-now:after {
          display: none;
        }
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          ul {
            display: none;
          }
          .mobile-menu-btn {
            display: block;
          }
        }
      </style>
      <nav>
        <a href="/" class="logo">
          <i data-feather="car" class="logo-icon"></i>
          Nordic Detailer
        </a>
        <ul>
          <li><a href="#services">Tjänster</a></li>
          <li><a href="#process">Hur det går till</a></li>
          <li><a href="#contact">Kontakt</a></li>
          <li><a href="#contact" class="book-now">Boka nu</a></li>
        </ul>
        <button class="mobile-menu-btn">
          <i data-feather="menu"></i>
        </button>
      </nav>
      <script>
        feather.replace();
        
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
          const nav = this.shadowRoot.querySelector('nav');
          if (window.scrollY > 50) {
            nav.classList.add('scrolled');
          } else {
            nav.classList.remove('scrolled');
          }
        });

        // Mobile menu toggle (would need implementation)
      </script>
    `;
  }
}
customElements.define('custom-navbar', CustomNavbar);