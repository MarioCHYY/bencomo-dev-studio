import { motion } from "framer-motion";
import { Send, Github, Mail, Linkedin } from "lucide-react";
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
    <section id="contact" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-primary text-xs">{t(c.label)}</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 glow-text">
            <span className="text-primary mr-2">#</span>{t(c.title)}
          </h2>
          <p className="text-muted-foreground mt-3 text-sm max-w-lg">
            <span className="text-primary mr-2">{">"}</span>
            {t(c.subtitle)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="terminal-window"
        >
          <div className="terminal-header">
            <span className="terminal-dot bg-destructive/80" />
            <span className="terminal-dot bg-yellow-500/80" />
            <span className="terminal-dot bg-primary/80" />
            <span className="ml-3">contact.sh</span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  <span className="text-primary">const</span> name =
                </label>
                <input
                  type="text"
                  placeholder={`"${t(c.name)}"`}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  maxLength={100}
                  className="w-full px-4 py-2.5 bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:shadow-[0_0_10px_hsl(120_100%_50%/0.15)] transition-all font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  <span className="text-primary">const</span> email =
                </label>
                <input
                  type="email"
                  placeholder={`"${t(c.email)}"`}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  maxLength={255}
                  className="w-full px-4 py-2.5 bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:shadow-[0_0_10px_hsl(120_100%_50%/0.15)] transition-all font-mono"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                <span className="text-primary">const</span> message =
              </label>
              <textarea
                placeholder={`"${t(c.message)}"`}
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                maxLength={1000}
                className="w-full px-4 py-2.5 bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:shadow-[0_0_10px_hsl(120_100%_50%/0.15)] transition-all font-mono resize-none"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex gap-3">
                <a
                  href="https://github.com/MarioCHYY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 border border-border hover:border-primary hover:text-primary transition-all text-muted-foreground"
                >
                  <Github size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/mario-bencomo-4998273aa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 border border-border hover:border-primary hover:text-primary transition-all text-muted-foreground"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="mailto:mariobencomo057@gmail.com"
                  className="p-2.5 border border-border hover:border-primary hover:text-primary transition-all text-muted-foreground"
                >
                  <Mail size={16} />
                </a>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 border border-primary text-primary text-sm font-mono hover:bg-primary hover:text-primary-foreground transition-all glow flex items-center gap-2"
              >
                <Send size={14} />
                {t(c.send)}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
