import React, { useState } from 'react';
import './UrduCuttingTechniquesPage.css';
import { useNavigate } from 'react-router-dom';

const UrduCuttingTechniquesPage = () => {
  const navigate = useNavigate();
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);

  // CUTTING TECHNIQUES DATA (URDU)
  const cuttingTechniques = [
    {
      id: 1,
      name: "جولین",
      nameEn: "Julienne",
      tagline: "ماچس کی تیلی نما پتلی پٹیاں",
      fullDesc: "جولین ایک چاقو تکنیک ہے جو سبزیوں یا پھلوں کی پتلی، ماچس کی تیلی نما پٹیاں بناتی ہے۔ معیاری پیمائش 4mm × 4mm × 5-7cm لمبی ہوتی ہے۔ یہ ان پکوانوں کے لیے ضروری ہے جنہیں جلدی پکانا ہو اور یکساں ساخت درکار ہو۔",
      keyUses: ["چینی تلے پکوان", "سلاد", "گارنش", "ایشیائی پکوان"],
      previewImg: "JulienneCut.png",
      knife: "شیف چاقو یا سنتوکو",
      tips: ["انگلیاں اندر کی طرف موڑیں", "پہلے تختیاں بنائیں، پھر پٹیاں", "یکساں موٹائی رکھیں"],
      steps: [
        "سبزی کو دھو کر چھیل لیں اگر ضرورت ہو۔",
        "سرے کاٹ کر 5-7 سینٹی میٹر لمبے ٹکڑے کریں۔",
        "ٹکڑوں کو 4 ملی میٹر موٹی تختیوں میں کاٹیں۔",
        "تختیوں کو ڈھیر کر کے لمبائی میں 4 ملی میٹر موٹی پٹیاں کاٹیں۔",
        "یکساں سائز کے لیے کٹ یکساں رکھیں۔"
      ]
    },
    {
      id: 2,
      name: "برونواز",
      nameEn: "Brunoise",
      tagline: "باریک 3mm کیوبز",
      fullDesc: "برونواز ایک انتہائی باریک کیوب کٹ ہے، عام طور پر 3mm × 3mm × 3mm۔ یہ کیوب کٹس میں سب سے چھوٹی ہے اور درست چاقو کاری چاہتی ہے۔ اکثر گارنش یا ایسے اجزاء کے لیے استعمال ہوتی ہے جو جلدی پک جائیں یا پکوان میں گھل جائیں۔",
      keyUses: ["چٹنیاں", "سوپ", "گارنش", "بھرائی"],
      previewImg: "BrunoiseCut.png",
      knife: "تیز شیف چاقو",
      tips: ["جولین کٹ سے شروع کریں", "حفاظت کے لیے پنجہ گرفت استعمال کریں", "چاقو بہت تیز رکھیں"],
      steps: [
        "جولین کٹ والی سبزیوں سے شروع کریں (4mm × 4mm پٹیاں)۔",
        "جولین پٹیوں کو سخت ڈھیر میں جمع کریں۔",
        "ڈھیر کو 3mm کے فاصلے پر کاٹیں۔",
        "ٹکڑوں کو یکساں رکھنے کی کوشش کریں۔",
        "درست کٹ کے لیے ہلکی جھولی حرکت استعمال کریں۔"
      ]
    },
    {
      id: 3,
      name: "شیفوناڈ",
      nameEn: "Chiffonade",
      tagline: "پتوں والی سبزیوں کے لیے باریک پٹیاں",
      fullDesc: "شیفوناڈ پتوں والی جڑی بوٹیوں اور سبزیوں کو پتلی، ربن نما پٹیوں میں کاٹنے کی تکنیک ہے۔ اس کا مطلب فرانسیسی میں 'چیتھڑوں سے بنا' ہے، یہ جڑی بوٹیوں اور پتوں والی سبزیوں کے لیے بہترین ہے جہاں زیادہ ذائقہ اور خوبصورت پیشکش چاہیے۔",
      keyUses: ["جڑی بوٹی گارنش", "سلاد", "پاستا پکوان", "گارنش"],
      previewImg: "ChiffonadeCut.png",
      knife: "شیف چاقو",
      tips: ["پتے صاف ستھرے ڈھیر کریں", "کاٹنے سے پہلے سخت لپیٹیں", "نرم آرہی حرکت استعمال کریں"],
      steps: [
        "پتے دھو کر اچھی طرح خشک کریں۔",
        "5-10 ایک جیسے سائز کے پتے صاف ستھرے ڈھیر کریں۔",
        "ڈھیر کو سگریٹ نما شکل میں سخت لپیٹیں۔",
        "لپٹی کو پتلی پٹیوں میں کاٹیں (1-3mm چوڑی)۔",
        "پٹیوں کو انگلیوں سے آہستہ سے الگ کریں۔"
      ]
    },
    {
      id: 4,
      name: "ڈائس",
      nameEn: "Dice",
      tagline: "یکساں کیوب کٹ",
      fullDesc: "ڈائسنگ میں کھانے کو یکساں کیوب شکل کے ٹکڑوں میں کاٹنا شامل ہے۔ مختلف سائز ہوتے ہیں: بڑا ڈائس (20mm)، درمیانہ ڈائس (12mm)، اور چھوٹا ڈائس (6mm)۔ یکساں ڈائسنگ یکساں پکنے اور پیشہ ورانہ پیشکش کو یقینی بناتی ہے۔",
      keyUses: ["بھونائی", "سوپ", "سٹو", "سلاد"],
      previewImg: "DiceCut.png",
      knife: "شیف چاقو",
      tips: ["پہلے تختیاں پھر ڈنڈیاں", "یکساں دباؤ رکھیں", "کٹنگ بورڈ لنگر استعمال کریں"],
      steps: [
        "سبزی کو تراش کر چورس کریں۔",
        "مطلوبہ موٹائی کی یکساں تختیوں میں کاٹیں۔",
        "تختیوں کو ڈھیر کر یکساں ڈنڈیوں میں کاٹیں۔",
        "ڈنڈیوں کو سیدھا کر کے کیوبز میں کاٹیں۔",
        "سائز کو ترکیب کی ضرورت کے مطابق ایڈجسٹ کریں۔"
      ]
    },
    {
      id: 5,
      name: "سلائس",
      nameEn: "Slice",
      tagline: "بنیادی قاطع کٹ",
      fullDesc: "سلائسنگ سب سے بنیادی کاٹنے کی تکنیک ہے، جس میں کھانے کو چپٹے، چوڑے ٹکڑوں میں کاٹا جاتا ہے۔ موٹائی کاغذ کی مانند پتلی سے لے کر موٹی تک مختلف ہو سکتی ہے ترکیب کی ضرورت کے مطابق۔",
      keyUses: ["سینڈوچ", "بھونائی", "تلائی", "پیشکش"],
      previewImg: "SliceCut.png",
      knife: "شیف چاقو یا سنتوکو",
      tips: ["جھولی حرکت استعمال کریں", "یکساں سلائس رکھیں", "کھانے کو چپٹی سائیڈ سے نیچے رکھیں"],
      steps: [
        "ایک طرف سے پتلی سلائس کاٹ کر چپٹی سطح بنائیں۔",
        "چپٹی سائیڈ کو کٹنگ بورڈ پر نیچے رکھیں۔",
        "پنجہ گرفت سے کھانے کو مضبوطی سے پکڑیں۔",
        "ہموار حرکت سے مطلوبہ موٹائی کی سلائس کاٹیں۔",
        "یکساں پکنے کے لیے سلائس یکساں رکھیں۔"
      ]
    },
    {
      id: 6,
      name: "منس",
      nameEn: "Mince",
      tagline: "باریک کٹے ٹکڑے",
      fullDesc: "منسنگ میں کھانے کو بہت چھوٹے، بے قاعدہ ٹکڑوں میں کاٹنا شامل ہے جو ڈائس سے چھوٹے ہوتے ہیں۔ مقصد چھوٹے ٹکڑے بنانا ہے جو پورے پکوان میں ذائقہ یکساں طور پر پھیلا دیں بغیر نمایاں ہوئے۔",
      keyUses: ["لہسن", "پیاز", "جڑی بوٹیاں", "ذائقہ بنیاد"],
      previewImg: "MinceCut.png",
      knife: "شیف چاقو",
      tips: ["چاقو کو آگے پیچھے ہلائیں", "جمع کریں اور بار بار کاٹیں", "خم دار بلیڈ موثر استعمال کریں"],
      steps: [
        "باریک کٹے ٹکڑوں سے شروع کریں۔",
        "چاقو کی نوک کٹنگ بورڈ پر رکھیں۔",
        "چاقو کو آگے پیچھے ہلاتے ہوئے ڈھیر پر گھمائیں۔",
        "ٹکڑوں کو جمع کریں اور عمل دہرائیں۔",
        "مطلوبہ باریک پن حاصل ہونے تک جاری رکھیں۔"
      ]
    },
    {
      id: 7,
      name: "باٹونی",
      nameEn: "Batonnet",
      tagline: "ڈنڈی نما کٹ",
      fullDesc: "باٹونی ڈنڈی نما ٹکڑے بناتا ہے، عام طور پر 6mm × 6mm × 5-6cm لمبے۔ یہ جولین سے بڑا ہوتا ہے اور درمیانے ڈائس کٹ کا نقطہ آغاز ہے۔ ان سبزیوں کے لیے بہترین جو سائیڈ ڈش یا سٹو میں پیش کی جائیں۔",
      keyUses: ["فرنچ فرائز", "سبزی ڈنڈیاں", "چینی تلے پکوان", "کرڈیٹیس"],
      previewImg: "BatonnetCut.png",
      knife: "شیف چاقو",
      tips: ["پہلے اطراف تراشیں", "موٹائی ناپیں", "یکساں لمبائی رکھیں"],
      steps: [
        "سبزی کو تراش کر چورس کریں۔",
        "5-6 سینٹی میٹر لمبے ٹکڑوں میں کاٹیں۔",
        "ہر ٹکڑے کو 6 ملی میٹر موٹی تختیوں میں کاٹیں۔",
        "تختیوں کو ڈھیر کر 6 ملی میٹر موٹی ڈنڈیوں میں کاٹیں۔",
        "پورے سائز کو یکساں رکھیں۔"
      ]
    },
    {
      id: 8,
      name: "ٹورنے",
      nameEn: "Tourne",
      tagline: "فٹبال نما آرائشی کٹ",
      fullDesc: "ٹورنے (یا 'موڑی ہوئی') ایک جدید چاقو تکنیک ہے جو سات اطراف والے، فٹبال نما ٹکڑے بناتی ہے۔ یہ ایک آرائشی کٹ ہے جو عمدہ کھانوں میں خوبصورت سبزی پیشکش کے لیے استعمال ہوتی ہے جو یکساں پکتی ہیں۔",
      keyUses: ["عمدہ کھانے", "گارنش", "بھنی سبزیاں", "خاص مواقع"],
      previewImg: "TourneCut.png",
      knife: "پیرنگ چاقو یا ٹورنے چاقو",
      tips: ["چھوٹا پیرنگ چاقو استعمال کریں", "پہلے گاجر پر مشق کریں", "سات برابر اطراف رکھیں"],
      steps: [
        "سبزی چھیل کر 5 سینٹی میٹر لمبے ٹکڑوں میں کاٹیں۔",
        "سبزی کو انگوٹھے سے زاویہ پر پکڑیں۔",
        "لمبائی میں ہلکی کٹ بنائیں، ہر کٹ کے بعد گھمائیں۔",
        "سبزی کے گرد سات برابر اطراف بنائیں۔",
        "یکساں فٹبال شکل کے لیے سرے تراشیں۔"
      ]
    }
  ];

  const handleTechniqueSelect = (technique) => {
    setSelectedTechnique(technique);
    setShowDetailPanel(true);
  };

  const closeDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedTechnique(null);
  };

  // Helper functions for card classes
  const getTechniqueCardClass = (techniqueName) => {
    const name = techniqueName.toLowerCase();
    if (name.includes('julienne')) return 'julienne';
    if (name.includes('brunoise')) return 'brunoise';
    if (name.includes('chiffonade')) return 'chiffonade';
    if (name.includes('dice')) return 'dice';
    if (name.includes('slice')) return 'slice';
    if (name.includes('mince')) return 'mince';
    if (name.includes('batonnet')) return 'batonnet';
    if (name.includes('tourne')) return 'tourne';
    return '';
  };

  return (
    <div className="urdu-ctp-container">
      <div className="urdu-ctp-layout">
        {/* SIDEBAR */}
        <aside className="urdu-ctp-sidebar">
          <div className="urdu-ctp-sidebar-header">
            <h2 className="urdu-ctp-sidebar-title">کاٹنے کی تکنیکیں</h2>
            <p className="urdu-ctp-sidebar-subtitle">ضروری چاقو مہارتیں</p>
          </div>

          <div className="urdu-ctp-sidebar-techniques">
            <ul className="urdu-ctp-techniques-list">
              {cuttingTechniques.map(technique => (
                <li 
                  key={technique.id} 
                  className={`urdu-ctp-technique-list-item ${selectedTechnique?.id === technique.id ? 'urdu-ctp-active' : ''}`}
                  onClick={() => handleTechniqueSelect(technique)}
                >
                  <span className="urdu-ctp-technique-list-name">{technique.name}</span>
                  <span className="urdu-ctp-technique-list-name-en">{technique.nameEn}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="urdu-ctp-main">
          <header className="urdu-ctp-main-header">
            <div className="urdu-ctp-header-content">
              <h1 className="urdu-ctp-page-title">ضروری کاٹنے کی تکنیکیں</h1>
              <p className="urdu-ctp-page-description">
                ان بنیادی کاٹنے کی تکنیکوں کے ساتھ پیشہ ورانہ چاقو مہارتیں سیکھیں۔
              </p>
            </div>
          </header>

          {/* TECHNIQUES GRID */}
          <div className="urdu-ctp-techniques-grid-section">
            <div className="urdu-ctp-techniques-grid">
              {cuttingTechniques.map(technique => (
                <div 
                  key={technique.id} 
                  className="urdu-ctp-technique-card"
                  onClick={() => handleTechniqueSelect(technique)}
                >
                  <div 
                    className="urdu-ctp-card-image"
                    style={{ backgroundImage: `url(${technique.previewImg})` }}
                  ></div>
                  
                  <div className="urdu-ctp-card-content">
                    <h3 className="urdu-ctp-card-title">{technique.name}</h3>
                    <p className="urdu-ctp-card-description">{technique.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* DETAIL MODAL */}
      {showDetailPanel && selectedTechnique && (
        <div className="urdu-ctp-modal-overlay" onClick={closeDetailPanel}>
          <div className="urdu-ctp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="urdu-ctp-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="urdu-ctp-modal-header">
              <div className="urdu-ctp-modal-title">
                <h2>{selectedTechnique.name}</h2>
                <p className="urdu-ctp-modal-subtitle">{selectedTechnique.tagline}</p>
              </div>
            </div>

            <div className="urdu-ctp-modal-content">
              {/* LEFT SIDE - CONTENT */}
              <div className="urdu-ctp-modal-details">
                {/* DESCRIPTION */}
                <div className="urdu-ctp-detail-section description-section">
                  <h3>تفصیل</h3>
                  <p>{selectedTechnique.fullDesc}</p>
                </div>

                {/* COMMON USES - HORIZONTAL */}
                <div className="urdu-ctp-detail-section uses-section">
                  <h3>عام استعمالات</h3>
                  <div className="urdu-ctp-uses-list">
                    {selectedTechnique.keyUses.map((use, idx) => (
                      <div key={idx} className="urdu-ctp-use-item">
                        <span className="urdu-ctp-use-check">✓</span>
                        <span>{use}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TECHNIQUE DETAILS - UNDER COMMON USES */}
                <div className="urdu-ctp-detail-section details-section">
                  <h3>تکنیک کی تفصیلات</h3>
                  <div className="urdu-ctp-details-list">
                    <div className="urdu-ctp-detail-item">
                      <span className="urdu-ctp-detail-label">تجویز کردہ چاقو:</span>
                      <span className="urdu-ctp-detail-value">{selectedTechnique.knife}</span>
                    </div>
                  </div>
                </div>

                {/* STEPS */}
                <div className="urdu-ctp-detail-section steps-section">
                  <h3>{selectedTechnique.name} کٹ کے مراحل</h3>
                  <div className="urdu-ctp-steps-list">
                    {selectedTechnique.steps.map((step, idx) => (
                      <div key={idx} className="urdu-ctp-step-item">
                        <span className="urdu-ctp-step-number">{idx + 1}.</span>
                        <span className="urdu-ctp-step-text">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TIPS - WITH NUMBERED STYLE */}
                <div className="urdu-ctp-detail-section tips-section">
                  <h3>ماہرانہ نکات</h3>
                  <div className="urdu-ctp-tips-list">
                    {selectedTechnique.tips.map((tip, idx) => (
                      <div key={idx} className="urdu-ctp-tip-item">
                        <span className="urdu-ctp-tip-number">{idx + 1}.</span>
                        <span className="urdu-ctp-tip-text">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - IMAGE */}
              <div className="urdu-ctp-modal-image-container">
                <div 
                  className="urdu-ctp-modal-main-image"
                  style={{ backgroundImage: `url(${selectedTechnique.previewImg})` }}
                ></div>
                <div className="urdu-ctp-image-caption">
                  {selectedTechnique.name} - کاٹنے کی تکنیک
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to Home Button */}
      <div className="urdu-ctp-back-home-container">
        <button 
          className="urdu-ctp-back-home-btn"
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

export default UrduCuttingTechniquesPage;