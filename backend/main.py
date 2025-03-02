from fastapi import FastAPI, HTTPException, Depends, status, Request, Response, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import uvicorn
import json
import os
import logging
from datetime import datetime
from typing import List, Optional, Dict, Any

# Logging ayarları
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler("bot.log")
    ]
)

logger = logging.getLogger("twitter-bot")

app = FastAPI(title="Twitter Otomatik Etkileşim Botu API")

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tüm originlere izin ver (geliştirme için)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Veri modelleri
class Account(BaseModel):
    id: str
    username: str
    name: str
    avatar: str
    status: str
    lastChecked: str
    tweetsLiked: int
    tweetsReplied: int

class Response(BaseModel):
    id: str
    text: str
    usageCount: int
    lastUsed: Optional[str] = None

class Log(BaseModel):
    id: str
    timestamp: str
    level: str
    message: str
    details: Optional[str] = None

class Settings(BaseModel):
    checkInterval: int
    maxLikesPerDay: int
    maxRepliesPerDay: int
    enableNotifications: bool
    notificationEmail: Optional[str] = None
    pauseOvernight: bool
    pauseStart: Optional[str] = None
    pauseEnd: Optional[str] = None
    twitterApiKey: str
    twitterApiSecret: str
    twitterAccessToken: str
    twitterAccessTokenSecret: str

# Veri dosyalarını başlat
def init_data_files():
    data_dir = os.path.join(os.path.dirname(__file__), "data")
    os.makedirs(data_dir, exist_ok=True)
    
    files = {
        "accounts.json": [],
        "responses.json": [],
        "logs.json": [],
        "settings.json": {
            "checkInterval": 5,
            "maxLikesPerDay": 50,
            "maxRepliesPerDay": 20,
            "enableNotifications": True,
            "notificationEmail": "kullanici@ornek.com",
            "pauseOvernight": False,
            "pauseStart": "22:00",
            "pauseEnd": "07:00",
            "twitterApiKey": "",
            "twitterApiSecret": "",
            "twitterAccessToken": "",
            "twitterAccessTokenSecret": ""
        }
    }
    
    for filename, default_data in files.items():
        file_path = os.path.join(data_dir, filename)
        if not os.path.exists(file_path):
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(default_data, f, ensure_ascii=False, indent=2)

# Veri işlemleri
def read_data(file_name):
    file_path = os.path.join(os.path.dirname(__file__), "data", file_name)
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Veri okuma hatası: {str(e)}")
        return []

def write_data(file_name, data):
    file_path = os.path.join(os.path.dirname(__file__), "data", file_name)
    try:
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        return True
    except Exception as e:
        logger.error(f"Veri yazma hatası: {str(e)}")
        return False

def add_log(level, message, details=None):
    logs = read_data("logs.json")
    log_id = str(len(logs) + 1)
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    new_log = {
        "id": log_id,
        "timestamp": timestamp,
        "level": level,
        "message": message,
        "details": details
    }
    
    logs.append(new_log)
    write_data("logs.json", logs)
    return new_log

# API rotaları
@app.get("/")
async def root():
    return {"message": "Twitter Otomatik Etkileşim Botu API'sine Hoş Geldiniz"}

# Hesap rotaları
@app.get("/accounts", response_model=List[Account])
async def get_accounts():
    return read_data("accounts.json")

@app.post("/accounts", response_model=Account)
async def create_account(account: Account):
    accounts = read_data("accounts.json")
    accounts.append(account.dict())
    if write_data("accounts.json", accounts):
        add_log("info", f"Yeni hesap eklendi: @{account.username}")
        return account
    raise HTTPException(status_code=500, detail="Hesap eklenemedi")

@app.put("/accounts/{account_id}", response_model=Account)
async def update_account(account_id: str, account: Account):
    accounts = read_data("accounts.json")
    for i, acc in enumerate(accounts):
        if acc["id"] == account_id:
            accounts[i] = account.dict()
            if write_data("accounts.json", accounts):
                add_log("info", f"Hesap güncellendi: @{account.username}")
                return account
    raise HTTPException(status_code=404, detail="Hesap bulunamadı")

@app.delete("/accounts/{account_id}")
async def delete_account(account_id: str):
    accounts = read_data("accounts.json")
    for i, acc in enumerate(accounts):
        if acc["id"] == account_id:
            deleted = accounts.pop(i)
            if write_data("accounts.json", accounts):
                add_log("info", f"Hesap silindi: @{deleted['username']}")
                return {"message": "Hesap başarıyla silindi"}
    raise HTTPException(status_code=404, detail="Hesap bulunamadı")

# Yanıt rotaları
@app.get("/responses", response_model=List[Response])
async def get_responses():
    return read_data("responses.json")

@app.post("/responses", response_model=Response)
async def create_response(response: Response):
    responses = read_data("responses.json")
    responses.append(response.dict())
    if write_data("responses.json", responses):
        add_log("info", "Yeni yanıt şablonu eklendi")
        return response
    raise HTTPException(status_code=500, detail="Yanıt eklenemedi")

@app.put("/responses/{response_id}", response_model=Response)
async def update_response(response_id: str, response: Response):
    responses = read_data("responses.json")
    for i, resp in enumerate(responses):
        if resp["id"] == response_id:
            responses[i] = response.dict()
            if write_data("responses.json", responses):
                add_log("info", "Yanıt şablonu güncellendi")
                return response
    raise HTTPException(status_code=404, detail="Yanıt bulunamadı")

@app.delete("/responses/{response_id}")
async def delete_response(response_id: str):
    responses = read_data("responses.json")
    for i, resp in enumerate(responses):
        if resp["id"] == response_id:
            deleted = responses.pop(i)
            if write_data("responses.json", responses):
                add_log("info", "Yanıt şablonu silindi")
                return {"message": "Yanıt başarıyla silindi"}
    raise HTTPException(status_code=404, detail="Yanıt bulunamadı")

# Günlük rotaları
@app.get("/logs", response_model=List[Log])
async def get_logs():
    return read_data("logs.json")

# Ayar rotaları
@app.get("/settings", response_model=Settings)
async def get_settings():
    return read_data("settings.json")

@app.put("/settings", response_model=Settings)
async def update_settings(settings: Settings):
    if write_data("settings.json", settings.dict()):
        add_log("info", "Ayarlar güncellendi")
        return settings
    raise HTTPException(status_code=500, detail="Ayarlar güncellenemedi")

# Bot kontrol rotaları
@app.post("/bot/start")
async def start_bot():
    # Burada bot başlatma mantığı olacak
    add_log("info", "Bot başlatıldı")
    return {"status": "running", "message": "Bot başarıyla başlatıldı"}

@app.post("/bot/stop")
async def stop_bot():
    # Burada bot durdurma mantığı olacak
    add_log("info", "Bot durduruldu")
    return {"status": "stopped", "message": "Bot başarıyla durduruldu"}

@app.get("/bot/status")
async def get_bot_status():
    # Burada bot durumu kontrol edilecek
    return {"status": "running", "lastCheck": "5 dakika önce", "nextCheck": "5 dakika içinde"}

@app.on_event("startup")
async def startup_event():
    # Veri dosyalarını başlat
    init_data_files()
    logger.info("API sunucusu başlatıldı")
    add_log(
        level="info",
        message="API sunucusu başlatıldı",
        details="Twitter Otomatik Etkileşim Botu API sunucusu başlatıldı"
    )

# Ana giriş noktası
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
