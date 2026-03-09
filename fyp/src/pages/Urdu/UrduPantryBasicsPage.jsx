import React, { useState } from 'react';
import './UrduPantryPage.css';
import { useNavigate } from 'react-router-dom';

const UrduPantryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('basics');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [spiceCategory, setSpiceCategory] = useState('all');
  const [staplesCategory, setStaplesCategory] = useState('all');
  const [vegetablesCategory, setVegetablesCategory] = useState('all');

  const navigate = useNavigate();

  const getFilteredSpices = () => {
    if (spiceCategory === 'all') return spicesData;
    return spicesData.filter(spice => spice.category === spiceCategory);
  };
  
  const getFilteredStaples = () => {
    if (staplesCategory === 'all') return staplesData;
    return staplesData.filter(item => item.category === staplesCategory);
  };
  
  const getFilteredVegetables = () => {
    if (vegetablesCategory === 'all') return dailyVegetablesData;
    return dailyVegetablesData.filter(item => item.category === vegetablesCategory);
  };

  // ========== باورچی خانے کی بنیادی اشیاء ==========
  const kitchenBasicsData = [
    {
      id: 1,
      name: "چاول",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800",
      tagline: "ہر کھانے کی بنیادی ضرورت",
      fullDesc: "چاول ایک ورسٹائل اناج ہے جو کھانوں کی بنیاد بنتا ہے۔ باسمتی، جیسمین، براؤن اور سفید چاول کی اقسام میں دستیاب ہے۔ یہ کاربوہائیڈریٹس سے بھرپور غذا ہے جو توانائی فراہم کرتا ہے۔",
      storageTips: "ایئر ٹائٹ ڈبے میں رکھیں، نمی اور کیڑوں سے بچائیں۔",
      shelfLife: "سفید چاول: 2-3 سال، براؤن چاول: 6 ماہ",
      keyUses: ["بریانی", "سادہ چاول", "تلے ہوئے چاول", "کھیر"],
      types: [
        {
          name: "باسمتی چاول",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
          description: "خوشبودار لمبے دانے والے چاول",
          bestFor: "بریانی، پلاؤ، تلے چاول"
        },
        {
          name: "براؤن چاول",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "چوکر سمیت صحت بخش چاول",
          bestFor: "صحت بخش کھانے، ذیابیطس"
        },
        {
          name: "جیسمین چاول",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "خوشبودار چاول",
          bestFor: "تھائی کھانے"
        },
        {
          name: "سونہ مسوری",
          image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=300",
          description: "جنوبی ہند کے درمیانے دانے چاول",
          bestFor: "روزمرہ کھانے، لیموں چاول"
        }
      ]
    },
    {
      id: 2,
      name: "گندم کا آٹا",
      image: "https://images.unsplash.com/photo-1625937320885-8e4d56fd8c57?auto=format&fit=crop&w=800",
      tagline: "روٹیوں کے لیے ضروری",
      fullDesc: "چکی کا آٹا گندم کو پیس کر بنایا جاتا ہے۔ روٹی، پراٹھے اور پوری کے لیے استعمال ہوتا ہے۔ میدے سے زیادہ صحت بخش ہوتا ہے۔",
      storageTips: "ایئر ٹائٹ ڈبے میں ٹھنڈی جگہ رکھیں",
      shelfLife: "3-6 ماہ",
      keyUses: ["روٹی", "پراٹھا", "پوری", "نان"],
      types: [
        {
          name: "چکی کا آٹا",
          image: "https://images.unsplash.com/photo-1605197581314-d2d0b3929a73?auto=format&fit=crop&w=300",
          description: "پورے گندم کا آٹا",
          bestFor: "روٹی، پراٹھا"
        },
        {
          name: "میدہ",
          image: "https://images.unsplash.com/photo-1587057706176-2f6c52f30c9b?auto=format&fit=crop&w=300",
          description: "ریفائنڈ آٹا",
          bestFor: "کیک، پیسٹری، نان"
        },
        {
          name: "بیسن (چنے کا آٹا)",
          image: "https://images.unsplash.com/photo-1587734195503-904137cec4a6?auto=format&fit=crop&w=300",
          description: "چنے پیس کر بنایا گیا آٹا",
          bestFor: "پکوڑے، کڑھی، چیلہ"
        },
        {
          name: "سوجی",
          image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300",
          description: "درآٹا",
          bestFor: "حلوہ، اپما، روا اِڈلی"
        }
      ]
    },
    {
      id: 3,
      name: "کھانا پکانے کا تیل",
      image: "https://images.unsplash.com/photo-1533050487297-09b450131914?auto=format&fit=crop&w=800",
      tagline: "کھانا پکانے کی بنیادی ضرورت",
      fullDesc: "مختلف اقسام: سرسوں کا تیل، سورج مکھی کا تیل، زیتون کا تیل، ناریل کا تیل۔ ہر تیل کا استعمال مختلف ہوتا ہے۔",
      storageTips: "گہرے شیشے کی بوتل میں دھوپ سے دور رکھیں",
      shelfLife: "1-2 سال",
      keyUses: ["تلنا", "بھوننا", "چھونک", "اچار"],
      types: [
        {
          name: "سرسوں کا تیل",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
          description: "تیز ذائقے والا تیل",
          bestFor: "پکوان، اچار"
        },
        {
          name: "سورج مکھی کا تیل",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "ہلکا بے ذائقہ تیل",
          bestFor: "روزمرہ کھانا، تلنا"
        },
        {
          name: "زیتون کا تیل",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "صحت بخش تیل",
          bestFor: "سلاد، اطالوی کھانے"
        },
        {
          name: "ناریل کا تیل",
          image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=300",
          description: "خوشبودار تیل",
          bestFor: "جنوبی ہند کے کھانے"
        }
      ]
    },
    {
      id: 4,
      name: "نمک",
      image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800",
      tagline: "ہر ڈش کی بنیادی مسالا",
      fullDesc: "کھانا پکانے اور صحت کے لیے ضروری۔ مختلف اقسام: ٹیبل نمک، سمندری نمک، سیندھا نمک، آئوڈائزڈ نمک۔",
      storageTips: "ایئر ٹائٹ ڈبے میں رکھیں",
      shelfLife: "لا محدود",
      keyUses: ["ذائقہ", "محفوظ کرنا", "بیکنگ", "مرینیشن"],
      types: [
        {
          name: "ٹیبل نمک",
          image: "https://images.unsplash.com/photo-1587057706176-2f6c52f30c9b?auto=format&fit=crop&w=300",
          description: "ریفائنڈ آئوڈائزڈ نمک",
          bestFor: "کھانا پکانا، بیکنگ"
        },
        {
          name: "سمندری نمک",
          image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=300",
          description: "قدرتی سمندری نمک",
          bestFor: "سلاد، فنشنگ"
        },
        {
          name: "سیندھا نمک",
          image: "https://images.unsplash.com/photo-1587734195503-904137cec4a6?auto=format&fit=crop&w=300",
          description: "بڑے کرسٹل والا نمک",
          bestFor: "روزہ، چاٹ"
        }
      ]
    },
    {
      id: 5,
      name: "چینی",
      image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=800",
      tagline: "مٹھاس کے لیے",
      fullDesc: "مختلف اقسام: سفید چینی، براؤن شوگر، گڑ، شہد۔ ہر ایک کا اپنا ذائقہ اور استعمال ہے۔",
      storageTips: "ایئر ٹائٹ ڈبے میں نمی سے دور رکھیں",
      shelfLife: "2+ سال",
      keyUses: ["چائے/کافی", "مٹھائیاں", "بیکنگ", "میٹھے پکوان"],
      types: [
        {
          name: "سفید چینی",
          image: "https://images.unsplash.com/photo-1605197581314-d2d0b3929a73?auto=format&fit=crop&w=300",
          description: "ریفائنڈ دانے دار چینی",
          bestFor: "چائے، کافی، بیکنگ"
        },
        {
          name: "براؤن شوگر",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "گڑ ملا چینی",
          bestFor: "کوکیز، کیک، چٹنی"
        },
        {
          name: "گڑ",
          image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300",
          description: "غیر مصفا گنے کی شکر",
          bestFor: "پاکستانی مٹھائیاں"
        },
        {
          name: "شہد",
          image: "https://images.unsplash.com/photo-1536599018109-73a2d2c5000f?auto=format&fit=crop&w=300",
          description: "قدرتی مٹھاس",
          bestFor: "صحت، ڈریسنگز"
        }
      ]
    }
  ];

  // ========== مصالحہ جات کا ڈیٹا ==========
  const spicesData = [
    // 🌿 سابُت مصالحہ
    {
      id: 101,
      name: "زیرہ",
      urduName: "زیرہ",
      category: "whole",
      categoryDisplay: "سابُت مصالحہ",
      image: "zeera.png",
      tagline: "چھونک کے لیے خوشبودار بیج",
      fullDesc: "زیرہ ہندوستانی کھانوں میں چھونک کے لیے استعمال ہوتا ہے۔ اس کا ذائقہ گرم اور مٹیالا ہوتا ہے۔ دالوں، سالن اور چاولوں میں استعمال ہوتا ہے۔",
      keyFeatures: ["خوشبودار", "ہاضمہ بہتر کرے", "چھونک کے لیے ضروری", "آئرن سے بھرپور"],
      properUsage: "گرم تیل میں چھونک کے لیے ڈالیں، پیسنے سے پہلے بھون لیں",
      commonMistakes: ["تیل میں جلانا", "پرانا زیرہ استعمال کرنا", "بغیر بھونے پیسنا"],
      types: [
        {
          name: "سفید زیرہ",
          description: "عام قسم، ہلکا بھورا",
          bestFor: "روزمرہ کھانا، چھونک"
        },
        {
          name: "کالا زیرہ",
          description: "گہرا، میٹھا، خوشبودار",
          bestFor: "بریانی، خاص پکوان"
        }
      ]
    },
    {
      id: 102,
      name: "دھنیا",
      urduName: "دھنیا",
      category: "whole",
      categoryDisplay: "سابُت مصالحہ",
      image: "dhania.png",
      tagline: "کھٹاس والے بیج، سالن کی بنیاد",
      fullDesc: "دھنیا کے بیج کھٹاس اور پھولوں جیسی خوشبو رکھتے ہیں۔ ہندوستانی کھانوں میں بنیادی مصالحہ ہے۔ زیرے کے ساتھ ملا کر سالن کی بنیاد بناتے ہیں۔",
      keyFeatures: ["کھٹاس", "ٹھنڈک", "ورسٹائل", "ہاضمہ"],
      properUsage: "سوکھا بھون لیں، پیس لیں، اچار میں استعمال کریں",
      commonMistakes: ["زیادہ بھوننا", "صرف پسی ہوئی خریدنا", "غلط ذخیرہ"],
      types: [
        {
          name: "سابُت دھنیا",
          description: "گول، خاکی بیج",
          bestFor: "سالن، مصالحہ جات، اچار"
        },
        {
          name: "پسا دھنیا",
          description: "پسا ہوا",
          bestFor: "جلد پکانے، مرینیشن"
        }
      ]
    },
    {
      id: 103,
      name: "سونف",
      urduName: "سونف",
      category: "whole",
      categoryDisplay: "سابُت مصالحہ",
      image: "saunf.png",
      tagline: "میٹھے بیج، منہ میٹھا کرنے کے لیے",
      fullDesc: "سونف میں میٹھا ذائقہ اور ٹھنڈک ہوتی ہے۔ کھانے کے بعد منہ میٹھا کرنے، چائے میں، سالن، روٹیوں اور اچار میں استعمال ہوتی ہے۔",
      keyFeatures: ["میٹھی خوشبو", "ہاضمہ", "منہ میٹھا", "ٹھنڈک"],
      properUsage: "کھانے بعد چبائیں، چھونک میں ڈالیں، پیس لیں",
      commonMistakes: ["ذائقہ غالب آنا", "زیادہ ڈالنا", "بھوننا بھولنا"],
      types: [
        {
          name: "میٹھی سونف",
          description: "عام قسم، سبزی مائل",
          bestFor: "منہ میٹھا، سالن"
        },
        {
          name: "بھونی سونف",
          description: "بھونی ہوئی",
          bestFor: "چائے، ہاضمہ"
        }
      ]
    },
    {
      id: 104,
      name: "میتھی دانہ",
      urduName: "میتھی دانہ",
      category: "whole",
      categoryDisplay: "سابُت مصالحہ",
      image: "methi-dana.png",
      tagline: "کڑوے بیج، اچار اور سالن میں گہرائی",
      fullDesc: "میتھی دانہ کڑوا اور میپل جیسی خوشبو رکھتا ہے۔ اچار، سالن اور مصالحہ جات میں استعمال ہوتا ہے۔ ذیابیطس کے لیے مفید ہے۔",
      keyFeatures: ["کڑوا", "بھوننے پر خوشبو", "دوائی خصوصیات", "تیز ذائقہ"],
      properUsage: "بھگو کر استعمال کریں، بھون کر کڑواہٹ کم کریں",
      commonMistakes: ["زیادہ ڈالنا", "کچا استعمال", "بھگونا بھولنا"],
      types: [
        {
          name: "سابُت میتھی",
          description: "چھوٹے، سخت، بھورے بیج",
          bestFor: "اچار، مصالحہ جات"
        },
        {
          name: "اُگائی میتھی",
          description: "پھوٹے بیج",
          bestFor: "سلاد، کم کڑواہٹ"
        }
      ]
    },
    {
      id: 105,
      name: "رائی",
      urduName: "رائی / سرسوں",
      category: "whole",
      categoryDisplay: "سابُت مصالحہ",
      image: "rai.png",
      tagline: "گرم تیل میں چٹخنے والے بیج",
      fullDesc: "رائی چھوٹے، تیز بیج ہیں جو گرم تیل میں چٹختے ہیں اور خوشبو چھوڑتے ہیں۔ جنوبی ہند کے پکوان، اچار اور سالن میں ضروری ہے۔",
      keyFeatures: ["تیز ذائقہ", "تیل میں چٹخنا", "محفوظ کرے", "تیل سے بھرپور"],
      properUsage: "گرم تیل میں چٹخنے تک پکائیں، پیس کر پیسٹ بنائیں",
      commonMistakes: ["جلانا", "پرانی رائی", "چٹخنے نہ دینا"],
      types: [
        {
          name: "بھوری رائی",
          description: "ہندوستانی کھانوں میں عام",
          bestFor: "چھونک، سالن، اچار"
        },
        {
          name: "پیلی رائی",
          description: "ہلکی، بڑے بیج",
          bestFor: "مغربی پکوان"
        },
        {
          name: "کالی رائی",
          description: "سب سے تیز",
          bestFor: "بنگالی کھانے، اچار"
        }
      ]
    },
    {
      id: 106,
      name: "اجوائن",
      urduName: "اجوائن",
      category: "whole",
      categoryDisplay: "سابُت مصالحہ",
      image: "ajwain.png",
      tagline: "ہاضمہ اور روٹیوں کے لیے",
      fullDesc: "اجوائن زیرہ جیسی دکھتی ہے مگر ذائقہ تھائم جیسا تیز ہوتا ہے۔ ہاضمے کے لیے بہترین، روٹیوں، پراٹھوں اور دالوں میں استعمال ہوتی ہے۔",
      keyFeatures: ["تھائم جیسا ذائقہ", "ہاضمہ", "تیز خوشبو", "دوائی خصوصیات"],
      properUsage: "تھوڑی استعمال کریں، کچل کر ڈالیں، آٹے میں ڈالیں",
      commonMistakes: ["زیادہ ڈالنا", "نہ کچلنا", "بھاری کھانے میں نہ ڈالنا"],
      types: [
        {
          name: "اجوائن",
          description: "عام قسم",
          bestFor: "روٹیاں، دالیں"
        }
      ]
    },
    {
      id: 107,
      name: "کلونجی",
      urduName: "کلونجی",
      category: "whole",
      categoryDisplay: "سابُت مصالحہ",
      image: "kalonji.png",
      tagline: "پیاز جیسے ذائقے والے کالے بیج",
      fullDesc: "کلونجی کو پیاز کے بیج یا کالا زیرہ بھی کہتے ہیں۔ ذائقہ ہلکا کڑوا، پیاز جیسا ہوتا ہے۔ نان، اچار اور سبزیوں میں استعمال ہوتے ہیں۔",
      keyFeatures: ["پیاز جیسا ذائقہ", "کالے تکونے بیج", "دوائی خصوصیات", "خوشبودار"],
      properUsage: "نان پر چھڑکیں، اچار میں ڈالیں، تیل میں چھونک دیں",
      commonMistakes: ["تل سے کنفیوژن", "زیادہ ڈالنا", "نہ بھوننا"],
      types: [
        {
          name: "کلونجی",
          description: "چھوٹے کالے بیج",
          bestFor: "نان، اچار، سبزیاں"
        }
      ]
    },
    {
      id: 108,
      name: "خشخاش",
      urduName: "خشخاش",
      category: "whole",
      categoryDisplay: "سابُت مصالحہ",
      image: "khas-khas.png",
      tagline: "سفید کریمی بیج، سالن گاڑھا کرنے",
      fullDesc: "خشخاش چھوٹے، تیل سے بھرپور بیج ہیں۔ ہندوستانی کھانوں میں سالن گاڑھا کرنے، مصالحہ جات اور مٹھائیوں میں استعمال ہوتے ہیں۔",
      keyFeatures: ["کریمی ساخت", "اخروٹ جیسا ذائقہ", "گاڑھا کرے", "ہلکے نشہ کی خصوصیات"],
      properUsage: "بھگو کر پیس لیں، سوکھا بھون کر چھڑکیں",
      commonMistakes: ["باریک نہ پیسنا", "پرانا استعمال", "بھگونا بھولنا"],
      types: [
        {
          name: "سفید خشخاش",
          description: "ہندوستانی کھانوں میں عام",
          bestFor: "سالن، قورمہ، گاڑھا کرنے"
        },
        {
          name: "کالا خشخاش",
          description: "چھوٹا، تیز ذائقہ",
          bestFor: "بیکنگ، چھڑکنے"
        }
      ]
    },
    {
      id: 109,
      name: "تل",
      urduName: "تل",
      category: "whole",
      categoryDisplay: "سابُت مصالحہ",
      image: "til.png",
      tagline: "چھونک، مٹھائی اور سجاوٹ کے لیے",
      fullDesc: "تل چھوٹے، چپٹے بیج ہیں جو بھوننے پر اخروٹ جیسا ذائقہ دیتے ہیں۔ چھونک، تل کے لڈو، نان پر چھڑکنے اور پیس کر تہینی بنانے میں استعمال ہوتے ہیں۔",
      keyFeatures: ["بھوننے پر خوشبو", "تیل سے بھرپور", "کیلشیم زیادہ", "ورسٹائل"],
      properUsage: "سنہری بھون لیں، چھونک میں ڈالیں، پیس لیں",
      commonMistakes: ["جلانا", "کچا استعمال", "ٹھنڈی جگہ نہ رکھنا"],
      types: [
        {
          name: "سفید تل",
          description: "عام قسم",
          bestFor: "پکوان، مٹھائیاں"
        },
        {
          name: "کالا تل",
          description: "تیز ذائقہ",
          bestFor: "سجاوٹ، دوائی استعمال"
        }
      ]
    },
    {
      id: 110,
      name: "اجوائن (اجمود)",
      urduName: "اجوائن (اجمود)",
      category: "whole",
      categoryDisplay: "سابُت مصالحہ",
      image: "ajmod.png",
      tagline: "اجمود جیسے ذائقے والے چھوٹے بیج",
      fullDesc: "اجمود کے بیج بھورے اور تیز ذائقے والے ہوتے ہیں۔ اچار اور مصالحہ جات میں استعمال ہوتے ہیں۔",
      keyFeatures: ["اجمود جیسا ذائقہ", "چھوٹے بیج", "خوشبودار", "اچار کے لیے مفید"],
      properUsage: "کم استعمال کریں، کچل کر ڈالیں",
      commonMistakes: ["زیادہ ڈالنا", "نہ کچلنا"],
      types: [
        {
          name: "سابُت اجمود",
          description: "چھوٹے بھورے بیج",
          bestFor: "اچار، مصالحہ جات"
        }
      ]
    },
    {
      id: 118,
      name: "کالی مرچ",
      urduName: "کالی مرچ",
      category: "whole",
      categoryDisplay: "سابُت مصالحہ",
      image: "kali-mirch.png",
      tagline: "مصالحوں کا بادشاہ، تیز اور ورسٹائل",
      fullDesc: "کالی مرچ دنیا بھر میں سب سے زیادہ استعمال ہونے والا مصالحہ ہے۔ اس کا ذائقہ تیز اور گرم ہوتا ہے۔ مصالحہ جات میں سابُت، مرینیشن میں کُچل کر، اور پیس کر استعمال ہوتی ہے۔",
      keyFeatures: ["تیز گرمی", "ہاضمہ", "یونیورسل مسالا"],
      properUsage: "تازہ پیس کر استعمال کریں",
      commonMistakes: ["صرف پسی ہوئی استعمال", "تازہ نہ پیسنا"],
      types: [
        {
          name: "تیلیچری مرچ",
          description: "بڑے دانے، اعلیٰ قسم",
          bestFor: "بہترین ذائقہ"
        },
        {
          name: "ملیبار مرچ",
          description: "روایتی ہندوستانی قسم",
          bestFor: "روزمرہ استعمال"
        }
      ]
    },
    {
      id: 120,
      name: "سوکھی لال مرچ",
      urduName: "سوکھی لال مرچ",
      category: "whole",
      categoryDisplay: "سابُت مصالحہ",
      image: "sookhi-lal-mirch.png",
      tagline: "تیز گرمی اور رنگ کے لیے",
      fullDesc: "سوکھی لال مرچ گرمی اور رنگ دینے کے لیے استعمال ہوتی ہے۔ چھونک میں ڈالی جا سکتی ہے یا پیس کر پاؤڈر بنا سکتے ہیں۔",
      keyFeatures: ["گرمی", "لال رنگ", "لمبی شیلف لائف"],
      properUsage: "گرم تیل میں ڈالیں",
      commonMistakes: ["جلانا", "غلط قسم استعمال کرنا"],
      types: [
        {
          name: "کشمیری مرچ",
          description: "ہلکی گرمی، گہرا رنگ",
          bestFor: "رنگ دار پکوان"
        },
        {
          name: "گنٹور مرچ",
          description: "بہت تیز",
          bestFor: "تیز مصالحہ"
        }
      ]
    },

    // 🌶️ پسا مصالحہ
    {
      id: 201,
      name: "ہلدی",
      urduName: "ہلدی",
      category: "ground",
      categoryDisplay: "پسا مصالحہ",
      image: "haldi.png",
      tagline: "سنہری مصالحہ، رنگ اور صحت کے لیے",
      fullDesc: "ہلدی سالن کو پیلا رنگ دیتی ہے، مٹیالا ذائقہ رکھتی ہے، اور سوزش کم کرنے کی خصوصیات رکھتی ہے۔ ہر پکوان میں استعمال ہوتی ہے۔",
      keyFeatures: ["سنہری رنگ", "مٹیالا ذائقہ", "سوزش کم کرے", "محفوظ کرے"],
      properUsage: "پکانے کے شروع میں ڈالیں",
      commonMistakes: ["زیادہ ڈالنا", "پرانی ہلدی", "کچی ہلدی استعمال"],
      types: [
        {
          name: "عام ہلدی",
          description: "روزمرہ استعمال",
          bestFor: "ہر پکوان"
        }
      ]
    },
    {
      id: 202,
      name: "لال مرچ پاؤڈر",
      urduName: "لال مرچ پاؤڈر",
      category: "ground",
      categoryDisplay: "پسا مصالحہ",
      image: "lal-mirch-powder.png",
      tagline: "پسی ہوئی مرچ، ہر نوالے میں گرمی",
      fullDesc: "لال مرچ پاؤڈر سوکھی لال مرچ پیس کر بنایا جاتا ہے۔ پکوانوں میں گرمی اور رنگ دیتا ہے۔",
      keyFeatures: ["گرمی", "رنگ", "جلد استعمال", "مختلف گرمی کی سطح"],
      properUsage: "پکاتے وقت ڈالیں",
      commonMistakes: ["زیادہ ڈالنا", "کم معیار پاؤڈر"],
      types: [
        {
          name: "کشمیری مرچ پاؤڈر",
          description: "ہلکی گرمی",
          bestFor: "رنگ دار پکوان"
        },
        {
          name: "تیز مرچ پاؤڈر",
          description: "بہت تیز",
          bestFor: "تیز مصالحہ"
        }
      ]
    },
    {
      id: 203,
      name: "زیرہ پاؤڈر",
      urduName: "زیرہ پاؤڈر",
      category: "ground",
      categoryDisplay: "پسا مصالحہ",
      image: "zeera-powder.png",
      tagline: "پسا زیرہ، جلدی استعمال",
      fullDesc: "زیرہ پاؤڈر بھنے یا کچے زیرے پیس کر بنایا جاتا ہے۔ سالن، مرینیشن اور مصالحہ جات میں استعمال ہوتا ہے۔",
      keyFeatures: ["مٹیالا ذائقہ", "جلد استعمال", "گرم مصالحے میں ضروری", "ہاضمہ"],
      properUsage: "پکاتے وقت یا آخر میں ڈالیں",
      commonMistakes: ["پرانا پاؤڈر", "بغیر بھونے استعمال"],
      types: [
        {
          name: "بھنا زیرہ پاؤڈر",
          description: "زیادہ خوشبودار",
          bestFor: "چاٹ، فائنشنگ"
        },
        {
          name: "کچا زیرہ پاؤڈر",
          description: "تیز ذائقہ",
          bestFor: "سالن"
        }
      ]
    },
    {
      id: 204,
      name: "دھنیا پاؤڈر",
      urduName: "دھنیا پاؤڈر",
      category: "ground",
      categoryDisplay: "پسا مصالحہ",
      image: "dhania-powder.png",
      tagline: "کھٹاس والا مصالحہ، سالن کی بنیاد",
      fullDesc: "دھنیا پاؤڈر دھنیا پیس کر بنایا جاتا ہے۔ زیرے کے ساتھ مل کر سالن کی بنیاد بناتا ہے۔",
      keyFeatures: ["کھٹاس", "ہلکا ذائقہ", "ٹھنڈک"],
      properUsage: "فراخ دلی سے استعمال کریں",
      commonMistakes: ["کم ڈالنا", "پرانا پاؤڈر"],
      types: [
        {
          name: "عام دھنیا پاؤڈر",
          description: "روزمرہ استعمال",
          bestFor: "ہر پکوان"
        }
      ]
    },
    {
      id: 205,
      name: "گرم مصالحہ",
      urduName: "گرم مصالحہ",
      category: "ground",
      categoryDisplay: "پسا مصالحہ",
      image: "garam-masala.png",
      tagline: "خوشبودار مصالحہ، آخر میں ڈالنے کے لیے",
      fullDesc: "گرم مصالحہ الائچی، دار چینی، لونگ اور زیرے جیسے مصالحوں کا مرکب ہے۔ آخر میں ڈالا جاتا ہے۔",
      keyFeatures: ["پیچیدہ خوشبو", "گرم مصالحے", "آخر میں ڈالیں"],
      properUsage: "پکانے کے آخر میں ڈالیں",
      commonMistakes: ["جلدی ڈالنا", "زیادہ ڈالنا"],
      types: [
        {
          name: "پنجابی گرم مصالحہ",
          description: "دلکش",
          bestFor: "شمالی ہند کے سالن"
        },
        {
          name: "لکھنوی گرم مصالحہ",
          description: "نازک",
          bestFor: "بریانی"
        }
      ]
    },
    {
      id: 206,
      name: "کالی مرچ پاؤڈر",
      urduName: "کالی مرچ پاؤڈر",
      category: "ground",
      categoryDisplay: "پسا مصالحہ",
      image: "kali-mirch-powder.png",
      tagline: "پسی کالی مرچ، جلدی استعمال",
      fullDesc: "کالی مرچ پاؤڈر فوری استعمال کے لیے ہے۔ تازہ پسنا بہتر ہے۔",
      keyFeatures: ["تیز گرمی", "یونیورسل مسالا"],
      properUsage: "آخر میں ڈالیں",
      commonMistakes: ["صرف پسی ہوئی استعمال", "جلدی ڈالنا"],
      types: [
        {
          name: "باریک پسا",
          description: "عام استعمال",
          bestFor: "ہر پکوان"
        }
      ]
    },
    {
      id: 210,
      name: "ہینگ",
      urduName: "ہینگ",
      category: "ground",
      categoryDisplay: "پسا مصالحہ",
      image: "hing.png",
      tagline: "تیز خوشبو والا مسالہ، پیاز لہسن کا بدل",
      fullDesc: "ہینگ سوکھی گوند ہے جس کی تیز خوشبو پکانے پر پیاز لہسن جیسی ہو جاتی ہے۔ دالوں میں تھوڑی مقدار میں استعمال ہوتی ہے۔ ہاضمہ بہتر کرتی ہے۔",
      keyFeatures: ["تیز خوشبو", "پیاز لہسن کا بدل", "ہاضمہ", "تھوڑی مقدار"],
      properUsage: "گرم تیل میں چھونک کے شروع میں ڈالیں",
      commonMistakes: ["زیادہ ڈالنا", "کچی استعمال"],
      types: [
        {
          name: "کمپاونڈ ہینگ",
          description: "آٹے میں ملی",
          bestFor: "روزمرہ کھانا"
        }
      ]
    },

    // 🌰 خوشبودار مصالحہ
    {
      id: 301,
      name: "چھوٹی الائچی",
      urduName: "چھوٹی الائچی",
      category: "aromatic",
      categoryDisplay: "خوشبودار مصالحہ",
      image: "choti-elaichi.png",
      tagline: "مصالحوں کی ملکہ، میٹھی اور خوشبودار",
      fullDesc: "چھوٹی الائچی سب سے خوشبودار مصالحوں میں سے ہے۔ سبز ڈوڈیوں میں کالے بیج ہوتے ہیں۔ چائے، مٹھائیوں، بریانی اور مصالحہ جات میں استعمال ہوتی ہے۔",
      keyFeatures: ["میٹھی خوشبو", "مہنگی", "ورسٹائل", "ہاضمہ"],
      properUsage: "ہلکا کچل کر استعمال کریں",
      commonMistakes: ["زیادہ ڈالنا", "نہ کچلنا"],
      types: [
        {
          name: "چھوٹی الائچی",
          description: "عام قسم",
          bestFor: "چائے، مٹھائیاں"
        }
      ]
    },
    {
      id: 302,
      name: "بڑی الائچی",
      urduName: "بڑی الائچی",
      category: "aromatic",
      categoryDisplay: "خوشبودار مصالحہ",
      image: "badi-elaichi.png",
      tagline: "دھوئیں جیسی خوشبو والی بڑی ڈوڈیاں",
      fullDesc: "بڑی الائچی بڑی، جھری دار کالی ڈوڈیوں والی ہوتی ہے۔ اس میں دھوئیں اور کافور جیسی خوشبو ہوتی ہے۔ بریانی اور گوشت کے پکوانوں میں استعمال ہوتی ہے۔",
      keyFeatures: ["دھوئیں جیسی خوشبو", "کافور", "بڑی ڈوڈیاں", "صرف لذیذ پکوان"],
      properUsage: "ہلکا کچل کر استعمال کریں",
      commonMistakes: ["مٹھائی میں استعمال", "نہ نکالنا"],
      types: [
        {
          name: "عام بڑی الائچی",
          description: "دھوئیں والی",
          bestFor: "بریانی، گوشت"
        }
      ]
    },
    {
      id: 303,
      name: "دار چینی",
      urduName: "دار چینی",
      category: "aromatic",
      categoryDisplay: "خوشبودار مصالحہ",
      image: "dalchini.png",
      tagline: "میٹھی چھال، گرم پکوانوں کے لیے",
      fullDesc: "دار چینی چھال کو لپیٹ کر بنائی جاتی ہے۔ اس کا ذائقہ میٹھا اور گرم ہوتا ہے۔ چاولوں، سالن اور چائے میں استعمال ہوتی ہے۔",
      keyFeatures: ["میٹھی گرمی", "دو اقسام", "سابُت یا پسا"],
      properUsage: "سابُت ڈالیں اور نکال لیں",
      commonMistakes: ["غلط قسم", "غلط ذخیرہ"],
      types: [
        {
          name: "سیلون دار چینی",
          description: "اصلی، پتلی",
          bestFor: "مٹھائیاں"
        },
        {
          name: "کیسیا",
          description: "موٹی، تیز",
          bestFor: "سالن"
        }
      ]
    },
    {
      id: 304,
      name: "لونگ",
      urduName: "لونگ",
      category: "aromatic",
      categoryDisplay: "خوشبودار مصالحہ",
      image: "laung.png",
      tagline: "تیز خوشبو والی کلیاں",
      fullDesc: "لونگ سوکھی پھول کی کلیاں ہیں جن میں تیز میٹھی خوشبو ہوتی ہے۔ بریانی، سالن اور چائے میں سابُت استعمال ہوتی ہے۔",
      keyFeatures: ["تیز خوشبو", "سن کرنے کا اثر", "میٹھا تیز", "تھوڑی مقدار"],
      properUsage: "2-3 عدد ڈالیں",
      commonMistakes: ["زیادہ ڈالنا", "نہ نکالنا"],
      types: [
        {
          name: "سابُت لونگ",
          description: "سوکھی کلیاں",
          bestFor: "چاول، سالن"
        }
      ]
    },
    {
      id: 308,
      name: "تیز پات",
      urduName: "تیز پات",
      category: "aromatic",
      categoryDisplay: "خوشبودار مصالحہ",
      image: "tez-pata.png",
      tagline: "چاول اور سالن کے لیے خوشبودار پتے",
      fullDesc: "تیز پات سوکھے پتے ہیں جن میں ہلکی جڑی بوٹیوں جیسی خوشبو ہوتی ہے۔ بریانی، پلاؤ، سالن اور سوپ میں استعمال ہوتے ہیں۔ کھانے سے پہلے نکال لیے جاتے ہیں۔",
      keyFeatures: ["ہلکی خوشبو", "بڑے پتے", "چاول کے لیے ضروری", "نکالنا ضروری"],
      properUsage: "1-2 پتے ڈالیں، بعد میں نکال لیں",
      commonMistakes: ["زیادہ ڈالنا", "پرانا استعمال"],
      types: [
        {
          name: "ہندوستانی تیز پات",
          description: "دار چینی جیسی خوشبو",
          bestFor: "ہندوستانی کھانے"
        }
      ]
    },
    {
      id: 309,
      name: "کسوری میتھی",
      urduName: "کسوری میتھی",
      category: "aromatic",
      categoryDisplay: "خوشبودار مصالحہ",
      image: "kasuri-methi.png",
      tagline: "سوکھے میتھی پتے، منفرد خوشبو",
      fullDesc: "کسوری میتھی سوکھے میتھی پتے ہیں۔ ان میں منفرد، ہلکی کڑوی، میپل جیسی خوشبو ہوتی ہے۔ سالن میں آخر میں ڈالے جاتے ہیں۔",
      keyFeatures: ["منفرد خوشبو", "سوکھے پتے", "آخر میں ڈالیں"],
      properUsage: "ہتھیلیوں میں کچل کر ڈالیں",
      commonMistakes: ["جلدی ڈالنا", "نہ کچلنا"],
      types: [
        {
          name: "کسوری میتھی",
          description: "سوکھے پتے",
          bestFor: "سالن"
        }
      ]
    },
    {
      id: 310,
      name: "کڑی پتہ",
      urduName: "کڑی پتہ",
      category: "aromatic",
      categoryDisplay: "خوشبودار مصالحہ",
      image: "kari-patta.png",
      tagline: "جنوبی ہند کے کھانوں کے لیے ضروری",
      fullDesc: "کڑی پتے تازہ یا سوکھے پتے ہیں جن میں کھٹاس والی خوشبو ہوتی ہے۔ دالوں، سامبار اور چٹنیوں کی چھونک میں ضروری ہیں۔ تازہ بہتر ہے۔",
      keyFeatures: ["کھٹاس", "جنوبی ہند", "چھونک میں", "تازہ بہتر"],
      properUsage: "گرم تیل میں کڑکڑانے تک پکائیں",
      commonMistakes: ["جلانا", "صرف سوکھے استعمال"],
      types: [
        {
          name: "تازہ کڑی پتے",
          description: "بہترین ذائقہ",
          bestFor: "ہر پکوان"
        }
      ]
    },

    // 💫 خشک پھول
    {
      id: 501,
      name: "زعفران / کیسر",
      urduName: "زعفران / کیسر",
      category: "flowers",
      categoryDisplay: "خشک پھول",
      image: "kesar.png",
      tagline: "دنیا کا مہنگا ترین مصالحہ",
      fullDesc: "زعفران زعفران کے پھول کا خشک ریشہ ہے۔ دنیا کا مہنگا ترین مصالحہ۔ بریانی، مٹھائیوں کو سنہری رنگ اور خوشبو دیتا ہے۔",
      keyFeatures: ["سنہری رنگ", "پھولوں جیسی خوشبو", "مہنگا ترین", "تھوڑا استعمال"],
      properUsage: "دودھ یا پانی میں بھگو کر استعمال کریں",
      commonMistakes: ["زیادہ ڈالنا", "جعلی خریدنا"],
      types: [
        {
          name: "کشمیری زعفران",
          description: "گہرا رنگ",
          bestFor: "بریانی، مٹھائیاں"
        }
      ]
    },
    {
      id: 502,
      name: "خشک گلاب کی پنکھڑیاں",
      urduName: "خشک گلاب کی پنکھڑیاں",
      category: "flowers",
      categoryDisplay: "خشک پھول",
      image: "gulab.png",
      tagline: "پھولوں کی پنکھڑیاں، سجاوٹ اور خوشبو",
      fullDesc: "خشک گلاب کی پنکھڑیاں مٹھائیوں اور کھانوں کو خوشبو اور رنگ دیتی ہیں۔ سجاوٹ اور مصالحہ جات میں استعمال ہوتی ہیں۔",
      keyFeatures: ["پھولوں کی خوشبو", "خوبصورت رنگ", "سجاوٹ"],
      properUsage: "مٹھائیوں پر چھڑکیں",
      commonMistakes: ["ناکھانے والے پھول استعمال"],
      types: [
        {
          name: "لال گلاب",
          description: "گہرا رنگ",
          bestFor: "سجاوٹ"
        }
      ]
    },

    // 🧂 خاص نمکیات
    {
      id: 601,
      name: "کالا نمک",
      urduName: "کالا نمک",
      category: "salts",
      categoryDisplay: "خاص نمکیات",
      image: "kala-namak.png",
      tagline: "گلابی مائل نمک، تیز خوشبو",
      fullDesc: "کالا نمک آتش فشانی چٹان کا نمک ہے جس کا رنگ گلابی مائل اور خوشبو تیز ہوتی ہے۔ چاٹ، چٹنیوں اور رائتے کے لیے ضروری ہے۔",
      keyFeatures: ["تیز خوشبو", "گلابی رنگ", "چاٹ کے لیے", "ہاضمہ"],
      properUsage: "آخر میں ڈالیں",
      commonMistakes: ["عام پکانے میں استعمال", "جلدی ڈالنا"],
      types: [
        {
          name: "کالا نمک",
          description: "پاکستانی کالا نمک",
          bestFor: "چاٹ، رائتہ"
        }
      ]
    },
    {
      id: 602,
      name: "گلابی نمک",
      urduName: "گلابی نمک",
      category: "salts",
      categoryDisplay: "خاص نمکیات",
      image: "pink-salt.png",
      tagline: "ہمالیائی گلابی نمک",
      fullDesc: "ہمالیائی گلابی نمک قدیم سمندری تہوں سے نکالا جاتا ہے۔ گلابی رنگ معدنیات سے آتا ہے۔ فنشنگ نمک کے طور پر استعمال ہوتا ہے۔",
      keyFeatures: ["گلابی رنگ", "معدنیات", "فنشنگ نمک"],
      properUsage: "فنشنگ نمک کے طور پر",
      commonMistakes: ["زیادہ استعمال", "بہت مہنگا"],
      types: [
        {
          name: "باریک گلابی نمک",
          description: "پسا ہوا",
          bestFor: "کھانا پکانا"
        },
        {
          name: "درا گلابی نمک",
          description: "کرسٹل",
          bestFor: "پیس کر استعمال"
        }
      ]
    },
    {
      id: 603,
      name: "سیندھا نمک",
      urduName: "سیندھا نمک",
      category: "salts",
      categoryDisplay: "خاص نمکیات",
      image: "sendha-namak.png",
      tagline: "روزے میں استعمال ہونے والا سفید نمک",
      fullDesc: "سیندھا نمک خالص سفید نمک ہے بغیر کسی اضافے کے۔ روزے میں استعمال ہوتا ہے۔ اچار میں بھی ڈالا جاتا ہے۔",
      keyFeatures: ["سفید رنگ", "بغیر اضافے", "روزے میں"],
      properUsage: "روزے میں استعمال کریں",
      commonMistakes: ["روزمرہ استعمال", "غلط فہمی"],
      types: [
        {
          name: "سیندھا نمک",
          description: "پاکستانی راک نمک",
          bestFor: "روزہ، اچار"
        }
      ]
    }
  ];

  // ========== گھریلو سٹور کا ڈیٹا ==========
  const staplesData = [
    // ===== چاول =====
    {
      id: 201,
      name: "باسمتی چاول",
      category: "rice",
      categoryDisplay: "چاول",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800",
      tagline: "لمبے دانے والے خوشبودار چاول",
      fullDesc: "باسمتی چاول لمبے دانے والے خوشبودار چاول ہیں جو اپنی مہک اور نازک ذائقے کے لیے مشہور ہیں۔ برصغیر میں اگائے جانے والے یہ چاول بریانی، پلاؤ اور خاص مواقع کے کھانوں کے لیے پسند کیے جاتے ہیں۔",
      storageTips: "ایئر ٹائٹ ڈبے میں ٹھنڈی، خشک جگہ رکھیں۔ سالوں تک رکھ سکتے ہیں۔",
      shelfLife: "2-3 سال",
      keyUses: ["بریانی", "پلاؤ", "تلے چاول", "سادہ چاول"],
      nutritionalInfo: "کاربوہائیڈریٹس سے بھرپور، پروٹین اور آئرن بھی ہوتا ہے",
      healthBenefits: ["فوری توانائی", "گلوٹین فری", "جلد ہضم"],
      cookingTips: "پکانے سے 30 منٹ پہلے بھگو دیں۔ 1:2 چاول پانی کا تناسب استعمال کریں۔",
      types: [
        {
          name: "لمبی باسمتی",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
          description: "پریمیم کوالٹی، لمبے دانے",
          bestFor: "بریانی، خاص مواقع",
          waterRatio: "1:2"
        },
        {
          name: "عام باسمتی",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
          description: "روزمرہ استعمال کے لیے",
          bestFor: "روزمرہ کھانے، پلاؤ",
          waterRatio: "1:2"
        }
      ]
    },
    {
      id: 202,
      name: "براؤن چاول",
      category: "rice",
      categoryDisplay: "چاول",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800",
      tagline: "چوکر سمیت صحت بخش چاول",
      fullDesc: "براؤن چاول وہ چاول ہیں جن کا صرف بیرونی چھلکا اتارا جاتا ہے، چوکر برقرار رہتی ہے۔ سفید چاولوں سے زیادہ غذائیت سے بھرپور، فائبر زیادہ اور ذائقہ اخروٹ جیسا ہوتا ہے۔",
      storageTips: "ایئر ٹائٹ ڈبے میں ٹھنڈی، خشک جگہ رکھیں۔ زیادہ دیر رکھنے کے لیے فریج میں رکھیں۔",
      shelfLife: "6 ماہ",
      keyUses: ["صحت بخش کھانے", "سلاد", "سائیڈ ڈش"],
      nutritionalInfo: "فائبر، میگنیشیم، بی وٹامنز سے بھرپور",
      healthBenefits: ["دل کی صحت", "شوگر کنٹرول", "وزن کنٹرول", "ہاضمہ"],
      cookingTips: "اچھی دھوئیں۔ 1:2.5 چاول پانی کا تناسب استعمال کریں۔",
      types: [
        {
          name: "چھوٹے دانے براؤن چاول",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "گول، نرم ساخت",
          bestFor: "چاول کے باؤل",
          waterRatio: "1:2.5"
        },
        {
          name: "لمبے دانے براؤن چاول",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "الگ الگ پھولے ہوئے دانے",
          bestFor: "پلاؤ، بریانی",
          waterRatio: "1:2.5"
        },
{
      id: 203,
      name: "سونہ مسوری چاول",
      category: "rice",
      categoryDisplay: "چاول",
      image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=800",
      tagline: "جنوبی ہند کے درمیانے دانے چاول",
      fullDesc: "سونہ مسوری درمیانے دانے والے چاول ہیں جو جنوبی ہند میں مقبول ہیں۔ ہلکے، خوشبودار اور جلد پک جاتے ہیں۔ روزمرہ کھانوں، لیموں چاول اور ناریل چاول کے لیے بہترین۔",
      storageTips: "ایئر ٹائٹ ڈبے میں ٹھنڈی، خشک جگہ رکھیں۔",
      shelfLife: "1-2 سال",
      keyUses: ["روزمرہ کھانے", "لیموں چاول", "ناریل چاول", "دہی چاول"],
      nutritionalInfo: "نشاستہ کم، جلدی ہضم",
      healthBenefits: ["پیٹ پر ہلکا", "جلد پکے", "روزمرہ استعمال"],
      cookingTips: "بھگونے کی ضرورت نہیں۔ 1:1.5 چاول پانی کا تناسب۔",
      types: [
        {
          name: "کچے سونہ مسوری",
          image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=300",
          description: "بغیر پالش",
          bestFor: "روزمرہ کھانا",
          waterRatio: "1:1.5"
        },
        {
          name: "اُبلے سونہ مسوری",
          image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=300",
          description: "جزوی طور پر اُبلے، غذائیت زیادہ",
          bestFor: "ادلی، ڈوسہ، پلاؤ",
          waterRatio: "1:2"
        }
      ]
    },

    // ===== آٹے کی اقسام =====
    {
      id: 301,
      name: "چکی کا آٹا",
      category: "wheatflours",
      categoryDisplay: "آٹے کی اقسام",
      image: "https://images.unsplash.com/photo-1605197581314-d2d0b3929a73?auto=format&fit=crop&w=800",
      tagline: "روزمرہ روٹیوں کے لیے",
      fullDesc: "چکی کا آٹا پورے گندم کو پیس کر بنایا جاتا ہے۔ گھریلو استعمال میں سب سے عام آٹا ہے۔ روٹی، پراٹھے، پوری کے لیے استعمال ہوتا ہے۔",
      storageTips: "ایئر ٹائٹ ڈبے میں ٹھنڈی جگہ رکھیں۔",
      shelfLife: "3-4 ماہ",
      keyUses: ["روٹی", "پراٹھا", "پوری", "تھیپلا"],
      nutritionalInfo: "فائبر، پروٹین، آئرن سے بھرپور",
      healthBenefits: ["ہاضمہ", "دل کی صحت", "شوگر کنٹرول"],
      cookingTips: "نرم روٹیوں کے لیے گرم پانی سے گوندھیں۔",
      types: [
        {
          name: "چکی کا آٹا",
          image: "https://images.unsplash.com/photo-1605197581314-d2d0b3929a73?auto=format&fit=crop&w=300",
          description: "روایتی طریقے سے پسا",
          bestFor: "روزمرہ روٹیاں",
          gluten: "ہاں",
          fiber: "زیادہ"
        }
      ]
    },
    {
      id: 302,
      name: "میدہ",
      category: "wheatflours",
      categoryDisplay: "آٹے کی اقسام",
      image: "https://images.unsplash.com/photo-1587057706176-2f6c52f30c9b?auto=format&fit=crop&w=800",
      tagline: "ریفائنڈ آٹا، بیکنگ کے لیے",
      fullDesc: "میدہ گندم سے چوکر نکال کر بنایا جاتا ہے۔ بیکنگ، کیک، کوکیز، نان اور بھٹورے کے لیے ضروری ہے۔",
      storageTips: "ایئر ٹائٹ ڈبے میں رکھیں۔",
      shelfLife: "6-8 ماہ",
      keyUses: ["بیکنگ", "نان", "بھٹورا", "سموسے", "کیک"],
      nutritionalInfo: "چکے آٹے سے کم فائبر",
      healthBenefits: ["فوری توانائی", "بیکنگ کے لیے"],
      cookingTips: "چھان کر استعمال کریں۔",
      types: [
        {
          name: "ان بلیچڈ میدہ",
          image: "https://images.unsplash.com/photo-1587057706176-2f6c52f30c9b?auto=format&fit=crop&w=300",
          description: "قدرتی، کیمیکل سے پاک",
          bestFor: "بیکنگ، روٹی",
          gluten: "ہاں",
          fiber: "کم"
        }
     ]
    },
    {
      id: 303,
      name: "سوجی (سوجی/راوا)",
      category: "wheatflours",
      categoryDisplay: "آٹے کی اقسام",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800",
      tagline: "درا آٹا، اپما اور حلوے کے لیے",
      fullDesc: "سوجی گندم کو درا پیس کر بنائی جاتی ہے۔ میٹھے اور نمکین دونوں پکوانوں میں استعمال ہوتی ہے - اپما، روا اِڈلی، سوجی حلوہ۔",
      storageTips: "ایئر ٹائٹ ڈبے میں رکھیں۔",
      shelfLife: "6-12 ماہ",
      keyUses: ["اپما", "روا اِڈلی", "سوجی حلوہ", "روا ڈوسہ"],
      nutritionalInfo: "پروٹین، فائبر اور بی وٹامنز",
      healthBenefits: ["جلد ہضم", "فوری توانائی"],
      cookingTips: "گھی میں بھون کر پانی ڈالیں۔",
      types: [
        {
          name: "باریک سوجی",
          image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300",
          description: "باریک پیسی، جلد پکے",
          bestFor: "حلوہ، اپما",
          gluten: "ہاں"
        }
    ]
        },
        {
          name: "درا سوجی",
          image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300",
          description: "درا پیسی",
          bestFor: "روا ڈوسہ",
          gluten: "ہاں"
        }
    ]
 },
    {
      id: 304,
      name: "بیسن (چنے کا آٹا)",
      category: "wheatflours",
      categoryDisplay: "آٹے کی اقسام",
      image: "https://images.unsplash.com/photo-1587734195503-904137cec4a6?auto=format&fit=crop&w=800",
      tagline: "چنے کا آٹا، پکوڑوں کے لیے",
      fullDesc: "بیسن چنے پیس کر بنایا جاتا ہے۔ پکوڑے، کڑھی، چیلہ اور مٹھائیوں میں استعمال ہوتا ہے۔ قدرتی طور پر گلوٹین فری ہے۔",
      storageTips: "ایئر ٹائٹ ڈبے میں رکھیں۔",
      shelfLife: "3-6 ماہ",
      keyUses: ["پکوڑے", "کڑھی", "چیلہ", "بیسن کے لڈو"],
      nutritionalInfo: "پروٹین، فائبر، آئرن سے بھرپور، گلوٹین فری",
      healthBenefits: ["ہائی پروٹین", "گلوٹین فری", "ذیابیطس کے لیے مفید"],
      cookingTips: "بھون کر استعمال کریں۔",
      types: [
        {
          name: "عام بیسن",
          image: "https://images.unsplash.com/photo-1587734195503-904137cec4a6?auto=format&fit=crop&w=300",
          description: "عام قسم",
          bestFor: "پکوڑے، کڑھی، مٹھائیاں",
          gluten: "نہیں",
          fiber: "زیادہ"
        }
      ]
    },

    // ===== دالیں =====
    {
      id: 601,
      name: "تور دال",
      category: "pulses",
      categoryDisplay: "دالیں",
      image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800",
      tagline: "پیلی دال، روزمرہ استعمال",
      fullDesc: "تور دال، جسے ارہر دال بھی کہتے ہیں، ہندوستان میں سب سے زیادہ استعمال ہونے والی دال ہے۔ اس کا ذائقہ ہلکا اور گری دار ہوتا ہے۔ سامبار اور روزمرہ دال کے لیے ضروری ہے۔",
      storageTips: "ایئر ٹائٹ ڈبے میں ٹھنڈی، خشک جگہ رکھیں۔",
      shelfLife: "1-2 سال",
      keyUses: ["سامبار", "سادہ دال", "دال فرائی", "دال تڑکا"],
      nutritionalInfo: "پروٹین (22%)، فائبر سے بھرپور",
      healthBenefits: ["دل کی صحت", "ہاضمہ", "توانائی"],
      cookingTips: "پریشر ککر میں 3-4 سیٹی لگائیں۔",
      types: [
        {
          name: "عام تور دال",
          image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
          description: "تیل لگی ہوئی",
          bestFor: "روزمرہ دال، سامبار",
          protein: "22%"
        },
        {
          name: "بغیر پالش تور دال",
          image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
          description: "قدرتی، بغیر تیل",
          bestFor: "صحت بخش کھانا",
          protein: "22%"
        }
     ]
    },
    {
      id: 602,
      name: "مونگ دال",
      category: "pulses",
      categoryDisplay: "دالیں",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800",
      tagline: "ہلکی، جلدی ہضم ہونے والی دال",
      fullDesc: "مونگ دال چھلکا اتاری ہوئی مونگ ہے۔ یہ سب سے ہلکی اور جلدی ہضم ہونے والی دال ہے۔ بیماروں اور بچوں کے لیے بہترین۔ کھچڑی، سوپ اور دال میں استعمال ہوتی ہے۔",
      storageTips: "ایئر ٹائٹ ڈبے میں نمی سے دور رکھیں۔",
      shelfLife: "1-2 سال",
      keyUses: ["کھچڑی", "مونگ دال سوپ", "دال فرائی", "چیلا"],
      nutritionalInfo: "پروٹین (24%)، فائبر، آئرن",
      healthBenefits: ["جلد ہضم", "وزن کم کرے", "ٹھنڈک"],
      cookingTips: "جلد پک جاتی ہے۔ بھگونے کی ضرورت نہیں۔",
      types: [
        {
          name: "پیلی مونگ دال",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "چھلکا اتارا ہوا",
          bestFor: "کھچڑی، دال، سوپ",
          protein: "24%"
        },
        {
          name: "سابُت مونگ",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "چھلکے سمیت",
          bestFor: "انکر، سالن",
          protein: "24%"
        }
      ]
    },
    {
      id: 603,
      name: "مسور دال",
      category: "pulses",
      categoryDisplay: "دالیں",
      image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
      tagline: "جلد پکنے والی گلابی دال",
      fullDesc: "مسور دال سرخ دال ہے جو بہت جلد پک جاتی ہے اور پکنے پر سنہری پیلی ہو جاتی ہے۔ ذائقہ ہلکا مٹیالا ہوتا ہے۔ سوپ اور جلدی دال کے لیے بہترین۔",
      storageTips: "ایئر ٹائٹ ڈبے میں نمی سے دور رکھیں۔",
      shelfLife: "1 سال",
      keyUses: ["مسور دال سالن", "دال سوپ", "سلاد", "دال مگنی"],
      nutritionalInfo: "پروٹین (26%)، فائبر، آئرن",
      healthBenefits: ["دل کی صحت", "انیمیا میں مفید", "فوری توانائی"],
      cookingTips: "بھگونے کی ضرورت نہیں۔ 15-20 منٹ میں پک جاتی ہے۔",
      types: [
        {
          name: "لال مسور دال",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "چھلکا اتارا ہوا",
          bestFor: "جلدی دال، سوپ",
          protein: "26%"
        }
      ]
    },
    {
      id: 604,
      name: "چنا دال",
      category: "pulses",
      categoryDisplay: "دالیں",
      image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=800",
      tagline: "چنے کی دال، گری دار ذائقہ",
      fullDesc: "چنا دال چنے توڑ کر بنائی جاتی ہے۔ اس کا ذائقہ گری دار ہوتا ہے اور پکانے پر شکل برقرار رکھتی ہے۔ سالن، ناشتے اور مٹھائیوں کے لیے بہترین۔",
      storageTips: "ایئر ٹائٹ ڈبے میں رکھیں۔",
      shelfLife: "1-2 سال",
      keyUses: ["چنا دال سالن", "وڑا", "چٹنی", "پایسم", "حلوہ"],
      nutritionalInfo: "پروٹین (20%)، فائبر، آئرن",
      healthBenefits: ["توانائی", "ذیابیطس میں مفید", "دل کی صحت"],
      cookingTips: "2-3 گھنٹے بھگو کر پکائیں۔",
      types: [
        {
          name: "عام چنا دال",
          image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=300",
          description: "سنہری پیلی",
          bestFor: "سالن، ناشتے",
          protein: "20%"
        }
      ]
    },
    {
      id: 605,
      name: "اُڑد دال",
      category: "pulses",
      categoryDisplay: "دالیں",
      image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800",
      tagline: "ملی جلی دال، خاص پکوانوں کے لیے",
      fullDesc: "اُڑد دال، یا کالا چنا، ایک گاڑھی، کریمی دال ہے جو شمالی ہند کے خاص پکوانوں میں استعمال ہوتی ہے۔ دال مگنی کی اہم جزو ہے۔",
      storageTips: "ایئر ٹائٹ ڈبے میں نمی سے دور رکھیں۔",
      shelfLife: "1-2 سال",
      keyUses: ["دال مگنی", "اِڈلی/ڈوسہ بیٹر", "وڑا", "پاپڑ"],
      nutritionalInfo: "پروٹین (25%)، فائبر، آئرن، کیلشیم",
      healthBenefits: ["ہڈیوں کی صحت", "توانائی", "جلد کی صحت"],
      cookingTips: "اِڈلی کے لیے رات بھر بھگو دیں۔",
      types: [
        {
          name: "سابُت اُڑد",
          image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
          description: "چھلکے سمیت کالا",
          bestFor: "دال مگنی، سالن",
          protein: "25%"
        },
        {
          name: "چھلکا اُتاری اُڑد",
          image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
          description: "سفید رنگ",
          bestFor: "اِڈلی/ڈوسہ بیٹر، وڑا",
          protein: "25%"
        }
      ]
    },
    {
      id: 606,
      name: "راجمہ",
      category: "pulses",
      categoryDisplay: "دالیں",
      image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800",
      tagline: "بڑی پھلیاں، راجمہ چاول کے لیے",
      fullDesc: "راجمہ بڑی پھلیاں ہیں، جو شمالی ہند کے پکوانوں میں پسند کی جاتی ہیں۔ 'راجمہ چاول' ایک مشہور ڈش ہے۔ یہ کریمی ہو جاتے ہیں اور مصالحہ جذب کرتے ہیں۔",
      storageTips: "ایئر ٹائٹ ڈبے میں نمی سے دور رکھیں۔",
      shelfLife: "1-2 سال",
      keyUses: ["راجمہ سالن", "راجمہ چاول", "سلاد"],
      nutritionalInfo: "پروٹین، فائبر، آئرن سے بھرپور",
      healthBenefits: ["دل کی صحت", "شوگر کنٹرول", "وزن کنٹرول"],
      cookingTips: "رات بھر بھگو کر پکائیں۔ کچا نہ کھائیں۔",
      types: [
        {
          name: "لال راجمہ",
          image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
          description: "عام لال قسم",
          bestFor: "راجمہ سالن",
          protein: "24%"
        }
      ]
    },
    // ===== خشک میوہ جات =====
    {
      id: 701,
      name: "بادام",
      category: "nuts",
      categoryDisplay: "خشک میوہ جات",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800",
      tagline: "دماغی غذا، وٹامن ای سے بھرپور",
      fullDesc: "بادام دنیا کے مقبول ترین خشک میووں میں سے ہے۔ صحت مند چکنائی، وٹامن ای اور میگنیشیم سے بھرپور۔ دل اور دماغ کی صحت کے لیے مفید۔",
      storageTips: "ایئر ٹائٹ ڈبے میں ٹھنڈی، اندھیری جگہ رکھیں۔",
      shelfLife: "6-12 ماہ",
      keyUses: ["ناشتہ", "بادام کا دودھ", "سجاوٹ", "بیکنگ"],
      nutritionalInfo: "صحت مند چکنائی، وٹامن ای، پروٹین",
      healthBenefits: ["دماغی صحت", "دل کی صحت", "شوگر کنٹرول"],
      cookingTips: "رات بھر بھگو کر کھائیں۔",
      types: [
        {
          name: "کچے بادام",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
          description: "چھلکے سمیت",
          bestFor: "ناشتہ، بھگونے",
          soaking: "8-10 گھنٹے",
          benefits: "وٹامن ای، میگنیشیم"
        },
        {
          name: "چھلکے اُتارے بادام",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
          description: "سفید رنگ",
          bestFor: "بادام کا دودھ، بیکنگ",
          soaking: "4-6 گھنٹے",
          benefits: "جلد ہضم"
        }
      ]
    },
    {
      id: 702,
      name: "کاجو",
      category: "nuts",
      categoryDisplay: "خشک میوہ جات",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800",
      tagline: "کریمی میوے، سالن اور ناشتے کے لیے",
      fullDesc: "کاجو گردے کی شکل کے میوے ہیں جن کا ذائقہ میٹھا اور مکھن جیسا ہوتا ہے۔ ہندوستانی کھانوں میں بہت استعمال ہوتے ہیں - کاجو سالن، کاجو کٹلی، اور ناشتے میں۔",
      storageTips: "ایئر ٹائٹ ڈبے میں نمی اور گرمی سے دور رکھیں۔",
      shelfLife: "6-9 ماہ",
      keyUses: ["کاجو سالن", "کاجو کٹلی", "ناشتہ", "سجاوٹ"],
      nutritionalInfo: "صحت مند چکنائی، کاپر، میگنیشیم",
      healthBenefits: ["دل کی صحت", "ہڈیوں کی صحت", "قوت مدافعت"],
      cookingTips: "سالن کے لیے 2-3 گھنٹے بھگو دیں۔",
      types: [
        {
          name: "سابُت کاجو",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "پریمیم",
          bestFor: "سجاوٹ، کاجو کٹلی",
          benefits: "کاپر سے بھرپور"
        }
      ]
    },
    {
      id: 705,
      name: "مونگ پھلی",
      category: "nuts",
      categoryDisplay: "خشک میوہ جات",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800",
      tagline: "سستے، پروٹین سے بھرپور",
      fullDesc: "مونگ پھلی دراصل پھلی ہے مگر خشک میوے کی طرح استعمال ہوتی ہے۔ سستی اور پروٹین سے بھرپور۔ چٹنی، سالن، ناشتے اور مونگ پھلی کے مکھن میں استعمال ہوتی ہے۔",
      storageTips: "ایئر ٹائٹ ڈبے میں نمی سے دور رکھیں۔",
      shelfLife: "6-9 ماہ",
      keyUses: ["مونگ پھلی چٹنی", "ناشتہ", "مونگ پھلی کا مکھن"],
      nutritionalInfo: "پروٹین، صحت مند چکنائی سے بھرپور",
      healthBenefits: ["دل کی صحت", "توانائی", "شوگر کنٹرول"],
      cookingTips: "بھون کر چھلکا اتار دیں۔",
      types: [
        {
          name: "کچی مونگ پھلی",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "چھلکے سمیت",
          bestFor: "پکانا، اُبالنا",
          benefits: "زیادہ پروٹین"
        },
        {
          name: "بھنی مونگ پھلی",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "نمکین یا سادہ",
          bestFor: "ناشتہ، چٹنی",
          benefits: "تیز ذائقہ"
        }
      ]
    },

    // ===== خشک پھل =====
    {
      id: 801,
      name: "کشمش",
      category: "dryfruits",
      categoryDisplay: "خشک پھل",
      image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
      tagline: "خشک انگور، قدرتی مٹھاس",
      fullDesc: "کشمش خشک انگور ہیں۔ قدرتی طور پر میٹھی اور پلاؤ، بریانی، مٹھائیوں اور ناشتے میں استعمال ہوتی ہیں۔ آئرن اور قدرتی شکر سے بھرپور۔",
      storageTips: "ایئر ٹائٹ ڈبے میں ٹھنڈی، خشک جگہ رکھیں۔",
      shelfLife: "6-12 ماہ",
      keyUses: ["پلاؤ", "بریانی", "مٹھائیاں", "بیکنگ", "ناشتہ"],
      nutritionalInfo: "قدرتی شکر، آئرن، پوٹاشیم",
      healthBenefits: ["آئرن کا ذریعہ", "ہاضمہ", "توانائی"],
      cookingTips: "بیکنگ سے پہلے گرم پانی میں بھگو دیں۔",
      types: [
        {
          name: "سنہری کشمش",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "سنہری رنگ",
          bestFor: "بیکنگ، مٹھائیاں",
          benefits: "ہلکا ذائقہ"
        },
        {
          name: "کالی کشمش",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "دھوپ میں سوکھی",
          bestFor: "آئرن کے لیے",
          benefits: "زیادہ آئرن"
        }
      ]
    },
    {
      id: 803,
      name: "کھجور",
      category: "dryfruits",
      categoryDisplay: "خشک پھل",
      image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
      tagline: "قدرتی مٹھاس، نرم اور میٹھا",
      fullDesc: "کھجور کھجور کے درخت کا پھل ہے۔ قدرتی مٹھاس سے بھرپور۔ مٹھائیوں، انرجی بالز اور ناشتے میں استعمال ہوتی ہے۔",
      storageTips: "ایئر ٹائٹ ڈبے میں رکھیں۔",
      shelfLife: "6-12 ماہ",
      keyUses: ["کھجور کا شربت", "انرجی بالز", "مٹھائیاں", "ناشتہ"],
      nutritionalInfo: "قدرتی شکر، فائبر، پوٹاشیم",
      healthBenefits: ["قدرتی توانائی", "ہاضمہ", "دل کی صحت"],
      cookingTips: "گٹھلی نکال دیں۔",
      types: [
        {
          name: "مجدول کھجور",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "بڑی، نرم",
          bestFor: "ناشتہ",
          benefits: "پریمیم"
        }
      ]
    },
    {
      id: 805,
      name: "انجیر",
      category: "dryfruits",
      categoryDisplay: "خشک پھل",
      image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
      tagline: "میٹھا، چیوئی پھل",
      fullDesc: "خشک انجیر میں فائبر، کیلشیم اور اینٹی آکسیڈنٹس بھرپور مقدار میں پائے جاتے ہیں۔ ناشتے میں کھائے جاتے ہیں یا مٹھائیوں میں استعمال ہوتے ہیں۔",
      storageTips: "ایئر ٹائٹ ڈبے میں رکھیں۔",
      shelfLife: "6-12 ماہ",
      keyUses: ["ناشتہ", "انجیر کی برفی", "مٹھائیاں"],
      nutritionalInfo: "فائبر، کیلشیم، پوٹاشیم",
      healthBenefits: ["ہاضمہ", "ہڈیوں کی صحت"],
      cookingTips: "رات بھر بھگو کر کھائیں۔",
      types: [
        {
          name: "ترکی انجیر",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "بڑی، نرم، میٹھی",
          bestFor: "ناشتہ، مٹھائیاں",
          benefits: "کیلشیم سے بھرپور"
        }
      ]
    },

    // ===== بیج =====
    {
      id: 901,
      name: "تربوز کے بیج",
      category: "seeds",
      categoryDisplay: "بیج",
      image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
      tagline: "چھوٹے بیج، بڑی غذائیت",
      fullDesc: "تربوز کے بیج چھوٹے مگر غذائیت سے بھرپور ہوتے ہیں۔ پروٹین، صحت مند چکنائی اور معدنیات سے بھرپور۔ بھون کر ناشتے میں کھائے جاتے ہیں۔",
      storageTips: "ایئر ٹائٹ ڈبے میں ٹھنڈی، خشک جگہ رکھیں۔",
      shelfLife: "1 سال",
      keyUses: ["ناشتہ", "چٹنی پاؤڈر", "اسموتھیز"],
      nutritionalInfo: "پروٹین، میگنیشیم، آئرن",
      healthBenefits: ["دل کی صحت", "توانائی", "جلد کی صحت"],
      cookingTips: "بھون کر ناشتہ کریں۔",
      types: [
        {
          name: "کچے تربوز کے بیج",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "انکرن کے لیے",
          bestFor: "انکر، پیسنے",
          benefits: "زیادہ غذائیت"
        }
      ]
    },
    {
      id: 902,
      name: "کدو کے بیج",
      category: "seeds",
      categoryDisplay: "بیج",
      image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
      tagline: "چپٹے سبز بیج، زنک سے بھرپور",
      fullDesc: "کدو کے بیج چپٹے، گہرے سبز بیج ہیں۔ زنک کے بہترین ذرائع میں سے ہیں۔ پروسٹیٹ صحت کے لیے بہترین۔ بھون کر ناشتہ یا سلاد پر چھڑکتے ہیں۔",
      storageTips: "ایئر ٹائٹ ڈبے میں رکھیں۔",
      shelfLife: "6-12 ماہ",
      keyUses: ["ناشتہ", "سلاد", "بیکنگ"],
      nutritionalInfo: "زنک، میگنیشیم، آئرن",
      healthBenefits: ["پروسٹیٹ صحت", "قوت مدافعت", "نیند"],
      cookingTips: "نمک لگا کر بھون لیں۔",
      types: [
        {
          name: "کچے کدو کے بیج",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "چھلکے سمیت",
          bestFor: "بھوننے، انکر",
          benefits: "زیادہ زنک"
        }
      ]
    },
    {
      id: 903,
      name: "سورج مکھی کے بیج",
      category: "seeds",
      categoryDisplay: "بیج",
      image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
      tagline: "چھوٹے بیج، سورج مکھی کے پھول سے",
      fullDesc: "سورج مکھی کے بیج سورج مکھی کے پھول کے مرکز سے آتے ہیں۔ ہلکا گری دار ذائقہ۔ وٹامن ای اور سیلینیم سے بھرپور۔",
      storageTips: "ایئر ٹائٹ ڈبے میں رکھیں۔",
      shelfLife: "6-12 ماہ",
      keyUses: ["ناشتہ", "سلاد", "بیکنگ"],
      nutritionalInfo: "وٹامن ای، سیلینیم",
      healthBenefits: ["جلد کی صحت", "تھائی رائیڈ"],
      cookingTips: "بھون کر ذائقہ بڑھائیں۔",
      types: [
        {
          name: "چھلکے سمیت",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "چھلکے سمیت",
          bestFor: "ناشتہ",
          benefits: "مزیدار"
        }
      ]
    },
    {
      id: 906,
      name: "تل",
      category: "seeds",
      categoryDisplay: "بیج",
      image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
      tagline: "چھوٹے بیج، کیلشیم سے بھرپور",
      fullDesc: "تل چھوٹے، چپٹے بیج ہیں جو بھوننے پر گری دار ذائقہ دیتے ہیں۔ چھونک، تل کے لڈو، نان پر چھڑکنے اور چٹنی میں استعمال ہوتے ہیں۔",
      storageTips: "ایئر ٹائٹ ڈبے میں رکھیں۔",
      shelfLife: "6-12 ماہ",
      keyUses: ["چھونک", "تل کے لڈو", "سجاوٹ"],
      nutritionalInfo: "کیلشیم، صحت مند چکنائی",
      healthBenefits: ["ہڈیوں کی صحت", "دل کی صحت"],
      cookingTips: "سنہری بھون لیں۔",
      types: [
        {
          name: "سفید تل",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "چھلکا اتارا ہوا",
          bestFor: "چھونک، مٹھائیاں",
          benefits: "کیلشیم زیادہ"
        }
      ]
    }
  ];

  // ========== روزمرہ سبزیاں ==========
  const dailyVegetablesData = [
    {
      id: 1001,
      name: "آلو",
      category: "root",
      categoryDisplay: "جڑ والی سبزیاں",
      image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800",
      tagline: "ہر گھر میں استعمال ہونے والی سبزی",
      fullDesc: "آلو دنیا بھر میں سب سے زیادہ کھائی جانے والی سبزی ہے۔ اسے اُبالا، تل سکتے ہیں، بھون سکتے ہیں۔ کاربوہائیڈریٹس، پوٹاشیم اور وٹامن سی سے بھرپور۔",
      storageTips: "ٹھنڈی، اندھیری، ہوا دار جگہ رکھیں۔ پیاز سے دور رکھیں۔",
      shelfLife: "3-5 ہفتے",
      season: "سارا سال",
      keyUses: ["سالن", "ناشتے", "میشڈ", "بھنا", "فرائز"],
      nutritionalInfo: "کاربوہائیڈریٹس، پوٹاشیم، وٹامن سی",
      healthBenefits: ["توانائی کا ذریعہ", "دل کی صحت"],
      cookingTips: "کمرے کے درجہ حرارت پر رکھیں۔",
      types: [
        {
          name: "رسٹ آلو",
          image: "https://images.unsplash.com/photo-1605197581314-d2d0b3929a73?auto=format&fit=crop&w=300",
          description: "نشاستے دار",
          bestFor: "میشڈ، بیکنگ، فرائز"
        },
        {
          name: "لال آلو",
          image: "https://images.unsplash.com/photo-1587057706176-2f6c52f30c9b?auto=format&fit=crop&w=300",
          description: "مومی، شکل برقرار رکھے",
          bestFor: "سلاد، بھوننا، سالن"
        }
      ]
    },
    {
      id: 1002,
      name: "گاجر",
      category: "root",
      categoryDisplay: "جڑ والی سبزیاں",
      image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
      tagline: "میٹھی جڑ والی سبزی، وٹامن اے سے بھرپور",
      fullDesc: "گاجر میٹھی، کرنچی سبزی ہے جو بیٹا کیروٹین سے بھرپور ہے۔ سلاد میں کچی، سالن میں پکی، یا جوس میں استعمال ہوتی ہے۔",
      storageTips: "پتے الگ کر کے فریج میں پلاسٹک بیگ میں رکھیں۔",
      shelfLife: "3-4 ہفتے",
      season: "سردیوں میں",
      keyUses: ["سلاد", "سالن", "جوس", "گاجر کا حلوہ"],
      nutritionalInfo: "وٹامن اے، فائبر سے بھرپور",
      healthBenefits: ["آنکھوں کی صحت", "قوت مدافعت"],
      cookingTips: "چھیلنا اختیاری ہے۔",
      types: [
        {
          name: "نارنجی گاجر",
          image: "https://images.unsplash.com/photo-1587734195503-904137cec4a6?auto=format&fit=crop&w=300",
          description: "عام قسم",
          bestFor: "ہر استعمال"
        },
        {
          name: "لال گاجر",
          image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300",
          description: "گہری لال، میٹھی",
          bestFor: "گاجر کا حلوہ، جوس"
        }
      ]
    },
    {
      id: 1101,
      name: "پیاز (لال)",
      category: "onion",
      categoryDisplay: "پیاز خاندان",
      image: "https://images.unsplash.com/photo-1587057706176-2f6c52f30c9b?auto=format&fit=crop&w=800",
      tagline: "ہندوستانی کھانوں کی بنیاد",
      fullDesc: "لال پیاز ہندوستانی کھانوں میں سب سے عام ہے۔ اس کا ذائقہ تیز ہوتا ہے جو پکانے پر میٹھا ہو جاتا ہے۔ سالن کی بنیاد، سلاد اور سجاوٹ میں استعمال ہوتا ہے۔",
      storageTips: "ٹھنڈی، خشک، ہوا دار جگہ رکھیں۔",
      shelfLife: "2-3 ماہ",
      season: "سارا سال",
      keyUses: ["سالن کی بنیاد", "سلاد", "سجاوٹ", "اچار"],
      nutritionalInfo: "کوئرسیٹن، وٹامن سی",
      healthBenefits: ["دل کی صحت", "اینٹی آکسیڈنٹ"],
      cookingTips: "ٹھنڈا کر کے کاٹیں۔",
      types: [
        {
          name: "لال پیاز",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
          description: "تیز ذائقہ",
          bestFor: "کچا سلاد، سالن"
        }
      ]
    },
    {
      id: 1102,
      name: "لہسن",
      category: "onion",
      categoryDisplay: "پیاز خاندان",
      image: "https://images.unsplash.com/photo-1587734195503-904137cec4a6?auto=format&fit=crop&w=800",
      tagline: "تیز جوے، ذائقہ کی بنیاد",
      fullDesc: "لہسن ہر کھانے میں استعمال ہوتا ہے۔ اس کا تیز ذائقہ پکانے پر ہلکا ہو جاتا ہے۔ سالن کی بنیاد، مرینیشن اور صحت کے لیے مفید۔",
      storageTips: "ٹھنڈی، خشک، ہوا دار جگہ رکھیں۔",
      shelfLife: "3-5 ماہ",
      season: "سارا سال",
      keyUses: ["سالن کی بنیاد", "ادرک لہسن پیسٹ", "چھونک"],
      nutritionalInfo: "ایلیسن، مینگنیز، وٹامن بی٦",
      healthBenefits: ["قوت مدافعت", "دل کی صحت"],
      cookingTips: "کچل کر استعمال کریں۔",
      types: [
        {
          name: "عام لہسن",
          image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=300",
          description: "سفید جویاں",
          bestFor: "روزمرہ کھانا"
        }
      ]
    },
    {
      id: 1201,
      name: "پالک",
      category: "leafy",
      categoryDisplay: "پتوں والی سبزیاں",
      image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
      tagline: "آئرن سے بھرپور پتوں والی سبزی",
      fullDesc: "پالک ایک غذائیت سے بھرپور سبزی ہے۔ پالک پنیر، سوپ، سلاد اور پراٹھوں میں استعمال ہوتی ہے۔ آئرن، کیلشیم اور وٹامنز سے بھرپور۔",
      storageTips: "فریج میں پلاسٹک بیگ میں رکھیں۔",
      shelfLife: "3-5 دن",
      season: "سردیوں میں",
      keyUses: ["پالک پنیر", "سلاد", "سوپ", "پراٹھے"],
      nutritionalInfo: "آئرن، کیلشیم، وٹامن کے",
      healthBenefits: ["خون کی صحت", "ہڈیوں کی صحت"],
      cookingTips: "اچھی دھو کر استعمال کریں۔",
      types: [
        {
          name: "بیبی پالک",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "نرم پتے",
          bestFor: "سلاد، جلدی پکانا"
        }
      ]
    },
    {
      id: 1202,
      name: "میتھی",
      category: "leafy",
      categoryDisplay: "پتوں والی سبزیاں",
      image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
      tagline: "ہلکی کڑوی، خوشبودار سبزی",
      fullDesc: "تازہ میتھی میں ہلکا کڑوا ذائقہ اور منفرد خوشبو ہوتی ہے۔ میتھی پراٹھہ، میتھی ملی ملائی اور میتھی تھیپلا میں استعمال ہوتی ہے۔",
      storageTips: "فریج میں رکھیں۔ جلدی استعمال کریں۔",
      shelfLife: "2-3 دن",
      season: "سردیوں میں",
      keyUses: ["میتھی پراٹھہ", "میتھی ملی ملائی", "تھیپلا"],
      nutritionalInfo: "آئرن، کیلشیم، فائبر",
      healthBenefits: ["شوگر کنٹرول", "ہاضمہ"],
      cookingTips: "موٹے ڈنٹھل نکال دیں۔",
      types: [
        {
          name: "تازہ میتھی",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "تازہ پتے",
          bestFor: "پراٹھے، سالن"
        }
      ]
    },
    {
      id: 1301,
      name: "پھول گوبھی",
      category: "cruciferous",
      categoryDisplay: "پھول گوبھی",
      image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=800",
      tagline: "سفید پھول، ورسٹائل سبزی",
      fullDesc: "پھول گوبھی ایک بہت ورسٹائل سبزی ہے۔ آلو گوبھی، گوبھی منچورین، بھونا اور گوبھی چاول میں استعمال ہوتی ہے۔",
      storageTips: "فریج میں رکھیں۔",
      shelfLife: "1-2 ہفتے",
      season: "سردیوں میں",
      keyUses: ["آلو گوبھی", "گوبھی منچورین", "بھونا"],
      nutritionalInfo: "وٹامن سی، وٹامن کے، فائبر",
      healthBenefits: ["اینٹی کینسر", "دل کی صحت"],
      cookingTips: "ایک جیسے ٹکڑے کاٹیں۔",
      types: [
        {
          name: "سفید گوبھی",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
          description: "عام سفید قسم",
          bestFor: "سالن، بھوننا"
        }
      ]
    },
    {
      id: 1401,
      name: "کدو (پیٹھا)",
      category: "gourd",
      categoryDisplay: "لوکی خاندان",
      image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
      tagline: "میٹھا، نارنجی لوکی",
      fullDesc: "کدو میٹھی لوکی ہے۔ کدو کا سالن، حلوہ اور کھیر میں استعمال ہوتا ہے۔ بیٹا کیروٹین سے بھرپور۔",
      storageTips: "ٹھنڈی جگہ رکھیں۔ کاٹنے کے بعد فریج میں رکھیں۔",
      shelfLife: "1-3 ماہ",
      season: "سردیوں میں",
      keyUses: ["کدو کا سالن", "حلوہ", "سوپ", "کھیر"],
      nutritionalInfo: "وٹامن اے، فائبر سے بھرپور",
      healthBenefits: ["آنکھوں کی صحت", "قوت مدافعت"],
      cookingTips: "چھیل کر کاٹ لیں۔",
      types: [
        {
          name: "لال کدو",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "لال چھلکا",
          bestFor: "سالن"
        }
      ]
    },
    {
      id: 1402,
      name: "لوکی",
      category: "gourd",
      categoryDisplay: "لوکی خاندان",
      image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
      tagline: "ہلکی، پانی والی گرمائی سبزی",
      fullDesc: "لوکی لمبی، ہلکی سبز سبزی ہے جس میں پانی کی مقدار زیادہ ہوتی ہے۔ ہلکی، جلدی ہضم۔ سالن، رائتہ، حلوہ اور کوفتہ میں استعمال ہوتی ہے۔",
      storageTips: "ٹھنڈی جگہ رکھیں۔",
      shelfLife: "1-2 ہفتے",
      season: "گرمیوں میں",
      keyUses: ["لوکی کا سالن", "کوفتہ", "رائتہ", "حلوہ"],
      nutritionalInfo: "پانی، فائبر سے بھرپور",
      healthBenefits: ["ہائیڈریشن", "وزن کم کرے", "ٹھنڈک"],
      cookingTips: "چھیل کر استعمال کریں۔",
      types: [
        {
          name: "لوکی",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "لمبی، ہلکی سبز",
          bestFor: "سالن، کوفتہ"
        }
      ]
    },
    {
      id: 1403,
      name: "کریلا",
      category: "gourd",
      categoryDisplay: "لوکی خاندان",
      image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
      tagline: "کڑوا، مگر صحت بخش",
      fullDesc: "کریلا اپنے نام کے مطابق کڑوا ہوتا ہے۔ یہ شوگر کنٹرول کرنے کی خصوصیات کے لیے مشہور ہے۔ مسالے بھر کر تلے جاتے ہیں یا سالن میں ڈالے جاتے ہیں۔",
      storageTips: "فریج میں پلاسٹک بیگ میں رکھیں۔",
      shelfLife: "1 ہفتہ",
      season: "گرمیوں میں",
      keyUses: ["بھرے کریلے", "کریلے کا سالن", "چپس", "جوس"],
      nutritionalInfo: "وٹامن سی، آئرن، میگنیشیم",
      healthBenefits: ["شوگر کنٹرول", "جگر کی صحت"],
      cookingTips: "نمک لگا کر کڑواہٹ کم کریں۔",
      types: [
        {
          name: "ہندوستانی کریلا",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "چھوٹا، کانٹے دار",
          bestFor: "بھرے، سالن"
        }
      ]
    },
    {
      id: 1501,
      name: "ٹماٹر",
      category: "fruitveg",
      categoryDisplay: "پھل دار سبزیاں",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800",
      tagline: "کھٹاس والا بیس، سالن کے لیے",
      fullDesc: "ٹماٹر بے شمار سالنوں کی بنیاد ہیں، جو کھٹاس، رنگ اور گاڑھا پن دیتے ہیں۔ لائکوپین سے بھرپور جو پکانے پر بہتر جذب ہوتا ہے۔",
      storageTips: "پکنے تک کمرے میں، پھر فریج میں رکھیں۔",
      shelfLife: "1-2 ہفتے",
      season: "سارا سال",
      keyUses: ["سالن کی بنیاد", "سلاد", "چٹنیاں", "سوپ"],
      nutritionalInfo: "لائکوپین، وٹامن سی",
      healthBenefits: ["دل کی صحت", "کینسر سے بچاؤ"],
      cookingTips: "جلدی پکانے کے لیے ڈالیں۔",
      types: [
        {
          name: "روما ٹماٹر",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "بیج کم",
          bestFor: "چٹنیاں، پیسٹ"
        },
        {
          name: "چیری ٹماٹر",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "چھوٹے، میٹھے",
          bestFor: "سلاد، سجاوٹ"
        }
      ]
    },
    {
      id: 1502,
      name: "بینگن",
      category: "fruitveg",
      categoryDisplay: "پھل دار سبزیاں",
      image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
      tagline: "جامنی سبزی، ذائقہ جذب کرے",
      fullDesc: "بینگن ایک ورسٹائل سبزی ہے جس کی ساخت گودے جیسی ہوتی ہے۔ بینگن کا بھرتہ، بھرے بینگن، سالن اور پکوڑوں میں استعمال ہوتا ہے۔",
      storageTips: "ٹھنڈی جگہ رکھیں، جلدی استعمال کریں۔",
      shelfLife: "3-5 دن",
      season: "سارا سال",
      keyUses: ["بینگن کا بھرتہ", "بھرے بینگن", "سالن", "پکوڑے"],
      nutritionalInfo: "فائبر، اینٹی آکسیڈنٹس",
      healthBenefits: ["دل کی صحت", "دماغی صحت"],
      cookingTips: "نمک لگا کر کڑواہٹ نکالیں۔",
      types: [
        {
          name: "جامنی بینگن",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "عام جامنی قسم",
          bestFor: "سالن، بھرتہ"
        }
      ]
    },
    {
      id: 1601,
      name: "ہرے مٹر",
      category: "legumes",
      categoryDisplay: "تازہ پھلیاں",
      image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
      tagline: "میٹھے، نرم موسم بہار کے مٹر",
      fullDesc: "تازہ ہرے مٹر میٹھے، نرم اور سردیوں کے پسندیدہ ہیں۔ مٹر پنیر، آلو مٹر، مٹر پلاؤ میں استعمال ہوتے ہیں۔",
      storageTips: "پھلی سمیت فریج میں رکھیں۔",
      shelfLife: "3-5 دن",
      season: "سردیوں میں",
      keyUses: ["مٹر پنیر", "آلو مٹر", "پلاؤ", "سموسہ بھرائی"],
      nutritionalInfo: "پروٹین، فائبر، وٹامن اے",
      healthBenefits: ["ہاضمہ", "دل کی صحت"],
      cookingTips: "آخر میں ڈالیں تاکہ رنگ برقرار رہے۔",
      types: [
        {
          name: "تازہ مٹر",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "پھلی میں",
          bestFor: "ہر پکوان"
        }
      ]
    }
  ];

  // Helper function to get current data based on selected category
  const getCurrentData = () => {
    switch (selectedCategory) {
      case 'basics': return kitchenBasicsData;
      case 'spices': return getFilteredSpices();
      case 'staples': return getFilteredStaples();
      case 'vegetables': return getFilteredVegetables();
      default: return kitchenBasicsData;
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

  // Helper function for card classes
  const getCardClass = (itemName, category) => {
    const name = itemName.toLowerCase();
    
    if (category === 'basics') {
      if (name.includes('چاول') || name.includes('rice')) return 'basics-rice';
      if (name.includes('آٹا') || name.includes('flour')) return 'basics-flour';
      if (name.includes('تیل') || name.includes('oil')) return 'basics-oil';
      if (name.includes('نمک') || name.includes('salt')) return 'basics-salt';
      if (name.includes('چینی') || name.includes('sugar')) return 'basics-sugar';
      if (name.includes('چائے') || name.includes('tea')) return 'basics-beverage';
      if (name.includes('دودھ') || name.includes('milk')) return 'basics-dairy';
    }
    return '';
  };

  return (
    <div className="pbp-container urdu-pantry">
      <div className="pbp-layout">
        {/* سائیڈبار */}
        <aside className="pbp-sidebar">
          <div className="pbp-sidebar-header">
            <h2 className="pbp-sidebar-title">باورچی خانے کی بنیادی اشیاء</h2>
            <p className="pbp-sidebar-subtitle">روزمرہ استعمال ہونے والی اشیاء</p>
          </div>

          <div className="pbp-sidebar-categories">
            <ul className="pbp-categories-list">
              <li 
                className={`pbp-category-item ${selectedCategory === 'basics' ? 'pbp-active' : ''}`}
                onClick={() => setSelectedCategory('basics')}
              >
                <span className="pbp-category-name">بنیادی اشیاء</span>
              </li>
              <li 
                className={`pbp-category-item ${selectedCategory === 'spices' ? 'pbp-active' : ''}`}
                onClick={() => setSelectedCategory('spices')}
              >
                <span className="pbp-category-name">مصالحہ جات</span>
              </li>
              <li 
                className={`pbp-category-item ${selectedCategory === 'staples' ? 'pbp-active' : ''}`}
                onClick={() => setSelectedCategory('staples')}
              >
                <span className="pbp-category-name">گھریلو سٹور</span>
              </li>
              <li 
                className={`pbp-category-item ${selectedCategory === 'vegetables' ? 'pbp-active' : ''}`}
                onClick={() => setSelectedCategory('vegetables')}
              >
                <span className="pbp-category-name">روزمرہ سبزیاں</span>
              </li>
            </ul>
          </div>
        </aside>

        {/* مرکزی حصہ */}
        <main className="pbp-main">
          <header className="pbp-main-header">
            <div className="pbp-header-content">
              <h1 className="pbp-page-title">
                {selectedCategory === 'basics' && 'بنیادی اشیاء'}
                {selectedCategory === 'spices' && 'مصالحہ جات'}
                {selectedCategory === 'staples' && 'گھریلو سٹور'}
                {selectedCategory === 'vegetables' && 'روزمرہ سبزیاں'}
              </h1>
              <p className="pbp-page-description">
                {selectedCategory === 'basics' && 'ہر باورچی خانے کے لیے ضروری بنیادی اشیاء'}
                {selectedCategory === 'spices' && 'خوشبودار مصالحے جو کھانے کا ذائقہ بڑھاتے ہیں'}
                {selectedCategory === 'staples' && 'دیرپا گھریلو اشیاء'}
                {selectedCategory === 'vegetables' && 'روزمرہ کھانا پکانے کے لیے تازہ سبزیاں'}
              </p>
            </div>
          </header>

          {/* فلٹر بٹن */}
          <div className="pbp-items-grid-section">
            {/* مصالحہ جات کے فلٹر بٹن */}
            {selectedCategory === 'spices' && (
              <div className="spice-filter-buttons">
                <button 
                  className={`spice-filter-btn ${spiceCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setSpiceCategory('all')}
                >
                  تمام مصالحے
                </button>
                <button 
                  className={`spice-filter-btn ${spiceCategory === 'whole' ? 'active' : ''}`}
                  onClick={() => setSpiceCategory('whole')}
                >
                  سابُت مصالحہ
                </button>
                <button 
                  className={`spice-filter-btn ${spiceCategory === 'ground' ? 'active' : ''}`}
                  onClick={() => setSpiceCategory('ground')}
                >
                  پسا مصالحہ
                </button>
                <button 
                  className={`spice-filter-btn ${spiceCategory === 'aromatic' ? 'active' : ''}`}
                  onClick={() => setSpiceCategory('aromatic')}
                >
                  خوشبودار مصالحہ
                </button>
                <button 
                  className={`spice-filter-btn ${spiceCategory === 'temper' ? 'active' : ''}`}
                  onClick={() => setSpiceCategory('temper')}
                >
                  چھونک کے مصالحے
                </button>
                <button 
                  className={`spice-filter-btn ${spiceCategory === 'flowers' ? 'active' : ''}`}
                  onClick={() => setSpiceCategory('flowers')}
                >
                  خشک پھول
                </button>
                <button 
                  className={`spice-filter-btn ${spiceCategory === 'salts' ? 'active' : ''}`}
                  onClick={() => setSpiceCategory('salts')}
                >
                  خاص نمکیات
                </button>
              </div>
            )}

            {/* گھریلو سٹور کے فلٹر بٹن */}
            {selectedCategory === 'staples' && (
              <div className="staples-filter-buttons">
                <button 
                  className={`staples-filter-btn ${staplesCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setStaplesCategory('all')}
                >
                  تمام اشیاء
                </button>
                <button 
                  className={`staples-filter-btn ${staplesCategory === 'rice' ? 'active' : ''}`}
                  onClick={() => setStaplesCategory('rice')}
                >
                  چاول
                </button>
                <button 
                  className={`staples-filter-btn ${staplesCategory === 'wheatflours' ? 'active' : ''}`}
                  onClick={() => setStaplesCategory('wheatflours')}
                >
                  آٹے کی اقسام
                </button>
                <button 
                  className={`staples-filter-btn ${staplesCategory === 'pulses' ? 'active' : ''}`}
                  onClick={() => setStaplesCategory('pulses')}
                >
                  دالیں
                </button>
                <button 
                  className={`staples-filter-btn ${staplesCategory === 'nuts' ? 'active' : ''}`}
                  onClick={() => setStaplesCategory('nuts')}
                >
                  خشک میوہ جات
                </button>
                <button 
                  className={`staples-filter-btn ${staplesCategory === 'dryfruits' ? 'active' : ''}`}
                  onClick={() => setStaplesCategory('dryfruits')}
                >
                  خشک پھل
                </button>
                <button 
                  className={`staples-filter-btn ${staplesCategory === 'seeds' ? 'active' : ''}`}
                  onClick={() => setStaplesCategory('seeds')}
                >
                  بیج
                </button>
              </div>
            )}

            {/* سبزیوں کے فلٹر بٹن */}
            {selectedCategory === 'vegetables' && (
              <div className="vegetables-filter-buttons">
                <button 
                  className={`vegetables-filter-btn ${vegetablesCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setVegetablesCategory('all')}
                >
                  تمام سبزیاں
                </button>
                <button 
                  className={`vegetables-filter-btn ${vegetablesCategory === 'root' ? 'active' : ''}`}
                  onClick={() => setVegetablesCategory('root')}
                >
                  جڑ والی سبزیاں
                </button>
                <button 
                  className={`vegetables-filter-btn ${vegetablesCategory === 'onion' ? 'active' : ''}`}
                  onClick={() => setVegetablesCategory('onion')}
                >
                  پیاز خاندان
                </button>
                <button 
                  className={`vegetables-filter-btn ${vegetablesCategory === 'leafy' ? 'active' : ''}`}
                  onClick={() => setVegetablesCategory('leafy')}
                >
                  پتوں والی سبزیاں
                </button>
                <button 
                  className={`vegetables-filter-btn ${vegetablesCategory === 'cruciferous' ? 'active' : ''}`}
                  onClick={() => setVegetablesCategory('cruciferous')}
                >
                  پھول گوبھی خاندان
                </button>
                <button 
                  className={`vegetables-filter-btn ${vegetablesCategory === 'gourd' ? 'active' : ''}`}
                  onClick={() => setVegetablesCategory('gourd')}
                >
                  لوکی خاندان
                </button>
                <button 
                  className={`vegetables-filter-btn ${vegetablesCategory === 'fruitveg' ? 'active' : ''}`}
                  onClick={() => setVegetablesCategory('fruitveg')}
                >
                  پھل دار سبزیاں
                </button>
                <button 
                  className={`vegetables-filter-btn ${vegetablesCategory === 'legumes' ? 'active' : ''}`}
                  onClick={() => setVegetablesCategory('legumes')}
                >
                  تازہ پھلیاں
                </button>
              </div>
            )}

            {/* اشیاء کا گرڈ */}
            <div className="pbp-items-grid">
              {getCurrentData().map(item => (
                <div 
                  key={item.id} 
                  className={`pbp-item-card ${getCardClass(item.name, selectedCategory)}`}
                  onClick={() => handleItemSelect(item)}
                >
                  <div 
                    className="pbp-card-image"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                  
                  <div className="pbp-card-content">
                    <div className="pbp-card-header">
                      <h3 className="pbp-card-title">{item.name}</h3>
                    </div>
                    <p className="pbp-card-description">{item.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* تفصیلی پینل */}
      {showDetailPanel && selectedItem && (
        <div className="pbp-modal-overlay" onClick={closeDetailPanel}>
          <div className="pbp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pbp-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="pbp-modal-header">
              <div className="pbp-modal-title">
                <h2>{selectedItem.name}</h2>
                <p className="pbp-modal-subtitle">{selectedItem.tagline}</p>
              </div>
            </div>

            <div className="pbp-modal-content">
              {/* بائیں طرف - تفصیلات */}
              <div className="pbp-modal-left">
                <div className="pbp-modal-details">
                  
                  {/* اردو نام */}
                  {selectedItem.urduName && (
                    <div className="pbp-detail-section">
                      <h3>اردو نام</h3>
                      <div className="pbp-detail-content">
                        <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{selectedItem.urduName}</p>
                      </div>
                    </div>
                  )}

                  {/* تفصیل */}
                  <div className="pbp-detail-section">
                    <h3>تفصیل</h3>
                    <div className="pbp-detail-content">
                      <p>{selectedItem.fullDesc}</p>
                    </div>
                  </div>

                  {/* مصالحہ جات کے لیے خاص حصے */}
                  {selectedCategory === 'spices' && (
                    <>
                      {/* اہم خصوصیات */}
                      {selectedItem.keyFeatures && selectedItem.keyFeatures.length > 0 && (
                        <div className="pbp-detail-section">
                          <h3>✨ اہم خصوصیات</h3>
                          <div className="pbp-features-grid">
                            {selectedItem.keyFeatures.map((feature, idx) => (
                              <div key={idx} className="pbp-feature-item">{feature}</div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* استعمال کا طریقہ */}
                      {selectedItem.properUsage && (
                        <div className="pbp-detail-section">
                          <h3>📝 استعمال کا طریقہ</h3>
                          <div className="pbp-detail-content">
                            <p>{selectedItem.properUsage}</p>
                          </div>
                        </div>
                      )}

                      {/* عام غلطیاں */}
                      {selectedItem.commonMistakes && selectedItem.commonMistakes.length > 0 && (
                        <div className="pbp-detail-section">
                          <h3>❌ عام غلطیاں</h3>
                          <div className="pbp-mistakes-grid">
                            {selectedItem.commonMistakes.map((mistake, idx) => (
                              <div key={idx} className="pbp-mistake-item">{mistake}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* دیگر اشیاء کے لیے حصے */}
                  {selectedCategory !== 'spices' && (
                    <>
                      {/* ذخیرہ کرنے کا طریقہ */}
                      {selectedItem.storageTips && (
                        <div className="pbp-detail-section">
                          <h3>ذخیرہ کرنے کا طریقہ</h3>
                          <div className="pbp-detail-content">
                            <p>{selectedItem.storageTips}</p>
                          </div>
                        </div>
                      )}

                      {/* استعمال کی مدت */}
                      {selectedItem.shelfLife && (
                        <div className="pbp-detail-section">
                          <h3>استعمال کی مدت</h3>
                          <div className="pbp-detail-content">
                            <p>{selectedItem.shelfLife}</p>
                          </div>
                        </div>
                      )}

                      {/* عام استعمال */}
                      {selectedItem.keyUses && selectedItem.keyUses.length > 0 && (
                        <div className="pbp-detail-section">
                          <h3>عام استعمال</h3>
                          <div className="pbp-detail-content">
                            <div className="pbp-uses-list">
                              {selectedItem.keyUses.map((use, idx) => (
                                <div key={idx} className="pbp-use-item">
                                  <span className="pbp-use-check">✓</span>
                                  <span>{use}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* اقسام */}
                  {selectedItem.types && selectedItem.types.length > 0 && (
                    <div className="pbp-types-section">
                      <h3 className="pbp-types-heading">اقسام</h3>
                      <div className="pbp-types-grid">
                        {selectedItem.types.map((type, index) => (
                          <div key={index} className="pbp-type-card">
                            <div 
                              className="pbp-type-image"
                              style={{ backgroundImage: `url(${type.image})` }}
                            ></div>
                            <div className="pbp-type-content">
                              <h4>{type.name}</h4>
                              <p className="pbp-type-desc">{type.description}</p>
                              
                              {type.bestFor && (
                                <div className="pbp-type-best">
                                  <strong>بہترین استعمال:</strong> {type.bestFor}
                                </div>
                              )}
                              
                              {type.benefits && (
                                <div className="pbp-type-benefits">
                                  <strong>فوائد:</strong> {type.benefits}
                                </div>
                              )}
                              
                              {type.waterRatio && (
                                <div className="pbp-type-info-item">💧 پانی کا تناسب: {type.waterRatio}</div>
                              )}
                              
                              {type.protein && (
                                <div className="pbp-type-info-item">💪 پروٹین: {type.protein}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* دائیں طرف - تصویر */}
              <div className="pbp-modal-right">
                <div className="pbp-main-image-container">
                  <div 
                    className="pbp-main-image"
                    style={{ backgroundImage: `url(${selectedItem.image})` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* واپس رہنمائی صفحہ پر */}
      <div className="back-home-container">
        <button 
          className="back-home-btn"
          onClick={() => {
            try {
              navigate('/guidance');
            } catch (error) {
              window.location.href = '/guidance';
            }
          }}
        >
          ← واپس رہنمائی صفحہ پر
        </button>
      </div>
    </div>
  );
};

export default UrduPantryPage;