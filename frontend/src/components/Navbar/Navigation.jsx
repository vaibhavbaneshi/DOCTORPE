import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Dropdown } from "flowbite-react";
import { signOut } from "../../redux/user/userSlice";
import { Cart } from "../Cart/Cart";
import { useState } from "react";
import { HamburgerMenuIcon, Cross2Icon } from "@radix-ui/react-icons";

const links = [
    { to: "/bookDoctor", title: "Find doctors" },
    { to: "/searchDoctor", title: "Consult" },
    { to: "/medicines", title: "Medicines" },
    { to: "/AI_Lab", title: "AI Lab" },
];

export const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { currentUser, selectedProducts } = useSelector((state) => state.user);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleSignout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("conversation");
        dispatch(signOut());
        navigate("/signin");
        setMenuOpen(false);
    };

    const go = (to) => {
        if (!currentUser && (to === "/bookDoctor" || to === "/searchDoctor" || to === "/shoppingCart")) {
            navigate("/signin", { state: { from: to } });
            setMenuOpen(false);
            return;
        }
        navigate(to);
        setMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-40 px-4 pt-4">
            <nav
                aria-label="Primary"
                className="island-nav mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full px-3 py-2 shadow-tint"
            >
                <Link
                    to="/"
                    className="min-w-0 shrink-0 rounded-full px-3 py-2 text-sm font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy"
                    onClick={() => setMenuOpen(false)}
                >
                    <span translate="no">DoctorPe</span>
                </Link>

                <div className="hidden min-w-0 items-center gap-1 lg:flex">
                    {links.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={(event) => {
                                if (!currentUser && (item.to === "/bookDoctor" || item.to === "/searchDoctor")) {
                                    event.preventDefault();
                                    go(item.to);
                                }
                            }}
                            className={({ isActive }) =>
                                `rounded-full px-3 py-2 text-sm transition-colors duration-200 ease-spring hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy ${
                                    isActive ? "bg-ink/5 font-medium text-canopy" : "text-ink"
                                }`
                            }
                        >
                            {item.title}
                        </NavLink>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    {currentUser && (
                        <div className="relative">
                            <Cart />
                            {selectedProducts.length > 0 && (
                                <span className="absolute -right-1 -top-1 rounded-full bg-canopy px-1.5 text-[10px] font-semibold tabular-nums text-white">
                                    {selectedProducts.length}
                                </span>
                            )}
                        </div>
                    )}

                    {currentUser ? (
                        <div className="hidden items-center gap-2 sm:flex">
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    <Avatar
                                        alt={`${currentUser.data?.firstName || "Account"} avatar`}
                                        img={currentUser.data?.profilePicture}
                                        rounded
                                    />
                                }
                            >
                                <Dropdown.Header>
                                    <span className="block truncate text-sm">
                                        {currentUser.data?.firstName} {currentUser.data?.lastName}
                                    </span>
                                    <span className="block truncate text-sm font-medium">
                                        {currentUser.data?.email}
                                    </span>
                                </Dropdown.Header>
                            </Dropdown>
                            <button
                                type="button"
                                className="rounded-full px-3 py-2 text-sm text-ink hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy"
                                onClick={handleSignout}
                            >
                                Sign out
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => navigate("/signin", { state: { from: location.pathname } })}
                            className="hidden rounded-full border border-ink/15 px-4 py-2 text-sm text-ink hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy sm:inline-flex"
                        >
                            Login
                        </button>
                    )}

                    <button
                        type="button"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 lg:hidden"
                        aria-expanded={menuOpen}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        {menuOpen ? (
                            <Cross2Icon aria-hidden="true" />
                        ) : (
                            <HamburgerMenuIcon aria-hidden="true" />
                        )}
                    </button>
                </div>
            </nav>

            {menuOpen && (
                <div className="mx-auto mt-2 max-h-[min(70dvh,calc(100dvh-6rem))] max-w-5xl overflow-y-auto overscroll-contain rounded-[1.6rem] border border-ink/10 bg-surface p-4 lg:hidden">
                    <div className="flex flex-col gap-1">
                        {links.map((item) => (
                            <button
                                key={item.to}
                                type="button"
                                className="min-h-11 rounded-full px-3 py-2 text-left text-ink hover:bg-ink/5"
                                onClick={() => go(item.to)}
                            >
                                {item.title}
                            </button>
                        ))}
                        {currentUser ? (
                            <button type="button" className="min-h-11 text-left text-canopy" onClick={handleSignout}>
                                Sign out
                            </button>
                        ) : (
                            <>
                                <button type="button" className="min-h-11 text-left" onClick={() => go("/signin")}>
                                    Login
                                </button>
                                <button type="button" className="min-h-11 text-left" onClick={() => go("/signup")}>
                                    Sign up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};
