import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ShoppingBag } from "lucide-react";

import {
  Html5Original,
  Css3Original,
  JavascriptOriginal,
  TypescriptOriginal,
  ReactOriginal,
  VuejsOriginal,
  NextjsOriginal,
  NuxtjsOriginalWordmark,
  WordpressOriginal,
  WoocommerceOriginal,
  GitOriginal,
  FigmaOriginal,
  TailwindcssOriginal,
  PhpOriginal,
  MysqlOriginal,
  SupabaseOriginal,
  VercelOriginal,
  NetlifyOriginal,
} from "devicons-react";

const technologies = [
  { name: "HTML5", icon: Html5Original },
  { name: "CSS3", icon: Css3Original },
  { name: "JavaScript", icon: JavascriptOriginal },
  { name: "TypeScript", icon: TypescriptOriginal },
  { name: "React", icon: ReactOriginal },
  { name: "Vue.js", icon: VuejsOriginal },
  { name: "Next.js", icon: NextjsOriginal },
  { name: "Nuxt.js", icon: NuxtjsOriginalWordmark },
  { name: "WordPress", icon: WordpressOriginal },
  { name: "WooCommerce", icon: WoocommerceOriginal },
  { name: "Shopify", icon: ShoppingBag },
  { name: "Git", icon: GitOriginal },
  { name: "Figma", icon: FigmaOriginal },
  { name: "Tailwind CSS", icon: TailwindcssOriginal },
  { name: "PHP", icon: PhpOriginal },
  { name: "MySQL", icon: MysqlOriginal },
  { name: "Supabase", icon: SupabaseOriginal },
  { name: "Vercel", icon: VercelOriginal },
  { name: "Netlify", icon: NetlifyOriginal },
];

export const TechStack = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const swiperRef = useRef(null);

  const handleMouseEnter = () => {
    swiperRef.current?.autoplay.stop();
  };

  const handleMouseLeave = () => {
    swiperRef.current?.autoplay.start();
  };

  return (
    <section id="stack" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            {t("tech.label")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            {t("tech.title")}{" "}
            <span className="gradient-text">{t("tech.title.highlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("tech.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Swiper
            ref={swiperRef}
            modules={[Autoplay]}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={4000}
            loop={true}
            slidesPerView="auto"
            spaceBetween={40}
            freeMode={true}
            allowTouchMove={true}
            breakpoints={{
              320: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 40,
              },
            }}
          >
            {technologies.map((tech, index) => (
              <SwiperSlide key={index} className="!w-auto">
                <div className="flex flex-col items-center justify-center gap-3 glass-card p-6 rounded-2xl min-w-[120px] hover:scale-105 transition-transform cursor-grab">
                  <tech.icon size={40} className="text-primary" />
                  <span className="text-sm text-muted-foreground">{tech.name}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};