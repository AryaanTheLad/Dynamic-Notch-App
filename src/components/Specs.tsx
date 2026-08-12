import { m } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { useEntrance } from '../hooks/useEntrance';
import { SPECS } from '../data/product.js';

/**
 * A real <table>, deliberately. It is the most machine-extractable structure on the
 * site, which matters because answer engines quote spec sheets verbatim — and it saves
 * anyone considering the app from reading the FAQ to find out how much RAM it uses.
 */
export default function Specs() {
    const entrance = useEntrance();

    return (
        <section id="specs" className="notch-spill py-28 px-6 md:py-36">
            <div className="max-w-3xl mx-auto">
                <SectionHeading
                    eyebrow="Specifications"
                    title={<>Every number, in one place.</>}
                    subtitle="No asterisks. If something here turns out to be wrong on your Mac, that is a refund."
                />

                <m.div
                    {...entrance({ inView: true, delay: 0.1, y: 24 })}
                    className="mt-14 overflow-hidden rounded-3xl border border-white/[0.07] bg-[var(--color-surface)]"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left text-sm">
                            <caption className="sr-only">
                                Dynamic Notch technical specifications
                            </caption>
                            <tbody>
                                {SPECS.map((spec) => (
                                    <tr
                                        key={spec.label}
                                        className="border-b border-white/[0.06] last:border-0"
                                    >
                                        <th
                                            scope="row"
                                            className="w-[42%] px-6 py-4 align-top font-medium text-white/70 sm:w-[34%]"
                                        >
                                            {spec.label}
                                        </th>
                                        <td className="px-6 py-4 font-light text-[var(--color-text-secondary)]">
                                            {spec.value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </m.div>
            </div>
        </section>
    );
}
