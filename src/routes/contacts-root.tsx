import { Outlet, NavLink, useNavigate, useParams } from "react-router-dom";
import { Contact, createContact, useContacts } from "../lib/contacts";
import { ChangeEvent, useEffect, useState } from "react";
import { matchSorter } from "match-sorter";
import { revalidateLiveQueries } from "../main";

export default function ContactsRoot() {
  const { q = "" } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);

  const { data } = useContacts();

  useEffect(() => {
    setSearch(q);
  }, [q]);

  useEffect(() => {
    if (!data) return;
    setContacts(
      search ? matchSorter(data, search, { keys: ["first", "last"] }) : data
    );
  }, [data, search]);

  const handleCreate = async () => {
    const created = await createContact();
    await revalidateLiveQueries();
    navigate(`/contacts/${created.id}/edit`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  if (!contacts) return null;
  return (
    <>
      <aside id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <input
            aria-label="Search contacts"
            placeholder="Search"
            type="text"
            name="search"
            value={search}
            onChange={handleChange}
          />
          {/* <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div> */}
          <button type="button" onClick={handleCreate}>
            New
          </button>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              <li>
                <NavLink
                  to={`experiments`}
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                >
                  Experiments
                </NavLink>
              </li>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
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
        </nav>
      </aside>
      <main id="detail">
        <Outlet />
      </main>
    </>
  );
}
