import { ArrowRightIcon } from "@radix-ui/react-icons";
import { AppoinmentSlider } from "../../components/Home/AppoinmentSlider";
import { ArticleCard } from "../../components/Home/ArticleCard";
import { ConsultCard } from "../../components/Home/ConsultCard";
import { useNavigate } from "react-router-dom";
import ChatBotButton from "../../components/ChatBot/ChatBotButton";
import { useSelector } from "react-redux";

export const HomePage = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    const go = (path, needsAuth = false) => {
        if (needsAuth && !currentUser) {
            navigate("/signin", { state: { from: path } });
            return;
        }
        navigate(path);
    };

    return (
        <div className="mx-auto max-w-6xl px-4 pb-16">
            <section className="grid min-h-[100dvh] items-center gap-10 pb-16 pt-10 md:grid-cols-[1.1fr_0.9fr] md:pt-6">
                <div>
                    <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink md:text-6xl md:leading-[1.1]">
                        Care that meets you where you are
                    </h1>
                    <p className="mt-5 max-w-[65ch] text-lg leading-relaxed text-mute">
                        Video consults, clinic bookings, and medicines in one quiet place.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => go("/bookDoctor", true)}
                            className="group inline-flex min-h-11 items-center gap-3 rounded-full bg-canopy px-5 py-2 text-white transition-transform duration-200 ease-spring hover:bg-canopy-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy active:scale-[0.98]"
                        >
                            Find a doctor
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                                <ArrowRightIcon aria-hidden="true" />
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={() => go("/medicines")}
                            className="inline-flex min-h-11 items-center rounded-full border border-ink/20 px-5 py-2 text-ink transition-colors duration-200 ease-spring hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy"
                        >
                            Browse medicines
                        </button>
                    </div>
                </div>
                <div className="rounded-[2rem] p-1.5 ring-1 ring-ink/5">
                    <img
                        src="/images/design/hero-reference.png"
                        alt="Clinician at a sunlit desk ready for a consult"
                        width={900}
                        height={1100}
                        fetchPriority="high"
                        className="h-auto max-h-[70dvh] w-full rounded-[1.6rem] object-cover"
                    />
                </div>
            </section>

            <section className="py-12 md:py-24">
                <h2 className="text-balance text-3xl font-semibold tracking-tight text-ink">Everything a visit needs</h2>
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                    <button
                        type="button"
                        onClick={() => go("/searchDoctor", true)}
                        className="group rounded-[2rem] p-1.5 text-left ring-1 ring-ink/5 md:col-span-2 md:row-span-2"
                    >
                        <div className="flex h-full min-h-[280px] flex-col justify-between rounded-[1.6rem] bg-surface p-8">
                            <img
                                src="/images/design/services-bento.png"
                                alt="Video consult between a patient and a clinician"
                                width={900}
                                height={560}
                                loading="lazy"
                                className="mb-6 h-48 w-full rounded-[1.25rem] object-cover md:h-64"
                            />
                            <div>
                                <p className="text-xl font-medium">Video consult</p>
                                <p className="mt-2 max-w-[65ch] text-mute">Talk to a specialist without leaving home.</p>
                            </div>
                        </div>
                    </button>
                    <button type="button" onClick={() => go("/bookDoctor", true)} className="rounded-[2rem] p-1.5 text-left ring-1 ring-ink/5">
                        <div className="rounded-[1.6rem] bg-surface p-6">
                            <p className="font-medium">Find doctors</p>
                            <p className="mt-2 text-sm text-mute">Confirmed clinic slots.</p>
                        </div>
                    </button>
                    <button type="button" onClick={() => go("/medicines")} className="rounded-[2rem] p-1.5 text-left ring-1 ring-ink/5">
                        <div className="rounded-[1.6rem] bg-canopy p-6 text-white">
                            <p className="font-medium">Pharmacy</p>
                            <p className="mt-2 text-sm text-white/80">Essentials at the door.</p>
                        </div>
                    </button>
                    <button type="button" onClick={() => go("/AI_Lab")} className="rounded-[2rem] p-1.5 text-left ring-1 ring-ink/5 md:col-span-3">
                        <div className="rounded-[1.6rem] bg-surface p-6 md:flex md:items-center md:justify-between">
                            <div>
                                <p className="font-medium">AI screening</p>
                                <p className="mt-2 max-w-[65ch] text-mute">Check diabetes, heart, and stress signals. Not a diagnosis.</p>
                            </div>
                        </div>
                    </button>
                </div>
            </section>

            <section className="py-12 md:py-24">
                <h2 className="text-balance text-3xl font-semibold tracking-tight">Consult for a specific concern</h2>
                <p className="mt-3 max-w-[65ch] leading-relaxed text-mute">Private video visits with verified doctors across specialties.</p>
                <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
                    <ConsultCard title="Period doubts or pregnancy" image="/images/period.svg" onClick={() => go("/searchDoctor", true)} />
                    <ConsultCard title="Acne or skin issues" image="/images/pimple.svg" onClick={() => go("/searchDoctor", true)} />
                    <ConsultCard title="Headache or joint pain" image="/images/pain.svg" onClick={() => go("/searchDoctor", true)} />
                    <ConsultCard title="Cold, cough, or fever" image="/images/fever.svg" onClick={() => go("/searchDoctor", true)} />
                    <ConsultCard title="Child not feeling well" image="/images/childnotwell.svg" onClick={() => go("/searchDoctor", true)} />
                    <ConsultCard title="Depression or anxiety" image="/images/depression.svg" onClick={() => go("/searchDoctor", true)} />
                </div>
            </section>

            <section className="py-12 md:py-24">
                <h2 className="text-balance text-3xl font-semibold tracking-tight">Book an in-clinic visit</h2>
                <p className="mt-3 max-w-[65ch] text-mute">Specialists across cardiology, dermatology, surgery, and more.</p>
                <div className="mt-8">
                    <AppoinmentSlider />
                </div>
            </section>

            <section className="grid gap-10 py-12 md:grid-cols-2 md:py-24">
                <div>
                    <h2 className="text-balance text-3xl font-semibold tracking-tight">Notes from clinicians</h2>
                    <p className="mt-3 max-w-[65ch] leading-relaxed text-mute">
                        Short reads on myths, immunity, and everyday care.
                    </p>
                    <a
                        href="https://jamanetwork.com/journals/jama"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex min-h-11 items-center text-canopy underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy"
                    >
                        Open JAMA Network
                    </a>
                </div>
                <div className="grid gap-6">
                    <ArticleCard
                        image="/images/design/hero-reference.png"
                        category="Public health"
                        title="12 coronavirus myths and facts worth knowing"
                        sub="Dr. Ananya Rao"
                    />
                    <ArticleCard
                        image="/images/design/services-bento.png"
                        category="Nutrition"
                        title="Eating to support immunity during cold season"
                        sub="Dr. Kabir Mehta"
                    />
                </div>
            </section>

            <ChatBotButton />
        </div>
    );
};
