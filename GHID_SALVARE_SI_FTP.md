# 📖 Ghid Complet: Salvare Proiect și Publicare FTP

## 🎯 Cum Funcționează Salvarea Proiectului

### **1. Salvare Proiect Complet (.mbp)**

#### **Ce se Salvează:**
Când apeși butonul **"Publish"** → selectezi **"💾 Salvează Proiect Complet"**, aplicația salvează un fișier cu extensia `.mbp` (Mobirise Builder Project) care conține:

✅ **TOATE site-urile** create în aplicație
✅ **TOATE paginile** din fiecare site
✅ **TOATE blocurile** din fiecare pagină
✅ **TOATE setările** (Page Settings, SEO, Code Injection, Site Styles)
✅ **Date despre FTP** (dacă ai configurat)

#### **Formatul Fișierului:**
- **Extensie**: `.mbp` (de exemplu: `proiect.Site_Meu.mbp`)
- **Format intern**: JSON (text simplu, poate fi deschis cu orice editor de text)
- **Locație salvare**: Browser-ul tău descarcă fișierul în folderul de Downloads

#### **Cum să Salvezi:**
1. Apasă butonul **"Publish"** din header (partea dreaptă sus)
2. Selectează opțiunea **"💾 Salvează Proiect Complet"**
3. Apasă butonul **"PUBLISH"**
4. Fișierul `.mbp` se va descărca automat

---

### **2. Cum să Deschizi din Nou Proiectul**

#### **Pași pentru Încărcare:**
1. Apasă butonul **"Publish"** din header
2. Apasă butonul **"📂 Încarcă Proiect"** (sub cele 3 opțiuni de publicare)
3. Selectează fișierul `.mbp` salvat anterior
4. **TOTUL se va încărca instantaneu**:
   - Toate site-urile tale
   - Toate paginile
   - Toate blocurile
   - Toate setările

#### **Important:**
- ⚠️ Încărcarea unui proiect **ÎNLOCUIEȘTE** conținutul curent din aplicație
- 💡 **Salvează proiectul curent înainte** de a încărca un altul dacă vrei să păstrezi ambele
- ✅ Poți avea **multiple fișiere `.mbp`** salvate pentru proiecte diferite

---

## 🌐 Publicare pe FTP

### **1. Configurare FTP (Prima Dată)**

#### **Pași:**
1. Apasă butonul **"Publish"** din header
2. Selectează opțiunea **"🌐 Publică via FTP"**
3. Apasă butonul **"⚙️ FTP SETTINGS"** (butonul albastru din dreapta)
4. Completează datele FTP:
   - **Protocol**: FTP (momentan doar FTP este suportat)
   - **Host**: adresa serverului (ex: `ftp.domeniul-tau.ro`)
   - **Port**: port FTP (de obicei `21`)
   - **Username**: numele de utilizator FTP
   - **Password**: parola FTP
   - **Root Folder**: folderul pe server unde vrei să urci fișierele (ex: `public_html` sau `/www` sau lasă gol pentru root)

5. Apasă **"TEST CONNECTION"** pentru a verifica conexiunea
6. Dacă testul reușește (✅ Connection successful), apasă **"SAVE"**

---

### **2. Publicare pe FTP**

#### **Ce Face Funcționalitatea FTP:**
Când publici pe FTP, aplicația:
1. ✅ Generează fișiere HTML complete pentru **TOATE paginile** site-ului curent
2. ✅ Include **TOATE setările** din Page Settings (SEO, social sharing, code injection)
3. ✅ Se conectează la serverul FTP cu datele configurate
4. ✅ Urcă **TOATE fișierele HTML** pe server
5. ✅ Fișierele sunt plasate în folderul specificat (Root Folder)

#### **Pași pentru Publicare:**
1. Asigură-te că ai configurat FTP (vezi secțiunea de mai sus)
2. Apasă butonul **"Publish"** din header
3. Selectează opțiunea **"🌐 Publică via FTP"**
4. Apasă butonul **"PUBLISH"**
5. Așteaptă confirmarea: **"Site publicat cu succes pe FTP!"**

#### **Ce Primești După Publicare:**
- ✅ Numărul de fișiere urcate (ex: "3 fișiere urcate")
- ✅ Adresa serverului unde s-au urcat
- ✅ Folderul unde s-au urcat

---

### **3. Exemple de Configurare FTP**

#### **Exemplu 1: cPanel Hosting**
```
Protocol: FTP
Host: ftp.domeniul-tau.ro
Port: 21
Username: user@domeniul-tau.ro
Password: parola-ta-ftp
Root Folder: public_html
```

#### **Exemplu 2: Hosting Generic**
```
Protocol: FTP
Host: 123.456.789.10
Port: 21
Username: ftpuser
Password: parola123
Root Folder: www
```

#### **Exemplu 3: Root Direct**
```
Protocol: FTP
Host: ftp.site.com
Port: 21
Username: admin
Password: secure_pass
Root Folder: (lasă gol pentru root)
```

---

## 🔄 Diferența între Opțiunile de Publicare

### **💾 Salvează Proiect Complet**
- **Ce face**: Salvează TOTUL într-un fișier `.mbp` pentru editare ulterioară
- **Pentru cine**: Pentru a păstra o copie editabilă a proiectului
- **Output**: Fișier `.mbp` (JSON)
- **Poate fi deschis**: Da, folosind butonul "📂 Încarcă Proiect"

### **💻 Export HTML (ZIP)**
- **Ce face**: Exportă TOATE paginile ca fișiere HTML într-un ZIP
- **Pentru cine**: Pentru a descărca site-ul gata făcut (fără posibilitate de editare)
- **Output**: Fișier `.zip` cu fișiere HTML + README
- **Poate fi deschis**: Nu în aplicație, doar pentru upload manual pe server

### **🌐 Publică via FTP**
- **Ce face**: Urcă automat TOATE paginile HTML pe serverul tău FTP
- **Pentru cine**: Pentru publicare instantanee pe server
- **Output**: Fișiere urcate direct pe server
- **Poate fi deschis**: Nu în aplicație, doar vizualizare pe web

---

## ❓ Întrebări Frecvente

### **1. Unde sunt salvate datele mele când lucrez în aplicație?**
- Datele sunt salvate **local în browser** (localStorage)
- Datele **NU sunt salvate automat** în fișiere `.mbp`
- Trebuie să apeși **"Publish" → "Salvează Proiect"** pentru a salva un fișier `.mbp`

### **2. Pot avea mai multe proiecte?**
- Da! Poți salva **multiple fișiere `.mbp`** (de ex: `proiect1.mbp`, `proiect2.mbp`)
- Fiecare fișier `.mbp` poate conține mai multe site-uri

### **3. Ce se întâmplă dacă închid browser-ul?**
- Datele din **localStorage rămân** (nu se pierd)
- Dar este recomandat să salvezi un fișier `.mbp` pentru siguranță

### **4. FTP-ul nu funcționează. Ce fac?**
**Verificări:**
- ✅ Test Connection reușește? Dacă da, setările FTP sunt corecte
- ✅ Root Folder corect? (unii hosting-uri necesită `public_html`, alții `www`)
- ✅ Portul corect? (de obicei `21` pentru FTP)
- ✅ Username/Password corecte?

**Dacă Test Connection reușește dar Publish nu funcționează:**
- Verifică logurile din consola browser-ului (F12)
- Verifică dacă ai permisiuni de scriere pe folder
- Contactează hosting-ul pentru verificare

### **5. Pot exporta doar o pagină?**
- Momentan, Export HTML (ZIP) și FTP publică **toate paginile** site-ului curent
- Dacă vrei doar o pagină, poți folosi butonul "Export" din Page Settings (funcționalitate viitoare)

---

## 💡 Recomandări Best Practices

1. **Salvează frecvent**: Apasă "Salvează Proiect" după fiecare modificare importantă
2. **Testează FTP**: Folosește "Test Connection" înainte să publici
3. **Backup regulat**: Păstrează mai multe versiuni `.mbp` ale proiectului
4. **Verifică live**: După publicare FTP, verifică site-ul live în browser
5. **Nume descriptive**: Folosește nume clare pentru fișierele `.mbp` (ex: `site-portfolio-v2.mbp`)

---

## 🆘 Suport

Dacă întâmpini probleme:
1. Verifică acest ghid
2. Verifică consola browser-ului (F12 → Console) pentru erori
3. Contactează dezvoltatorul pentru asistență

---

**Versiune**: 1.0  
**Ultima actualizare**: November 2024  
**Aplicație**: Mobirise Builder Clone
