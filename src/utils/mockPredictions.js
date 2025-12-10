
/**
 * Mock prediction service for fallback when API is unavailable or rate limited.
 * Maps common keywords to medically plausible structured data.
 */

const CONDITIONS_DATABASE = {
  headache: [
    {
      disease: "Migraine",
      confidence: 85,
      description: "A neurological condition characterized by intense, debilitating headaches due to abnormal brain activity. often accompanied by nausea, vomiting, and sensitivity to light and sound. Attacks can last for hours or days, interfering with daily activities. Triggers include stress, certain foods, and hormonal changes.",
      recovery: ["Rest in a quiet, dark room", "Apply cold or warm compresses to your head or neck", "Stay hydrated", "Take over-the-counter pain relievers"],
      matchedSymptoms: ["headache", "pain"],
      severity: 2,
      specialist: "Neurologist"
    },
    {
      disease: "Tension Headache",
      confidence: 75,
      description: "The most common type of headache, causing mild to moderate pain that feels like a tight band around the head. Often caused by stress, poor posture, or anxiety. The pain is usually steady rather than throbbing and affects both sides of the head. It does not typically cause nausea.",
      recovery: ["Practice relaxation techniques", "Improve posture", "Take breaks from screen time", "Use over-the-counter pain medication"],
      matchedSymptoms: ["headache", "stress"],
      severity: 1,
      specialist: "General Practitioner"
    },
    {
      disease: "Sinusitis",
      confidence: 65,
      description: "Inflammation or swelling of the tissue lining the sinuses, often caused by an infection. Causes facial pain, pressure, and congestion. Can be acute or chronic. Symptoms often worsen when bending forward. It may follow a cold or allergy flare-up.",
      recovery: ["Use saline nasal sprays", "Apply warm compresses to the face", "Stay well hydrated", "Rest and sleep with head elevated"],
      matchedSymptoms: ["headache", "pressure"],
      severity: 2,
      specialist: "ENT Specialist"
    }
  ],
  fever: [
    {
      disease: "Viral Infection (Flu)",
      confidence: 88,
      description: "A contagious respiratory illness caused by influenza viruses that infect the nose, throat, and sometimes the lungs. Symptoms often come on suddenly. Can cause mild to severe illness. Complications can include pneumonia and ear infections, especially in vulnerable groups.",
      recovery: ["Get plenty of rest", "Drink fluids to prevent dehydration", "Take antiviral drugs if prescribed", "Use OTC meds for fever and aches"],
      matchedSymptoms: ["fever", "chills"],
      severity: 3,
      specialist: "General Practitioner"
    },
    {
      disease: "Common Cold",
      confidence: 70,
      description: "A viral infection of your nose and throat (upper respiratory tract). usually harmless, although it might not feel that way. Symptoms include runny nose, sore throat, cough, and congestion. Most people recover in a week or 10 days.",
      recovery: ["Rest and sleep", "Drink plenty of water", "Soothe a sore throat with warm liquids", "Use saline nasal drops"],
      matchedSymptoms: ["fever", "runny nose"],
      severity: 1,
      specialist: "General Practitioner"
    },
    {
      disease: "Bacterial Infection",
      confidence: 60,
      description: "An infection caused by bacteria, which can affect any part of the body. Common types include strep throat or urinary tract infections. Symptoms depend on the location but often include fever and localized pain. Antibiotics are often needed for treatment.",
      recovery: ["Complete full course of antibiotics if prescribed", "Rest to help body fight infection", "Stay hydrated", "Monitor temperature"],
      matchedSymptoms: ["fever", "infection"],
      severity: 2,
      specialist: "Infectious Disease Specialist"
    }
  ],
  cough: [
    {
      disease: "Acute Bronchitis",
      confidence: 80,
      description: "Inflammation of the lining of your bronchial tubes, which carry air to and from your lungs. People often cough up thickened mucus, which can be discolored. Often develops from a cold or other respiratory infection. also known as a chest cold.",
      recovery: ["Rest", "Drink fluids", "Use a humidifier", "Consider cough suppressants for sleep"],
      matchedSymptoms: ["cough", "chest discomfort"],
      severity: 2,
      specialist: "Pulmonologist"
    },
    {
      disease: "Upper Respiratory Infection",
      confidence: 75,
      description: "An infection that affects the upper air passages of the respiratory system, including the nose and throat. Includes the common cold, laryngitis, and pharyngitis. Highly contagious and spreads through droplets. Most are viral and self-limiting.",
      recovery: ["Rest and hydration", "Gargle with salt water", "Use throat lozenges", "Take OTC pain relievers"],
      matchedSymptoms: ["cough", "sore throat"],
      severity: 1,
      specialist: "General Practitioner"
    },
    {
      disease: "Allergic Rhinitis",
      confidence: 60,
      description: "An allergic response to specific allergens. Pollen is the most common allergen in seasonal allergic rhinitis. Symptoms include sneezing, runny nose, and red, watery eyes. Can be seasonal or perennial (year-round). Avoidance of triggers is key.",
      recovery: ["Avoid known allergens", "Use antihistamines", "Try nasal corticosteroid sprays", "Keep windows closed during high pollen times"],
      matchedSymptoms: ["cough", "sneezing"],
      severity: 1,
      specialist: "Allergist"
    }
  ],
  stomach: [
    {
      disease: "Gastroenteritis",
      confidence: 85,
      description: "An intestinal infection marked by watery diarrhea, abdominal cramps, nausea or vomiting, and sometimes fever. Often called the stomach flu. Typically spread through contact with an infected person or contaminated food/water. Dehydration is a main risk.",
      recovery: ["Stop eating solid foods for a few hours", "Sip small amounts of water or electrolyte drinks", "Ease back into eating bland foods", "Avoid dairy"],
      matchedSymptoms: ["stomach pain", "nausea"],
      severity: 2,
      specialist: "Gastroenterologist"
    },
    {
      disease: "Acid Reflux (GERD)",
      confidence: 75,
      description: "A chronic digestive disease. GERD occurs when stomach acid or, occasionally, stomach content, flows back into your food pipe (esophagus). The backwash (reflux) irritates the lining of your esophagus. Causes heartburn and acid taste.",
      recovery: ["Avoid trigger foods", "Eat smaller meals", "Don't lie down after eating", "Elevate head of bed"],
      matchedSymptoms: ["stomach pain", "heartburn"],
      severity: 2,
      specialist: "Gastroenterologist"
    },
    {
      disease: "Indigestion (Dyspepsia)",
      confidence: 65,
      description: "Discomfort or pain in the upper abdomen. It's not a disease usually. It describes a group of symptoms including bloating, nausea, and burping. often caused by eating too much or too fast. Can also be triggered by spicy or fatty foods.",
      recovery: ["Eat slowly", "Avoid spicy words", "Manage stress", "Consider antacids"],
      matchedSymptoms: ["stomach pain", "bloating"],
      severity: 1,
      specialist: "General Practitioner"
    }
  ]
};

const DEFAULT_PREDICTIONS = [
  {
    disease: "General Assessment Needed",
    confidence: 50,
    description: "Your symptoms appear to be non-specific and could be related to various mild conditions. A proper medical evaluation is recommended. Monitor your condition closely. If symptoms persist for more than 3 days, see a doctor. This is a general assessment based on limited data.",
    recovery: ["Monitor symptoms", "Rest and hydrate", "Maintain a balanced diet", "Consult a doctor if worsening"],
    matchedSymptoms: ["general symptoms"],
    severity: 1,
    specialist: "General Practitioner"
  },
  {
    disease: "Fatigue / Stress",
    confidence: 45,
    description: "Physical or mental exhaustion that doesn't improve with rest. Stress can manifest in various physical ways. Consider your recent workload and sleep schedule. Lifestyle factors often play a major role. Management strategies include better sleep hygiene.",
    recovery: ["Improve sleep schedule", "Practice stress reduction", "Moderate exercise", "Balanced nutrition"],
    matchedSymptoms: ["tiredness"],
    severity: 1,
    specialist: "General Practitioner"
  },
  {
    disease: "Dehydration",
    confidence: 40,
    description: "Occurs when you use or lose more fluid than you take in, and your body doesn't have enough water to carry out its normal functions. Common causes include vigorous exercise, hot weather, or illness. Thirst is a late indicator of dehydration.",
    recovery: ["Drink water immediately", "Use electrolyte solutions", "Avoid caffeine", "Rest in a cool place"],
    matchedSymptoms: ["weakness"],
    severity: 1,
    specialist: "General Practitioner"
  }
];

export const getMockPredictions = (text) => {
  const lowerText = text.toLowerCase();
  
  // Check for keywords
  if (lowerText.includes('head') || lowerText.includes('migraine')) {
    return CONDITIONS_DATABASE.headache;
  }
  if (lowerText.includes('fever') || lowerText.includes('hot') || lowerText.includes('chills')) {
    return CONDITIONS_DATABASE.fever;
  }
  if (lowerText.includes('cough') || lowerText.includes('cold') || lowerText.includes('throat')) {
    return CONDITIONS_DATABASE.cough;
  }
  if (lowerText.includes('stomach') || lowerText.includes('belly') || lowerText.includes('nausea') || lowerText.includes('vomit')) {
    return CONDITIONS_DATABASE.stomach;
  }

  // Combine multiple if matches found, or return default
  // For simplicity in this mock, we prioritize the first match or default
  
  // Custom fallback to ensure matchedSymptoms reflects input
  const defaultWithInput = DEFAULT_PREDICTIONS.map(p => ({
    ...p,
    matchedSymptoms: [text.substring(0, 15) + (text.length > 15 ? '...' : '')]
  }));

  return defaultWithInput;
};
