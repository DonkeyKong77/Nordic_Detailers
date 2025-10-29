class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: var(--dark);
          color: white;
          padding: 6rem 2rem 3rem;
          position: relative;
          overflow: hidden;
        }
        footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--dark);
        }
.footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }
        .footer-logo {https://cdn.freebiesupply.com/images/large/2x/instagram-icon-white-on-black-circle.png}
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
        }
        .footer-logo-icon {
          margin-right: 0.5rem;
        }
        .footer-heading {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          position: relative;
          display: inline-block;
        }
        .footer-heading:after {
          content: '';
          position: absolute;
          width: 50%;
          height: 3px;
          background: white;
          bottom: -8px;
          left: 0;
        }
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-links li {
          margin-bottom: 0.75rem;
        }
        .footer-links a {
          color: #cbd5e1;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover {
          color: white;
        }
        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        .social-links a {
          color: var(--navy-blue);
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .social-links a:hover {
          background: #e5e7eb;
          transform: translateY(-3px);
        }
        .copyright {
          text-align: center;
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid #334155;
          color: #94a3b8;
        }
        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr;
          }
        }
      </style>
      <footer>
        <div class="footer-container">
          <div class="footer-about">
            <div class="footer-logo">
              <i data-feather="car" class="footer-logo-icon"></i>
              Nordic Detailer
            </div>
            <p>Professionell mobil invändig bilvård i hela Skåne.</p>
            <div class="social-links">
  <div class="social-links">
  
  </a>
</div>
</div>
</div>

          <div class="footer-Paket">
            <h3 class="footer-heading">Paket</h3>
            <ul class="footer-links">
              <li><a href="#services">Express Rengöring</a></li>
              <li><a href="#services">Standard Rengöring</a></li>
              <li><a href="#services">Premium Rengöring</a></li>
            </ul>
          </div>
          
          <div class="footer-contact">
            <h3 class="footer-heading">Kontakt</h3>
            <ul class="footer-links">
              <li><i data-feather="phone" class="w-4 h-4 mr-2 inline"></i> +46 76-555 40 08 
              </p> +46 70-953 68 68</li>
              <li><i data-feather="mail" class="w-4 h-4 mr-2 inline"></i> NordicDetailersEU@gmail.com</li>
              <li><i data-feather="map-pin" class="w-4 h-4 mr-2 inline"></i> Stockholm, Sweden</li>
            </ul>
          </div>
        </div>
        
        <div class="copyright">
          <p>&copy; ${new Date().getFullYear()} Nordic Detailer. All rights reserved.</p>
        </div>
      </footer>
      <script>
        feather.replace();
      </script>
    `;
  }
}
customElements.define('custom-footer', CustomFooter);