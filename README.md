# Lokstra Framework Website

Website dan dokumentasi untuk Lokstra Framework - Go backend framework yang simpel, scalable, dan terstruktur.

## 🚀 Quick Start

### Prerequisites
- Python 3.x (untuk development server)
- Node.js (opsional, untuk linting dan alternative server)

### Development Server

Ada beberapa cara untuk menjalankan website secara lokal:

#### 1. Python HTTP Server (Recommended)
```bash
# Start server di port 8000
npm run serve
# atau
python -m http.server 8000
```

#### 2. Node.js HTTP Server
```bash
# Install http-server globally (one time)
npm install -g http-server

# Start server
npm run serve:node
```

#### 3. PHP Built-in Server
```bash
# Jika PHP tersedia
npm run serve:php
```

### VS Code Debug

1. **Automatic dengan VS Code:**
   - Buka VS Code
   - Tekan `F5` atau pilih "Launch Lokstra Website"
   - Server akan start otomatis dan browser akan terbuka

2. **Manual:**
   - Jalankan `npm run serve` di terminal
   - Buka browser ke `http://localhost:8000`

## 📁 Project Structure

```
lokstra_dev_web/
├── index.html              # Homepage
├── about.html              # About page
├── architecture.html       # Architecture documentation
├── assets/                 # Static assets
│   ├── style.css          # Main stylesheet
│   ├── main.js            # Main JavaScript
│   ├── navbar.html        # Navigation component
│   ├── footer.html        # Footer component
│   ├── meta-*.html        # Meta tag components
│   └── logo.png           # Lokstra logo
├── .vscode/               # VS Code configuration
│   ├── launch.json        # Debug configuration
│   └── tasks.json         # Build tasks
├── package.json           # Project metadata
├── eslint.config.js       # ESLint configuration
└── README.md              # This file
```

## 🛠️ Development

### Linting
```bash
# Check JavaScript code quality
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

### File Organization
- **HTML files**: Menggunakan komponen modular (navbar, footer, meta tags)
- **CSS**: External stylesheet dengan responsive design
- **JavaScript**: Vanilla JS dengan proper ESLint configuration
- **Meta tags**: Dinamis loading untuk SEO optimization

## 🌐 Features

- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Component-based** - Modular HTML components
- ✅ **SEO Optimized** - Dynamic meta tags dan Open Graph
- ✅ **Modern JavaScript** - ES2021 dengan ESLint
- ✅ **Fast Loading** - Optimized assets dan caching
- ✅ **Professional Navigation** - Mobile hamburger menu dengan overlay

## 📱 Mobile Testing

Website dioptimalkan untuk mobile devices:
- Responsive breakpoints di 768px
- Mobile navigation dengan hamburger menu
- Touch-friendly buttons dan links
- Optimal typography scaling

## 📱 WhatsApp Preview Setup

### Problem: WhatsApp tidak show preview
Jika copy-paste URL di WhatsApp tidak keluar preview, ikuti langkah berikut:

#### 1. Deploy ke GitHub Pages
```bash
# Deploy dengan script otomatis
npm run deploy

# Atau manual
git add .
git commit -m "Update meta tags for social sharing"
git push origin main
```

#### 2. Test URL Production
```bash
# Test meta tags validation
npm run validate:og    # Open Graph validator
npm run validate:fb    # Facebook debugger  
npm run validate:twitter # Twitter card validator

# Test local meta tags
npm run test:meta      # Buka meta-test.html
```

#### 3. WhatsApp Testing
1. Pastikan website sudah deploy ke: `https://lokstra.dev/`
2. Copy URL tersebut
3. Paste di WhatsApp chat
4. WhatsApp akan generate preview card dengan:
   - ✅ Title: "Lokstra Framework - Go Backend Framework"
   - ✅ Description: "Framework backend Go yang simpel, scalable, dan terstruktur"
   - ✅ Image: Lokstra logo
   - ✅ URL: lokstra.dev link

#### 4. Meta Tags Debug
- File `meta-test.html` untuk testing meta tags
- File `index-production.html` dengan static meta tags
- Meta tags tersedia di `assets/meta-*.html` untuk dynamic loading

## 🔧 VS Code Setup

File `.vscode/launch.json` sudah dikonfigurasi untuk:
1. **Launch Lokstra Website** - Start server + browser
2. **Launch Chrome (no server)** - File protocol untuk testing cepat

File `.vscode/tasks.json` menyediakan tasks untuk:
- Python HTTP server
- Node.js HTTP server  
- PHP built-in server

## 📈 Performance

- **External CSS** - Single stylesheet untuk better caching
- **Component loading** - Asynchronous HTML component loading
- **Meta optimization** - Dynamic meta tags untuk social sharing
- **Minimal JavaScript** - Vanilla JS tanpa framework overhead

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Run `npm run lint` untuk check code quality
4. Test dengan `npm run serve`
5. Submit pull request

## 📄 License

Apache 2.0 License - see LICENSE file for details.

---

**Made with ❤️ in Indonesia**