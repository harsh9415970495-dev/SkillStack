import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export function Header({ onNavigate, currentPage = 'home' }) {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white border-b border-gray-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 group"
        >
          <motion.div
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center"
          >
            <FileText className="w-5 h-5 text-white" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-900 font-semibold"
          >
            SkillStack
          </motion.span>
        </motion.button>

        {/* Navigation */}
        <nav className="flex gap-8">
          {[
            { id: "home", label: "Home" },
            { id: "form", label: "Create Resume" }
          ].map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.06 }}
              onClick={() => onNavigate(item.id)}
              className={`relative pb-1 transition-colors ${
                currentPage === item.id ||
                (item.id === "form" &&
                 ["form", "templates", "preview"].includes(currentPage))
                  ? "text-[#4F46E5]"
                  : "text-gray-600 hover:text-[#4F46E5]"
              }`}
            >
              {item.label}

              {/* Underline Animation */}
              {(
                currentPage === item.id ||
                (item.id === "form" &&
                 ["form", "templates", "preview"].includes(currentPage))
              ) && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 h-[2px] bg-[#4F46E5] rounded-full"
                />
              )}
            </motion.button>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
