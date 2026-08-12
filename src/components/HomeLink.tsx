import { Link, useLocation } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import type { ComponentProps } from 'react';

type HomeLinkProps = Omit<ComponentProps<typeof Link>, 'to'>;

/**
 * A link to `/` that scrolls back to the hero when you are already on the home page.
 * react-router does not re-navigate to the path you are already on, so the `ScrollToTop`
 * effect in App.tsx never fires and the click appears to do nothing.
 */
export default function HomeLink({ children, onClick, ...props }: HomeLinkProps) {
    const { pathname } = useLocation();
    const shouldReduceMotion = useReducedMotion();

    return (
        <Link
            to="/"
            {...props}
            onClick={(event) => {
                onClick?.(event);
                if (pathname !== '/' || event.defaultPrevented) return;

                event.preventDefault();
                window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
            }}
        >
            {children}
        </Link>
    );
}
