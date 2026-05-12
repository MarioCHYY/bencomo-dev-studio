import { motion } from "framer-motion";
import { Send, Mail, Linkedin, ArrowUpRight, Instagram, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const ContactSection = () => {
  const { toast } = useToast();
  const { t } = useLang();
  const c = translations.contact;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: t(c.fillAll), variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      // Usando Web3Forms para el envío de correos con FormData
      const formData = new FormData(e.currentTarget);
      formData.append("access_key", "977d23ee-f351-477b-9546-231c99b20a08");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success !== false) {
        toast({ title: t(c.sent), description: t(c.sentDesc) });
        setForm({ name: "", email: "", message: "" });
      } else {
        throw new Error(result.message || "Error al enviar al servidor.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Hubo un problema al enviar el mensaje. Inténtalo de nuevo.";
      toast({ 
        title: "Error", 
        description: errorMessage,
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        {/* Big CTA headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-[11px] text-primary font-medium tracking-[0.16em] uppercase">{t(c.label)}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-heading font-extrabold -tracking-[0.03em] dark:text-white text-[#0A0A0A] mb-6 transition-colors duration-500">
            {t(c.title)}
          </h2>
          <p className="dark:text-[#A0A5B0] text-[#505060] text-sm md:text-base lg:text-lg max-w-lg mx-auto font-light leading-relaxed transition-colors duration-500">
            {t(c.subtitle)}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_280px] gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col h-full space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5 shrink-0">
              <div>
                <label className="text-[10px] md:text-xs dark:text-white/45 text-[#505060] mb-2 block font-normal tracking-[0.16em] uppercase transition-colors duration-500">
                  {t(c.name)}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  maxLength={100}
                  className="w-full px-4 py-3.5 dark:bg-[rgba(255,255,255,0.02)] bg-[rgba(0,0,0,0.02)] border dark:border-[rgba(255,255,255,0.08)] border-[rgba(0,0,0,0.08)] rounded-xl dark:text-white text-[#0A0A0A] text-sm md:text-base dark:placeholder:text-white/20 placeholder:text-black/30 focus:outline-none focus:border-primary/50 transition-all font-light"
                  placeholder="Mario Bencomo"
                />
              </div>
              <div>
                <label className="text-[10px] md:text-xs dark:text-white/45 text-[#505060] mb-2 block font-normal tracking-[0.16em] uppercase transition-colors duration-500">
                  {t(c.email)}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  maxLength={255}
                  className="w-full px-4 py-3.5 dark:bg-[rgba(255,255,255,0.02)] bg-[rgba(0,0,0,0.02)] border dark:border-[rgba(255,255,255,0.08)] border-[rgba(0,0,0,0.08)] rounded-xl dark:text-white text-[#0A0A0A] text-sm md:text-base dark:placeholder:text-white/20 placeholder:text-black/30 focus:outline-none focus:border-primary/50 transition-all font-light"
                  placeholder="mario@email.com"
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <label className="text-[10px] md:text-xs dark:text-white/45 text-[#505060] mb-2 block font-normal tracking-[0.16em] uppercase transition-colors duration-500">
                {t(c.message)}
              </label>
              <textarea
                name="message"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                maxLength={1000}
                className="w-full flex-1 px-4 py-3.5 dark:bg-[rgba(255,255,255,0.02)] bg-[rgba(0,0,0,0.02)] border dark:border-[rgba(255,255,255,0.08)] border-[rgba(0,0,0,0.08)] rounded-xl dark:text-white text-[#0A0A0A] text-sm md:text-base dark:placeholder:text-white/20 placeholder:text-black/30 focus:outline-none focus:border-primary/50 transition-all font-light resize-none min-h-[120px]"
                placeholder="..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group px-8 py-4 bg-primary text-primary-foreground text-sm md:text-base font-medium rounded-full hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto shrink-0 self-start shadow-[0_0_15px_rgba(51,141,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
              {isSubmitting ? "Enviando..." : t(c.send)}
              {!isSubmitting && <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
            </button>
          </motion.form>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <p className="text-[10px] text-primary/80 font-medium tracking-[0.16em] uppercase mb-6">
              {t(c.connect)}
            </p>
            {[
              { 
                icon: MessageCircle, 
                label: "WhatsApp", 
                href: "https://wa.me/526674962484?text=Hola%20Mario,%20me%20gustaría%20hablar%20sobre%20un%20proyecto.", 
                handle: "667 496 2484" 
              },
              { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/mario-bencomo-4998273aa/", handle: "Mario Bencomo" },
              { icon: Mail, label: "Email", href: "mailto:mariobencomo057@gmail.com", handle: "mariobencomo057" },
              { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/mario_bencomo06?igsh=MXhjYXR2YnQwc3FodA%3D%3D&utm_source=qr", handle: "@mario_bencomo06" },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 dark:bg-[rgba(255,255,255,0.02)] bg-[rgba(0,0,0,0.02)] border dark:border-[rgba(255,255,255,0.06)] border-[rgba(0,0,0,0.06)] rounded-2xl hover:bg-primary/5 hover:border-primary/20 transition-all duration-300"
              >
                <div className="dark:text-[rgba(255,255,255,0.5)] text-[#505060] group-hover:text-primary transition-colors">
                  <link.icon size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-sm md:text-base font-medium dark:text-[rgba(255,255,255,0.5)] text-[#505060] dark:group-hover:text-white group-hover:text-[#0A0A0A] transition-colors">{link.label}</div>
                  <div className="text-[10px] md:text-xs dark:text-white/30 text-[#505060] font-light transition-colors duration-500">{link.handle}</div>
                </div>
                <ArrowUpRight size={16} className="ml-auto dark:text-[rgba(255,255,255,0.3)] text-[#505060] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
