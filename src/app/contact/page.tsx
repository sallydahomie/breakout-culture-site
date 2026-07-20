export const metadata = {
  title: "Contact",
  description:
    "Questions about an order, a drop, or the brand? Get in touch with BREAKOUT CULTURE.",
};

export default function ContactPage() {
  return (
    <section className="bg-cream px-6 py-24 text-center">
      <div className="mx-auto max-w-xl">
        <p className="font-label text-xs tracking-wide3 uppercase text-gold-dark">
          Get In Touch
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-espresso sm:text-5xl">
          Contact
        </h1>
        <p className="mt-6 font-subhead text-xl leading-[1.7] text-taupe">
          Questions about an order, a drop, or the brand? We read everything.
        </p>
        <a
          href="mailto:hello@breakoutculture.com"
          className="focus-gold mt-8 inline-block font-subhead text-xl text-gold-dark transition-colors duration-200 hover:text-gold hover:underline"
        >
          hello@breakoutculture.com
        </a>
      </div>
    </section>
  );
}
