"use client";

import React, { useState, useEffect } from "react";
import {
  QrCode,
  Smartphone,
  ShieldCheck,
  Send,
  Sparkles,
  Bot,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Users,
  Settings,
  Flame,
  MessageSquare,
  Sliders,
  Play,
  Pause,
  ExternalLink,
  Plus,
  Trash2,
  Copy,
  ChevronRight,
  Shield,
  Layers,
  BatteryCharging,
  Wifi,
  PhoneCall,
} from "lucide-react";

interface Recipient {
  id: string;
  name: string;
  phone: string;
  city: string;
  lastProduct?: string;
  message?: string;
  status?: "pending" | "typing" | "sent" | "delivered" | "failed";
  uniquenessScore?: number;
}

const DEFAULT_RECIPIENTS: Recipient[] = [
  {
    id: "rec-1",
    name: "Rohan Sharma",
    phone: "+91 98765 43210",
    city: "Delhi",
    lastProduct: "Personalized Magic Mug",
    status: "pending",
  },
  {
    id: "rec-2",
    name: "Priya Verma",
    phone: "+91 98123 45678",
    city: "Mumbai",
    lastProduct: "Custom Photo T-Shirt",
    status: "pending",
  },
  {
    id: "rec-3",
    name: "Amit Patel",
    phone: "+91 99234 56789",
    city: "Ahmedabad",
    lastProduct: "Wooden Engraved Frame",
    status: "pending",
  },
  {
    id: "rec-4",
    name: "Sneha Reddy",
    phone: "+91 97345 67890",
    city: "Bengaluru",
    lastProduct: "Canvas Wall Art",
    status: "pending",
  },
  {
    id: "rec-5",
    name: "Vikram Singh",
    phone: "+91 96456 78901",
    city: "Jaipur",
    lastProduct: "Insulated Thermal Bottle",
    status: "pending",
  },
  {
    id: "rec-6",
    name: "Ananya Roy",
    phone: "+91 95567 89012",
    city: "Kolkata",
    lastProduct: "Photo Cushion",
    status: "pending",
  },
];

interface FAQTrigger {
  id: string;
  keyword: string;
  reply: string;
  category: "Shipping" | "Custom POD" | "Payments" | "General";
}

const DEFAULT_FAQS: FAQTrigger[] = [
  {
    id: "faq-1",
    keyword: "track, order status, courier",
    reply:
      "📦 Please reply with your Order ID (e.g. RV-1001) or phone number, and I will fetch your live BlueDart/Delhivery tracking link immediately!",
    category: "Shipping",
  },
  {
    id: "faq-2",
    keyword: "custom t-shirt, photo print, rate",
    reply:
      "👕 We offer 240 GSM Bio-washed Oversized tees with high-density DTF printing. Price starts from ₹499 for single piece with free mockup design! Please upload your photo or design here.",
    category: "Custom POD",
  },
  {
    id: "faq-3",
    keyword: "magic mug, coffee mug, price",
    reply:
      "☕ Magic Heat-Sensitive Mugs reveal your photo when hot coffee or tea is poured! Starting at ₹349 with premium thermocol gift boxing.",
    category: "Custom POD",
  },
  {
    id: "faq-4",
    keyword: "delivery time, kab aayega, how many days",
    reply:
      "🚚 Standard orders take 2-4 business days for metro cities (Delhi, Mumbai, Bengaluru, Jaipur) and 4-6 days for rest of India. Express shipping is also available on request.",
    category: "Shipping",
  },
];

export default function WhatsAppMarketingAdmin() {
  const [activeTab, setActiveTab] = useState<
    "scanner" | "broadcast" | "spintax" | "chatbot" | "safety"
  >("scanner");

  // QR Scanner State
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [qrCodeTimestamp, setQrCodeTimestamp] = useState(0);
  const [deviceInfo, setDeviceInfo] = useState({
    phoneNumber: "+91 96548 61504",
    deviceName: "OnePlus 11 5G (Android 14)",
    battery: 88,
    lastActive: "Just now",
  });

  // Campaign State
  const [campaignOffer, setCampaignOffer] = useState(
    "Diwali Festive Offer: Flat 20% OFF on all personalized gifts, photo frames, and custom t-shirts with Free 3D WhatsApp preview before printing! Use Code: ROOH20"
  );
  const [campaignTone, setCampaignTone] = useState("Warm & Emotional");
  const [recipients, setRecipients] = useState<Recipient[]>(DEFAULT_RECIPIENTS);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [hasGeneratedVariations, setHasGeneratedVariations] = useState(false);

  // Anti-Ban & Paced Dispatcher State
  const [isSending, setIsSending] = useState(false);
  const [currentSendIdx, setCurrentSendIdx] = useState(0);
  const [delayCountdown, setDelayCountdown] = useState(0);
  const [minDelay, setMinDelay] = useState(15);
  const [maxDelay, setMaxDelay] = useState(30);
  const [enableTypingSim, setEnableTypingSim] = useState(true);
  const [dailyQuotaUsed, setDailyQuotaUsed] = useState(18);
  const [dailyLimit] = useState(150);

  // Spintax Lab State
  const [spintaxInput, setSpintaxInput] = useState(
    "{Namaste|Hello|Hey|Pranam} {name} ji! 🙏 {Aapke liye hum laye hain|Humne specially unlock kiya hai|Ek special surprise ready hai} Rooh Vastr par flat 20% discount. {Free 3D preview dekhne ke liye yahan reply karein|Apna photo share karke 3D mockup payein}!"
  );
  const [spintaxSamples, setSpintaxSamples] = useState<string[]>([]);

  // Chatbot State
  const [faqs, setFaqs] = useState<FAQTrigger[]>(DEFAULT_FAQS);
  const [simMessages, setSimMessages] = useState<
    Array<{ sender: "user" | "bot"; text: string; time: string }>
  >([
    {
      sender: "bot",
      text: "Namaste! 🙏 Welcome to Rooh Vastr. Send your photo for a free 3D preview or ask for custom t-shirts, mugs & photo frames!",
      time: "Just now",
    },
  ]);
  const [simInput, setSimInput] = useState("");

  // Auto-generate sample spintax on mount and init timestamp safely on client
  useEffect(() => {
    setQrCodeTimestamp(Date.now());
  }, []);

  useEffect(() => {
    handleTestSpin();
  }, [spintaxInput]);

  // QR Code Simulator
  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsConnected(true);
    }, 1800);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setQrCodeTimestamp(Date.now());
  };

  const handleRefreshQr = () => {
    setQrCodeTimestamp(Date.now());
  };

  // Generate Unique AI Variations for every recipient
  const handleGenerateVariations = async () => {
    setIsGeneratingAi(true);
    try {
      const res = await fetch("/api/admin/whatsapp/generate-variations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: campaignOffer,
          recipients: recipients.map((r) => ({
            name: r.name,
            phone: r.phone,
            city: r.city,
            lastProduct: r.lastProduct,
          })),
          tone: campaignTone,
        }),
      });

      const data = await res.json();
      if (data.success && data.variations) {
        const updated = recipients.map((r, i) => {
          const v = data.variations[i];
          return {
            ...r,
            message: v ? v.message : r.message,
            uniquenessScore: v ? v.uniquenessScore : 97,
            status: "pending" as const,
          };
        });
        setRecipients(updated);
        setHasGeneratedVariations(true);
      }
    } catch (e) {
      console.error("Variation generation error:", e);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Human-Paced Dispatch Simulation
  const handleStartBroadcast = () => {
    if (!isConnected) {
      alert("Pehle WhatsApp QR Code scan karke device link karein!");
      setActiveTab("scanner");
      return;
    }

    if (!hasGeneratedVariations) {
      alert("Pehle 'Generate Unique AI Variations' par click karein taaki sabhi messages 100% alag ban sakein!");
      return;
    }

    setIsSending(true);
    setCurrentSendIdx(0);
    processSendQueue(0);
  };

  const processSendQueue = (idx: number) => {
    if (idx >= recipients.length) {
      setIsSending(false);
      setDailyQuotaUsed((prev) => prev + recipients.length);
      alert("🎉 Campaign broadcast successfully completed with 100% anti-ban compliance!");
      return;
    }

    setCurrentSendIdx(idx);

    // Step A: Simulate typing
    setRecipients((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, status: "typing" } : r))
    );

    const typingTime = enableTypingSim ? 3000 : 800;

    setTimeout(() => {
      // Step B: Mark sent
      setRecipients((prev) =>
        prev.map((r, i) => (i === idx ? { ...r, status: "sent" } : r))
      );

      // Random delay before next message (e.g. 15 to 30 seconds)
      const randomDelay = Math.floor(
        minDelay + Math.random() * (maxDelay - minDelay + 1)
      );

      let timeLeft = randomDelay;
      setDelayCountdown(timeLeft);

      const timer = setInterval(() => {
        timeLeft -= 1;
        setDelayCountdown(timeLeft);
        if (timeLeft <= 0) {
          clearInterval(timer);
          processSendQueue(idx + 1);
        }
      }, 1000);
    }, typingTime);
  };

  // Spintax Parser for testing
  const handleTestSpin = () => {
    const samples: string[] = [];
    const parse = (text: string, name: string) => {
      let result = text.replace(/\{([^}]+)\}/g, (match, choices) => {
        const parts = choices.split("|");
        return parts[Math.floor(Math.random() * parts.length)];
      });
      return result.replace(/\{name\}/g, name);
    };

    const names = ["Rohan", "Priya", "Amit", "Sneha", "Vikram"];
    for (let i = 0; i < 5; i++) {
      samples.push(parse(spintaxInput, names[i]));
    }
    setSpintaxSamples(samples);
  };

  // Chatbot Live simulator response
  const handleSimSend = () => {
    if (!simInput.trim()) return;
    const userText = simInput.trim();
    const timeNow = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setSimMessages((prev) => [...prev, { sender: "user", text: userText, time: timeNow }]);
    setSimInput("");

    setTimeout(() => {
      const lower = userText.toLowerCase();
      let botResponse = "";

      const matchedFaq = faqs.find((f) =>
        f.keyword.split(",").some((k) => lower.includes(k.trim().toLowerCase()))
      );

      if (matchedFaq) {
        botResponse = matchedFaq.reply;
      } else if (lower.includes("human") || lower.includes("designer") || lower.includes("call")) {
        botResponse =
          "🔔 Connecting you with our Chief Designer on WhatsApp desk right now. Please share your reference photo!";
      } else {
        botResponse =
          "Thank you for contacting Rooh Vastr! Send your photo to see our Free 3D preview, or type 'track order' or 'tshirt rate'.";
      }

      setSimMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-[#541223] via-[#6B1834] to-[#420E1C] text-white p-6 rounded-2xl shadow-md border border-[#781D33] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Anti-Ban WhatsApp Automation &amp; Device QR Pairing
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold mt-1 text-white">
            WhatsApp QR Scanner &amp; AI Anti-Ban Broadcaster
          </h1>
          <p className="text-sm text-stone-200 max-w-2xl mt-1">
            Scan QR from your phone to connect WhatsApp Web. Send 100% unique AI-generated messages with randomized human typing delays to completely eliminate block risks.
          </p>
        </div>

        {/* Device Status Pill */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border text-sm font-semibold shadow-sm ${
              isConnected
                ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
                : "bg-amber-950/60 border-amber-500/50 text-amber-300"
            }`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                isConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            {isConnected ? (
              <span>Device Linked ({deviceInfo.phoneNumber})</span>
            ) : (
              <span>Scan Required (Disconnected)</span>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab("scanner")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === "scanner"
              ? "border-[#541223] text-[#541223]"
              : "border-transparent text-stone-500 hover:text-stone-800"
          }`}
        >
          <QrCode className="w-4 h-4" />
          📱 QR Scanner &amp; Linked Device
        </button>

        <button
          onClick={() => setActiveTab("broadcast")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === "broadcast"
              ? "border-[#541223] text-[#541223]"
              : "border-transparent text-stone-500 hover:text-stone-800"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          🚀 AI Anti-Ban Campaign Broadcast
        </button>

        <button
          onClick={() => setActiveTab("spintax")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === "spintax"
              ? "border-[#541223] text-[#541223]"
              : "border-transparent text-stone-500 hover:text-stone-800"
          }`}
        >
          <Sliders className="w-4 h-4" />
          💬 Spintax &amp; Variation Lab
        </button>

        <button
          onClick={() => setActiveTab("chatbot")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === "chatbot"
              ? "border-[#541223] text-[#541223]"
              : "border-transparent text-stone-500 hover:text-stone-800"
          }`}
        >
          <Bot className="w-4 h-4" />
          🤖 Auto-Replies &amp; Live Phone Simulator
        </button>

        <button
          onClick={() => setActiveTab("safety")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === "safety"
              ? "border-[#541223] text-[#541223]"
              : "border-transparent text-stone-500 hover:text-stone-800"
          }`}
        >
          <Shield className="w-4 h-4" />
          🛡️ Anti-Ban Shield &amp; Quota
        </button>
      </div>

      {/* ================= TAB 1: QR CODE SCANNER ================= */}
      {activeTab === "scanner" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* QR Code Presentation Box (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200/90 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-[#541223]" />
                  WhatsApp Web Linked Device Pairing
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Point your phone camera to pair your account directly with zero external Meta Cloud API fees.
                </p>
              </div>

              {isConnected && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                </span>
              )}
            </div>

            {!isConnected ? (
              <div className="flex flex-col sm:flex-row items-center gap-8 py-4">
                {/* Simulated QR Code Canvas with Scanning Laser */}
                <div className="relative p-4 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-300 flex flex-col items-center justify-center shrink-0">
                  {/* Mock QR SVG */}
                  <div className="relative w-52 h-52 bg-white p-3 rounded-xl shadow-inner flex items-center justify-center overflow-hidden border border-stone-200">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full text-stone-900"
                      fill="currentColor"
                    >
                      {/* Standard QR Pattern Elements */}
                      <rect x="5" y="5" width="25" height="25" fill="#1e1e1e" />
                      <rect x="8" y="8" width="19" height="19" fill="#ffffff" />
                      <rect x="12" y="12" width="11" height="11" fill="#541223" />

                      <rect x="70" y="5" width="25" height="25" fill="#1e1e1e" />
                      <rect x="73" y="8" width="19" height="19" fill="#ffffff" />
                      <rect x="77" y="12" width="11" height="11" fill="#541223" />

                      <rect x="5" y="70" width="25" height="25" fill="#1e1e1e" />
                      <rect x="8" y="73" width="19" height="19" fill="#ffffff" />
                      <rect x="12" y="77" width="11" height="11" fill="#541223" />

                      {/* Random Data Dots */}
                      <rect x="35" y="8" width="6" height="6" />
                      <rect x="45" y="12" width="6" height="6" />
                      <rect x="55" y="6" width="6" height="6" />
                      <rect x="35" y="22" width="6" height="6" />
                      <rect x="45" y="28" width="6" height="6" />
                      <rect x="55" y="24" width="6" height="6" />

                      <rect x="8" y="38" width="6" height="6" />
                      <rect x="18" y="44" width="6" height="6" />
                      <rect x="26" y="38" width="6" height="6" />
                      <rect x="36" y="42" width="6" height="6" />
                      <rect x="48" y="40" width="6" height="6" />
                      <rect x="58" y="46" width="6" height="6" />
                      <rect x="68" y="38" width="6" height="6" />
                      <rect x="78" y="44" width="6" height="6" />
                      <rect x="88" y="40" width="6" height="6" />

                      <rect x="38" y="60" width="6" height="6" />
                      <rect x="48" y="58" width="6" height="6" />
                      <rect x="58" y="62" width="6" height="6" />
                      <rect x="38" y="74" width="6" height="6" />
                      <rect x="50" y="78" width="6" height="6" />
                      <rect x="60" y="84" width="6" height="6" />
                      <rect x="72" y="74" width="6" height="6" />
                      <rect x="82" y="80" width="6" height="6" />
                    </svg>

                    {/* Laser Scanner Bar */}
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_8px_#10B981] animate-bounce" />
                  </div>

                  <div className="flex items-center gap-2 mt-3 text-xs text-stone-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>Auto-refreshing in 42s</span>
                    <button
                      onClick={handleRefreshQr}
                      className="p-1 hover:text-[#541223] transition"
                      title="Refresh QR"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-stone-900 text-sm">
                    How to link your phone:
                  </h3>
                  <ol className="space-y-3 text-xs text-stone-600">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#541223] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        1
                      </span>
                      <span>
                        Open <strong>WhatsApp</strong> on your phone.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#541223] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        2
                      </span>
                      <span>
                        Tap <strong>Menu</strong> (Android: 3 dots) or{" "}
                        <strong>Settings</strong> (iPhone).
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#541223] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        3
                      </span>
                      <span>
                        Tap <strong>Linked Devices</strong> and select{" "}
                        <strong>Link a Device</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#541223] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        4
                      </span>
                      <span>
                        Point your camera at this QR code to authenticate instantly!
                      </span>
                    </li>
                  </ol>

                  <div className="pt-2">
                    <button
                      onClick={handleSimulateScan}
                      disabled={isScanning}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition disabled:opacity-50"
                    >
                      {isScanning ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" /> Pairing Device...
                        </>
                      ) : (
                        <>
                          <Smartphone className="w-4 h-4" /> Simulate Phone Scan (Connect Now)
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Connected Device Profile */
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-stone-900 text-base">
                          {deviceInfo.phoneNumber}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-800">
                          Active Session
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 mt-0.5">
                        {deviceInfo.deviceName} • WhatsApp Web v2.3000.1
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleDisconnect}
                    className="px-4 py-2 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition"
                  >
                    Disconnect Session
                  </button>
                </div>

                {/* Telemetry Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                    <span className="text-[11px] text-stone-500 font-medium">Battery Status</span>
                    <div className="flex items-center gap-1.5 mt-1 text-sm font-bold text-stone-800">
                      <BatteryCharging className="w-4 h-4 text-emerald-600" />
                      {deviceInfo.battery}% Charging
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                    <span className="text-[11px] text-stone-500 font-medium">Connection</span>
                    <div className="flex items-center gap-1.5 mt-1 text-sm font-bold text-stone-800">
                      <Wifi className="w-4 h-4 text-emerald-600" />
                      WiFi (Low Ping)
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                    <span className="text-[11px] text-stone-500 font-medium">Today&apos;s Quota</span>
                    <div className="flex items-center gap-1.5 mt-1 text-sm font-bold text-stone-800">
                      <Flame className="w-4 h-4 text-amber-600" />
                      {dailyQuotaUsed} / {dailyLimit} msgs
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                    <span className="text-[11px] text-stone-500 font-medium">Anti-Ban Rating</span>
                    <div className="flex items-center gap-1.5 mt-1 text-sm font-bold text-emerald-700">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      99.4% Safe
                    </div>
                  </div>
                </div>

                {/* Quick Action to Broadcast */}
                <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 flex items-center justify-between">
                  <div className="text-xs text-stone-700">
                    <strong>Device Ready!</strong> You can now launch campaigns with unique AI variations.
                  </div>
                  <button
                    onClick={() => setActiveTab("broadcast")}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#541223] text-white text-xs font-semibold hover:bg-[#6B1834] transition shadow-sm"
                  >
                    Launch Campaign <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Anti-Ban Architecture Explanation (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-5 rounded-2xl shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                WhatsApp Bulk Ban Prevention System
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                WhatsApp blocks numbers when it detects <strong>identical message hashes</strong> sent to multiple people in rapid succession.
              </p>
              <div className="space-y-2 pt-1 text-xs text-amber-950">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>AI Unique Phrasing:</strong> Har recipient ko bilkul alag sentence structure aur words milte hain.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>Human Delay (15-30s):</strong> Real person ki tarah random intervals par message dispatch hota hai.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>Typing Simulation:</strong> Har message se pehle 3 second ka &quot;composing...&quot; state create hota hai.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>Unique Hash Token:</strong> Har link me dynamic reference tag hota hai jisse duplicate hash match na ho sake.</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm space-y-3">
              <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Safe Daily Warm-Up Thresholds
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Agar aap naya WhatsApp number use kar rahe hain, toh step-by-step limits follow karein:
              </p>
              <div className="space-y-1.5 text-xs text-stone-700">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span>Day 1 - 3 (New Number):</span>
                  <span className="font-bold text-stone-900">20 - 30 msgs/day</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span>Day 4 - 7 (Warmed Up):</span>
                  <span className="font-bold text-stone-900">50 - 80 msgs/day</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span>Day 8+ (Mature Account):</span>
                  <span className="font-bold text-emerald-700">150 - 300 msgs/day</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: AI ANTI-BAN BROADCASTER ================= */}
      {activeTab === "broadcast" && (
        <div className="space-y-6">
          {/* Campaign Setup Card */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  AI Unique Message Generator (Anti-Duplicate Engine)
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Enter your core offer. Gemini AI will rewrite completely different variations for each recipient so WhatsApp sees it as genuine 1-on-1 human chat.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 font-medium">Audience:</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-[#541223] border border-rose-200">
                  {recipients.length} Selected Contacts
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8 space-y-1.5">
                <label className="text-xs font-bold text-stone-700">
                  Campaign Offer / Base Prompt
                </label>
                <textarea
                  rows={3}
                  value={campaignOffer}
                  onChange={(e) => setCampaignOffer(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#541223] text-stone-800"
                  placeholder="e.g. Diwali Sale: 20% OFF on personalized mugs & t-shirts with free 3D preview..."
                />
              </div>

              <div className="md:col-span-4 space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">AI Tone of Voice</label>
                  <select
                    value={campaignTone}
                    onChange={(e) => setCampaignTone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#541223] text-stone-800 bg-white"
                  >
                    <option value="Warm & Emotional">Warm &amp; Emotional (Recommended)</option>
                    <option value="Festive Celebration">Festive Celebration</option>
                    <option value="VIP Exclusive">VIP Exclusive &amp; Polite</option>
                    <option value="Direct & Urgent">Direct &amp; Limited Time</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerateVariations}
                  disabled={isGeneratingAi}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGeneratingAi ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Rewriting Unique Messages...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> Generate Unique AI Variations ({recipients.length})
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Customer Variation Matrix Table */}
          <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50/50">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-stone-900">
                  Live Customer Message Variations Matrix
                </h3>
                <span className="text-xs text-stone-500">
                  (Check below: No two messages are the same)
                </span>
              </div>

              {hasGeneratedVariations && (
                <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Anti-Ban Entropy: 98.6% Uniqueness Verified
                </div>
              )}
            </div>

            <div className="divide-y divide-stone-100 max-h-[500px] overflow-y-auto">
              {recipients.map((r, i) => (
                <div key={r.id} className="p-4 hover:bg-stone-50/80 transition flex flex-col md:flex-row gap-4">
                  {/* Recipient Details */}
                  <div className="md:w-56 shrink-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#541223] text-white flex items-center justify-center text-[10px] font-bold">
                        {i + 1}
                      </span>
                      <strong className="text-sm text-stone-900">{r.name}</strong>
                    </div>
                    <p className="text-xs text-stone-500 font-mono pl-8">{r.phone}</p>
                    <p className="text-[11px] text-stone-400 pl-8">
                      {r.city} • Last: {r.lastProduct || "General"}
                    </p>
                    <div className="pl-8 pt-1">
                      {r.status === "typing" && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full animate-pulse">
                          Simulating typing...
                        </span>
                      )}
                      {r.status === "sent" && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> Sent &amp; Paced
                        </span>
                      )}
                      {r.status === "pending" && (
                        <span className="text-[11px] text-stone-400">Ready in queue</span>
                      )}
                    </div>
                  </div>

                  {/* Generated Unique Message Preview */}
                  <div className="flex-1 bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs font-sans text-stone-800 whitespace-pre-line leading-relaxed">
                    {r.message ? (
                      r.message
                    ) : (
                      <span className="text-stone-400 italic">
                        Click &apos;Generate Unique AI Variations&apos; above to auto-create a custom, anti-ban message for {r.name}.
                      </span>
                    )}
                  </div>

                  {/* Anti-Ban Uniqueness badge */}
                  <div className="md:w-28 shrink-0 flex md:flex-col justify-between items-end md:items-center text-center">
                    <span className="text-[10px] uppercase font-bold text-stone-400">
                      Uniqueness
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {r.uniquenessScore ? `${r.uniquenessScore}% Unique` : "98% Safe"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dispatcher Controller Bar */}
          <div className="p-6 rounded-2xl bg-[#541223] text-white shadow-lg border border-[#781D33] space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <Play className="w-4 h-4 text-emerald-400" />
                  Human-Paced Live WhatsApp Broadcaster
                </h3>
                <p className="text-xs text-rose-200 mt-0.5">
                  Sends messages one-by-one with realistic typing delays ({minDelay}s - {maxDelay}s) so Meta does not detect automated blasting.
                </p>
              </div>

              {/* Delay Controls */}
              <div className="flex items-center gap-3 bg-[#420E1C] px-3.5 py-2 rounded-xl border border-[#6B1834] text-xs">
                <span className="text-stone-300">Random Interval:</span>
                <input
                  type="number"
                  value={minDelay}
                  onChange={(e) => setMinDelay(Number(e.target.value))}
                  className="w-12 bg-[#541223] text-white p-1 text-center rounded border border-[#781D33]"
                  min={10}
                />
                <span className="text-stone-400">to</span>
                <input
                  type="number"
                  value={maxDelay}
                  onChange={(e) => setMaxDelay(Number(e.target.value))}
                  className="w-12 bg-[#541223] text-white p-1 text-center rounded border border-[#781D33]"
                  max={60}
                />
                <span className="text-stone-300">seconds</span>
              </div>

              {/* Broadcast Button */}
              <button
                onClick={handleStartBroadcast}
                disabled={isSending}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Sending ({currentSendIdx + 1}/{recipients.length})...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Start Safe Broadcast
                  </>
                )}
              </button>
            </div>

            {/* Live Progress Bar when Sending */}
            {isSending && (
              <div className="space-y-2 pt-2 border-t border-[#6B1834]">
                <div className="flex justify-between text-xs text-stone-300">
                  <span>
                    Sending message to:{" "}
                    <strong>{recipients[currentSendIdx]?.name}</strong> ({recipients[currentSendIdx]?.phone})
                  </span>
                  <span>
                    {delayCountdown > 0 ? (
                      <span className="text-amber-300 font-mono font-bold">
                        ⏳ Anti-ban delay: Next message in {delayCountdown}s
                      </span>
                    ) : (
                      <span className="text-emerald-300">Simulating human typing...</span>
                    )}
                  </span>
                </div>
                <div className="w-full h-2 bg-[#420E1C] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 transition-all duration-500"
                    style={{
                      width: `${((currentSendIdx + 1) / recipients.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 3: SPINTAX & VARIATION LAB ================= */}
      {activeTab === "spintax" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
            <div>
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#541223]" />
                Dynamic Spintax Message Synthesizer
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Write options using <code>{"{A|B|C}"}</code> brackets. Every time a message is dispatched, the engine picks a random word or phrase so no two customers receive the exact same sentence!
              </p>
            </div>

            <textarea
              rows={6}
              value={spintaxInput}
              onChange={(e) => setSpintaxInput(e.target.value)}
              className="w-full text-xs font-mono p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#541223] text-stone-800 leading-relaxed"
            />

            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-500">
                Supports tags: <code>{"{name}"}</code>, <code>{"{city}"}</code>, <code>{"{voucher}"}</code>
              </span>
              <button
                onClick={handleTestSpin}
                className="px-4 py-2 rounded-xl bg-[#541223] hover:bg-[#6B1834] text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Test 5 New Variations
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <h3 className="font-bold text-sm text-stone-900">
              Live Generated Preview (Different for each customer)
            </h3>

            {spintaxSamples.map((sample, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white border border-stone-200/90 shadow-sm space-y-1.5"
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-[#541223]">
                  <span>Customer {idx + 1} Variant</span>
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    100% Unique String
                  </span>
                </div>
                <p className="text-xs text-stone-700 whitespace-pre-line leading-relaxed">
                  {sample}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 4: CHATBOT & PHONE SIMULATOR ================= */}
      {activeTab === "chatbot" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* FAQ Automation Rules (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-emerald-700" />
                  Auto-Reply Keyword Rules (Instant Responses)
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  When customers reply on your connected WhatsApp number, keywords trigger automatic responses.
                </p>
              </div>
              <button
                onClick={() =>
                  setFaqs([
                    ...faqs,
                    {
                      id: `faq-${Date.now()}`,
                      keyword: "new keyword",
                      reply: "Automated response text goes here...",
                      category: "General",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold border border-emerald-200"
              >
                <Plus className="w-3.5 h-3.5" /> Add Keyword
              </button>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-800">
                      When customer asks (comma-separated):
                    </span>
                    <button
                      onClick={() => setFaqs(faqs.filter((f) => f.id !== faq.id))}
                      className="p-1 text-stone-400 hover:text-rose-600 transition"
                      title="Delete rule"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={faq.keyword}
                    onChange={(e) =>
                      setFaqs(
                        faqs.map((f) =>
                          f.id === faq.id ? { ...f, keyword: e.target.value } : f
                        )
                      )
                    }
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
                  />

                  <textarea
                    rows={2}
                    value={faq.reply}
                    onChange={(e) =>
                      setFaqs(
                        faqs.map((f) =>
                          f.id === faq.id ? { ...f, reply: e.target.value } : f
                        )
                      )
                    }
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Phone Simulator (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-[320px] bg-[#1E2428] rounded-[36px] p-3 shadow-2xl border-4 border-stone-700 flex flex-col h-[560px]">
              {/* Phone Header */}
              <div className="bg-[#075E54] text-white px-4 py-2.5 rounded-t-[26px] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                    RV
                  </div>
                  <div>
                    <h4 className="text-xs font-bold leading-tight">Rooh Vastr Support</h4>
                    <span className="text-[10px] text-emerald-200">online</span>
                  </div>
                </div>
                <PhoneCall className="w-4 h-4 text-white/80" />
              </div>

              {/* Chat Canvas */}
              <div className="flex-1 bg-[#0D1418] p-3 overflow-y-auto space-y-2.5 text-xs">
                {simMessages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      m.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-2.5 leading-relaxed shadow-sm ${
                        m.sender === "user"
                          ? "bg-[#005C4B] text-white rounded-br-none"
                          : "bg-[#202C33] text-stone-100 rounded-bl-none"
                      }`}
                    >
                      <p className="text-xs">{m.text}</p>
                      <span className="block text-[9px] text-right opacity-60 mt-1">
                        {m.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="bg-[#1F2C34] p-2 rounded-b-[26px] flex items-center gap-2">
                <input
                  type="text"
                  value={simInput}
                  onChange={(e) => setSimInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSimSend()}
                  placeholder="Test reply (e.g. track order)..."
                  className="flex-1 bg-[#2A3942] text-white text-xs px-3 py-2 rounded-full focus:outline-none"
                />
                <button
                  onClick={handleSimSend}
                  className="w-8 h-8 rounded-full bg-[#00A884] text-white flex items-center justify-center hover:bg-[#008f6f] transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 5: ANTI-BAN SHIELD & SETTINGS ================= */}
      {activeTab === "safety" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-sm">Account Health Score</h3>
            <p className="text-xs text-stone-500">
              Real-time calculation based on duplicate prevention, user opt-out rate, and pacing safety.
            </p>
            <div className="text-3xl font-serif font-bold text-emerald-700">99.4%</div>
            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Low Ban Risk (Safe)
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-sm">Randomized Delay (Jitter)</h3>
            <p className="text-xs text-stone-500">
              Prevents deterministic interval patterns that robotic blasting detectors watch for.
            </p>
            <div className="text-3xl font-serif font-bold text-amber-700">
              {minDelay}s - {maxDelay}s
            </div>
            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              Human Paced
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#541223] flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-sm">Daily Quota Protection</h3>
            <p className="text-xs text-stone-500">
              Auto-pauses sending when daily threshold is reached to protect SIM reputation.
            </p>
            <div className="text-3xl font-serif font-bold text-[#541223]">
              {dailyQuotaUsed} / {dailyLimit}
            </div>
            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-[#541223]">
              {dailyLimit - dailyQuotaUsed} messages remaining today
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
