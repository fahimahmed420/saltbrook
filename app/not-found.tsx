import { ButtonLink, CallButton, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <p className="font-display text-8xl font-extrabold text-copper">404</p>
        <h1 className="mt-4 text-4xl font-extrabold text-spruce sm:text-6xl">That page has gone cold.</h1>
        <p className="mt-4 max-w-xl text-lg text-muted">The page you were looking for isn&apos;t here. If your heating or cooling isn&apos;t working, we can still help.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <CallButton />
        </div>
      </Container>
    </section>
  );
}
