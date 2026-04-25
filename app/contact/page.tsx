'use client';

import { Navbar } from '@/components/navbar';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background via-white to-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent to-secondary py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-foreground mb-4">Contacto</h1>
            <p className="text-lg text-primary max-w-2xl">
              ¿Tienes una pregunta o proposición? Me encantaría saber de ti.
              Contáctame a través del formulario o utiliza mis redes sociales.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Email */}
                <div className="bg-card rounded-lg shadow-md border border-accent p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                      <Mail size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Email</h3>
                  </div>
                  <p className="text-muted-foreground">tu.email@example.com</p>
                </div>

                {/* Phone */}
                <div className="bg-card rounded-lg shadow-md border border-accent p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                      <Phone size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Teléfono</h3>
                  </div>
                  <p className="text-muted-foreground">+1 (234) 567-8900</p>
                </div>

                {/* Location */}
                <div className="bg-card rounded-lg shadow-md border border-accent p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                      <MapPin size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Ubicación</h3>
                  </div>
                  <p className="text-muted-foreground">Tu Ciudad, País</p>
                </div>

                {/* Social Links */}
                <div className="bg-card rounded-lg shadow-md border border-accent p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Sígueme</h3>
                  <div className="space-y-2">
                    <a
                      href="#"
                      className="block text-primary hover:text-accent font-medium transition-colors"
                    >
                      → LinkedIn
                    </a>
                    <a
                      href="#"
                      className="block text-primary hover:text-accent font-medium transition-colors"
                    >
                      → GitHub
                    </a>
                    <a
                      href="#"
                      className="block text-primary hover:text-accent font-medium transition-colors"
                    >
                      → Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg shadow-md border border-accent p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre completo"
                      className="w-full px-4 py-3 rounded-lg border border-accent bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="tu.email@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-accent bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Cuéntame sobre tu propuesta o pregunta..."
                      className="w-full px-4 py-3 rounded-lg border border-accent bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none"
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="p-4 rounded-lg bg-green-100 border border-green-300 text-green-800 font-medium">
                      ¡Mensaje enviado exitosamente! Pronto te responderé.
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="p-4 rounded-lg bg-red-100 border border-red-300 text-red-800 font-medium">
                      Hubo un error al enviar el mensaje. Por favor intenta de nuevo.
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
