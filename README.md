# 🏥 AI-Powered Healthcare Medicare ASK

An intelligent healthcare application that uses AI to analyze symptoms and provide medical insights, helping users understand potential health conditions and find nearby healthcare facilities.

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js)
![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=flat-square&logo=python)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

- **🔍 Symptom Analysis**: Enter your symptoms and get AI-powered health predictions
- **🤖 Machine Learning Model**: Uses trained ML models to predict potential diseases
- **📍 Hospital Finder**: Locate nearby hospitals and healthcare facilities using Google Maps integration
- **💊 Medicine Suggestions**: Get relevant medicine recommendations based on predicted conditions
- **📋 Health Reports**: Generate and download detailed health reports
- **🎯 Smart Recommendations**: Personalized health suggestions based on your symptoms

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **CSS3** - Styling with animations
- **Axios** - HTTP client for API calls

### Backend
- **Node.js & Express** - Server-side runtime
- **Python & Flask** - ML model serving
- **Google Maps API** - Location services

### Machine Learning
- **Scikit-learn** - Disease prediction models
- **Random Forest** - Classification algorithm

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Karansd44/AI-Powered-Healthcare-Medicare-ASK-.git
   cd AI-Powered-Healthcare-Medicare-ASK-
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open the app**
   Visit [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
my-health-app/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── SymptomInput.js # Symptom input form
│   │   ├── PredictionResult.js
│   │   └── HospitalFinder.js
│   ├── App.js             # Main app component
│   └── index.js           # Entry point
├── server.js              # Node.js server
├── server.py              # Python ML server
└── README.md
```

## 🎯 How It Works

1. **Input Symptoms**: Users enter their symptoms in natural language
2. **AI Processing**: The ML model analyzes the symptoms
3. **Prediction**: System predicts potential health conditions
4. **Recommendations**: Provides medicine suggestions and health tips
5. **Hospital Finder**: Shows nearby healthcare facilities on the map

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Karan SD**
- GitHub: [@Karansd44](https://github.com/Karansd44)

## 🙏 Acknowledgments

- Google Maps API for location services
- React community for excellent documentation
- Healthcare datasets for model training

---

<p align="center">Made with ❤️ for better healthcare accessibility</p>
