import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .single()

    if (error && error.code !== 'PGRST116') {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Return default profile if not found
    if (!data) {
      return NextResponse.json({
        name: 'Kristel Villalta',
        bio: 'Estudiante de Ingeniería en Sistemas | Desarrollador Movil | Analista de Datos',
        email: 'krisvilalta02@gmail.com',
        location: 'Managua, Nicaragua',
        github_url: 'https://github.com/KrisGerald02',
        linkedin_url: 'https://www.linkedin.com/in/kristel-villalta/',
        profile_image_url: '/profile.jpg',
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching profile' },
      { status: 500 }
    )
  }
}
