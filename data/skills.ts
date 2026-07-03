export interface SkillCategory {
  technique: string
  techniquejp: string
  items: string[]
  proficiency: number // 0-100
  color: string
}

export const skills: SkillCategory[] = [
  {
    technique: 'Languages',
    techniquejp: '言語',
    items: ['Python', 'C', 'C++', 'Java', 'JavaScript'],
    proficiency: 90,
    color: '#D62828',
  },
  {
    technique: 'Frameworks & Libraries',
    techniquejp: 'フレームワーク',
    items: [
      'FastAPI', 'React.js', 'Streamlit', 'PyQt6',
      'NumPy', 'Pandas', 'Plotly', 'Django',
      'Tailwind CSS', 'Scikit-learn',
    ],
    proficiency: 85,
    color: '#FFD60A',
  },
  {
    technique: 'AI / ML / NLP',
    techniquejp: '人工知能',
    items: [
      'Machine Learning', 'NLP', 'FinBERT',
      'Gemini AI', 'Sentiment Analysis',
    ],
    proficiency: 80,
    color: '#D62828',
  },
  {
    technique: 'Databases & Cloud',
    techniquejp: 'データベース',
    items: ['PostgreSQL', 'Supabase', 'SQL'],
    proficiency: 75,
    color: '#2B2B2B',
  },
  {
    technique: 'Tools & Concepts',
    techniquejp: '道具',
    items: [
      'Git', 'REST API', 'Full-Stack',
      'Data Viz', 'Win32 API', 'GeoJSON', 'PyInstaller',
    ],
    proficiency: 88,
    color: '#D62828',
  },
]
