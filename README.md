# 🏥 MediLens AI — Medical Report Analyzer

> **Understand your medical reports in simple language.**

MediLens AI is a modern web-based medical report analyzer that helps users understand important information from PDF-based laboratory reports.

The application extracts text from uploaded PDF reports, identifies supported laboratory test values, compares them with predefined reference ranges, and presents the results through a clean and easy-to-understand dashboard.

> ⚠️ **Disclaimer:** MediLens AI is an educational software project. It does not provide medical diagnoses, treatment recommendations, or professional medical advice. Results should always be discussed with a qualified healthcare professional.

---

## ✨ Features

### 📄 PDF Report Upload

Upload a medical laboratory report directly through the web interface.

### 🔍 Automatic Text Extraction

Uses **PDF.js** to extract readable text from PDF documents directly in the browser.

### 🧪 Medical Test Detection

Automatically detects supported laboratory values such as:

* Hemoglobin
* Glucose
* Vitamin D
* Total Cholesterol
* HDL Cholesterol
* LDL Cholesterol
* Triglycerides
* Creatinine
* Sodium
* Potassium

### 📊 Reference Range Comparison

Detected values are compared against predefined reference ranges.

Results are categorized as:

* 🟢 **Normal**
* 🟡 **Attention**
* 🔴 **Outside Range**

### 📈 Analysis Dashboard

Displays:

* Total tests detected
* Normal results
* Results requiring attention
* Results outside the configured range

### 🧠 Simple Explanations

Provides easy-to-understand educational descriptions of detected laboratory tests.

### 📥 Download Summary

Users can download a text summary of the analysis.

### 📱 Responsive Design

The interface works across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📟 Tablet

### 🎨 Modern UI

Includes:

* Clean medical-style interface
* Responsive layout
* Drag-and-drop upload
* Loading animation
* Dashboard cards
* Status indicators
* Mobile-friendly design

---

## 🛠️ Tech Stack

| Technology   | Purpose                       |
| ------------ | ----------------------------- |
| HTML5        | Website structure             |
| CSS3         | Styling and responsive design |
| JavaScript   | Application logic             |
| PDF.js       | PDF text extraction           |
| Browser APIs | File handling and downloads   |

---

## 📂 Project Structure

```text
MediLens-AI/
│
├── index.html
├── style.css
├── script.js
│
├── assets/
│   └── logo.png
│
├── screenshots/
│
├── README.md
└── .gitignore
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/MediLens-AI.git
```

### 2. Open the Project

```bash
cd MediLens-AI
```

### 3. Run the Website

You don't need Node.js, Python, or a database for the current version.

Simply open:

```text
index.html
```

in a modern web browser.

For the best development experience, you can use **VS Code + Live Server**.

---

## 🧪 How It Works

The current application follows this workflow:

```text
        ┌──────────────────┐
        │  Upload PDF      │
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │    PDF.js        │
        │ Extract Text     │
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ Detect Supported  │
        │ Medical Tests     │
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ Compare With     │
        │ Reference Range  │
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ Analysis         │
        │ Dashboard        │
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ Download Summary │
        └──────────────────┘
```

---

## 🔬 Currently Supported Tests

The current JavaScript analyzer contains predefined ranges for several common laboratory tests.

| Test              | Unit   | Example Reference Range |
| ----------------- | ------ | ----------------------: |
| Hemoglobin        | g/dL   |                 12 – 17 |
| Glucose           | mg/dL  |                70 – 100 |
| Vitamin D         | ng/mL  |                30 – 100 |
| Total Cholesterol | mg/dL  |                 0 – 200 |
| HDL Cholesterol   | mg/dL  |                40 – 100 |
| LDL Cholesterol   | mg/dL  |                 0 – 130 |
| Triglycerides     | mg/dL  |                 0 – 150 |
| Creatinine        | mg/dL  |               0.6 – 1.3 |
| Sodium            | mmol/L |               135 – 145 |
| Potassium         | mmol/L |               3.5 – 5.1 |

> **Note:** Reference ranges can vary depending on the laboratory, testing method, age, sex, medical context, and other factors. The predefined values in this project are for software demonstration purposes and should not be treated as clinical reference standards.

---

## 📄 Example Input

A text-based PDF containing values such as:

```text
Hemoglobin: 14.2
Glucose: 92
Vitamin D: 22
Total Cholesterol: 180
Creatinine: 0.9
Sodium: 140
Potassium: 4.2
```

can be processed by the current analyzer.

---

## ⚠️ Current Limitations

This is the **first frontend-only version**, so there are some limitations.

### Scanned PDFs

Image-only/scanned PDFs may not work because the current version extracts text rather than performing OCR.

### Limited Test Detection

Only predefined laboratory tests are currently recognized.

### No Real AI Yet

The current version uses JavaScript rules and predefined explanations.

An actual AI model can be integrated in a future version.

### Reference Ranges

The application uses demonstration ranges and should not be used for clinical decision-making.

---

## 🔮 Future Improvements

Planned improvements include:

* 🤖 Real AI-powered report interpretation
* 🧠 LLM integration
* 👁️ OCR for scanned medical reports
* 📊 Interactive charts
* 💬 Chat with your report
* 🌐 Multi-language support
* 📱 Progressive Web App support
* 🔐 Secure backend
* 👤 User accounts
* 🗂️ Report history
* 📑 AI-generated PDF summaries
* 📈 Trend analysis across multiple reports
* 🏥 Doctor-friendly report summaries
* 🔔 Configurable notifications
* ☁️ Cloud deployment

---

## 🔐 Privacy & Security

Medical reports may contain sensitive personal information.

For the current frontend-only version:

* Files are processed within the browser.
* The project does not intentionally upload reports to a server.
* Users should avoid uploading real personal medical documents when testing an experimental version.

If a backend and AI API are added later, appropriate security, privacy, authentication, encryption, and data-retention practices will be required.

---

## 🎯 Project Goals

MediLens AI was created with the following goals:

1. Make medical reports easier to understand.
2. Present laboratory values in a simple interface.
3. Highlight values that fall outside configured demonstration ranges.
4. Reduce confusion around technical laboratory terminology.
5. Explore the use of AI and web technologies in healthcare applications.

---

## 🖥️ Screenshots

Add your project screenshots here after taking them:

```text
screenshots/
├── home.png
├── upload.png
├── dashboard.png
└── analysis.png
```

Example:

```markdown
![MediLens AI Dashboard](screenshots/dashboard.png)
```

---

## 🤝 Contributing

Contributions are welcome!

### Fork the repository

```bash
git fork https://github.com/YOUR-USERNAME/MediLens-AI
```

### Create a branch

```bash
git checkout -b feature/new-feature
```

### Commit your changes

```bash
git add .
git commit -m "Add new feature"
```

### Push the branch

```bash
git push origin feature/new-feature
```

Then open a Pull Request.

---

## 📜 License

This project is available for educational and development purposes.

See the `LICENSE` file for more information.

---

## ⚠️ Medical Disclaimer

**MediLens AI is not a medical device and does not provide medical diagnosis, treatment, or professional medical advice.**

The information generated by this application is intended for educational and demonstration purposes only.

Laboratory results should be interpreted in their proper clinical context by a qualified healthcare professional.

If you have concerns about a medical result, consult a doctor or other qualified healthcare professional.

---

## 👨‍💻 Author

**N. Ebinezer Jeba Samuel**

🧑‍💻 Software Engineer in the Making
🤖 AI • ML • Computer Vision
🌐 Web Development • Full Stack Development

🔗 **GitHub:** [Ebinezer-cloud](https://github.com/Ebinezer-cloud?utm_source=chatgpt.com)

https://www.linkedin.com/in/ebinezer-ebinezer-ab8b61392/

---

### ⭐ Support the Project

If you find **MediLens AI** useful or interesting:

⭐ Star the repository
🍴 Fork the project
🐛 Report bugs
💡 Suggest new features
🤝 Contribute to the project

**Built with ❤️ by N. Ebinezer Jeba Samuel**
