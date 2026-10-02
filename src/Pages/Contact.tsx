import { motion } from "framer-motion";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  GithubOutlined,
  LinkedinOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Toaster, toast } from "sonner";
import { db } from "../firebase";
import contactFields from "../data/contactFields.json";

type FormData = Record<string, string>;

type Field = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  placeholder: string;
  required: boolean;
  grid: "half" | "full";
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    minLengthMessage?: string;
    maxLengthMessage?: string;
    patternMessage?: string;
  };
};

const fields = contactFields as Field[];

const initialFormData: FormData = fields.reduce(
  (form, field) => {
    form[field.name] = "";
    return form;
  },
  {} as FormData
);

const ContactPage = () => {
  const [formData, setFormData] =
    useState<FormData>(initialFormData);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [status, setStatus] = useState<
    "idle" | "sending"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateField = (
    field: Field,
    value: string
  ): string => {
    const trimmedValue = value.trim();
    const rules = field.validation;

    if (field.required && !trimmedValue) {
      return `${field.label} is required`;
    }

    if (!trimmedValue || !rules) {
      return "";
    }

    if (
      rules.minLength &&
      trimmedValue.length < rules.minLength
    ) {
      return (
        rules.minLengthMessage ||
        `${field.label} must contain at least ${rules.minLength} characters`
      );
    }

    if (
      rules.maxLength &&
      trimmedValue.length > rules.maxLength
    ) {
      return (
        rules.maxLengthMessage ||
        `${field.label} cannot exceed ${rules.maxLength} characters`
      );
    }

    if (
      rules.pattern &&
      !new RegExp(rules.pattern).test(trimmedValue)
    ) {
      return (
        rules.patternMessage ||
        `Please enter a valid ${field.label.toLowerCase()}`
      );
    }

    return "";
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const error = validateField(
        field,
        formData[field.name] || ""
      );

      if (error) {
        newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const sendMessage = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (status === "sending") {
      return;
    }

    if (!validateForm()) {
      toast.error("Please check your details", {
        description:
          "Fix the highlighted fields before submitting.",
      });

      return;
    }

    setStatus("sending");

    try {
      const contactData = fields.reduce(
        (data, field) => {
          data[field.name] =
            formData[field.name]?.trim() || "";

          return data;
        },
        {} as Record<string, string>
      );

      await addDoc(collection(db, "contacts"), {
        ...contactData,
        status: "new",
        createdAt: serverTimestamp(),
      });

      setFormData(initialFormData);
      setErrors({});

      toast.success("Message sent successfully!", {
        description:
          "Thanks for reaching out. I'll get back to you soon.",
      });
    } catch (error) {
      console.error("Firebase contact error:", error);

      toast.error("Something went wrong", {
        description:
          "Unable to send your message. Please try again.",
      });
    } finally {
      setStatus("idle");
    }
  };

  return (
    <section className="min-h-screen bg-[#050816] text-white px-6 py-6 flex items-center justify-center relative overflow-hidden">

      {/* Sonner */}
      <Toaster
        position="bottom-right"
        theme="dark"
        richColors
        closeButton
        toastOptions={{
          className:
            "!bg-[#0f172a]/95 !border-white/10 !backdrop-blur-xl !text-white",
        }}
      />

      {/* Background glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-6xl"
      >

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-indigo-400 uppercase tracking-[0.3em] text-sm mb-3">
            Get in touch
          </p>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Let's build something
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              {" "}
              amazing.
            </span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto mt-5">
            Have a project, opportunity, or idea? Send me a
            message and let's connect.
          </p>
        </div>

        {/* Main */}
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-4">

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-semibold mb-3">
              Let's connect
            </h2>

            <p className="text-gray-400 leading-relaxed mb-10">
              I'm always open to discussing new projects,
              creative ideas, or opportunities.
            </p>

            <div className="space-y-6">

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <MailOutlined className="text-indigo-400 text-xl" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <p className="text-gray-200">
                    sanjayrajan053@gmail.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <PhoneOutlined className="text-cyan-400 text-xl" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Phone
                  </p>

                  <p className="text-gray-200">
                    +91 93847 74613
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <EnvironmentOutlined className="text-purple-400 text-xl" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Location
                  </p>

                  <p className="text-gray-200">
                    Hyderabad, India
                  </p>
                </div>
              </div>

            </div>

            {/* Social */}
            <div className="flex gap-4 mt-12">

              <motion.a
                href="https://github.com/Sanjay053"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.05 }}
                className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition"
              >
                <GithubOutlined className="text-xl" />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/sanjayrajan053"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.05 }}
                className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition"
              >
                <LinkedinOutlined className="text-xl text-indigo-400" />
              </motion.a>

            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 shadow-2xl"
          >
            <form
              onSubmit={sendMessage}
              noValidate
              className="space-y-5"
            >

              {/* Dynamic Fields */}
              <div className="grid md:grid-cols-2 gap-2">

                {fields.map((field) => {
                  const isFullWidth =
                    field.grid === "full";

                  return (
                    <div
                      key={field.name}
                      className={
                        isFullWidth
                          ? "md:col-span-2"
                          : ""
                      }
                    >

                      <label className="text-sm text-gray-400 mb-2 block">
                        {field.label}
                      </label>

                      {field.type === "textarea" ? (
                        <textarea
                          name={field.name}
                          value={
                            formData[field.name] || ""
                          }
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          rows={6}
                          maxLength={
                            field.validation?.maxLength
                          }
                          className={`w-full resize-none rounded-xl border bg-black/20 px-4 py-3.5 text-white placeholder-gray-600 outline-none transition ${
                            errors[field.name]
                              ? "border-red-500/70 focus:ring-2 focus:ring-red-500/10"
                              : "border-white/10 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10"
                          }`}
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={
                            formData[field.name] || ""
                          }
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          maxLength={
                            field.validation?.maxLength
                          }
                          className={`w-full rounded-xl border bg-black/20 px-4 py-3.5 text-white placeholder-gray-600 outline-none transition ${
                            errors[field.name]
                              ? "border-red-500/70 focus:ring-2 focus:ring-red-500/10"
                              : "border-white/10 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10"
                          }`}
                        />
                      )}

                      {/* Validation error */}
                      {errors[field.name] && (
                        <motion.p
                          initial={{
                            opacity: 0,
                            y: -3,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          className="text-xs text-red-400 mt-2"
                        >
                          {errors[field.name]}
                        </motion.p>
                      )}

                      {/* Message character counter */}
                      {field.type === "textarea" &&
                        field.validation?.maxLength && (
                          <div className="text-right text-xs text-gray-600 mt-1">
                            {formData[field.name]?.length ||
                              0}
                            /
                            {
                              field.validation.maxLength
                            }
                          </div>
                        )}

                    </div>
                  );
                })}

              </div>

              {/* Submit */}
              <motion.button
                whileHover={{
                  scale:
                    status === "sending" ? 1 : 1.02,
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === "sending"}
                className="w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 py-4 font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <SendOutlined />
                  </>
                )}
              </motion.button>

            </form>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default ContactPage;