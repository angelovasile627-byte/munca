# 📄 Ghid Setări Pagină - Mobirise Builder Clone

## 🎯 Prezentare Generală

Aplicația ta acum include funcționalitate completă de **Setări Pagină** similar cu Mobirise, cu următoarele capacități:

- ✅ Setări SEO complete (titlu, descriere, URL)
- ✅ Google Preview în timp real
- ✅ Upload imagine pentru Social Sharing
- ✅ Code Injection profesional cu syntax highlighting
- ✅ Export HTML complet
- ✅ Backend API cu MongoDB pentru persistență
- ✅ Interfață modernă cu tabs

---

## 🚀 Funcționalități Implementate

### 1. **Tab General**
Setări de bază pentru pagină:
- **Titlul paginii** - Numele paginii (SEO title)
- **URL-ul paginii** - Nume fișier HTML (ex: `index.html`, `about.html`)
- **Descrierea paginii** - Meta description pentru SEO

### 2. **Tab SEO**
Optimizare pentru motoare de căutare și social media:
- **Google Preview** - Previzualizare cum va arăta în Google (Desktop/Mobile)
- **Social Sharing Image** - Toggle pentru activare/dezactivare
- **Upload Imagine** - Click pe zona cu linie punctată pentru a încărca imagine
- **Image URL** - Sau adaugă URL direct către o imagine externă
- **Preview imagine** - Vezi imaginea uploadată cu opțiune de ștergere

### 3. **Tab Code Injection**
Injectare cod personalizat cu syntax highlighting:

#### **Inside <head> code:**
```html
<meta name="author" content="Your Name">
<link rel="stylesheet" href="custom.css">
<script src="analytics.js"></script>
```
Codul se inserează înainte de `</head>`

#### **End of <body> code:**
```html
<script>
  // Google Analytics
  gtag('config', 'GA-MEASUREMENT-ID');
</script>
```
Codul se inserează înainte de `</body>`

#### **Before <!DOCTYPE> code:**
```php
<?php
  session_start();
  // Server-side code
?>
```
Codul se inserează pe prima linie, înainte de `<!DOCTYPE html>`

---

## 🎨 Cum se Folosește

### Accesare Setări Pagină - 2 Metode:

**Metoda 1: Din Meniul Lateral (Recomandat - ca în Mobirise)**
1. Click pe butonul **hamburger** (☰) din stânga sus
2. Click pe **"Pagini"** în meniu
3. Vezi lista tuturor paginilor site-ului
4. Click pe iconița **⚙️ Settings** lângă pagina dorită
5. Se deschide panoul mare din dreapta cu toate setările

**Metoda 2: Direct din Buton Floating**
1. Click pe butonul **turcoaz** (Settings) din colțul dreapta-jos
2. Se deschide direct panoul de setări pentru pagina curentă

### Editare Setări
1. **General Tab:**
   - Completează titlul, URL-ul și descrierea
   - URL-ul se generează automat din numele paginii

2. **SEO Tab:**
   - Vezi preview-ul Google în timp real
   - Activează Social Sharing Image (toggle)
   - Upload imagine sau adaugă URL
   - Vezi preview-ul imaginii uploadate

3. **Code Injection Tab:**
   - Scrie cod HTML/JavaScript în editorii cu syntax highlighting
   - Codul este colorat automat pentru lizibilitate
   - Fiecare editor are explicații clare despre unde se va insera codul

### Salvare Setări
- Click pe butonul **"Salvează Setările"** din footer
- Setările se salvează automat per pagină
- Schimbă paginile - fiecare își păstrează propriile setări

### Export HTML
- Click pe iconița **Download** (săgeată jos) din header-ul panoului
- Se generează și descarcă HTML complet cu:
  - Toate codurile personalizate injectate
  - Meta tags pentru SEO
  - Meta tags pentru social sharing
  - Toate blocks-urile paginii
  - CSS inline pentru styling

---

## 🔧 API Backend Endpoints

### Sites Management
```bash
POST   /api/sites              # Creare site nou
GET    /api/sites              # Listare toate sites
GET    /api/sites/{site_id}   # Obține site specific
PUT    /api/sites/{site_id}   # Actualizare site
DELETE /api/sites/{site_id}   # Ștergere site
```

### Pages Management
```bash
POST   /api/sites/{site_id}/pages              # Creare pagină nouă
PUT    /api/sites/{site_id}/pages/{page_id}   # Actualizare pagină + setări
DELETE /api/sites/{site_id}/pages/{page_id}   # Ștergere pagină
```

### Image Upload
```bash
POST   /api/upload-image       # Upload imagine pentru social sharing
# Params: file (multipart/form-data)
# Returns: { imageUrl: "http://...", filename: "uuid.jpg" }
```

### HTML Export
```bash
GET    /api/sites/{site_id}/pages/{page_id}/export
# Returns: Complete HTML file for download
```

---

## 📊 Structura Datelor (MongoDB)

Fiecare **Page** conține:
```javascript
{
  id: "uuid",
  name: "Home",
  blocks: [...],
  // Page Settings:
  pageUrl: "index.html",
  pageDescription: "Your meta description",
  socialSharingEnabled: true,
  socialSharingImageUrl: "https://...",
  headCode: "<meta name='author' content='...'>",
  bodyEndCode: "<script>...</script>",
  beforeDoctypeCode: "<?php ... ?>"
}
```

---

## 🎓 Exemple de Utilizare

### Exemplu 1: Adăugare Google Analytics
**Tab: Code Injection → Inside <head> code**
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA-XXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA-XXXXX');
</script>
```

### Exemplu 2: Facebook Pixel
**Tab: Code Injection → Inside <head> code**
```html
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

### Exemplu 3: Custom Meta Tags
**Tab: Code Injection → Inside <head> code**
```html
<meta name="keywords" content="web design, mobirise, builder">
<meta name="robots" content="index, follow">
<meta name="author" content="Your Company">
<link rel="canonical" href="https://yoursite.com/page.html">
```

### Exemplu 4: Chat Widget (Intercom, Crisp)
**Tab: Code Injection → End of <body> code**
```html
<script>
  window.intercomSettings = {
    app_id: "YOUR_APP_ID"
  };
  (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/YOUR_APP_ID';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
</script>
```

---

## 📦 Librării Instalate

### Frontend:
- `@uiw/react-codemirror` - Code editor principal
- `@codemirror/lang-html` - Syntax highlighting pentru HTML
- `@codemirror/lang-javascript` - Syntax highlighting pentru JavaScript

### Backend:
- `aiofiles` - Async file operations pentru upload și export
- `python-multipart` - Parsing multipart form data pentru upload

---

## 🔐 Securitate

- ✅ Validare tip fișier la upload (jpg, png, webp)
- ✅ Nume unice UUID pentru fișiere
- ✅ Sanitizare input-uri în MongoDB
- ✅ CORS configurat corect
- ⚠️ **IMPORTANT:** Pentru producție, adaugă:
  - Limitare dimensiune upload
  - Validare și sanitizare cod injectat
  - Rate limiting pe endpoints
  - Autentificare utilizatori

---

## 🎯 Testing

### Backend API Test:
```bash
# Test creare site
curl -X POST http://localhost:8001/api/sites \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Site"}'

# Test listare sites
curl http://localhost:8001/api/sites | jq .

# Test upload imagine
curl -X POST http://localhost:8001/api/upload-image \
  -F "file=@/path/to/image.jpg"
```

### Frontend Test:
1. Deschide http://localhost:3000
2. Click pe Settings button (turcoaz)
3. Testează toate tab-urile
4. Upload o imagine în SEO tab
5. Adaugă cod în Code Injection tab
6. Click "Salvează Setările"
7. Schimbă pagina și revino - verifică că setările persistă

---

## 🚀 Next Steps (Opțional)

Pentru a face aplicația și mai completă:

1. **Integrare cu Backend pentru Auto-Save**
   - Salvare automată în MongoDB când user completează câmpuri
   - Sync între toate tab-urile browser-ului

2. **Istoric Versiuni**
   - Păstrează istoric modificări setări
   - Posibilitate de revert la versiune anterioară

3. **Templates pentru Code Injection**
   - Template-uri pre-făcute pentru:
     - Google Analytics
     - Facebook Pixel
     - Meta tags comune
     - Chat widgets populare

4. **Validare și Preview Code**
   - Validare HTML/JavaScript înainte de salvare
   - Preview live al efectului codului injectat

5. **Bulk Operations**
   - Aplicare setări la multiple pagini simultan
   - Copy/paste setări între pagini

---

## 📝 Notițe Importante

1. **Page URL**: Nu redenumi `index.html` dacă este pagina home, altfel site-ul nu se va încărca corect
2. **Code Injection**: Codul se execută exact așa cum este scris - verifică bine înainte de salvare
3. **Social Sharing**: Imaginile trebuie să fie accesibile public pentru preview pe social media
4. **Export HTML**: Fișierul exportat este static - pentru funcționalități dinamice, folosește backend

---

## 🐛 Troubleshooting

### Imaginea nu se uploadează
- Verifică dimensiunea fișierului (max recomandată: 2MB)
- Verifică tipul fișierului (doar jpg, png, webp)
- Verifică conexiunea la backend

### Codul injectat nu apare în export
- Verifică că ai salvat setările ("Salvează Setările")
- Verifică că ești pe pagina corectă
- Refresh browser și încearcă din nou

### Setările nu persistă între pagini
- Verifică că ai dat click pe "Salvează Setările"
- Verifică console-ul browser pentru erori
- Verifică că backend-ul rulează corect

---

## 💡 Tips & Tricks

1. **Folosește templates**: Salvează-ți codurile frecvente într-un fișier local pentru copy-paste rapid
2. **Testează pe mobile**: Folosește Google Preview pentru a vedea cum arată pe mobile
3. **SEO optimization**: Completează întotdeauna descrierea - ajută la ranking în Google
4. **Social sharing**: Folosește imagini de 1200x630px pentru cel mai bun rezultat pe Facebook/Twitter
5. **Code organization**: Comentează-ți codul injectat pentru a ști mai târziu ce face fiecare script

---

**Made with ❤️ using Emergent AI**

*Ultima actualizare: 31 Octombrie 2025*
