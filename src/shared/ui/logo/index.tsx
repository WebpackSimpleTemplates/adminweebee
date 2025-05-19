import logoSrc from './logo.svg';
import logoDarkSrc from './logo-dark.svg';

export function Logo({ className }: { className?: string }) {
  return (
    <>
      <img src={logoSrc} className={"dark:hidden" + (className ? ' ' + className :'')} />
      <img src={logoDarkSrc} className={"hidden dark:block" + (className ? ' ' + className :'')} />
    </>
  );
}