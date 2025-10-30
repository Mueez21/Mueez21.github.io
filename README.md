# Mueez Mejbah — Personal Portfolio

A modern, professional personal portfolio website featuring a **Dark Mode Neon Theme** with cyan/teal/green accents. Built with vanilla HTML, CSS, and JavaScript to showcase projects, skills, education, research, and experience.

![Portfolio Preview](https://via.placeholder.com/1200x600.png?text=Portfolio+Preview)

## 🎨 Design Theme

- **Dark Mode Neon**: Deep dark background (#07070a) with vibrant neon cyan, teal, and green accents
- **Glass-morphism**: Semi-transparent cards with backdrop blur effects
- **Smooth Animations**: Scroll-based reveal animations and hover effects
- **Modern Typography**: Poppins font family for clean, professional look

## ✨ Features

### � Single-Page Portfolio
- **Hero Section**: Eye-catching introduction with animated neon text effects
- **About**: Personal background and career summary
- **Education**: Academic timeline with institutions and achievements
- **Skills**: Animated skill cards showcasing technical expertise
- **Projects**: Portfolio with detailed modal popups for each project
- **Research**: Dedicated section for academic research and publications
- **Experience**: Professional and volunteer work history
- **Contact**: Working contact form with validation and mailto integration

### 📋 Resume Page
- Print-optimized resume layout (A4 size)
- "Download/Print" button (Ctrl+P shortcut)
- All CV content included
- Professional formatting

### 🔲 Project Modals
- Detailed project information with full descriptions
- Technology stack with glowing tags
- Live demo and source code links
- Accessible with keyboard navigation and screen reader support
- Focus trapping and ESC to close

### 📱 Responsive Design
- Mobile-first approach
- Hamburger navigation menu for mobile
- Adaptive layouts for desktop, tablet, and mobile
- Touch-friendly interactions

### ♿ Accessibility
- Semantic HTML5 structure
- ARIA labels and attributes
- Keyboard navigation support
- Focus trapping in modals
- Skip-to-content link
- High contrast neon colors on dark background

## 🚀 Features List

- ✅ Dark mode neon theme
- ✅ Smooth scrolling navigation
- ✅ Intersection Observer animations
- ✅ Project detail modals
- ✅ Contact form validation
- ✅ Scroll-to-top button
- ✅ Active navigation highlighting
- ✅ Print-friendly resume page
- ✅ SEO optimized with meta tags
- ✅ Open Graph and Twitter Card support
- ✅ Mobile hamburger menu
- ✅ Custom neon scrollbar
- ✅ Focus management for accessibility

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)**: Modern vanilla JS with modules
- **Font Awesome**: Icon library
- **Google Fonts**: Poppins typography

## 📦 How to Run Locally

### Option 1: Using VS Code Live Server (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mueez21/Personal_website.git
   cd Personal_website
   ```

2. **Open in VS Code**
   ```bash
   code .
   ```

3. **Install Live Server extension**
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Live Server" by Ritwick Dey
   - Click Install

4. **Start Live Server**
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Your browser will open at `http://127.0.0.1:5500`

### Option 2: Using Python HTTP Server

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mueez21/Personal_website.git
   cd Personal_website
   ```

2. **Start Python server**
   ```bash
   python -m http.server 8000
   ```
   
3. **Open in browser**
   - Navigate to `http://localhost:8000`

### Option 3: Direct File Opening

Simply open `index.html` in your web browser (some features may be limited without a local server).

## 🌐 How to Deploy

### GitHub Pages

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on **Settings**
   - Scroll down to **Pages** section
   - Under "Source", select branch: `main`
   - Select folder: `/ (root)`
   - Click **Save**

3. **Access your site**
   - Your site will be available at: `https://yourusername.github.io/repository-name/`
   - Wait a few minutes for deployment to complete

### Other Deployment Options

- **Vercel**: Connect GitHub repo, auto-deploy on push
- **Netlify**: Drag & drop the folder or connect GitHub
- **Firebase Hosting**: Use Firebase CLI to deploy

## 📁 Project Structure

```
Personal_website/
│
├── index.html          # Main portfolio page
├── resume.html         # Printable resume page
├── styles.css          # All styling (dark neon theme)
├── script.js           # Interactive functionality
└── README.md           # Project documentation
```

## 🎯 Key Sections

### Projects
Currently featuring:
- **NextFit**: AI Fitness Trainer Web Application with Gemini AI integration

### Research
- Satellite Image Classification using CBAM-Enhanced EfficientNetB2

### Experience
- IEEE Antennas & Propagation Society (Vice Chair)
- Udvash Coaching (Exam Copy Checker)
- Face the Case 4.0 (Assistant Secretary)

## 🎨 Customization

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --neon-cyan: #00f0ff;
    --neon-teal: #00d9ff;
    --neon-green: #00ff88;
    --bg-dark: #07070a;
}
```

### Add New Project Modal
1. Copy modal structure in `index.html`
2. Update ID and content
3. Add `data-modal="your-modal-id"` to button
4. JavaScript handles everything automatically

### Update Content
- **Personal Info**: Edit hero section in `index.html`
- **Projects**: Update project cards and modals
- **Skills**: Modify skills grid
- **Resume**: Edit `resume.html`

## 📧 Contact

**Mueez Mejbah**

- 📧 Email: [mueezmejbah284@gmail.com](mailto:mueezmejbah284@gmail.com)
- 🔗 LinkedIn: [linkedin.com/in/mueez-mejbah-214807306](https://www.linkedin.com/in/mueez-mejbah-214807306/)
- 💻 GitHub: [github.com/Mueez21](https://github.com/Mueez21)
- 📍 Location: Agrabad, Chattogram, Bangladesh

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio! If you find any bugs or have suggestions, please open an issue.

## 📝 License

This project is licensed under the **MIT License** - feel free to use this template for your personal portfolio.

```
MIT License

Copyright (c) 2025 Mueez Mejbah

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🌟 Acknowledgments

- Font Awesome for icons
- Google Fonts for Poppins typography
- Inspiration from modern portfolio designs

---

**⭐ If you found this helpful, please star the repository!**

Made with ❤️ and passion for technology by Mueez Mejbah
