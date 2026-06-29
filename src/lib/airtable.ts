const AIRTABLE_API_KEY = process.env.AIRTABLE_TOKEN
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const PROJECTS_TABLE = process.env.AIRTABLE_PROJECTS_TABLE ?? 'Projects'
const EXPERIENCE_TABLE = process.env.AIRTABLE_EXPERIENCE_TABLE ?? 'Experience'
const CONTACT_TABLE = process.env.AIRTABLE_CRM_TABLE ?? 'Contacto'

export type Project = {
  id: string
  name: string
  description: string
  technologies: string[]
  image: string | null
  demo: string | null
  category: string
  status: string
  order: number
}

export async function getProjects(): Promise<Project[]> {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${PROJECTS_TABLE}?maxRecords=20`

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Airtable error ${res.status}: ${text}`)
  }

  const data = await res.json()

  return data.records.map(
    (r: any): Project => {
      const f = r.fields ?? {}
      return {
        id: r.id,
        name: f.name ?? '',
        description: f.description_es ?? f.description_en ?? '',
        technologies: f.technologies
          ? String(f.technologies).split(',').map((t: string) => t.trim()).filter(Boolean)
          : [],
        image: f.image?.[0]?.url ?? null,
        demo: f.demoUrl ?? null,
        category: f.category ?? '',
        status: f.status ?? '',
        order: f.order ?? 0,
      }
    }
  )
}

export type Experience = {
  id: string
  company: string
  role: string
  period: string
  description: string
}

export async function getExperience(): Promise<Experience[]> {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${EXPERIENCE_TABLE}?maxRecords=20&sort%5B0%5D%5Bfield%5D=period_start&sort%5B0%5D%5Bdirection%5D=desc`

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Airtable error ${res.status}: ${text}`)
  }

  const data = await res.json()

  return data.records.map(
    (r: any): Experience => {
      const f = r.fields ?? {}
      const start = f.period_start ?? ''
      const end = f.current ? 'hoy' : (f.period_end ?? '')
      const period = start && end ? `${start} – ${end}` : start || end || ''
      return {
        id: r.id,
        company: f.company ?? '',
        role: f.role ?? '',
        period,
        description: f.description_es ?? f.description_en ?? '',
      }
    }
  )
}

export async function submitContact(data: {
  name: string
  email: string
  message: string
}) {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${CONTACT_TABLE}`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        Name: data.name,
        email: data.email,
        message: data.message,
      },
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('Airtable submitContact error:', text)
    throw new Error('Error al enviar mensaje')
  }
  return true
}
