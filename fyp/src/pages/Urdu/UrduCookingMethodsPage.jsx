import React, { useState } from 'react';
import './UrduCookingMethodsPage.css';
import { useNavigate } from 'react-router-dom';

const UrduCookingMethodsPage = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);

  // COOKING METHODS DATA (URDU)
  const cookingMethods = [
    {
      id: 1,
      name: "ابلنا",
      nameEn: "Boiling",
      tagline: "ابلتے پانی میں پکانا",
      fullDesc: "ابلنا ایک گیلی حرارت پکانے کا طریقہ ہے جس میں کھانے کو 100°C (212°F) پر پانی میں ڈبو دیا جاتا ہے۔ یہ طریقہ پاستا، سبزیاں، انڈے اور اناج پکانے کے لیے بہترین ہے۔ یہ ایک تیز پکانے کا طریقہ ہے جو مناسب طریقے سے کرنے پر غذائیت محفوظ رکھتا ہے۔",
      keyUses: ["پاستا", "سبزیاں", "انڈے", "چاول"],
      previewImg: "BoilingMethod.png",
      temperature: "100°C (212°F)",
      equipment: "ساس پین, اسٹاک پاٹ",
      bestFor: "پاستا، سخت سبزیاں، اناج",
      tips: ["ذائقے کے لیے نمکین پانی استعمال کریں", "برتن میں بھیڑ نہ کریں", "پاستا کے لیے تیز ابال استعمال کریں", "برف پانی پکانا روکتا ہے"],
      steps: [
        "برتن میں پانی ڈال کر تیز ابال پر لائیں۔",
        "ابلتے پانی میں ذائقے کے لیے نمک ڈالیں۔",
        "احتیاط سے کھانا ابلتے پانی میں ڈالیں۔",
        "تجویز کردہ وقت تک پکائیں، کبھی کبھار ہلاتے رہیں۔",
        "چھان کر فوراً پیش کریں یا برف پانی میں ڈالیں۔"
      ]
    },
    {
      id: 2,
      name: "دم دینا",
      nameEn: "Simmering",
      tagline: "ابلتے نقطہ سے نیچے ہلکا پکانا",
      fullDesc: "دم دینا میں کھانا 85-95°C (185-203°F) کے درجہ حرارت پر مائع میں پکایا جاتا ہے۔ مائع میں چھوٹے بلبلے اور ہلکی حرکت نظر آتی ہے۔ یہ طریقہ نازک کھانوں کے لیے بہترین ہے جنہیں آہستہ، یکساں پکانے کی ضرورت ہوتی ہے بغیر ٹوٹے۔",
      keyUses: ["سوپ", "سٹو", "چٹنیاں", "اناج"],
      previewImg: "SimmeringMethod.png",
      temperature: "85-95°C (185-203°F)",
      equipment: "ساس پین, ڈچ اوون",
      bestFor: "نرم گوشت، سوپ، چٹنیاں",
      tips: ["ہلکے بلبلے برقرار رکھیں", "گرمی برقرار رکھنے کے لیے ڈھکن استعمال کریں", "کبھی کبھار ہلائیں", "ضرورت کے مطابق گرمی ایڈجسٹ کریں"],
      steps: [
        "پہلے مائع کو ابال پر لائیں۔",
        "گرمی کم کریں جب تک بلبلے چھوٹے اور ہلکے نہ ہوں۔",
        "اجزاء دم دیتے مائع میں ڈالیں۔",
        "جزوی طور پر ڈھانپیں تاکہ بھاپ نکل سکے۔",
        "جب تک کھانا نرم ہو اور ذائقے مل جائیں پکائیں۔"
      ]
    },
    {
      id: 3,
      name: "بھاپ دینا",
      nameEn: "Steaming",
      tagline: "بھاپ کی گرمی سے پکانا",
      fullDesc: "بھاپ دینا میں کھانے کو ابلتے پانی سے نکلنے والی بھاپ کے سامنے رکھ کر پکایا جاتا ہے۔ یہ گیلی حرارت کا طریقہ غذائیت، رنگ اور ساخت کو ابالنے سے بہتر محفوظ رکھتا ہے۔ کھانا پانی کو نہیں چھوتا، غذائیت کے نقصان کو روکتا ہے۔",
      keyUses: ["سبزیاں", "مچھلی", "ڈمپلنگ", "چاول"],
      previewImg: "SteamingMethod.png",
      temperature: "100°C (212°F)",
      equipment: "بھاپ ٹوکری, بانس سٹیمر",
      bestFor: "نازک سبزیاں، سمندری کھانا، ڈم سم",
      tips: ["پانی کھانے کو نہ چھونے دیں", "چست ڈھکن استعمال کریں", "پانی کی سطح چیک کریں", "کھانے کو مناسب طور پر تہہ کریں"],
      steps: [
        "برتن میں پانی ڈال کر ابال پر لائیں۔",
        "بھاپ کی ٹوکری پانی کے اوپر (اندر نہیں) رکھیں۔",
        "کھانے کو ٹوکری میں ایک تہہ میں ترتیب دیں۔",
        "چست ڈھکن سے ڈھانپ کر بھاپ روکیں۔",
        "تجویز کردہ وقت تک بھاپ دیں۔"
      ]
    },
    {
      id: 4,
      name: "بھوننا",
      nameEn: "Sautéing",
      tagline: "کم تیل میں جلدی تلنا",
      fullDesc: "بھوننا میں کھانا تھوڑے سے تیل یا چکنائی میں نسبتاً تیز آنچ پر جلدی پکایا جاتا ہے۔ فرانسیسی لفظ 'sauter' کا مطلب 'چھلانگ لگانا' ہے، جو اچھالنے کی حرکت کی طرف اشارہ کرتا ہے۔ یہ طریقہ جلتے ہوئے ذائقے دار سطحیں بناتا ہے جبکہ اندرونی حصہ نرم رہتا ہے۔",
      keyUses: ["سبزیاں", "گوشت کے ٹکڑے", "جھینگے", "کھمبی"],
      previewImg: "SautingMethod.png",
      temperature: "درمیانی تیز آنچ",
      equipment: "سکیلٹ, بھونائی پین",
      bestFor: "جلدی پکنے والے اجزاء، چینی تلے پکوان",
      tips: ["پین کو مناسب گرم کریں", "پین میں بھیڑ نہ کریں", "کھانے کو حرکت دیتے رہیں", "تیز دھوئیں نقطہ والا تیل استعمال کریں"],
      steps: [
        "پین کو درمیانی تیز آنچ پر گرم کریں۔",
        "تھوڑا تیل ڈال کر گرم کریں جب تک چمکنے لگے۔",
        "اجزاء ایک تہہ میں ڈالیں۔",
        "1-2 منٹ بغیر حرکت کے پکائیں تاکہ جھلس جائے۔",
        "بار بار اچھالیں یا ہلائیں جب تک پک نہ جائے۔"
      ]
    },
    {
      id: 5,
      name: "تلنا",
      nameEn: "Pan-Frying",
      tagline: "تیل میں اتھلی تلائی",
      fullDesc: "تلنا میں بھوننے سے زیادہ تیل استعمال ہوتا ہے (تقریباً 1/4 سے 1/2 انچ گہرا) کھانا پکانے کے لیے۔ تیل کھانے کا آدھا حصہ ڈھانپنا چاہیے۔ یہ طریقہ باہر سے کرنچی سطح بناتا ہے جبکہ اندرونی حصہ کنڈکشن سے پکتا ہے۔",
      keyUses: ["چکن کٹلٹس", "مچھلی فلیٹ", "پٹیز", "آلو"],
      previewImg: "Pan-FryingMethod.png",
      temperature: "درمیانی آنچ",
      equipment: "سکیلٹ, تلائی پین",
      bestFor: "بریڈڈ کھانے، موٹے کٹ، کرنچی ساخت",
      tips: ["تیل کا درجہ حرارت برقرار رکھیں", "جلدی نہ پلٹیں", "کاغذ تولیے پر چھان لیں", "فوراً مسالا لگائیں"],
      steps: [
        "پین میں تیل ڈالیں (1/4 سے 1/2 انچ گہرا)۔",
        "تیل کو مناسب درجہ حرارت پر گرم کریں (دھواں نہ آنے دیں)۔",
        "احتیاط سے کھانا گرم تیل میں ڈالیں۔",
        "ایک طرف سنہری ہونے تک پکائیں۔",
        "پلٹ کر دوسری طرف سنہری اور پکنے تک پکائیں۔"
      ]
    },
    {
      id: 6,
      name: "گہری تلائی",
      nameEn: "Deep-Frying",
      tagline: "گرم تیل میں مکمل ڈبونا",
      fullDesc: "گہری تلائی میں کھانا مکمل طور پر گرم تیل میں ڈبو دیا جاتا ہے (عام طور پر 175-190°C/350-375°F)۔ یہ باہر سے کرنچی، سنہری سطح بناتا ہے جبکہ نمی اندر بند رہتی ہے۔ مناسب درجہ حرارت کنٹرول ضروری ہے تیل جذب ہونے سے روکنے کے لیے۔",
      keyUses: ["فرنچ فرائز", "چکن", "ڈونٹس", "فرٹرز"],
      previewImg: "Deep-FryingMethod.png",
      temperature: "175-190°C (350-375°F)",
      equipment: "گہری تلائی مشین, ڈچ اوون",
      bestFor: "بیٹر والے کھانے، کرنچی نمکین",
      tips: ["تھرمامیٹر استعمال کریں", "بیچوں میں تلیں", "اچھی طرح چھان لیں", "تیل کو مناسب دوبارہ استعمال کریں"],
      steps: [
        "تلائی مشین میں تیل ڈال کر مناسب درجہ حرارت پر گرم کریں۔",
        "کھانے کو خشک کریں اور بیٹر لگائیں۔",
        "احتیاط سے کھانا گرم تیل میں ڈالیں۔",
        "سنہری اور پکنے تک تلیں۔",
        "نکال کر کاغذ تولیے پر چھان لیں۔"
      ]
    },
    {
      id: 7,
      name: "بیکنگ",
      nameEn: "Baking",
      tagline: "اوون میں خشک حرارت سے پکانا",
      fullDesc: "بیکنگ میں بند اوون میں خشک حرارت استعمال کر کے کھانا پکایا جاتا ہے۔ گرم ہوا کھانے کے گرد گھومتی ہے، اسے یکساں پکاتی ہے۔ یہ طریقہ ان کھانوں کے لیے مثالی ہے جنہیں ساخت کی ضرورت ہوتی ہے جیسے روٹی، کیک اور کیسرول۔",
      keyUses: ["روٹی", "کیک", "کیسرول", "بھنی سبزیاں"],
      previewImg: "BakingMethod.png",
      temperature: "150-250°C (300-480°F)",
      equipment: "اوون, بیکنگ شیٹس",
      bestFor: "پکا ہوا سامان، کیسرول، ایک پین کھانے",
      tips: ["اوون پہلے سے گرم کریں", "درمیانی ریک استعمال کریں", "پین گھمائیں", "پکنے کی جانچ کریں"],
      steps: [
        "اوون کو مطلوبہ درجہ حرارت پر پہلے سے گرم کریں۔",
        "کھانا تیار کر کے مناسب بیک ویئر میں رکھیں۔",
        "پہلے سے گرم اوون کے مرکز میں رکھیں۔",
        "تجویز کردہ وقت تک بیک کریں۔",
        "پکنے کی جانچ کر کے اوون سے نکال لیں۔"
      ]
    },
    {
      id: 8,
      name: "بھونائی",
      nameEn: "Roasting",
      tagline: "اوون میں تیز حرارت پکانا",
      fullDesc: "بھونائی میں تیز درجہ حرارت پر خشک حرارت استعمال ہوتی ہے (عام طور پر 200°C/400°F سے اوپر) عام طور پر گوشت یا سبزیاں پکانے کے لیے۔ تیز حرارت باہر سے کیریملائز کرتی ہے جبکہ اندر نمی برقرار رہتی ہے۔ اکثر گوشت کے بڑے ٹکڑوں کے لیے استعمال ہوتی ہے۔",
      keyUses: ["پورا چکن", "سبزیاں", "گوشت کے بڑے کٹ", "گری دار میوے"],
      previewImg: "RoastingMethod.png",
      temperature: "200-230°C (400-450°F)",
      equipment: "بھونائی پین, اوون",
      bestFor: "بڑے گوشت، جڑ والی سبزیاں",
      tips: ["بھونائی ریک استعمال کریں", "کبھی کبھار باسیں", "کاٹنے سے پہلے آرام دیں", "گوشت تھرمامیٹر استعمال کریں"],
      steps: [
        "اوون کو تیز درجہ حرارت پر پہلے سے گرم کریں۔",
        "کھانے میں مسالا لگا کر بھونائی ریک پر رکھیں۔",
        "جب تک باہر سے بھورا نہ ہو بھونیں۔",
        "یکساں پکانے کے لیے ضرورت ہو تو گرمی کم کریں۔",
        "رسیلا پن کے لیے پیش کرنے سے پہلے آرام دیں۔"
      ]
    },
    {
      id: 9,
      name: "انگیٹھی",
      nameEn: "Grilling",
      tagline: "نیچے سے براہ راست حرارت",
      fullDesc: "انگیٹھی میں کھانے کو نیچے سے براہ راست شعاعی حرارت سے پکایا جاتا ہے۔ یہ طریقہ خصوصی جلی ہوئی نشانیاں اور دھویں دار ذائقہ بناتا ہے۔ ان کھانوں کے لیے بہترین جو تیز حرارت اور کیریملائزیشن سے فائدہ اٹھاتے ہیں۔",
      keyUses: ["برگر", "اسٹیک", "سبزیاں", "سیخ کباب"],
      previewImg: "GrillingMethod.png",
      temperature: "تیز آنچ",
      equipment: "انگیٹھی, باربی کیو",
      bestFor: "گوشت، ساخت والی سبزیاں",
      tips: ["انگیٹھی صاف کریں", "کھانے پر تیل لگائیں، انگیٹھی پر نہیں", "حرارت کے زون بنائیں", "کھانے کو دبا نہ کریں"],
      steps: [
        "انگیٹھی کو تیز آنچ پر پہلے سے گرم کریں۔",
        "انگیٹھی کی جالی صاف کرکے تیل لگائیں۔",
        "کھانا گرم جالی پر رکھیں۔",
        "جب تک جلی نشان نہ بن جائیں پکائیں۔",
        "پلٹ کر مطلوبہ پکنے تک پکائیں۔"
      ]
    },
    {
      id: 10,
      name: "برائلنگ",
      nameEn: "Broiling",
      tagline: "اوپر سے براہ راست حرارت",
      fullDesc: "برائلنگ میں کھانے کو اوپر سے براہ راست شعاعی حرارت استعمال کر کے پکایا جاتا ہے۔ الٹی انگیٹھی کی طرح، یہ کھانے کی سطح کو جلدی بھورا اور پکاتا ہے۔ پنیر پگھلانے، ٹاپنگ بھورا کرنے یا پتلے کٹ پکانے کے لیے بہترین۔",
      keyUses: ["پنیر پگھلانا", "مچھلی فلیٹ", "ٹوسٹ ٹاپنگز", "پتلا گوشت"],
      previewImg: "BroilingMethod.png",
      temperature: "260-290°C (500-550°F)",
      equipment: "اوون برائلر",
      bestFor: "جلدی بھورا کرنا، پتلے کٹ",
      tips: ["غور سے دیکھیں", "برائلر پین استعمال کریں", "ریک کی پوزیشن ایڈجسٹ کریں", "برائلر پہلے سے گرم کریں"],
      steps: [
        "برائلر کو 5-10 منٹ پہلے سے گرم کریں۔",
        "کھانا برائلر پین یا بیکنگ شیٹ پر رکھیں۔",
        "ریک کو حرارت کے منبع سے 4-6 انچ دور رکھیں۔",
        "برائل کریں جب تک بھورا اور پک نہ جائے۔",
        "جلنے سے بچنے کے لیے غور سے دیکھیں۔"
      ]
    },
    {
      id: 11,
      name: "دم پخت",
      nameEn: "Braising",
      tagline: "گیلی حرارت سے آہستہ پکانا",
      fullDesc: "دم پخت میں پہلے تیز آنچ پر جھلسانا اور پھر کم آنچ پر مائع میں آہستہ پکانا شامل ہے۔ یہ دو قدمی طریقہ گوشت کے سخت کٹوں کے لیے بہترین ہے جو لمبے، آہستہ پکانے سے نرم ہو جاتے ہیں۔ مائع ذائقے دار چٹنی بن سکتا ہے۔",
      keyUses: ["پوٹ روسٹ", "شارٹ ربز", "برسکٹ", "سٹو"],
      previewImg: "BraisingMethod.png",
      temperature: "کم آنچ (150°C/300°F)",
      equipment: "ڈچ اوون, بھاری برتن",
      bestFor: "سخت گوشت، ایک برتن کھانے",
      tips: ["پہلے اچھی طرح جھلسائیں", "چست ڈھکن استعمال کریں", "کم آنچ پر آہستہ پکائیں", "چٹنی سے چربی نکال لیں"],
      steps: [
        "گوشت کو گرم تیل میں جھلسا کر بھورا کریں۔",
        "گوشت نکال کر سبزیاں بھونیں۔",
        "مائع ڈال کر گوشت واپس برتن میں ڈالیں۔",
        "ڈھانپ کر کم درجہ حرارت پر گھنٹوں پکائیں۔"
      ]
    },
    {
      id: 12,
      name: "سٹو",
      nameEn: "Stewing",
      tagline: "مائع میں آہستہ ابالنا",
      fullDesc: "سٹو میں کھانے کے چھوٹے ٹکڑے کم درجہ حرارت پر طویل عرصے تک مکمل طور پر مائع میں ڈبو کر پکائے جاتے ہیں۔ دم پخت کی طرح لیکن زیادہ مائع اور چھوٹے ٹکڑوں کے ساتھ۔ نرم نتیجہ بناتا ہے جس میں ذائقے دار یخنی ہوتی ہے۔",
      keyUses: ["بیف سٹو", "کریاں", "چلی", "راگو"],
      previewImg: "StewingMethod.png",
      temperature: "کم آنچ",
      equipment: "اسٹاک پاٹ, ڈچ اوون",
      bestFor: "گوشت کے چھوٹے ٹکڑے، دلدار پکوان",
      tips: ["یکساں ٹکڑے کاٹیں", "پہلے گوشت بھورا کریں", "باقاعدہ چربی نکالیں", "سبزیاں صحیح وقت پر ڈالیں"],
      steps: [
        "گوشت کے ٹکڑے بیچوں میں بھورا کریں۔",
        "ایک ہی برتن میں سبزیاں بھونیں۔",
        "مائع ڈال کر گوشت واپس برتن میں ڈالیں۔",
        "ڈھانپ کر 1-3 گھنٹے دم دیں۔",
        "ذائقہ چیک کرکے گرم پیش کریں۔"
      ]
    }
  ];

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setShowDetailPanel(true);
  };

  const closeDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedMethod(null);
  };

  // Helper functions for card classes
  const getMethodCardClass = (methodName) => {
    const name = methodName.toLowerCase();
    if (name.includes('boil')) return 'boiling';
    if (name.includes('simmer')) return 'simmering';
    if (name.includes('steam')) return 'steaming';
    if (name.includes('sauté')) return 'sauteing';
    if (name.includes('pan-fry') || name.includes('panfry')) return 'pan-frying';
    if (name.includes('deep-fry') || name.includes('deepfry')) return 'deep-frying';
    if (name.includes('bake') && !name.includes('roast')) return 'baking';
    if (name.includes('roast')) return 'roasting';
    if (name.includes('grill')) return 'grilling';
    if (name.includes('broil')) return 'broiling';
    if (name.includes('brais')) return 'braising';
    if (name.includes('stew')) return 'stewing';
    return '';
  };

  return (
    <div className="urdu-cmp-container">
      <div className="urdu-cmp-layout">
        {/* SIDEBAR */}
        <aside className="urdu-cmp-sidebar">
          <div className="urdu-cmp-sidebar-header">
            <h2 className="urdu-cmp-sidebar-title">پکانے کے طریقے</h2>
            <p className="urdu-cmp-sidebar-subtitle">ضروری تکنیکیں</p>
          </div>

          <div className="urdu-cmp-sidebar-methods">
            <ul className="urdu-cmp-methods-list">
              {cookingMethods.map(method => (
                <li 
                  key={method.id} 
                  className={`urdu-cmp-method-list-item ${selectedMethod?.id === method.id ? 'urdu-cmp-active' : ''}`}
                  onClick={() => handleMethodSelect(method)}
                >
                  <span className="urdu-cmp-method-list-name">{method.name}</span>
                  <span className="urdu-cmp-method-list-name-en">{method.nameEn}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="urdu-cmp-main">
          <header className="urdu-cmp-main-header">
            <div className="urdu-cmp-header-content">
              <h1 className="urdu-cmp-page-title">ضروری پکانے کے طریقے</h1>
              <p className="urdu-cmp-page-description">
                اپنے کھانا پکانے کی مہارتوں کو بلند کرنے کے لیے بنیادی پکانے کی تکنیکیں سیکھیں۔
              </p>
            </div>
          </header>

          {/* METHODS GRID */}
          <div className="urdu-cmp-methods-grid-section">
            <div className="urdu-cmp-methods-grid">
              {cookingMethods.map(method => (
                <div 
                  key={method.id} 
                  className="urdu-cmp-method-card"
                  onClick={() => handleMethodSelect(method)}
                >
                  <div 
                    className="urdu-cmp-card-image"
                    style={{ backgroundImage: `url(${method.previewImg})` }}
                  ></div>
                  
                  <div className="urdu-cmp-card-content">
                    <h3 className="urdu-cmp-card-title">{method.name}</h3>
                    <p className="urdu-cmp-card-description">{method.tagline}</p>
                    <div className="urdu-cmp-card-heat-type">
                      <span className={`urdu-cmp-heat-badge ${method.fullDesc.includes('moist') ? 'urdu-cmp-moist-heat' : 'urdu-cmp-dry-heat'}`}>
                        {method.fullDesc.includes('moist') ? 'گیلی حرارت' : 'خشک حرارت'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* DETAIL MODAL */}
      {showDetailPanel && selectedMethod && (
        <div className="urdu-cmp-modal-overlay" onClick={closeDetailPanel}>
          <div className="urdu-cmp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="urdu-cmp-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="urdu-cmp-modal-header">
              <div className="urdu-cmp-modal-title">
                <h2>{selectedMethod.name}</h2>
                <p className="urdu-cmp-modal-subtitle">{selectedMethod.tagline}</p>
              </div>
            </div>

            <div className="urdu-cmp-modal-content">
              {/* LEFT SIDE - CONTENT (65%) */}
              <div className="urdu-cmp-modal-details">
                {/* DESCRIPTION */}
                <div className="urdu-cmp-detail-section description-section">
                  <h3>تفصیل</h3>
                  <p>{selectedMethod.fullDesc}</p>
                </div>

                {/* COMMON USES - HORIZONTAL */}
                <div className="urdu-cmp-detail-section uses-section">
                  <h3>عام استعمالات</h3>
                  <div className="urdu-cmp-uses-list">
                    {selectedMethod.keyUses.map((use, idx) => (
                      <div key={idx} className="urdu-cmp-use-item">
                        <span className="urdu-cmp-use-check">✓</span>
                        <span>{use}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* METHOD DETAILS */}
                <div className="urdu-cmp-detail-section details-section">
                  <h3>طریقہ کار کی تفصیلات</h3>
                  <div className="urdu-cmp-details-list">
                    <div className="urdu-cmp-detail-item">
                      <span className="urdu-cmp-detail-label">درجہ حرارت:</span>
                      <span className="urdu-cmp-detail-value">{selectedMethod.temperature}</span>
                    </div>
                    <div className="urdu-cmp-detail-item">
                      <span className="urdu-cmp-detail-label">برتن:</span>
                      <span className="urdu-cmp-detail-value">{selectedMethod.equipment}</span>
                    </div>
                    <div className="urdu-cmp-detail-item">
                      <span className="urdu-cmp-detail-label">بہترین استعمال:</span>
                      <span className="urdu-cmp-detail-value">{selectedMethod.bestFor}</span>
                    </div>
                  </div>
                </div>

                {/* STEPS */}
                <div className="urdu-cmp-detail-section steps-section">
                  <h3>{selectedMethod.name} کے مراحل</h3>
                  <div className="urdu-cmp-steps-list">
                    {selectedMethod.steps.map((step, idx) => (
                      <div key={idx} className="urdu-cmp-step-item">
                        <span className="urdu-cmp-step-number">{idx + 1}.</span>
                        <span className="urdu-cmp-step-text">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TIPS */}
                <div className="urdu-cmp-detail-section tips-section">
                  <h3>ماہرانہ نکات</h3>
                  <div className="urdu-cmp-tips-list">
                    {selectedMethod.tips.map((tip, idx) => (
                      <div key={idx} className="urdu-cmp-tip-item">
                        <span className="urdu-cmp-tip-icon">💡</span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - IMAGE (35%) */}
              <div className="urdu-cmp-modal-image-container">
                <div 
                  className="urdu-cmp-modal-main-image"
                  style={{ backgroundImage: `url(${selectedMethod.previewImg})` }}
                ></div>
                <div className="urdu-cmp-image-caption">
                  {selectedMethod.name} - پکانے کا طریقہ
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to Home Button */}
      <div className="urdu-cmp-back-home-container">
        <button 
          className="urdu-cmp-back-home-btn"
          onClick={() => {
            try {
              navigate('/guidance');
            } catch (error) {
              window.location.href = '/guidance';
            }
          }}
        >
          ← رہنمائی صفحہ پر واپس جائیں
        </button>
      </div>
    </div>
  );
};

export default UrduCookingMethodsPage;