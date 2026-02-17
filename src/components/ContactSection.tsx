import { motion } from "framer-motion";
import { Send, Github, Mail, Linkedin, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const ContactSection = () => {
  const { toast } = useToast();
  const { t } = useLang();
  const c = translations.contact;
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: t(c.fillAll), variant: "destructive" });
      return;
    }
    toast({ title: t(c.sent), description: t(c.sentDesc) });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding relative grid-bg">
      <div className="absolute left-0 right-0 top-0 cyber-divider" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-primary text-xs font-display tracking-[0.3em]">{t(c.label)}</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter neon-text-strong text-primary mb-4">
            {t(c.title)}
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto font-body">{t(c.subtitle)}</p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_280px] gap-12">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-sm p-6 md:p-8 space-y-5 corner-accents"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-[10px] text-muted-foreground mb-2 block font-display tracking-[0.2em] uppercase">{t(c.name)}</label>
                <input
                  type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100}
                  className="w-full px-4 py-3 bg-transparent border-b border-border text-foreground text-sm font-body placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary transition-all"
                  placeholder="Mario Bencomo"
                />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground mb-2 block font-display tracking-[0.2em] uppercase">{t(c.email)}</label>
                <input
                  type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255}
                  className="w-full px-4 py-3 bg-transparent border-b border-border text-foreground text-sm font-body placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary transition-all"
                  placeholder="mario@email.com"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground mb-2 block font-display tracking-[0.2em] uppercase">{t(c.message)}</label>
              <textarea
                rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000}
                className="w-full px-4 py-3 bg-transparent border-b border-border text-foreground text-sm font-body placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary transition-all resize-none"
                placeholder="..."
              />
            </div>
            <button type="submit"
              className="group px-8 py-3 bg-primary text-primary-foreground text-sm font-display font-bold tracking-wider rounded-sm hover:neon-glow-strong transition-all duration-300 flex items-center gap-2">
              <Send size={14} /> {t(c.send)}
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-3"
          >
            <p className="text-[10px] text-muted-foreground font-display tracking-[0.3em] uppercase mb-4">// CONNECT</p>
            {[
              { icon: Github, label: "GitHub", href: "https://github.com/MarioCHYY", handle: "@MarioCHYY" },
              { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/mario-bencomo-4998273aa/", handle: "Mario Bencomo" },
              { icon: Mail, label: "Email", href: "mailto:mariobencomo057@gmail.com", handle: "mariobencomo057" },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 glass rounded-sm border border-border/30 hover:border-primary/40 hover:neon-glow transition-all duration-300"
              >
                <link.icon size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <div className="text-xs text-foreground font-display tracking-wide group-hover:text-primary transition-colors">{link.label}</div>
                  <div className="text-[10px] text-muted-foreground/50 font-body">{link.handle}</div>
                </div>
                <ArrowUpRight size={12} className="ml-auto text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
