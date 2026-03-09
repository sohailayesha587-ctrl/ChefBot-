import React, { useState } from 'react';
import './UrduMeasuringSkillsPage.css';
import { useNavigate } from 'react-router-dom';

const UrduMeasuringSkillsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('tools');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);

  // SECTION 1: MEASURING TOOLS (URDU)
  const toolsData = [
    {
      id: 1,
      name: "ماپنے کے کپ (مائع)",
      nameEn: "Measuring Cups (Liquid)",
      image: "LiqMT.png",
      tagline: "شفاف کپ مائع کے لیے",
      fullDesc: "مائع ماپنے کے لیے خصوصی طور پر ڈیزائن کیا گیا۔ شفاف شیشے یا پلاسٹک سے بنا جس پر ملی لیٹر میں نشانات ہوتے ہیں۔ ڈالنے کے لیے ٹونٹی ہوتی ہے۔ کھانا پکانے اور بیکنگ میں درست مائع پیمائش کے لیے ضروری۔",
      keyFeatures: ["ڈالنے کی ٹونٹی", "آنکھ کی سطح پر پڑھنا", "ملی لیٹر نشانات", "گرمی مزاحم"],
      properUsage: "چپٹی سطح پر رکھیں، نشان تک بھریں، آنکھ کی سطح پر پڑھیں",
      commonMistakes: ["کپ پکڑ کر پڑھنا", "چپٹی سطح استعمال نہ کرنا", "تیز ڈالنا"],
      
      types: [
        {
          name: "شیشے کا ماپنے والا کپ",
          nameEn: "Glass Measuring Cup",
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=300",
          description: "گرمی مزاحم بوروسیلیکیٹ شیشہ",
          capacity: "250ml, 500ml, 1L",
          bestFor: "گرم مائعات، درست پیمائش"
        },
        {
          name: "پلاسٹک ماپنے والا کپ",
          nameEn: "Plastic Measuring Cup",
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=300",
          description: "ہلکا، پائیدار پلاسٹک",
          capacity: "250ml, 500ml, 1L",
          bestFor: "روزانہ استعمال، بچوں کے ساتھ محفوظ"
        }
      ]
    },
    {
      id: 2,
      name: "ماپنے کے کپ (خشک)",
      nameEn: "Measuring Cups (Dry)",
      image: "CupsMT.png",
      tagline: "خشک اجزاء کے لیے کپ",
      fullDesc: "خشک اجزاء جیسے آٹا، چینی، چاول ماپنے کے لیے کپوں کا سیٹ۔ عام طور پر 4 کپوں کا سیٹ: 1 کپ، 1/2 کپ، 1/3 کپ، 1/4 کپ۔ دھات یا پلاسٹک کے بنے ہوتے ہیں۔",
      keyFeatures: ["ایک دوسرے میں گھسنے والے", "ہموار کنارہ", "آسان ذخیرہ", "ڈھیر لگانے کے قابل"],
      properUsage: "اجزاء بھریں، اوور فل کریں، سیدھے کنارے سے برابر کریں",
      commonMistakes: ["آٹا دبانا", "مائع کے لیے استعمال", "صحیح برابر نہ کرنا"],
      
      types: [
        {
          name: "دھاتی ماپنے والے کپ",
          nameEn: "Metal Measuring Cups",
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=300",
          description: "سٹینلیس سٹیل، پائیدار",
          sizes: "1, 1/2, 1/3, 1/4 کپ",
          bestFor: "پیشہ ورانہ استعمال، لمبی عمر"
        },
        {
          name: "پلاسٹک ماپنے والے کپ",
          nameEn: "Plastic Measuring Cups",
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=300",
          description: "رنگین، ہلکا",
          sizes: "1, 1/2, 1/3, 1/4 کپ",
          bestFor: "گھریلو کچن، بیکنگ"
        }
      ]
    },
    {
      id: 3,
      name: "ماپنے والے چمچ",
      nameEn: "Measuring Spoons",
      image: "SpoonsMT.png",
      tagline: "چھوٹی مقدار کی پیمائش",
      fullDesc: "چھوٹی مقدار میں خشک اور مائع دونوں اجزاء ماپنے کے لیے چمچوں کا سیٹ۔ معیاری سیٹ میں شامل: 1 کھانے کا چمچ، 1 چائے کا چمچ، 1/2 چائے کا چمچ، 1/4 چائے کا چمچ۔ مصالحے، بیکنگ پاؤڈر کے لیے ضروری۔",
      keyFeatures: ["ایک دوسرے میں گھسنے والے", "برابر کرنے والا کنارہ", "خشک و مائع دونوں", "کمپیکٹ ذخیرہ"],
      properUsage: "چمچ بھریں، سیدھے کنارے سے برابر کریں",
      commonMistakes: ["بڑی مقدار کے لیے استعمال", "مصالحے برابر نہ کرنا"],
      
      types: [
        {
          name: "معیاری ماپنے والے چمچ",
          nameEn: "Standard Measuring Spoons",
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=300",
          description: "بنیادی 4 ٹکڑوں کا سیٹ",
          sizes: "1 کھانے کا چمچ, 1 چائے کا چمچ, 1/2 چائے کا چمچ, 1/4 چائے کا چمچ",
          bestFor: "عام کھانا پکانا"
        },
        {
          name: "توسیعی سیٹ",
          nameEn: "Extended Set",
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=300",
          description: "1/8 چائے کا چمچ شامل",
          sizes: "6-8 ٹکڑے",
          bestFor: "بیکنگ، درست ترکیبیں"
        }
      ]
    },
    {
      id: 4,
      name: "باورچی خانے کا پیمانہ",
      nameEn: "Kitchen Scale",
      image: "KitScaleMT.png",
      tagline: "وزن کی درست پیمائش",
      fullDesc: "ڈیجیٹل یا اینالاگ پیمانہ اجزاء کو وزن سے ماپنے کے لیے۔ بیکنگ کے لیے سب سے درست طریقہ۔ گرام، اونس میں ماپ سکتا ہے۔ ٹیر فنکشن والے ڈیجیٹل پیمانے سب سے آسان ہیں۔",
      keyFeatures: ["ڈیجیٹل ڈسپلے", "ٹیر فنکشن", "کئی یونٹس", "1 گرام تک درست"],
      properUsage: "پیالہ رکھیں، ٹیر دبائیں، اجزاء ڈالیں، وزن پڑھیں",
      commonMistakes: ["ٹیر فنکشن استعمال نہ کرنا", "غیر ہموار سطح", "بیٹری کے مسائل"],
     
      types: [
        {
          name: "ڈیجیٹل کچن پیمانہ",
          nameEn: "Digital Kitchen Scale",
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=300",
          description: "الیکٹرانک، درست",
          capacity: "5 کلو تک، 1 گرام درستگی",
          bestFor: "بیکنگ، خوراک"
        },
        {
          name: "میکینیکل پیمانہ",
          nameEn: "Mechanical Scale",
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=300",
          description: "اسپرنگ پر مبنی، بیٹری نہیں",
          capacity: "2 کلو تک",
          bestFor: "بنیادی کچن استعمال"
        }
      ]
    },
    {
      id: 5,
      name: "ماپنے والا جگ",
      nameEn: "Measuring Jug",
      image: "JugMT.png",
      tagline: "بڑی مقدار کی مائع پیمائش",
      fullDesc: "بڑی مقدار میں مائعات کے لیے ماپنے والا جگ۔ عام طور پر 1-2 لیٹر گنجائش۔ چاول کے لیے پانی، سوپ کے لیے یخنی کی پیمائش کے لیے ضروری۔",
      keyFeatures: ["بڑی گنجائش", "آسان گرفت ہینڈل", "ڈالنے کی ٹونٹی", "صاف نشانات"],
      properUsage: "کاؤنٹر پر رکھیں، نشان تک بھریں",
      commonMistakes: ["پکڑ کر پڑھنا", "ڈالتے وقت گرانا"],
     
      types: [
        {
          name: "پلاسٹک ماپنے والا جگ",
          nameEn: "Plastic Measuring Jug",
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=300",
          description: "ہلکا، پائیدار",
          capacity: "1L, 2L, 4L",
          bestFor: "روزانہ کھانا پکانا"
        },
        {
          name: "شیشے کا ماپنے والا جگ",
          nameEn: "Glass Measuring Jug",
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=300",
          description: "گرمی مزاحم، صاف کرنے میں آسان",
          capacity: "1L, 1.5L, 2L",
          bestFor: "گرم مائعات"
        }
      ]
    },
    {
      id: 6,
      name: "کھانے کا تھرمامیٹر",
      nameEn: "Food Thermometer",
      image: "FoodThermMT.png",
      tagline: "کھانا پکانے میں درجہ حرارت کی پیمائش",
      fullDesc: "کھانے کی حفاظت اور کامل پکانے کے لیے ضروری۔ گوشت کا اندرونی درجہ حرارت، تیل کا درجہ حرارت ماپتا ہے۔",
      keyFeatures: ["فوری پڑھائی", "ڈیجیٹل ڈسپلے", "کھانے کے لیے محفوظ پروب", "آٹو آف"],
      properUsage: "سب سے موٹے حصے میں ڈالیں، پڑھنے کا انتظار کریں",
      commonMistakes: ["ہڈی کو چھونا", "پروب صاف نہ کرنا"],
    
      types: [
        {
          name: "فوری پڑھائی والا تھرمامیٹر",
          nameEn: "Instant-Read Thermometer",
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=300",
          description: "فوری پڑھائی، پورٹیبل",
          range: "-50°C to 300°C",
          bestFor: "گوشت، مرغی"
        },
        {
          name: "اوون تھرمامیٹر",
          nameEn: "Oven Thermometer",
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=300",
          description: "اوون کے درجہ حرارت کے لیے",
          range: "50°C - 300°C",
          bestFor: "بیکنگ، بھونائی"
        }
      ]
    },
    {
      id: 7,
      name: "باورچی خانے کا ٹائمر",
      nameEn: "Kitchen Timer",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800",
      tagline: "کھانا پکانے میں وقت کا انتظام",
      fullDesc: "کامل پکانے کے نتائج کے لیے ضروری۔ مختلف پکوانوں کے لیے پکانے کے وقت کو ٹریک کرتا ہے۔",
      keyFeatures: ["متعدد ٹائمر", "تیز الارم", "میگنیٹک بیک"],
      properUsage: "وقت سیٹ کریں، ٹائمر شروع کریں",
      commonMistakes: ["شروع کرنا بھولنا", "غلط وقت سیٹ کرنا"],
     
      types: [
        {
          name: "ڈیجیٹل کچن ٹائمر",
          nameEn: "Digital Kitchen Timer",
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=300",
          description: "الیکٹرانک، درست",
          features: "متعدد ٹائمر، میموری",
          bestFor: "جدید کچن"
        },
        {
          name: "میکینیکل ٹائمر",
          nameEn: "Mechanical Timer",
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=300",
          description: "کلاسک، بیٹری نہیں",
          features: "بیٹری کی ضرورت نہیں",
          bestFor: "روایتی کھانا پکانا"
        }
      ]
    },
    {
      id: 8,
      name: "پورشن اسکوپس",
      nameEn: "Portion Scoops",
      image: "PortionScoopsMT.png",
      tagline: "مسلسل حصہ کنٹرول",
      fullDesc: "کوکی آٹا، چاول، بیٹر کی یکساں مقدار کے لیے استعمال ہوتا ہے۔ نمبر اسکوپس فی کوارٹ ظاہر کرتا ہے۔",
      keyFeatures: ["ریلیز میکانزم", "ایرگونومک ہینڈل", "معیاری سائز"],
      properUsage: "اسکوپ کریں، برابر کریں",
      commonMistakes: ["غلط سائز کا انتخاب", "برابر نہ کرنا"],
      
      types: [
        {
          name: "کوکی اسکوپ",
          nameEn: "Cookie Scoop",
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=300",
          description: "یکساں کوکیز کے لیے",
          sizes: "#20, #24, #30",
          bestFor: "بیکنگ"
        },
        {
          name: "چاول کا اسکوپ",
          nameEn: "Rice Scoop",
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=300",
          description: "چاول کی مقدار کے لیے",
          capacity: "1/2 کپ، 3/4 کپ",
          bestFor: "کھانے کی تیاری"
        }
      ]
    }
  ];

  // SECTION 2: MEASURING TECHNIQUES (URDU)
  const techniquesData = [
    {
      id: 1,
      name: "خشک اجزاء برابر کرنا",
      nameEn: "Leveling Dry Ingredients",
      image: "MTLevel-Dry.png",
      tagline: "بالکل ہموار پیمائش",
      fullDesc: "آٹا، چینی، بیکنگ پاؤڈر جیسے خشک اجزاء ماپنے کی تکنیک۔ اضافی مقدار ہٹا کر درست مقدار یقینی بناتی ہے۔ بیکنگ کی درستگی کے لیے ضروری۔",
      steps: [
        "اجزاء کو ماپنے والے کپ میں ڈالیں",
        "کنارے سے تھوڑا اوپر تک بھریں",
        "سیدھے کنارے (چاقو، اسپاٹولا) استعمال کریں",
        "اضافی کو ہٹانے کے لیے جھاڑیں"
      ],
      tips: "صرف خشک ماپنے والے کپ استعمال کریں، کپ کو نہ ہلائیں",
      commonMistakes: ["آٹا دبانا", "مائع کپ استعمال کرنا", "سیدھا کنارہ نہ استعمال کرنا"],
      applications: "آٹا، چینی، کوکو پاؤڈر، بیکنگ سوڈا"
    },
    {
      id: 2,
      name: "مینسکس پڑھنا (مائع)",
      nameEn: "Meniscus Reading (Liquids)",
      image: "MTMeniscus.png",
      tagline: "درست مائع پیمائش",
      fullDesc: "ماپنے والے کپ میں مائع کی خمیدہ سطح کو پڑھنا۔ درستگی کے لیے وکر کے نچلے حصے سے پڑھیں۔",
      steps: [
        "ماپنے والے کپ کو چپٹی سطح پر رکھیں",
        "مطلوبہ نشان سے بالکل نیچے تک مائع ڈالیں",
        "آنکھ کی سطح پر جھکیں",
        "وکر کے نچلے حصے سے پڑھیں"
      ],
      tips: "شفاف ماپنے والے کپ استعمال کریں",
      commonMistakes: ["اوپر سے پڑھنا", "کپ ہاتھ میں پکڑنا"],
      applications: "پانی، دودھ، تیل، شربت، سرکہ"
    },
    {
      id: 3,
      name: "چمچ اور برابر کرنے کا طریقہ",
      nameEn: "Spoon & Level Method",
      image: "MTSpoonLevel.png",
      tagline: "آٹے کی صحیح پیمائش",
      fullDesc: "آٹے کو دبانے کے بغیر ماپنے کا صحیح طریقہ۔ آٹے میں ہوا شامل کرتا ہے اور مسلسل نتائج دیتا ہے۔",
      steps: [
        "برتن میں چمچ سے آٹے کو پھیلا دیں",
        "آہستہ سے ماپنے والے کپ میں آٹا ڈالیں",
        "کنارے سے اوپر تک بھریں",
        "سیدھے کنارے سے برابر کریں"
      ],
      tips: "کبھی بھی براہ راست تھیلے سے نہ لیں",
      commonMistakes: ["تھیلے سے لینا", "آٹا دبانا"],
      applications: "میدہ، گندم کا آٹا"
    },
    {
      id: 4,
      name: "براؤن شوگر پیکنگ",
      nameEn: "Brown Sugar Packing",
      image: "MTBrownSugar.png",
      tagline: "نم اجزاء کی پیمائش",
      fullDesc: "براؤن شوگر کی پیمائش کی تکنیک، جسے ہوا کے خلاء کو دور کرنے کے لیے پیک کرنا ضروری ہے۔",
      steps: [
        "ماپنے والے کپ میں براؤن شوگر رکھیں",
        "چمچ کی پشت سے مضبوطی سے دبائیں",
        "مزید شوگر ڈالیں اور دوبارہ دبائیں",
        "پیک ہونے پر کنارے تک برابر کریں"
      ],
      tips: "تازہ نم براؤن شوگر استعمال کریں",
      commonMistakes: ["کافی نہ دبانا", "پرانی شوگر استعمال کرنا"],
      applications: "براؤن شوگر، ناریل"
    },
    {
      id: 5,
      name: "پیمانہ ٹیر کرنا",
      nameEn: "Taring a Scale",
      image: "MTScale.png",
      tagline: "برتن کے ساتھ پیمانہ صفر کرنا",
      fullDesc: "برتن کا وزن نکالنے کے لیے ٹیر فنکشن کا استعمال۔ ایک ہی پیالے میں متعدد اجزاء شامل کرنے کی اجازت دیتا ہے۔",
      steps: [
        "خالی پیالہ پیمانے پر رکھیں",
        "ٹیر بٹن دبائیں",
        "پہلا جز مطلوبہ وزن تک ڈالیں",
        "دوبارہ ٹیر کریں، اگلا جز ڈالیں"
      ],
      tips: "ہلکے پیالے استعمال کریں",
      commonMistakes: ["ٹیر کرنا بھولنا", "غیر ہموار سطح"],
      applications: "بیکنگ، کھانے کی تیاری"
    },
    {
      id: 6,
      name: "چپچپا اجزاء کا طریقہ",
      nameEn: "Sticky Ingredient Method",
      image: "MTStickyIng.png",
      tagline: "شہد، شربت، مونگ پھلی کا مکھن ماپنا",
      fullDesc: "چپچپا اجزاء کو بغیر ضیاع کے ماپنے کی تکنیک۔",
      steps: [
        "ماپنے والے کپ کو ہلکا تیل لگائیں",
        "چپچپا جز ڈالیں",
        "برابر کریں",
        "آسانی سے باہر ڈالیں"
      ],
      tips: "آسان بہاؤ کے لیے گرم برتن استعمال کریں",
      commonMistakes: ["تیل نہ لگانا", "اجزاء ضائع کرنا"],
      applications: "شہد، میپل شربت، مونگ پھلی کا مکھن"
    },
    {
      id: 7,
      name: "مکھن کی پیمائش",
      nameEn: "Butter Measurement",
      image: "MTButter.png",
      tagline: "ٹھوس چکنائی کی پیمائش",
      fullDesc: "مکھن اور چکنائی کی پیمائش کے طریقے۔",
      methods: [
        "مکھن کی ریپر پر نشانات استعمال کریں",
        "پانی ہٹانے کا طریقہ",
        "باورچی خانے کا پیمانہ (سب سے درست)",
        "پہلے سے نشان شدہ مکھن ڈش"
      ],
      tips: "کپ کے لیے مکھن نرم کریں",
      commonMistakes: ["اندازہ لگانا", "ریپر کے نشانات نہ استعمال کرنا"],
      applications: "مکھن، مارجرین"
    },
    {
      id: 8,
      name: "آنکھ کی سطح کی پیمائش",
      nameEn: "Eye-Level Measurement",
      image: "MTEyeLevel.png",
      tagline: "غلطی سے بچنا",
      fullDesc: "پڑھنے کی غلطیوں سے بچنے کے لیے آنکھ کی سطح پر پوزیشن لینا۔",
      steps: [
        "ماپنے والا برتن کاؤنٹر پر رکھیں",
        "آنکھ کی سطح تک جھکیں",
        "آنکھوں کو پیمائش کے نشان سے سیدھ کریں",
        "مائع کو عین نشان تک ایڈجسٹ کریں"
      ],
      tips: "اچھی روشنی والی جگہ استعمال کریں",
      commonMistakes: ["اوپر سے پڑھنا", "غیر زاویہ دیکھنا"],
      applications: "تمام درست پیمائشیں"
    }
  ];

  // SECTION 3: ESTIMATION SKILLS (URDU)
  const estimationData = [
    {
      id: 1,
      name: "بصری اندازہ",
      nameEn: "Visual Estimation",
      image: "VisualET.png",
      tagline: "دیکھ کر پیمائش",
      fullDesc: "بغیر آلات کے بصری اشارے استعمال کرتے ہوئے مقدار کا اندازہ لگانا۔ تجربے سے بہتر ہوتا ہے۔",
      techniques: [
        "معروف اشیاء سے موازنہ",
        "برتن کو ذہنی طور پر تقسیم کریں",
        "انگلی کی پیمائش استعمال کریں",
        "مٹھی بھر سے اندازہ"
      ],
      accuracy: "مشق سے ±10-20%",
      whenToUse: "چینی تلے پکوان، سوپ، سلاد",
      whenNotToUse: "بیکنگ، پہلی بار"
    },
    {
      id: 2,
      name: "ہاتھ کی پیمائش",
      nameEn: "Hand Measurements",
      image: "HandMeasureET.png",
      tagline: "ہاتھ کو بطور رہنما استعمال کرنا",
      fullDesc: "ہاتھ کے حصوں کو پیمائش کے حوالہ جات کے طور پر استعمال کرنے کا روایتی طریقہ۔",
      measurements: [
        "چٹکی = انگوٹھا اور 1-2 انگلیاں",
        "دش = 1/8 چائے کا چمچ",
        "مٹھی بھر = تقریباً 1/2 کپ",
        "ہتھیلی = تقریباً 3 اونس پروٹین"
      ],
      tips: "پہلے ماپ کر مشق کریں",
      applications: "مصالحے، جڑی بوٹیاں، اناج"
    },
    {
      id: 3,
      name: "چٹکی اور دش نظام",
      nameEn: "Pinch & Dash System",
      image: "PachET.png",
      tagline: "بہت چھوٹی مقدار کا اندازہ",
      fullDesc: "بہت چھوٹی مقداروں کے لیے روایتی پیمائش، خاص طور پر مصالحے۔",
      definitions: [
        "چٹکی = انگوٹھا اور شہادت کی انگلی",
        "دش = 2-3 قطرے",
        "اسمڈجن = آدھی چٹکی"
      ],
      equivalents: [
        "1 چٹکی ≈ 1/16 چائے کا چمچ",
        "2 چٹکیاں ≈ 1/8 چائے کا چمچ",
        "1 دش ≈ 1/8 چائے کا چمچ مائع"
      ],
      applications: "نمک، مرچ، مصالحے"
    },
    {
      id: 4,
      name: "آنکھ سے حجم",
      nameEn: "Volume by Eye",
      image: "VolumeET.png",
      tagline: "کپ اور لیٹر کا اندازہ",
      fullDesc: "عام برتنوں سے موازنہ کرکے بغیر آلات کے حجم کا اندازہ لگانا۔",
      references: [
        "چائے کا مگ = تقریباً 1 کپ",
        "چھوٹا دہی کا کپ = 1/2 کپ",
        "سوڈا کین = 12 اونس",
        "وائن گلاس = 5-6 اونس",
        "چاول کا پیالہ = 1 کپ پکا چاول"
      ],
      practiceTips: [
        "مختلف برتنوں میں پانی ماپیں",
        "عام پیکیج سائز یاد کریں"
      ],
      accuracy: "باقاعدہ مشق سے بہتر"
    },
    {
      id: 5,
      name: "وزن کا اندازہ",
      nameEn: "Weight Estimation",
      image: "WeightET.png",
      tagline: "وزن کا اندازہ لگانا",
      fullDesc: "اجزاء، خاص طور پر پیداوار اور گوشت کا وزن، وزن اور سائز کے موازنہ سے اندازہ لگانا۔",
      comparisons: [
        "ٹینس بال = 2 اونس",
        "بیس بال = 5 اونس",
        "تاش کے پتے = 3 اونس گوشت",
        "اسمارٹ فون = 6-7 اونس",
        "سوڈا کین = 12 اونس"
      ],
      techniques: [
        "پہلے پیمانے سے مشق کریں",
        "معروف وزن سے موازنہ کریں"
      ],
      applications: "پھل، سبزیاں، گوشت"
    },
    {
      id: 6,
      name: "حصہ اندازہ",
      nameEn: "Portion Estimation",
      image: "PortionET.png",
      tagline: "خدمت کرنے کا سائز",
      fullDesc: "بغیر وزن کیے متوازن کھانے کے لیے مناسب سرونگ سائز کا اندازہ لگانا۔",
      guidelines: [
        "پروٹین = ہتھیلی کے سائز کا",
        "کاربز = مٹھی کے سائز کا",
        "سبزیاں = دو مٹھی",
        "چکنائی = انگوٹھے کے سائز کی"
      ],
      plateMethod: [
        "آدھی پلیٹ سبزیاں",
        "چوتھائی پلیٹ پروٹین",
        "چوتھائی پلیٹ کاربوہائیڈریٹ"
      ],
      applications: "کھانے کی منصوبہ بندی"
    },
    {
      id: 7,
      name: "ذائقے سے پکوان تیار کرنا",
      nameEn: "Seasoning by Taste",
      image: "TasteET.png",
      tagline: "بدیہی طور پر ذائقہ ایڈجسٹ کرنا",
      fullDesc: "ذائقہ، بو اور تجربے کی بنیاد پر بغیر پیمائش کے مصالحے شامل کرنا۔",
      process: [
        "ترکیب سے کم سے شروع کریں",
        "آہستہ آہستہ شامل کریں",
        "پکوان کے حجم پر غور کریں",
        "ذائقے متوازن کریں"
      ],
      tips: [
        "نمک جلد ڈالیں، جڑی بوٹیاں آخر میں",
        "تیزاب آخر میں ڈالیں",
        "میٹھا مصالحہ متوازن کرتا ہے"
      ],
      applications: "سوپ، چٹنیاں، مرینیڈ"
    },
    {
      id: 8,
      name: "پکانے کے وقت کا اندازہ",
      nameEn: "Cooking Time Estimation",
      image: "CookTimeET.png",
      tagline: "گھڑی کے بغیر وقت",
      fullDesc: "تجربے، بصری اشارے اور حسی سگنلز کی بنیاد پر پکانے کے وقت کا اندازہ لگانا۔",
      indicators: [
        "رنگ تبدیلی",
        "بناوٹ",
        "بو",
        "آواز",
        "بصارت"
      ],
      timeReferences: [
        "پانی ابالنا: 5-10 منٹ",
        "سبزیاں بھوننا: 5-7 منٹ",
        "چاول پکانا: 15-20 منٹ",
        "چکن بیک کرنا: 25-30 منٹ"
      ],
      applications: "تمام پکانے کے عمل"
    }
  ];

  // SECTION 4: CONVERSION SKILLS (URDU)
  const conversionData = [
    {
      id: 1,
      name: "حجم کی تبدیلیاں",
      nameEn: "Volume Conversions",
      image: "VolumeCS.png",
      tagline: "کپ، کھانے کے چمچ، ملی لیٹر",
      fullDesc: "ترکیبوں میں عام استعمال ہونے والے مختلف حجم پیمائشی یونٹس کے درمیان تبدیل کرنا۔",
      commonConversions: [
        "1 کھانے کا چمچ = 3 چائے کے چمچ",
        "1/4 کپ = 4 کھانے کے چمچ",
        "1/3 کپ = 5 کھانے کے چمچ + 1 چائے کا چمچ",
        "1/2 کپ = 8 کھانے کے چمچ",
        "1 کپ = 16 کھانے کے چمچ",
        "1 کپ = 240 ملی لیٹر",
        "1 کوارٹ = 4 کپ",
        "1 گیلن = 16 کپ"
      ],
      metricConversions: [
        "1 چائے کا چمچ = 5 ملی لیٹر",
        "1 کھانے کا چمچ = 15 ملی لیٹر",
        "1 سیال اونس = 30 ملی لیٹر",
        "1 کپ = 240 ملی لیٹر",
        "1 پنٹ = 480 ملی لیٹر",
        "1 کوارٹ = 960 ملی لیٹر",
        "1 لیٹر = 4.2 کپ"
      ],
      tips: "اہم تناسب یاد کریں"
    },
    {
      id: 2,
      name: "وزن کی تبدیلیاں",
      nameEn: "Weight Conversions",
      image: "WeightCS.png",
      tagline: "گرام، اونس، پاؤنڈ",
      fullDesc: "درست جزو پیمائش کے لیے وزن پیمائشی نظاموں کے درمیان تبدیل کرنا۔",
      commonConversions: [
        "1 اونس = 28 گرام",
        "4 اونس = 113 گرام (1/4 پاؤنڈ)",
        "8 اونس = 227 گرام (1/2 پاؤنڈ)",
        "16 اونس = 454 گرام (1 پاؤنڈ)",
        "1 کلوگرام = 2.2 پاؤنڈ",
        "1 پاؤنڈ = 454 گرام"
      ],
      bakingConversions: [
        "1 کپ آٹا = 120-125 گرام",
        "1 کپ چینی = 200 گرام",
        "1 کپ مکھن = 227 گرام",
        "1 کپ پانی = 240 گرام",
        "1 کپ شہد = 340 گرام"
      ],
      tips: "درستگی کے لیے وزن کریں"
    },
    {
      id: 3,
      name: "درجہ حرارت کی تبدیلیاں",
      nameEn: "Temperature Conversions",
      image: "TemperatureCS.png",
      tagline: "سیلسیس ↔ فارن ہائیٹ",
      fullDesc: "سیلسیس اور فارن ہائیٹ کے درمیان اوون اور کھانا پکانے کے درجہ حرارت کو تبدیل کرنا۔",
      formula: [
        "°F to °C: 32 کم کریں، 5/9 سے ضرب کریں",
        "°C to °F: 9/5 سے ضرب کریں، 32 شامل کریں"
      ],
      commonTemperatures: [
        "جمنا: 0°C = 32°F",
        "کمرے کا درجہ حرارت: 20°C = 68°F",
        "انسانی جسم: 37°C = 98.6°F",
        "دم دینا: 85°C = 185°F",
        "ابلنا: 100°C = 212°F"
      ],
      ovenTemperatures: [
        "بہت ہلکا: 120°C = 250°F",
        "ہلکا: 150°C = 300°F",
        "معتدل: 180°C = 350°F",
        "تیز: 200°C = 400°F",
        "بہت تیز: 230°C = 450°F"
      ],
      tips: "اہم نکات یاد کریں"
    },
    {
      id: 4,
      name: "ترکیب کو بڑھانا/گھٹانا",
      nameEn: "Recipe Scaling",
      image: "RecipeCS.png",
      tagline: "ترکیب کی مقدار ایڈجسٹ کرنا",
      fullDesc: "مناسب تناسب برقرار رکھتے ہوئے ترکیب کی مقدار کو بڑھانا یا گھٹانا۔",
      scalingRules: [
        "تمام اجزاء کو ایک ہی عنصر سے ضرب دیں",
        "پکانے کے وقت ایڈجسٹ کریں",
        "پین کے سائز کی تبدیلی پر غور کریں"
      ],
      commonMultipliers: [
        "آدھی ترکیب: 0.5 سے ضرب",
        "دوگنی ترکیب: 2 سے ضرب",
        "تین گنا ترکیب: 3 سے ضرب",
        "چوتھائی ترکیب: 0.25 سے ضرب"
      ],
      tips: "پین کی گنجائش چیک کریں"
    },
    {
      id: 5,
      name: "امپیریل سے میٹرک",
      nameEn: "Imperial to Metric",
      image: "ImperialCS.png",
      tagline: "امریکی پیمائش سے میٹرک",
      fullDesc: "امریکی ترکیب کی پیمائش کو دوسرے ممالک میں استعمال ہونے والے میٹرک نظام میں تبدیل کرنا۔",
      volumeConversions: [
        "1 چائے کا چمچ = 5 ملی لیٹر",
        "1 کھانے کا چمچ = 15 ملی لیٹر",
        "1 سیال اونس = 30 ملی لیٹر",
        "1 کپ = 240 ملی لیٹر",
        "1 پنٹ = 480 ملی لیٹر",
        "1 کوارٹ = 960 ملی لیٹر",
        "1 گیلن = 3.8 لیٹر"
      ],
      weightConversions: [
        "1 اونس = 28 گرام",
        "1 پاؤنڈ = 454 گرام",
        "1 پاؤنڈ = 0.45 کلوگرام"
      ],
      tips: "درستگی کے لیے پیمانہ استعمال کریں"
    },
    {
      id: 6,
      name: "اجزاء کے متبادل",
      nameEn: "Ingredient Substitutions",
      image: "IngredientCS.png",
      tagline: "اجزاء تبدیل کرنا",
      fullDesc: "جب اصلی اجزاء دستیاب نہ ہوں تو ان کے متبادل۔",
      commonSubstitutions: [
        "1 کپ چھاچھ = 1 کپ دودھ + 1 چمچ سرکہ",
        "1 کپ کیک آٹا = 1 کپ آٹا - 2 چمچ",
        "1 چمچ بیکنگ پاؤڈر = 1/4 چمچ بیکنگ سوڈا + 1/2 چمچ کریم آف ٹارٹر",
        "1 کپ شہد = 1 1/4 کپ چینی + 1/4 کپ پانی",
        "1 کپ تیل = 1 کپ پگھلا مکھن"
      ],
      dairySubstitutions: [
        "1 کپ دودھ = 1 کپ پانی + 1/4 کپ خشک دودھ",
        "1 کپ کریم = 3/4 کپ دودھ + 1/4 کپ مکھن",
        "1 کپ دہی = 1 کپ چھاچھ"
      ],
      tips: "ذائقہ اور ساخت پر غور کریں"
    },
    {
      id: 7,
      name: "پین کے سائز کی تبدیلیاں",
      nameEn: "Pan Size Conversions",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800",
      tagline: "مختلف پین کے لیے ایڈجسٹمنٹ",
      fullDesc: "پین کے مختلف سائز اور شکلوں کے لیے ترکیبیں تبدیل کرنا۔",
      commonPanSizes: [
        "8 انچ گول = 6 انچ گول × 1.8",
        "9 انچ گول = 8 انچ گول × 1.3",
        "13×9 انچ = دو 9 انچ گول",
        "لوف پین = 8×4 انچ یا 9×5 انچ"
      ],
      adjustmentRules: [
        "گہرائی یکساں رکھیں",
        "موٹائی کے لیے وقت ایڈجسٹ کریں"
      ],
      tips: "پین 2/3 بھریں"
    },
    {
      id: 8,
      name: "پیمائش کے مساوی",
      nameEn: "Measurement Equivalents",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800",
      tagline: "فوری حوالہ تبدیلیاں",
      fullDesc: "کچن میں فوری ذہنی حساب کے لیے عام پیمائش کے مساوی یاد رکھنا۔",
      mustKnowEquivalents: [
        "3 چائے کے چمچ = 1 کھانے کا چمچ",
        "4 کھانے کے چمچ = 1/4 کپ",
        "16 کھانے کے چمچ = 1 کپ",
        "2 کپ = 1 پنٹ",
        "2 پنٹ = 1 کوارٹ",
        "4 کوارٹ = 1 گیلن",
        "8 سیال اونس = 1 کپ",
        "16 اونس = 1 پاؤنڈ"
      ],
      metricEquivalents: [
        "5 ملی لیٹر = 1 چائے کا چمچ",
        "15 ملی لیٹر = 1 کھانے کا چمچ",
        "240 ملی لیٹر = 1 کپ",
        "1 لیٹر = 4.2 کپ",
        "28 گرام = 1 اونس",
        "454 گرام = 1 پاؤنڈ"
      ],
      handyEquivalents: [
        "مکھن: 1 اسٹک = 1/2 کپ = 8 کھانے کے چمچ = 113 گرام",
        "چینی: 1 کپ = 200 گرام = 7 اونس",
        "آٹا: 1 کپ = 120 گرام = 4.25 اونس",
        "چاول: 1 کپ کچا = 3 کپ پکا"
      ],
      tips: "فریج پر چیت شیٹ بنائیں"
    }
  ];

  // SECTION 5: PRECISION SKILLS (URDU)
  const precisionData = [
    {
      id: 1,
      name: "بیکنگ کی درستگی",
      nameEn: "Baking Precision",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800",
      tagline: "بیکنگ کے لیے صحیح پیمائش",
      fullDesc: "بیکنگ میں درستگی حاصل کرنے کی تکنیکیں جہاں کیمیائی ردعمل صحیح تناسب پر منحصر ہیں۔",
      criticalRules: [
        "خشک اجزاء کے لیے پیمانہ استعمال کریں",
        "مائع آنکھ کی سطح پر ماپیں",
        "کمرے کے درجہ حرارت کے اجزاء",
        "صحیح اوون درجہ حرارت"
      ],
      commonErrors: [
        "آٹا تھیلے سے لینا",
        "پیمائش برابر نہ کرنا",
        "چھوٹی مقدار کا اندازہ"
      ],
      toolsRequired: [
        "ڈیجیٹل کچن پیمانہ",
        "صحیح ماپنے والے کپ/چمچ",
        "اوون تھرمامیٹر",
        "کچن ٹائمر"
      ],
      tips: "اجزاء وزن کریں، ترکیب بالکل فالو کریں"
    },
    {
      id: 2,
      name: "پیمانے کیلیبریشن",
      nameEn: "Scale Calibration",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800",
      tagline: "پیمانے کی درستگی یقینی بنانا",
      fullDesc: "مسلسل، درست پیمائش کے لیے کچن پیمانوں کی باقاعدہ کیلیبریشن اور دیکھ بھال۔",
      calibrationMethods: [
        "کیلیبریشن وزن استعمال کریں",
        "سکے (امریکی نکل = 5 گرام)",
        "پانی (1ml = 1g)",
        "کارخانہ دار کی ہدایات"
      ],
      maintenanceTips: [
        "ہر استعمال کے بعد صاف کریں",
        "خشک جگہ رکھیں",
        "باقاعدگی سے بیٹریاں تبدیل کریں"
      ],
      accuracyCheck: [
        "معروف چیز وزن کریں",
        "مختلف وزن پر چیک کریں",
        "ٹیر فنکشن چیک کریں"
      ],
      tips: "ماہانہ کیلیبریٹ کریں"
    },
    {
      id: 3,
      name: "مائیکرو پیمائش",
      nameEn: "Micro Measurements",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800",
      tagline: "بہت چھوٹی مقدار کی پیمائش",
      fullDesc: "بہت چھوٹی مقداروں کو درست طریقے سے ماپنے کی تکنیکیں جو بیکنگ میں اہم ہیں۔",
      toolsForMicro: [
        "1/8 اور 1/16 چمچ کے پیمانے",
        "ڈیجیٹل پیمانہ (1 گرام درستگی)",
        "ڈراپر",
        "مائیکرو ماپنے والے چمچ"
      ],
      techniques: [
        "1 چمچ سے کم کے لیے پیمانہ استعمال کریں",
        "مائعات کے لیے ڈراپر",
        "پاؤڈر کے لیے ڈبو کر جھاڑیں"
      ],
      criticalAmounts: [
        "خمیر: 2.25 چمچ فی پیکٹ",
        "بیکنگ سوڈا: صحیح مقدار",
        "نمک: خمیر کو متاثر کرتا ہے"
      ],
      tips: "مائیکرو چمچ خریدیں"
    },
    {
      id: 4,
      name: "مسلسل حصہ بندی",
      nameEn: "Consistent Portioning",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800",
      tagline: "یکساں کھانے کے حصے",
      fullDesc: "مسلسل پکانے، پیشہ ورانہ پیشکش کے لیے یکساں حصے بنانا۔",
      portioningTools: [
        "کوکی اسکوپ",
        "کچن پیمانہ",
        "ماپنے والے کپ",
        "تقسیم شدہ کنٹینر"
      ],
      techniques: [
        "ہر حصہ وزن کریں",
        "ایک ہی اسکوپ سائز استعمال کریں",
        "کل کو تعداد سے تقسیم کریں"
      ],
      benefits: [
        "یکساں پکانا",
        "پیشہ ورانہ ظاہری شکل",
        "مسلسل غذائیت",
        "ضیاع میں کمی"
      ],
      tips: "پہلے چند وزن کریں"
    },
    {
      id: 5,
      name: "درجہ حرارت کی درستگی",
      nameEn: "Temperature Precision",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800",
      tagline: "صحیح درجہ حرارت کنٹرول",
      fullDesc: "کینڈی بنانے، گوشت پکانے اور بیکنگ میں اہم صحیح درجہ حرارت حاصل کرنا۔",
      criticalTemperatures: [
        "گوشت پکنے کا درجہ حرارت",
        "کینڈی کے مراحل",
        "خمیر ایکٹیویشن",
        "چاکلیٹ ٹیمپرنگ",
        "تلنے کے لیے تیل"
      ],
      tools: [
        "فوری پڑھائی والا تھرمامیٹر",
        "کینڈی تھرمامیٹر",
        "اوون تھرمامیٹر"
      ],
      techniques: [
        "تھرمامیٹر باقاعدہ کیلیبریٹ کریں",
        "سب سے موٹے حصے میں ماپیں",
        "ہڈی/چربی سے بچیں"
      ],
      tips: "معیاری تھرمامیٹر خریدیں"
    },
    {
      id: 6,
      name: "ہائیڈریشن تناسب",
      nameEn: "Hydration Ratios",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800",
      tagline: "روٹی پکانے میں پانی کے تناسب",
      fullDesc: "روٹی پکانے، پاستا بنانے میں اہم پانی سے آٹے کے صحیح تناسب۔",
      commonRatios: [
        "روٹی: 60-75% ہائیڈریشن",
        "پاستا: 50% ہائیڈریشن",
        "پائی کرسٹ: 30-40% ہائیڈریشن"
      ],
      calculation: [
        "ہائیڈریشن % = (پانی وزن ÷ آٹا وزن) × 100",
        "بیکر کے فیصد",
        "نمی کے لیے ایڈجسٹ کریں"
      ],
      effects: [
        "زیادہ ہائیڈریشن: زیادہ کھلا کرمب",
        "کم ہائیڈریشن: گھنی ساخت",
        "خمیر کا وقت متاثر"
      ],
      tips: "اجزاء وزن کریں"
    },
    {
      id: 7,
      name: "اجزاء کے تناسب",
      nameEn: "Ingredient Ratios",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800",
      tagline: "بنیادی تناسب سیکھنا",
      fullDesc: "بنیادی اجزاء کے تناسب کو سمجھنا جو لاتعداد ترکیبوں کی بنیاد ہیں۔",
      basicRatios: [
        "پائی آٹا: 3:2:1 (آٹا:چکنائی:پانی)",
        "بسکٹ: 3:1:2 (آٹا:چکنائی:مائع)",
        "پینکیک: 2:2:1:1/2 (آٹا:مائع:انڈا:چکنائی)"
      ],
      application: [
        "آسانی سے بڑھائیں/گھٹائیں",
        "مختلف ورژن بنائیں",
        "غلطیوں کا پتہ لگائیں"
      ],
      benefits: [
        "کھانا پکانے میں لچک",
        "بہتر سمجھ",
        "آسان اصلاح"
      ],
      tips: "ترکیبوں کے بجائے تناسب سیکھیں"
    },
    {
      id: 8,
      name: "پیمائش کی دستاویزات",
      nameEn: "Measurement Documentation",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800",
      tagline: "صحیح پیمائش ریکارڈ کرنا",
      fullDesc: "مسلسل تولید کے لیے صحیح پیمائش، ایڈجسٹمنٹ اور نتائج ریکارڈ کرنے کا نظام۔",
      documentationMethods: [
        "ترکیب جرنل/نوٹ بک",
        "ڈیجیٹل نوٹس ایپ",
        "پیمائش کی تصاویر",
        "اسپریڈ شیٹ"
      ],
      whatToRecord: [
        "صحیح وزن/پیمائش",
        "اجزاء کے برانڈ",
        "استعمال شدہ آلات",
        "وقت/درجہ حرارت",
        "نتائج اور ایڈجسٹمنٹ"
      ],
      benefits: [
        "کامیابیاں دوبارہ بنائیں",
        "غلطیاں دہرانے سے بچیں",
        "بہتری ٹریک کریں"
      ],
      tips: "مستقل رہیں، تفصیلات شامل کریں"
    }
  ];

  // Get current data based on selected category
  const getCurrentData = () => {
    switch (selectedCategory) {
      case 'tools': return toolsData;
      case 'techniques': return techniquesData;
      case 'estimation': return estimationData;
      case 'conversions': return conversionData;
      case 'precision': return precisionData;
      default: return toolsData;
    }
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setShowDetailPanel(true);
  };

  const closeDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedItem(null);
  };

  return (
    <div className="urdu-msp-container">
      <div className="urdu-msp-layout">
        {/* SIDEBAR */}
        <aside className="urdu-msp-sidebar">
          <div className="urdu-msp-sidebar-header">
            <h2 className="urdu-msp-sidebar-title">ماپنے کی مہارتیں</h2>
          </div>

          <div className="urdu-msp-sidebar-categories">
            <ul className="urdu-msp-categories-list">
              <li 
                className={`urdu-msp-category-item ${selectedCategory === 'tools' ? 'urdu-msp-active' : ''}`}
                onClick={() => setSelectedCategory('tools')}
              >
                <span className="urdu-msp-category-name">اوزار اور آلات</span>
              </li>
              <li 
                className={`urdu-msp-category-item ${selectedCategory === 'techniques' ? 'urdu-msp-active' : ''}`}
                onClick={() => setSelectedCategory('techniques')}
              >
                <span className="urdu-msp-category-name">ماپنے کی تکنیکیں</span>
              </li>
              <li 
                className={`urdu-msp-category-item ${selectedCategory === 'estimation' ? 'urdu-msp-active' : ''}`}
                onClick={() => setSelectedCategory('estimation')}
              >
                <span className="urdu-msp-category-name">اندازہ لگانے کی مہارتیں</span>
              </li>
              <li 
                className={`urdu-msp-category-item ${selectedCategory === 'conversions' ? 'urdu-msp-active' : ''}`}
                onClick={() => setSelectedCategory('conversions')}
              >
                <span className="urdu-msp-category-name">تبدیلی کی مہارتیں</span>
              </li>
              <li 
                className={`urdu-msp-category-item ${selectedCategory === 'precision' ? 'urdu-msp-active' : ''}`}
                onClick={() => setSelectedCategory('precision')}
              >
                <span className="urdu-msp-category-name">درستگی کی مہارتیں</span>
              </li>
            </ul>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="urdu-msp-main">
          <header className="urdu-msp-main-header">
            <div className="urdu-msp-header-content">
              <h1 className="urdu-msp-page-title">
                {selectedCategory === 'tools' && 'ماپنے کے اوزار اور آلات'}
                {selectedCategory === 'techniques' && 'ماپنے کی تکنیکیں'}
                {selectedCategory === 'estimation' && 'اندازہ لگانے کی مہارتیں'}
                {selectedCategory === 'conversions' && 'تبدیلی کی مہارتیں'}
                {selectedCategory === 'precision' && 'درستگی کی مہارتیں'}
              </h1>
              <p className="urdu-msp-page-description">
                {selectedCategory === 'tools' && 'باورچی خانے میں درست پیمائش کے لیے ضروری اوزار اور ان کا صحیح استعمال۔'}
                {selectedCategory === 'techniques' && 'اجزاء کو درست طریقے سے ماپنے کے طریقے اور تکنیکیں۔'}
                {selectedCategory === 'estimation' && 'جب صحیح پیمائش ممکن نہ ہو تو مقدار کا اندازہ لگانے کی مہارتیں۔'}
                {selectedCategory === 'conversions' && 'پیمائشی نظاموں کے درمیان تبدیلی اور ترکیبوں کو ایڈجسٹ کرنا۔'}
                {selectedCategory === 'precision' && 'بیکنگ میں درست پیمائش کے لیے جدید مہارتیں۔'}
              </p>
            </div>
          </header>

          {/* ITEMS GRID */}
          <div className="urdu-msp-items-grid-section">
            <div className="urdu-msp-items-grid">
              {getCurrentData().map(item => (
                <div 
                  key={item.id} 
                  className="urdu-msp-item-card"
                  onClick={() => handleItemSelect(item)}
                >
                  <div 
                    className="urdu-msp-card-image"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                  
                  <div className="urdu-msp-card-content">
                    <div className="urdu-msp-card-header">
                      <h3 className="urdu-msp-card-title">{item.name}</h3>
                      {item.essentiality && (
                        <div className={`urdu-msp-essentiality-badge ${item.essentiality.toLowerCase()}`}>
                          {item.essentiality}
                        </div>
                      )}
                    </div>
                    <p className="urdu-msp-card-description">{item.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* MODAL */}
      {showDetailPanel && selectedItem && (
        <div className="urdu-msp-modal-overlay" onClick={closeDetailPanel}>
          <div className="urdu-msp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="urdu-msp-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="urdu-msp-modal-header">
              <div className="urdu-msp-modal-title">
                <h2>{selectedItem.name}</h2>
                <p className="urdu-msp-modal-subtitle">{selectedItem.tagline}</p>
              </div>
            </div>

            <div className="urdu-msp-modal-content">
              
              {/* LEFT SIDE - SCROLLABLE CONTENT */}
              <div className="urdu-msp-modal-left">
                <div className="urdu-msp-modal-details">
                  
                  {/* DESCRIPTION */}
                  <div className="urdu-msp-detail-section">
                    <h3>📋 تفصیل</h3>
                    <div className="urdu-msp-detail-content">
                      <p>{selectedItem.fullDesc}</p>
                    </div>
                  </div>

                  {/* ===== TOOLS CATEGORY ===== */}
                  {selectedCategory === 'tools' && selectedItem && (
                    <>
                      {/* Key Features */}
                      {selectedItem.keyFeatures && selectedItem.keyFeatures.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>✅ اہم خصوصیات</h3>
                          <div className="urdu-msp-features-horizontal">
                            {selectedItem.keyFeatures.map((feature, idx) => (
                              <div key={idx} className="urdu-msp-feature-box">
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Proper Usage */}
                      {selectedItem.properUsage && (
                        <div className="urdu-msp-detail-section">
                          <h3>📝 صحیح استعمال</h3>
                          <div className="urdu-msp-detail-content">
                            <p><strong>صحیح طریقہ:</strong> {selectedItem.properUsage}</p>
                          </div>
                        </div>
                      )}

                      {/* Common Mistakes */}
                      {selectedItem.commonMistakes && selectedItem.commonMistakes.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>❌ عام غلطیاں</h3>
                          <div className="urdu-msp-mistakes-horizontal">
                            {selectedItem.commonMistakes.map((mistake, idx) => (
                              <div key={idx} className="urdu-msp-mistake-box">
                                {mistake}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Types & Varieties */}
                      {selectedItem.types && selectedItem.types.length > 0 && (
                        <div className="urdu-msp-types-section">
                          <h3 className="urdu-msp-types-heading">🔧 اقسام</h3>
                          <div className="urdu-msp-types-grid">
                            {selectedItem.types.map((type, index) => (
                              <div key={index} className="urdu-msp-type-card">
                                <div 
                                  className="urdu-msp-type-image"
                                  style={{ backgroundImage: `url(${type.image})` }}
                                ></div>
                                <div className="urdu-msp-type-content">
                                  <h4>{type.name}</h4>
                                  <p className="urdu-msp-type-desc">{type.description}</p>
                                  {type.capacity && (
                                    <div className="urdu-msp-type-info">
                                      <span className="urdu-msp-type-info-item">📏 گنجائش: {type.capacity}</span>
                                    </div>
                                  )}
                                  {type.sizes && (
                                    <div className="urdu-msp-type-info">
                                      <span className="urdu-msp-type-info-item">📐 سائز: {type.sizes}</span>
                                    </div>
                                  )}
                                  {type.range && (
                                    <div className="urdu-msp-type-info">
                                      <span className="urdu-msp-type-info-item">🌡️ رینج: {type.range}</span>
                                    </div>
                                  )}
                                  <div className="urdu-msp-type-best">
                                    <strong>بہترین استعمال:</strong> {type.bestFor}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* ===== TECHNIQUES CATEGORY ===== */}
                  {selectedCategory === 'techniques' && selectedItem && (
                    <>
                      {/* Steps */}
                      {selectedItem.steps && selectedItem.steps.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>📋 مرحلہ وار عمل</h3>
                          <div className="urdu-msp-detail-content">
                            <ol className="urdu-msp-steps-list">
                              {selectedItem.steps.map((step, idx) => (
                                <li key={idx} className="urdu-msp-step-item">{step}</li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      )}

                      {/* Tips */}
                      {selectedItem.tips && (
                        <div className="urdu-msp-detail-section">
                          <h3>💡 ماہرانہ نکات</h3>
                          <div className="urdu-msp-detail-content">
                            <p><strong>مشورہ:</strong> {selectedItem.tips}</p>
                          </div>
                        </div>
                      )}

                      {/* Common Mistakes */}
                      {selectedItem.commonMistakes && selectedItem.commonMistakes.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>❌ عام غلطیاں</h3>
                          <div className="urdu-msp-mistakes-horizontal">
                            {selectedItem.commonMistakes.map((mistake, idx) => (
                              <div key={idx} className="urdu-msp-mistake-box">
                                {mistake}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Applications */}
                      {selectedItem.applications && (
                        <div className="urdu-msp-detail-section">
                          <h3>🎯 استعمال کے مقامات</h3>
                          <div className="urdu-msp-detail-content">
                            <p><strong>استعمال کریں:</strong> {selectedItem.applications}</p>
                          </div>
                        </div>
                      )}

                      {/* Methods */}
                      {selectedItem.methods && selectedItem.methods.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🛠️ مختلف طریقے</h3>
                          <div className="urdu-msp-detail-content">
                            <ol className="urdu-msp-methods-list">
                              {selectedItem.methods.map((method, idx) => (
                                <li key={idx} className="urdu-msp-method-item">{method}</li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* ===== ESTIMATION CATEGORY ===== */}
                  {selectedCategory === 'estimation' && selectedItem && (
                    <>
                      {/* Techniques */}
                      {selectedItem.techniques && selectedItem.techniques.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>👐 اندازہ لگانے کی تکنیکیں</h3>
                          <div className="urdu-msp-detail-content">
                            <ul className="urdu-msp-techniques-list">
                              {selectedItem.techniques.map((tech, idx) => (
                                <li key={idx} className="urdu-msp-technique-item">
                                  <span className="urdu-msp-technique-icon">•</span>
                                  <span>{tech}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Measurements */}
                      {selectedItem.measurements && selectedItem.measurements.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>📏 پیمائش کے حوالہ جات</h3>
                          <div className="urdu-msp-measurements-grid">
                            {selectedItem.measurements.map((measurement, idx) => (
                              <div key={idx} className="urdu-msp-measurement-box">
                                {measurement}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Definitions */}
                      {selectedItem.definitions && selectedItem.definitions.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>📚 تعریفیں</h3>
                          <div className="urdu-msp-detail-content">
                            <ul className="urdu-msp-definitions-list">
                              {selectedItem.definitions.map((definition, idx) => (
                                <li key={idx} className="urdu-msp-definition-item">
                                  <span className="urdu-msp-definition-icon">•</span>
                                  <span>{definition}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Equivalents */}
                      {selectedItem.equivalents && selectedItem.equivalents.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>⚖️ پیمائش کے مساوی</h3>
                          <div className="urdu-msp-equivalents-grid">
                            {selectedItem.equivalents.map((equivalent, idx) => (
                              <div key={idx} className="urdu-msp-equivalent-box">
                                {equivalent}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Comparisons */}
                      {selectedItem.comparisons && selectedItem.comparisons.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>⚖️ وزن کے موازنے</h3>
                          <div className="urdu-msp-comparisons-grid">
                            {selectedItem.comparisons.map((comparison, idx) => (
                              <div key={idx} className="urdu-msp-comparison-box">
                                {comparison}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* References */}
                      {selectedItem.references && selectedItem.references.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>👀 بصری حوالہ جات</h3>
                          <div className="urdu-msp-references-grid">
                            {selectedItem.references.map((reference, idx) => (
                              <div key={idx} className="urdu-msp-reference-box">
                                {reference}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Guidelines */}
                      {selectedItem.guidelines && selectedItem.guidelines.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🍽️ حصہ رہنما اصول</h3>
                          <div className="urdu-msp-guidelines-grid">
                            {selectedItem.guidelines.map((guideline, idx) => (
                              <div key={idx} className="urdu-msp-guideline-box">
                                {guideline}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Plate Method */}
                      {selectedItem.plateMethod && selectedItem.plateMethod.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🍽️ پلیٹ کا طریقہ</h3>
                          <div className="urdu-msp-plate-method-grid">
                            {selectedItem.plateMethod.map((method, idx) => (
                              <div key={idx} className="urdu-msp-plate-method-box">
                                {method}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Process */}
                      {selectedItem.process && selectedItem.process.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🧂 مصالحہ لگانے کا عمل</h3>
                          <div className="urdu-msp-detail-content">
                            <ol className="urdu-msp-process-list">
                              {selectedItem.process.map((step, idx) => (
                                <li key={idx} className="urdu-msp-process-item">{step}</li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      )}

                      {/* Tips Array */}
                      {selectedItem.tips && Array.isArray(selectedItem.tips) && (
                        <div className="urdu-msp-detail-section">
                          <h3>💡 ذائقے کے نکات</h3>
                          <div className="urdu-msp-tips-grid">
                            {selectedItem.tips.map((tip, idx) => (
                              <div key={idx} className="urdu-msp-tip-box">
                                {tip}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Indicators */}
                      {selectedItem.indicators && selectedItem.indicators.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>👁️ بصری اور حسی اشارے</h3>
                          <div className="urdu-msp-indicators-grid">
                            {selectedItem.indicators.map((indicator, idx) => (
                              <div key={idx} className="urdu-msp-indicator-box">
                                {indicator}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Time References */}
                      {selectedItem.timeReferences && selectedItem.timeReferences.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>⏰ وقت کے حوالہ جات</h3>
                          <div className="urdu-msp-time-references-grid">
                            {selectedItem.timeReferences.map((time, idx) => (
                              <div key={idx} className="urdu-msp-time-reference-box">
                                {time}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Practice Tips */}
                      {selectedItem.practiceTips && selectedItem.practiceTips.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>📚 مشق کے نکات</h3>
                          <div className="urdu-msp-detail-content">
                            <ol className="urdu-msp-practice-tips-list">
                              {selectedItem.practiceTips.map((tip, idx) => (
                                <li key={idx} className="urdu-msp-practice-tip-item">{tip}</li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      )}

                      {/* Accuracy */}
                      {selectedItem.accuracy && (
                        <div className="urdu-msp-detail-section">
                          <h3>🎯 متوقع درستگی</h3>
                          <div className="urdu-msp-detail-content">
                            <p><strong>درستگی:</strong> {selectedItem.accuracy}</p>
                          </div>
                        </div>
                      )}

                      {/* When to Use */}
                      {selectedItem.whenToUse && (
                        <div className="urdu-msp-detail-section">
                          <h3>✅ کب استعمال کریں</h3>
                          <div className="urdu-msp-detail-content">
                            <p><strong>بہترین مواقع:</strong> {selectedItem.whenToUse}</p>
                          </div>
                        </div>
                      )}

                      {/* When NOT to Use */}
                      {selectedItem.whenNotToUse && (
                        <div className="urdu-msp-detail-section">
                          <h3>❌ کب استعمال نہ کریں</h3>
                          <div className="urdu-msp-detail-content">
                            <p><strong>پرہیز کریں:</strong> {selectedItem.whenNotToUse}</p>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* ===== CONVERSIONS CATEGORY ===== */}
                  {selectedCategory === 'conversions' && selectedItem && (
                    <>
                      {/* Common Conversions */}
                      {selectedItem.commonConversions && selectedItem.commonConversions.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🔄 عام تبدیلیاں</h3>
                          <div className="urdu-msp-conversions-grid">
                            {selectedItem.commonConversions.map((conversion, idx) => (
                              <div key={idx} className="urdu-msp-conversion-box">
                                {conversion}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Metric Conversions */}
                      {selectedItem.metricConversions && selectedItem.metricConversions.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>📏 میٹرک تبدیلیاں</h3>
                          <div className="urdu-msp-metric-conversions-grid">
                            {selectedItem.metricConversions.map((conversion, idx) => (
                              <div key={idx} className="urdu-msp-metric-conversion-box">
                                {conversion}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Baking Conversions */}
                      {selectedItem.bakingConversions && selectedItem.bakingConversions.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🍰 بیکنگ کی تبدیلیاں</h3>
                          <div className="urdu-msp-baking-conversions-grid">
                            {selectedItem.bakingConversions.map((conversion, idx) => (
                              <div key={idx} className="urdu-msp-baking-conversion-box">
                                {conversion}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Formula */}
                      {selectedItem.formula && selectedItem.formula.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🧮 تبدیلی کے فارمولے</h3>
                          <div className="urdu-msp-formula-grid">
                            {selectedItem.formula.map((formula, idx) => (
                              <div key={idx} className="urdu-msp-formula-box">
                                {formula}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Common Temperatures */}
                      {selectedItem.commonTemperatures && selectedItem.commonTemperatures.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🌡️ عام درجہ حرارت</h3>
                          <div className="urdu-msp-temperatures-grid">
                            {selectedItem.commonTemperatures.map((temp, idx) => (
                              <div key={idx} className="urdu-msp-temperature-box">
                                {temp}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Oven Temperatures */}
                      {selectedItem.ovenTemperatures && selectedItem.ovenTemperatures.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🔥 اوون کے درجہ حرارت</h3>
                          <div className="urdu-msp-oven-temperatures-grid">
                            {selectedItem.ovenTemperatures.map((temp, idx) => (
                              <div key={idx} className="urdu-msp-oven-temperature-box">
                                {temp}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Volume Conversions */}
                      {selectedItem.volumeConversions && selectedItem.volumeConversions.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>📊 حجم کی تبدیلیاں</h3>
                          <div className="urdu-msp-volume-conversions-grid">
                            {selectedItem.volumeConversions.map((conversion, idx) => (
                              <div key={idx} className="urdu-msp-volume-conversion-box">
                                {conversion}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Weight Conversions */}
                      {selectedItem.weightConversions && selectedItem.weightConversions.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>⚖️ وزن کی تبدیلیاں</h3>
                          <div className="urdu-msp-weight-conversions-grid">
                            {selectedItem.weightConversions.map((conversion, idx) => (
                              <div key={idx} className="urdu-msp-weight-conversion-box">
                                {conversion}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Oven Conversions */}
                      {selectedItem.ovenConversions && selectedItem.ovenConversions.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🔥 اوون کی تبدیلیاں</h3>
                          <div className="urdu-msp-oven-conversions-grid">
                            {selectedItem.ovenConversions.map((conversion, idx) => (
                              <div key={idx} className="urdu-msp-oven-conversion-box">
                                {conversion}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Common Substitutions */}
                      {selectedItem.commonSubstitutions && selectedItem.commonSubstitutions.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🔄 عام متبادل</h3>
                          <div className="urdu-msp-substitutions-grid">
                            {selectedItem.commonSubstitutions.map((sub, idx) => (
                              <div key={idx} className="urdu-msp-substitution-box">
                                {sub}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Dairy Substitutions */}
                      {selectedItem.dairySubstitutions && selectedItem.dairySubstitutions.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🥛 دودھ کے متبادل</h3>
                          <div className="urdu-msp-dairy-substitutions-grid">
                            {selectedItem.dairySubstitutions.map((sub, idx) => (
                              <div key={idx} className="urdu-msp-dairy-substitution-box">
                                {sub}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Scaling Rules */}
                      {selectedItem.scalingRules && selectedItem.scalingRules.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>📈 ترکیب بڑھانے کے اصول</h3>
                          <div className="urdu-msp-scaling-rules-grid">
                            {selectedItem.scalingRules.map((rule, idx) => (
                              <div key={idx} className="urdu-msp-scaling-rule-box">
                                {rule}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Common Multipliers */}
                      {selectedItem.commonMultipliers && selectedItem.commonMultipliers.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>✖️ عام ضارب</h3>
                          <div className="urdu-msp-multipliers-grid">
                            {selectedItem.commonMultipliers.map((multiplier, idx) => (
                              <div key={idx} className="urdu-msp-multiplier-box">
                                {multiplier}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Exceptions */}
                      {selectedItem.exceptions && selectedItem.exceptions.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>⚠️ مستثنیات</h3>
                          <div className="urdu-msp-exceptions-grid">
                            {selectedItem.exceptions.map((exception, idx) => (
                              <div key={idx} className="urdu-msp-exception-box">
                                {exception}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Common Pan Sizes */}
                      {selectedItem.commonPanSizes && selectedItem.commonPanSizes.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🥘 عام پین کے سائز</h3>
                          <div className="urdu-msp-pan-sizes-grid">
                            {selectedItem.commonPanSizes.map((size, idx) => (
                              <div key={idx} className="urdu-msp-pan-size-box">
                                {size}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Area Calculations */}
                      {selectedItem.areaCalculations && selectedItem.areaCalculations.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>📐 رقبے کا حساب</h3>
                          <div className="urdu-msp-area-calculations-grid">
                            {selectedItem.areaCalculations.map((calc, idx) => (
                              <div key={idx} className="urdu-msp-area-calculation-box">
                                {calc}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Adjustment Rules */}
                      {selectedItem.adjustmentRules && selectedItem.adjustmentRules.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>⚙️ ایڈجسٹمنٹ کے اصول</h3>
                          <div className="urdu-msp-adjustment-rules-grid">
                            {selectedItem.adjustmentRules.map((rule, idx) => (
                              <div key={idx} className="urdu-msp-adjustment-rule-box">
                                {rule}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Must-Know Equivalents */}
                      {selectedItem.mustKnowEquivalents && selectedItem.mustKnowEquivalents.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>📚 ضروری مساوی</h3>
                          <div className="urdu-msp-must-know-grid">
                            {selectedItem.mustKnowEquivalents.map((equiv, idx) => (
                              <div key={idx} className="urdu-msp-must-know-box">
                                {equiv}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Metric Equivalents */}
                      {selectedItem.metricEquivalents && selectedItem.metricEquivalents.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>📏 میٹرک مساوی</h3>
                          <div className="urdu-msp-metric-equivalents-grid">
                            {selectedItem.metricEquivalents.map((equiv, idx) => (
                              <div key={idx} className="urdu-msp-metric-equivalent-box">
                                {equiv}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Handy Equivalents */}
                      {selectedItem.handyEquivalents && selectedItem.handyEquivalents.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>✨ کارآمد مساوی</h3>
                          <div className="urdu-msp-handy-equivalents-grid">
                            {selectedItem.handyEquivalents.map((equiv, idx) => (
                              <div key={idx} className="urdu-msp-handy-equivalent-box">
                                {equiv}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tips */}
                      {selectedItem.tips && typeof selectedItem.tips === 'string' && (
                        <div className="urdu-msp-detail-section">
                          <h3>💡 ماہرانہ نکات</h3>
                          <div className="urdu-msp-detail-content">
                            <p><strong>مشورہ:</strong> {selectedItem.tips}</p>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* ===== PRECISION CATEGORY ===== */}
                  {selectedCategory === 'precision' && selectedItem && (
                    <>
                      {/* Critical Rules */}
                      {selectedItem.criticalRules && selectedItem.criticalRules.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🎯 اہم اصول</h3>
                          <div className="urdu-msp-critical-rules-grid">
                            {selectedItem.criticalRules.map((rule, idx) => (
                              <div key={idx} className="urdu-msp-critical-rule-box">
                                {rule}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Common Errors */}
                      {selectedItem.commonErrors && selectedItem.commonErrors.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>❌ عام غلطیاں</h3>
                          <div className="urdu-msp-errors-grid">
                            {selectedItem.commonErrors.map((error, idx) => (
                              <div key={idx} className="urdu-msp-error-box">
                                {error}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tools Required */}
                      {selectedItem.toolsRequired && selectedItem.toolsRequired.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🔧 ضروری آلات</h3>
                          <div className="urdu-msp-tools-required-grid">
                            {selectedItem.toolsRequired.map((tool, idx) => (
                              <div key={idx} className="urdu-msp-tool-required-box">
                                {tool}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Calibration Methods */}
                      {selectedItem.calibrationMethods && selectedItem.calibrationMethods.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>⚖️ کیلیبریشن کے طریقے</h3>
                          <div className="urdu-msp-calibration-methods-grid">
                            {selectedItem.calibrationMethods.map((method, idx) => (
                              <div key={idx} className="urdu-msp-calibration-method-box">
                                {method}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Maintenance Tips */}
                      {selectedItem.maintenanceTips && selectedItem.maintenanceTips.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🔧 دیکھ بھال کے نکات</h3>
                          <div className="urdu-msp-maintenance-tips-grid">
                            {selectedItem.maintenanceTips.map((tip, idx) => (
                              <div key={idx} className="urdu-msp-maintenance-tip-box">
                                {tip}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Accuracy Check */}
                      {selectedItem.accuracyCheck && selectedItem.accuracyCheck.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>✅ درستگی کی جانچ</h3>
                          <div className="urdu-msp-accuracy-check-grid">
                            {selectedItem.accuracyCheck.map((check, idx) => (
                              <div key={idx} className="urdu-msp-accuracy-check-box">
                                {check}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tools for Micro */}
                      {selectedItem.toolsForMicro && selectedItem.toolsForMicro.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🔬 مائیکرو پیمائش کے آلات</h3>
                          <div className="urdu-msp-micro-tools-grid">
                            {selectedItem.toolsForMicro.map((tool, idx) => (
                              <div key={idx} className="urdu-msp-micro-tool-box">
                                {tool}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Micro Techniques */}
                      {selectedItem.techniques && selectedItem.techniques.length > 0 && selectedItem.nameEn !== "Temperature Precision" && (
                        <div className="urdu-msp-detail-section">
                          <h3>🔍 مائیکرو پیمائش کی تکنیکیں</h3>
                          <div className="urdu-msp-micro-techniques-grid">
                            {selectedItem.techniques.map((tech, idx) => (
                              <div key={idx} className="urdu-msp-micro-technique-box">
                                {tech}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Critical Amounts */}
                      {selectedItem.criticalAmounts && selectedItem.criticalAmounts.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>⚡ اہم مقدار</h3>
                          <div className="urdu-msp-critical-amounts-grid">
                            {selectedItem.criticalAmounts.map((amount, idx) => (
                              <div key={idx} className="urdu-msp-critical-amount-box">
                                {amount}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Portioning Tools */}
                      {selectedItem.portioningTools && selectedItem.portioningTools.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🍽️ حصہ بندی کے آلات</h3>
                          <div className="urdu-msp-portioning-tools-grid">
                            {selectedItem.portioningTools.map((tool, idx) => (
                              <div key={idx} className="urdu-msp-portioning-tool-box">
                                {tool}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Portioning Techniques */}
                      {selectedItem.techniques && selectedItem.techniques.length > 0 && selectedItem.nameEn === "Consistent Portioning" && (
                        <div className="urdu-msp-detail-section">
                          <h3>👐 حصہ بندی کی تکنیکیں</h3>
                          <div className="urdu-msp-portioning-techniques-grid">
                            {selectedItem.techniques.map((tech, idx) => (
                              <div key={idx} className="urdu-msp-portioning-technique-box">
                                {tech}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Benefits */}
                      {selectedItem.benefits && selectedItem.benefits.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>✅ فوائد</h3>
                          <div className="urdu-msp-benefits-grid">
                            {selectedItem.benefits.map((benefit, idx) => (
                              <div key={idx} className="urdu-msp-benefit-box">
                                {benefit}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Critical Temperatures */}
                      {selectedItem.criticalTemperatures && selectedItem.criticalTemperatures.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🌡️ اہم درجہ حرارت</h3>
                          <div className="urdu-msp-critical-temperatures-grid">
                            {selectedItem.criticalTemperatures.map((temp, idx) => (
                              <div key={idx} className="urdu-msp-critical-temperature-box">
                                {temp}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Temperature Tools */}
                      {selectedItem.tools && selectedItem.tools.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🔧 درجہ حرارت کے آلات</h3>
                          <div className="urdu-msp-temperature-tools-grid">
                            {selectedItem.tools.map((tool, idx) => (
                              <div key={idx} className="urdu-msp-temperature-tool-box">
                                {tool}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Temperature Techniques */}
                      {selectedItem.techniques && selectedItem.techniques.length > 0 && selectedItem.nameEn === "Temperature Precision" && (
                        <div className="urdu-msp-detail-section">
                          <h3>📊 درجہ حرارت کی تکنیکیں</h3>
                          <div className="urdu-msp-temperature-techniques-grid">
                            {selectedItem.techniques.map((tech, idx) => (
                              <div key={idx} className="urdu-msp-temperature-technique-box">
                                {tech}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Common Ratios */}
                      {selectedItem.commonRatios && selectedItem.commonRatios.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>📐 عام تناسب</h3>
                          <div className="urdu-msp-ratios-grid">
                            {selectedItem.commonRatios.map((ratio, idx) => (
                              <div key={idx} className="urdu-msp-ratio-box">
                                {ratio}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Calculation */}
                      {selectedItem.calculation && selectedItem.calculation.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🧮 حساب کے طریقے</h3>
                          <div className="urdu-msp-calculation-grid">
                            {selectedItem.calculation.map((calc, idx) => (
                              <div key={idx} className="urdu-msp-calculation-box">
                                {calc}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Effects */}
                      {selectedItem.effects && selectedItem.effects.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>📊 اثرات</h3>
                          <div className="urdu-msp-effects-grid">
                            {selectedItem.effects.map((effect, idx) => (
                              <div key={idx} className="urdu-msp-effect-box">
                                {effect}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Basic Ratios */}
                      {selectedItem.basicRatios && selectedItem.basicRatios.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>📏 بنیادی تناسب</h3>
                          <div className="urdu-msp-basic-ratios-grid">
                            {selectedItem.basicRatios.map((ratio, idx) => (
                              <div key={idx} className="urdu-msp-basic-ratio-box">
                                {ratio}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Application */}
                      {selectedItem.application && selectedItem.application.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>🎯 استعمال</h3>
                          <div className="urdu-msp-application-methods-grid">
                            {selectedItem.application.map((method, idx) => (
                              <div key={idx} className="urdu-msp-application-method-box">
                                {method}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Documentation Methods */}
                      {selectedItem.documentationMethods && selectedItem.documentationMethods.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>📝 دستاویزات کے طریقے</h3>
                          <div className="urdu-msp-documentation-methods-grid">
                            {selectedItem.documentationMethods.map((method, idx) => (
                              <div key={idx} className="urdu-msp-documentation-method-box">
                                {method}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* What to Record */}
                      {selectedItem.whatToRecord && selectedItem.whatToRecord.length > 0 && (
                        <div className="urdu-msp-detail-section">
                          <h3>📋 کیا ریکارڈ کریں</h3>
                          <div className="urdu-msp-what-to-record-grid">
                            {selectedItem.whatToRecord.map((item, idx) => (
                              <div key={idx} className="urdu-msp-record-item-box">
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tips */}
                      {selectedItem.tips && typeof selectedItem.tips === 'string' && (
                        <div className="urdu-msp-detail-section">
                          <h3>💡 ماہرانہ نکات</h3>
                          <div className="urdu-msp-detail-content">
                            <p><strong>مشورہ:</strong> {selectedItem.tips}</p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* RIGHT SIDE - FIXED IMAGE */}
              <div className="urdu-msp-modal-right">
                <div className="urdu-msp-main-image-container">
                  <div 
                    className="urdu-msp-main-image"
                    style={{ backgroundImage: `url(${selectedItem.image})` }}
                  >
                    {selectedItem.essentiality && (
                      <div className="urdu-msp-image-overlay">
                        <div className={`urdu-msp-essentiality-badge-large ${selectedItem.essentiality.toLowerCase()}`}>
                          {selectedItem.essentiality}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Back to Home Button */}
      <div className="urdu-msp-back-home-container">
        <button 
          className="urdu-msp-back-home-btn"
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

export default UrduMeasuringSkillsPage;