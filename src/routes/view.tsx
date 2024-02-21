import {
  Form,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  deleteContact,
  updateContact,
  useContact,
  useContacts,
} from "../lib/contacts";
import { revalidateLiveQueries } from "../main";
import Spinner from "../components/spinner";
import { useState } from "react";

export default function ViewContact() {
  let { contactId = "" } = useParams();
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { data: contacts } = useContacts();
  const { data: contact } = useContact(contactId);
  const favorite = contact?.favorite || false;

  const handleDelete = async () => {
    if (!confirm("Please confirm you want to delete this record.")) return;
    await deleteContact(contactId);
    await revalidateLiveQueries();
    navigate("/");
  };

  const handleFavorite = (value: boolean) => async () => {
    setIsSaving(true);
    const updated = { ...contact, favorite: !value };
    await updateContact(contactId, updated);
    await revalidateLiveQueries();

    // await mutate(data, {
    //   optimisticData: data,
    //   revalidate: false,
    // });
    setIsSaving(false);
  };

  if (!contacts || !contact) return null;
  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <button
            type="button"
            name="favorite"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            onClick={handleFavorite(favorite)}
          >
            {!isSaving ? (
              favorite ? (
                "★"
              ) : (
                "☆"
              )
            ) : (
              <Spinner className="h-4 w-4 text-slate-500" />
            )}
          </button>
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <button className="text-red-500" type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
