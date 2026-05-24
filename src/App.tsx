import { motion } from "framer-motion";
import { useState } from "react";
import {
  Star, MapPin, Phone, Navigation, Clock, Users,
  ChevronRight, Leaf, Sprout, Sun, Flower2,
  Tag, Flame, ShoppingCart, ArrowRight, Menu, X
} from "lucide-react";
import { siteConfig } from "./config/site";
import { cn } from "./lib/utils";

/* ─── Animations ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ─── Star Rating ─── */
function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={18}
            className={cn(s <= Math.floor(rating) ? "fill-amber-400 text-amber-400" : s - 0.5 <= rating ? "fill-amber-400/50 text-amber-400" : "text-gray-300")}
          />
        ))}
      </div>
      <span className="text-lg font-bold text-farm-brown">{rating}</span>
      <span className="text-sm text-farm-muted">{count}条</span>
    </div>
  );
}

/* ─── Navigation ─── */
function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-farm-green/95 backdrop-blur-md shadow-lg"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 text-farm-cream font-display font-bold text-xl">
          <Leaf size={24} className="text-farm-gold" />
          本然农场
        </a>
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {siteConfig.nav.map((n) => (
            <a key={n.label} href={n.href} className="text-farm-cream/80 hover:text-farm-gold transition-colors text-sm font-medium tracking-wide">
              {n.label}
            </a>
          ))}
          <a
            href="#deals"
            className="bg-farm-gold hover:bg-farm-orange text-white px-5 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-lg shadow-farm-gold/25"
          >
            立即抢购
          </a>
        </div>
        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-farm-cream p-2">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-farm-green border-t border-white/10"
        >
          <div className="px-4 py-4 flex flex-col gap-3">
            {siteConfig.nav.map((n) => (
              <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="text-farm-cream/80 hover:text-farm-gold py-2 text-base">
                {n.label}
              </a>
            ))}
            <a href="#deals" className="bg-farm-gold text-white px-5 py-2.5 rounded-full text-sm font-bold text-center mt-2">
              立即抢购
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  const { hero } = siteConfig;
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden grain">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-farm-green via-farm-light to-emerald-700" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,145,14,0.15),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05),_transparent_50%)]" />
      
      {/* Decorative floating elements */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-[15%] opacity-20 hidden lg:block"
      >
        <Flower2 size={120} className="text-farm-cream" />
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10], rotate: [0, -3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 left-[10%] opacity-15 hidden lg:block"
      >
        <Sprout size={100} className="text-farm-cream" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div custom={0} variants={fadeUp} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/20">
              <Sun size={14} className="text-farm-gold" />
              <span className="text-farm-cream/90 text-xs font-medium tracking-wider uppercase">城市边缘的田园牧歌</span>
            </motion.div>

            <motion.h1 custom={1} variants={fadeUp} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-farm-cream leading-[1.1] mb-4">
              本然农场
            </motion.h1>

            <motion.p custom={2} variants={fadeUp} className="text-lg sm:text-xl text-farm-cream/75 mb-8 max-w-lg leading-relaxed">
              {hero.subtitle}
            </motion.p>

            <motion.div custom={3} variants={fadeUp}>
              <StarRating rating={hero.rating} reviewCount={hero.reviewCount} />
            </motion.div>

            <motion.div custom={4} variants={fadeUp} className="flex items-center gap-4 mt-6 mb-8">
              <span className="text-3xl font-bold text-farm-gold">¥{hero.pricePerPerson}</span>
              <span className="text-farm-cream/60 text-sm">/人起</span>
              <div className="flex gap-2 ml-2">
                {hero.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-white/10 text-farm-cream/80 px-2.5 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </motion.div>

            <motion.div custom={5} variants={fadeUp} className="flex flex-wrap gap-4">
              <a
                href="#deals"
                className="group inline-flex items-center gap-2 bg-farm-gold hover:bg-farm-orange text-white px-8 py-3.5 rounded-full font-bold text-base transition-all hover:scale-105 shadow-xl shadow-farm-gold/30"
              >
                <ShoppingCart size={18} />
                查看团购优惠
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:4001234567"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur text-farm-cream px-8 py-3.5 rounded-full font-medium text-base transition-all border border-white/20"
              >
                <Phone size={18} />
                电话咨询
              </a>
            </motion.div>

            {/* Comment badge */}
            <motion.div custom={6} variants={fadeUp} className="mt-8 inline-flex items-center gap-2 bg-farm-gold/20 rounded-xl px-4 py-2.5 border border-farm-gold/30">
              <Tag size={16} className="text-farm-gold" />
              <span className="text-farm-cream text-sm font-medium">{hero.comment}</span>
            </motion.div>
          </motion.div>

          {/* Right: Visual card */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/30 aspect-[4/5] bg-gradient-to-br from-emerald-600 to-farm-green">
              {/* Simulated farm image with CSS art */}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,_transparent_50%,_rgba(45,80,22,0.6)_100%)]" />
              <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-farm-green/90 to-transparent" />
              
              {/* Decorative farm elements */}
              <div className="absolute top-8 left-8 right-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-farm-cream/70 text-sm">今日人气</span>
                    <Flame size={18} className="text-orange-400" />
                  </div>
                  <div className="text-4xl font-bold text-farm-cream mb-1">2,847</div>
                  <div className="text-farm-cream/50 text-xs">位访客本周到访</div>
                </div>
              </div>

              {/* Bottom info card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-2xl p-5 shadow-xl">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-farm-green flex items-center justify-center flex-shrink-0">
                    <MapPin size={22} className="text-farm-gold" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-farm-brown font-semibold text-sm leading-snug truncate">{hero.address}</p>
                    <p className="text-farm-muted text-xs mt-1 flex items-center gap-1">
                      <Navigation size={12} />
                      {hero.distance}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 -right-4 bg-farm-orange text-white rounded-2xl px-5 py-3 shadow-xl shadow-farm-orange/30"
              >
                <div className="text-2xl font-bold">TOP 2</div>
                <div className="text-xs opacity-90">宋庄商圈</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 82.5C1248 75 1344 60 1392 52.5L1440 45V120H0Z" fill="#faf6ed"/>
        </svg>
      </div>
    </section>
  );
}

/* ─── Deal Card ─── */
function DealCard({ deal, index }: { deal: (typeof siteConfig.deals)[0]; index: number }) {
  const emojiMap: Record<string, string> = {
    ticket: "🎫", tomato: "🍅", strawberry: "🍓", cucumber: "🥒",
    egg: "🥚", cucumber2: "🥒",
  };

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-stone-100"
    >
      {/* Image area */}
      <div className="relative h-36 bg-gradient-to-br from-farm-warm to-farm-cream flex items-center justify-center overflow-hidden">
        <span className="text-5xl group-hover:scale-110 transition-transform duration-500">{emojiMap[deal.image] || "🌿"}</span>
        
        {/* Discount badge */}
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-md">
          {deal.discount}
        </div>
        
        {/* Badge */}
        {deal.badge && (
          <div className="absolute top-3 right-3 bg-farm-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            <Flame size={12} />
            {deal.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-farm-brown text-sm leading-snug line-clamp-2 h-10 mb-3">
          {deal.title}
        </h3>
        
        <div className="flex items-end justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-red-500">¥{deal.price}</span>
            <span className="text-xs text-gray-400 line-through">¥{deal.originalPrice}</span>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Users size={12} />
            {deal.soldCount}
          </span>
          {deal.timeLeft && (
            <span className="flex items-center gap-1 text-orange-500">
              <Clock size={12} />
              {deal.timeLeft}
            </span>
          )}
        </div>

        <button className="mt-3 w-full bg-farm-green hover:bg-farm-light text-white py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-1.5 group/btn">
          立即抢购
          <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Deals Section ─── */
function DealsSection() {
  return (
    <section id="deals" className="py-20 px-4 sm:px-6 bg-farm-cream">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.span custom={0} variants={fadeUp} className="inline-flex items-center gap-2 text-farm-green font-semibold text-sm tracking-wider uppercase mb-3">
            <Tag size={16} />
            团购优惠
          </motion.span>
          <motion.h2 custom={1} variants={fadeUp} className="font-display text-3xl sm:text-4xl font-bold text-farm-brown mb-4">
            超值团购 · 限时抢购
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="text-farm-muted max-w-lg mx-auto">
            新人专享超低折扣，采摘、土鸡蛋、新鲜蔬果，把田园味道带回家
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
          <button className="flex-shrink-0 px-5 py-2 bg-farm-green text-white rounded-full text-sm font-semibold">
            全部团购
          </button>
          <button className="flex-shrink-0 px-5 py-2 bg-white text-farm-muted hover:text-farm-green rounded-full text-sm font-medium transition-colors border border-stone-200">
            采摘券
          </button>
          <button className="flex-shrink-0 px-5 py-2 bg-white text-farm-muted hover:text-farm-green rounded-full text-sm font-medium transition-colors border border-stone-200">
            土鸡蛋
          </button>
          <button className="flex-shrink-0 px-5 py-2 bg-white text-farm-muted hover:text-farm-green rounded-full text-sm font-medium transition-colors border border-stone-200">
            蔬果
          </button>
        </div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {siteConfig.deals.map((deal, i) => (
            <DealCard key={deal.id} deal={deal} index={i} />
          ))}
        </motion.div>

        {/* Show all */}
        <div className="text-center mt-10">
          <button className="inline-flex items-center gap-2 text-farm-green hover:text-farm-light font-semibold transition-colors group">
            全部17个团购
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Location Section ─── */
function LocationSection() {
  const { hero } = siteConfig;
  return (
    <section id="location" className="py-20 px-4 sm:px-6 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232d5016' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Info */}
          <div>
            <motion.span custom={0} variants={fadeUp} className="inline-flex items-center gap-2 text-farm-green font-semibold text-sm tracking-wider uppercase mb-3">
              <MapPin size={16} />
              找到我们
            </motion.span>
            <motion.h2 custom={1} variants={fadeUp} className="font-display text-3xl sm:text-4xl font-bold text-farm-brown mb-6">
              欢迎来到本然农场
            </motion.h2>

            <motion.div custom={2} variants={fadeUp} className="space-y-5">
              <div className="flex items-start gap-4 p-4 bg-farm-cream rounded-xl">
                <div className="w-11 h-11 rounded-xl bg-farm-green/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-farm-green" />
                </div>
                <div>
                  <p className="font-semibold text-farm-brown text-sm mb-1">详细地址</p>
                  <p className="text-farm-muted text-sm leading-relaxed">{hero.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-farm-cream rounded-xl">
                <div className="w-11 h-11 rounded-xl bg-farm-green/10 flex items-center justify-center flex-shrink-0">
                  <Navigation size={20} className="text-farm-green" />
                </div>
                <div>
                  <p className="font-semibold text-farm-brown text-sm mb-1">距离与交通</p>
                  <p className="text-farm-muted text-sm">{hero.distance}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-farm-cream rounded-xl">
                <div className="w-11 h-11 rounded-xl bg-farm-green/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-farm-green" />
                </div>
                <div>
                  <p className="font-semibold text-farm-brown text-sm mb-1">联系电话</p>
                  <p className="text-farm-muted text-sm">预约采摘请提前致电</p>
                  <a href="tel:4001234567" className="text-farm-green font-semibold text-sm mt-1 inline-block hover:underline">
                    400-123-4567 →
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.a
              custom={3}
              variants={fadeUp}
              href="#"
              className="mt-8 inline-flex items-center gap-2 bg-farm-green hover:bg-farm-light text-white px-7 py-3 rounded-full font-semibold transition-all hover:shadow-lg"
            >
              <Navigation size={18} />
              一键导航
            </motion.a>
          </div>

          {/* Right: Map placeholder */}
          <motion.div custom={2} variants={fadeUp} className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-square sm:aspect-[4/3] bg-gradient-to-br from-farm-warm to-stone-200 border border-stone-200 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 rounded-full bg-farm-green/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin size={32} className="text-farm-green" />
                </div>
                <p className="font-display font-bold text-farm-brown text-lg mb-1">本然农场</p>
                <p className="text-farm-muted text-sm">北京市通州区宋庄镇</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-farm-muted">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  营业中 · 08:00-19:00
                </div>
              </div>
            </div>
            
            {/* Floating card */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-stone-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Leaf size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-farm-muted">营业时间</p>
                  <p className="font-bold text-farm-brown text-sm">08:00 - 19:00</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── About / Features Section ─── */
function AboutSection() {
  const features = [
    { icon: Sprout, title: "有机种植", desc: "无农药无化肥，纯天然有机蔬果，吃得放心" },
    { icon: Sun, title: "亲子乐园", desc: "采摘体验、萌宠互动、户外烧烤，全家欢乐时光" },
    { icon: Flower2, title: "四季采摘", desc: "草莓、番茄、黄瓜、樱桃……四季都有新鲜可摘" },
    { icon: Leaf, title: "生态农场", desc: "13.3km直达城市绿肺，逃离喧嚣回归自然" },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 bg-farm-warm">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.span custom={0} variants={fadeUp} className="inline-flex items-center gap-2 text-farm-green font-semibold text-sm tracking-wider uppercase mb-3">
            <Leaf size={16} />
            关于本然
          </motion.span>
          <motion.h2 custom={1} variants={fadeUp} className="font-display text-3xl sm:text-4xl font-bold text-farm-brown mb-4">
            为什么选择本然农场？
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="text-farm-muted max-w-2xl mx-auto">
            本然农场位于北京通州宋庄，占地广阔，是集有机种植、亲子采摘、休闲烧烤于一体的综合性生态农场。
            我们坚持自然农法，让每一颗果实都承载阳光的味道。
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center border border-stone-100"
            >
              <div className="w-14 h-14 rounded-2xl bg-farm-green/10 flex items-center justify-center mx-auto mb-4">
                <f.icon size={26} className="text-farm-green" />
              </div>
              <h3 className="font-display font-bold text-farm-brown text-lg mb-2">{f.title}</h3>
              <p className="text-farm-muted text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Recommendations ─── */
function RecsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-farm-cream">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl font-bold text-farm-brown">小伙伴们还喜欢</h2>
          <a href="#" className="text-farm-green text-sm font-medium hover:underline flex items-center gap-1">
            更多推荐 <ChevronRight size={14} />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {siteConfig.recommendations.map((r, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
              <div className="w-full h-28 rounded-lg bg-gradient-to-br from-stone-100 to-stone-200 mb-3 flex items-center justify-center text-stone-400 text-sm">
                推荐商家
              </div>
              <h4 className="font-semibold text-farm-brown text-sm truncate">{r.name}</h4>
              {r.category && <p className="text-farm-muted text-xs mt-1">{r.category} · {r.distance}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-farm-green text-farm-cream/70 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 text-farm-cream font-display font-bold text-xl mb-4">
              <Leaf size={22} className="text-farm-gold" />
              本然农场
            </div>
            <p className="text-sm leading-relaxed text-farm-cream/60">
              回归自然，品味本真。<br/>
              城市边缘的田园牧歌。
            </p>
          </div>
          <div>
            <h4 className="text-farm-cream font-semibold mb-4 text-sm">快速链接</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#deals" className="hover:text-farm-gold transition-colors">团购优惠</a></li>
              <li><a href="#location" className="hover:text-farm-gold transition-colors">位置信息</a></li>
              <li><a href="#about" className="hover:text-farm-gold transition-colors">关于我们</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-farm-cream font-semibold mb-4 text-sm">联系方式</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Phone size={14} /> 400-123-4567</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> 通州区宋庄镇内军庄村</li>
              <li className="flex items-center gap-2"><Clock size={14} /> 08:00 - 19:00</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-farm-cream/40">
          © 2024 本然农场 · 用心耕耘每一寸土地
        </div>
      </div>
    </footer>
  );
}

/* ─── App ─── */
export default function App() {
  return (
    <div className="min-h-screen bg-farm-cream">
      <Navbar />
      <HeroSection />
      <DealsSection />
      <LocationSection />
      <AboutSection />
      <RecsSection />
      <Footer />
    </div>
  );
}
