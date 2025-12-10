// Lightweight descriptions for common conditions + smart fallback
// Keep each description to ~1–2 short sentences for readability.

const DESCRIPTIONS = {
  'common cold':
    'A mild viral infection of the upper respiratory tract causing runny nose, sneezing, sore throat, and mild fever. Symptoms usually improve within 7–10 days with rest, fluids, and symptomatic care.',
  influenza:
    'A viral respiratory illness with fever, body aches, cough, and fatigue. Rest, fluids, and fever control help; high‑risk patients should seek medical advice promptly.',
  covid:
    'A viral respiratory infection that can cause fever, cough, sore throat, loss of taste or smell, and fatigue. Isolate, rest, hydrate, and follow local testing/treatment guidance.',
  'covid-19':
    'A viral respiratory infection that can cause fever, cough, sore throat, loss of taste or smell, and fatigue. Isolate, rest, hydrate, and follow local testing/treatment guidance.',
  migraine:
    'A recurrent headache disorder with throbbing head pain, often with nausea and light sensitivity. Rest in a dark room, hydrate, and consider over‑the‑counter analgesics if appropriate.',
  sinusitis:
    'Inflammation/infection of the sinuses leading to facial pressure, congestion, and thick nasal discharge. Steam inhalation, saline rinses, fluids, and rest may help.',
  bronchitis:
    'Airway inflammation causing cough, chest discomfort, and mucus. Rest, fluids, humidified air, and symptomatic care are typical; see a clinician if symptoms persist or worsen.',
  pneumonia:
    'Lung infection that can cause fever, cough, chest pain, and shortness of breath. This can be serious—seek medical advice, especially if breathing is difficult or fever is high.',
  'strep throat':
    'A bacterial throat infection featuring sore throat, fever, and swollen glands. Testing and antibiotics may be needed—consult a clinician.',
  'gastroenteritis':
    'Stomach and intestinal irritation causing nausea, vomiting, diarrhea, and cramps. Hydration is essential; most cases resolve in 1–3 days.',
  'food poisoning':
    'Illness from contaminated food causing nausea, vomiting, abdominal pain, and diarrhea. Replace fluids and electrolytes; seek care if severe or prolonged.',
  'urinary tract infection':
    'Infection of the urinary system leading to burning urination, urgency, and frequency. Increased fluids help; testing and antibiotics may be needed.',
  'uti':
    'Infection of the urinary system leading to burning urination, urgency, and frequency. Increased fluids help; testing and antibiotics may be needed.',
  allergies:
    'Immune response to allergens causing sneezing, itchy eyes, congestion, and rash. Allergen avoidance and antihistamines may relieve symptoms.',
  asthma:
    'A chronic airway condition with wheeze, cough, and chest tightness. Use prescribed inhalers and avoid triggers; seek urgent care for severe breathing difficulty.',
  'acid reflux':
    'Stomach acid flowing into the esophagus causing heartburn and indigestion. Smaller meals, avoiding late eating, and trigger control often help.',
  gerd:
    'Stomach acid flowing into the esophagus causing heartburn and indigestion. Smaller meals, avoiding late eating, and trigger control often help.',
  hypertension:
    'High blood pressure often without symptoms; long‑term control reduces heart and stroke risk. Lifestyle measures and medications may be needed—follow your clinician’s plan.',
  diabetes:
    'A metabolic condition affecting blood sugar regulation. Healthy diet, activity, and medications/insulin as prescribed are key; monitor glucose as directed.',
  depression:
    'A mood disorder with persistent low mood, loss of interest, and fatigue. Professional evaluation and support are important; therapies and medication can help.',
  anxiety:
    'A condition with excessive worry, restlessness, and physical tension. Breathing techniques, regular activity, and professional support can help.'
};

function titleToKey(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

export function getDiseaseDescription(disease, symptoms = [], specialist) {
  const key = titleToKey(disease);
  const found = DESCRIPTIONS[key];
  if (found) return found;

  const listed = (Array.isArray(symptoms) ? symptoms : [])
    .filter(Boolean)
    .map(s => String(s).toLowerCase())
    .slice(0, 4)
    .join(', ');

  const spec = specialist ? ` a ${specialist}` : ' a healthcare professional';

  // 1–2 sentence generic fallback
  const lead = `${disease} is one possible explanation for your symptoms${listed ? ` (${listed})` : ''}.`;
  const tail = `This is not a diagnosis. Monitor your condition and consider consulting${spec}, especially if symptoms persist or worsen.`;
  return `${lead} ${tail}`;
}

export default getDiseaseDescription;
