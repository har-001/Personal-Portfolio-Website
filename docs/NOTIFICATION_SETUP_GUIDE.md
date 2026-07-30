# 🔔 Email & WhatsApp Notification Setup Guide

This guide explains how to receive instant **Email** and **WhatsApp** notifications on your phone whenever the Job Agent or Freelance Agent applies to a job or bids on a project.

---

## 1. 📧 Email Notification Setup (2 Options)

### Option A: Gmail / SMTP in n8n (Recommended)
1. Go to your Google Account ➔ **Security** ➔ **2-Step Verification** ➔ **App Passwords**.
2. Generate an App Password for "n8n".
3. In n8n, open the **Gmail / EmailSend** node.
4. Set credentials:
   - **Email**: `harshitmishra1208@gmail.com`
   - **Password**: *(Your generated App Password)*
5. Now, every time an application/bid is submitted, an email is sent to your inbox!

### Option B: EmailJS (Client-Side HTML/JS)
1. Sign up free at [emailjs.com](https://www.emailjs.com).
2. Create an Email Service connected to `harshitmishra1208@gmail.com`.
3. In `js/main.js`, update your EmailJS Public Key.

---

## 2. 💬 WhatsApp Notification Setup (3 Easy Ways)

### Method 1: CallMeBot WhatsApp API (100% FREE — Takes 1 Minute)
This is the easiest 100% free way to get WhatsApp notifications on your phone!

1. Save the number **+34 644 44 44 94** (CallMeBot) in your phone contacts.
2. Send a WhatsApp message to it saying:
   `I allow callmebot to send me messages`
3. CallMeBot will reply with your personal **API Key** (e.g. `123456`).
4. In n8n (or Python script), add an HTTP Request node with this URL:
   ```
   https://api.callmebot.com/whatsapp.php?phone=+91XXXXXXXXXX&text=Applied+to+Job!&apikey=YOUR_API_KEY
   ```
5. Done! You will now get WhatsApp alerts instantly on your phone whenever a job is applied to!

---

### Method 2: Twilio WhatsApp API
1. Create a free account at [twilio.com](https://www.twilio.com).
2. Go to **Messaging** ➔ **Try WhatsApp Sandbox**.
3. Copy your `Account SID` and `Auth Token`.
4. In n8n, use the **Twilio** node and select WhatsApp.

---

### Method 3: Green API / UltraMsg
1. Register at [green-api.com](https://green-api.com) or [ultramsg.com](https://ultramsg.com).
2. Scan the QR code with your WhatsApp.
3. Use their Webhook URL in n8n to send instant WhatsApp notifications.

---

## 📋 Summary of What You Need to Do

| Notification | Best Free Provider | Setup Time |
|---|---|---|
| **Email** | Gmail App Password (n8n) / EmailJS | 2 Minutes |
| **WhatsApp** | CallMeBot WhatsApp API | 1 Minute |
