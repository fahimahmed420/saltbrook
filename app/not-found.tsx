import { ButtonLink, CallLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-20 sm:py-28">
      <p className="font-display text-7xl font-extrabold text-copper">404</p>
      <h1 className="mt-4 text-4xl font-bold text-teal sm:text-5xl">That page isn&apos;t here.</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">If your heating or cooling isn&apos;t working, we can still help.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Go to the home page</ButtonLink>
        <CallLink variant="outline" />
      </div>
    </Container>
  );
}
