// Framer-Motion-style entrance & scroll animations, via Motion (motion.dev) —
// same team/engine as Framer Motion, but works in plain HTML/JS with no
// React or build step. Shared across every page: sections/pages that don't
// have .hero-item or .stagger-item elements simply have nothing to animate.
const showHero = () => {
    document.querySelectorAll(".hero-item, .hero-portrait").forEach((el) => {
        el.style.opacity = "1";
    });
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Safety net: if the CDN import fails or is slow, never leave hero content invisible.
const heroFallback = setTimeout(showHero, 2500);

if (reduceMotion) {
    clearTimeout(heroFallback);
    showHero();
} else {
    try {
        const { animate, inView, stagger } = await import("https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm");
        clearTimeout(heroFallback);

        animate(".hero-item", { opacity: [0, 1], y: [16, 0] }, { duration: 0.6, delay: stagger(0.1), easing: "ease-out" });
        animate(".hero-portrait", { opacity: [0, 1], scale: [0.96, 1] }, { duration: 0.7, delay: 0.25, easing: "ease-out" });

        document.querySelectorAll(".stagger-section").forEach((section) => {
            const items = section.querySelectorAll(".stagger-item");
            if (!items.length) return;

            let stop;
            stop = inView(section, () => {
                const controls = animate(items, { opacity: [0, 1], y: [24, 0] }, { duration: 0.6, delay: stagger(0.07), easing: "ease-out" });
                // Release inline styles once settled so CSS (e.g. the project-card
                // hover-dim effect) can take back over the opacity property.
                Promise.resolve(controls.finished).then(() => {
                    items.forEach((el) => {
                        el.style.opacity = "";
                        el.style.transform = "";
                    });
                });
                stop();
            }, { amount: 0.2 });
        });
    } catch (err) {
        clearTimeout(heroFallback);
        showHero();
    }
}
