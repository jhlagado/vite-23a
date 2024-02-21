import { Form, useNavigate, useParams } from "react-router-dom";
import { Contact, updateContact, useContact } from "../lib/contacts";
import { revalidateLiveQueries } from "../main";
import { useEffect, useState } from "react";
import Spinner from "../components/spinner";

export default function EditContact() {
  let { contactId } = useParams();
  if (!contactId) return null;
  const [isSaving, setIsSaving] = useState(false);
  const [contact, setContact] = useState<Contact>({
    first: "",
    last: "",
    favorite: false,
    twitter: "",
    avatar: "",
    notes: "",
  });
  const navigate = useNavigate();
  const { data } = useContact(contactId);
  if (!data) return null;

  useEffect(() => {
    setContact(data);
  }, [data]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    await updateContact(contactId!, contact);
    await revalidateLiveQueries();
    navigate(`/contacts/${contactId}`);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setContact((values) => ({ ...values, [name]: value }));
  };

  return (
    <Form method="post" id="contact-form" onSubmit={handleSubmit}>
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          value={contact.first}
          onChange={handleChange}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          value={contact.last}
          onChange={handleChange}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          value={contact.twitter}
          onChange={handleChange}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          value={contact.avatar}
          onChange={handleChange}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          value={contact.notes}
          onChange={handleChange}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">
          {!isSaving ? "Save" : <Spinner className="h-4 w-4 text-slate-500" />}
        </button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
