-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  bio TEXT,
  foto_perfil TEXT,
  ubicacion TEXT,
  enlaces_sociales JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  descripcion TEXT,
  tecnologias TEXT[] DEFAULT ARRAY[]::TEXT[],
  imagen_principal TEXT,
  enlace_demo TEXT,
  enlace_github TEXT,
  fecha_creacion TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  contenido TEXT NOT NULL,
  imagen TEXT,
  likes_count INTEGER DEFAULT 0,
  fecha_creacion TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  categoria TEXT,
  nivel_dominio TEXT DEFAULT 'Intermedio',
  icono TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  asunto TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  leido BOOLEAN DEFAULT FALSE,
  fecha_envio TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create likes table for tracking post likes
CREATE TABLE IF NOT EXISTS post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_ip TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(post_id, user_ip)
);

-- Insert sample user data
INSERT INTO users (nombre, email, bio, foto_perfil, ubicacion, enlaces_sociales)
VALUES (
  'Tu Nombre',
  'tu@email.com',
  'Ingeniero en Sistemas apasionado por la tecnología y el desarrollo de software. Me encanta crear soluciones innovadoras y aprender nuevas tecnologías.',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  'Tu Ciudad, País',
  '{"github": "https://github.com/tuusuario", "linkedin": "https://linkedin.com/in/tuusuario", "twitter": "https://twitter.com/tuusuario"}'::jsonb
) ON CONFLICT (email) DO NOTHING;

-- Insert sample projects
INSERT INTO projects (titulo, descripcion, tecnologias, imagen_principal, enlace_demo, enlace_github)
VALUES 
  (
    'E-Commerce Platform',
    'Plataforma de comercio electrónico completa con carrito de compras, autenticación y pagos integrados usando Stripe.',
    ARRAY['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Stripe'],
    'https://images.unsplash.com/photo-1460925895917-adf4e565db6d?w=500&h=300&fit=crop',
    'https://ecommerce-demo.com',
    'https://github.com/tuusuario/ecommerce-platform'
  ),
  (
    'Task Management App',
    'Aplicación de gestión de tareas con características colaborativas, notificaciones en tiempo real y sincronización entre dispositivos.',
    ARRAY['React', 'Node.js', 'MongoDB', 'Socket.io', 'JWT'],
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
    'https://taskapp-demo.com',
    'https://github.com/tuusuario/task-management'
  ),
  (
    'Machine Learning Model Analyzer',
    'Herramienta web para analizar y visualizar modelos de machine learning con predicciones en tiempo real.',
    ARRAY['Python', 'TensorFlow', 'Flask', 'React', 'D3.js'],
    'https://images.unsplash.com/photo-1518438a4d14e74bb3eb0159561c0fd98d61eb429?w=500&h=300&fit=crop',
    'https://ml-analyzer-demo.com',
    'https://github.com/tuusuario/ml-analyzer'
  );

-- Insert sample posts
INSERT INTO posts (titulo, contenido, imagen, likes_count)
VALUES 
  (
    'Mi primer proyecto con Next.js',
    'Hoy completé mi primer proyecto web completo usando Next.js y Supabase. La experiencia fue increíble y aprendí mucho sobre el desarrollo full-stack. Las características principales incluyen autenticación, base de datos relacional y despliegue en Vercel.',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    12
  ),
  (
    'Reflexiones sobre la ingeniería en sistemas',
    'La ingeniería en sistemas no es solo sobre escribir código. Es sobre resolver problemas, entender las necesidades del usuario y crear soluciones escalables. He aprendido que la comunicación es tan importante como las habilidades técnicas.',
    'https://images.unsplash.com/photo-1516321318423-f06f70259b51?w=500&h=300&fit=crop',
    8
  ),
  (
    'Aprendiendo TypeScript',
    'TypeScript ha cambiado mi forma de escribir código JavaScript. La tipificación estática ayuda a prevenir errores y hace el código más mantenible. Recomiendo a todo desarrollador que lo aprenda.',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    15
  );

-- Insert sample skills
INSERT INTO skills (nombre, categoria, nivel_dominio, icono)
VALUES 
  ('JavaScript', 'Lenguajes de Programación', 'Avanzado', '⚡'),
  ('TypeScript', 'Lenguajes de Programación', 'Avanzado', '🔷'),
  ('React', 'Frontend', 'Avanzado', '⚛️'),
  ('Next.js', 'Frontend', 'Avanzado', '▲'),
  ('Python', 'Lenguajes de Programación', 'Avanzado', '🐍'),
  ('Node.js', 'Backend', 'Avanzado', '🟢'),
  ('Supabase', 'Base de Datos', 'Intermedio', '🚀'),
  ('PostgreSQL', 'Base de Datos', 'Intermedio', '🐘'),
  ('Tailwind CSS', 'Estilos', 'Avanzado', '🎨'),
  ('Git', 'Herramientas', 'Avanzado', '📚'),
  ('Machine Learning', 'Especialidades', 'Intermedio', '🧠'),
  ('Docker', 'DevOps', 'Intermedio', '🐳');

-- Set up RLS (Row Level Security) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "users_read_policy" ON users FOR SELECT USING (true);
CREATE POLICY "projects_read_policy" ON projects FOR SELECT USING (true);
CREATE POLICY "posts_read_policy" ON posts FOR SELECT USING (true);
CREATE POLICY "skills_read_policy" ON skills FOR SELECT USING (true);
CREATE POLICY "post_likes_read_policy" ON post_likes FOR SELECT USING (true);

-- Allow inserting contact messages
CREATE POLICY "contact_messages_insert_policy" ON contact_messages FOR INSERT WITH CHECK (true);

-- Allow inserting post likes
CREATE POLICY "post_likes_insert_policy" ON post_likes FOR INSERT WITH CHECK (true);
