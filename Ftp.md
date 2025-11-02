Stack Tehnologic pentru FTP Upload
1. Backend (Python + FastAPI)
Librării necesare:

pip install fastapi uvicorn python-multipart
# ftplib este deja inclus în Python (standard library)
Cod Backend Esențial:

from fastapi import FastAPI, APIRouter
from ftplib import FTP
import io
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Modele de date
class FTPConfig(BaseModel):
    host: str
    port: str = "21"
    username: str
    password: str
    rootFolder: str = "/"

class FTPUploadRequest(BaseModel):
    ftpConfig: FTPConfig
    content: str  # HTML sau orice conținut

@api_router.post("/ftp/upload")
async def upload_to_ftp(request: FTPUploadRequest):
    try:
        # Conectare FTP
        ftp = FTP()
        ftp.connect(request.ftpConfig.host, int(request.ftpConfig.port))
        ftp.login(request.ftpConfig.username, request.ftpConfig.password)
        
        # Schimbă directorul
        if request.ftpConfig.rootFolder != '/':
            ftp.cwd(request.ftpConfig.rootFolder)
        
        # Upload fișier
        content_bytes = request.content.encode('utf-8')
        file_buffer = io.BytesIO(content_bytes)
        ftp.storbinary('STOR index.html', file_buffer)
        
        ftp.quit()
        
        return {"success": True, "message": "Upload successful"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

app.include_router(api_router)
2. Frontend (React)
Componenta Dialog FTP:

import React, { useState } from 'react';

export const FTPUploader = ({ content }) => {
  const [ftpConfig, setFtpConfig] = useState({
    host: '',
    port: '21',
    username: '',
    password: '',
    rootFolder: '/'
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    setIsUploading(true);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/ftp/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ftpConfig,
          content
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert('Upload successful!');
      } else {
        alert(`Error: ${result.detail}`);
      }
    } catch (error) {
      alert(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="ftp-dialog">
      <h2>FTP Upload</h2>
      
      <input
        type="text"
        placeholder="FTP Server"
        value={ftpConfig.host}
        onChange={(e) => setFtpConfig({...ftpConfig, host: e.target.value})}
      />
      
      <input
        type="text"
        placeholder="Username"
        value={ftpConfig.username}
        onChange={(e) => setFtpConfig({...ftpConfig, username: e.target.value})}
      />
      
      <input
        type="password"
        placeholder="Password"
        value={ftpConfig.password}
        onChange={(e) => setFtpConfig({...ftpConfig, password: e.target.value})}
      />
      
      <input
        type="text"
        placeholder="Port (21)"
        value={ftpConfig.port}
        onChange={(e) => setFtpConfig({...ftpConfig, port: e.target.value})}
      />
      
      <input
        type="text"
        placeholder="Root Folder (/)"
        value={ftpConfig.rootFolder}
        onChange={(e) => setFtpConfig({...ftpConfig, rootFolder: e.target.value})}
      />
      
      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload to FTP'}
      </button>
    </div>
  );
};
3. Alternative Moderne (Recomandări)
A. Node.js Backend (în loc de Python)
npm install basic-ftp express
const express = require('express');
const { Client } = require('basic-ftp');

app.post('/api/ftp/upload', async (req, res) => {
  const client = new Client();
  
  try {
    await client.access({
      host: req.body.ftpConfig.host,
      user: req.body.ftpConfig.username,
      password: req.body.ftpConfig.password,
      port: req.body.ftpConfig.port
    });
    
    await client.uploadFrom(Buffer.from(req.body.content), 'index.html');
    await client.close();
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
B. SFTP (mai sigur decât FTP)
pip install paramiko  # Python
npm install ssh2-sftp-client  # Node.js
Python cu SFTP:

import paramiko

def upload_sftp(host, username, password, local_content, remote_path):
    transport = paramiko.Transport((host, 22))
    transport.connect(username=username, password=password)
    
    sftp = paramiko.SFTPClient.from_transport(transport)
    sftp.putfo(io.BytesIO(local_content.encode()), remote_path)
    
    sftp.close()
    transport.close()
4. Fișier .env (Configurare)
# Frontend (.env)
REACT_APP_BACKEND_URL=http://localhost:8001

# Backend (.env) - opțional, dacă vrei FTP credentials default
FTP_HOST=ftp.example.com
FTP_USER=username
FTP_PASS=password
5. Checklist Complet pentru Implementare
Backend:

✅ Instalează fastapi, uvicorn (Python) SAU express, basic-ftp (Node.js)
✅ Creează endpoint /api/ftp/upload
✅ Folosește ftplib (Python) sau basic-ftp (Node.js)
✅ Implementează error handling pentru conexiuni FTP
Frontend:

✅ Creează formular cu: host, username, password, port, rootFolder
✅ Configurează REACT_APP_BACKEND_URL în .env
✅ Folosește process.env.REACT_APP_BACKEND_URL (NU import.meta.env.VITE_*)
✅ Adaugă loading state și error handling
Securitate:

✅ Nu salva parola în localStorage
✅ Folosește HTTPS pentru comunicare
✅ Consideră SFTP (port 22) în loc de FTP (port 21) pentru producție
6. Tech Stack Recomandat
Caz de utilizare	Backend	FTP Library	Frontend
Simplu & Rapid	Python + FastAPI	ftplib (built-in)	React
JavaScript Full-Stack	Node.js + Express	basic-ftp	React/Vue
Securitate Maximă	Python + FastAPI	paramiko (SFTP)	React
Enterprise	Python + FastAPI	paramiko (SFTP)	React + TypeScript
7. Exemplu Minim Funcțional (Full-Stack)
Backend (server.py):

from fastapi import FastAPI
from ftplib import FTP
import io

app = FastAPI()

@app.post("/api/ftp/upload")
async def upload(host: str, user: str, pwd: str, content: str):
    ftp = FTP(host)
    ftp.login(user, pwd)
    ftp.storbinary('STOR index.html', io.BytesIO(content.encode()))
    ftp.quit()
    return {"success": True}
Frontend (App.jsx):

const uploadToFTP = async () => {
  await fetch('http://localhost:8000/api/ftp/upload', {
    method: 'POST',
    body: JSON.stringify({
      host: 'ftp.example.com',
      user: 'username',
      pwd: 'password',
      content: '<html>Hello World</html>'
    })
  });
};
Sumar: Pentru FTP în orice aplicație nouă, ai nevoie de:

Backend: Python (ftplib) sau Node.js (basic-ftp)
Frontend: React cu fetch API
Environment variables corect configurate
Error handling pentru conexiuni FTP
