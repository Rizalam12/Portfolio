import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionHeading } from "@/components/ui/section-heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Send, MapPin, Phone, CheckCircle, XCircle, X } from "lucide-react";
import { SiGmail } from "react-icons/si";
import { insertMessageSchema } from "@shared/schema";
import { useCreateMessage } from "@/hooks/use-messages";
import Toast from "@/components/Toast";
import { z } from "zod";
import { useState, useEffect } from "react";

const contactFormSchema = insertMessageSchema.extend({
  website: z.string().optional(),
});

export function Contact() {
  const { mutate, isPending, isSuccess, isError } = useCreateMessage();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      website: "",
    },
  });

  interface ToastData {
    type: "success" | "error";
    message: string;
    subMessage: string;
  }

  const [toastData, setToastData] = useState<ToastData | null>(null);

  useEffect(() => {
    if (isSuccess) {
      setToastData({
        type: "success",
        message: "Message Sent!",
        subMessage: "I'll get back to you within 24 hours."
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setToastData({
        type: "error",
        message: "Failed to Send!",
        subMessage: "Please try again or email me directly."
      });
    }
  }, [isError]);

  function onSubmit(data: z.infer<typeof contactFormSchema>) {
    mutate(data, {
      onSuccess: () => form.reset()
    });
  }

  return (
    <section id="contact" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading 
          title="Get In Touch" 
          subtitle="Have a project in mind or looking for a developer? Let's talk!" 
        />

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-8 mb-10">
              <h3 className="text-2xl font-bold text-white mb-5">Contact Information</h3>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Phone</p>
                  <a href="tel:+916206712882" className="text-lg text-white hover:text-primary transition-colors">+91 6206712882</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
                  <SiGmail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Email</p>
                  <a href="mailto:mdrizwanalam21@gmail.com" className="text-lg text-white hover:text-primary transition-colors">mdrizwanalam21@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Location</p>
                  <p className="text-lg text-white">New Delhi, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="glass-card rounded-3xl p-8 relative">

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Honeypot: leave empty; bots often fill it */}
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem className="absolute -left-[9999px] top-0 h-0 overflow-hidden opacity-0 pointer-events-none">
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input type="text" tabIndex={-1} autoComplete="off" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            className="bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary h-12 rounded-xl px-4" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="john@example.com" 
                            type="email"
                            className="bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary h-12 rounded-xl px-4" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can I help you?" 
                            className="bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary min-h-[150px] rounded-xl p-4 resize-y" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/25 transition-all active:scale-[0.98]"
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">Sending...</span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>

{toastData && (
  <Toast 
    type={toastData.type}
    message={toastData.message}
    subMessage={toastData.subMessage}
    onClose={() => setToastData(null)}
  />
)}

      </div>
    </section>
  );
}
