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
    <section id="contact" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-3xl mb-3 block">📱</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight pop-gradient-text mb-3">
            {t(c.title)}
          </h2>
          <p className="font-handwriting text-lg text-primary/70 rotate-[-1deg] mb-2">
            {t({ en: "Pick up my phone and say hi!", es: "¡Toma mi teléfono y saluda!" })}
          </p>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            {t(c.subtitle)}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_280px] gap-10">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="room-card p-6 md:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs text-muted-foreground mb-2 block font-display font-semibold">
                  {t(c.name)}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  maxLength={100}
                  className="w-full px-4 py-3 bg-muted/40 border border-border rounded-xl text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  placeholder="Mario Bencomo"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-2 block font-display font-semibold">
                  {t(c.email)}
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  maxLength={255}
                  className="w-full px-4 py-3 bg-muted/40 border border-border rounded-xl text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  placeholder="mario@email.com"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-2 block font-display font-semibold">
                {t(c.message)}
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                maxLength={1000}
                className="w-full px-4 py-3 bg-muted/40 border border-border rounded-xl text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
                placeholder="..."
              />
            </div>
            <button
              type="submit"
              className="group px-6 py-3 bg-primary text-primary-foreground text-sm font-display font-semibold rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex items-center gap-2"
            >
              <Send size={14} />
              {t(c.send)}
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.form>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-3"
          >
            {[
              { icon: Github, label: "GitHub", href: "https://github.com/MarioCHYY", handle: "@MarioCHYY", emoji: "🐙", color: "bg-foreground/5 border-foreground/10" },
              { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/mario-bencomo-4998273aa/", handle: "Mario Bencomo", emoji: "💼", color: "bg-blue/10 border-blue/20" },
              { icon: Mail, label: "Email", href: "mailto:mariobencomo057@gmail.com", handle: "mariobencomo057", emoji: "✉️", color: "bg-primary/10 border-primary/20" },
            ].map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 p-4 rounded-xl border ${link.color} transition-all duration-300`}
              >
                <span className="text-xl">{link.emoji}</span>
                <div className="flex-1">
                  <div className="text-sm font-display font-semibold text-foreground">{link.label}</div>
                  <div className="text-[11px] text-muted-foreground">{link.handle}</div>
                </div>
                <ArrowUpRight size={14} className="text-muted-foreground/40" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
