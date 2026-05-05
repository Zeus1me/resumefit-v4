import { useState, useRef } from "react";

// ===== CANDIDATE DATA =====
var MD = {
  name: "Joseph Iyanuoluwa Eyinade",
  location: "Vancouver, BC",
  email: "josephiyanu@gmail.com",
  phone: "+1 (236) 660-8515",
  linkedin: "linkedin.com/in/josephiyanu",
  github: "github.com/Zeus1me",
  certifications: [
    { id: "ai_practice", name: "AI in Professional Practice", issuer: "Northeastern University", date: "Jun 2025" },
    { id: "fin_accounting", name: "Financial Accounting", issuer: "University Canada West", date: "Jun 2024" },
    { id: "semrush_seo", name: "Semrush SEO Toolkit Exam", issuer: "Semrush", date: "Aug 2022" },
    { id: "linkedin_writing", name: "Writing Articles", issuer: "LinkedIn", date: "May 2022" }
  ],
  education: [
    { degree: "Master of Science in Data Analytics", school: "Northeastern University, Vancouver, BC", dates: "Sep 2024 – Jun 2026", gpa: "3.8 / 4.0", coursework: ["Machine Learning", "Deep Learning", "Natural Language Processing", "Predictive Analytics", "Data Mining", "Cloud Computing", "AI Ethics", "Cybersecurity", "Analytics Leadership", "Optimization", "Business Intelligence", "Computer Vision", "Statistical Modeling"] },
    { degree: "Bachelor of Engineering, Electrical & Electronic Engineering", school: "Obafemi Awolowo University, Nigeria", dates: "2015 – 2020", gpa: null, coursework: null }
  ],
  experience: [
    { id: "freelance", title: "Freelance Data Analyst", company: "Remote", dates: "2019 – Present",
      bullets: [
        { id: "churn", text: "Engineered churn prediction models using Random Forest, Logistic Regression, and GLMs in Python (scikit-learn), reducing client risk exposure by 12% and informing retention strategies across 3 retail accounts." },
        { id: "dashboards", text: "Developed 8+ automated Power BI and Tableau dashboards for revenue forecasting and KPI tracking, improving retail planning accuracy and eliminating 25% of manual reporting effort (~10 hours/week)." },
        { id: "sql", text: "Optimized SQL-based ETL pipelines for data extraction, transformation, and analysis across datasets of 500K+ records, accelerating reporting turnaround by 40% and enabling real-time stakeholder access." },
        { id: "vba", text: "Automated Excel reporting workflows with VBA macros across 5 client accounts, reducing manual data entry effort by 25% and improving data integrity for monthly financial reports." },
        { id: "timeseries", text: "Built R-based time-series forecasting models (ARIMA, seasonal decomposition) for demand prediction, improving financial forecasting accuracy by 18% for retail clients." },
        { id: "presentations", text: "Delivered 15+ analytical presentations and executive summaries translating complex statistical findings into actionable business recommendations for non-technical stakeholders." }
      ]
    },
    { id: "jkl", title: "Data Analyst", company: "Jonathan Kings Limited, Nigeria", dates: "Jan 2021 – Dec 2023",
      bullets: [
        { id: "jkl_dashboards", text: "Designed and maintained 10+ Power BI and Tableau dashboards tracking sales revenue, inventory turnover, and supply chain KPIs, enabling data-driven procurement decisions that reduced stockout incidents by 20%." },
        { id: "jkl_reporting", text: "Built automated Excel and Google Sheets reporting systems for financial performance (P&L, budgets, cash flow), reducing month-end reporting time from 5 days to 2 days and improving accuracy." },
        { id: "jkl_python", text: "Developed Python (pandas, matplotlib) scripts to analyze 50K+ transaction records across retail and logistics operations, identifying $30K+ in cost-saving opportunities through procurement pattern analysis." },
        { id: "jkl_crm", text: "Analyzed customer purchase data and segmentation patterns to inform marketing campaigns, contributing to a 15% increase in repeat customer retention across 3 product lines." },
        { id: "jkl_supply", text: "Tracked and visualized end-to-end supply chain metrics (shipping times, vendor performance, freight costs) for international trade operations, improving vendor evaluation accuracy and reducing delivery delays by 18%." },
        { id: "jkl_stakeholder", text: "Presented weekly analytics reports and quarterly business reviews directly to the company director, translating complex data insights into strategic recommendations for inventory planning and market expansion." }
      ]
    },
    { id: "writer", title: "Freelance Technical Writer", company: "Upwork — Remote", dates: "2022 – Present",
      bullets: [
        { id: "wr_castlore", text: "Authored 5 strategy articles connecting classic card game mechanics to board game design for client Michael Long (Castlore), delivering SEO-optimized content on deadline." },
        { id: "wr_saas", text: "Produced 30+ technical and business content pieces across AI, data analytics, SaaS process optimization, blockchain/NFT, and nonprofit fundraising verticals." },
        { id: "wr_research", text: "Researched and synthesized complex technical topics into clear, audience-appropriate copy for blogs, case studies, lead magnets, YouTube scripts, and website content." }
      ]
    },
    { id: "huawei", title: "Field Engineering Intern", company: "Huawei Technologies, Nigeria", dates: "May 2019 – Aug 2019",
      bullets: [
        { id: "diagnostics", text: "Implemented data-driven diagnostic workflows across 12+ network subsystems, reducing system failures by 15% through root-cause analysis and preventive maintenance scheduling." },
        { id: "reports", text: "Produced weekly technical performance reports for senior leadership (audience of 20+), translating complex network metrics into actionable operational recommendations that improved uptime KPIs." }
      ]
    },
    { id: "airtel", title: "Telecom Engineering Intern", company: "Airtel Nigeria", dates: "Jul 2019 – Dec 2019",
      bullets: [
        { id: "kpi", text: "Tracked 10+ network KPIs and maintained incident logs for NOC/field teams across 3 regions, contributing to root-cause chronologies that reduced mean resolution time." },
        { id: "briefs", text: "Delivered concise daily status briefs to non-technical stakeholders, streamlining cross-team decision cycles and improving operational transparency." }
      ]
    }
  ],
  projects: [
    { id: "lidar", title: "LiDAR Point Cloud Smart Stitching — Capstone with Lumotive Inc.", dates: "Jan 2026 – Present", text: "Developing rain-scatter filtering algorithms for MD42 LiDAR sensor data across three echo return streams using Python and ROS2, improving 3D point cloud accuracy for autonomous systems." },
    { id: "jobforge", title: "JobForge — AI-Powered Job Search Application", dates: "Apr 2026", text: "Built a full-featured React job search app with AI-powered job matching, skill gap analysis, Kanban tracker, cover letter generation, and a three-tier search system." },
    { id: "resumefit", title: "ResumeFit — AI Resume Tailoring Web App", dates: "Apr 2026", text: "Built and deployed a Vite+React web app on Vercel with serverless Claude API integration that tailors resumes, generates cover letters, and answers application questions.", url: "lazyzeus2.vercel.app" },
    { id: "fruitnet", title: "FruitNet — Object Detection Microservice", dates: "Mar 2026", text: "Built and deployed a Faster R-CNN fruit detection API (FastAPI + Docker) on Hugging Face Spaces; fine-tuned on 4,485 images across 11 fruit classes.", url: "zeus1m-fruit-detector-api.hf.space" },
    { id: "intelcv", title: "Intel Image Classification — ResNet-18 Transfer Learning", dates: "Mar 2026", text: "Applied transfer learning with ResNet-18 on Intel Image Classification dataset (6 classes). Regularized model achieved macro F1 0.9353 using PyTorch." },
    { id: "textclass", title: "Text Classification — ULMFiT & NLP Pipeline", dates: "Mar 2026", text: "Fine-tuned AWD-LSTM via ULMFiT (fastai) on 10,000 AG News samples. Compared to TF-IDF + LinearSVC baseline using accuracy and macro-F1." },
    { id: "bikesharing", title: "Bike Sharing Demand Analysis — End-to-End ML Pipeline", dates: "Feb 2026", text: "Applied K-Means, PCA, Random Forest (R-squared > 0.91), Q-Learning, and neural networks on UCI Bike Sharing Dataset; delivered 13-slide executive presentation." },
    { id: "heartdisease", title: "Heart Disease Prediction — Multi-Model Comparison", dates: "Feb 2026", text: "Evaluated 9 supervised learning algorithms and 5 neural network architectures on UCI Heart Disease dataset. Focused on classification and model interpretability." },
    { id: "creditrisk", title: "Customer Churn & Credit Risk Modelling", dates: "2024 – 2025", text: "Built classification and regression models (Logistic Regression, XGBoost, GLMs) on German Credit and retail datasets; applied SHAP for model interpretability." },
    { id: "nashville", title: "Nashville Housing Price Prediction", dates: "Jan 2026", text: "Built and compared Linear Regression, Decision Tree, Random Forest, and Gradient Boosting models achieving R-squared=0.9481 with gradient boosting." },
    { id: "streamlit", title: "Amazon Movie Review Analytics Dashboard", dates: "Dec 2025", text: "Developed and deployed an interactive Streamlit dashboard analyzing Amazon movie review trends with dynamic filters and time-series analytics (~500K rows)." },
    { id: "steeves", title: "Resource Allocation Analytics — Steeves & Associates", dates: "Sep – Nov 2025", text: "Conducted exploratory analysis of FY2019-FY2025 resource-hour data for IT consulting sponsor. Used R and ggplot2 for allocation trends." },
    { id: "bicycleaccidents", title: "Bicycle Accidents EDA Dashboard", dates: "Feb 2026", text: "Developed an interactive Python/Plotly dashboard analyzing 847K+ bicycle accident records with geospatial visualization and severity analysis." },
    { id: "awsglue", title: "AWS Glue PySpark Data Pipeline", dates: "Dec 2025", text: "Developed an AWS Glue PySpark assignment processing online retail dataset on S3, implementing ETL transformations and big data pipeline architecture." },
    { id: "cymax", title: "Demand Forecasting Framework — Cymax Group Technologies", dates: "2025", text: "Designed analytics solution for Vancouver-based eCommerce logistics company proposing integrated demand forecasting." },
    { id: "nigeriaelection", title: "Nigerian Presidential Election Dashboard", dates: "Mar 2026", text: "Built interactive HTML dashboard comparing presidential election results across geopolitical zones using Chart.js." }
  ],
  skills: {
    languages: "Python, R, SQL, JavaScript, VBA, HTML/CSS",
    ml: "Scikit-learn, PyTorch, TensorFlow/Keras, fastai, Pandas, NumPy, SciPy, Statsmodels, PySpark, XGBoost, SHAP, SMOTE, torchvision",
    viz: "Tableau, Power BI, Matplotlib, Seaborn, Plotly, Streamlit, ggplot2, Chart.js, gt tables",
    tools: "Git, Docker, AWS (S3, Glue, EC2), Google Cloud Vision API, ROS2, Jupyter, PyCharm, RStudio, Excel (Advanced), Hugging Face, FastAPI, Quarto",
    db: "SQL Server, Snowflake, MS Access, MongoDB concepts, Parquet, DynamoDB concepts",
    methods: "Regression, Classification, Clustering, NLP, Time-Series Forecasting, A/B Testing, Deep Learning, Computer Vision, Object Detection, Transfer Learning, Dimensionality Reduction, Reinforcement Learning, Optimization, Text Mining, Web Scraping, RLHF, ETL Pipelines",
    professional: "Data Storytelling, Cross-Functional Collaboration, Stakeholder Communication, Technical Presentations, Agile/Scrum, Requirements Gathering, Business Acumen, Problem-Solving"
  }
};

// ===== SYSTEM PROMPT =====
function makeResumeSys(pages) {
  const pr = pages === 1
    ? "CRITICAL ONE-PAGE MODE: Select ONLY 3 bullets per experience role (freelance, jkl, huawei). Select ONLY 3 projects. Keep overview to exactly 3 sentences. Every word must earn its place. If in doubt, cut it."
    : "TWO PAGES: Include 4-5 bullets per role, 5-6 projects, expanded 3-4 sentence overview. Still be selective.";

  return `You are an elite ATS-optimized resume tailoring engine for the Canadian tech job market (2026). Your output must pass Workday, Taleo, Lever, and Greenhouse ATS parsers AND impress a human recruiter in their 6-second scan.

CANDIDATE DATA:
${JSON.stringify(MD)}

=== 2026 CANADIAN TECH RESUME RESEARCH (hard-coded rules) ===

ATS COMPLIANCE (90% of recruiters use ATS):
- Use standard section headings ONLY: "Professional Summary", "Technical Skills", "Education", "Professional Experience", "Projects"
- Mirror EXACT keywords from the job posting in skills and bullets (ATS matches literal strings)
- Distribute keywords across summary, skills, AND experience bullets (not just skills section)
- Never use icons, tables, columns, or non-standard formatting terms

BULLET POINT FORMULA (mandatory for ALL bullets):
[Strong Action Verb] + [What You Did] + [Tool/Method Used] + [Quantified Result/Business Impact]
- EVERY bullet MUST start with a different strong action verb: Developed, Engineered, Automated, Optimized, Deployed, Architected, Reduced, Accelerated, Designed, Implemented, Delivered, Built, Trained, Analyzed, Transformed, Extracted, Streamlined, Consolidated, Eliminated
- EVERY bullet MUST contain at least ONE metric: percentage, dollar amount, time saved, dataset size, accuracy score, number of users/records/models
- NEVER use weak verbs: Helped, Assisted, Worked on, Was responsible for, Participated in, Contributed to, Handled, Managed (without scope)
- NEVER write duty descriptions. Only achievements with quantified outcomes.
- Connect technical work to BUSINESS IMPACT: revenue, cost savings, efficiency gains, risk reduction, decision quality

PROFESSIONAL SUMMARY RULES:
- Start with the EXACT job title from the posting (e.g., "Data Analyst with..." or "Machine Learning Engineer with...")
- Include: years of experience, 3-5 top matching skills, strongest quantified achievement, and degree
- 2-3 sentences MAX. Every word must answer "Why should we interview this person?"
- Mirror 3-5 keywords from the posting naturally

SKILLS SECTION RULES:
- Group into 4-5 lines with labels that match the posting's language
- Lead each line with the skills mentioned in the posting (order matters, recruiters scan left to right)
- Include the EXACT tool names (not generic categories): "Python" not "programming", "Tableau" not "visualization tools"
- Include specific libraries: pandas, NumPy, scikit-learn, PyTorch (not just "Python libraries")
- If the posting mentions soft skills like "cross-functional collaboration", "stakeholder management", or "data storytelling", include a "Professional Skills" line using the candidate's professional skills data
- In 2026, recruiters explicitly look for: data storytelling, stakeholder management, cross-functional collaboration, and communication. Weave these into bullets AND skills when the posting values them

PROJECT RULES:
- Each project bullet must follow the same action verb + tool + metric formula
- Frame academic projects as professional deliverables with business impact language
- Include deployment/production indicators where relevant (Docker, Hugging Face, Streamlit Cloud, Netlify)
- DOMAIN MATCHING (CRITICAL): Select projects that match the posting's INDUSTRY/DOMAIN:
  * Healthcare/medical → heart disease prediction, bicycle accidents (injury data)
  * Finance/crypto/blockchain → credit risk SHAP, Nashville housing (financial modeling)
  * ML/AI engineering → FruitNet, Intel ResNet-18, text classification, LiDAR capstone
  * Data engineering/pipelines → AWS Glue PySpark, LiDAR capstone (data processing)
  * BI/analytics/dashboards → Streamlit dashboard, Steeves, bicycle accidents, Nigerian election
  * Marketing/product → credit risk (churn), Cymax demand forecasting
  * Consulting/general → Steeves, bike sharing, Nashville housing
- NEVER select the same 3 projects every time. Match to the posting's domain first.

METRIC ACCURACY (CRITICAL — NEVER VIOLATE):
- NEVER invent, inflate, or exaggerate metrics. Only use numbers that appear in the candidate data.
- These are the ONLY accurate metrics you may use:
  * 12% risk reduction (churn models)
  * 8+ dashboards (Power BI/Tableau)
  * 10 hours/week saved (manual reporting)
  * 25% manual effort reduction (dashboards and VBA)
  * 500K+ records (SQL pipelines)
  * 40% faster reporting turnaround (ETL)
  * 18% forecasting accuracy improvement (time-series)
  * 50K+ transactions (JKL Python analysis)
  * $30K cost savings identified (JKL procurement)
  * 20% stockout reduction (JKL dashboards)
  * 15% customer retention increase (JKL CRM)
  * 18% delivery delay reduction (JKL supply chain)
  * 15% system failure reduction (Huawei diagnostics)
  * R2 > 0.91 (bike sharing), R2 = 0.9481 (Nashville housing)
  * macro F1 0.9353 (Intel CV), 96% MLP / 95.39% RF (MNIST)
  * 4,485 images, 11 classes (FruitNet)
  * 847K+ records (bicycle accidents)
  * 500K rows (Streamlit dashboard)
  * 30+ content pieces (writing)
  * 15+ presentations (stakeholder)
- If you need a number not in this list, use the closest accurate one or omit the metric.
- NEVER combine metrics to create larger fake numbers (e.g., don't add 8 dashboards + 10 JKL dashboards to claim 18+).

TOOL/SKILL ACCURACY (CRITICAL):
- ONLY include tools and technologies that appear in the candidate's skills data above.
- NEVER add tools the candidate hasn't listed: no MATLAB, no Databricks, no Spark (unless PySpark), no Kubernetes, no Airflow, no dbt, no Looker, no BigQuery.
- If the posting asks for a tool not in the candidate's skills, do NOT add it. Instead, emphasize the closest matching tool the candidate actually has.

KEYWORD MIRRORING (CRITICAL):
- Extract 5-10 exact phrases from the job posting and weave them verbatim into bullets and summary
- If the posting says "data quality and reliability," use those exact words — not "data accuracy"
- If the posting says "structured and unstructured data," use that exact phrase
- If the posting says "production deployments," use that exact phrase
- The goal is 80%+ keyword match with the posting's specific language

CANADIAN MARKET SPECIFICS:
- 1 page for <10 years experience (this candidate)
- No photos, age, marital status, or religion
- Include city only (Vancouver, BC), not full address
- LinkedIn URL is expected (92% of Canadian recruiters check)
- PGWP eligibility can be mentioned if posting asks about work authorization

2026 AI-RESUME DIFFERENTIATION (CRITICAL):
- 67% of HR leaders say AI-generated resumes slow hiring. 65% say they make it harder to assess skills.
- To stand out: NAME specific systems touched (apps, platforms, environments), not generic descriptions
- Show PROOF over PHRASING: specific database names (PostgreSQL, MongoDB), specific SQL features (CTEs, window functions, joins across 500K+ rows), specific deployment targets (Docker, Hugging Face Spaces, Streamlit Cloud)
- Signal collaboration: mention who you worked with (cross-functional teams, senior leadership, NOC teams, marketing teams) — not just what you did alone
- Data analysts who include a GitHub/portfolio link advance to interview at 2x the rate (Hired.com 2024 survey)

${pr}

SELECTION RULES:
- include_airtel: true ONLY if posting values telecom, engineering, monitoring, KPIs, or emphasizes Canadian work experience
- include_writer: true ONLY if posting mentions technical writing, content creation, communication, documentation, or copywriting
- certifications: select 1-3 most relevant from: ai_practice (AI/ML/data science roles), fin_accounting (finance/banking/analyst/healthcare/operations roles with financial data), semrush_seo (marketing/SEO/digital roles), linkedin_writing (writing/content roles). Always include ai_practice for any tech/data role. Include fin_accounting for ANY role involving financial data, billing, transactions, P&L, or operational metrics.
- ALWAYS include freelance and jkl (Jonathan Kings Limited) — they are core experience
- ALWAYS include huawei — it shows engineering background
- For huawei: select the MOST relevant bullet: use "diagnostics" (data-driven diagnostic workflows, 15% failure reduction) for data quality / engineering / monitoring roles, use "reports" (technical reports for leadership) for stakeholder / communication / BI roles
- For jkl: select 3-4 best bullets matching the posting from: jkl_dashboards, jkl_reporting, jkl_python, jkl_crm, jkl_supply, jkl_stakeholder
- Rewrite bullet text to echo the posting's exact terminology and keywords while keeping metrics accurate
- Order projects by relevance to the posting, not by date

=== ROLE-SPECIFIC TAILORING RULES (detect role type from posting and apply) ===

IF ROLE IS "DATA ANALYST" or "QUANTITATIVE ANALYST" or "ANALYTICS":
- Skills priority order: SQL (Advanced), Python (Advanced), Tableau/Power BI (Advanced), Excel, R, statistical analysis
- Must-use keywords: data analysis, dashboards, KPIs, stakeholder communication, data-driven decisions, ETL, data quality, reporting
- Lead with: JKL dashboards bullet, freelance SQL/dashboards bullets
- Best projects: Streamlit dashboard, bicycle accidents (847K records), Steeves, Nashville housing
- Emphasize: business impact, stakeholder communication, data visualization, cross-functional collaboration
- Avoid leading with: deep learning, neural networks, computer vision (too ML-heavy for analyst roles)

IF ROLE IS "DATA SCIENTIST":
- Skills priority: Python (Advanced), R (Proficient), scikit-learn, PyTorch, TensorFlow, statistical modeling, ML algorithms
- Must-use keywords: machine learning, predictive modeling, statistical analysis, A/B testing, feature engineering, model evaluation, hypothesis testing
- Lead with: freelance churn models bullet, time-series forecasting bullet
- Best projects: bike sharing (R2>0.91), credit risk SHAP, heart disease multi-model, Nashville housing (R2=0.9481)
- Emphasize: model building, experimentation, statistical rigor, research methodology
- Include coursework: Machine Learning, Statistical Modeling, Deep Learning, Predictive Analytics

IF ROLE IS "ML ENGINEER" or "MACHINE LEARNING ENGINEER" or "AI ENGINEER":
- Skills priority: Python (Advanced), PyTorch, TensorFlow, Docker, AWS, FastAPI, Git, CI/CD concepts
- Must-use keywords: model deployment, production ML, deep learning, computer vision, NLP, API development, containerization, MLOps
- Lead with: freelance churn models, JKL Python scripts
- Best projects: FruitNet (Faster R-CNN, Docker, HuggingFace), Intel ResNet-18, text classification ULMFiT, LiDAR capstone
- Emphasize: deployment, production systems, model serving, Docker, API design, scalability
- Show GitHub link prominently — ML engineers check code

IF ROLE IS "BUSINESS ANALYST" or "BI ANALYST" or "BUSINESS INTELLIGENCE":
- Skills priority: Tableau (Advanced), Power BI (Advanced), Excel (Advanced), SQL, requirements gathering, stakeholder communication
- Must-use keywords: business intelligence, requirements gathering, stakeholder alignment, cross-functional collaboration, KPI development, process improvement, data-driven decisions
- Lead with: JKL stakeholder/dashboards bullets, freelance dashboards/presentations bullets
- Best projects: Steeves (consulting), Cymax demand forecasting, Streamlit dashboard
- Emphasize: business problem solving, stakeholder communication, process improvement, reporting
- Include Financial Accounting certification

IF ROLE IS "FINANCIAL ANALYST" or "QUANT" or "INVESTMENT" or "FINANCE":
- Skills priority: Python (Advanced), SQL (Advanced), R (Proficient), Excel (Advanced, VBA), statistical modeling, time-series forecasting
- Must-use keywords: financial modeling, risk analysis, quantitative analysis, forecasting, data quality, investment analytics, portfolio analysis, regression analysis, time-series
- Lead with: JKL financial reporting bullet, freelance time-series bullet, freelance churn (risk modeling)
- Best projects: credit risk SHAP, Nashville housing (regression), bike sharing (forecasting)
- Include BOTH certifications: ai_practice AND fin_accounting
- Emphasize: financial data, risk reduction, forecasting accuracy, P&L, data quality, large datasets
- Mirror finance-specific language from posting (e.g., "alpha," "data assets," "investment engine," "data quality")

IF ROLE IS "DATA ENGINEER" or "ANALYTICS ENGINEER":
- Skills priority: SQL (Advanced), Python (Advanced), AWS (S3, Glue), PySpark, ETL, Docker, Git
- Must-use keywords: ETL pipelines, data pipelines, data quality, data validation, cloud infrastructure, big data, data modeling, production deployment
- Lead with: freelance SQL/ETL bullet, JKL Python scripts bullet
- Best projects: AWS Glue PySpark, Streamlit dashboard, LiDAR capstone (data processing)
- Emphasize: pipeline building, data quality, automation, cloud, scalability, reliability

IF ROLE IS "MARKETING ANALYST" or "PRODUCT ANALYST" or "GROWTH ANALYST":
- Skills priority: SQL, Python, Tableau, A/B testing, Google Analytics concepts, Excel
- Must-use keywords: A/B testing, customer segmentation, conversion rates, campaign performance, funnel analysis, cohort analysis, user behavior, retention
- Lead with: freelance churn bullet, JKL CRM bullet, freelance dashboards
- Best projects: credit risk (churn), marketing campaign response, subscription renewal
- Include semrush_seo certification
- Emphasize: customer analytics, retention, segmentation, campaign optimization

IF ROLE IS "TECHNICAL WRITER" or "CONTENT" or "DOCUMENTATION":
- include_writer: true
- Skills priority: Technical writing, documentation, APA formatting, Quarto, Markdown, stakeholder communication
- Lead with: writer bullets, freelance presentations bullet
- Best projects: Steeves (consulting documentation), Cymax (business proposal)
- Include linkedin_writing certification

DEFAULT (if role type unclear):
- Balance between analyst and scientist positioning
- Include a mix of SQL, Python, visualization, and ML skills
- Select projects that show breadth: one dashboard, one ML model, one deployment

OVERVIEW RULES (mandatory — this is CRITICAL):
- The overview describes the CANDIDATE, not the job. NEVER describe what the role requires. NEVER start with "This role requires" or "The candidate needs."
- MUST be written in FIRST PERSON PERSPECTIVE about Joseph. It is HIS summary, selling HIM.
- MUST start with: "[Exact Job Title from posting] with 6+ years of experience in [2-3 matching skill areas]."
- SECOND sentence: strongest quantified achievement that matches the posting (e.g., "Built predictive models reducing client risk by 12% and automated dashboards eliminating 10+ hours/week of manual reporting.")
- THIRD sentence: what sets him apart — unique combination of skills, domain expertise, or capstone/deployment experience relevant to the posting (e.g., "Combines deep machine learning expertise with hands-on deployment experience including Docker, FastAPI, and Hugging Face Spaces.")
- You MAY mention GPA (3.8) if relevant, but NEVER say "Currently completing" or "Currently pursuing" — instead say "MS Data Analytics candidate" or just reference skills/expertise.
- BAD example: "This role requires deep quantitative analysis and financial domain expertise." 
- BAD example: "Currently completing MS in Data Analytics (GPA 3.8) at Northeastern University."
- GOOD example: "Data Analyst with 6+ years of experience in Python, SQL, and financial analytics. Engineered predictive models reducing client risk exposure by 12% and built 10+ automated Power BI dashboards for revenue forecasting. Combines hands-on machine learning deployment experience with deep expertise in business intelligence and stakeholder communication."

COURSEWORK SELECTION:
- Select 6-8 most relevant courses from the candidate's coursework array that match the posting
- Return as coursework array in JSON

KEY HIGHLIGHTS:
- Generate exactly 3 bullet-point highlights — the candidate's top quantified wins most relevant to the posting
- Format: short, punchy, numbers-forward (e.g., "Reduced client risk 12% through ML prediction models")
- CRITICAL: These must be UNIQUE summaries, NOT copy-pasted from experience bullets. Condense and reframe — combine multiple achievements or highlight a different angle. If a highlight reads identically to any experience bullet, rewrite it.
- Each highlight should cover a DIFFERENT strength area (e.g., one technical, one business impact, one scale/volume)

SKILLS PROFICIENCY:
- For the top 3-5 most important skills, add proficiency level in parentheses: (Advanced), (Proficient), or (Intermediate)
- Python (Advanced), SQL (Advanced), R (Proficient), Tableau (Advanced), Power BI (Advanced) are the defaults — adjust if posting emphasizes different tools
- This helps ATS match keywords like "advanced SQL" or "proficient in Python"

MATCH SCORE:
- Count how many required skills/qualifications from the posting are matched by the candidate
- Return as match_score (0-100) and matched_keywords (array of matched terms)

RESPOND WITH ONLY VALID JSON (no markdown, no explanation):
{"overview":"string","target_title":"string","skills":[{"label":"string","items":"string"}],"coursework":["string"],"key_highlights":["string","string","string"],"match_score":number,"matched_keywords":["string"],"include_airtel":boolean,"include_writer":boolean,"certifications":["cert_id"],"freelance_bullets":["bullet_id"],"jkl_bullets":["bullet_id"],"huawei_bullets":["bullet_id"],"airtel_bullets":["bullet_id"],"writer_bullets":["bullet_id"],"projects":["project_id"],"filename_suffix":"string"}`;
}

// Research-backed cover letter system prompt (2026 best practices)
// Sources: ResumeLab/UVA 2025, Resume Genius 2025, Interview Guys 2026, Kickresume 2026
// Format: Problem-Solution (gold standard per Interview Guys 2026 analysis)
// Length: 250-350 words (70% of HMs prefer 250-400, 49% prefer half-page)
// Structure: 5-block (Header, Greeting, Hook, Body, Close)
var COVER_SYS = `You are an elite cover letter writer using the PROBLEM-SOLUTION format, the gold standard for 2026 (per Interview Guys research of 80+ studies). 94% of hiring managers say cover letters influence decisions. 80% detect and reject generic AI content. Every word must be authentic and specific.

CANDIDATE:
- Name: ${MD.name} | ${MD.location} | ${MD.email} | ${MD.phone}
- LinkedIn: ${MD.linkedin} | GitHub: ${MD.github}
- Authorized to work in Canada (PGWP eligible)
- MS Data Analytics, Northeastern University Vancouver (graduating Jun 2026)
- B.Eng Electrical & Electronic Engineering, Obafemi Awolowo University Nigeria
- 6+ years analytics: Full-time Data Analyst at Jonathan Kings Limited (logistics/retail/international business, 2021-2023: dashboards, Python analysis of 50K+ transactions, financial reporting, supply chain KPIs, $30K savings identified), freelance data analyst since 2019 (churn models -12% risk, Power BI/Tableau dashboards -25% manual effort, SQL pipelines 500K+ records, R time-series forecasting +18%), Huawei intern (diagnostics -15% failures)
- Key projects: LiDAR point cloud with Lumotive (ROS2), Faster R-CNN FruitNet (4485 imgs, 11 classes, Docker+HuggingFace), bike sharing ML (R2>0.91, K-Means, PCA, Q-Learning), credit risk SHAP, ULMFiT text classification, Intel ResNet-18 transfer learning (F1=0.935), Nashville housing gradient boosting (R2=0.9481), JobForge React app, ResumeFit Netlify app, Amazon review Streamlit dashboard (500K rows), Steeves & Associates resource allocation (R/ggplot2), Nigerian election Chart.js dashboard, bicycle accidents Plotly dashboard (847K records), AWS Glue PySpark ETL, Cymax demand forecasting, workforce scheduling optimization
- Skills: Python, R, SQL, JavaScript, PyTorch, TensorFlow, Scikit-learn, fastai, Docker, AWS, Tableau, Power BI, Streamlit, ggplot2, Git, FastAPI, ROS2

PROBLEM-SOLUTION FORMAT (mandatory structure):

PARAGRAPH 1 - THE HOOK (2-3 sentences):
Identify a specific PROBLEM or CHALLENGE the company faces based on the job posting (their growth area, technical challenge, or business need). Show you understand it. Reference something concrete about the company. NEVER use "I am writing to express my interest" or "I am excited to apply" or any variation. Start with the company's challenge or an achievement.

PARAGRAPH 2 - THE SOLUTION (3-4 sentences):
Present yourself as the solution. Connect your 2-3 most relevant experiences DIRECTLY to their stated needs. Use specific metrics (12% risk reduction, 15% failure reduction, R2>0.91, 500K+ records). Mirror exact keywords from the job posting naturally.

PARAGRAPH 3 - THE FIT (2-3 sentences):
Explain WHY you specifically (not just anyone with these skills) are right for THIS company. Connect your engineering + analytics background to their unique challenges. Show genuine understanding of what the team does or the company's mission.

PARAGRAPH 4 - THE CLOSE (1-2 sentences):
Confident, forward-looking. Reference a specific aspect of the role you're eager to tackle. End with clear next step. NEVER use "I would welcome the opportunity" or "Thank you for considering my application."

RULES:
- 250-350 words TOTAL (70% of HMs prefer this range)
- NEVER say "Currently completing" or "Currently pursuing" a degree. Instead reference skills, expertise, or say "MS Data Analytics candidate" if education must be mentioned.
- Do NOT include "GPA 3.8" in the cover letter body — GPA belongs on the resume only.
- Every sentence answers "Why should we hire this person?"
- Mirror 3-5 keywords from the posting naturally
- Tone: Confident, specific, human. Like a sharp colleague wrote it, not a template
- Sign as "${MD.name}"

ONLY valid JSON, no markdown:
{"company_name":"str","role_title":"str","date":"April 23, 2026","salutation":"Dear [name or Hiring Manager],","body":"str (use \\n\\n between paragraphs)","closing":"Sincerely,"}`;

// ===== TECHY COLOR SCHEME =====
var C = {
  bg: "#050609", surface: "#0c0e16", surfaceG: "rgba(15,18,30,0.7)",
  border: "#141830", borderG: "rgba(79,142,247,0.08)",
  accent: "#00ff9d", accentD: "#00cc7a", accentG: "rgba(0,255,157,0.06)",
  neon: "#00ff9d", neonG: "rgba(0,255,157,0.06)",
  purple: "#a855f7", purpleG: "rgba(168,85,247,0.06)",
  amber: "#fbbf24", amberG: "rgba(251,191,36,0.06)",
  text: "#e0e6f0", textM: "#7a85a0", textD: "#4a5268",
  success: "#00ff9d", error: "#ff4a6e", errorG: "rgba(255,74,110,0.06)",
  glow: "0 0 20px rgba(0,255,157,0.15)"
};

// ===== CERTIFICATION TRACKER DATA =====
var CERTS = [
  { name: "Google Analytics (GA4)", issuer: "Google Skillshop", cost: "$0", time: "3-5 hrs", url: "https://skillshop.withgoogle.com", week: 1, status: "in_progress" },
  { name: "HubSpot Data Analytics", issuer: "HubSpot Academy", cost: "$0", time: "4-6 hrs", url: "https://academy.hubspot.com/courses", week: 1, status: "pending" },
  { name: "Google Data Analytics", issuer: "Coursera", cost: "$0", time: "2-3 wks", url: "https://www.coursera.org/professional-certificates/google-data-analytics", week: 2, status: "pending" },
  { name: "SQL Associate", issuer: "DataCamp", cost: "$25", time: "1-2 days", url: "https://www.datacamp.com/certification", week: 3, status: "pending" },
  { name: "Data Analyst Associate", issuer: "DataCamp", cost: "incl.", time: "1 week", url: "https://www.datacamp.com/certification/data-analyst", week: 4, status: "pending" },
  { name: "Data Scientist Associate", issuer: "DataCamp", cost: "incl.", time: "1-2 wks", url: "https://www.datacamp.com/certification/data-scientist", week: 5, status: "pending" },
  { name: "AWS Cloud Practitioner", issuer: "AWS", cost: "$100", time: "2-4 wks", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", week: 7, status: "pending" },
  { name: "Microsoft PL-300 Power BI", issuer: "Microsoft", cost: "$165", time: "3-5 wks", url: "https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/", week: 10, status: "future" },
  { name: "Tableau Desktop Specialist", issuer: "Salesforce", cost: "$100", time: "2-3 wks", url: "https://www.tableau.com/learn/certification/desktop-specialist", week: 12, status: "future" }
];

// ===== QUOTES API =====
var QUOTE_APIS = [
  "https://api.quotable.io/random?tags=technology|success|motivational|wisdom",
  "https://zenquotes.io/api/random"
];

var TECH_FACTS = [
  "92% of Canadian tech recruiters check LinkedIn before calling a candidate.",
  "The average recruiter spends 6-7 seconds on the first scan of a resume.",
  "Data analytics roles in Vancouver grew 34% year-over-year in 2025.",
  "Python is the #1 most-requested skill in Canadian data job postings.",
  "Companies using ATS reject 75% of resumes before a human ever sees them.",
  "PGWP holders have a 23% higher interview callback rate than work-permit seekers.",
  "Candidates who tailor their resume to each posting are 3x more likely to get interviews.",
  "The median Data Analyst salary in Vancouver is $85,000 CAD (2026).",
  "SQL appears in 94% of data analyst job postings in Canada.",
  "Cover letters increase interview chances by 50% for entry-level positions.",
  "Remote-friendly data roles in Canada increased by 41% since 2024.",
  "Candidates with 3+ certifications get 27% more recruiter attention.",
  "GitHub portfolio links increase callback rates by 35% for technical roles.",
  "The Canadian tech sector added 65,000+ jobs in 2025 alone.",
  "Machine learning engineer is the fastest-growing role in BC (2024-2026).",
  "Northeastern University grads have a 91% employment rate within 6 months."
];

export default function App() {
  var rRef = useRef(null);
  var cRef = useRef(null);
  var qaRef = useRef(null);

  var s = useState; // shorthand
  var _mode = s("text"), mode = _mode[0], setMode = _mode[1];
  var _posting = s(""), posting = _posting[0], setPosting = _posting[1];
  var _url = s(""), url = _url[0], setUrl = _url[1];
  var _instr = s(""), instr = _instr[0], setInstr = _instr[1];
  var _pages = s(1), pages = _pages[0], setPages = _pages[1];
  var _genType = s("resume"), genType = _genType[0], setGenType = _genType[1];
  var _status = s("idle"), status = _status[0], setStatus = _status[1];
  var _prog = s(""), prog = _prog[0], setProg = _prog[1];
  var _err = s(""), err = _err[0], setErr = _err[1];
  var _res = s(null), res = _res[0], setRes = _res[1];
  var _cov = s(null), cov = _cov[0], setCov = _cov[1];
  var _tab = s("resume"), tab = _tab[0], setTab = _tab[1];
  var _copied = s(false), copied = _copied[0], setCopied = _copied[1];
  var _covLoading = s(false), covLoading = _covLoading[0], setCovLoading = _covLoading[1];
  var _refineText = s(""), refineText = _refineText[0], setRefineText = _refineText[1];
  var _refining = s(false), refining = _refining[0], setRefining = _refining[1];

  // Mock interview state
  var _interviewQs = s([]), interviewQs = _interviewQs[0], setInterviewQs = _interviewQs[1];
  var _interviewLoading = s(false), interviewLoading = _interviewLoading[0], setInterviewLoading = _interviewLoading[1];
  var _myAnswer = s(""), myAnswer = _myAnswer[0], setMyAnswer = _myAnswer[1];
  var _answerFeedback = s(null), answerFeedback = _answerFeedback[0], setAnswerFeedback = _answerFeedback[1];
  var _activeQ = s(0), activeQ = _activeQ[0], setActiveQ = _activeQ[1];

  // Follow-up email state
  var _emailType = s("followup"), emailType = _emailType[0], setEmailType = _emailType[1];
  var _emailResult = s(""), emailResult = _emailResult[0], setEmailResult = _emailResult[1];
  var _emailLoading = s(false), emailLoading = _emailLoading[0], setEmailLoading = _emailLoading[1];

  // Batch scoring state
  var _batchUrls = s(""), batchUrls = _batchUrls[0], setBatchUrls = _batchUrls[1];
  var _batchResults = s([]), batchResults = _batchResults[0], setBatchResults = _batchResults[1];
  var _batchLoading = s(false), batchLoading = _batchLoading[0], setBatchLoading = _batchLoading[1];

  // Salary state
  var _salaryData = s(null), salaryData = _salaryData[0], setSalaryData = _salaryData[1];
  var _salaryLoading = s(false), salaryLoading = _salaryLoading[0], setSalaryLoading = _salaryLoading[1];


  function getExp(id) {
    for (var i = 0; i < MD.experience.length; i++) {
      if (MD.experience[i].id === id) return MD.experience[i];
    }
    return null;
  }

  function getBul(expId, ids) {
    var exp = getExp(expId);
    if (!exp) return [];
    var result = [];
    for (var i = 0; i < ids.length; i++) {
      for (var j = 0; j < exp.bullets.length; j++) {
        if (exp.bullets[j].id === ids[i]) result.push(exp.bullets[j]);
      }
    }
    return result.length > 0 ? result : exp.bullets.slice(0, 3);
  }

  function getProj(id) {
    for (var i = 0; i < MD.projects.length; i++) {
      if (MD.projects[i].id === id) return MD.projects[i];
    }
    return null;
  }

  async function apiCall(system, msg, maxTok) {
    var r = await fetch("/api/tailor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: maxTok || 1500, system: system, messages: [{ role: "user", content: msg }] })
    });
    var d = await r.json();
    if (d.error) throw new Error(d.error.message || JSON.stringify(d.error));
    var text = "";
    if (d.content) {
      for (var i = 0; i < d.content.length; i++) {
        if (d.content[i].text) text += d.content[i].text;
      }
    }
    return text.replace(/```json/g, "").replace(/```/g, "").trim();
  }

  // ===== Q&A STATE =====
  var _questions = s([{q:"",a:""}]), questions = _questions[0], setQuestions = _questions[1];
  var _qaGenerated = s(false), qaGenerated = _qaGenerated[0], setQaGenerated = _qaGenerated[1];
  var _qaLoading = s(false), qaLoading = _qaLoading[0], setQaLoading = _qaLoading[1];

  // ===== CHAT STATE =====
  var _chatMsgs = s([]), chatMsgs = _chatMsgs[0], setChatMsgs = _chatMsgs[1];
  var _chatInput = s(""), chatInput = _chatInput[0], setChatInput = _chatInput[1];
  var _chatLoading = s(false), chatLoading = _chatLoading[0], setChatLoading = _chatLoading[1];

  // ===== DASHBOARD STATE =====

  function reset() {
    setStatus("idle"); setRes(null); setCov(null); setPosting(""); setUrl("");
    setErr(""); setProg(""); setInstr(""); setTab("resume"); setCopied(false);
    setCovLoading(false); setGenType("resume"); setRefineText(""); setRefining(false);
    setQuestions([{q:"",a:""}]); setQaGenerated(false); setQaLoading(false);
    setChatMsgs([]); setChatInput(""); setView("build");
  }

  // ===== HANDLERS =====
  async function handleGo() {
    setErr(""); setStatus("loading"); setProg("Preparing...");
    try {
      var postText = posting;
      if (mode === "url" && url) {
        setProg("Fetching job posting...");
        var sr = await fetch("/api/scrape", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: url }) });
        var sd = await sr.json();
        if (sd.error) throw new Error(sd.error);
        postText = sd.text;
        setPosting(postText);
      }
      if (!postText || postText.length < 30) throw new Error("Please paste a job posting (at least 30 characters).");
      setProg("Tailoring resume...");
      var extra = instr.trim() ? "\nADDITIONAL INSTRUCTIONS: " + instr.trim() : "";
      var raw = await apiCall(makeResumeSys(pages), "Job posting:\n" + postText + extra, pages === 2 ? 2000 : 1500);
      var p;
      try { p = JSON.parse(raw); } catch(e2) { throw new Error("Resume parse failed. Try again."); }
      setRes(p);
      var cp = null;
      if (genType === "both") {
        setProg("Writing cover letter...");
        var cRaw = await apiCall(COVER_SYS, "Job posting:\n" + postText + extra + "\n\nResume overview: " + p.overview + "\nTarget role: " + p.target_title, 1500);
        try { cp = JSON.parse(cRaw); } catch(e3) { throw new Error("Cover letter parse failed."); }
        setCov(cp);
      }
      setStatus("done"); setProg(""); setView("results");

    } catch(e) { setErr(e.message); setStatus("idle"); setProg(""); }
  }

  async function handleCoverAfter() {
    setCovLoading(true); setErr("");
    try {
      var cRaw = await apiCall(COVER_SYS, "Job posting:\n" + posting + "\n\nResume overview: " + res.overview + "\nTarget: " + res.target_title, 1500);
      var cp;
      try { cp = JSON.parse(cRaw); } catch(e2) { throw new Error("Cover letter parse failed."); }
      setCov(cp);
    } catch(e) { setErr(e.message); }
    setCovLoading(false);
  }

  async function handleRefine() {
    if (!refineText.trim()) return;
    setRefining(true); setErr("");
    var allInstr = (instr.trim() ? instr.trim() + "\n" : "") + refineText.trim();
    try {
      var raw = await apiCall(makeResumeSys(pages), "Job posting:\n" + posting + "\nADDITIONAL INSTRUCTIONS: " + allInstr, pages === 2 ? 2000 : 1500);
      var p;
      try { p = JSON.parse(raw); } catch(e2) { throw new Error("Resume parse failed."); }
      setRes(p);
      if (cov) {
        var cRaw = await apiCall(COVER_SYS, "Job posting:\n" + posting + "\nADDITIONAL INSTRUCTIONS: " + allInstr + "\n\nResume overview: " + p.overview + "\nTarget: " + p.target_title, 1500);
        var cp;
        try { cp = JSON.parse(cRaw); } catch(e3) { throw new Error("Cover letter parse failed."); }
        setCov(cp);
      }
      setInstr(allInstr); setRefineText("");
      setChatMsgs(function(prev) { return prev.concat([{ role: "system", text: "Resume refined. Ask me to evaluate the updated version." }]); });

    } catch(e) { setErr(e.message); }
    setRefining(false);
  }

  async function handleQA() {
    setQaLoading(true); setErr("");
    try {
      var qs = questions.filter(function(q) { return q.q.trim(); }).map(function(q) { return q.q; });
      if (qs.length === 0) throw new Error("Add at least one question.");
      var qSys = "Answer job application questions for candidate " + MD.name + ". Use their experience and the posting. 2-5 sentences per answer unless simple. JSON: {\"answers\":[\"str\"]}";
      var raw = await apiCall(qSys, "Posting:\n" + posting.slice(0, 3000) + "\n\nQuestions:\n" + qs.map(function(q, i) { return (i + 1) + ". " + q; }).join("\n"), 1200);
      var d;
      try { d = JSON.parse(raw); } catch(e2) { throw new Error("Q&A parse failed."); }
      var newQ = questions.map(function(q, i) { return { q: q.q, a: d.answers && d.answers[i] ? d.answers[i] : "" }; });
      setQuestions(newQ); setQaGenerated(true);
    } catch(e) { setErr(e.message); }
    setQaLoading(false);
  }

  async function handleChat() {
    if (!chatInput.trim() || chatLoading) return;
    var msg = chatInput.trim();
    setChatInput("");
    setChatMsgs(function(prev) { return prev.concat([{ role: "user", text: msg }]); });
    setChatLoading(true);
    try {
      var resumeText = rRef.current ? rRef.current.innerText : "Resume not available";
      var coverText = cRef.current ? "\n\nCover Letter:\n" + cRef.current.innerText : "";
      var chatSys = "You are a career advisor. Evaluate the resume against the job posting. Score out of 10. Be specific.";
      var fullMsg = "RESUME:\n" + resumeText + coverText + "\n\nJOB POSTING:\n" + posting.slice(0, 4000) + "\n\nQuestion: " + msg;
      var r = await fetch("/api/tailor", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1200, system: chatSys, messages: [{ role: "user", content: fullMsg }] })
      });
      var d = await r.json();
      if (d.error) throw new Error(d.error.message || "API error");
      var reply = "";
      if (d.content) { for (var i = 0; i < d.content.length; i++) { if (d.content[i].text) reply += d.content[i].text; } }
      setChatMsgs(function(prev) { return prev.concat([{ role: "assistant", text: reply.trim() }]); });
    } catch(e) {
      setChatMsgs(function(prev) { return prev.concat([{ role: "assistant", text: "Error: " + e.message }]); });
    }
    setChatLoading(false);
  }

  // ===== MOCK INTERVIEW =====
  async function handleGenInterviewQs() {
    setInterviewLoading(true); setInterviewQs([]); setActiveQ(0); setAnswerFeedback(null);
    try {
      var sys = "Generate 8 interview questions for this role. Mix behavioral (STAR), technical, and situational. Based on the job posting AND the candidate resume gaps. JSON: {\"questions\":[{\"q\":\"str\",\"type\":\"behavioral|technical|situational\",\"hint\":\"str\"}]}";
      var raw = await apiCall(sys, "Posting:\n" + posting.slice(0, 3000) + "\n\nCandidate resume:\n" + (rRef.current ? rRef.current.innerText.slice(0, 2000) : res.overview), 1200);
      var d; try { d = JSON.parse(raw); } catch(e2) { throw new Error("Parse failed"); }
      setInterviewQs(d.questions || []);
    } catch(e) { setErr(e.message); }
    setInterviewLoading(false);
  }

  async function handleScoreAnswer() {
    if (!myAnswer.trim()) return;
    setAnswerFeedback(null);
    try {
      var q = interviewQs[activeQ];
      var sys = "Score this interview answer using STAR framework. Give: score (1-10), strengths, improvements, and a model answer. JSON: {\"score\":0,\"strengths\":\"str\",\"improvements\":\"str\",\"model_answer\":\"str\"}";
      var raw = await apiCall(sys, "Question: " + q.q + "\nCandidate answer: " + myAnswer + "\nRole: " + (res.target_title || "") + "\nCandidate background: " + (res.overview || ""), 800);
      var d; try { d = JSON.parse(raw); } catch(e2) { throw new Error("Parse failed"); }
      setAnswerFeedback(d);
    } catch(e) { setErr(e.message); }
  }

  // ===== FOLLOW-UP EMAIL =====
  async function handleGenEmail() {
    setEmailLoading(true); setEmailResult("");
    try {
      var sys = "Write a professional " + (emailType === "followup" ? "1-week follow-up email after applying" : emailType === "thankyou" ? "post-interview thank you email" : "2-week second follow-up email") + ". Keep it 4-6 sentences. Professional but warm. Reference specific role details. Return JUST the email text, no JSON.";
      var raw = await apiCall(sys, "Role: " + (res.target_title || "") + "\nCompany: " + ((cov && cov.company_name) || "") + "\nCandidate: " + MD.name + "\nKey skill match: " + (res.overview || "").slice(0, 200), 500);
      setEmailResult(raw);
    } catch(e) { setErr(e.message); }
    setEmailLoading(false);
  }

  // ===== BATCH SCORING =====
  async function handleBatchScore() {
    var urls = batchUrls.split("\n").map(function(u) { return u.trim(); }).filter(function(u) { return u.startsWith("http"); });
    if (urls.length === 0) return;
    setBatchLoading(true); setBatchResults([]);
    var results = [];
    for (var i = 0; i < Math.min(urls.length, 5); i++) {
      try {
        var sr = await fetch("/api/scrape", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: urls[i] }) });
        var sd = await sr.json();
        if (sd.error) { results.push({ url: urls[i], error: sd.error }); continue; }
        var sys = "Score this job against the candidate. Return JSON: {\"title\":\"str\",\"company\":\"str\",\"score\":0,\"verdict\":\"Apply now|Good fit|Stretch role|Skip\",\"reason\":\"str\"}";
        var raw = await apiCall(sys, "Job posting:\n" + sd.text.slice(0, 2000) + "\n\nCandidate: " + JSON.stringify({ name: MD.name, skills: MD.skills, experience: MD.experience.length + " roles", projects: MD.projects.length + " projects" }), 500);
        var d; try { d = JSON.parse(raw); } catch(e2) { d = { title: "Unknown", score: 0, verdict: "Error", reason: "Parse failed" }; }
        d.url = urls[i];
        results.push(d);
      } catch(e) { results.push({ url: urls[i], error: e.message }); }
    }
    setBatchResults(results);
    setBatchLoading(false);
  }

  // ===== SALARY LOOKUP =====
  async function handleSalaryLookup() {
    setSalaryLoading(true); setSalaryData(null);
    try {
      var sys = "Provide salary data for this role in Vancouver, Canada (2026). Include negotiation tips. JSON: {\"role\":\"str\",\"low\":0,\"mid\":0,\"high\":0,\"currency\":\"CAD\",\"source\":\"str\",\"tips\":[\"str\"],\"negotiation_script\":\"str\"}";
      var raw = await apiCall(sys, "Role: " + (res.target_title || "") + "\nCompany: " + ((cov && cov.company_name) || "Unknown") + "\nCandidate experience: 6+ years analytics, MS Data Analytics\nLocation: Vancouver, BC", 800);
      var d; try { d = JSON.parse(raw); } catch(e2) { throw new Error("Parse failed"); }
      setSalaryData(d);
    } catch(e) { setErr(e.message); }
    setSalaryLoading(false);
  }

  function doDownload(ref, filename) {
    if (!ref.current) return;
    var w = window.open("", "_blank");
    w.document.write("<!DOCTYPE html><html><head><title>" + filename + "</title><link href='https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap' rel='stylesheet'><style>*{box-sizing:border-box;margin:0;padding:0}html,body{background:#fff}body{font-family:'DM Sans',sans-serif;padding:40px 52px;color:#1a1a1a;line-height:1.5;max-width:800px;margin:0 auto}a{color:#1E3A5F}@media print{body{padding:0}@page{margin:0.5in}}</style></head><body>" + ref.current.innerHTML + "</body></html>");
    w.document.close();
    setTimeout(function() { w.print(); }, 600);
  }

  function doCopy(ref) {
    if (!ref.current) return;
    navigator.clipboard.writeText(ref.current.innerText);
    setCopied(true); setTimeout(function() { setCopied(false); }, 2000);
  }

  // ===== RENDER =====
  var iS = { width: "100%", background: C.bg, border: "1px solid " + C.border, borderRadius: 8, padding: "10px 12px", fontSize: 13, fontFamily: "inherit", color: C.text, outline: "none", boxSizing: "border-box" };


  // ===== DASHBOARD STATE =====
  var _view = s("home"), view = _view[0], setView = _view[1];
  var _quote = s({ text: "The best way to predict the future is to build it.", author: "Peter Drucker" }), quote = _quote[0], setQuote = _quote[1];
  var _fact = s(TECH_FACTS[Math.floor(Math.random() * TECH_FACTS.length)]), fact = _fact[0], setFact = _fact[1];
  var _quoteLoading = s(false), quoteLoading = _quoteLoading[0], setQuoteLoading = _quoteLoading[1];
  var _certStatuses = s(function() { try { var d = localStorage.getItem("rf_certs"); return d ? JSON.parse(d) : {}; } catch(e) { return {}; } }), certStatuses = _certStatuses[0], setCertStatuses = _certStatuses[1];
  var _clock = s(new Date()), clock = _clock[0], setClock = _clock[1];
  var _mounted = s(function() { setTimeout(function() { fetchQuoteLazy(); }, 500); setInterval(function() { setClock(new Date()); }, 1000); return true; }), mounted = _mounted[0];

  function fetchQuoteLazy() { fetchQuote(); }
  function fetchQuote() {
    setQuoteLoading(true);
    fetch("https://zenquotes.io/api/random")
      .then(function(r) { return r.json(); })
      .then(function(d) {
        if (d && d[0]) setQuote({ text: d[0].q, author: d[0].a });
        setQuoteLoading(false);
      })
      .catch(function() {
        // Fallback to local quotes
        var fallback = [
          { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
          { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
          { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
          { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
          { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
          { text: "First, solve the problem. Then, write the code.", author: "John Johnson" }
        ];
        setQuote(fallback[Math.floor(Math.random() * fallback.length)]);
        setQuoteLoading(false);
      });
  }

  function refreshFact() { setFact(TECH_FACTS[Math.floor(Math.random() * TECH_FACTS.length)]); }

  function toggleCert(name) {
    var next = Object.assign({}, certStatuses);
    if (next[name] === "done") { next[name] = ""; }
    else { next[name] = "done"; }
    setCertStatuses(next);
    try { localStorage.setItem("rf_certs", JSON.stringify(next)); } catch(e) {}
  }

  function goHome() { setView("home"); }

  // Override reset to set view
  // reset already includes setView("build")


  // ===== STYLES =====
  var iS = { width: "100%", background: "rgba(5,6,9,0.8)", border: "1px solid " + C.border, borderRadius: 8, padding: "10px 12px", fontSize: 13, fontFamily: "'JetBrains Mono','DM Sans',monospace", color: C.text, outline: "none", boxSizing: "border-box" };
  var glassCard = { background: C.surfaceG, border: "1px solid " + C.borderG, borderRadius: 14, padding: "18px 20px" };
  var neonBtn = function(color, disabled) { return { padding: "8px 18px", borderRadius: 8, border: "1px solid " + (disabled ? C.border : color), background: disabled ? "transparent" : "rgba(" + (color === C.accent ? "0,255,157" : color === C.neon ? "0,255,157" : color === C.purple ? "168,85,247" : "251,191,36") + ",0.08)", color: disabled ? C.textD : color, fontSize: 12, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", fontFamily: "inherit", transition: "all 0.2s" }; };

  var daysToGrad = Math.max(0, Math.ceil((new Date("2026-06-28") - new Date()) / 86400000));
  var completedCerts = Object.keys(certStatuses).filter(function(k) { return certStatuses[k] === "done"; }).length;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'DM Sans',sans-serif", position: "relative", overflow: "hidden" }}>
      {/* Ambient glow orbs */}
      <div style={{ position: "fixed", top: -200, left: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,157,0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: -200, right: -100, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.03) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* HEADER */}
      <div style={{ borderBottom: "1px solid " + C.border, padding: "12px 20px", background: "rgba(12,14,22,0.9)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={goHome}>
            <svg width="34" height="34" viewBox="0 0 34 34" style={{ flexShrink: 0 }}>
              <circle cx="17" cy="17" r="13" fill="none" stroke="#00ff9d" strokeWidth="1.3" opacity="0.22"/>
              <circle cx="17" cy="17" r="8" fill="none" stroke="#00ff9d" strokeWidth="1.3" opacity="0.48"/>
              <circle cx="17" cy="17" r="3.5" fill="#00ff9d"/>
              <line x1="17" y1="1" x2="17" y2="8" stroke="#00ff9d" strokeWidth="0.8" opacity="0.3"/>
              <line x1="17" y1="26" x2="17" y2="33" stroke="#00ff9d" strokeWidth="0.8" opacity="0.3"/>
              <line x1="1" y1="17" x2="8" y2="17" stroke="#00ff9d" strokeWidth="0.8" opacity="0.3"/>
              <line x1="26" y1="17" x2="33" y2="17" stroke="#00ff9d" strokeWidth="0.8" opacity="0.3"/>
            </svg>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em" }}>ResumeFit</div>
              <div style={{ fontSize: 9, color: C.accent, letterSpacing: "0.08em" }}>{"AI CAREER PLATFORM"}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <div style={{ fontSize: 11, color: C.textD, marginRight: 8 }}>{clock.toLocaleTimeString("en-CA", { hour12: false })}</div>
            <button onClick={goHome} style={neonBtn(view === "home" ? C.accent : C.textD, false)}>{"Dashboard"}</button>
            <button onClick={reset} style={{ padding: "8px 18px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", background: "linear-gradient(135deg, " + C.accent + ", #00cc7a)", color: "#fff", boxShadow: C.glow }}>{"+ New Resume"}</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 20px", position: "relative", zIndex: 1 }}>

        {/* ===== DASHBOARD ===== */}
        {view === "home" && (
          <div>
            {/* Terminal greeting */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: C.accent }}>{""}</div>
              <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>{"Welcome back, "}
                <span style={{ color: C.accent }}>Zeus</span>
              </div>
              <div style={{ fontSize: 12, color: C.textD, marginTop: 2 }}>{daysToGrad + " days until graduation  •  " + new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</div>
            </div>

            {/* Stats grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
              {[
                { label: "Days to Grad", val: daysToGrad, color: C.accent },
                { label: "Certs Completed", val: completedCerts + "/" + CERTS.length, color: C.neon },
                { label: "Certs Remaining", val: CERTS.length - completedCerts, color: C.amber },
                { label: "Total Projects", val: MD.projects.length, color: C.purple }
              ].map(function(st, i) {
                return <div key={i} style={Object.assign({}, glassCard, { position: "relative", overflow: "hidden" })}>
                  <div style={{ position: "absolute", top: -15, right: -15, width: 60, height: 60, borderRadius: "50%", background: "radial-gradient(circle, " + st.color + "11, transparent)", pointerEvents: "none" }} />
                  <div style={{ fontSize: 11, color: C.textM, fontWeight: 500, letterSpacing: "0.03em", marginBottom: 6 }}>{st.label}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: st.color }}>{st.val}</div>
                </div>;
              })}
            </div>

            {/* Quote + Fact row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <div style={Object.assign({}, glassCard, { borderLeft: "3px solid " + C.accent })}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ fontSize: 10, color: C.accent, fontWeight: 600, letterSpacing: "0.04em" }}>{"Daily Quote"}</div>
                  <button onClick={fetchQuote} disabled={quoteLoading} style={{ background: "none", border: "none", color: C.accent, fontSize: 11, cursor: "pointer", fontWeight: 500 }}>{quoteLoading ? "Loading..." : "Refresh"}</button>
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.6, fontStyle: "italic", color: C.text }}>{'"' + quote.text + '"'}</div>
                <div style={{ fontSize: 11, color: C.textM, marginTop: 6 }}>{"— " + quote.author}</div>
              </div>
              <div style={Object.assign({}, glassCard, { borderLeft: "3px solid " + C.neon })}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ fontSize: 10, color: C.neon, fontWeight: 600, letterSpacing: "0.04em" }}>{"Tech Insight"}</div>
                  <button onClick={refreshFact} style={{ background: "none", border: "none", color: C.neon, fontSize: 11, cursor: "pointer", fontWeight: 500 }}>{"Shuffle"}</button>
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.6, color: C.text }}>{fact}</div>
              </div>
            </div>

            {/* Quick actions */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              <button onClick={reset} style={Object.assign({}, glassCard, { cursor: "pointer", textAlign: "left", border: "1px solid rgba(0,255,157,0.15)", transition: "all 0.2s" })}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>Tailor new resume</div>
                <div style={{ fontSize: 12, color: C.textD, marginTop: 4 }}>Paste a posting, get an ATS-optimized resume + cover letter</div>
              </button>
              <div style={Object.assign({}, glassCard, { textAlign: "left", border: "1px solid rgba(0,255,157,0.1)" })}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>Graduation countdown</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: C.neon, marginTop: 4 }}>{daysToGrad}<span style={{ fontSize: 14, color: C.textD }}>{" days"}</span></div>
              </div>
            </div>

            {/* Certification Tracker */}
            <div style={Object.assign({}, glassCard, { marginBottom: 24 })}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>Certification Sprint</div>
                </div>
                <div style={{ fontSize: 12, color: C.neon, fontWeight: 600 }}>{completedCerts + "/" + CERTS.length + " complete"}</div>
              </div>
              {/* Progress bar */}
              <div style={{ width: "100%", height: 6, background: C.border, borderRadius: 3, marginBottom: 16, overflow: "hidden" }}>
                <div style={{ width: (completedCerts / CERTS.length * 100) + "%", height: "100%", background: "linear-gradient(90deg, " + C.accent + ", " + C.neon + ")", borderRadius: 3, transition: "width 0.5s", boxShadow: "0 0 10px " + C.accent }} />
              </div>
              {CERTS.map(function(cert, i) {
                var isDone = certStatuses[cert.name] === "done";
                var statusColor = isDone ? C.neon : cert.status === "in_progress" ? C.accent : cert.status === "future" ? C.textD : C.amber;
                return <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < CERTS.length - 1 ? "1px solid " + C.border : "none" }}>
                  <button onClick={function() { toggleCert(cert.name); }} style={{ width: 22, height: 22, borderRadius: 6, border: "1.5px solid " + statusColor, background: isDone ? statusColor + "18" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 12, color: statusColor, flexShrink: 0 }}>{isDone ? "\u2713" : ""}</button>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 600, color: isDone ? C.textD : C.text, textDecoration: isDone ? "line-through" : "none", cursor: "pointer" }}>{cert.name}</a>
                      <span style={{ fontSize: 9, padding: "1px 7px", borderRadius: 4, background: statusColor + "15", color: statusColor, fontWeight: 500 }}>{isDone ? "DONE" : cert.status === "in_progress" ? "IN PROGRESS" : cert.status === "future" ? "POST-GRAD" : "WEEK " + cert.week}</span>
                    </div>
                    <div style={{ fontSize: 11, color: C.textD, marginTop: 2 }}>{cert.issuer + " • " + cert.cost + " • " + cert.time}</div>
                  </div>
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: C.accent, fontWeight: 600, textDecoration: "none", flexShrink: 0 }}>{"Enroll →"}</a>
                </div>;
              })}
            </div>
          </div>
        )}

        {view === "build" && status !== "done" && (
          <div style={{ background: C.surface, border: "1px solid " + C.border, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ display: "flex", borderBottom: "1px solid " + C.border }}>
              <button onClick={function() { setMode("text"); }} style={{ flex: 1, padding: "12px 0", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", background: mode === "text" ? "rgba(0,255,157,0.08)" : "transparent", color: mode === "text" ? C.accent : C.textD, borderBottom: mode === "text" ? "2px solid " + C.accent : "2px solid transparent" }}>Paste Text</button>
              <button onClick={function() { setMode("url"); }} style={{ flex: 1, padding: "12px 0", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", background: mode === "url" ? "rgba(0,255,157,0.08)" : "transparent", color: mode === "url" ? C.accent : C.textD, borderBottom: mode === "url" ? "2px solid " + C.accent : "2px solid transparent" }}>From URL</button>
            </div>
            <div style={{ padding: 20 }}>
              {mode === "text" ? (
                <textarea value={posting} onChange={function(e) { setPosting(e.target.value); }} placeholder="Paste the full job posting here..." style={Object.assign({}, iS, { minHeight: 150, resize: "vertical" })} />
              ) : (
                <input value={url} onChange={function(e) { setUrl(e.target.value); }} placeholder="https://example.com/jobs/..." style={iS} />
              )}
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, color: C.textM }}>Extra Instructions <span style={{ fontWeight: 400 }}>optional</span></div>
                <textarea value={instr} onChange={function(e) { setInstr(e.target.value); }} placeholder='e.g. "Emphasize Python", "Highlight capstone"' style={Object.assign({}, iS, { minHeight: 60, resize: "vertical" })} />
              </div>
              <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                  <span style={{ color: C.textM }}>Pages:</span>
                  {[1, 2].map(function(n) { return <button key={n} onClick={function() { setPages(n); }} style={{ padding: "4px 12px", borderRadius: 6, border: pages === n ? "1.5px solid " + C.accent : "1px solid " + C.border, background: pages === n ? "rgba(0,255,157,0.08)" : "transparent", color: pages === n ? C.accent : C.textD, cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>{n}</button>; })}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                  <span style={{ color: C.textM }}>Generate:</span>
                  <button onClick={function() { setGenType("resume"); }} style={{ padding: "4px 14px", borderRadius: 6, border: genType === "resume" ? "1.5px solid " + C.accent : "1px solid " + C.border, background: genType === "resume" ? "rgba(0,255,157,0.08)" : "transparent", color: genType === "resume" ? C.accent : C.textD, cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>Resume Only</button>
                  <button onClick={function() { setGenType("both"); }} style={{ padding: "4px 14px", borderRadius: 6, border: genType === "both" ? "1.5px solid " + C.success : "1px solid " + C.border, background: genType === "both" ? "rgba(16,185,129,0.08)" : "transparent", color: genType === "both" ? C.success : C.textD, cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>Resume + Cover Letter</button>
                </div>
              </div>
              <div style={{ marginTop: 20, textAlign: "right" }}>
                <button onClick={handleGo} disabled={status === "loading"} style={{ padding: "12px 32px", borderRadius: 10, border: "none", fontSize: 14, fontWeight: 700, cursor: status === "loading" ? "wait" : "pointer", fontFamily: "inherit", background: "linear-gradient(135deg," + C.accent + ",#00cc7a)", color: "#fff" }}>
                  {status === "loading" ? prog : genType === "both" ? "Generate Both" : "Generate Resume"}
                </button>
              </div>
              {err && <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, background: "rgba(239,68,68,0.06)", color: C.error, fontSize: 12 }}>{err}</div>}
            </div>
          </div>
        )}

        {/* BATCH JOB SCORING */}
        {view === "build" && status !== "done" && (
          <div style={{ marginTop: 16, background: C.surface, border: "1px solid " + C.border, borderRadius: 12, padding: "16px 20px" }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Batch Job Scoring</div>
            <div style={{ fontSize: 12, color: C.textD, marginBottom: 8 }}>Paste up to 5 job URLs (one per line) to score them all against your profile</div>
            <textarea value={batchUrls} onChange={function(e) { setBatchUrls(e.target.value); }} placeholder={"https://example.com/job1\nhttps://example.com/job2\nhttps://example.com/job3"} style={Object.assign({}, iS, { minHeight: 80, resize: "vertical", marginBottom: 8 })} />
            <button onClick={handleBatchScore} disabled={batchLoading} style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: "#8b5cf6", color: "#fff", fontSize: 12, fontWeight: 600, cursor: batchLoading ? "wait" : "pointer", fontFamily: "inherit" }}>{batchLoading ? "Scoring..." : "Score All Jobs"}</button>
            {batchResults.length > 0 && (
              <div style={{ marginTop: 12 }}>
                {batchResults.map(function(r, i) { return <div key={i} style={{ padding: "10px 14px", background: C.bg, border: "1px solid " + C.border, borderRadius: 10, marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0, background: r.score >= 80 ? "rgba(16,185,129,0.08)" : r.score >= 60 ? "rgba(245,158,11,0.08)" : "rgba(239,68,68,0.08)", color: r.score >= 80 ? C.success : r.score >= 60 ? "#f59e0b" : C.error }}>{r.error ? "!" : r.score + "%"}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{r.error ? "Error" : r.title}</div>
                    <div style={{ fontSize: 11, color: C.textD }}>{r.error || (r.company + " — " + r.verdict)}</div>
                    {r.reason && <div style={{ fontSize: 11, color: C.textM, marginTop: 2 }}>{r.reason}</div>}
                  </div>
                </div>; })}
              </div>
            )}
          </div>
        )}


        {/* ===== RESULTS ===== */}
        {view === "results" && status === "done" && res && (
          <div>
            {/* Toolbar */}
            <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center", flexWrap: "wrap" }}>
              <button onClick={function() { setTab("resume"); }} style={{ padding: "8px 20px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", background: tab === "resume" ? C.accent : C.surface, color: tab === "resume" ? "#fff" : C.textM }}>Resume</button>
              {cov && <button onClick={function() { setTab("cover"); }} style={{ padding: "8px 20px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", background: tab === "cover" ? C.accent : C.surface, color: tab === "cover" ? "#fff" : C.textM }}>Cover Letter</button>}
              {qaGenerated && <button onClick={function() { setTab("qa"); }} style={{ padding: "8px 20px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", background: tab === "qa" ? C.accent : C.surface, color: tab === "qa" ? "#fff" : C.textM }}>Q&A</button>}
              <div style={{ flex: 1 }} />
              <span style={{ fontSize: 12, color: C.success }}>{"✓ " + res.target_title}</span>
              <button onClick={function() { doCopy(tab === "resume" ? rRef : tab === "cover" ? cRef : qaRef); }} style={{ padding: "7px 14px", borderRadius: 7, fontSize: 12, cursor: "pointer", fontFamily: "inherit", border: "1px solid " + C.border, background: C.surface, color: C.text }}>{copied ? "Copied!" : "Copy"}</button>
              <button onClick={function() {
                var co = ((cov && cov.company_name) || res.filename_suffix || "company").replace(/[^a-zA-Z0-9]/g, "_");
                var role = (res.target_title || "role").replace(/[^a-zA-Z0-9]/g, "_");
                var fn = tab === "resume" ? "Joseph_Eyinade_" + role + "_" + co : tab === "cover" ? "Cover_Letter_" + co : "QA_" + co;
                doDownload(tab === "resume" ? rRef : tab === "cover" ? cRef : qaRef, fn);
              }} style={{ padding: "7px 14px", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", border: "none", background: C.success, color: "#fff" }}>Download PDF</button>

            </div>

            {/* ATS Score */}
            {res.match_score > 0 && (
              <div style={{ marginBottom: 14, padding: "10px 16px", borderRadius: 10, background: C.surface, border: "1px solid " + C.border, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: res.match_score >= 80 ? C.success : "#f59e0b" }}>{res.match_score}%</div>
                <div><div style={{ fontSize: 12, fontWeight: 600 }}>ATS Match Score</div><div style={{ fontSize: 11, color: C.textD }}>{(res.matched_keywords || []).slice(0, 8).join(", ")}</div></div>
              </div>
            )}

            {/* Resume */}
            {tab === "resume" && (
              <div ref={rRef} style={{ background: "#fff", borderRadius: 12, padding: "28px 36px", color: "#1a1a1a", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.4, boxShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
                <div style={{ textAlign: "center", marginBottom: 2 }}><div style={{ fontSize: 20, fontWeight: 700, color: "#1E3A5F", letterSpacing: "0.05em" }}>{MD.name.toUpperCase()}</div></div>
                <div style={{ textAlign: "center", fontSize: 10.5, color: "#777", marginBottom: 1 }}>{MD.location + " | " + MD.email + " | " + MD.phone}</div>
                <div style={{ textAlign: "center", fontSize: 10.5, marginBottom: 1 }}><a href={"https://www." + MD.linkedin} style={{ color: "#1E3A5F" }}>{MD.linkedin}</a>{" | "}<a href={"https://" + MD.github} style={{ color: "#1E3A5F" }}>{MD.github}</a></div>
                <div style={{ textAlign: "center", fontSize: 9.5, color: "#555", fontStyle: "italic", marginBottom: 8 }}>Authorized to work in Canada (PGWP eligible)</div>

                <div style={{ fontSize: 11, fontWeight: 700, color: "#1E3A5F", borderBottom: "1.5px solid #1E3A5F", paddingBottom: 1, marginTop: 7, marginBottom: 3 }}>PROFESSIONAL SUMMARY</div>
                <p style={{ fontSize: 10.5, color: "#333", margin: "3px 0 2px", lineHeight: 1.5 }}>{res.overview}</p>
                {res.key_highlights && res.key_highlights.map(function(h, i) { return <div key={i} style={{ fontSize: 10, color: "#333", paddingLeft: 10 }}>{"• " + h}</div>; })}

                <div style={{ fontSize: 11, fontWeight: 700, color: "#1E3A5F", borderBottom: "1.5px solid #1E3A5F", paddingBottom: 1, marginTop: 7, marginBottom: 3 }}>TECHNICAL SKILLS</div>
                {res.skills && res.skills.map(function(sk, i) { return <div key={i} style={{ fontSize: 10.5, marginBottom: 1 }}><span style={{ fontWeight: 600 }}>{sk.label}: </span>{sk.items}</div>; })}

                <div style={{ fontSize: 11, fontWeight: 700, color: "#1E3A5F", borderBottom: "1.5px solid #1E3A5F", paddingBottom: 1, marginTop: 7, marginBottom: 3 }}>EDUCATION</div>
                {MD.education.map(function(ed, i) { return <div key={i} style={{ marginBottom: 3 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5 }}><span style={{ fontWeight: 600 }}>{ed.degree}</span><span style={{ color: "#777" }}>{ed.dates}</span></div>
                  <div style={{ fontSize: 10, color: "#777", fontStyle: "italic", display: "flex", justifyContent: "space-between" }}><span>{ed.school}</span>{ed.gpa && <span>{"GPA: " + ed.gpa}</span>}</div>
                  {i === 0 && res.coursework && <div style={{ fontSize: 9.5, color: "#666", marginTop: 1 }}>{"Relevant Coursework: " + res.coursework.join(", ")}</div>}
                </div>; })}

                {res.certifications && res.certifications.length > 0 && <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#1E3A5F", borderBottom: "1.5px solid #1E3A5F", paddingBottom: 1, marginTop: 7, marginBottom: 3 }}>CERTIFICATIONS</div>
                  {res.certifications.map(function(cid) { var cert = null; for (var i = 0; i < MD.certifications.length; i++) { if (MD.certifications[i].id === cid) cert = MD.certifications[i]; } if (!cert) return null; return <div key={cid} style={{ fontSize: 10.5, marginBottom: 1 }}><span style={{ fontWeight: 600 }}>{cert.name}</span><span style={{ color: "#777" }}>{" — " + cert.issuer + " (" + cert.date + ")"}</span></div>; })}
                </div>}

                <div style={{ fontSize: 11, fontWeight: 700, color: "#1E3A5F", borderBottom: "1.5px solid #1E3A5F", paddingBottom: 1, marginTop: 7, marginBottom: 3 }}>PROFESSIONAL EXPERIENCE</div>
                {["freelance", "jkl", "huawei"].map(function(eid) { var exp = getExp(eid); var buls = getBul(eid, res[eid + "_bullets"] || []); if (!exp) return null; return <div key={eid} style={{ marginBottom: 5 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5 }}><span><span style={{ fontWeight: 600 }}>{exp.title}</span><span style={{ color: "#777" }}>{" | " + exp.company}</span></span><span style={{ color: "#777" }}>{exp.dates}</span></div>{buls.map(function(b, i) { return <div key={i} style={{ fontSize: 10, color: "#333", marginTop: 1, paddingLeft: 10, lineHeight: 1.45 }}>{"• " + b.text}</div>; })}</div>; })}
                {res.include_writer && (function() { var exp = getExp("writer"); var buls = getBul("writer", res.writer_bullets || []); if (!exp) return null; return <div style={{ marginBottom: 5 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5 }}><span><span style={{ fontWeight: 600 }}>{exp.title}</span><span style={{ color: "#777" }}>{" | " + exp.company}</span></span><span style={{ color: "#777" }}>{exp.dates}</span></div>{buls.map(function(b, i) { return <div key={i} style={{ fontSize: 10, color: "#333", marginTop: 1, paddingLeft: 10, lineHeight: 1.45 }}>{"• " + b.text}</div>; })}</div>; })()}
                {res.include_airtel && (function() { var exp = getExp("airtel"); var buls = getBul("airtel", res.airtel_bullets || []); if (!exp) return null; return <div style={{ marginBottom: 5 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5 }}><span><span style={{ fontWeight: 600 }}>{exp.title}</span><span style={{ color: "#777" }}>{" | " + exp.company}</span></span><span style={{ color: "#777" }}>{exp.dates}</span></div>{buls.map(function(b, i) { return <div key={i} style={{ fontSize: 10, color: "#333", marginTop: 1, paddingLeft: 10, lineHeight: 1.45 }}>{"• " + b.text}</div>; })}</div>; })()}

                <div style={{ fontSize: 11, fontWeight: 700, color: "#1E3A5F", borderBottom: "1.5px solid #1E3A5F", paddingBottom: 1, marginTop: 7, marginBottom: 3 }}>PROJECTS</div>
                {(res.projects || []).map(function(pid) { var p = getProj(pid); if (!p) return null; return <div key={pid} style={{ marginBottom: 3 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5 }}><span><span style={{ fontWeight: 600 }}>{p.title}</span>{p.url && <span>{" | "}<a href={"https://" + p.url} style={{ color: "#1E3A5F", fontSize: 9.5 }}>{p.url}</a></span>}</span><span style={{ color: "#777", flexShrink: 0, marginLeft: 8 }}>{p.dates}</span></div><div style={{ fontSize: 10, color: "#333", marginTop: 1, paddingLeft: 10 }}>{"• " + p.text}</div></div>; })}
              </div>
            )}

            {/* Cover Letter */}
            {tab === "cover" && cov && (
              <div ref={cRef} style={{ background: "#fff", borderRadius: 12, padding: "28px 36px", color: "#1a1a1a", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6, boxShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
                <div style={{ marginBottom: 18 }}><div style={{ fontSize: 13.5, fontWeight: 700, color: "#1E3A5F" }}>{MD.name}</div><div style={{ fontSize: 11.5, color: "#777" }}>{MD.location + " | " + MD.email + " | " + MD.phone}</div><div style={{ fontSize: 11.5, color: "#777" }}>{MD.linkedin + " | " + MD.github}</div></div>
                <div style={{ fontSize: 12, marginBottom: 14 }}>{cov.salutation}</div>
                <div style={{ fontSize: 12, whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{cov.body}</div>
                <div style={{ fontSize: 12, marginTop: 14 }}>{cov.closing}</div>
                <div style={{ fontSize: 12, fontWeight: 600, marginTop: 6 }}>{MD.name}</div>
              </div>
            )}

            {/* Q&A Tab */}
            {tab === "qa" && qaGenerated && (
              <div ref={qaRef} style={{ background: C.surface, border: "1px solid " + C.border, borderRadius: 12, padding: 20 }}>
                {questions.filter(function(q) { return q.q.trim(); }).map(function(q, i) { return <div key={i} style={{ marginBottom: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{"Q" + (i + 1) + ": " + q.q}</div><div style={{ fontSize: 12.5, color: C.text, padding: "10px 14px", borderLeft: "3px solid " + C.accent, background: "rgba(0,255,157,0.04)", borderRadius: "0 8px 8px 0", lineHeight: 1.6 }}>{q.a}</div></div>; })}
              </div>
            )}

            {/* Generate Cover Letter button */}
            {!cov && tab === "resume" && (
              <div style={{ marginTop: 16 }}><button onClick={handleCoverAfter} disabled={covLoading} style={{ width: "100%", padding: "14px", borderRadius: 10, border: "1px solid " + C.success, background: "rgba(16,185,129,0.06)", color: C.success, fontSize: 14, fontWeight: 600, cursor: covLoading ? "wait" : "pointer", fontFamily: "inherit" }}>{covLoading ? "Writing cover letter..." : "Generate Cover Letter"}</button></div>
            )}

            {/* Q&A Section */}
            <div style={{ marginTop: 20, background: C.surface, border: "1px solid " + C.border, borderRadius: 12, padding: "16px 20px" }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Application Questions</div>
              {questions.map(function(q, i) { return <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                <span style={{ fontSize: 12, color: C.textD, width: 20 }}>{i + 1}.</span>
                <input value={q.q} onChange={function(e) { var v = e.target.value; setQuestions(function(prev) { var n = prev.slice(); n[i] = { q: v, a: n[i].a }; return n; }); }} placeholder="e.g. Why are you interested?" style={Object.assign({}, iS, { flex: 1 })} />
              </div>; })}
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button onClick={function() { setQuestions(function(p) { return p.concat([{q:"",a:""}]); }); }} style={{ padding: "6px 14px", borderRadius: 6, border: "1px solid " + C.border, background: "transparent", color: C.textM, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>+ Add Question</button>
                <button onClick={handleQA} disabled={qaLoading} style={{ padding: "6px 14px", borderRadius: 6, border: "none", background: C.accent, color: "#fff", fontSize: 12, fontWeight: 600, cursor: qaLoading ? "wait" : "pointer", fontFamily: "inherit" }}>{qaLoading ? "Generating..." : "Generate Answers"}</button>
              </div>
            </div>

            {/* Refine Section */}
            <div style={{ marginTop: 16, background: C.surface, border: "1px solid " + C.border, borderRadius: 12, padding: "16px 20px" }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Refine</div>
              <div style={{ display: "flex", gap: 8 }}>
                <textarea value={refineText} onChange={function(e) { setRefineText(e.target.value); }} placeholder='e.g. "More Python emphasis", "Add PGWP mention"' style={Object.assign({}, iS, { flex: 1, minHeight: 50, resize: "vertical" })} />
                <button onClick={handleRefine} disabled={refining || !refineText.trim()} style={{ padding: "10px 20px", borderRadius: 8, border: "none", background: refining ? C.border : C.accent, color: "#fff", fontSize: 12, fontWeight: 600, cursor: refining ? "wait" : "pointer", fontFamily: "inherit", alignSelf: "flex-end" }}>{refining ? "Refining..." : "Refine"}</button>
              </div>
            </div>

            {/* AI Career Advisor */}
            <div style={{ marginTop: 16, background: C.surface, border: "1px solid " + C.border, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "12px 20px", fontSize: 14, fontWeight: 600 }}>AI Career Advisor</div>
              {chatMsgs.length > 0 && (
                <div style={{ maxHeight: 300, overflowY: "auto", padding: "0 20px 8px" }}>
                  {chatMsgs.map(function(m, i) { return <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : m.role === "system" ? "center" : "flex-start", marginBottom: 8 }}>
                    <div style={{ maxWidth: m.role === "system" ? "100%" : "85%", padding: "8px 14px", borderRadius: 10, background: m.role === "user" ? "rgba(0,255,157,0.1)" : m.role === "system" ? "rgba(16,185,129,0.06)" : "rgba(255,255,255,0.03)", border: "1px solid " + (m.role === "user" ? "rgba(0,255,157,0.2)" : m.role === "system" ? "rgba(16,185,129,0.15)" : C.border), fontSize: m.role === "system" ? 11 : 12.5, lineHeight: 1.6, color: m.role === "system" ? C.success : C.text, whiteSpace: "pre-wrap", textAlign: m.role === "system" ? "center" : "left" }}>{m.text}</div>
                  </div>; })}
                </div>
              )}
              <div style={{ padding: "8px 20px 16px", display: "flex", gap: 8 }}>
                <input value={chatInput} onChange={function(e) { setChatInput(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter") handleChat(); }} placeholder="Ask about fit, gaps, or interview prep..." style={Object.assign({}, iS, { flex: 1 })} />
                <button onClick={handleChat} disabled={!chatInput.trim() || chatLoading} style={{ padding: "10px 18px", borderRadius: 8, border: "none", background: chatInput.trim() ? C.accent : C.border, color: chatInput.trim() ? "#fff" : C.textD, fontSize: 12, fontWeight: 600, cursor: chatInput.trim() ? "pointer" : "not-allowed", fontFamily: "inherit" }}>Ask</button>
              </div>
            </div>


            {/* MOCK INTERVIEW PREP */}
            <div style={{ marginTop: 16, background: C.surface, border: "1px solid " + C.border, borderRadius: 12, padding: "16px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Mock Interview Prep</div>
                <button onClick={handleGenInterviewQs} disabled={interviewLoading} style={{ padding: "6px 14px", borderRadius: 6, border: "none", background: "#8b5cf6", color: "#fff", fontSize: 12, fontWeight: 600, cursor: interviewLoading ? "wait" : "pointer", fontFamily: "inherit" }}>{interviewLoading ? "Generating..." : interviewQs.length > 0 ? "Regenerate" : "Generate Questions"}</button>
              </div>
              {interviewQs.length > 0 && (
                <div>
                  <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
                    {interviewQs.map(function(q, i) { return <button key={i} onClick={function() { setActiveQ(i); setMyAnswer(""); setAnswerFeedback(null); }} style={{ padding: "4px 10px", borderRadius: 6, border: i === activeQ ? "1.5px solid #8b5cf6" : "1px solid " + C.border, background: i === activeQ ? "rgba(139,92,246,0.08)" : "transparent", color: i === activeQ ? "#8b5cf6" : C.textD, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>{"Q" + (i + 1)}</button>; })}
                  </div>
                  <div style={{ padding: "12px 16px", background: C.bg, borderRadius: 10, marginBottom: 10 }}>
                    <div style={{ fontSize: 10, color: "#8b5cf6", fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>{interviewQs[activeQ].type}</div>
                    <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.5 }}>{interviewQs[activeQ].q}</div>
                    <div style={{ fontSize: 11, color: C.textD, marginTop: 4 }}>{"Hint: " + interviewQs[activeQ].hint}</div>
                  </div>
                  <textarea value={myAnswer} onChange={function(e) { setMyAnswer(e.target.value); }} placeholder="Type your answer... Use STAR format (Situation, Task, Action, Result)" style={Object.assign({}, iS, { minHeight: 80, resize: "vertical", marginBottom: 8 })} />
                  <button onClick={handleScoreAnswer} disabled={!myAnswer.trim()} style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: myAnswer.trim() ? "#8b5cf6" : C.border, color: "#fff", fontSize: 12, fontWeight: 600, cursor: myAnswer.trim() ? "pointer" : "not-allowed", fontFamily: "inherit" }}>Score My Answer</button>
                  {answerFeedback && (
                    <div style={{ marginTop: 10, padding: "12px 16px", background: C.bg, borderRadius: 10, fontSize: 12, lineHeight: 1.6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <div style={{ fontSize: 20, fontWeight: 700, color: answerFeedback.score >= 7 ? C.success : answerFeedback.score >= 5 ? "#f59e0b" : C.error }}>{answerFeedback.score + "/10"}</div>
                      </div>
                      <div style={{ marginBottom: 6 }}><span style={{ color: C.success, fontWeight: 600 }}>{"Strengths: "}</span>{answerFeedback.strengths}</div>
                      <div style={{ marginBottom: 6 }}><span style={{ color: "#f59e0b", fontWeight: 600 }}>{"Improve: "}</span>{answerFeedback.improvements}</div>
                      <div style={{ padding: "8px 12px", background: "rgba(0,255,157,0.04)", borderLeft: "3px solid " + C.accent, borderRadius: "0 8px 8px 0", marginTop: 8 }}><span style={{ fontWeight: 600 }}>{"Model answer: "}</span>{answerFeedback.model_answer}</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* FOLLOW-UP EMAIL */}
            <div style={{ marginTop: 16, background: C.surface, border: "1px solid " + C.border, borderRadius: 12, padding: "16px 20px" }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Follow-up Emails</div>
              <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                {[["followup", "1-Week Follow-up"], ["thankyou", "Thank You"], ["second", "2-Week Follow-up"]].map(function(t) { return <button key={t[0]} onClick={function() { setEmailType(t[0]); setEmailResult(""); }} style={{ padding: "5px 12px", borderRadius: 6, border: emailType === t[0] ? "1.5px solid " + C.accent : "1px solid " + C.border, background: emailType === t[0] ? "rgba(0,255,157,0.08)" : "transparent", color: emailType === t[0] ? C.accent : C.textD, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>{t[1]}</button>; })}
              </div>
              <button onClick={handleGenEmail} disabled={emailLoading} style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: C.accent, color: "#fff", fontSize: 12, fontWeight: 600, cursor: emailLoading ? "wait" : "pointer", fontFamily: "inherit" }}>{emailLoading ? "Writing..." : "Generate Email"}</button>
              {emailResult && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ padding: "14px 16px", background: C.bg, borderRadius: 10, fontSize: 12.5, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{emailResult}</div>
                  <button onClick={function() { navigator.clipboard.writeText(emailResult); }} style={{ marginTop: 8, padding: "6px 14px", borderRadius: 6, border: "1px solid " + C.border, background: "transparent", color: C.textM, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>Copy to clipboard</button>
                </div>
              )}
            </div>

            {/* SALARY INTELLIGENCE */}
            <div style={{ marginTop: 16, background: C.surface, border: "1px solid " + C.border, borderRadius: 12, padding: "16px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Salary Intelligence</div>
                <button onClick={handleSalaryLookup} disabled={salaryLoading} style={{ padding: "6px 14px", borderRadius: 6, border: "none", background: C.success, color: "#fff", fontSize: 12, fontWeight: 600, cursor: salaryLoading ? "wait" : "pointer", fontFamily: "inherit" }}>{salaryLoading ? "Looking up..." : "Get Salary Data"}</button>
              </div>
              {salaryData && (
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 12 }}>
                    {[["Low", salaryData.low, "#f59e0b"], ["Mid", salaryData.mid, C.success], ["High", salaryData.high, C.accent]].map(function(d) { return <div key={d[0]} style={{ background: C.bg, borderRadius: 10, padding: "12px 14px", textAlign: "center" }}><div style={{ fontSize: 10, color: C.textD, marginBottom: 4 }}>{d[0]}</div><div style={{ fontSize: 18, fontWeight: 700, color: d[2] }}>{"$" + Math.round(d[1] / 1000) + "K"}</div></div>; })}
                  </div>
                  {salaryData.tips && salaryData.tips.map(function(tip, i) { return <div key={i} style={{ fontSize: 12, marginBottom: 3, paddingLeft: 10, lineHeight: 1.5 }}>{"\u2022 " + tip}</div>; })}
                  {salaryData.negotiation_script && (
                    <div style={{ marginTop: 10 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Negotiation Script</div>
                      <div style={{ padding: "12px 14px", background: C.bg, borderRadius: 10, fontSize: 12, lineHeight: 1.6, borderLeft: "3px solid " + C.success }}>{salaryData.negotiation_script}</div>
                      <button onClick={function() { navigator.clipboard.writeText(salaryData.negotiation_script); }} style={{ marginTop: 8, padding: "6px 14px", borderRadius: 6, border: "1px solid " + C.border, background: "transparent", color: C.textM, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>Copy script</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {err && <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, background: "rgba(239,68,68,0.06)", color: C.error, fontSize: 12 }}>{err}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
