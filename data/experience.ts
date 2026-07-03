export interface Experience {
  role: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string
  responsibilities: string[]
  type: 'internship' | 'job' | 'freelance'
}

export const experiences: Experience[] = [
  {
    role: 'Operational & Accounting Assistant',
    company: 'Family-Run Courier Office',
    location: 'Mumbai, India',
    startDate: 'Jun 2025',
    endDate: 'Jul 2025',
    description:
      'Managed daily booking data entry, billing records, and transaction reconciliation; identified workflow inefficiencies that directly motivated the Courier DBMS project.',
    responsibilities: [
      'Handled daily end-to-end booking data entry for 50+ parcels across multiple courier routes.',
      'Maintained billing records and performed transaction reconciliation to ensure financial accuracy.',
      'Identified critical workflow bottlenecks: manual paper-based tracking, error-prone billing, and slow customer lookups.',
      'Translated operational pain points into technical requirements — directly motivating the Courier Service DBMS project.',
      'Coordinated with counter staff to understand on-the-ground operational needs and designed UI flows around their workflow.',
    ],
    type: 'job',
  },
]
