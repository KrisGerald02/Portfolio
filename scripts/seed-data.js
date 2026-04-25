import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedData() {
  try {
    console.log('Creating tables...');

    // Create profile table
    await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS profile (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          bio TEXT,
          email VARCHAR(255),
          location VARCHAR(255),
          github_url VARCHAR(500),
          linkedin_url VARCHAR(500),
          twitter_url VARCHAR(500),
          profile_image_url VARCHAR(500),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `,
    }).catch(() => {});

    // Create posts table
    await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS posts (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          image_url VARCHAR(500),
          likes_count INTEGER DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `,
    }).catch(() => {});

    // Create projects table
    await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS projects (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          image_url VARCHAR(500),
          technologies TEXT[],
          github_url VARCHAR(500),
          live_url VARCHAR(500),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `,
    }).catch(() => {});

    // Create skills table
    await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS skills (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          category VARCHAR(255),
          proficiency INTEGER,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `,
    }).catch(() => {});

    // Create contact_messages table
    await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS contact_messages (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          subject VARCHAR(255),
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `,
    }).catch(() => {});

    console.log('Inserting sample data...');

    // Insert profile
    const { error: profileError } = await supabase
      .from('profile')
      .insert([
        {
          name: 'Tu Nombre',
          bio: 'Estudiante de Ingeniería en Sistemas | Desarrollador Web | Apasionado por la tecnología',
          email: 'tu.email@example.com',
          location: 'Tu Ciudad, País',
          github_url: 'https://github.com/tuusuario',
          linkedin_url: 'https://linkedin.com/in/tuusuario',
          profile_image_url: '/profile.jpg',
        },
      ]);

    if (profileError) console.error('Profile error:', profileError.message);

    // Insert sample posts
    const { error: postsError } = await supabase
      .from('posts')
      .insert([
        {
          title: 'Mi primer post en el portafolio',
          content: 'Bienvenido a mi portafolio personal. Aquí compartiré mis proyectos, habilidades y experiencias en el desarrollo web.',
          likes_count: 0,
        },
        {
          title: 'Aprendiendo React y Next.js',
          content: 'Estoy trabajando en mejorar mis habilidades con React y Next.js. La curva de aprendizaje es desafiante pero muy emocionante.',
          likes_count: 5,
        },
      ]);

    if (postsError) console.error('Posts error:', postsError.message);

    // Insert sample projects
    const { error: projectsError } = await supabase
      .from('projects')
      .insert([
        {
          title: 'E-Commerce Platform',
          description: 'Plataforma de comercio electrónico completa con carrito de compras, sistema de pagos y panel de administración.',
          technologies: ['React', 'Next.js', 'Stripe', 'Supabase'],
          github_url: 'https://github.com/usuario/ecommerce',
          live_url: 'https://ecommerce-demo.com',
        },
        {
          title: 'Blog Dinámico',
          description: 'Blog personal con soporte para posts, comentarios y búsqueda avanzada.',
          technologies: ['Next.js', 'MDX', 'TailwindCSS'],
          github_url: 'https://github.com/usuario/blog',
          live_url: 'https://blog-demo.com',
        },
        {
          title: 'Task Manager App',
          description: 'Aplicación de gestión de tareas con categorización, prioridades y recordatorios.',
          technologies: ['React', 'Firebase', 'Material-UI'],
          github_url: 'https://github.com/usuario/taskmanager',
          live_url: 'https://taskmanager-demo.com',
        },
      ]);

    if (projectsError) console.error('Projects error:', projectsError.message);

    // Insert sample skills
    const { error: skillsError } = await supabase
      .from('skills')
      .insert([
        { name: 'JavaScript', category: 'Lenguajes', proficiency: 90 },
        { name: 'TypeScript', category: 'Lenguajes', proficiency: 85 },
        { name: 'React', category: 'Frontend', proficiency: 90 },
        { name: 'Next.js', category: 'Frontend', proficiency: 85 },
        { name: 'TailwindCSS', category: 'Frontend', proficiency: 95 },
        { name: 'Node.js', category: 'Backend', proficiency: 80 },
        { name: 'PostgreSQL', category: 'Bases de Datos', proficiency: 75 },
        { name: 'Git', category: 'Herramientas', proficiency: 90 },
        { name: 'Docker', category: 'DevOps', proficiency: 70 },
        { name: 'API REST', category: 'Backend', proficiency: 85 },
      ]);

    if (skillsError) console.error('Skills error:', skillsError.message);

    console.log('✅ Seed completed successfully!');
  } catch (error) {
    console.error('Error during seed:', error);
    process.exit(1);
  }
}

seedData();
