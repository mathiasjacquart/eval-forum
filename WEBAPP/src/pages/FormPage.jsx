import { useEffect, useState } from "react";
import { createPost, savePseudonym } from "../services/api";

function FormPage() {
  const [formData, setFormData] = useState({
    pseudonym: "",
    title: "",
    content: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pseudonymId, setPseudonymId] = useState("");
  const [pseudoStatus, setPseudoStatus] = useState("");
  const [isSavingPseudo, setIsSavingPseudo] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    if (name === "pseudonym") {
      setPseudonymId("");
      setPseudoStatus("");
    }
  }

  useEffect(() => {
    const cleanPseudonym = formData.pseudonym.trim();
    if (!cleanPseudonym) {
      setPseudonymId("");
      setPseudoStatus("");
      return undefined;
    }

    const timeoutId = setTimeout(async () => {
      setIsSavingPseudo(true);
      try {
        const savedPseudo = await savePseudonym(cleanPseudonym);
        setPseudonymId(savedPseudo._id);
        setPseudoStatus(`Pseudo enregistre (id: ${savedPseudo._id})`);
      } catch (error) {
        setPseudonymId("");
        setPseudoStatus(error.message);
      } finally {
        setIsSavingPseudo(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData.pseudonym]);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setIsError(false);
    setIsSubmitting(true);

    try {
      if (!pseudonymId) {
        throw new Error("Pseudo non enregistre. Attends la sauvegarde du pseudo.");
      }

      await createPost({
        title: formData.title,
        content: formData.content,
        pseudonymId,
      });
      setMessage("Post cree avec succes.");
      setFormData((previous) => ({ ...previous, title: "", content: "" }));
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="card">
      <h2>Nouveau post</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Pseudonym
          <input
            type="text"
            name="pseudonym"
            value={formData.pseudonym}
            onChange={handleChange}
            required
          />
        </label>
        {formData.pseudonym ? (
          <p className="pseudo-status">
            {isSavingPseudo ? "Sauvegarde du pseudo..." : pseudoStatus}
          </p>
        ) : null}

        <label>
          Title
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Content
          <textarea
            name="content"
            rows="5"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={isSubmitting || isSavingPseudo || !pseudonymId}>
          {isSubmitting ? "Envoi..." : "Envoyer"}
        </button>
      </form>

      {message ? (
        <p className={isError ? "feedback error" : "feedback success"}>{message}</p>
      ) : null}
    </section>
  );
}

export default FormPage;
