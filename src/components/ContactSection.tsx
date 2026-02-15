import { motion } from "framer-motion";
import { Send, Github, Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    toast({ title: "Message sent!", description: "I'll get back to you soon." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding bg-surface/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm">05 —</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Get in Touch</h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Have a project in mind? Let's talk about how I can help you.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
              className="w-full px-5 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              maxLength={255}
              className="w-full px-5 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>
          <textarea
            placeholder="Your Message"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            maxLength={1000}
            className="w-full px-5 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
          />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex gap-4">
              <a
                href="https://github.com/MarioCHYY"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-border hover:border-primary/50 hover:text-primary transition-all"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:contact@mariohector.dev"
                className="p-3 rounded-xl border border-border hover:border-primary/50 hover:text-primary transition-all"
              >
                <Mail size={20} />
              </a>
            </div>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow flex items-center gap-2"
            >
              <Send size={16} />
              Send Message
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
