import { Form, Link, NavLink, Outlet, redirect, useLoaderData, useNavigation } from "react-router-dom";
import { createContact, getContacts } from "../contacts";
import { useEffect, useState } from "react";

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    let contacts = await getContacts(q);
    return { contacts, q };
}

export async function action() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
    const { contacts, q } = useLoaderData();
    const navigation = useNavigation();
    const [search, setSearch] = useState(q);

    useEffect(() => {
        setSearch(q);
    }, [q])

    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    <ul>
                        {contacts.length ? (
                            <ul>
                                {contacts.map((contact) => (
                                    <li key={contact.id}>
                                        <NavLink to={`contacts/${contact.id}`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}>
                                            {contact.first || contact.last ? (
                                                <>
                                                    {contact.first} {contact.last}
                                                </>
                                            ) : (
                                                <i>No Name</i>
                                            )}{" "}
                                            {contact.favorite && <span>★</span>}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>
                                <i>No contacts</i>
                            </p>
                        )}
                    </ul>
                </nav>
            </div>
            <div id="detail" className={navigation.state == "loading" ? "loading" : ""}>
                <Outlet />
            </div>
        </>
    );
}
